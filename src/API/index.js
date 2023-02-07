// API管理文件
import requests from './request.js'
// 获取歌曲URL
export const ReqSongURL = function (id) {
  return requests({
    url: `/song/url?id=${id}`,
    method: 'get'
  })
}
// 获取歌曲歌词
export const ReqSongLyric = function (id) {
  return requests({
    url: `/lyric?id=${id}`,
    method: 'get'
  })
}
// 获取首页banner
export const ReqBannerInfo = function () {
  return requests({
    url: '/banner',
    method: 'get'
  })
}
// 获取首页-发现-圆形图标入口列表
export const ReqNavInfo = function () {
  return requests({
    url: '/homepage/dragon/ball',
    method: 'get'
  })
}
// 获取推荐歌单
export const ReqRecomPlaylist = function () {
  return requests({
    url: '/personalized',
    method: 'get'
  })
}
// 获取数字专辑
export const ReqAlbumList = function () {
  return requests({
    url: '/album/list?limit=21',
    method: 'get'
  })
}
// 获取二次页面-官方榜
export const ReqOfficialList = function () {
  return requests({
    url: '/toplist/detail',
    method: 'get'
  })
}
// 获取二次页面-数字专辑
export const ReqAlbumDetail = function (id) {
  return requests({
    url: `album/detail?id=${id}`,
    method: 'get'
  })
}
// 获取二次页面-数字专辑-售卖数量
export const ReqAlbumDetailSales = function (id) {
  return requests({
    url: `/digitalAlbum/sales?ids=${id}`,
    method: 'get'
  })
}
// 获取二次页面-当前歌单详情
export const ReqRecomListDetail = function (id) {
  return requests({
    url: `/playlist/detail?id=${id}`,
    method: 'get'
  })
}
// 获取二次页面-DJ详情
export const ReqDJListDetail = function (id) {
  return requests({
    url: `/dj/detail?rid=${id}`,
    method: 'get'
  })
}
// 获取二次页面-DJ节目单
export const ReqDJProgram = function (id) {
  return requests({
    url: `/dj/program?rid=${id}&limit=40`,
    method: 'get'
  })
}
// 获取二次页面-当前歌单所有歌曲
export const ReqRecomListSongs = function (id) {
  return requests({
    url: `/playlist/track/all?id=${id}&limit=20`,
    method: 'get'
  })
}
// 获取二次页面-搜索关键字
export const ReqSearchKeyword = function () {
  return requests({
    url: '/search/default',
    method: 'get'
  })
}
// 获取二次页面-搜索 热搜榜
export const ReqHotSearch = function () {
  return requests({
    url: '/search/hot/detail',
    method: 'get'
  })
}
// 获取二次页面-搜索结果(单曲)
export const ReqSearchResult = function (keyword) {
  return requests({
    url: `/cloudsearch?keywords=${keyword}`,
    method: 'get'
  })
}
// 获取二次页面-搜索结果(歌单)
export const ReqSearchResList = function (keyword) {
  return requests({
    url: `/cloudsearch?keywords=${keyword}&type=1000`,
    method: 'get'
  })
}
// 获取二次页面-歌曲详情
export const ReqSongDetail = function (id) {
  return requests({
    url: `/song/detail?ids=${id}`,
    method: 'get'
  })
}
// 获取DJ页面banner
export const ReqDJbanner = function () {
  return requests({
    url: '/dj/banner',
    method: 'get'
  })
}
// 获取DJ电台推荐
export const ReqDJrecom = function () {
  return requests({
    url: '/dj/personalize/recommend',
    method: 'get'
  })
}
// 获取DJ电台分类id
export const ReqDJcategory = function () {
  return requests({
    url: '/dj/catelist',
    method: 'get'
  })
}
// 获取DJ人文历史等Catogoty1
export const ReqDJCatogoty1 = function (type) {
  return requests({
    url: `/dj/recommend/type?type=${type}`,
    method: 'get'
  })
}
// 获取DJ电台付费精选
export const ReqDJpayGift = function () {
  return requests({
    url: '/dj/paygift',
    method: 'get'
  })
}
// 获取验证码
export const ReqCaptcha = function (phone) {
  return requests({
    url: `/captcha/sent?phone=${phone}`,
    method: 'get'
  })
}
// 获取登陆信息
export const ReqUserInfo = function (data) {
  return requests({
    url: `/login/cellphone?phone=${data.phone}&captcha=${data.captchaInfo}`,
    method: 'get'
  })
}
// 获取二维码key
export const ReqQrKey = function (timestamp) {
  return requests({
    url: `/login/qr/key?timestamp=${timestamp}`,
    method: 'get'
  })
}
// 生成二维码
export const ReqQrPic = function (data) {
  return requests({
    url: `/login/qr/create?key=${data.key}&qrimg=true&timestamp=${data.timestamp}`,
    method: 'get'
  })
}
// 监测二维码
export const ReqQrCheck = function (data) {
  return requests({
    url: `/login/qr/check?key=${data.key}&timestamp=${data.timestamp}`,
    method: 'get'
  })
}
// 获取登陆状态
export const ReqUserStatus = function (cookie) {
  return requests({
    url: `/login/status?cookie=${cookie}`,
    method: 'get'
  })
}
// 获取用户详情
export const ReqUserInfoDetail = function (id) {
  return requests({
    url: `/user/detail?uid=${id}`,
    method: 'get'
  })
}
// 获取用户歌单
export const ReqUserPlaylist = function (id) {
  return requests({
    url: `/user/playlist?uid=${id}`,
    method: 'get'
  })
}
// 请求退出登录
export const ReqLogout = function (id) {
  return requests({
    url: '/logout',
    method: 'get'
  })
}
