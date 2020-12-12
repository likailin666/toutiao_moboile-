<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录">
        <van-icon slot="left" name="cross" @click="$router.back()" />
        </van-nav-bar>
        <!-- /导航栏 -->

        <!-- 登录表单 -->
        <van-form @submit="onSubmit" ref="loginForm">
            <van-field
                name="mobile"
                placeholder="请输入手机号"
                v-model="user.mobile"
                :rules="userFormRules.mobile"
                type="number"
                maxlength="11"
            >
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                type="number"
                name="code"
                placeholder="请输入验证码"
                v-model="user.code"
                :rules="userFormRules.code"
                maxlength="6"
            >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <van-count-down
                        :time="1000 * 10"
                        format="ss s"
                        v-if="isCountDownShow"
                        @finish="isCountDownShow = false"
                    />
                    <van-button
                        v-else
                        class="send-sms-btn"
                        round
                        size="small"
                        type="default"
                        @click="onSendSms"
                        native-type="button"
                        >发送验证码
                    </van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button
                    class="login-btn"
                    block
                    type="info"
                    native-type="submit"
                >
                    登录
                </van-button>
            </div>
        </van-form>
        <!-- /登录表单 -->
    </div>
</template>
<script>
// 按需加载
export { login, sendSms } from "@/api/user";

export default {
    name: "LoginIndex",
    components: {},
    props: {},
    data() {
        return {
            user: {
                mobile: "",
                code: "",
            },
            // 用户表单验证规则
            userFormRules: {
                mobile: [
                    { required: true, message: "请填写用户名!" },
                    {
                        pattern: /^1[3|5|7|8]\d{9}$/,
                        message: "手机号格式错误!",
                    },
                ],
                code: [
                    { required: true, message: "请输入验证码!" },
                    {
                        pattern: /^\d{6}$/,
                        message: "验证码格式错误!",
                    },
                ],
            },
            // 控制倒计时显示与隐藏
            isCountDownShow: false,
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        async onSubmit(values) {
            // 获取表单数据
            const user = this.user;
            //todo:验证表单数据
            this.$toast.loading({
                message: "登录中...",
                forbidClick: true, // 禁用背景点击
                duration: 2000, // 持续时间，默认 2000，0 表示持续展示不关闭
            });
            //请求接口进行登录
            try {
                const {data} = await login(user);
                // 保存token令牌到共享数据中
                this.$store.commit('setUser',data.data)
                this.$toast.success("登录成功!");

                // 跳转回原来页面
                this.$router.back()

            } catch (err) {
                if (err.response.status === 400) {
                    this.$toast.fail("用户名或者验证码输入错误,请重新输入!");
                } else {
                    this.$toast.fail("登录失败，请稍后重试!");
                }
            }
        },
        // 手机验证码功能的方法
        async onSendSms() {
            // 验证手机号 拿到表单实例
            try {
                await this.$refs.loginForm.validate("mobile");
                console.log("验证通过");
            } catch (err) {
                console.log("验证失败", err);
                return;
            }
            // 验证通过后,请求倒计时
            this.isCountDownShow = true;
            //请求发送验证码
            try {
                await sendSms(this.user.mobile);
                this.$toast.seccess("发送太频繁;了,请稍后重试!");
            } catch (err) {
                if (err.response.status === 201) {
                    this.$toast.fail("发送失败,请稍后重试!");
                } else {
                }
            }
        },
    },
};
</script>


<style scoped lang="less">
.login-container {
    .toutiao {
        font-size: 37px;
    }
    .send-sms-btn {
        width: 152px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        color: #666;
    }
    .login-btn-wrap {
        padding: 53px 33px;
        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>
