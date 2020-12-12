// 存储token数据
const setItem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value);
}

// 获取token数据
export const getItem = key => {
    const data = window.localStorage.getItem(key);
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}

// 删除token数据
export const removeItem = (key) => {
    window.localStorage.removeItem(key);
};