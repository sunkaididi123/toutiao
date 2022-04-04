<template>
  <div class="article-list">
      <!-- 文章列表组件 -->


<van-pull-refresh v-model="isLoading" @refresh="onRefresh"  :success-text="refeshSuccessText" success-duration="1500">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
>
  <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->

  <!-- 文章列表项 -->
  <ArticleItem v-for="(item,index) in list" :key="index" :article="item" ></ArticleItem>
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import {getArticles} from '@/api/article'
import ArticleItem from '@/components/article_item/index.vue'
export default {
data () {
    return {
      list: [],   //存储列表数据的数组
      loading: false,   //控制加载中loading状态
      finished: false,   //控制数据加载结束的状态
      timestamp: null , //请求获取下一页的时间戳
      error:false,   //控制列表失败提示状态
      isLoading:true,
      refeshSuccessText:'刷新成功'   //下拉刷新成功提示文本
    }
  },
//  methods: {
//     onLoad() {
//       // 异步更新数据
//       // setTimeout 仅做示例，真实场景中一般为 ajax 请求
//       setTimeout(() => {
//         for (let i = 0; i < 10; i++) {
//           this.list.push(this.list.length + 1);
//         }

//         // 加载状态结束
//         this.loading = false;

//         // 数据全部加载完成
//         if (this.list.length >= 40) {
//           this.finished = true;
//         }
//       }, 1000);
//     },
//   },
components: {
ArticleItem
},
methods: {
async onLoad() {
    // 1.请求获取数据
    
   
    
    try {
        const { data } = await getArticles({
            channel_id: this.item.id,
            timestamp: this.timestamp || +new Date(),
        })
        // console.log(data);
        const {results} = data.data
        // console.log(results);
        // 数组扩展运算符，把数组一个一个拿出来


        // 测试失败
        // if(Math.random() > 0.5) {
        //     JSON.parse('sdasdasf')
        // }
         // 2.把请求结果数据放到list数组里
        this.list.push(...results)
         // 3.本次数据状态加载结束后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if(results.length) {
            // 更新获取下一页数据的时间戳
            this.timestamp = data.data.pre_timestamp
        } else {
            // 没有数据了,把finished设置为true
            this.finished = true
        }
        
    } catch(err) {
         console.log('请求失败',err);
         this.error = true
         this.loading = false
    }
   
},
// 当下拉刷新的时候会触发调用这个函数
async onRefresh() {
    //1. 请求获取数据
    try {
         const { data } = await getArticles({
            channel_id:this.item.id,
            timestamp: +new Date(),   //下拉刷新每次请求获取最新数据,所以传递当前最新时间戳
        })
        // console.log(data);
        // 测试失败
       
        const { results } = data.data
        //  if(Math.random() > 0.2) {
        //     JSON.parse('sdasdasf')
        // }
 // 2.将数据追加到列表的顶部
        this.list.unshift(...results)
    // 3.关闭下拉刷新的loading
    this.isLoading = false

    // 4.更新下拉成功提示的文本
    this.refeshSuccessText = `刷新成功,更新了${results.length}条数据`
    } catch(err) {
        // console.log('请求失败' ,err);
       this.isLoading = false
        this.refeshSuccessText = '刷新失败'
        
        
        
    }
   
}
},
name:'ArticleList',
props:{
    item: {
        type:Object,
        required:true
    }
}
}
</script>

<style scoped lang="less">
.article-list {
    // 百分比单位是相对于父元素的
    // 使用vw或vh，不受父元素影响
    height: 79vh;
    overflow-y: auto;
}
</style>