<template>
  <div class="searching-container">
    <div class="searching">
      <!-- 热搜榜 -->
      <div class="hot-search">
        <h4>热搜榜</h4>
        <ul>
          <li v-for="(item,index) in hotSearch" :key="index" @click="goSearchinRes(item.searchWord)">
            <span>{{ index+1 }}</span>
            <p>{{ item.searchWord }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      keyword: '',
      history: []
    }
  },
  created() {
    this.$store.dispatch('getSearchKeyword')
    this.$store.dispatch('getHotSearch')
  },
  computed: {
    ...mapState({
      hotSearch: state => {
        return state.Find.hotSearch || []
      },
      searchResult: state => {
        return state.Find.searchResult || []
      }
    })
  },
  methods: {
    goSearchinRes(searchWord) {
      this.history = JSON.parse(localStorage.getItem('searchHistory'))
      if (this.history.indexOf(searchWord) === -1) {
        this.history.push(searchWord)
      }
      if (this.history.length > 3) {
        this.history.shift()
      }
      localStorage.setItem('searchHistory', JSON.stringify(this.history))
      localStorage.setItem('searchKeyword', JSON.stringify(searchWord))
      this.$bus.$emit('history', this.history)
      if (this.$route.path === '/homepage/search/searchingres') {
        // 避免路由重复跳转
        this.$router.go(0)
      } else {
        this.$router.push('/homepage/search/searchingres')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searching-container {
  padding-bottom: 40px;
  background-color: rgb(238, 238, 238);
  .searching {
    .hot-search {
      margin: 20px 20px;
      font-size: 28px;
      padding: 30px;
      border-radius: 20px;
      background-color: #fff;
      h4 {
        font-size: 32px;
      }
      ul {
        li {
          display: flex;
          justify-content: flex-start;
          height: 70px;
          line-height: 70px;
          margin: 20px 0;
          span {
            width: 50px;
          }
        }
      }
    }
  }
}
</style>
