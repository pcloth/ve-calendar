// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/index', 
            component: (resolve) => require.ensure(['./main.vue'], () => { resolve(require('./main.vue')) }),
        },
        {
            path: '/year', 
            component: (resolve) => require.ensure(['./year.vue'], () => { resolve(require('./year.vue')) }),
        },
        {
            path: '/',
            redirect: '/index'
        }
    ]
})

import app from '../example/index'

Vue.config.productionTip = true

new Vue({
    el: '#app',
    template: '<app/>',
    router,
    render: h => h(app)
})