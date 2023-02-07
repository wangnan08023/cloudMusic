import Vue from 'vue'
import Vuex from 'vuex'
import Find from '@/store/Find/find.js'
import DJ from '@/store/DJ/dj.js'
import songPlay from '@/store/Comp/songPlay.js'
import footerView from '@/store/Comp/footerView.js'
import login from '@/store/Login/login.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Find,
    DJ,
    songPlay,
    footerView,
    login
  }
})
