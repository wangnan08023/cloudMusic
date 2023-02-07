<template>
  <div class="swiper-container-album">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in multiSwiperData" :key="index">
        <ul>
          <li v-for="item1 in item" :key="item1.albumId" @click="goDetail(item1.albumId)">
            <img v-lazy="item1.coverUrl" alt="">
            <div class="song">
              <p>{{item1.albumName}}</p>
              <span>{{ item1.artistName}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiSwiperComp',
  props: ['multiSwiperData'],
  methods: {
    goDetail(id) {
      // params传参
      const location = {
        name: 'albumDetail',
        params: {
          albumId: id
        }
      }
      this.$router.push(location)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container-album {
  .swiper-slide {
    ul {
      li {
        display: flex;
        margin-top: 40px;
        img {
          width: 15%;
          height: 15%;
          border-radius: 10px;
        }
        .song {
          margin-left: 10px;
          width: 80%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p {
            font-size: 32px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          span {
            font-size: 28px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
