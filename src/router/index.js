import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login/index.vue')
    },
    // {
    //     path: '/',
    //     name: 'test',
    //     component: () => import('../views/AllDevice/index.vue')
    // },
    {
        path: '/Nav',
        name: 'Nav',
        component: () => import('../views/Common/NavBar/index.vue'),
        redirect: '/Nav/Home',
        children: [
            {
                path: '/Nav/Home',
                name: 'Home',
                component: () => import('../views/Home/index.vue')
            },
            {
                path: '/Nav/Profile',
                name: 'Profile',
                component: () => import('../views/Profile/index.vue')
            },
        ]
    },
    {
        path: '/EstrusEvent',
        name: 'EstrusEvent',
        component: () => import('../views/EstrusEvent/index.vue')
    },
    {
        path: '/AnomalousEvent',
        name: 'AnomalousEvent',
        component: () => import('../views/AnomalousEvent/index.vue')
    },
    {
        path: '/PowerOffEvent',
        name: 'PowerOffEvent',
        component: () => import('../views/PowerOffEvent/index.vue')
    },
    {
        path: '/RecordCow',
        name: 'RecordCow',
        component: () => import('../views/RecordCow/index.vue')
    },
    {
        path: '/RecordEvent',
        name: 'RecordEvent',
        component: () => import('../views/RecordEvent/index.vue')
    },
    {
        path: '/CowInfo',
        name: 'CowInfo',
        component: () => import('../views/CowInfo/index.vue')
    },
    {
        path: '/Archive',
        name: 'Archive',
        component: () => import('../views/Archive/index.vue')
    },
    {
        path: '/AllCow',
        name: 'AllCow',
        component: () => import('../views/AllCow/index.vue')
    },
    {
        path: '/SuspectedOestrus',
        name: 'SuspectedOestrus',
        component: () => import('../views/SuspectedOestrus/index.vue')
    },
    {
        path: '/HybridizationAlert',
        name: 'HybridizationAlert',
        component: () => import('../views/HybridizationAlert/index.vue')
    },
    {
        path: '/NonePregnantAlert',
        name: 'NonePregnantAlert',
        component: () => import('../views/NonePregnantAlert/index.vue')
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
