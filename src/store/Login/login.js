import {
  ReqUserInfo,
  ReqCaptcha,
  ReqQrKey,
  ReqQrPic,
  ReqUserStatus,
  ReqUserInfoDetail,
  ReqUserPlaylist,
  ReqLogout
} from '@/API/index.js'
const state = {
  qrimg: '',
  unikey: '',
  userStatus: {},
  userInfoDetail: {},
  userPlaylist: [],
  like: {}
}
const mutations = {
  giveQrKey(state, data) {
    state.unikey = data.unikey
  },
  giveQrPic(state, data) {
    state.qrimg = data.qrimg
  },
  giveUserStatus(state, data) {
    state.userStatus = data.profile
  },
  giveUserInfoDetail(state, data) {
    state.userInfoDetail = data
  },
  giveUserPlaylist(state, data) {
    state.userPlaylist = data
  },
  giveLike(state, data) {
    state.like = data
  }
}
const actions = {
  async getCaptcha({ commit }, phone) {
    await ReqCaptcha(phone)
  },
  async getUserInfo({ commit }, data) {
    // eslint-disable-next-line
    const result = await ReqUserInfo(data)
  },
  async getQrKey({ commit }, phone) {
    const result = await ReqQrKey()
    if (result.data.code === 200) {
      commit('giveQrKey', result.data.data)
    }
  },
  async getQrPic({ commit }, key) {
    const result = await ReqQrPic(key)
    if (result.data.code === 200) {
      commit('giveQrPic', result.data.data)
    }
  },
  async getUserStatus({ commit }, cookie) {
    const result = await ReqUserStatus(cookie)
    commit('giveUserStatus', result.data.data)
  },
  async getUserInfoDetail({ commit }, id) {
    const result = await ReqUserInfoDetail(id)
    commit('giveUserInfoDetail', result.data)
  },
  async getUserPlaylist({ commit }, id) {
    const result = await ReqUserPlaylist(id)
    const list = result.data.playlist
    const mylist = list.filter((item) => {
      // 过滤出用户创造的歌单
      return item.creator.nickname === 'Tracey-W'
    })
    const colleList = []
    list.forEach((item) => {
      // 数组去重出剩下的歌单
      if (mylist.indexOf(item) === -1) {
        colleList.push(item)
      }
    })
    // eslint-disable-next-line
    const like = mylist.shift()
    const assist = []
    const allList = [mylist, colleList, assist]
    commit('giveUserPlaylist', allList)
    commit('giveLike', like)
  },
  async logout({ commit }) {
    const result = await ReqLogout()
    console.log(result)
  }
}
const getters = {
  userProfile: (state) => {
    return state.userInfoDetail.profile || {}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
