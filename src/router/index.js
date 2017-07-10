import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import BasicInfo from '../components/BasicInfo'
import MatchRequirement from '../components/MatchRequirement'
import MainPage from '../components/MainPage'
import Waiting from '../components/Waiting'
import PhotoAndTag from '../components/PhotoAndTag'
import Hello from '../components/Hello'

const router = new Router({
  routes: [
    { path: '/basic-info', component: BasicInfo },
    { path: '/match-requirement', component: MatchRequirement },
    { path: '/main-page', component: MainPage },
    { path: '/waiting', component: Waiting },
    { path: '/photo-and-tag', component: PhotoAndTag },
    { path: '/hello', component: Hello },
    { path: '*', redirect: '/main-page' }
  ]
})

export default router
