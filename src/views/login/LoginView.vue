<template>
  <div class="login-container">
    <span class="iconfont icon-zhixiangzuo" @click="goback"></span>
    <!-- 手机号登陆 -->
    <div class="phone-login" v-if="isphone">
      <div class="login-box">
        <div class="pic">
          <img src="./images/下载.png" alt="">
        </div>
        <ul class="right">
          <li>
            <label for="phone">手机号</label>
            <input type="phone" name="phone" v-model="phone">
          </li>
          <li>
            <p>手机号码有误</p>
          </li>
          <li>
            <label for="captchaInfo">验证码</label>
            <input type="number" name="captchaInfo" v-model="captchaInfo">
            <button @click="captcha">获取验证码</button>
          </li>
          <li>
            <p>密码有误</p>
          </li>
        </ul>
      </div>
      <div class="btn">
        <button @click="login">登陆</button>
      </div>
      <div class="agree">
        <input type="checkbox" v-model="agree">
        <p>我已阅读并同意《服务条款》、《隐私政策》</p>
      </div>
      <div class="bottom-popup" v-show="bottomPopup">
        <h5>服务协议和隐私政策等指引</h5>
        <p>进入下一步前，请阅读并同意网易云音乐的《服务条款》、《隐私政策》</p>
        <div class="agree-btn">
          <span>不同意</span>
          <span>同意并继续</span>
        </div>
      </div>
      <p @click="switch2Qr">二维码登陆</p>
    </div>
    <!-- 二维码登陆 -->
    <div class="qr-login" v-if="!isphone">
      <div class="login-box">
        <div class="pic">
          <img src="./images/下载.png" alt="">
        </div>
        <!-- 二维码部分 -->
        <div class="QRCode">
          <img :src="url" alt="">
        </div>
      </div>
      <div class="agree">
        <input type="checkbox" v-model="agree">
        <p>我已阅读并同意《服务条款》、《隐私政策》</p>
      </div>
      <div class="bottom-popup" v-show="bottomPopup">
        <h5>服务协议和隐私政策等指引</h5>
        <p>进入下一步前，请阅读并同意网易云音乐的《服务条款》、《隐私政策》</p>
        <div class="agree-btn">
          <span>不同意</span>
          <span>同意并继续</span>
        </div>
      </div>
      <p @click="isphone=!isphone">验证码登陆</p>
    </div>
  </div>
</template>

<script>
// import QRCode from 'qrcode'
import { mapState } from 'vuex'
// import API from '@/API/index.js'
export default {
  data() {
    return {
      phone: '',
      captchaInfo: '',
      agree: true,
      bottomPopup: false,
      isphone: true,
      url: '',
      timer: null,
      unikey: ''
    }
  },
  created() {
    // 获取二维码 key 生成接口
    this.$store.dispatch('getQrKey', Date.now())
  },
  methods: {
    captcha() {
      // 验证码
      this.$store.dispatch('getCaptcha', this.phone)
    },
    login() {
      if (this.agree) {
        this.$store.dispatch('getUserInfo', { phone: this.phone, captchaInfo: this.captchaInfo })
      }
    },
    // 点击转换为二维码登陆
    switch2Qr() {
      // 显示二维码页面
      this.isphone = !this.isphone
      // 二维码生成接口
      this.$store.dispatch('getQrPic', { key: this.$store.state.login.unikey, timestamp: Date.now() })
    },
    // 地址转换二维码
    async createQRCode() {
      // const text = this.$store.state.login.qrPic
      // const url = await QRCode.toDataURL(text)
      const qrimg = this.$store.state.login.qrimg
      this.url = qrimg
    },
    goback() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState({
      qrimg: state => {
        return state.login.qrimg
      }
    })
  },
  watch: {
    qrimg: {
      immediate: true,
      handler(newV, oldV) {
        if (newV) {
          this.createQRCode()
        }
      }
    },
    isphone: {
      handler(newV, oldV) {
        if (!newV) {
          // 定时器监测是否扫码成功
          this.timer = setInterval(async () => {
            const result = await this.$API.ReqQrCheck({ key: this.$store.state.login.unikey, timestamp: Date.now() })
            console.log(result.data.code)
            if (result.data.code === 803) {
              // 成功
              // 清除定时器
              clearInterval(this.timer)
              console.log(result)
              // 保存cookie
              localStorage.setItem('token', result.data.cookie)
              // 跳转到user页面
              this.$router.push('/user')
            } else if (result.data.code === 800) {
              // 超时
              clearInterval(this.timer)
              alert(result.data.message)
            } else if (result.data.code === 802) {
              // 已扫未登录
              console.log('待确认')
            }
          }, 1000)
        } else {
          // 登陆失败
          clearInterval(this.timer)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  font-size: 30px;
  background: linear-gradient(to right, rgb(238, 156, 167), rgb(248, 198, 203));
  .icon-zhixiangzuo {
    position: absolute;
    top: 40px;
    left: 40px;
    font-size: 32px;
  }
  .phone-login,
  .qr-login {
    .login-box {
      width: 100%;
      padding-top: 50%;
      .pic {
        width: 100%;
        text-align: center;
        img {
          border-radius: 70px;
          width: 30%;
          margin-bottom: 50px;
        }
      }
      .QRCode {
        width: 100%;
        text-align: center;
        margin-bottom: 40px;
        img {
          width: 400px;
          height: 400px;
          margin: 0 auto;
        }
      }
      input {
        width: 70%;
        border: 0;
        height: 50px;
        outline: none;
        margin-right: 10px;
      }
      .right {
        margin-left: 25%;
        li {
          position: relative;
          font-size: 28px;
          margin-top: 20px;
          height: 40px;
          label {
            position: absolute;
            left: -120px;
            top: 25%;
            width: 20%;
            text-align: right;
            padding-right: 20px;
          }
          p {
            display: none;
            color: red;
          }
          button {
            border: 1px solid #ccc;
            padding: 5px;
            color: #fff;
            border-radius: 10px;
            background-color: #aaa;
          }
        }
      }
    }
    .btn {
      margin-top: 40px;
      button {
        display: block;
        text-align: center;
        width: 50%;
        height: 60px;
        padding: 10px 30px;
        background-color: rgb(231, 11, 11);
        border: 0;
        border-radius: 30px;
        color: white;
        margin: 20px auto;
      }
    }
    .agree {
      text-align: center;
      p {
        display: inline-block;
        margin-left: 10px;
        color: rgb(102, 102, 102);
      }
    }
    .bottom-popup {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      padding: 40px;
      border-top-right-radius: 40px;
      border-top-left-radius: 40px;
      background-color: #fff;
      h5 {
        text-align: center;
        font-size: 32px;
        margin-bottom: 20px;
      }
      p {
        color: #aaa;
        margin-bottom: 20px;
      }
      .agree-btn {
        display: flex;
        justify-content: space-between;
        span {
          text-align: center;
          width: 47%;
          height: 60px;
          line-height: 60px;
          border-radius: 60px;
          color: red;
          border: 1px solid rgb(237, 19, 19);
        }
        span:nth-child(2) {
          color: white;
          background-color: rgb(237, 19, 19);
        }
      }
    }
    & > p {
      margin-top: 40px;
      text-align: center;
    }
  }
}
</style>
