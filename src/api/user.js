// 用户相关请求模块
import request from "@/utiles/request";
// 加载容器模块
export const login = (data) => request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
})

// 发送验证码,注意:每个手机号每分钟发一次
export const sendSms = mobile => request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
})

// 获取用户自己信息
export const getUserInfo = () => request({
        method: 'GET',
        url: '/v1_0/user'
            // 发送请求头数据
            // headers: {
            //     Authorization: `Bearer ${store.state.user.token}`
            // }
    })
    // 获取用户频道列表
export const getUserChannels = () => request({
    url: '/v1_0/user/channels',
    method: 'GET'
})

// 关注用户
export const addFollow = target => request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
        target
    }
})

// 取消关注用户
export const removeFollow = id => request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
})


// 获取用户基本信息
export const getUserbase = () => request({
    url: '/v1_0/user/profile',
    method: 'GET'
})

// 编辑用户个人资料
export const setUserbase = data => request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
})

//编辑用户头像信息
export const UpdateUserImg = data => request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
})

// 获取粉丝列表
export const getGuanZhuList = params => request({
    url: '/v1_0/user/followers',
    method: 'GET',
    params
})

// 获取用户关注列表
export const getUserFensiList = params => request({
    url: '/v1_0/user/followings',
    method: 'GET',
    params
})

// 获取用户收藏列表

export const getUserhistory = params => request({
    url: '/v1_0/article/collections',
    method: 'GET',
    params
})


// 获取用户历史记录
export const getUserLishi = params => request({
    method: 'GET',
    url: '/v1_0/user/histories',
    params
})