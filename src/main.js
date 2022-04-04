import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'

// 加载vant核心组件库
import Vant from 'vant'
// 加载vant全局样式
import 'vant/lib/index.css'

// 动态设置rem基础值
import 'amfe-flexible'
// 注册使用vant组件库
Vue.use(Vant)
    // 加载dayjs初始化配置
import './utiles/dayjs'
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')