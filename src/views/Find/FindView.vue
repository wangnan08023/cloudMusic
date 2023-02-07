<template>
  <div class="find-container" ref="findCont" v-show="!isshow">
    <HeaderView class="HeaderView"></HeaderView>
    <!-- 头部推荐 -->
    <div class="recom">
      <!-- banner-->
      <div class="swiper-container">
        <div class="swiper-wrapper" v-if="bannerList.length!=0">
          <div class="swiper-slide" v-for="item in bannerList" :key="item.scm">
            <img :src="item.imageUrl" alt="">
            <span>{{ item.typeTitle }}</span>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 导航 -->
      <div class="swiper-container-nav">
        <div class="swiper-wrapper" v-if="navList.length!=0">
          <div class="swiper-slide" v-for="item in navList" :key="item.id" @click="goNextPage(item.id)">
            <img v-lazy="item.iconUrl" alt="">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <!-- 推荐歌单 -->
      <div class="recomPlaylist">
        <h2>推荐歌单 &gt;</h2>
        <button>更多 ></button>
        <SwiperComp :swiperData="recomPlaylist" :page="true"></SwiperComp>
      </div>
    </div>
    <!-- 新歌新碟\数字专辑 -->
    <div class="newAlbum">
      <h3>新歌新碟\数字专辑 &gt;</h3>
      <MultiSwiperComp :multiSwiperData="albumList"></MultiSwiperComp>
    </div>
    <!-- LOOK直播 -->
    <div class="look-live">
      <h2>LOOK直播 &gt;</h2>
      <button>更多 ></button>
      <SwiperComp :swiperData="lookLiveList" :page="true"></SwiperComp>
    </div>
    <!-- 自定义排序 -->
    <div class="button-rank">自定义排序</div>
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import Swiper, { Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { mapState } from 'vuex'
Swiper.use([Pagination, Autoplay])
export default {
  name: 'FindView',
  components: {
    HeaderView
  },
  data() {
    return {
      scroll: true,
      bodycont: document.querySelector('body'),
      isshow: false // Song页面默认不显示
    }
  },
  created() {
    // 派发banner数据请求
    this.$store.dispatch('getBannerList')
    // 派发首页nav数据请求
    this.$store.dispatch('getNavList')
    // 派发推荐歌单数据请求
    this.$store.dispatch('getRecomPlaylist')
    // 派发数字专辑数据请求
    this.$store.dispatch('getAlbumList')
    // 接收Header组件的scroll
    this.$bus.$on('getScoll', val => {
      this.scroll = val
    })
    // 接受显示隐藏
    this.$bus.$on('show', val => {
      this.isshow = val
    })
  },
  updated() {
    // 接收Song隐藏状态
    this.$bus.$on('showEvent', val => {
      this.isshow = val
    })
  },
  watch: {
    bannerList: {
      // immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    },
    navList: {
      // immediate: true,
      handler(newval, oldval) {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiperNav = new Swiper('.swiper-container-nav', {
            slidesPerView: 5.1
          })
        })
      }
    },
    albumList: {
      handler(newval, oldval) {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiperAlbum = new Swiper('.swiper-container-album', {
            slidesPerView: 1.1
          })
        })
      }
    },
    scroll: {
      handler(newV, oldV) {
        this.isScroll()
      }
    }
  },
  computed: {
    ...mapState({
      bannerList: state => {
        return state.Find.bannerList
      },
      navList: state => {
        return state.Find.navList
      },
      recomPlaylist: state => {
        return state.Find.recomPlaylist.slice(0, 6)
      },
      lookLiveList: state => {
        return state.Find.recomPlaylist.slice(7, 13)
      },
      albumList: state => {
        const newAlbum = []
        const oldAlbum = state.Find.albumList
        for (let i = 0; i < Math.ceil(oldAlbum.length / 3); i++) {
          const arr = oldAlbum.slice(i * 3, i * 3 + 3)
          newAlbum.push(arr)
        }
        return newAlbum
      }
    })
  },
  methods: {
    goNextPage(id) {
      if (id === -3) {
        this.$router.push({ path: '/homepage/toplist' })
      } else if (id === -2) {
        this.$router.push({ path: '/homepage/playlist' })
      }
    },
    isScroll() {
      if (!this.scroll) {
        this.bodycont.style.overflow = 'hidden'
      } else {
        this.bodycont.style.overflow = 'scroll'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.find-container {
  position: relative;
  width: 100%;
  padding: 80px 0 250px;
  font-size: 28px;
  background-color: rgb(238, 238, 238);
  // 头部推荐
  .recom {
    background: linear-gradient(rgb(238, 238, 238), 3%, #fff);
    border-bottom-right-radius: 36px;
    border-bottom-left-radius: 36px;
    padding-top: 36px;
    padding-bottom: 36px;
    // banner
    .swiper-container {
      position: relative;
      width: 95%;
      height: 95%;
      border-radius: 30px;

      .swiper-wrapper {
        .swiper-slide {
          img {
            width: 100%;
          }
          span {
            position: absolute;
            bottom: 30px;
            right: 5px;
            padding: 0 10px;
            border-radius: 30px;
            font-size: 20px;
            background-color: #fff;
          }
        }
      }
    }
    // 导航
    .swiper-container-nav {
      overflow: hidden;
      margin-left: 20px;
      margin-top: 20px;
      .swiper-wrapper {
        width: 100%;
        text-align: center;
        font-size: 24px;
        img {
          width: 50%;
          border-radius: 50%;
          background: rgb(250, 215, 215);
        }
      }
    }
    // 推荐歌单
    .recomPlaylist {
      position: relative;
      margin-left: 20px;
      margin-top: 60px;
      font-size: 24px;
      h2 {
        font-size: 36px;
        margin: 20px 0;
      }
      button {
        position: absolute;
        top: 0;
        right: 20px;
        padding: 5px 20px;
        border-radius: 0.7576rem;
        text-align: center;
        color: #aaa;
        border: 1px solid #eee;
        background-color: #fff;
      }
    }
  }
  // 数字专辑
  .newAlbum {
    border-radius: 40px;
    margin: 40px 0;
    padding: 40px 20px;
    overflow: hidden;
    background-color: #fff;
    h3 {
      font-size: 36px;
    }
  }

  // LOOK直播
  .look-live {
    position: relative;
    margin-top: 40px;
    font-size: 24px;
    padding: 20px;
    background-color: #fff;
    border-radius: 40px;
    h2 {
      font-size: 36px;
      margin: 20px 0;
    }
    button {
      position: absolute;
      top: 46px;
      right: 20px;
      padding: 5px 20px;
      border-radius: 0.7576rem;
      text-align: center;
      color: #aaa;
      border: 1px solid #eee;
      background-color: #fff;
    }
  }
  .button-rank {
    width: 30%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin: 0 auto;
    margin-top: 40px;
    border-radius: 30px;
    background-color: rgb(220, 220, 220);
  }
}
</style>
