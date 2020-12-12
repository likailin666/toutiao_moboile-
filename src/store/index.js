import Vue from "vue";
import Vuex from "vuex";
import { getItem, removeItem } from "../utils/storage";
Vue.use(Vuex);

const TOKEN_KEY = "TOUTIAO_USER";

export default new Vuex.Store({
    state: {
        // 存储token的用户对象
        user: getItem(TOKEN_KEY),
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
            // 为了防止刷新丢失
            removeItem(TOKEN_KEY, state.user);
            // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user));
        },
    },
    actions: {},
    modules: {},
});