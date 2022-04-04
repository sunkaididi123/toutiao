<template>
<!-- 只有list在可视范围内才会检查滚动位置，触发onload -->
  <van-list
  v-model="loading"
  :finished="finished"
  :error="error"
  error-text="失败，请点击重试"
  :immediate-check ="false"
  finished-text="没有更多了"
  @load="onLoad"
>
  <Pinglun  v-for="(item,index) in list" :key="index" :comment="item" @replay-click="$emit('replay-click',$event)"></Pinglun>
</van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import Pinglun from '@/views/article/components'
export default {
data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset:null ,  //获取下一页数据标记
      limit:10,
      error:false

    }
  },
props: {
    source: {
      type: [Number,String,Object],
      required:true
    },
    list: {
      type:Array,
      default:function() {
        return []
      },
    },
    type: {
      type:String,
      // 自定义props验证规则
      validator(value) {
        return ['a','c'].includes(value)
      },
      default:'a'
    }
  },
components: {
  Pinglun
},
created() {
  // 当你手动初始onload时，它不会自动开启初始的loading
  // 手动开启初始loaing
  this.loading = true
  this.onLoad()
  
},
name:'CommentList',
methods: {
   async onLoad() {
     
     try {
      //  获取文章的评论和获取文章回复的评论是同一个接口
      // 唯一的区别接口参数不一样
      // type:获取文章评论a，回复c
      // source
      // 文章评论传文章id
      // 回复传评论的id
        // 1.请求获取数据
        const {data} = await getComments({
          type: this.type,    //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(),    //文章id或评论id
          offset: this.offset,
          limit: this.limit
        })
        
        
      // 2.将数据添加到列表中
      const {results} = data.data
      this.list.push(...results)
      this.$emit('onload-success',data.data)
      // 3.将loading关闭
      this.loading = false
      // 4.判断是否还有数据
      if(results.length) {
        // 有就更新获取下一页数据页码
        this.offset = data.data.last_id
      } else {
        // 没有就finished为true
        this.finished = true
      }
      
      
     } catch(err) {
       this.error = true
       this.loading = false
       console.log('获取失败',err);
     }
     
      
    },
  },
}
</script>

<style>

</style>