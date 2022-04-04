<template>
  <div class="user-Fensi">
       <UserFensi v-for="item in list" :key="item.id" :item="item"></UserFensi>
  </div>
</template>

<script>
import {getGuanZhuList} from '@/api/user'
import UserFensi from '../../components/user-fensi'
export default {
name:'FenSi',
data() {
    return {
      list:[]
    }
},
created() {
    this.loadList()
},
methods: {
    async loadList() {
        this.$toast.loading({
            message:'加载中...',
            duration:0,
            forbidClick:true
        })
    try {
          const {data} =  await getGuanZhuList({
        })
        // console.log(data);
        this.list = data.data.results
        this.$toast.success('加载成功')
    } catch(err) {
        this.$toast.fail('获取失败，请稍后重试')
    }
    }
},
components:{
    UserFensi
}
}
</script>

<style scoped lang="less">

</style>