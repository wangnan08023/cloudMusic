import {
  ReqBannerInfo,
  ReqNavInfo,
  ReqRecomPlaylist,
  ReqOfficialList,
  ReqAlbumList,
  ReqAlbumDetail,
  ReqAlbumDetailSales,
  ReqRecomListDetail,
  ReqRecomListSongs,
  ReqSearchKeyword,
  ReqHotSearch,
  ReqSearchResult,
  ReqSearchResList,
  ReqSongDetail
} from '@/API/index.js'
const state = {
  bannerList: [],
  navList: [],
  recomPlaylist: [],
  officialList: [],
  albumList: [],
  albumDetail: {},
  albumDetailSales: '',
  RecomListDetail: {},
  RecomListSongs: {},
  searchKeyword: '',
  hotSearch: [],
  searchResult: [],
  searchResList: {},
  songDetail: []
}
const mutations = {
  giveBannerList(state, data) {
    state.bannerList = data.banners
  },
  giveNavList(state, data) {
    state.navList = data.data
  },
  giveRecomPlaylist(state, data) {
    state.recomPlaylist = data.result
  },
  giveOfficialList(state, data) {
    state.officialList = data.list
  },
  giveAlbumList(state, data) {
    state.albumList = data.products
  },
  giveAlbumDetail(state, data) {
    state.albumDetail = data
  },
  giveAlbumDetailSales(state, data) {
    state.albumDetailSales = data
  },
  giveRecomListDetail(state, data) {
    state.RecomListDetail = data
  },
  giveRecomListSongs(state, data) {
    state.RecomListSongs = data
  },
  giveSearchKeyword(state, data) {
    state.searchKeyword = data.realkeyword
  },
  giveHotSearch(state, data) {
    state.hotSearch = data
  },
  giveSearchResult(state, data) {
    state.searchResult = data
  },
  giveSearchResList(state, data) {
    state.searchResList = data
  },
  giveSongDetail(state, data) {
    state.songDetail = data
  }
}
const actions = {
  // 获取banner
  async getBannerList({ commit }) {
    const result = await ReqBannerInfo()
    if (result.status === 200) {
      commit('giveBannerList', result.data)
    }
  },
  // 获取首页nav
  async getNavList({ commit }) {
    const result = await ReqNavInfo()
    if (result.status === 200) {
      commit('giveNavList', result.data)
    }
  },
  // 获取推荐歌单
  async getRecomPlaylist({ commit }) {
    const result = await ReqRecomPlaylist()
    if (result.status === 200) {
      commit('giveRecomPlaylist', result.data)
    }
  },
  // 获取数字专辑
  async getAlbumList({ commit }) {
    const result = await ReqAlbumList()
    if (result.status === 200) {
      commit('giveAlbumList', result.data)
    }
  },
  // 二次页面-获取官方榜
  async getOfficialList({ commit }) {
    const result = await ReqOfficialList()
    if (result.status === 200) {
      commit('giveOfficialList', result.data)
    }
  },
  // 二次页面-获取数字专辑
  async getAlbumDetail({ commit }, id) {
    const result = await ReqAlbumDetail(id)
    if (result.status === 200) {
      commit('giveAlbumDetail', result.data)
    }
  },
  // 二次页面-获取数字专辑-售卖数量
  async getAlbumDetailSales({ commit }, id) {
    const result = await ReqAlbumDetailSales(id)
    if (result.status === 200) {
      commit('giveAlbumDetailSales', result.data.data[id])
    }
  },
  // 二次页面-获取当前歌单详情
  async getRecomListDetail({ commit }, id) {
    const result = await ReqRecomListDetail(id)
    if (result.data.code === 200) {
      commit('giveRecomListDetail', result.data)
    }
  },
  // 二次页面-获取当前歌单所有歌曲
  async getRecomListSongs({ commit }, id) {
    const result = await ReqRecomListSongs(id)
    if (result.data.code === 200) {
      commit('giveRecomListSongs', result.data)
    }
  },
  // 二次页面-获取搜索关键字
  async getSearchKeyword({ commit }) {
    const result = await ReqSearchKeyword()
    if (result.data.code === 200) {
      commit('giveSearchKeyword', result.data.data)
    }
  },
  // 二次页面-获取搜索 热搜榜
  async getHotSearch({ commit }) {
    const result = await ReqHotSearch()
    if (result.data.code === 200) {
      commit('giveHotSearch', result.data.data)
    }
  },
  // 二次页面-获取搜索结果(单曲)
  async getSearchResult({ commit }, keyword) {
    const result = await ReqSearchResult(keyword)
    if (result.data.code === 200) {
      commit('giveSearchResult', result.data.result)
    }
  },
  // 二次页面-获取搜索结果(歌单)
  async getSearchResList({ commit }, keyword) {
    const result = await ReqSearchResList(keyword)
    if (result.data.code === 200) {
      commit('giveSearchResList', result.data.result)
    }
  },
  // 获取二次页面-歌曲详情
  async getSongDetail({ commit }, id) {
    const result = await ReqSongDetail(id)
    if (result.data.code === 200) {
      commit('giveSongDetail', result.data.songs)
    }
  }
}
const getters = {
  album: (state) => {
    return state.albumDetail.album || []
  },
  product: (state) => {
    return state.albumDetail.product || []
  },
  playlist: (state) => {
    return state.RecomListDetail.playlist || []
  },
  privileges: (state) => {
    return state.RecomListDetail.privileges || []
  },
  songs: (state) => {
    return state.RecomListSongs.songs || []
  },
  searchResultSongs: (state) => {
    return state.searchResult.songs || []
  }
}
export default { state, mutations, actions, getters }
