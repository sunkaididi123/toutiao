<template>
  <div class="user-birthday">
      <van-nav-bar
      left-text="取消"
      right-text="完成"
      @click-left="$emit('update-birthday')"
      @click-right="OnBirthday"
      ></van-nav-bar>
     <van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
  :max-date="maxDate"
/>
  </div>
</template>

<script>
import { setUserbase } from '@/api/user'
import dayjs from 'dayjs'
export default {
name:'UserBirthday',
data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
props: {
    value: {
        type:String,
        required:true
    }
},
methods: {
  async  OnBirthday() {
      this.$toast.loading({
          message:'更换中...',
          forbidClick:true,
          duration:0
      })
        try {
            const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
            await setUserbase({
                birthday:currentDate
            })
            this.$emit('input',currentDate)
            this.$toast.success('更新成功')
            this.$emit('update-birthday')
        } catch(err) {
            this.$toast.fail('更新失败,请稍后重试')
        }
    }
}
}
</script>

<style scoped lang="less">
/deep/ .van-picker__toolbar {
    display: none !important;
}
</style>