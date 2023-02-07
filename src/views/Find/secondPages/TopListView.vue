<template>
  <div class="toplist-container">
    <!-- nav -->
    <div class="toplist-nav">
      <router-link to="/homepage"><span class="iconfont icon-zhixiangzuo"></span></router-link>
      <h5>排行榜</h5>
    </div>
    <!-- 官方榜 -->
    <div class="official-top">
      <h5>官方榜</h5>
      <ul>
        <li v-for="item in officialList.slice(0,4)" :key="item.id">
          <!-- 飙升榜 -->
          <div class="biaosheng">
            <h1>{{ item.name }}</h1>
            <span class="update">{{ item.updateFrequency }}</span>
            <div class="content">
              <img :src="item.coverImgUrl" alt="">
              <ol>
                <li v-for="(item1,index1) in item.tracks" :key="index1">
                  <p><em>{{ index1+1 }}</em>{{ item1.first }} <span> -{{ item1.second}}</span></p>
                  <span class="icon">新</span>
                </li>
              </ol>
            </div>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    // 获取官方榜
    this.$store.dispatch('getOfficialList')
  },
  computed: {
    ...mapState({
      officialList: state => {
        return state.Find.officialList
      }
    })
  }
}
</script>

<style lang="less" scoped>
.toplist-container {
  width: 100%;
  background-color: rgb(244, 244, 244);
  // 导航
  .toplist-nav {
    font-size: 40px;
    padding: 20px 0;
    margin: 0 12px;

    h5 {
      display: inline-block;
      margin-left: 10px;
    }
  }
  // 官方榜
  .official-top {
    padding: 20px 10px;
    h5 {
      font-size: 36px;
      font-weight: 600;
      margin: 20px 12px;
    }
    // 飙升榜
    .biaosheng {
      position: relative;
      margin: 20px 12px;
      border-radius: 30px;
      background-color: rgb(255, 255, 255);
      padding: 30px 40px;
      h1 {
        font-size: 44px;
        padding-bottom: 30px;
      }
      .update {
        position: absolute;
        font-size: 20px;
        top: 40px;
        right: 10px;
        color: #ccc;
      }
      .content {
        display: flex;
        img {
          width: 20%;
          height: 20%;
        }
        ol {
          margin-left: 30px;
          li {
            position: relative;
            font-weight: 700;
            line-height: 34px;
            font-size: 24px;
            p {
              display: inline-block;
              width: 440px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              letter-spacing: 2px;
            }
            em {
              margin-right: 20px;
              font-style: normal;
            }
            span {
              font-weight: normal;
            }
            .icon {
              position: absolute;
              right: -40px;
              top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
