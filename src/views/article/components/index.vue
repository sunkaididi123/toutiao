<template>
  <div class="pinglun-container">
    <van-cell >
      <template #title>
        <div class="title">
          <van-image class="img"
          round
          fit="cover"
  :src="comment.aut_photo"
/>
    <div class="author-message">
      <span class="wind">{{comment.aut_name}}</span>
      <div class="commentOne" @click="dianzan"><van-icon class="good-job-o" :name="comment.is_liking ? 'good-job':'good-job-o'" size="18"
      :class="{liked:comment.is_liking}"
      /> <span class="font">{{comment.like_count ? comment.like_count: '赞'}}</span></div>
  </div>
        </div>
        <div class="two">
          <p>{{comment.content}}</p>
          <div class="bottom">
            <span>{{comment.pubdate | filter}}</span>
            <van-button type="info" round size="mini" color="#f4f5f6"
            @click="$emit('replay-click',comment)"
            >{{comment.reply_count}}回复</van-button>
          </div>
        </div>
      </template>
    </van-cell>
     <!-- v-for="(item,index) in list" :key="index" -->
  </div>
</template>

<script>
import {LikeComment,DislikeComment} from '@/api/article'
export default {
name:'PingLunList',
props: {
  comment: {
    type:Object,
    required:true
  }
},
methods: {
 async dianzan() {
  try {
    if(this.comment.is_liking) {
      // 取消点赞
      await DislikeComment(this.comment.com_id)
    this.comment.like_count --
    } else {
      // 点赞
      await LikeComment(this.comment.com_id)
      this.comment.like_count ++
    }
    this.comment.is_liking = !this.comment.is_liking
    this.$toast.success(!this.comment.is_liking ? '取消点赞成功':'点赞成功')
  } catch(err) {
    if(err.response && err.response.status === 401) {
      this.$toast('您暂未登录')
    } else {
      this.$toast('操作失败，请稍后重试')
    }
    
  }
 }
}
}
</script>

<style scoped lang="less">
.pinglun-container {
  padding-top: 40px;
  .title {
    display: flex;
    .img {
      width: 80px;
      height: 80px;
      .van-image__img {
        width: 80px;
        height: 80px;
      }
    }
    .author-message {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding-left: 15px;
    justify-content: space-between;
      .font {
      font-size: 24px;
      margin-left: -2px;
      }
      .good-job-o {
        vertical-align: middle;
        &.liked {
          color: #e5645f;
  }
    }
    .wind {
      font-size: 28px;
      color: #406599;
    }
  }
  }
  .two {
    padding-left: 95px;
    padding-right: 20px;
    p {
      margin-top: 0;
      font-size: 35px;
      color: #222222;
    }
    .bottom {
      display: flex;
      align-items: center;
      span {
        margin-right: 40px;
        font-size: 18px;
      }
     /deep/ .van-button {
        width: 135px;
        height: 50px;
         .van-button__text {
           font-size: 22px;
        color: #222222;
        text-align: center;
      }
      }
      
    }
  }
 
}
</style>