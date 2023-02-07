<template>
  <div class="user-container">
    <HeaderView></HeaderView>
    <!-- 已登录 -->
    <div class="login" v-show="!isshow">
      <!-- 头像 -->
      <div class="userpic">
        <img :src="userStatus.avatarUrl" alt="">
        <h3>{{ userStatus.nickname }}</h3>
        <p>
          <span>{{ userProfile.follows }}个关注</span>
          <span>{{ userProfile.followeds }} 粉丝</span>
          <span>Lv.{{ userInfoDetail.level }}</span>
        </p>
      </div>
      <!-- tab栏目 -->
      <div class="usertab">
        <ul>
          <li>
            <span class="iconfont icon-24gf-playCircle"></span>
            <p>最近播放</p>
          </li>
          <li>
            <span class="iconfont icon-yinle1"></span>
            <p>本地/下载</p>
          </li>
          <li>
            <span class="iconfont icon-yunpan"></span>
            <p>云盘</p>
          </li>
          <li>
            <span class="iconfont icon-gouwu"></span>
            <p>已购</p>
          </li>
          <li>
            <span class="iconfont icon-haoyou"></span>
            <p>我的好友</p>
          </li>
          <li>
            <span class="iconfont icon-shoucang"></span>
            <p>收藏和赞</p>
          </li>
          <li>
            <span class="iconfont icon-faxian"></span>
            <p>我的播客</p>
          </li>
          <li>
            <span class="iconfont icon-yinle2"></span>
            <p>乐谜团</p>
          </li>
        </ul>
      </div>
      <!-- 我喜欢的音乐 -->
      <div class="like">
        <ul @click="goDetail(like.id)">
          <li><img :src="like.coverImgUrl" alt=""></li>
          <li>
            <p>我喜欢的音乐</p>
            <span>{{ like.trackCount }}首</span>
          </li>
          <li>
            <p>
              <span></span>
              心动模式
            </p>
          </li>
        </ul>
      </div>
      <!-- 歌单 -->
      <div class="song-list">
        <ul class="song-title">
          <van-tabs scrollspy sticky>
            <van-tab v-for="(item,index) in list" :key="index" :title="item" class="song-title">
              <ul>
                <li>{{ item }}({{ (userPlaylist[index]||[]).length }}个)</li>
                <li v-for="(item1,index1) in userPlaylist[index]" :key="index1" @click="goDetail(item1.id)">
                  <img :src="item1.coverImgUrl" alt="">
                  <p>{{ item1.name }}</p>
                  <span>{{ item1.trackCount }}首</span>
                </li>
              </ul>
            </van-tab>
          </van-tabs>
        </ul>
      </div>
      <div class="footer">自定义排序</div>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  components: { HeaderView },
  data() {
    return {
      login: false,
      isshow: false, // Song页面默认不显示
      active: 2, // 歌单激活的对应 index
      list: ['创建歌单', '收藏歌单', '歌单助手'],
      cookie: ''
    }
  },
  created() {
    // 接收Song显示隐藏
    this.$bus.$on('showEvent', val => {
      this.isshow = val
    })
    // 存储cookie
    this.cookie = localStorage.getItem('token')
    // 获取登陆状态
    this.$store.dispatch('getUserStatus', this.cookie)
  },
  computed: {
    ...mapState({
      userStatus: state => {
        return state.login.userStatus || {}
      },
      userId: state => {
        return state.login.userStatus.userId
      },
      userInfoDetail: state => {
        return state.login.userInfoDetail || {}
      },
      userPlaylist: state => {
        return state.login.userPlaylist || []
      },
      like: state => {
        return state.login.like
      }
    }),
    ...mapGetters(['userProfile'])
  },
  watch: {
    immediate: true,
    userId: {
      handler(newV, oldV) {
        if (newV) {
          // 获取用户相关信息
          this.$store.dispatch('getUserInfoDetail', this.$store.state.login.userStatus.userId)
          // 获取用户歌单
          this.$store.dispatch('getUserPlaylist', this.$store.state.login.userStatus.userId)
        }
      }
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({ path: '/playlist/detail', query: { listId: id } })
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  width: 100%;
  font-size: 28px;
  padding: 120px 0 250px;
  background-color: rgb(238, 238, 238);
  .nologin {
    height: 100px;
    text-align: center;
  }
  .login {
    // 头像
    .userpic {
      position: relative;
      padding: 80px 20px 30px 20px;
      margin: 40px 20px 0;
      font-size: 32px;
      text-align: center;
      border-radius: 20px;
      background-color: #fff;
      img {
        position: absolute;
        top: 0;
        left: 50%;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        transform: translate(-50%, -50%);
      }
      h3 {
        font-size: 40px;
      }
      p {
        margin-top: 20px;
        font-size: 24px;
        span {
          margin: 0 20px;
        }
      }
    }
    // tab栏目
    .usertab {
      margin: 20px;
      border-radius: 40px;
      font-size: 24px;
      background-color: #fff;
      ul {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          width: 25%;
          text-align: center;
          padding: 30px 0;
          span {
            font-size: 40px;
            color: rgb(255, 63, 63);
          }
          p {
            margin-top: 10px;
            color: #aaa;
          }
        }
      }
    }
    // 我喜欢的音乐
    .like {
      ul {
        display: flex;
        justify-content: flex-start;
        position: relative;
        margin: 0 20px;
        padding: 20px 30px;
        border-radius: 20px;
        font-size: 30px;
        background-color: #fff;
        li {
          img {
            width: 100px;
            height: 100px;
            border-radius: 20px;
          }
        }
        li:nth-child(2) {
          margin-left: 20px;
          padding: 10px 0;
          span {
            font-size: 24px;
            color: #aaa;
          }
        }
        li:nth-child(3) {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: rgb(118, 118, 118);
          p {
            height: 40px;
            border-radius: 20px;
            padding: 0 18px;
            border: 1px solid #ccc;
          }
        }
      }
    }
    // 歌单
    .song-list {
      .song-title {
        ul {
          margin: 20px 20px;
          padding: 30px 30px;
          border-radius: 20px;
          background-color: #fff;
          li {
            position: relative;
            font-size: 28px;
            padding-left: 140px;
            margin: 40px 0;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100px;
              height: 100px;
              border-radius: 20px;
            }
            span {
              font-size: 24px;
              color: #aaa;
            }
          }
          li:nth-child(1) {
            padding-left: 0;
            font-size: 12px;
            margin-top: 0px;
            color: #aaa;
          }
        }
      }
    }
    .footer {
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
}
</style>
