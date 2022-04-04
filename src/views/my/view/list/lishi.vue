<template>
  <div class="user-lishi">
   <van-nav-bar
   title="历史"
   left-arrow
   class="page-nav-bar"
   @click-left="$router.push('/my')"
   ></van-nav-bar>

   <!-- 历史项 -->
   <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<UserLiShi v-for="(item,index) in list" :key="index" :item="item"></UserLiShi>
   </van-list>
   <!-- /历史项 -->
  </div>
</template>

<script>
import UserLiShi from '@/views/my/components/user-shoucang.vue'
import {getUserLishi} from '@/api/user'
export default {
name:'LiShi',
data() {
  return {
    list:[],
    loading:false,
    finished:false,
    page:1
  }
},
components: {
  UserLiShi
},
created() {
  // this.onLoad()
},
methods: {
  async onLoad() {
    // this.loading = false
    
    try {
     const {data} = await getUserLishi({
        page:this.page,
        per_page:10
      })
      console.log(data)
      const {results} = data.data
      this.list.push(...results)
      this.loading =false

      if(results.length) {
        this.page++
      } else {
        this.finished = true
      }
    } catch(err) {
      // this.finished = true
      this.$toast.fail('获取失败,请稍后重试')
    }
  }
}

}
</script>

<style>

</style>