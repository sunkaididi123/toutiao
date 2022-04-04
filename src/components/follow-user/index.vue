<template>
  <div>
      <van-button v-if="isFollowed" type="info" @click="onFollow" round color="#ccc"   :loading="loading" class="author-guanzhu yi-guanzhu">
              已关注</van-button>
      <van-button type="info" round    class="author-guanzhu" v-else
              @click="onFollow"
              :loading="loading"
              >
              <template #icon>
                  <van-icon name="plus" class="jiahao" />
              </template>
              关注</van-button>
      
  </div>
</template>

<script>
import { addFollow,removeFollow} from '@/api/user'

export default {
name:'FollowUser',
props: {
    isFollowed: {
        type:Boolean,
        required:true
    },
    userId: {
        type:[Number,String,Object],
        required:true
    }
},
data() {
    return {
        loading:false
    }
},
methods: {
     async onFollow() {
       this.loading = true
       try {
           if(this.isFollowed) {
            //    已关注,取消关注
              await removeFollow(this.userId)
            //  this.article.is_followed = false

           } else {
            //    未关注,点击关注
            await addFollow(this.userId)
            //  this.article.is_followed = true
            
           }
           this.loading = false
           this.$emit('update-is_followed',!this.isFollowed)

       } catch(err) {
           let message = '操作失败,请稍后重试'
          if(err.response && err.response.status === 400) {
              message = '不能关注自己'

          }
          this.$toast(message)
          this.loading = false
       }
    }
}
}
</script>

<style>

</style>