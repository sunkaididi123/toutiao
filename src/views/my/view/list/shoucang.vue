<template>
  <div class="shoucang-container">
      <van-nav-bar
      class="page-nav-bar"
      title="收藏"
      left-arrow
      @click-left="$router.push('/my')"
      ></van-nav-bar>

      <!-- 收藏项 -->
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
    <UserShouCang v-for="(item,index) in list" :key="index" :item="item" ></UserShouCang>
      </van-list>
      <!-- /收藏项 -->
  </div>
</template>

<script>
import {getUserhistory} from '@/api/user'
import UserShouCang from '../../components/user-shoucang.vue'
// import {getArticleById} from '@/api/article'
export default {
name:'ShoucangContainer',
components: {
    UserShouCang
},
data() {
return {
  list:[],
  loading:false,
  finished:false,
  page:1
}
},
created() {
  // this.loadhistory()
},
methods: {
  async onLoad () {
    
    try {
      const {data} =  await getUserhistory({
        page:this.page,
        per_page:10
      })
      const {results} = data.data
      this.list.push(...results)
      this.loading = false
      // 判断是否还有数据
      if(results.length) {
        this.page++

      } else {
        this.finished = true
      }
    console.log(data);
    } catch(err) {
      this.$toast.fail('获取失败，请稍后重试')
    }
  }
}
}
</script>

<style>

</style>