<template>
  <div class="dj-container" v-show="!isshow">
    <HeaderView></HeaderView>
    <!-- banner-->
    <div class="dj-banner">
      <div class="swiper-container">
        <div class="swiper-wrapper" v-if="djBanner.length!=0">
          <div class="swiper-slide" v-for="item in djBanner" :key="item.targetId">
            <img :src="item.pic" alt="">
            <span>{{ item.typeTitle }}</span>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 电台个性推荐 -->
    <div class="dj-recom">
      <h2>个性推荐 &gt;</h2>
      <button>更多 ></button>
      <DJSwiperComp :swiperData="djRecom.list" :pagedj="DJpage"></DJSwiperComp>
    </div>
    <!-- 电台付费精选-->
    <div class="dj-paygift">
      <!-- <MultiDJSwiperComp :multiSwiperData=""></MultiDJSwiperComp> -->
    </div>
    <!-- 人文历史Catogoty1 -->
    <div class="Catogoty1">
      <h2>人文历史 &gt;</h2>
      <button>更多 ></button>
      <DJSwiperComp :swiperData="djCatogoty1[0]" :pagedj="DJpage"></DJSwiperComp>
    </div>
    <!-- 有声书Catogoty1 -->
    <div class="Catogoty1">
      <h2>有声书 &gt;</h2>
      <button>更多 ></button>
      <DJSwiperComp :swiperData="djCatogoty1[1]" :pagedj="DJpage"></DJSwiperComp>
    </div>
    <!-- 二次元Catogoty1 -->
    <div class="Catogoty1">
      <h2>二次元&gt;</h2>
      <button>更多 ></button>
      <DJSwiperComp :swiperData="djCatogoty1[2]" :pagedj="DJpage"></DJSwiperComp>
    </div>
    <!-- 明星专区Catogoty1 -->
    <div class="Catogoty1">
      <h2>明星专区&gt;</h2>
      <button>更多 ></button>
      <DJSwiperComp :swiperData="djCatogoty1[3]" :pagedj="DJpage"></DJSwiperComp>
    </div>
    <!-- 亲子Catogoty1 -->
    <div class="Catogoty1">
      <h2>亲子&gt;</h2>
      <button>更多 ></button>
      <DJSwiperComp :swiperData="djCatogoty1[4]" :pagedj="DJpage"></DJSwiperComp>
    </div>
    <!-- 新闻资讯Catogoty1 -->
    <div class="Catogoty1">
      <h2>新闻资讯&gt;</h2>
      <button>更多 ></button>
      <DJSwiperComp :swiperData="djCatogoty1[5]" :pagedj="DJpage"></DJSwiperComp>
    </div>
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
  components: {
    HeaderView
  },
  data() {
    return {
      name: ['人文历史', '有声书', '二次元', '明星专区', '亲子', '新闻资讯'],
      type: [],
      DJpage: true,
      isshow: false // Song页面默认不显示
    }
  },
  created() {
    // 派发banner数据请求
    this.$store.dispatch('getDJbanner')
    // 派发电台个性推荐数据请求
    this.$store.dispatch('getDJrecom')
    // 派发电台分类数据请求，获取分类数组
    this.$store.dispatch('getDJcategory')
    // 接收Song显示隐藏
    this.$bus.$on('showEvent', val => {
      this.isshow = val
    })
  },
  computed: {
    ...mapState({
      djBanner: state => {
        return state.DJ.djBanner
      },
      djRecom: state => {
        return { list: state.DJ.djRecom, title: 'rcmdText' }
      },
      djCategory: state => {
        return state.DJ.djCategories
      },
      djCatogoty1: state => {
        return state.DJ.djCatogoty1
      }
    })
  },
  watch: {
    djBanner: {
      // immediate: true,
      // 当数据发生变化
      handler(newVal, oldVal) {
        let isLoop = false
        if (newVal.length > 1) {
          isLoop = true
        } else {
          isLoop = false
        }
        // 当DOM渲染完成
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper('.swiper-container', {
            loop: isLoop, // 循环模式选项
            autoplay: isLoop,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    },
    djCategory: {
      handler(newV, oldV) {
        if (newV.length !== 0) {
          for (const item of this.name) {
            this.findCategotyType(item, newV)
          }
          for (const item of this.type) {
            // 派发人文历史电台数据请求
            this.$store.dispatch('getDJCatogoty1', item)
          }
        }
      }
    }
  },
  methods: {
    findCategotyType(name, djCategory) {
      djCategory.forEach(item => {
        if (item.name === name) {
          this.type.push(item.id)
          // console.log(item.id)
          return item.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dj-container {
  width: 100%;
  padding: 80px 0 250px;
  font-size: 28px;
  background-color: rgb(238, 238, 238);

  .dj-banner {
    padding: 20px;
    .swiper-container {
      position: relative;
      width: 100%;
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
  }
  .dj-recom,
  .Catogoty1 {
    position: relative;
    font-size: 24px;
    margin-top: 20px;
    padding: 20px;
    margin: 20px;
    background-color: #fff;
    border-radius: 40px;
    h2 {
      font-size: 36px;
      margin: 20px 0;
    }
    button {
      position: absolute;
      top: 40px;
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
