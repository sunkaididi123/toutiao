<template>
  <div class="main">
      <div class="article-container">
      <!-- 文章导航模块 -->
      <van-nav-bar
      class="page-nav-bar"
  left-arrow
  fixed
  @click-left="onClickLeft"
>
 <template #right>
    <van-icon name="ellipsis"  size="20"/>
  </template>
</van-nav-bar>
      <!-- /文章导航模块 -->
     <!-- 主体内容区域 -->
     <div class="text-container">
           <!-- 加载中 -->
      <van-loading size="24px" color="#3296fa" vertical v-if="loading">加载中</van-loading>
      <!-- /加载中 -->
      <!-- 加载完成 -->
      <div class="con" v-else-if="article.title">
          <van-cell class="nav-title">
          <template #title>
              <h1 class="title">{{article.title}}</h1>
          </template>
            </van-cell>
            <!-- 底部点赞 -->
      <div class="nav-bottom">
          <van-button @click="isPostShow = true" type="default" class="bnt">写评论</van-button>
          <div class="icon">
              <LikeArticle v-model="article.attitude" :art_id="article.art_id"></LikeArticle>
              <div class="pinglun">
                  <i class="toutiao toutiao-pinglun"></i>
                  <span class="red">{{totalCommentCount}}</span>
              </div>
               <CollectArticle v-model="article.is_collected" :article-id="article.art_id"></CollectArticle>
              <div>
                  <i class="toutiao toutiao-fenxiang"></i>
              </div>
          </div>
      </div>
      <!-- /底部点赞 -->

      <!-- 发布评论弹出层 -->
      <van-popup v-model="isPostShow" position="bottom">
          <CommentPost :target="article.art_id" @post-success="onPostSuccess"></CommentPost>
      </van-popup>
      <!-- /发布评论弹出层 -->

       <!-- 作者信息 -->
      <van-cell  >
           <template #title>
              <div class="author-message">
                  <van-image
                  class="author-img"
        fit="cover"
        round
        :src="article.aut_photo"
            />
            <div class="author-right">
                <span>{{article.aut_name}}</span>
                <span>{{article.pubdate | filter}}</span>
            </div>
              </div>
          </template>
          <!-- 当我们传递给子组件的数据既要使用还要修改的时候
          传递:props
          :isFollowed="article.is_followed" :userId="article.aut_id"
          修改:自定义事件
           @update-is_followed="article.is_followed = $event"
          简写方式，在组件上使用v-model
           -->
          <template #default>
              <FollowUser :isFollowed="article.is_followed" :userId="article.aut_id" @update-is_followed="article.is_followed = $event"></FollowUser>
              <!-- <van-button type="info" round    class="author-guanzhu" v-if="article.is_followed"
              @click="onFollow"
              :loading="followLoading"
              >
              <template #icon>
                  <van-icon name="plus" class="jiahao" />
              </template>
              关注</van-button>
              <van-button v-else  type="info" round color="#ccc" @click="onFollow"   :loading="followLoading" class="author-guanzhu yi-guanzhu">
              已关注</van-button> -->
          </template>
      </van-cell>
      <!-- /作者信息 -->
     
      <!-- 文本区域 -->
              <div class="article-content markdown-body" v-html="article.content" ref="article-content">
              </div>
      <!-- /文本区域 -->
      
     
      <!-- 猜你喜欢 -->
      <van-cell>
          <template #title>
              <div class="like">
                  <div class="guss-you">猜你喜欢</div>
                  <div class="bottom">
                      <div class="liaojie">
                          <span>了解微信小程序</span>
                          <span>了解微信小程序</span>
                      </div><div class="liaojie">
                          <span>了解微信小程序</span>
                          <span>了解微信小程序</span>
                      </div><div class="liaojie">
                          <span>了解微信小程序</span>
                          <span>了解微信小程序</span>
                      </div>
                  </div>
                  <div class="dianzan">
                      <button>
                            <i class="toutiao toutiao-dianzan2"></i>
                          点赞
                      </button>
                      <button>
                           <i class="toutiao toutiao-shanchu"></i>
                          不喜欢
                      </button>
                  </div>
              </div>
          </template>
      </van-cell>
      <!-- 猜你喜欢 -->
      <!-- 图片 -->
      <van-cell>
          <template #title>
              <div class="picture">
                  <div class="neibu">
                      <van-image class="tupian"
                      fit="cover"
  :src="article.aut_photo"
/>
                    <p>前端与移动开发-课程升级V6.0  高薪技术全覆盖 <br /> 学前端 选择-传智播客</p>
                  </div>
              </div>
          </template>
      </van-cell>
      <!-- /图片 -->
      <!-- 评论区域 -->
    <CommentList @replay-click="OnReplyClick" :source="article.art_id" @onload-success="totalCommentCount = $event.total_count" :list="commentlist" ></CommentList>
      <!-- /评论区域 -->
      </div>
      <!-- /加载完成 -->
        <!-- 加载失败 -->
     <div class="faile" v-else>
         <i class="toutiao toutiao-wuwangluo"></i>
         <p>亲，网络不给力哦~</p>
         <button @click="loadArticle()">点击重试</button>
     </div>
     <!-- /加载失败 -->
      </div>
     <!-- /主体内容区域 -->
  </div>
  <div class="main-wrap">
      <!-- 评论回复 -->
      <!-- 弹出层时懒渲染:只有在第一次展示才会渲染里面的内容，之后关闭和显示都是在切换内容的显示和隐藏 -->
      <!-- v-if条件渲染，true渲染，false不渲染 -->
      <van-popup v-model="isReplyShow" position="bottom" style="height:100%;">
          <CommentReplay v-if="isReplyShow" :comment="CurrentComment" @close="isReplyShow = false"></CommentReplay>
      </van-popup>
<!-- /评论回复 -->
  </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from '../home/components/commentlist'
import CommentPost from '@/views/article/components/comment-post.vue'
import CommentReplay from './components/comment-replay.vue'
// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg',
//   ],
// //   起始位置。从哪里开始预览
//   startPosition: 1,
// });
export default {

name:'ArticleIndex',
async created() {
      
         this.loading = true
      try {
        //   获取文章数据成功
       
          const {data} = await getArticleById(this.articleId)
        
            this.article = data.data
            // console.log(this.article);
            
        this.$nextTick().then(() => {
             this.previewImage()
        })
          
        
        // 控制加载中的状态,加载完数据修改为false，请求成功，关闭loading
          this.loading = false
      } catch(err) {
        //   this.$toast('获取文章失败',err)
          this.loading = false
      }
      
},
// 给所有的后代组件提供数据
provide: function () {
  return {
   articleId:this.articleId
  }
},
data() {
    return {
        article:{},   //文章详情
        loading:true , //加载中的loading状态
        followLoading:false,   //默认不加载
        totalCommentCount:0,
        isPostShow:false, //评论弹出层显示状态
        commentlist:[],  //评论列表
        isReplyShow:false,
        CurrentComment: {}   //当前点击回复的评论项
    }
},
components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReplay
},

props: {articleId
    : {
        type:[String,Number,Object],
        required:true
    }
},
methods: {
    onClickLeft() {
        this.$router.back()
    },
    
    previewImage() {
        //得到所有image节点
        const articleContent = this.$refs['article-content']
        // console.log(articleContent);
        let imgArr =  articleContent.querySelectorAll('img')
        // console.log(imgArr)
        const images = []
        imgArr.forEach((item,index) => {
            images.push(item.src)
            item.onclick = function() {
               ImagePreview({
                //    预览的图片地址数组
                images,
            startPosition: index,
                })
            }
        })
        // console.log(images);
                
    },
    onPostSuccess(data) {
         // 1.关闭弹出层
       this.isPostShow = false     
            // 2.渲染到评论顶部
        this.commentlist.unshift(data.new_obj)
    this.$toast.success('发布成功')
    },
    OnReplyClick(comment) {
        // console.log(comment);
        this.CurrentComment = comment
        // 显示评论回复弹出层
        this.isReplyShow = true
    }

}
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
    position: fixed;
    top: 92px;
    bottom: 92px;
    overflow-y: scroll;
    left: 0;
    right: 0;
    padding-right: 30px;
    background-color: #fff;
    .over {
        margin: 0;
        padding: 150px 0;
    }
    .faile {
        padding-top: 285px;
        text-align: center;
        .toutiao-wuwangluo {
            font-size: 122px;
            color: rgb(180,180,180);
        }
        p {
            margin: 0;
            padding: 33px 0 45px;
            font-size: 31px;
            color: rgb(102,102,102);
        }
        button {
            width: 280px;
            height: 70px;
            font-size: 30px;
            color: rgb(102,102,102);
            background-color: #fff;
            border: none;
            border: 2px solid rgb(195,195,195);
        }
    }
    .nav-title {
        .title {
            font-size: 40px;
            color: rgb(58,58,58);
            line-height: 65px;
            letter-spacing:2px;
        }
    }
    .author-message {
        display: flex;
        .author-img {
            width: 70px;
            height: 70px;
        }
        .author-right {
            display: flex;
            flex-direction: column;
            padding-left: 20px;
            line-height: normal;
            margin-top: 6px;
            span:nth-child(1) {
                font-size: 24px;
                color: rgb(51,51,51);
            }
            span:nth-child(2) {
                font-size: 20px;
                color: rgb(183,183,183);
            }

        }
    }
 /deep/.author-guanzhu {
        width: 170px;
        height: 58px;
        margin-bottom: 12px;
        .van-button__icon {
            padding-bottom: 8px;
            .jiahao {
                font-size: 22px;
            }
        }
        .van-button__text {
            font-size: 27px;
        }
    }
   /deep/ .nav-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        border-top: 1px solid #ccc;
        bottom: 0;
        left: 0;
        right: 0;
        height: 90px;
        background-color: rgb(255,255,255);
        .bnt {
            width: 400px;
            height: 64px;
        }
    .icon {
         display: flex;
         align-items: center;
         color: rgb(119,119,119);
         .pinglun {
             position: relative;
             width: 42px;
              margin-right: 60px;
              .red {
                  position: absolute;
                  left: 16px;
                  top: -15px;
                  background-color: rgb(226,40,41);
                  color: #fff;
                  line-height: 26px;
                  font-size: 12px;
                  border-radius: 50%;
                  padding: 5px 10px;
              }
         }
                i {
                    font-size: 40px;
                    margin-right: 40px;
                    // vertical-align: middle;
                }
            }
    }
    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
    .guss-you {
        font-size: 34px;
        color: #333;
        font-weight: 700;
    }
    .bottom {
        padding-top: 20px;
        padding-right: 40px;
       .liaojie {
           display: flex;
           justify-content: space-between;
           height: 66px;
           line-height: 66px;
           span {
               color:rgb(128,128,128);
               font-size: 30px;
           }
       }
    }
    .dianzan {
        padding-top: 20px;
        display: flex;
        justify-content: center;
        button {
            background-color: #fff;
            width: 156px;
            height: 58px;
            border: 2px solid rgb(238,238,238);
            border-radius: 29px;
            &:nth-child(1) {
                margin-right: 50px;
            }
            i {
                // vertical-align: top;
                font-size: 30px;
            }
        }
    }
    .picture {
        width: 687px;
        height: 500px;
        border: 1px solid rgb(232,232,232);
        .neibu {
            padding: 30px 20px 0 32px;
            .tupian {
                width: 635px;
                height: 352px;
            }
            p {
                font-size: 25px;
                color: rgb(34,34,34);
                margin-bottom: 30px;
                line-height: normal;
            }
        }
    }
}
</style>