import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import Countries from '@/components/Countries'
import Introduction from '@/components/Introduction'
import World from '@/components/World'
import Country from '@/components/Country'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Introduction',
            component: Introduction
        },
        {
            path: '/world',
            name: 'World',
            component: World
        },
        {
            path: '/countries',
            name: 'Countries',
            component: Countries
        },
        {
            path: '/country/:queryName',
            name: 'Country',
            component: Country,
            props: true,
            beforeEnter(to, from, next) {
                let queryName = to.params.queryName
                store.dispatch('newCountryName', queryName)
                next()
            }

        }
    ]
})