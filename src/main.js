import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 加载Vant的核心组件
import Vant from "vant";

//加载的Vant全局样式
import "vant/lib/index.css";

// 导入全局样式
import "./styles/index.less";

// 加载动态设置rem基准值
import "amfe-flexible";

// 注册Vant为组件
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");