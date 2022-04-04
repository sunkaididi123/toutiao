<template>
  <div class="list-container">
      <!-- 导航栏 -->
      <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.push('/my')"
      >
      <template #title>
          <div class="guanzhu" @click="Guanbtn" >
              <span :class="{size:isShow}">关注</span>
              <i :class="{de:isShow}"></i>
          </div>
          <div class="fensi guanzhu" @click="Fenbtn">
              <span :class="{size:!isShow}">粉丝</span>
              <i :class="{de:!isShow}"></i>
          </div>
          </template></van-nav-bar>
      <!-- /导航栏 -->

      <!-- 关注和粉丝路由 -->
      <router-view></router-view>
      <!-- /关注和粉丝路由 -->
  </div>
</template>

<script>
export default {
name:'ListContainer',
data() {
    return {
        isShow:true
    }
},
created() {
if(this.$route.query.id === '0' ) {
    // console.log(this.$router.query.id);
            this.isShow = true
        } else {
            this.isShow = false
        }
},
methods: {
    Guanbtn() {
        //  this.isShow = true
       
            this.isShow = true
            
        this.$router.push('/list/guanzhu')
    },
    Fenbtn() {
            this.isShow = false 
        this.$router.push('/list/fensi')
    }
}
}
</script>

<style scoped lang="less">
.list-container {
    .page-nav-bar {
        .guanzhu {
            display: inline-block;
            height: 92px;
            line-height: 92px;
            position: relative;
            .de {
                position: absolute;
                bottom: 10px;
                left: 10px;
                width: 46px;
                height: 6px;
                border-radius: 3px;
                background-color: #fff;
            }
        }
        .fensi {
            margin-left: 75px;
        }
    }
}
.size {
    font-size: 32px;
    font-weight: 700;
}
</style>