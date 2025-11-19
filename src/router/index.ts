import { createRouter, createWebHistory } from 'vue-router'
import RoomStatusView from '@/views/ra_roomstatus.vue'
import RoomSearchView from '@/views/ra_roomsearch.vue'
import RoomDetailView from '@/views/ra_roomdetail.vue'

const routes = [
  {
    path: '/',
    name: 'RoomStatus',
    component: RoomStatusView,
  },
  {
    path: '/room-search',
    name: 'RoomSearch',
    component: RoomSearchView,
  },
  {
    path: '/room-detail/:roomNumber?',
    name: 'RoomDetail',
    component: RoomDetailView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
