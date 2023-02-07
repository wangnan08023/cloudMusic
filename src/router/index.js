import Vue from 'vue'
import VueRouter from 'vue-router'
import FindView from '@/views/Find/FindView.vue'
import DjView from '@/views/DJ/DjView.vue'
import UserView from '@/views/User/UserView.vue'
import FollowView from '@/views/Follow/FollowView.vue'
import CommunityView from '@/views/Community/CommunityView.vue'
import TopListView from '@/views/Find/secondPages/TopListView.vue'
import PlayListView from '@/views/Find/secondPages/PlayListView.vue'
import AlbumDetailView from '@/views/Find/ThirdPages/AlbumDetailView.vue'
import recomListView from '@/views/Find/secondPages/recomListView.vue'
import LoginView from '@/views/login/LoginView.vue'
import RegiView from '@/views/register/RegiView.vue'
import SearchView from '@/views/Find/secondPages/SearchView.vue'
import SearchingView from '@/views/Find/ThirdPages/SearchingView.vue'
import SearchingResView from '@/views/Find/ThirdPages/SearchingResView.vue'
import DJListView from '@/views/DJ/DJListView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/homepage'
  },
  {
    path: '/homepage',
    component: FindView,
    meta: { footerShow: true, playerShow: true }
  },
  {
    path: '/homepage/toplist',
    component: TopListView
  },
  {
    path: '/homepage/playlist',
    component: PlayListView
  },
  {
    path: '/homepage/search',
    component: SearchView,
    children: [
      {
        path: 'searching',
        component: SearchingView,
        meta: { playerShow: true, footerShow: false }
      },
      {
        path: 'searchingres',
        component: SearchingResView,
        meta: { playerShow: true, footerShow: false }
      }
    ]
  },
  {
    path: '/playlist/detail',
    component: recomListView,
    meta: { playerShow: true, footerShow: false }
  },
  {
    path: '/homepage/album/detail/:albumId',
    component: AlbumDetailView,
    name: 'albumDetail',
    meta: { footerShow: false }
  },
  {
    path: '/dj',
    component: DjView,
    meta: { footerShow: true, playerShow: true }
  },
  {
    path: '/dj/detail',
    component: DJListView,
    meta: { playerShow: true, footerShow: false }
  },
  {
    path: '/user',
    component: UserView,
    meta: { footerShow: true, playerShow: true },
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        router.push('/login')
      }
    }
  },
  {
    path: '/follow',
    component: FollowView,
    meta: { footerShow: true, playerShow: true }
  },
  {
    path: '/community',
    component: CommunityView,
    meta: { footerShow: true, playerShow: true }
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegiView
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})
export default router
