// 用户相关请求
import request from "@/utils/request";
import store from "../store/index";

export const login = (data) => {
    return request({
        method: "POST",
        url: "/v1_0/authorizations",
        data,
    });
};

// 发送验证码
export const sendSms = (mobile) => {
    return request({
        method: "GET",
        url: `/v1_0/sms/codes/${mobile}`,
    });
};

// 获取用户自己信息
export const getUserInfo = () => {
    return request({
        method: "GET",
        url: "v1_0/user",
    });
};

// 获取频道列表信息
export const getUserChannels = () => {
    return request({
        method: "GET",
        url: "v1_0/user/channels",
    });
};