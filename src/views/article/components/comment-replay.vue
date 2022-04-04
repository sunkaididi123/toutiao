<template>
  <div class="comment-replay">
      <van-nav-bar
        :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
    >
    <template #left>
        <van-icon name="cross"  @click="$emit('close')" />
    </template>
    </van-nav-bar>
   <div class="scroll-wrap">
        <!-- 当前评论项 -->
    <CommentItem :comment="comment"></CommentItem>
    <!-- /当前评论项 -->
    <!-- 评论的回复列表 -->
    <van-cell title="全部回复"></van-cell>
    <CommentList :source="comment.com_id" :list="commentList" :type="'c'"></CommentList>
    <!-- /评论的回复列表 -->
   </div>
    <!-- 发布评论 -->
    <div class="post-wrap">
        <van-button size="small" class="post-btn" round @click="isPostShow = true">写评论</van-button>
    </div>
    <!-- /发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
          <CommentPost
          :target="comment.com_id"
          @post-success="onPostSuccess"
          ></CommentPost>
      </van-popup>
  </div>
</template>

<script>
import CommentList from '@/views/home/components/commentlist.vue'
import CommentItem from './index.vue'
import CommentPost from './comment-post.vue'
export default {
name:'CommentReplay',
props: {
    comment: {
        type:Object,
        required:true
    }
},
data() {
    return {
        isPostShow:false,
        commentList:[]  //评论的回复列表
    }
},
components: {
    CommentItem,
    CommentList,
    CommentPost
},
methods: {
    onPostSuccess(data) {
        // 1.更新回复数量
    this.comment.reply_count++
        // 2.关闭弹层
    this.isPostShow = false
        // 3.将最新回复的内容展示到列表顶部
    this.commentList.unshift(data.new_obj)
    }
}
}
</script>

<style scoped lang="less">
.post-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .post-btn {
        width: 60%;
    }
}
.scroll-wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 90px;
    overflow-y: auto;
}
</style>