import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Chapter from './views/Chapter.vue'
import Catalog from './views/Catalog.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
  { path: '/chapter/:id', component: Chapter }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
