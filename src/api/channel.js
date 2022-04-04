import request from "@/utiles/request.js";
// 频道请求模块


// 获取所有频道列表
export const getAllChannels = () => request({
    url: '/v1_0/channels',
    method: 'GET'
})

// 添加用户频道
export const addUserChannel = channel => request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
        channels: [channel]
    }
})

// 删除用户指定皮频道
export const deleteUserChannel = channelId => request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
})