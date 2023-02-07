<template>
  <div class="playlist-container">
    <!-- nav -->
    <div class="playlist-nav">
      <router-link to="/homepage"><span class="iconfont icon-zhixiangzuo"></span></router-link>
      <h5>歌单广场</h5>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.playlist-container {
  width: 100%;
  background-color: rgb(244, 244, 244);
  .playlist-nav {
    font-size: 40px;
    padding: 20px 0;
    margin: 0 12px;
    h5 {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
