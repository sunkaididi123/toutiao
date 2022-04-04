import request from "@/utiles/request"
// 文章评论模块

// 获取文章评论列表

export const getComments = params => request({
    url: '/v1_0/comments',
    // get参数使用params进行传递
    // 我们写的时候是对象，但是最终发给客户端的数据是
    // axos会把params对象转为 key=value?key=value的格式放在url中
    method: 'GET',
    params
})


// 对文章进行评论
export const addComment = data => request({
    url: '/v1_0/comments',
    method: 'POST',
    data
})