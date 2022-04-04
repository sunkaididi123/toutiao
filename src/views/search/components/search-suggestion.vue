<template>
  <div class="search-suggestion">
     <van-cell  icon="search" v-for="(item,index) in Suggestions"
     :key="index"
     @click="$emit('search',item)"
     >
         <template #title>
             <div  v-html="highlight(item)"></div>
         </template>
     </van-cell>
     
  </div>
</template>

<script>
import {getSearchSuggestions} from '@/api/search'
import {debounce} from 'lodash'
export default {
name:'SearchSuggestions',
props: {
    searchText: {
        type:String,
        required:true
    }
},
data() {
 return {
     Suggestions:[]
 }
},
watch: {
    searchText: {
        //当searchText发生改变会调用这个handler函数
    //   handler(value) {
    //        this.loadSearchSuggestions(value)
    //     },
    handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
    },1000),
        // 该回调函数在侦听开始之后立即执行
    immediate: true
    }
},
methods: {
   async loadSearchSuggestions(q) {
       try{
         const{data} = await getSearchSuggestions(q)
        //  console.log(data);
        
              this.Suggestions = data.data.options
        
            
         
       } catch(err) {
          this.$toast('数据获取失败,请稍后重试')
       }
   },
   highlight(item) {
       
           const highlightStr = `<span class="active">${this.searchText}</span>`
       const reg = new RegExp(this.searchText,'gi')
      
            return item.replace(reg, highlightStr)
       
       
     
       
   }
}
}
</script>

<style scoped lang="less">
.search-suggestion {
   /deep/ span.active {
        color: #3296fa  !important;
    }
}
</style>