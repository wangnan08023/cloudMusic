<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <div class="search">
      <span class="iconfont icon-zhixiangzuo" @click="goback"></span>
      <input type="search" :placeholder="searchKeyword" v-model="keyword" @keyup.enter="search">
      <div class="iconfont icon-sousuo"></div>
      <p @click="search">搜索</p>
    </div>
    <!-- 搜索历史 -->
    <div class="history">
      <h5>搜索历史</h5>
      <span v-for="(item,index) in history" :key="index" @click="goSearch(item)">{{ item }}</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      keyword: '',
      history: [],
      showHis: true
    }
  },
  created() {
    // 获取搜索历史
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    if (searchHistory) {
      this.history = searchHistory
    }
    this.$bus.$on('history', val => {
      this.history = val
    })

    //  通知APP移动位置
    this.$bus.$emit('recomListCreated')
  },
  computed: {
    ...mapState({
      // 默认搜索关键字
      searchKeyword: state => {
        return state.Find.searchKeyword || ''
      }
    })
  },
  methods: {
    search() {
      if (!this.keyword) {
        this.keyword = this.searchKeyword
      }
      // 储存搜索关键字
      if (this.history.indexOf(this.keyword.trim()) === -1) {
        this.history.push(this.keyword)
        if (this.history.length > 3) {
          this.history.shift()
        }
        localStorage.setItem('searchHistory', JSON.stringify(this.history))
      }
      // 存储当前搜索关键字
      localStorage.setItem('searchKeyword', JSON.stringify(this.keyword))
      if (this.$route.path === '/homepage/search/searchingres') {
        // 避免路由重复跳转
        this.$router.go(0)
      } else {
        this.$router.push('/homepage/search/searchingres')
      }
    },
    goback() {
      if (this.$route.path === '/homepage/search/searching') {
        this.$router.push('/homepage')
      } else {
        this.$router.push('/homepage/search/searching')
      }
    },
    goSearch(item) {
      // 从搜索历史点击进入搜索
      this.keyword = item
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  width: 100%;
  padding: 30px 0;
  background-color: rgb(238, 238, 238);
  .search {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    vertical-align: middle;

    input {
      position: absolute;
      width: 75%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 60px;
      border-radius: 30px;
      outline: none;
      border: 0;
      padding: 0 30px;
      padding-left: 60px;
      color: #777;
      font-size: 24px;
    }
    input::-webkit-input-placeholder {
      color: #ccc;
    }
    div {
      position: absolute;
      left: 15%;
      top: 0;
      color: #ccc;
    }
  }
  .history {
    margin: 20px 40px;
    font-size: 32px;
    h5 {
      margin-bottom: 30px;
    }
    span {
      height: 40px;
      padding: 5px 30px;
      font-size: 24px;
      border-radius: 20px;
      margin-right: 30px;
      color: #aaa;
      background-color: #fff;
    }
  }
}
</style>
