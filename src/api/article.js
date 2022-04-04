import request from "@/utiles/request";

// 文章请求模块
// 请求获取文章列表数据
export const getArticles = (params) => request({
    method: 'GET',
    url: '/v1_0/articles',
    params
})

// 请求获取文章详情
export const getArticleById = id => request({
    url: `/v1_0/articles/${id}`,
    method: 'GET'
})

// 收藏文章
export const addCollect = target => request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
        target
    }
})

// 取消收藏文章
export const removeCollect = target => request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
})

// 文章点赞
export const LikeArticle = target => request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
        target
    }
})

// 取消文章点赞
export const DislikeArticle = target => request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
})

// 对评论点赞
export const LikeComment = target => request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
        target
    }
})

// 对评论取消点赞
export const DislikeComment = target => request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
})