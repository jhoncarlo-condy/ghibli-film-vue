import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FilmDetail from '@/views/FilmDetail.vue'
import FilmList from '@/views/FilmList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/films', name: 'FilmList', component: FilmList },
    { path: '/film/:id', name: 'FilmDetail', component: FilmDetail, props: true },
  ],
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
