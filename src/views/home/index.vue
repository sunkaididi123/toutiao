<template>
  <div class="home-container">
      <!-- 导航栏 -->
     <van-nav-bar class="page-nav-bar" fixed>
       <template #title>
         <van-button
         class="search-btn"
         type="info"
         size="small"
         round
         icon="search"
         to="/search"
         >搜索</van-button>
       </template>
     </van-nav-bar>
<!-- 导航栏 -->

<!-- 频道列表 -->
<van-tabs v-model="active" animated swipeable class="channel-tabs">
  <van-tab :title="item.name" v-for="item in list" :key="item.id">
    <!-- 文章列表 -->
    <ArticleList :item="item"></ArticleList>
    <!-- /文章列表 -->
  </van-tab>
  <template #nav-right>
    <div class="placeholder"></div>
     <div class="hamburger-btn"
      @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
     </div>
  </template>
</van-tabs>
<!-- /频道列表 -->

<!-- 频道编辑弹出层 -->
<van-popup
  v-model="isChannelEditShow"
  closeable
  close-icon-position="top-left"
  position="bottom"
  :style="{ height: '100%' }"
>
<ChannelEdit :arr="list"
:active="active"
@update-active="onUpdateActive"
></ChannelEdit>
</van-popup>
<!-- /频道编辑弹出层 -->

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article.list.vue'
import ChannelEdit from './components/channel-edit.vue'
import {mapState} from 'vuex'
import {getItem} from '@/utiles/storage'
export default {
  data() {
    return {
      active: 0,
      list: [],   //频道列表
      isChannelEditShow: false  //控制编辑频道弹出层是否显示  
    }
  },
  created () {
    this.loadChannels()
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels() {
     try {
        // const { data } = await getUserChannels()
      // console.log(data)
      // this.list = data.data.channels
    let channels = []
      // 已登录,请求获取用户的频道列表
      if(this.user) {
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 未登录,判断是否有本地的频道列表数据
      // ----有，拿来使用
      
      const loaclChannels = getItem('TOUTIAO_CHANNELS')
      if(loaclChannels) {
        channels = loaclChannels
      } else {
    // ----没有，请求获取默认频道列表
      const { data } = await getUserChannels()
        channels = data.data.channels
      }
      }
      this.list = channels
      
     } catch(err) {
       this.$toast('获取频道数据失败')
     }
    },
    onUpdateActive (index,isChannelEditShow) {
      // 更新激活的频道项
      this.active = index
      // 关闭编辑弹出层
      this.isChannelEditShow = isChannelEditShow
    }
    },
  
  
  name:'HomeIndex'
}
</script>

<style scoped lang="less">
 .home-container {
  padding-top: 174px;
  padding-bottom: 1.33333rem;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    i.van-icon {
      font-size: 32px;
    }
  }
 /deep/ .channel-tabs {
   .van-tabs__wrap {
    height: 82px;
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
}
   }
    .van-tab  {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
  /deep/  .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      margin-bottom: 8px;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
   /deep/  .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao-gengduo {
        font-size: 33px;
        margin-bottom: 4px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url('@/assets/gradient-gray-line.png');
        background-size: contain;
        }
    }
  }

</style>
