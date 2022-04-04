<template>
  <div class="search-result">
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="加载失败，请点击重试"
>
  <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import {searchResult} from '@/api/search'
export default {
name:'SearchResult',
data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
props: {
    searchresult: {
        type:String,
        required:true
    }
},
  methods: {
     async onLoad() {
        
        try {
            //1.请求获取数据
            const {data} = await searchResult({
                page: this.page,   //页码
                per_page: this.perPage,   //每一页大小
                q: this.searchresult   //查询关键字
            })
            // console.log(data);
            const {results} = data.data
             //2.将数据添加到数组列表中
             this.list.push(...results)

        //3.将本次加载中的loading关闭
        this.loading = false
        //4，判断是否还有数据
        if(results.length) {
            // 如果有，则更新获取下一页页码
            this.page++
        } else {
             // 如果没有则将加载状态设置为结束
             this.finished = true
        }
        
       
        } catch(err) {
              this.error = true
            //  加载失败，loading也要关闭
             this.loading = false
           
        }
       
      }
  }
}
</script>

<style>

</style>