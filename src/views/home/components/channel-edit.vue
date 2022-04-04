<template>
  <div class="channel-edit">
        <!-- 频道推荐 -->
      <van-cell center :border = false>
          <template #title>
              <div class="title-text">我的频道</div>
          </template>
          <van-button
          class="edit-btn"
            type="danger"
            plain
            round
            size="mini"
            @click="isEdit = !isEdit"
            >{{isEdit ? '完成' : '编辑'}}</van-button>
      </van-cell>
      <van-grid class="my-grid" :gutter="10">
  <van-grid-item v-for="(value,index) in arr" :key="value.id" class="grid-item"
  @click="onMyChannelClick(value,index)"
  >
  <template #text>
      <span class="text" :class="{isHave:index === active}">{{value.name}}</span>
  </template>
  <template #icon>
      <van-icon
      name="clear"
    v-show="isEdit && !fiexChannels.includes(value.id)"
      ></van-icon>
  </template>
  </van-grid-item>
</van-grid>
<!-- /频道推荐 -->
   <!-- 频道推荐 -->
      <van-cell center :border = false>
          <template #title>
              <div class="title-text">频道推荐</div>
          </template>
      </van-cell>
      <van-grid class="recommend-grid" :gutter="10">
  <van-grid-item v-for="(channel,index) in recommendChannels" :key="index" :text="channel.name" class="grid-item" 
  icon="plus"
  @click="onAddChannel(channel)"
  />
</van-grid>
<!-- /频道推荐 -->
  </div>
</template>

<script>
import {getAllChannels,addUserChannel,deleteUserChannel} from '@/api/channel' 
import {mapState} from 'vuex'
import {setItem} from '@/utiles/storage' 
export default {
data() {
   return {
       list: [],   //所有频道
       isEdit:false , //控制编辑状态的显示
       fiexChannels:[0] //固定频道不允许删除
   } 
},
props: {
    arr: {
        type: Array,
        required: true
    },
    active: {
        type:Number,
        required:true
    }
},
computed: {
     ...mapState(['user']),
    recommendChannels() {
        const Channels = []
       this.list.forEach(channel => {
        // find遍历数组，找到满足条件的元素项
         const res = this.arr.find(mychannel => {
               return mychannel.id === channel.id
           })
        //如果我的频道不包含该频道项，则收集到推荐频道中
           if(!res) {
            Channels.push(channel)
           }
       })
        return Channels
         }
   
},

name:'ChannelEdit',

created() {
    this.loadAllChannels()
},
methods: {
   async loadAllChannels () {
      try {
          const {data} = await getAllChannels()
        //   console.log(data)
          this.list = data.data.channels
      } catch(err) {
          this.$toast('请求失败')
      }
    },
   async onAddChannel(channel) {
        this.arr.push(channel)

        // 数据持久化处理
        if(this.user) {
            try{
                 // 已登录，把数据存储到服务器
                 await addUserChannel({
                id: channel.id,  //频道id,
                seq:this.arr.length   //
            })
            } catch(err) {
                this.$toast('保存失败，请稍后重试')
            }

           
          
        } else {
             // 未登录，把数据存储到本地
             setItem('TOUTIAN_CHANNELS',this.arr)

        }
       
        
    },
    onMyChannelClick(value,index) {
        // 如果是编辑状态则执行删除功能
        if(this.isEdit) {
            // 如果是固定频道则不删除
            if(this.fiexChannels.includes(value.id)) {
                return 
            }
           if(index <= this.active) {
               this.$emit('update-active',this.active -1,true)
           }
        //    删除频道
           this.arr.splice(index,1)
        // 4.处理持久化
        this.deleteChannel(value)
        } else {
            this.$emit('update-active',index,false)
        }
        // 非编辑状态执行切换频道
    },
   async deleteChannel(channel) {
    if(this.user) {
        try {
            // 已登录，将数据更新到线上
            await  deleteUserChannel(channel.id)
        } catch (err) {
            this.$toast('操作失败,请稍后重试')
        }
        
      
        
    } else {
        // 未登录，将数据更新到本地存储
       setItem('TOUTIAN_CHANNELS',this.arr)
    }
    }
},

}
</script>

<style scoped lang="less">
 .channel-edit {
    padding: 85px 0;
    .title-text {
        font-size: 32px;
        color: #333;
    }
   .edit-btn {
       width: 104px;
       height: 48px;
       font-size: 26px;
       color: #f85959;
       border: 1px solid #f85959;
    }
   /deep/  .grid-item {
        width: 160px;
        height: 86px;
        // 子组件的非根节点
       .van-grid-item__content {
           white-space: nowrap;
       background-color: #f4f5f6;
       .van-grid-item__text,.text {
           font-size: 28px;
           color: #222;
           margin-top: 0;

       }
       .isHave {
     color: red;
 }
    .van-grid-item__icon-wrapper {
        position: unset;
    }
        }
    }

    /deep/ .my-grid {
        .grid-item {
            .van-icon-clear  {
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;

            }
        }
    }

   /deep/ .recommend-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 24px;
                    margin-right: 6px;
                }
            }
        }
    }
}
 
</style>