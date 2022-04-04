<template>
  <div class="update-name">
      <!-- 导航栏 -->
      <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('update-name')"
     @click-right="OnsetUser"
      ></van-nav-bar>
      <!-- /导航栏 -->

      <div class="field-wrap">
          <!-- 输入框 -->
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
        />
      <!-- /输入框 -->
      </div>
  </div>
</template>

<script>
import {setUserbase} from '@/api/user'
export default {
name:'UpdateName',
data() {
    return {
        message:this.value,
    }
},
props: {
    value: {
        type:String,
        required:true
    }
},
methods: {
    async OnsetUser() {
       this.$toast.loading({
           message:'保存中...',
            forbidClick:true , //禁止背景点击
            duration:0  //持续展示    提示成功或失败关闭
       })
       try {
       if(this.message.length) {
            await setUserbase({
            name:this.message
        })
        // 更新视图
        this.$emit('input',this.message)
        // 提示成功
        this.$toast.success('更改成功')
        // 关闭弹层
        this.$emit('update-name')
       } else {
           return this.$toast.fail('昵称不能为空')
       }
        
       } catch(err) {
           this.$toast.fail('更改失败，请稍后重试')
       }
    }
}
}
</script>

<style scoped lang="less">
.field-wrap {
    padding: 20px;
    .van-field {
        border-radius: 10px;
    }
}
</style>