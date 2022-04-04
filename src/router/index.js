import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout'
import Home from '@/views/home'
import My from '@/views/my'
import Qa from '@/views/qa'
import Radio from '@/views/radio'
import Search from '@/views/search'
import Article from '@/views/article'
import UserProfile from '@/views/user-profile'
import UserToutiao from '@/views/my/components/user-toutiao'
import List from '@/views/my/view/list'
import GuanZhu from '@/views/my/view/list/guanzhu'
import FenSi from '@/views/my/view/list/fensi'
import ShouCang from '@/views/my/view/list/shoucang'
import Lishi from '@/views/my/view/list/lishi'
import Robot from '@/views/my/view/list/robot'
Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        // name: 'layout',    //如果有子路由，那么设置名字没有意义，他会找子路由进行跳转
        component: Layout,
        children: [{
                path: '', //默认子路由
                name: 'home',
                component: Home,
            },
            {
                path: '/my',
                name: 'my',
                component: My,
            },
            {
                path: '/qa',
                name: 'qa',
                component: Qa,
            },
            {
                path: '/radio',
                name: 'radio',
                component: Radio,
            },
        ]

    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: Article,
        props: true //开启props传参,把路由参数映射到组件的props数据中
    },
    {
        path: '/user/profile',
        name: 'profile',
        component: UserProfile
    },
    {
        path: '/user/toutiao',
        name: 'toutiao',
        component: UserToutiao
    },
    {
        path: '/list',
        name: 'list',
        component: List,
        children: [{
                path: 'guanzhu',
                name: 'guanzhu',
                component: GuanZhu

            },
            {
                path: 'fensi',
                name: 'fensi',
                component: FenSi
            }
        ]
    },
    {
        path: '/shoucang',
        name: 'shoucang',
        component: ShouCang
    },
    {
        path: '/lishi',
        name: 'lishi',
        component: Lishi

    },
    {
        path: '/robot',
        name: 'robot',
        component: Robot
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router