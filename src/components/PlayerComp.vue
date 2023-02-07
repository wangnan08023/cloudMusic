<template>
  <div class="play-container">
    <!-- 歌曲播放部分 -->
    <transition name="play">
      <songPlayComp class="play" v-if="showSong" :playStatus="isPlay" :show="showSong" :play="audioPlay" :pause="audioPause" :song="song"></songPlayComp>
    </transition>
    <!-- 音频 -->
    <audio :src="songURL" ref="audio" @canplay="canplay"></audio>
    <!-- 播放器部分 -->
    <div class="player" v-show="!showSong">
      <div class="pic" @click="isShowSong">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="text" @click="isShowSong">
        <p>{{ currentSong.name }} -
          <span v-for="(item,index) in currentSong.ar" :key="index">{{ item.name }}</span>
        </p>
      </div>

      <!-- 点击暂停 -->
      <span class="iconfont icon-bofang bf" v-show="!isPlay" @click="audioPlay"></span>
      <span class="iconfont icon-zanting bf" v-show="isPlay" @click="audioPause"></span>
      <span class="iconfont icon-24gf-playlist4"></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PlayerComp',
  data() {
    return {
      song: {
        songURL: 'http://m701.music.126.net/20230110104056/9ed288c6e4f4741e9e5e9e2e2928bbdd/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/10380270966/0bbb/9eca/b025/bbb29a2eb22f2fbc0a36bc75c2b55ed8.mp3',
        id: 1863992140,
        name: '不明显情人',
        ar: [{ name: '邵百庭' }]
      }, // 默认歌曲信息
      showSong: false, // 默认不显示歌曲页面
      isPlay: false, // 默认播放键
      timer: null,
      djID: ''
    }
  },
  props: ['show'],
  created() {
    // 接收DJ歌曲的id
    this.$bus.$on('djID', val => {
      this.djID = val
      console.log(223)
    })

    // 获取歌曲URL
    this.getSong()
    // 从songPlay页面接收song显示状态
    this.$bus.$on('showEvent', val => {
      this.showSong = val
      // 更新播放状态
      this.isPlay = this.$store.state.songPlay.playStatus
    })
    // 从recom页面/其他页面接收song显示状态
    this.$bus.$on('showPlay', val => {
      this.showSong = val
    })
  },
  computed: {
    ...mapState({
      songURL: state => {
        return state.songPlay.songURL
      },
      songList: state => {
        return state.songPlay.songList
      },
      songListIndex: state => {
        return state.songPlay.songListIndex
      }
    }),
    currentSong: function () {
      return this.songList[this.songListIndex] || this.song
    }
  },
  watch: {
    show: {
      handler(newV, oldV) {
        // 歌曲页面显示
        this.showSong = this.show
      }
    },
    songList: {
      // immediate: true,
      handler(newV, oldV) {
        // 歌曲信息更新就获取vuex中的播放状态
        this.isPlay = this.$store.state.songPlay.playStatus
        this.updateSongDuration()
      }
    },
    isPlay: {
      // 监听播放状态
      handler(newV, oldV) {
        if (this.isPlay) {
          // 如果播放状态为true,启动自动播放
          this.$refs.audio.autoplay = true
          // 触发updateCurrentTime定时器
          this.updateTime()
        } else {
          // 清除updateTime定时器
          clearInterval(this.timer)
        }
      }
    }
  },
  methods: {
    ...mapMutations(['updataPlayStatus', 'updataCurrentTime', 'updateSongDuration']),
    // 点击唱片，切换显示状态，同步发送给歌单+Find页面
    isShowSong() {
      this.showSong = true
      this.$bus.$emit('showEvent', this.showSong)
    },
    // 获取歌曲URL
    getSong() {
      if (this.$route.path === '/dj/detail') {
        this.$store.dispatch('getSongURL', this.djID)
      } else {
        this.$store.dispatch('getSongURL', this.currentSong.id)
      }
    },
    audioPlay() {
      this.$refs.audio.play()
      this.isPlay = true
      this.updataPlayStatus(this.isPlay)
    },
    audioPause() {
      this.$refs.audio.pause()
      this.isPlay = false
      this.updataPlayStatus(this.isPlay)
      // 清除updateTime定时器
      clearInterval(this.timer)
    },
    updateTime() {
      // 每隔1s更新当前时间
      this.timer = setInterval(() => {
        this.updataCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    },
    canplay() {
      // 当歌曲加载完后获取duration，否则duration=NaN
      this.updateSongDuration(this.$refs.audio.duration)
    }
  }
}
</script>

<style lang="less" scoped>
.play-container {
  // 歌曲播放部分
  .play {
    height: 100vh;
    overflow: hidden;
  }
  // 播放器部分
  .player {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    line-height: 100px;
    font-size: 28px;
    z-index: 970;
    padding: 10px 40px;
    background-color: #fff;
    .pic {
      height: 100px;
      line-height: 100px;
      margin-right: 20px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        border: 14px solid #333;
        font-size: 0;
        vertical-align: middle;
      }
    }
    .text {
      display: flex;
      justify-content: flex-start;
      width: 60%;
      p {
        width: 95%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        span {
          font-size: 26px;
          padding-left: 10px;
          color: #aaa;
        }
      }
    }
    .iconfont {
      font-size: 30px;
      margin-left: 50px;
    }
    .bf {
      font-size: 50px;
    }
  }
}
// .play-container {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   .play {
//     position: fixed;
//
//
//   }
//   .play-enter,
//   .play-leave-from {
//     opacity: 0;
//     transform: translateY(100%);
//   }
//   .play-enter-to,
//   .play-leave-to {
//     opacity: 1;
//     transform: translateY(0);
//   }
//   .play-enter-active,
//   .play-leave-active {
//     transition: all 0.5s ease;
//   }

// }
</style>
