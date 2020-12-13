import axios from "axios";
import store from '@/store/index'


const request = axios.create({
    baseURL: "http://toutiao-app.itheima.net/", // 接口的基准路径
});

// 请求拦截器
request.interceptors.request.use(
    function(config) {
        console.log(config);
        const { user } = store.state
            //config:本次请求的配置对象
        if (user || user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        console.log(config);
        // 务必要返回config
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default request;