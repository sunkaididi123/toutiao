<template>
  <div class="update-gender">
      <van-nav-bar
      left-text="取消"
      right-text="确认"
      title="性别"
      @click-left="$emit('update-gender')"
    @click-right="onClickRight"
      ></van-nav-bar>
      <van-picker
  :columns="columns"
  @change="onChange"
   :default-index="value"
/>
  </div>
</template>

<script>
import {setUserbase} from '@/api/user'
export default {
name:'UpdateGender',
data() {
  return {
    columns:['男','女'],
    gender:0
  }
},
props: {
  value: {
    type:Number,
    required:true
  }
},
methods: {
  async onClickRight() {
    this.$toast.loading({
      message:'更换中...',
      forbidClick:true,
      duration:0
    })
    try {
      await setUserbase({
        gender:this.gender
      })
      this.$emit('input',this.gender)
      this.$toast.success('更新成功')
      this.$emit('update-gender')
    } catch(err) {
      this.$toast('更新失败，请稍后重试')
    }
  },
  onChange(picker, value, index) {
    this.gender = index
  }
}
}
</script>

<style>

</style>