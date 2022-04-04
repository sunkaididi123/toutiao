<template>
  <div class="user-toutiao">
      <!-- 导航区域 -->
      <van-nav-bar
      class="page-nav-bar"
      :title="user.name"
        left-arrow
        fixed
        @click-left="$router.back()"
      >
      <template #right>
    <van-icon name="ellipsis" size="20"/>
  </template>

      </van-nav-bar>
      <!-- /导航区域 -->

      <!-- 主体内容 -->
      <div class="main">
          <!-- 个人信息 -->
          <div class="user-info">
              <van-image
              class="user-info-img"
            :src="user.photo"
            fit="cover"
            round
                />
            <!-- 关注 -->
            <div class="guanzhu">
            <van-row>
                <van-col span="6" class="user-number">
                    <span class="one">{{user.art_count}}</span>
                    <span class="two">发布</span>
                </van-col>
                <van-col span="6" class="user-number">
                    <span class="one">{{user.follow_count}}</span>
                    <span class="two">关注</span>
                </van-col><van-col span="6" class="user-number">
                    <span class="one">{{user.fans_count}}</span>
                    <span class="two">粉丝</span>
                </van-col><van-col span="6" class="user-number">
                    <span class="one">{{user.like_count}}</span>
                    <span class="two">获赞</span>
                </van-col>
            </van-row>
                <div class="user-btn">
                    <van-button type="info" :loading="isLoading" class="btn" @click="Btn">关注</van-button>
                </div>
            </div>
            <!-- /关注 -->
          </div>
          <!-- /个人信息 -->
          <!-- 认证 -->
          <div class="renzheng">
              <p>认证: <span>微软认证开发者</span> </p>
              <p>简介: <span>黑马程序员,在黑马培训了一年,收获颇丰</span></p>
          </div>
          <!-- /认证 -->
          
          <!-- 头条内容 -->
          <div class="content">
              <div class="user-geren">
                  <van-image
              class="geren-img"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
            round
                />
                <div class="message">
                    <span class="one">黑马李依依</span>
                    <span class="two">2018-09-08</span>
                </div>
              </div>
              <div class="tupian">
                  <p>用Supervisor实现进程守护,在异常退出时...</p>
                  <div class="user-tupian">
                      <van-row>
                        <van-col span="8">
                            <div class="pad">
                                <van-image
                            class="img"
                                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                                />
                            </div>
                        </van-col>
                         <van-col span="8">
                            <div class="pad">
                                <van-image
                            class="img"
                                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                                />
                            </div>
                        </van-col> <van-col span="8">
                            <div class="pad">
                                <van-image
                            class="img"
                                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                                />
                            </div>
                        </van-col>
                        </van-row>
                  </div>
              </div>
              <div class="pinglun">
                  <van-row>
                    <van-col span="8">
                        <van-icon name="chat-o" class="iicon"/>
                        评论</van-col>
                   <van-col span="8">
                        <van-icon name="good-job-o" class="iicon" />
                        点赞</van-col>
                         <van-col span="8">
                        <van-icon name="star-o" class="iicon"/>
                        收藏</van-col>
                </van-row>
              </div>
          </div>
          <div class="content">
              <div class="user-geren">
                  <van-image
              class="geren-img"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
            round
                />
                <div class="message">
                    <span class="one">黑马李依依</span>
                    <span class="two">2018-09-08</span>
                </div>
              </div>
              <div class="tupian">
                  <p>用Supervisor实现进程守护,在异常退出时...</p>
                  <div class="user-tupian">
                      <van-row>
                        <van-col span="8">
                            <div class="pad">
                                <van-image
                            class="img"
                                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                                />
                            </div>
                        </van-col>
                         <van-col span="8">
                            <div class="pad">
                                <van-image
                            class="img"
                                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                                />
                            </div>
                        </van-col> <van-col span="8">
                            <div class="pad">
                                <van-image
                            class="img"
                                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                                />
                            </div>
                        </van-col>
                        </van-row>
                  </div>
              </div>
              <div class="pinglun">
                  <van-row>
                    <van-col span="8">
                        <van-icon name="chat-o" class="iicon"/>
                        评论</van-col>
                   <van-col span="8">
                        <van-icon name="good-job-o" class="iicon" />
                        点赞</van-col>
                         <van-col span="8">
                        <van-icon name="star-o" class="iicon"/>
                        收藏</van-col>
                </van-row>
              </div>
          </div>
          <!-- /头条内容 -->
      </div>
      <!-- /主体内容 -->
  </div>
</template>

<script>
import {getUserInfo} from '@/api/user'
export default {
name:'UserToutiao',
data() {
return {
    user:{},
    isLoading:false
}
},
created() {
    this.loadUserInfo()
},
methods: {
    async loadUserInfo() {
        try {
          const {data} =  await getUserInfo()
          console.log(data);
          this.user =data.data
        } catch(err) {
            this.$toast.fail('获取失败，请稍后重试')
        }
    },
   async Btn() {
       this.loading = true
       try {
         const{data} =  await addFollow(this.user.id)
        //  console.log(data);
         this.$toast.success('关注成功')
         this.loading = false

       } catch(err) {
           this.loading = false
           this.$toast.fail('不能关注自己')

       }
    }
}

}
</script>

<style scoped lang="less">
 .user-toutiao {
    background-color: #f5f7f9;
    padding-top: 92px;
    .main {
        padding:  0 32px;
        background-color: #fff;
      .user-info {
          display: flex;
        padding: 20px 0 60px 0;
      .user-info-img {
            width: 160px;
            height: 160px;
        }
        .guanzhu {
        flex: 1;
        .user-number {
            display: flex;
            flex-direction: column;
            align-items: center;
            .one {
                font-size: 38px;
                color: #0d0a10;
                font-weight: 700;
            }
            .two {
                font-size: 30px;
                color: #9c9b9d;
            }
        }
        .user-btn {
            display: flex;
            justify-content: center;
            padding-top: 20px;
            .btn {
            width: 289px;
            height: 55px;
            background-color: #6bb5ff;
            border-radius: 10px;
            border: none;
        }
        }
    }
    }
    .renzheng {
        margin: 16px 0;
        p {
            line-height: 56px;
            font-size: 27px;
            color: #646263;
            span {
                color:#212121
            }
        }
    }
    .content {
        padding-top: 25px;
        // padding-bottom: 35px;
        .user-geren {
            display: flex;
            height: 70px;
            padding-bottom: 35px;
            .geren-img {
            width: 70px;
            height: 70px;
        }
        .message {
            display: flex;
            flex-direction: column;
            padding-left: 20px;
            
            .one {
                font-size: 26px;
                line-height: 40px;
                color: #222222;
            }
            .two {
                font-size: 16px;
                color: #a1a1a1;
            }
        }
        }
        .tupian {
            p {
                font-size: 30px;
                margin: 0;
            }
            .user-tupian {
                padding: 33px 0;
                .pad {
                    padding-right: 5px;
                    .img {
                    width: 100%;
                }
                }
            }
        }
        .pinglun {
            border-top: 1px solid #ccc;
            .van-col {
                display: flex;
                height: 95px;
                justify-content: center;
                align-items: center;
                border-right: 1px solid #ccc;
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
}
</style>