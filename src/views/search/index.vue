<template>
  <div class="search-container">
      <!-- 顶部搜索栏 -->
      <!-- from标签是移动端显示搜索按钮用的 -->
     <form action="/">
  <van-search
  class="search-nav"
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    background="#3296fa"
    @search="onSearch"
    @cancel="onCancel"
    @focus="isResultShow = false"
  />
     </form>
  <!-- 顶部搜索栏 -->

  <!-- 搜索结果 -->
  <SearchResult
  v-if="isResultShow"
  :searchresult="searchText"
  ></SearchResult>
  <!-- /搜索结果 -->

  <!-- 联想建议 -->
<SearchSuggestions v-else-if="searchText" :searchText="searchText" @search="onSearch"></SearchSuggestions>
  <!-- /联想建议 -->
  <!-- 三部分 搜索历史纪录 -->
    <SearchHistory v-else :searchHistories="searchHistories" @clear-search-histories="searchHistories = []
    "
    @search="onSearch"
    ></SearchHistory>
  <!-- /搜索历史纪录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestions from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import {setItem,getItem} from '@/utiles/storage'
export default {
name: 'SearchIndex',
data() {
    return {
      searchText: '',
      isResultShow:false ,  //控制搜索结果显示,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORYS') || [] //搜素的历史记录数据
    }
  },
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORYS',value)
    }
  },
  methods: {
    onSearch (val) {
        // 更新文本框内容
        this.searchText = val
        // console.log(val);


        // 存储搜索记录
        // 1.不能有重复数据
        const index = this.searchHistories.indexOf(val)
        if(index !== -1) {
            this.searchHistories.splice(index, 1)
             
             }
             // 2.最新的排在最前面
         this.searchHistories.unshift(val)
           
        // 渲染搜索结果
      this.isResultShow = true
      
    },
    onCancel () {
      this.$router.back()
    },
  },
  components: {
    SearchHistory,
    SearchSuggestions,
    SearchResult
}
}
</script>

<style scoped lang="less">
.search-container {
    padding-top: 108px;
    .search-nav {
        position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    right: 0;
    }
    .van-search__action {
        color: #fff;
    }
}
</style>