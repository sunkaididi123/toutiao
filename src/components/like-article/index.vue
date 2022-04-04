<template>
    <div @click="Likearticle">
    <van-icon class="icon"  :name="value === 1? 'good-job' : 'good-job-o'" :class="{vanIconGoodJob:value === 1}" />
    </div>
</template>

<script>
import {LikeArticle,DislikeArticle} from '@/api/article'
export default {
name:'LikeArticle',
props: {
    value: {
        type:[Number,String,Object],
        required:true
    },
    art_id: {
        type:[Number,String],
        required:true
    }
},
 methods: {
     async Likearticle() {
         try{
             let status = 1
            if(this.value !== 1) {
            // 点赞文章
            await LikeArticle(this.art_id)
        } else {
            // 取消文章点赞
            await DislikeArticle(this.art_id)
            status = -1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功': '点赞取消')
       
   } catch (err) {
      if(err.response && err.response.status === 401) {
          this.$toast.fail('请认证后点赞')
      } else {
           this.$toast('操作失败，请稍后重试')
      }
   }
    }
  
}

}
</script>

<style scoped lang="less">
.van-icon-good-job {
        color: #e5645f !important;
} 
</style>