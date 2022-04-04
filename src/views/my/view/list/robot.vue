<template>
  <div class="robot-container">
    <!-- 导航栏 -->
    <van-nav-bar
    title="小智同学"
    left-arrow
    class="page-nav-bar"
    fixed
    @click-left="$router.back()"
    style="z-index: 88;"
    >
    <template #right>
    <van-icon name="ellipsis" size="20"/>
  </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 内容 -->

    <!-- 时间 -->
    <div class="time">
      <span>16:51</span>
    </div>
    <!-- /时间 -->

    <div v-for="(item,index) in list" :key="index">
      <!-- 机器人 -->
    <div class="robot iem" v-if="item.name === 'xs'" >
      <van-image
      class="img1"
      round
      fit="cover"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="duihua">
        {{item.msg}}
        <i class="one"></i>
        <i class="two"></i>
      </div>
    </div>
    <!--/机器人 -->
    <!-- 人类 -->
    <div class="people iem" v-else>
      <div class="ren">
        <div class="robot human" >
          <div class="duihua">
        {{item.msg}}
        <i class="one"></i>
        <i class="two"></i>
      </div>
      <van-image
      class="img1"
      round
      fit="cover"
  :src="userAvatar"
      />
    </div>
      </div>
    </div>
    <!-- /人类 -->
    </div>
    <div class="shuru">
      <input type="text" v-model.trim="message" class="input">
      <button class="btn" @click="Btn">发送</button>
    </div>

    <!-- /内容 -->
  </div>
</template>

<script>
import {getItem} from '@/store'
import {mapGetters} from 'vuex'
// 按需导入 io 方法：调用 io('url') 方法，即可创建 websocket 连接的实例
import { io } from 'socket.io-client'
export default {
name:'RobotContainer',
data() {
  return {
    message:'',
     list: [
      // 1. 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
      { name: 'xs', msg: 'hi,你好！我是小思' },
      { name: 'me', msg: '我是编程小王子' }
    ],
    socket:null
  }
},
created() {
// 创建客户端 websocket 的实例
  this.socket = io('http://toutiao.itheima.net', {
      query: {
        token:getItem,
      },
      transports: ['websocket']
    })
  // 建立连接的事件
this.socket.on('connect', () => console.log('connect: websocket 连接成功！'))
this.socket.on('message', msg => console.log(msg))
// 接收到消息的事件
this.socket.on('message', msg => {
  // 把服务器发送过来的消息，存储到 list 数组中
  this.list.push({ name: 'xs', msg })
})
// 关闭连接的事件
this.socket.on('disconnect', () => console.log('disconnect: websocket 连接关闭！'))
},
computed: {
  ...mapGetters(['userAvatar'])
},
methods: {
 async Btn() {
   if(!this.message) {
     return
   }
   // 向服务器发送消息
  this.socket.emit('send', this.word)
   // 1. 将用户填写的消息存储到 list 数组中
  this.list.push({ name: 'me', msg: this.message })
  this.message = ''
  },
  // 滚动到页面底部
scrollToBottom() {
  // 1. 获取到所有的聊天 Item 项
  const chatItem = document.querySelectorAll('.iem')
  // 2. 获取到最后一项对应的 DOM 元素
  const lastItem = chatItem[chatItem.length - 1]

  // 3. 滚动元素的父容器，使被调用 scrollIntoView() 的元素对用户可见
  lastItem.scrollIntoView({
    behavior: 'smooth',
    // 定义垂直方向的对齐（end 表示元素的底端将和其所在滚动区的可视区域的底端对齐）
    block: 'end'
  })
}
},
watch: {
  list() {
    // 监视到 list 数据变化后，等 DOM 更新完毕，再执行滚动到底部的操作
    this.$nextTick(() => {
      this.scrollToBottom()
    })
  }
},
beforeDestroy() {
  // 组件被销毁之前，清空 sock 对象

  // 关闭连接
  this.socket.close()

  // 销毁 websocket 实例对象
  this.socket = null
}
}
</script>

<style scoped lang="less">
.robot-container {
  padding: 92px 0;
  .time {
    text-align: center;
    font-size: 17px;
    color: #d5d5d5d5;
    padding: 33px 0 45px 0;
  }
  .robot {
    display: flex;
    padding-left: 32px;
    margin-bottom: 50px;
    .img1 {
      width: 71px;
      height: 71px;
    }
    .duihua {
      position: relative;
      width: 372px;
      // height: 72px;
      margin-left: 30px;
      border: 1px solid #c2d9ea;
      background-color: #e0effb;
      border-radius: 10px;
      // border-left: none;
      font-size: 29px;
      color: #222222;
      line-height: 72px;
      text-align: center;
      .one {
        position: absolute;
        left: -29px;
        top: 19px;

       width: 0;
       height: 0;
       border-top: 16px solid transparent;
       border-right: 16px solid #e0effb;
       border-bottom: 16px solid transparent;
       border-left: 16px solid transparent;
       z-index: 15;
       
      }
      .two {
         position: absolute;
        left: -32px;
        top: 18px;

       width: 0;
       height: 0;
         border-top: 17px solid transparent;
       border-right: 17px solid #c2d9ea;
       border-bottom: 17px solid transparent;
       border-left: 17px solid transparent;
       z-index: 10;
      }
    }
  }
  .people {
    padding-right: 32px;
    display: flex;
    justify-content: end;
    .ren {
      .human {
        .duihua {
          margin-right: 29px;
          .one {
             border-right: 16px solid transparent;
             border-left: 16px solid #e0effb;
            left: 372px;
          }
          .two {
             border-right: 17px solid transparent;
             border-left: 17px solid #c2d9ea;
            left: 372px;
          }
        }
      }
    }
  }
  .shuru {
    position: fixed;
    display: flex;
    align-items: center;
    padding: 0 28px;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90px;
    // background-color: blue;
    background-color: #f4f5f4;
    z-index: 99;
    .input {
      padding-left: 30px;
      box-sizing: border-box;
      width: 590px;
      height: 65px;
      // background-color: #ccc;
      border-radius: 32px;
      border: none;
      border: 1px solid #e8e8e8;
      color: #222222;
      font-size: 30px;
    }
    .btn {
      flex: 1;
      font-size: 30px;
      color: #cacaca;
      border: none;
      background-color: #f4f5f4;
    }
  }

}
</style>