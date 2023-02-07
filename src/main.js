import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 1.引入vant相关组件
import { Tabbar, TabbarItem, NavBar, Popup, Cell, Tab, Tabs } from 'vant'
import 'vant/lib/index.less'
// 2.引入rem配置文件
import '@/rem/rem.js'
// 3.引入懒加载
import VueLazyload from 'vue-lazyload'
// 4.引入公共组件
import SwiperComp from '@/components/SwiperComp.vue'
import DJSwiperComp from '@/components/DJSwiperComp.vue'
import MultiSwiperComp from '@/components/MultiSwiperComp.vue'
import songPlayComp from '@/components/songPlayComp.vue'
import PlayerComp from '@/components/PlayerComp.vue'
import * as API from '@/API/index.js'
const loadimage = require('@/assets/lazyload.jpg')
Vue.config.productionTip = false
// 1.声明vant相关组件
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadimage,
  attempt: 1
})
// 4.声明公共组件
Vue.component('SwiperComp', SwiperComp)
Vue.component('DJSwiperComp', DJSwiperComp)
Vue.component('MultiSwiperComp', MultiSwiperComp)
Vue.component('songPlayComp', songPlayComp)
Vue.component('PlayerComp', PlayerComp)
new Vue({
  router,
  store,
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: (h) => h(App)
}).$mount('#app')
