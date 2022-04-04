<template>
  <div class="search-history">
      <van-cell title="搜索历史">
          <div v-if="isDeleteShow">
          <span @click="$emit('clear-search-histories')">全部删除</span>
          &nbsp;&nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
          </div>
          <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
      </van-cell>
      <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="OnSearchItemClick(item,index)">
          <van-icon name="close" v-show="isDeleteShow" />
      </van-cell>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isDeleteShow: false   //控制删除显示状态
        }
    },
    props: {
        searchHistories: {
            type: Array,
            required:true
        }
    },
name:'SearchHistory',
methods: {
    OnSearchItemClick(item,index) {
    
    if(this.isDeleteShow) {
        //如果处于删除状态则点击删除
        this.searchHistories.splice(index,1)
        
    } else {
        // 如果处于未删除状态点击搜索
        this.$emit('search',item)
    }
    
    }
}
}
</script>

<style>

</style>