<template>
  <div class="footer-container">
    <van-tabbar v-model="active" active-color="red" inactive-color="#000" class="tab" route>
      <van-tabbar-item class="iconfont icon-yinleyanzou" replace to="/homepage">发现</van-tabbar-item>
      <van-tabbar-item class="iconfont icon-faxian" replace to="/dj">播客</van-tabbar-item>
      <van-tabbar-item class="iconfont icon-yinle" replace to="/user">我的</van-tabbar-item>
      <van-tabbar-item class="iconfont icon-guanzhu" replace to="/follow">关注</van-tabbar-item>
      <van-tabbar-item class="iconfont icon-duihua" replace to="/community">社区</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      showSong: false
    }
  },
  created() {
    // 接收Song页面显示隐藏
    this.$bus.$on('showEvent', val => {
      this.showSong = val
    })
  }
}
</script>

<style lang="less" scoped>
.footer-container {
  width: 100%;
  z-index: 980;
}
</style>
