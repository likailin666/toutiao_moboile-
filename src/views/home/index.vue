<template>
    <div class="home-container">
        <!-- 头部导航栏 -->
        <van-nav-bar class="page-nav-bar">
            <van-button
                slot="title"
                type="info"
                size="small"
                round
                icon="search"
                class="search-btn"
                >搜索</van-button
            >
        </van-nav-bar>

        <!-- 频道列表 -->
        <van-tabs v-model="active" class="channel-tabs" animated swipeable>
            <van-tab title="标签 1">内容 1</van-tab>
            
            <div slot="nav-right" class="placeholder"></div>
            <div slot="nav-right" class="hamburger-btn">
                <i class="iconfont icongengduo"></i>
            </div>
        </van-tabs>
    </div>
</template>

<script>
//按需导入
import { getUserChannels } from "@/api/user";

export default {
    name: "homeIndex",

    data() {
        return {
            active: 0,
            channelList: [],
        };
    },
    created() {
        this.loadChannels();
    },
    computed: {},
    methods: {
        async loadChannels() {
            try {
                //   请求获取数据
                const { data } = await getUserChannels();
                //存于私有数据
                this.channelList = data.data.channelList;
            } catch (err) {
                this.$toast("获取频道列表失败!");
            }
        },
    },
};
</script>


<style lang="less" scoped>
// 当前组件中加了 scoped 对内部样式的修改需要加 /deep/，或者去掉 scoped
.home-container {
    /deep/ .van-nav-bar__title {
        max-width: unset;
    }
    .search-btn {
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 28px;
        .van-icon {
            font-size: 32px;
        }
    }
    /deep/ .channel-tabs {
        .van-tabs__wrap {
            height: 82px;
        }
        // Tab 标签页
        .van-tab {
            border-right: 1px solid #edeff3;
            min-width: 200px;
            font-size: 30px;
            color: #777777;
        }
        .van-tab--active {
            color: #333333;
        }
        .van-tabs__nav {
            padding-bottom: 0;
        }
        .van-tabs__line {
            bottom: 8px;
            width: 31px !important;
            height: 6px;
            background-color: #3296fa;
        }
        // 汉堡
        .placeholder {
            flex-shrink: 0;
            width: 66px;
            height: 82px;
        }
        .hamburger-btn {
            position: fixed;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 66px;
            height: 82px;
            background-color: #fff;
            background-color: rgba(255, 255, 255, 0.902);
            i.iconfont {
                font-size: 33px;
            }
            &:before {
                content: "";
                position: absolute;
                left: 0;
                width: 1px;
                height: 58px;
                background-image: url(~@/assets/gradient-gray-line.png);
                background-size: contain;
            }
        }
    }
}
</style>
