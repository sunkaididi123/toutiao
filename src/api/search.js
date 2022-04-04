import request from "@/utiles/request";

// 搜索建议
export const getSearchSuggestions = q => request({
        url: '/v1_0/suggestion',
        method: 'GET',
        params: {
            q
        }
    })
    // 搜索结果
export const searchResult = params => request({
    url: '/v1_0/search',
    method: 'GET',
    params
})