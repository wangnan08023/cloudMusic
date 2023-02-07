<template>
  <div class="album-detail-container">
    <!-- 导航 -->
    <div class="album-detail-nav">
      <router-link to="/homepage"><span class="iconfont icon-zhixiangzuo"></span></router-link>
      <h5>{{ album.artistName }}《{{ album.albumName }}》</h5>
      <em class="iconfont icon-fenxiang"></em>
    </div>
    <!-- 内容 -->
    <div class="album-content">
      <span>网易云音乐</span>
      <span class="danmu-box">
        <em>弹幕</em>
        <input type="checkbox" id="danmu">
        <label for="danmu"></label>
      </span>
      <!-- 封面 -->
      <div class="pic" v-if="album">
        <img :src="album.coverUrl" alt="">
        <h4>{{ album.albumName }}</h4>
        <p>{{ album.artistName }} ></p>
        <span>￥{{ product.price }}</span>
        <button @click="showPopup">立即支持 <em>已售{{ albumDetailSales }}张专辑</em></button>
        <van-popup v-model="show" position="bottom" round :style="{ height: '42%' }" close-on-popstate closeable class="popup">
          <h5>希望</h5>
          <hr>
          <ul>
            <li>
              <span>价格</span>
              <div class="right">￥{{ product.price }}</div>
            </li>
            <li>
              <span>数量</span>
              <div class="count right">
                <em class="minus" @click="minus">-</em> <input type="text" v-model="num" @change="valChange"><em class="plus" @click="plus">+</em>
              </div>
            </li>
            <li>
              <span>支付金额</span>
              <div class="right total">￥{{ product.price }}</div>
            </li>
          </ul>
          <div class="pay">
            <button>支付宝支付</button>
            <button>微信支付</button>
          </div>
          <p>感谢支付，云村提醒您理性消费哦</p>
          <p>未成年人须在法定监护人的指导及同意下才可购买</p>
        </van-popup>
      </div>
      <!-- 统计 -->
      <div class="statistics">
        <hr>
        <span class="iconfont icon-jiangbei"></span>
        <p>开售<em class="hour">24</em>小时</p>
        <p>销量突破<em>3333</em>张</p>
        <span class="detail">查看详情 ></span>
      </div>
      <!-- 说明 -->
      <div class="tips">
        <ul>
          <li v-for="(item, index) in product.tags" :key="index"><em class="iconfont icon-yiwancheng2"></em>{{ item }}
          </li>
        </ul>
      </div>
      <!-- 详情 -->
      <div class="album-detail">
        <ul class="navbar">
          <li class="current">专辑详情 </li>
          <li>活动</li>
          <li>评论</li>
        </ul>
        <div class="inside">
          <div>
            <ul v-if="product.descr" ref="firstParag">
              <li v-for="(item, index) in product.descr.slice(0, this.length)" :key="index" v-html="item.resource">
              </li>
            </ul>
          </div>
          <div v-show="this.show">
            <ul v-if="product.descr">
              <li v-for="(item, index) in product.descr.slice(this.length)" :key="index" v-html="item.resource"></li>
            </ul>
          </div>
          <span class="iconfont icon-xiala" @click="showOthers" v-show="!show">展开全部</span>
          <span class="iconfont icon-xiangshang" v-show="this.show" @click="noShow">收起</span>
        </div>
        <video :src="product.mvPlayUrl" controls v-if="product"></video>
        <div class="songlist">
          <p class="title">歌曲列表</p>
          <ul>
            <li><span>1</span>飞行模式<em class="iconfont icon-bofang"></em></li>
            <li><span>2</span>飞行模式<em class="iconfont icon-bofang"></em></li>
            <li><span>3</span>飞行模式<em class="iconfont icon-bofang"></em></li>
          </ul>
          <p class="others">预售专辑持续更新中…</p>
        </div>
      </div>
      <!-- 活动 -->
      <div class="event">
        <img src="@/views/Find/images/banner2.jpg" alt="">
        <div class="mingpai">
          <p class="title-event">名牌福利
            <span>(活动截止2023.09.20)</span>
            <span class="detail-event">活动细则></span>
          </p>
          <img src="@/views/Find/images/banner1.jpg" alt="">
          <span>抢以下制定铭牌可获得亲笔签名</span>
          <ul class="item">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
          <p>查看所有制定铭牌 ></p>
          <button>立即抢购</button>
        </div>
        <div class="gif">
          <p>惊喜获赠专区</p>
          <ul>
            <li>
              <div class="pic-gift">
                <img src="https://p2.music.126.net/Ut9R-799PM_pZwnVJbNbCQ==/109951168152691845.jpg" alt="">
                <div class="mask"></div>
                <span class="iconfont icon-24gl-lock2"></span>
              </div>
              <div class="text">
                <h5>清唱福利视频</h5>
                <span>购买1帐获赠</span>
              </div>
              <span>获赠</span>
            </li>
            <li></li>
            <li></li>
          </ul>
          <ul>
            <li>
              <div class="pic-gift">
                <img src="https://p2.music.126.net/Ut9R-799PM_pZwnVJbNbCQ==/109951168152691845.jpg" alt="">
                <div class="mask"></div>
                <span class="iconfont icon-24gl-lock2"></span>
              </div>
              <div class="text">
                <h5>清唱福利视频</h5>
                <span>购买1帐获赠</span>
              </div>
              <span>获赠</span>
            </li>
            <li></li>
            <li></li>
          </ul>
          <ul>
            <li>
              <div class="pic-gift">
                <img src="https://p2.music.126.net/Ut9R-799PM_pZwnVJbNbCQ==/109951168152691845.jpg" alt="">
                <div class="mask"></div>
                <span class="iconfont icon-24gl-lock2"></span>
              </div>
              <div class="text">
                <h5>清唱福利视频</h5>
                <span>购买1帐获赠</span>
              </div>
              <span>获赠</span>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment">
        <p>精彩评论</p>
        <ul>
          <li>
            <div class="user-pic">
              <img src="https://p2.music.126.net/Ut9R-799PM_pZwnVJbNbCQ==/109951168152691845.jpg" alt="">
            </div>
            <div class="text-com">
              <p>华晨宇</p>
              <span>12月20日 18:12</span>
              <p class="commit-content">评论内容</p>
            </div>
            <span>123240 <em class="iconfont icon-dianzan"></em></span>
          </li>
        </ul>
        <span>查看更多精彩评论 ></span>
      </div>
      <p>数字专辑购买须知</p>
      <button>数字专辑兑换 ></button>
      <!-- tabbar -->
      <div class="tabbar">
        <img src="https://p2.music.126.net/Ut9R-799PM_pZwnVJbNbCQ==/109951168152691845.jpg" alt="">
        <div class="price">
          <h3>￥27</h3>
          <span>已售600567张专辑</span>
        </div>
        <button>立即支持</button>
        <span class="iconfont icon-liwu"></span>
      </div>
      <!-- footer占位 -->
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      length: '',
      showTXT: false,
      show: false,
      num: 1
    }
  },
  created() {
    // 派发获取专辑详情
    this.$store.dispatch('getAlbumDetail', this.$route.params.albumId)
    // 派发获取专辑详情-售卖数量
    this.$store.dispatch('getAlbumDetailSales', this.$route.params.albumId)
  },
  watch: {
    product: {
      handler(newV, oldV) {
        const result = newV.descr.findIndex(ele => {
          return ele.resource === '<br>'
        })
        this.length = result
      }
    }
  },
  computed: {
    ...mapGetters(['album', 'product']),
    ...mapState({
      albumDetailSales: state => {
        return state.Find.albumDetailSales
      }
    })
  },
  methods: {
    showOthers() {
      this.showTXT = true
    },
    noShow() {
      this.showTXT = false
      // 设置页面滚动位置
      document.documentElement.scrollTop = this.$refs.firstParag.offsetTop
    },
    showPopup() {
      this.show = true
    },
    plus() {
      // debugger
      if (typeof this.num !== 'number') {
        this.num = 1
      } else {
        this.num += 1
      }
    },
    valChange() {
      debugger
      const type = this.num * 1
      if (typeof type === 'number') {
        this.num = type
      } else {
        this.num = 1
      }
    },
    minus() {
      if (this.num > 1 && typeof this.num === 'number') {
        this.num -= 1
      } else {
        this.num = 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.album-detail-container {
  position: relative;
  width: 100%;
  background: url('https://p1.music.126.net/fV7dOGC8lhAwuDAkWfbGDw==/109951168144452016.jpg') no-repeat;
  background-attachment: fixed;

  // 导航
  .album-detail-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    padding: 10px 20px;
    z-index: 999;
    background-color: #fff;

    .iconfont {
      font-size: 40px;
      margin-right: 16px;
    }

    h5 {
      display: inline-block;
      font-size: 32px;
    }

    em {
      position: absolute;
      right: 20px;
      top: 46px;
    }
  }

  // 内容
  .album-content {
    position: absolute;
    position: relative;
    color: #fff;
    width: 100%;
    margin-top: 120px;
    padding: 20px;
    font-size: 28px;

    .danmu-box {
      position: absolute;
      right: 20px;
      top: 20px;
      display: inline-block;
      font-style: normal;

      em {
        font-style: normal;
        margin-right: 10px;
      }

      input {
        display: none;
      }

      label {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 70px;
        height: 36px;
        border-radius: 20px;
        background-color: rgb(211, 211, 211);
      }

      label::before {
        content: '';
        display: inline-block;
        position: absolute;
        width: 32px;
        height: 32px;
        left: 0;
        border-radius: 16px;
        transition: all 0.3s ease;
        background-color: #fff;
      }

      input:checked + label {
        background-color: rgb(113, 46, 46);
      }

      input:checked + label::before {
        left: 40px;
      }
    }

    // 封面
    .pic {
      text-align: center;
      padding-top: 30px;

      img {
        width: 55%;
      }

      h4 {
        margin-top: 30px;
        font-size: 40px;
        font-weight: normal;
      }

      p {
        margin-top: 10px;
        font-size: 24px;
        color: #ccc;
      }

      span {
        display: block;
        font-size: 38px;
        margin-top: 50px;
        color: rgb(158, 164, 171);
      }

      button {
        height: 60px;
        padding: 0 80px;
        border-radius: 30px;
        margin-top: 30px;
        border: 0;
        background-color: rgb(91, 136, 195);

        em {
          font-style: normal;
          font-size: 24px;
          color: #ccc;
        }
      }

      .popup {
        text-align: left;
        color: #333;
        font-size: 30px;

        h5 {
          display: block;
          font-size: 32px;
          padding: 40px 20px 20px;
        }

        hr {
          border: 1px solid rgb(233, 233, 233);
        }

        ul {
          padding: 0 20px;

          li {
            position: relative;
            height: 60px;
            line-height: 60px;
            font-size: 30px;

            span {
              font-size: 30px;
            }

            .right {
              position: absolute;
              right: 0;
              top: 0;

              input {
                height: 40px;
                width: 160px;
                border-radius: 40px;
                text-align: center;
                margin-right: -2px;
                border: 1px solid rgb(227, 227, 227);
              }

              em {
                position: absolute;
                top: 10px;
                font-style: normal;
                vertical-align: middle;
                height: 40px;
                width: 40px;
                text-align: center;
                line-height: 40px;
                border-right: 1px solid rgb(227, 227, 227);
              }

              .plus {
                right: 10px;
                border: 0;
                border-left: 1px solid rgb(227, 227, 227);
              }
            }

            .total {
              font-size: 40px;
              color: red;
            }
          }
        }

        .pay {
          display: flex;
          justify-content: space-around;
          padding: 20px 50px;

          button {
            width: 45%;
            padding: 0;
            margin: 0;
            text-align: center;
            color: #fff;
          }
        }

        p {
          font-size: 24px;
          text-align: center;
        }
      }
    }

    // 统计
    .statistics {
      position: relative;
      margin-top: 40px;
      padding: 20px 0;

      hr {
        border: 1px solid rgb(68, 68, 68);
        margin-bottom: 40px;
      }

      .icon-jiangbei {
        position: absolute;
        top: 0;
        font-size: 52px;
        left: 50%;
        transform: translate(-50%);
      }

      p {
        line-height: 50px;

        em {
          font-style: normal;
          font-size: 40px;
        }

        .hour {
          font-size: 36px;
        }
      }

      .detail {
        position: absolute;
        top: 110px;
        right: 0;
        color: #ccc;
      }
    }

    // 说明
    .tips {
      padding: 20px;
      background-color: rgba(50, 50, 50, 0.4);

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 45%;
          line-height: 40px;
          color: #aaa;
          font-size: 24px;

          em {
            font-size: 24px;
            margin-right: 10px;
          }
        }
      }
    }

    // 详情
    .album-detail {
      margin-top: 20px;

      .navbar {
        height: 60px;
        line-height: 60px;
        display: flex;
        background-color: #222;
        justify-content: space-around;
        margin-bottom: 20px;

        .current {
          color: rgb(88, 158, 208);
          border-bottom: 1px solid rgb(88, 158, 208);
        }
      }

      .inside {
        ul li {
          line-height: 40px;
          font-size: 24px;
        }

        span {
          display: block;
          text-align: center;
          line-height: 40px;
          font-size: 24px;
        }
      }

      video {
        // margin: 20px auto;
        width: 100%;
      }

      .songlist {
        .title {
          margin: 20px 0;
        }

        ul li {
          position: relative;
          line-height: 60px;
          font-size: 24px;
          padding: 0 10px;
          border-bottom: 1px solid rgb(34, 34, 34);

          span {
            margin-right: 20px;
            color: #ccc;
          }

          em {
            position: absolute;
            right: 10px;
            top: 0;
            font-size: 38px;
          }
        }

        .others {
          text-align: center;
          font-size: 24px;
          margin-top: 20px;
          color: #aaa;
        }
      }
    }

    // 活动
    .event {
      margin-top: 40px;

      img {
        width: 100%;
        border-radius: 15px;
        margin-bottom: 20px;
      }

      .mingpai {
        padding: 20px 0;
        background-color: rgba(50, 50, 50, 0.4);

        .title-event {
          position: relative;
          margin: 20px 0;

          span {
            font-size: 12px;
            color: #aaa;
          }

          .detail-event {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 12px;
          }
        }

        span {
          display: block;
          text-align: center;
        }

        .item {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;

          li {
            width: 30%;
            height: 80px;
            line-height: 80px;
            text-align: center;
            color: #aaa;
            background-color: #333;
          }
        }

        .item + p {
          text-align: center;
          font-size: 12px;
          margin: 20px 0;
          color: #aaa;
        }

        button {
          display: block;
          margin: 0 auto;
          padding: 0 80px;
          height: 60px;
          width: 80%;
          border-radius: 30px;
          margin-top: 30px;
          border: 0;
          background-color: rgb(91, 136, 195);
        }
      }

      .gif {
        margin-top: 20px;
        padding: 20px 0;
        background-color: rgba(50, 50, 50, 0.4);

        p {
          margin: 20px 0;
        }

        ul {
          li {
            display: flex;
            justify-content: flex-start;
            position: relative;

            .pic-gift {
              position: relative;
              width: 15%;

              img {
                width: 100%;
              }

              .mask {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: rgba(50, 50, 50, 0.4);
              }

              span {
                position: absolute;
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%);
                font-size: 60px;
              }
            }

            .text {
              padding: 0 20px;

              h5 {
                font-size: 30px;
                font-weight: normal;
                margin-top: 20px;
              }

              span {
                display: block;
                font-size: 12px;
                margin-top: 10px;
                color: #aaa;
              }
            }

            & > span {
              position: absolute;
              top: 40px;
              right: 0;
              width: 100px;
              height: 50px;
              line-height: 50px;
              text-align: center;
              border-radius: 25px;
              background-color: rgb(91, 136, 195);
            }
          }
        }
      }
    }

    // 评论
    .comment {
      margin: 40px 0;
      padding: 20px 0;
      background-color: rgba(50, 50, 50, 0.4);

      p {
        padding: 20px 0;
      }

      ul {
        li {
          position: relative;
          padding: 20px 60px;

          .user-pic {
            position: absolute;
            left: 0;
            top: 30px;

            img {
              width: 8%;
              border-radius: 50%;
            }
          }

          .text-com {
            margin-left: 20px;

            p {
              font-size: 24px;
              line-height: 5px;
            }

            span {
              font-size: 24px;
              line-height: 12px;
              color: #aaa;
            }

            .commit-content {
              margin-top: 30px;
              border-bottom: 1px solid rgb(61, 61, 61);
            }
          }

          & > span {
            position: absolute;
            top: 20px;
            right: 0;
            color: #aaa;
          }
        }
      }

      & > span {
        display: block;
        font-size: 24px;
        text-align: center;
        color: #aaa;
      }
    }

    // tabbar
    .tabbar {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: flex-start;
      // height: 100px;
      width: 100%;
      padding: 10px 20px;
      vertical-align: middle;
      background-color: rgb(25, 25, 25);

      img {
        width: 10%;
      }

      .price {
        margin-left: 10px;

        h3 {
          color: rgb(91, 136, 195);
        }

        span {
          font-size: 24px;
          color: #aaa;
        }
      }

      button {
        height: 70px;
        width: 40%;
        border-radius: 35px;
        border: 0;
        margin-left: 20px;
        background-color: rgb(91, 136, 195);
      }

      & > span {
        font-size: 60px;
        line-height: 80px;
        margin-left: 20px;
        color: rgb(91, 136, 195);
      }
    }

    & > p {
      text-align: center;
      font-size: 24px;
      color: #aaa;
    }

    & > button {
      display: block;
      margin: 40px auto;
      height: 60px;
      border-radius: 30px;
      padding: 0 40px;
      font-size: 20px;
      text-align: center;
      border: 1px solid rgb(145, 145, 145);
      background: none;
    }

    //footer占位
    .footer {
      width: 100%;
      height: 90px;
    }
  }
}
</style>
