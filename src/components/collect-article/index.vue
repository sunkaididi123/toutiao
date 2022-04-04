<template>
<!-- 组件默认只能作用到根节点，如果深入要加/deep/ -->
  <div @click="Collectarticle">
    <van-icon class="icon" :name="value? 'star' : 'star-o'" :class="{vanIconStar:!value}" />
    <!-- <i class="toutiao toutiao-shoucang" v-else></i> -->
 </div>
</template>

<script>
import {addCollect,removeCollect} from '@/api/article'
export default {
data() {
    return {
        loading:false
    }
},
name:'CollectArticle',
props: {
    value: {
        type:Boolean,
        required:true
    },
    articleId: {
        type:[Number,String,Object],
        required:true
    }
},
methods: {
   async Collectarticle() {
        try {
           
        if(this.value) {
             // 取消收藏
             await removeCollect(this.articleId)

        } else {
            // 点击收藏
            await addCollect(this.articleId)
        }
        // 更新视图
        // 简单类型，不能直接更新，要告诉父亲
        // 需要告诉父亲，还没有更新成功
        this.$emit('input',!this.value)
        this.$toast.success(!this.value ? '收藏成功':'取消收藏成功')
            
        } catch(err) {
            if(err.response && err.response.status === 401) {
                this.$toast('请登录后收藏文章')
            } else {
                this.$toast('收藏文章失败，请稍后重试')
            }
            
        }
    }
}
}

</script>

<style scoped lang="less">
.icon {
    margin-right: 40px;
    .van-icon-star {
        color: #f4ea2a !important;
    }
}
</style>