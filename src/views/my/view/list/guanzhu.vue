<template>
  <div class="guanzhu">
      <Guanzhu v-for="item in list" :key="item.id" :item="item"></Guanzhu>
  </div>
</template>

<script>
import Guanzhu from '../../components/user-fensi.vue'
import {getUserFensiList} from '@/api/user'
export default {
name:'GuanZhu',
data() {
    return {
        list:[]
    }
},
created() {
    this.loadGuanZhu()
},
methods: {
    async loadGuanZhu() {
         this.$toast.loading({
            message:'加载中...',
            duration:0,
            forbidClick:true
        })
        try {
           const {data} = await getUserFensiList({
                page:1,
                per_page:10
            })
            this.list = data.data.results
            this.$toast.success('加载成功')
            // console.log(data);
        } catch(err) {
            this.$toast.fail('获取失败，请稍后重试')
        }
    }
},
components: {
    Guanzhu
}
}
</script>

<style>

</style>