import { ReqSongURL, ReqSongLyric } from '@/API/index.js'
const state = {
  songURL: '',
  songLyric: {},
  songList: [],
  songListIndex: 0,
  playStatus: false,
  currentTime: 0,
  songDuration: 0
}
const mutations = {
  giveSongURL(state, data) {
    if (data) {
      state.songURL = data.url || ''
    }
  },
  giveSongLyric(state, data) {
    state.songLyric = data
  },
  updateSongList(state, data) {
    state.songList = data.songs
    state.songListIndex = data.index
  },
  updataPlayStatus(state, data) {
    // 更新播放状态
    state.playStatus = data
  },
  updataSongListIndex(state, data) {
    state.songListIndex = data
  },
  updataCurrentTime(state, data) {
    // 更新当前时间
    state.currentTime = data
  },
  updateSongDuration(state, data) {
    // 传递歌曲总时长
    state.songDuration = data
  }
}
const actions = {
  async getSongURL({ commit }, id) {
    const result = await ReqSongURL(id)
    if (result.data.code === 200) {
      commit('giveSongURL', result.data.data[0])
    }
  },
  async getSongLyric({ commit }, id) {
    const result = await ReqSongLyric(id)
    if (result.data.code === 200) {
      commit('giveSongLyric', result.data.lrc)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
