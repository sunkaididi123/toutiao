// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
// import { io } from 'socket.io-client'

// JSonbig提供了两个方法
// JSONBig.parse()   //把json格式字符串转为js对象
// JSONBig.stringify()   //js对象转为JSON字符串
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net', //接口基础路径
    transformResponse: [function(data) {
        // 自定义后端返回的原始数据
        try {
            return JSONBig.parse(data)
        } catch (err) {
            // axios默认会在内部这样处理:JSON.parse()
            return data
        }


    }]

})

// 请求拦截器
request.interceptors.request.use(function(config) {
        // 请求发起会经过这里
        // config配置对象
        // 本次请求的配置对象
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        // 这里务必返回config配置对象,否则请求就停在这里
        return config
    }, function(error) {
        // 请求出错,还没有发出去,会进入这里
        return Promise.reject(error)
    })
    // 相应拦截器
export default request