<template>
  <div>
      <div class="input-text">
          <van-field
  v-model.trim="message"
  rows="2"
  autosize
  type="textarea"
  maxlength="50"
  placeholder="请输入留言"
  show-word-limit
  class="input"
/>
<van-button class="post-btn" :hairline="false" @click="submitComment" :disabled="!message.length">发布</van-button>
      </div>
  </div>
</template>

<script>
import {addComment} from '@/api/comment'
export default {
    
name:'CommentPost',
data() {
    return {
        message:'',
    }
},
inject: {
    articleId: {
        type:[Number,String,Object],
        default:null
    }
},


props: {
    target: {
        type:[Number,String,Object],
        required:true
    }
},
methods: {
   async submitComment() {
         this.$toast.loading({
        message: '发布中...',
        forbidClick: true,   //禁用背景点击
        duration:0   //加载中持续时间,默认是2秒   ,如果为0则持续展示
})
        try {
           const { data } =  await addComment({
               target: this.target.toString(), //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
               content: this.message, //评论内容	,
               art_id:this.articleId ? this.articleId.toString() : null, //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
            })

            // 1.关闭弹出层
            
            // 2.渲染到评论顶部
            this.$emit('post-success',data.data)
            // 3.清空弹出层内容
            this.message = ''
            this.$toast.success('发布成功')
        } catch(err) {
            this.$toast.fail('发布失败，请稍后重试')
        }
    }
},
}
</script>

<style scoped lang="less">
.input-text {
    display: flex;
    align-items: center;
    padding: 30px;
    padding-right: 0;
    .input {
       background-color: #f5f7f9;
    }
    .post-btn {
        // flex: 1;
        width: 150px;
        // padding: 0;
        color: #6ba3d8;
        &::before {
            display: none;
        }
    }
}
</style>