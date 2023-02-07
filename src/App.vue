<template>
  <div class="container">
    <tbody></tbody>
    <router-view class="router-view"></router-view>
    <!-- 播放器部分 -->
    <PlayerComp class="PlayerComp" v-show="this.$route.meta.playerShow" ref="PlayerComp"></PlayerComp>
    <FooterView class="footer" ref="FooterView" v-show="this.$route.meta.footerShow"></FooterView>
  </div>
</template>

<script>
import FooterView from '@/components/FooterView.vue'

export default {
  components: {
    FooterView
  },
  created() {
    // 接收Song隐藏状态
    this.$bus.$on('showEvent', val => {
      // tabbar在
      if (this.$route.meta.footerShow) {
        console.log(this.$route.meta.footerShow)
        if (val) {
          this.$refs.FooterView.$el.style.display = 'none'
          this.$refs.PlayerComp.$el.style.bottom = 0
        } else {
          this.$refs.FooterView.$el.style.display = 'block'
          this.$refs.PlayerComp.$el.style.bottom = '50px'
        }
      } else {
        // tabbar不在
        this.$refs.PlayerComp.$el.style.bottom = 0
      }
    })
    // 接收recom页面创建的信号,移动player位置
    this.$bus.$on('recomListCreated', () => {
      this.$nextTick(() => {
        this.movePlayer()
      })
    })
  },
  updated() {
    this.$nextTick(() => {
      this.movePlayer()
    })
  },
  methods: {
    // player位置
    movePlayer() {
      // tabbar不在
      if (!this.$route.meta.footerShow) {
        this.$refs.PlayerComp.$el.style.bottom = 0
      } else {
        this.$refs.PlayerComp.$el.style.bottom = '50px'
      }
    }
  }
}
</script>

<style lang="less">
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: rgb(238, 238, 238);

  .PlayerComp {
    position: fixed;
    bottom: 100px;
    left: 0;
    width: 100%;
    z-index: 99;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
}
</style>
