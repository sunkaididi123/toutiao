<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
       <div class="left">
         <van-image
  :src="userInfo.photo"
  class="avatar"
  round
  fit="cover"
/>
<span class="name">{{userInfo.name}}</span>
       </div>
       <div class="right">
         <van-button size="mini" round to="/user/profile">编辑资料</van-button>
       </div>
      </div>
      <div class="data-stats">
        <div class="data-item" @click="$router.push('/user/toutiao')">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item" @click="guanzhu">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item" @click="$router.push('/list/fensi')">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录 -->
    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
  <van-grid-item class="grid-item" @click="$router.push('/shoucang')">
    <template #icon>
      <i class="toutiao toutiao-shoucang"></i>
    </template>
    <template #text>
      <span>收藏</span>
    </template>
  </van-grid-item>
  <van-grid-item class="grid-item" @click="$router.push('/lishi')">
     <template #icon>
      <i class="toutiao toutiao-lishi"></i>
    </template>
    <template #text>
      <span>历史</span>
    </template>
  </van-grid-item>
</van-grid>
    <!-- /导航 -->

    <!-- 消息通知,小志同学，退出登录 -->
  <van-cell title="消息通知" is-link />
  <van-cell title="小智同学" is-link  to="/robot"/>
  <van-cell v-if="user" title="退出登录" class="lgout-cell" @click="onLogout" clickable />

    <!-- /消息通知，小志同学，退出登录 -->
  </div>
</template>

<script>
import { mapState } from  'vuex'
import {getUserInfo} from '@/api/user.js'
export default {
  data() {
  return{
    userInfo:{}   //用户信息 
  }  
  },
 
name:'MyIndex',
computed: {
  ...mapState(['user'])
},
created() {
    // 如果用户登录了，则请求用户个人信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
methods: {
  onLogout() {
  //  退出，提示是否退出
  // 在组件中要使用this.$dialog
  this.$dialog.confirm({
  title: '确认退出吗',
})
  .then(() => {
    // on confirm
    // 确认执行这里
    // 清楚登录状态
    this.$store.commit('setUser',null)
  })
  .catch(() => {
    // on cancel
    // 取消执行这里
  })
  // 确认退出，清除登陆状态  (容器中的user和本地存储中的user清除)
  },
 async loadUserInfo() {
   try{
     const {data} = await getUserInfo()
     this.userInfo = data.data
    //  console.log(this.userInfo);
     
    //  console.log(data);
   } catch(err) {
     console.log('获取失败',err);
     
   }
 },
 guanzhu() {
   this.$router.push({
     path:'/list/guanzhu',
     query:{
       id:0
     }
   })
 }
}
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background:url('~@/assets/banner.png') no-repeat center;    //css中使用 ~@
    background-size: cover;
  }
  .not-login {
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
      }
      .text {
        font-size: 28px;
        color:#fff;
        margin-top: 15px;
      }
    }
    }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 23px;
        }
      }
    }
    .data-stats {
      display: flex;
      height: 130px;
      .data-item {
        height: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .count {
          font-size: 36px;
          color: #fff;
        }
        .text{
          font-size: 23px;
          color: #fff;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253 ;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span{
        font-size: 28px;
      }
    }
  }
  .lgout-cell {
    text-align: center;
    color:#d86262;
    margin-top: 9px;
  }

  }
</style>