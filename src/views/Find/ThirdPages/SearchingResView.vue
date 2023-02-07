<template>
  <div class="searching-result-container">
    <div class="song">
      <h4>单曲</h4>
      <ul>
        <li v-for="(item,index) in searchResultSongs.slice(0, 6)" :key="index" @click="sing(searchResultSongs,index,item.id)">
          <p>{{ item.name }}</p>
          <p><span v-for="(item1,index) in item.ar" :key="index">{{ item1.name }}{{ item.ar.length>1?'/':''}}</span> - <em>{{ item.al.name }}</em></p>
          <span class="mv iconfont icon-caozuo-bofang"></span>
          <span class="detail iconfont icon-qita"></span>
        </li>
      </ul>
      <p>查看全部{{ searchResult.songCount }}首单曲></p>
    </div>
    <div class="list">
      <h4>歌单</h4>
      <ul>
        <li v-for="(item,index) in (searchResList.playlists||[]).slice(0, 6)" :key="index" @click="intoList(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <div class="right-text">
            <p>{{ item.name }}</p>
            <p><span>{{ item.trackCount }}首，by{{ item.creator.nickname }}，播放{{Math.round(item.playCount/10000)  }}万次</span></p>
          </div>
        </li>
      </ul>
      <p>查看全部{{ searchResList.playlistCount }}个歌单></p>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      keyword: '',
      showSong: false,
      playStatus: false
    }
  },
  created() {
    this.keyword = JSON.parse(localStorage.getItem('searchKeyword'))
    // 发起搜索请求(单曲，歌单)
    this.$store.dispatch('getSearchResult', this.keyword)
    this.$store.dispatch('getSearchResList', this.keyword)
  },
  computed: {
    ...mapState({
      searchResult: state => {
        return state.Find.searchResult || []
      },
      searchResList: state => {
        return state.Find.searchResList || {}
      },
      songDetail: state => {
        return state.Find.songDetail || []
      }
    }),
    ...mapGetters(['searchResultSongs'])
  },
  methods: {
    ...mapMutations(['updateSongList', 'updataPlayStatus']),
    sing(searchResultSongs, index, id) {
      // 同步显示隐藏信息
      this.showSong = true
      this.$bus.$emit('showPlay', this.showSong)
      this.$store.dispatch('getSongDetail', id)
      // 同步歌曲url
      this.$store.dispatch('getSongURL', id)
      // 更新歌曲信息
      const data = { songs: searchResultSongs, index: index }
      this.updateSongList(data)
      // 更新播放状态,同步给vuex
      this.playStatus = !this.playStatus
      this.updataPlayStatus(this.playStatus)
    },
    intoList(id) {
      this.$router.push({ path: '/playlist/detail', query: { listId: id } })
    }
  }
}
</script>

<style lang="less" scoped>
.searching-result-container {
  padding: 20px;
  padding-bottom: 100px;
  background-color: rgb(238, 238, 238);
  .song {
    padding: 30px 20px;
    border-radius: 20px;
    margin-bottom: 30px;
    background-color: #fff;
    h4 {
      font-size: 32px;
    }
    ul {
      margin: 20px 0;
      border-top: 1px solid #ddd;
      li {
        position: relative;
        font-size: 30px;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
        & > p {
          width: 75%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          color: rgb(79, 152, 181);
          margin: 15px 0;
        }
        & > p:nth-child(1) {
          font-size: 30px;
        }
        span,
        em {
          font-size: 24px;
          color: #aaa;
        }
        em {
          font-style: normal;
        }
        .mv,
        .detail {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          font-size: 35px;
        }
        .mv {
          right: 100px;
        }
      }
    }
    & > p {
      text-align: center;
      font-size: 20px;
      letter-spacing: 2px;
      color: #aaa;
    }
  }
  .list {
    padding: 30px 20px;
    border-radius: 20px;
    margin-bottom: 30px;
    background-color: #fff;
    h4 {
      font-size: 32px;
    }
    ul {
      margin: 20px 0;
      font-size: 28px;
      li {
        display: flex;
        justify-content: flex-start;
        margin: 20px 0;
        img {
          width: 100px;
          border-radius: 10px;
        }
        .right-text {
          margin-left: 20px;
          font-size: 20px;
          width: 100%;
          height: 100px;
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 85%;
            height: 50px;
            line-height: 50px;
            color: #aaa;
          }
          p:nth-child(1) {
            font-size: 28px;
            color: #666;
          }
        }
      }
    }
    & > p {
      padding-top: 30px;
      text-align: center;
      font-size: 20px;
      letter-spacing: 2px;
      border-top: 1px solid #ddd;
      color: #aaa;
    }
  }
}
</style>
