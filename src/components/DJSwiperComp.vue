<template>
  <div class="swiper-container-recom">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in swiperData" :key="item.id" @click="goDetail(item.id)">
        <img v-lazy="item.picUrl" alt="">
        <p v-show="page">{{item.name}}</p>
        <p v-show="pagedj">{{item.rcmdtext}}</p>
      </div>

    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
export default {
  name: 'SwiperComp',
  props: ['swiperData', 'page', 'pagedj'],
  watch: {
    swiperData: {
      // 打开页面立即执行一次，第一次的oldvalue为undefined，newvalue为[]空数组
      immediate: true,
      handler(nval, oval) {
        // handler执行，说明此时数据发生了变化，但是swiper的js要做操作DOM的动作，需要在更新数据后DOM渲染完毕后再执行
        this.$nextTick(() => {
          if (nval !== []) {
            // console.log('执行了swiper')
            // eslint-disable-next-line no-unused-vars
            const mySwiperRecom = new Swiper('.swiper-container-recom', {
              slidesPerView: 3.1
            })
          }
        })
      }
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({ path: '/dj/detail', query: { listId: id } })
    }
  }
}
</script>

<style lang="less" scoped>
// 推荐歌单
.swiper-container-recom {
  position: relative;
  overflow: hidden;
  .swiper-wrapper {
    width: 100%;
    // text-align: center;
    img {
      width: 50%;
      border-radius: 50%;
      background: rgb(250, 215, 215);
    }
  }

  .swiper-wrapper {
    color: #aaa;
    img {
      width: 90%;
      border-radius: 0.5051rem;
    }
  }
}
</style>
