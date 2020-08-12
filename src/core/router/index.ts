import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../../views/home/Home.vue'
import Characters from '../../views/characters/Characters.vue'
import Comics from '../../views/comics/Comics.vue'
import Creators from '../../views/creators/Creators.vue'
import Series from '../../views/series/Series.vue'
import Events from '../../views/events/Events.vue'
import Details from '../../views/details/Details.vue'
import PageNotFound from '../../views/notFound/notFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/home', name: 'Home', component: Home },
  { path: '/characters', name: 'Characters', component: Characters },
  { path: '/comics', name: 'Comics', component: Comics },
  { path: '/creators', name: 'Creators', component: Creators },
  { path: '/series', name: 'Series', component: Series },
  { path: '/events', name: 'Events', component: Events },
  { path: '/details/:type/:id', name: 'Details', component: Details },
  { path: '*', component: PageNotFound }
]

const router = new VueRouter({
  routes
})

export default router
