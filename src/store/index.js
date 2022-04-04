import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '@/utiles/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
    // 刷新之后vuex容器里面也没有数据,所以初始化的时候应该从本地里取数据
    state: {
        user: getItem(TOKEN_KEY), //一个对象,存储当前登陆用户信息，里面包含token等数据,

    },
    getters: {
        // 用户头像的计算属性
        userAvatar(state) {
            // 默认图偶像地址
            let imgSrc = 'https://img.yzcdn.cn/vant/cat.jpeg'
                // 如果用户信息中包含photo这个属性,则为imgSrc重新赋值

            return imgSrc
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data

            // 为了防止刷新丢失，需要把数据存储到本地存储
            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {},
    modules: {}
})