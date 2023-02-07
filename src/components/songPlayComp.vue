<template>
  <div class="song-play-container" v-show="showSong">
    <!-- <transition> -->
    <div>
      <!-- 首行 -->
      <div class="firstline">
        <span class="iconfont icon-xiala" @click="hide"></span>
        <div class="title">
          <p>{{ currentSong.name }}</p>
          <p>
            <span v-for="(item,index) in currentSong.ar" :key="index">{{ item.name }} </span>
            &nbsp;>
          </p>
        </div>
        <span class="iconfont icon-fenxiang"></span>
      </div>
      <div class="Copyright">
        <div class="middle-nolrc" v-show="!showLyric" @click="toggleLrc">
          <!-- 指针 -->
          <div class="neddle">
            <img src="./images/needle.png" alt="" ref="neddle" :class="needleclass">
          </div>
          <!-- 唱片 -->
          <div class="record">
            <img src="./images/record.png" alt="">
            <img src="@/assets/logo.png" alt="">
          </div>
        </div>
        <!-- 歌词 -->
        <div class="middle-lrc" v-show="showLyric" @click="toggleLrc" ref="middleLrc">
          <p v-for="(item,index) in songLyric" :key="index" :class="{'active':((currentTime>=item.time&&currentTime<item.next)||isNaN(item.time))}">{{ item.text }}
          </p>
        </div>
        <!-- 提示版权 -->
        <div class="copyright" v-show="noCopyrightShow">
          <p>很抱歉，该歌暂无版权</p>
        </div>
        <!-- 喜欢tab -->
        <ul class="like">
          <li>
            <span class="iconfont icon-xihuan"></span>
          </li>
          <li>
            <span class="iconfont icon-xiazai1"></span>
          </li>
          <li>
            <span class="iconfont icon-yichang"></span>
          </li>
          <li>
            <span class="iconfont icon-wodepinglun"></span>
          </li>
          <li>
            <span class="iconfont icon-qita"></span>
          </li>
        </ul>
        <!-- 进度条 -->
        <div class="slider">
          <input type="range" min="0" :max="duration" v-model="currentTime" step="0.05">
        </div>
        <!-- 播放栏 -->
        <ul class="play">
          <li>
            <span class="iconfont icon-suijibofang" v-show="this.order===0"></span>
            <span class="iconfont icon-danquxunhuan" v-show="this.order===1"></span>
            <span class="iconfont icon-23_shunxubofang" v-show="this.order===2"></span>
          </li>
          <li>
            <span class="iconfont icon-shangyishoushangyige" @click="changeSong(-1)"></span>
          </li>
          <li>
            <!-- 点击暂停 -->
            <span class="iconfont icon-bofang" v-show="!isPlay" @click="audioPlay"></span>
            <!-- 点击播放 -->
            <span class="iconfont icon-zanting" @click="audioPause" v-show="isPlay"></span>
          </li>
          <li>
            <span class="iconfont icon-xiayigexiayishou" @click="changeSong(1)"></span>
          </li>
          <li>
            <span class="iconfont icon-24gl-playlistMusic"></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'songPlayComp',
  data() {
    return {
      order: 0,
      // 无版权页面：默认不显示
      noCopyrightShow: false,
      needleclass: 'needleplay',
      showLyric: false,
      // 播放键状态:默认false
      isPlay: this.playStatus,
      // 显示隐藏状态
      showSong: this.show,
      djID: ''
    }
  },
  created() {
    // 获取歌曲信息
    this.getSong()
    // 获取歌曲播放状态
    this.isPlay = this.$store.state.songPlay.playStatus
    // 初始化neddle状态
    if (!this.isPlay) {
      this.needleclass = 'needlepause'
    } else {
      this.needleclass = 'needleplay'
    }
    // 接收DJ歌曲的id
    this.$bus.$on('djID', val => {
      this.djID = val
      console.log(223)
    })
  },
  props: ['show', 'play', 'playStatus', 'pause', 'song'],
  watch: {
    // 歌曲信息变化，就要重新获取歌曲信息渲染
    currentSong: function () {
      this.getSong()
    },
    // 监听时间变化
    currentTime: {
      handler(oldV, newV) {
        const lycbox = this.$refs.middleLrc
        const currentlrc = document.querySelector('p.active')
        if (currentlrc) {
          if (currentlrc.offsetTop >= 340) {
            lycbox.scrollTop = currentlrc.offsetTop - 340
          }
        }
        // 如果播放完毕，自动切换下一首歌曲
        if (newV === this.duration) {
          this.changeSong(1)
        }
      }
    }
  },
  computed: {
    ...mapState({
      songURL: state => {
        return state.songPlay.songURL
      },
      songLyric: state => {
        if (state.songPlay.songLyric.lyric) {
          const lrc = state.songPlay.songLyric.lyric.split(/[\r\n(\r\n)+]/).map((item, index) => {
            item = item.split(']')
            const m = item[0].slice(1, 3)
            const s = item[0].slice(4, 6)
            const milli = item[0].split('.')[1]
            const time = parseInt(m * 60 * 1000) + parseInt(s * 1000) + parseInt(milli)
            const text = item[1]
            return { m, s, milli, text, time }
          })
          lrc.forEach((item, i) => {
            if (i === lrc.length - 1) {
              // 最后一句
              item.next = 10000000000
            } else {
              // 确定下一句的时间
              item.next = lrc[i + 1].time
            }
          })
          return lrc
        } else {
          return ''
        }
      },
      songList: state => {
        return state.songPlay.songList
      },
      songListIndex: state => {
        return state.songPlay.songListIndex
      },
      currentTime: state => {
        return state.songPlay.currentTime * 1000
      },
      duration: state => {
        return state.songPlay.songDuration * 1000
      }
    }),
    currentSong: function () {
      return this.songList[this.songListIndex] || this.song
    }
  },
  methods: {
    ...mapMutations(['updataPlayStatus', 'updataSongListIndex']),
    // 获取歌曲信息
    getSong() {
      // 获取歌曲URL
      if (this.$route.path === '/dj/detail') {
        this.$store.dispatch('getSongURL', this.currentSong.mainSong.id)
      } else {
        this.$store.dispatch('getSongURL', this.currentSong.id)
      }
      // 如果有版权
      if (this.songURL != null) {
        // 不显示版权提示信息
        this.noCopyrightShow = false
      } else {
        // 显示版权提示信息
        this.noCopyrightShow = true
        // 显示播放按钮
        this.isPlay = false
      }
    },
    // 点击隐藏
    hide() {
      this.showSong = false
      // 通知已隐藏
      this.$bus.$emit('showEvent', this.showSong)
    },
    toggleLrc() {
      this.$store.dispatch('getSongLyric', this.currentSong.id)
      if (this.showLyric) {
        this.showLyric = false
      } else {
        this.showLyric = true
      }
    },
    audioPlay() {
      this.play()
      this.isPlay = !this.isPlay
      this.needleclass = 'needleplay'
    },
    audioPause() {
      this.pause()
      this.isPlay = !this.isPlay
      this.needleclass = 'needlepause'
    },
    changeSong(num) {
      let index = this.songListIndex + num
      if (index < 0) {
        index = this.songList.length - 1
      } else if (index > this.songList.length - 1) {
        index = 0
      }
      this.updataSongListIndex(index)
    }
  }
}
</script>

<style lang="less" scoped>
.song-play-container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 40px;
  font-size: 28px;
  color: #fff;
  background: linear-gradient(to right, #33668c -50%, #243949 50%, #33668c 150%);

  .firstline {
    display: flex;
    justify-content: space-between;
    .iconfont {
      font-size: 40px;
    }
    .title {
      width: 70%;
      p {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p:nth-child(2) {
        color: #aaa;
      }
    }
  }
  .Copyright {
    .middle-nolrc {
      height: 1000px;
      margin: 20px;
      .neddle {
        position: relative;
        padding: 20px;
        .needlepause,
        .needleplay {
          position: absolute;
          left: 50%-5px;
          top: 20px;
          width: 30%;
          z-index: 999;
          transform: rotate(-30deg);
          transform-origin: 30px 30px;
          transition: all 0.8s ease;
        }
        .needleplay {
          transform: rotate(0deg);
        }
      }
      .record {
        width: 100%;
        position: relative;
        img {
          display: block;
          width: 600px;
          height: 600px;
          margin: 150px auto;
        }
        img:nth-child(2) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          border-radius: 50%;
          margin: 0;
        }
      }
    }
    .middle-lrc {
      height: 1000px;
      margin: 20px;
      text-align: center;
      line-height: 80px;
      overflow: scroll;
      padding: 80px 30px 180px 0;
      scroll-behavior: smooth;
      .active {
        color: skyblue;
        font-size: 30px;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .copyright {
      text-align: center;
      color: rgb(182, 13, 13);
    }
    .like {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      margin-top: 30px;
      color: rgba(255, 255, 255, 0.8);
      span {
        font-size: 48px;
      }
    }
    .slider {
      width: 100%;
      height: 100px;
      line-height: 100px;
      input {
        width: 100%;
        height: 4px;
      }
    }
    .play {
      display: flex;
      justify-content: space-between;
      padding: 20px 20px 40px 20px;
      height: 190px;
      line-height: 190px;
      li {
        span {
          font-size: 48px;
        }
        &:nth-child(3) {
          span {
            font-size: 100px;
          }
        }
      }
    }
  }
}
</style>
