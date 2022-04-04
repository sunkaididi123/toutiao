<template>
  <div class="user-container">
      <!-- <div class="user-shoucang-one">
          <div class="top">
              <div class="left">
                  <p>{{item.title}}</p>
                <div class="font">
                    <span class="heima">黑马程序员</span>
                    <span>{{item.pubdate}}</span>
                </div>
              </div>
              <div class="right">
                  <van-image
                  class="img"
                  fit="cover"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    />
              </div>
          </div>
        <van-row class="bottom">
  <van-col span="8" >
      <van-icon name="chat-o" class="iicon"/>
                        评论</van-col>
  </van-col>
  <van-col span="8" >
      <van-icon name="good-job-o" class="iicon" />
                        点赞</van-col>
  </van-col>
  <van-col span="8" >
      <van-icon name="star-o" class="iicon"/>
            收藏</van-col>
  </van-col>
        </van-row>
      </div> -->
      <div class="user-shoucang-one" @click="$router.push(`/article/${item.art_id}`)">
          <div class="top">
              <div class="left">
                  <p>{{item.title}}</p>

                <div class="font">
                    <span class="heima">{{item.aut_name}}</span>
                    <span>{{time}}</span>
                </div>
              </div>
              <div class="right" v-if="item.cover.type === 1">
                  <van-image
                  class="img"
                  fit="cover"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    />
              </div>
          </div>
          <!-- 三张封面 -->
          <van-row v-if="item.cover.type === 3">
  <van-col span="8">
      <van-image
      fit="cover"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
/>
  </van-col>
  <van-col span="8">
      <van-image
      fit="cover"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
/>
  </van-col>
  <van-col span="8">
        <van-image
      fit="cover"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
/></van-col>
            </van-row>
          <!-- /三张封面 -->
        <van-row class="bottom">
  <van-col span="8" >
      <van-icon name="chat-o" class="iicon"/>
                        评论</van-col>
  <van-col span="8" >
      <van-icon name="good-job-o" class="iicon" />
                        点赞</van-col>
  <van-col span="8" >
      <van-icon name="star-o" class="iicon"/>
            收藏</van-col>
        </van-row>
      </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
name:'UserContainer',
props: {
    item: {
        type:Object,
        required:true
    }
},
computed: {
    time() {
        return  dayjs(this.item.pubdate).format('YYYY-MM-DD')
    }
}
}
</script>

<style scoped lang="less">
.user-container {
    .user-shoucang-one {
        padding: 0 23px;
        .top {
            display: flex;
            align-items: center;
            height: 215px;
            .left {
                flex: 1;
                font-size: 20px;
                // text-align: center;
                p {
                    font-size: 31px;
                    line-height: 55px;
                    letter-spacing: 1px;
                }
                .font {
                    font-size: 22px;
                    color: #b4b4b4;
                    .heima {
                        margin-right: 18px;
                    }
                }
            }
            .right {
                width: 267px;
                display: flex;
                justify-content: end;
                .img {
                    width: 232px;
                    height: 146px;
                }
            }
        }
        .bottom {
            display: flex;
            align-items: center;
            height: 93px;
            border-top: 1px solid #ececec;
            border-bottom: 1px solid #ececec;
           .van-col {
               display: flex;
               align-items: center;
               justify-content: center;
               height: 100%;
               border-right: 1px solid #ececec;
               font-size: 26px;
                .iicon {
                    font-size: 37px;
                    padding-right: 10px;
                    vertical-align: middle;
                }
               &:last-child {
                   border: none;
               }
           }
        }
    }
}
</style>