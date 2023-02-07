<template>
  <div class="header-container">
    <!-- 遮罩 -->
    <transition name="mask">
      <div class="mask" v-show="usershow" @click="fadeUserOperate"> </div>
    </transition>
    <!-- 用户操作 -->
    <transition name="user">
      <div class="userOperate" v-show="usershow">
        <div class="loginview" v-show="islogin">
          <div class="me">
            <img :src="userProfile.avatarUrl" alt="">
            <span>{{ userProfile.nickname }} &gt;</span>
            <em class="iconfont icon-saoma"></em>
          </div>
          <ul class="mine">
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
          </ul>
          <ul class="musicService">
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
          </ul>
          <ul class="others">
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
            <li>我的消息
              <span>></span>
            </li>
            <li>云贝中心
              <span>></span>
            </li>
            <li>创作者中心
              <span>></span>
            </li>
          </ul>
          <ul class="logout">
            <li @click="logout">退出登陆/关闭</li>
          </ul>
        </div>
        <div class="nologinview" v-show="!islogin">
          <p>您还未登录，请先登录</p>
          <a @click="login">点击登陆</a>
        </div>

      </div>
    </transition>

    <!-- 导航栏 -->
    <transition name="nav">
      <van-nav-bar title="标题" class="nav-bar" fixed z-index="999" v-show="!usershow">
        <template #right>
          <em class="iconfont icon-VIP"></em>
          <em class="iconfont icon-changge"></em>
        </template>
        <template #left>
          <em class="iconfont icon-hanbaobao" @click="showUser"></em>
        </template>
        <template #title>
          <input type="search" class="search" @click="goSearch">
        </template>
      </van-nav-bar>
    </transition>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      usershow: false,
      scroll: true,
      islogin: false
    }
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.islogin = true
      // 获取登陆状态
      this.$store.dispatch('getUserStatus', token)
    } else {
      this.islogin = false
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  methods: {
    showUser() {
      this.usershow = !this.usershow
      this.scroll = false
      this.$bus.$emit('getScroll', this.scroll)
      // 获取用户相关信息
      this.$store.dispatch('getUserInfoDetail', this.$store.state.login.userStatus.userId)
    },
    fadeUserOperate() {
      this.usershow = false
      this.scroll = true
    },
    login() {
      this.$router.push('/login')
    },
    logout() {
      this.$store.dispatch('logout')
      localStorage.removeItem('token')
      this.islogin = false
    },
    goSearch() {
      this.$router.push('/homepage/search/searching')
    }
  },
  watch: {
    scroll: {
      handler(newV, oldV) {
        this.$bus.$emit('getScoll', newV)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  position: relative;
  width: 100%;
  // 遮罩
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 990;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .mask-enter,
  .mask-leave-to {
    opacity: 0;
  }
  .mask-enter-active,
  .mask-leave-active {
    transition: all 0.5s ease;
  }
  .mask-enter-to,
  .mask-leave-from {
    opacity: 1;
  }
  // 用户操作
  .user-enter,
  .user-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .user-enter-active,
  .user-leave-active {
    transition: all 0.5s ease;
  }
  .user-enter-to,
  .user-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  .userOperate {
    position: fixed;
    overflow: scroll;
    top: -15px;
    width: 80%;
    height: 100vh;
    z-index: 998;
    padding-top: 40px;
    background-color: rgb(243, 243, 243);
    font-size: 32px;
    .me {
      position: relative;
      padding: 0 20px;
      img {
        width: 60px;
        border-radius: 30px;
        vertical-align: middle;
        margin-right: 20px;
      }
      em {
        position: absolute;
        right: 40px;
        top: 12px;
      }
    }
    ul {
      width: 90%;
      margin: 40px auto;
      padding: 20px 40px;
      border-radius: 30px;
      background-color: #fff;
      li {
        position: relative;
        line-height: 60px;
        span {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .logout {
      text-align: center;
      li {
        color: rgb(210, 17, 17);
      }
    }
    .nologinview {
      text-align: center;
      margin: 50% auto;
      a {
        color: red;
      }
    }
  }
  // 导航栏

  .nav-bar {
    width: 100%;
    .search {
      border-radius: 14px;
      border: 0;
      padding: 0 30px;
      background: linear-gradient(to right, rgb(238, 156, 167), rgb(255, 221, 225));
    }
  }
}
</style>
