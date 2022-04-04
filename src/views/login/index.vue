<template>
  <div class="login-container">
      <!-- 导航栏 -->
     <van-nav-bar class="page-nav-bar" title="登录" >
         <template #left>
             <van-icon name="cross" @click="$router.back()" />
         </template>
     </van-nav-bar>
<!-- 导航栏 -->

<!-- 登录的表单 -->
<!-- 
    表单验证
    1.给van-ceil表单组件配置rules验证规则
    参考文档
    2.当表单提交的时候会自动触发表单验证
    如果验证通过，会触发submit事件
    如果验证失败，就不会触发submit
 -->
<van-form @submit="onSubmit" ref="loginForm">
  <van-field
    name="mobile"
    placeholder="请输入手机号"
     left-icon="smile-o"
     v-model="user.mobile"
     :rules="userFormRules.mobile"
     type="number"
     maxlength="11"
  >
  <template #left-icon>
     <i class="toutiao toutiao-shouji"></i>
  </template>
  </van-field>
  <van-field
    name="code"
    placeholder="请输入验证码"
    v-model="user.code"
    :rules="userFormRules.code"
    type="number"
    maxlength="6"
  >
  <template #left-icon>
      <i class="toutiao toutiao-yanzhengma"></i>
  </template>
  <template #button>
      <!-- 
          time倒数计的时常
       -->
      <van-count-down :time="1000 * 60"
       format="ss s"
       v-if="isCountDownShow"
       @finish="isCountDownShow = false"
       />
    <van-button v-else native-type="button" class="send-sms-btn" round size="small" type="default" @click="OnSendSms"> 获取验证码</van-button>
  </template>
  </van-field>
  <div class="login-btn-wrap">
    <van-button class="login-btn"  block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
<!-- /登录的表单 -->
  </div>
</template>

<script>
import {login,sendSms} from '@/api/user'
export default {
name:'LoginIndex',
data() {
    return {
    isCountDownShow:false,   //是否展示倒计时
     user: {
         mobile:'',
         code:''
     },
     userFormRules: {
         mobile:[{
              required: true, 
              message: '手机号不能为空' ,
              },
              {
                  pattern: /^1[3|5|7|8]\d{9}$/, //手机号的正则表单式
  message:'手机号格式错误'
              }
              ],
         code:[{ 
             required: true, message: '请填写验证码' },
             {
                 pattern:/^\d{6}$/,
                 message:'验证码格式错误'
             }
             ]
     }
    }
  },
  methods: {
   async onSubmit () {
    //1.获取表单数据
    const user = this.user
    // TODO:2.表单验证

   this.$toast.loading({
        message: '登录中...',
        forbidClick: true,   //禁用背景点击
        duration:0   //加载中持续时间,默认是2秒   ,如果为0则持续展示
})
    // 3.表单提交,请求登录
    try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        
          // 登录成功,跳转回原来页面
          this.$router.back()
        } 


      


    catch(err) {
        if(err.response.status === 400) {
            this.$toast.fail('手机号或验证码错误')
        } else {
  this.$$toast.fail('登录失败,请稍后重试')
        }
    
        
    }
    // 4.根据请求响应结果处理后续操作


    },


  async  OnSendSms() {
        console.log('OnSendSms');
        
        // 1.校验手机号码
        try{
    await this.$refs.loginForm.validate('mobile')
    console.log('验证成功');
    
        } catch(err) {
            console.log('验证失败',err)
            return;
            
        }
       
        // 2.验证通过，显示倒计时
        this.isCountDownShow = true
        
        // 3.请求发送验证码
        try{
            await sendSms(this.user.mobile)
            this.$toast('发送成功')
        } catch(err) {
            // 发送失败，关闭倒计时
            this.isCountDownShow = false
            if(err.response.status === 429) {
                this.$toast('发送太频繁了，请稍后重试')
            } else {
                this.$toast('发送失败,请稍后重试')
            }
           
            
        }
    }
  }
}
</script>

<style scoped lang="less">

.login-container {
    .toutiao {
        font-size: 37px;
    }
    .send-sms-btn {
        background-color: #ededed;
        // width: 154px;
        height: 46px;
        font-size: 22px !important;
        color: #666;
        // line-height: 46px;
        
    }
    .login-btn-wrap {
        padding: 53px 33px;
        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>