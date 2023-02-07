import {
  ReqDJbanner,
  ReqDJrecom,
  ReqDJCatogoty1,
  ReqDJcategory,
  ReqDJListDetail,
  ReqDJProgram
} from '@/API/index.js'
const state = {
  djBanner: [],
  djRecom: [],
  djCategories: [],
  djCatogoty1: [],
  djListDetail: {},
  djProgram: []
}
const mutations = {
  giveDJbanner(state, data) {
    state.djBanner = data
  },
  giveDJrecom(state, data) {
    state.djRecom = data
  },
  giveDJcategory(state, data) {
    state.djCategories = data
  },
  giveDJCatogoty1(state, data) {
    state.djCatogoty1.push(data)
  },
  giveDJListDetail(state, data) {
    state.djListDetail = data
  },
  giveDJProgram(state, data) {
    state.djProgram = data
  }
}
const actions = {
  // 获取DJ页面banner
  async getDJbanner({ commit }) {
    const result = await ReqDJbanner()
    if (result.data.code === 200) {
      commit('giveDJbanner', result.data.data)
    }
  },
  // 获取DJ电台推荐
  async getDJrecom({ commit }) {
    const result = await ReqDJrecom()
    if (result.data.code === 200) {
      commit('giveDJrecom', result.data.data)
    }
  },
  // 获取DJ电台分类id
  async getDJcategory({ commit }) {
    const result = await ReqDJcategory()
    if (result.data.code === 200) {
      commit('giveDJcategory', result.data.categories)
    }
  },
  // 获取DJ人文历史推荐
  async getDJCatogoty1({ commit }, type) {
    const result = await ReqDJCatogoty1(type)
    if (result.data.code === 200) {
      commit('giveDJCatogoty1', result.data.djRadios)
    }
  },
  // 二次页面- 获取DJ详情
  async getDJListDetail({ commit }, id) {
    const result = await ReqDJListDetail(id)
    if (result.data.code === 200) {
      commit('giveDJListDetail', result.data.data)
    }
  },
  // 二次页面- 获取DJ
  async getDJProgram({ commit }, id) {
    const result = await ReqDJProgram(id)
    if (result.data.code === 200) {
      commit('giveDJProgram', result.data.programs)
    }
  }
}
const getters = {}
export default { state, mutations, actions, getters }
