<template>
  <div class="recom-container">
    <!-- 歌单部分 -->
    <transition name="recom">
      <div class="recom">
        <!-- 上部分 -->
        <div class="top-box">
          <!-- nav -->
          <div class="recom-nav">
            <span class="iconfont icon-zhixiangzuo" @click="back"></span>
            <!-- <h5>歌单</h5> -->
            <div class="icon">
              <span class="iconfont icon-sousuo"></span>
              <span class="iconfont icon-qita"></span>
            </div>
          </div>
          <ul class="list-title">
            <li>
              <img :src="djListDetail.picUrl" alt="">
            </li>
            <li>
              <p>{{djListDetail.name}}</p>
              <div v-if="djListDetail.dj">
                <img :src="djListDetail.dj.avatarUrl" alt="">
                {{djListDetail.dj.nickname}}
                <span>+关注</span>
              </div>
            </li>
          </ul>
          <div class="intro">
            <p> {{djListDetail.rcmdText}}</p>
            <span class="iconfont icon-xiangyou1"></span>
          </div>
          <ul class="btn">
            <li>
              <span class="iconfont icon-zhuanfa"></span>
              {{djListDetail.shareCount}}
            </li>
            <li>
              <span class="iconfont icon-duihua1"></span>
              {{djListDetail.commentCount}}
            </li>
            <li>
              <span class="iconfont icon-daohangshoucangyishoucang"></span>
              {{djListDetail.subCount}}
            </li>
          </ul>
        </div>
        <!-- 下部分 -->
        <div class="box-list">
          <div class="first-line">
            <span class="iconfont icon-24gf-playCircle"></span>
            <p>播放全部</p>
            <div class="right-icon">
              <span class="iconfont icon-xiazai"></span>
              <span class="iconfont icon-quanxuan"></span>
            </div>
          </div>
          <ul class="songlist">
            <li v-for="(item,index) in djProgram" :key="item.id" @click="isShowPlay(index,djProgram,item.mainSong.id)">
              <img :src="item.coverUrl" alt="">
              <div class="name">
                <p>{{item.name}}</p>
                <p>
                  <span class="author">
                    {{item.duration}}
                  </span>
                </p>
              </div>
              <span class="iconfont icon-qita"></span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      showPlay: false, // 显示歌曲页面
      data: {}, // 存储歌曲整体信息(点击之后才存储)，
      playStatus: false
    }
  },
  created() {
    // 获取二次页面-当前DJ详情
    this.$store.dispatch('getDJListDetail', this.$route.query.listId)
    // 获取二次页面-当前DJ所有歌曲
    this.$store.dispatch('getDJProgram', this.$route.query.listId)
    // 从SongPlay页面接收Song隐藏状态
    this.$bus.$on('showEvent', val => {
      this.showPlay = val
    })
    // 通知App
    this.$bus.$emit('recomListCreated')
  },
  computed: {
    ...mapGetters(['playlist', 'privileges', 'songs']),
    ...mapState({
      djListDetail: state => {
        return state.DJ.djListDetail || {}
      },
      djProgram: state => {
        return state.DJ.djProgram || []
      }
    })
  },
  methods: {
    ...mapMutations(['updateSongList', 'updataPlayStatus']),
    // 点击歌单中的某个歌曲,将歌单及索引信息存储到vuex中
    isShowPlay(index, songs, id) {
      // 显示歌曲页面，传递状态给player
      this.showPlay = !this.showPlay
      this.$bus.$emit('showPlay', this.showPlay)
      // 存储列表信息到全局vuex
      const data = {
        songs: songs,
        index: index
      }
      // 同步SongList给vuex
      this.updateSongList(data)
      // 更新播放状态,同步给vuex
      this.playStatus = true
      this.updataPlayStatus(this.playStatus)
      //
      this.$bus.$emit('djID', id)
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.recom-container {
  position: relative;
  width: 100%;
  font-size: 32px;
  padding-bottom: 100px;
  background-color: rgb(244, 244, 244);
  // 播放器
  .PlayerComp {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }
  // 过度
  .recom-enter,
  .recom-leave-from {
    opacity: 1;
  }
  .recom-enter-to,
  .recom-leave-to {
    opacity: 0;
  }
  .recom-enter-active,
  .recom-leave-active {
    transition: all 0.5s ease;
  }
  // 歌单样式
  .recom {
    .top-box {
      padding: 20px 20px 40px 20px;
      background: linear-gradient(#609f68, #99cba2);
      .recom-nav {
        position: relative;
        font-size: 40px;
        // padding: 20px 0;
        margin: 0 12px;
        h5 {
          display: inline-block;
          margin-left: 20px;
        }
        .icon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          span {
            margin-left: 20px;
          }
        }
      }
      .list-title {
        display: flex;
        justify-content: flex-start;
        margin: 30px 0;
        font-size: 24px;
        height: 180px;
        color: #ccc;
        li:nth-child(1) {
          img {
            width: 170px;
            height: 170px;
            border-radius: 20px;
          }
        }
        li:nth-child(2) {
          margin-left: 30px;
          p {
            font-size: 32px;
            color: #333;
            margin-bottom: 20px;
          }
          img {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            vertical-align: middle;
          }
        }
      }
      .intro {
        display: flex;
        justify-content: flex-start;
        color: #ddd;
        p {
          white-space: nowrap;
          overflow: hidden;
          width: 95%;
          text-overflow: ellipsis;
          font-size: 24px;
        }
      }
      .btn {
        display: flex;
        justify-content: space-between;
        margin: 30px 0;
        li {
          width: 30%;
          height: 60px;
          line-height: 60px;
          border-radius: 30px;
          text-align: center;
          color: #fff;
          background-color: #ccc;
        }
      }
    }
    .box-list {
      background-color: #99cba2;
      font-size: 28px;
      .first-line {
        position: relative;
        display: flex;
        justify-content: flex-start;
        height: 80px;
        padding: 30px 20px;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        background: linear-gradient(#e3f6e7, #ffffff);
        p {
          margin-left: 20px;
        }
        .right-icon {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          span {
            margin-left: 20px;
          }
        }
      }
      .songlist {
        padding: 10px 20px 30px 20px;
        background-color: #fff;
        li {
          display: flex;
          justify-content: flex-start;
          height: 100px;
          margin: 20px 0;
          img {
            width: 100px;
          }
          span {
            line-height: 70px;
            margin-left: 30px;
            color: #aaa;
          }
          .id {
            width: 10%;
            padding-left: 10px;
            color: #aaa;
          }
          .name {
            width: 70%;
            margin-left: 30px;
            p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              .author {
                margin: 0;
                margin-right: 20px;
                color: #ccc;
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
