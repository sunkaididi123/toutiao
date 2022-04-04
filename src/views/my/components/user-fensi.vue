<template>
  <div class="fensi">
       <van-cell class="one"  >
            <template #title>
                <div class="left">
                    <van-image
                    class="img"
                    round
                    fit="container"
                    :src="item.photo"
                    />
                    <div class="left_font">
                        <span class="li">{{item.name}}</span>
                        <span class="fans">粉丝数&nbsp;{{item.fans_count}}</span>
                    </div>
                </div>
            </template>
            <button class="btn" @click="disBtn(item.id)" v-if="!item.mutual_follow">关注</button>
           <button @click="Btn" class="Lbtn" v-else >互相关注</button>
        </van-cell>
  </div>
</template>

<script>
import {addFollow,removeFollow} from '@/api/user'
export default {
name:'UserFensi',
data() {
return {
}
},
props: {
    item: {
        type:Object,
        required:true
    }
},
methods: {
   async disBtn(id) {
        try { 
            await addFollow(id)

            this.item.mutual_follow = true
        } catch (err) {
            this.$toast.fail('关注失败，请稍后重试')
        }
    },
    async Btn() {
        try {
            await removeFollow(this.item.id)
            this.item.mutual_follow = !this.item.mutual_follow
        }catch(err) {
            this.$toast.fail('取消失败，请稍后重试')
        }
    }
}
}
</script>

<style scoped lang="less">
.fensi {
    .one {
        display: flex;
        align-items: center;
        height: 155px;
        border-bottom: 1px solid #e8e8e8;
       .left {
           display: flex;
           align-items: center;
            .img {
            width: 110px;
            height: 110px;
            margin-right: 25px;
        }
        .left_font {
            display: flex;
            flex-direction: column;
            .li {
                font-size: 28px;
                color: #222222;
            }
            .fans {
                font-size: 24px;
                color: #999999;
            }
        }
       }
       .btn {
           width: 116px;
           height: 56px;
           background-color: #f85959;
           border-radius: 6px;
           border: none;
           color: #fff;
       }
       .Lbtn {
        //    width: 116px;
           height: 56px;
           background-color: #fff;
           border-radius: 6px;
           border: none;
           border: 2px solid #e8e8e8;
           color: #999999;
           font-size: 20px;
       }

    } }
</style>