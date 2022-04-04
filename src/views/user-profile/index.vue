<template>
  <div class="user-container">
      <!-- 导航栏 -->
      <van-nav-bar
      class="page-nav-bar"
  title="个人信息"
  right-text="保存"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
      <!-- /导航栏 -->
<input type="file" hidden ref="file" @change="OnChange"
 />
      <!-- 个人信息 -->
      <div class="user-message">
         <van-cell
         @click="$refs.file.click()"
         title="头像"
         is-link>
             <template #default>
                 <van-image class="img" round fit="cover"
                    :src="userbase.photo"
                />
             </template>
         </van-cell>
         <van-cell @click="isPopupShow = true" title="昵称" :value="userbase.name" is-link></van-cell>
         <van-cell @click="isPopupGenderShow = true" title="性别" :value="userbase.gender ? '女' : '男'" is-link></van-cell>
         <van-cell @click="isPopupBirthdayShow = true" title="生日" :value="userbase.birthday" is-link></van-cell>
      </div>
      <!-- /个人信息 -->
    <!-- 编辑头像 -->
      <!-- 编辑生日 -->
     <van-popup
    v-model="isPopupImgShow"
    position="bottom"
    style="height:100%;"
    >
    <UpdatePhoto v-if="isPopupImgShow" :img="imgSrc" @close="isPopupImgShow = false" @update-img="userbase.photo = $event"></UpdatePhoto>
    </van-popup>

      <!-- /编辑生日 -->
    <!-- /编辑头像 -->

      <!-- 编辑昵称 -->
    <van-popup
    v-model="isPopupShow"
    style="height:100%;"
    position="bottom"
    >
    <UpdateName
    v-if="isPopupShow"
    @update-name="isPopupShow = false"
    v-model="userbase.name"
    ></UpdateName>
    </van-popup>

      <!-- /编辑昵称 -->

      <!-- 编辑性别 -->
      <van-popup
    v-model="isPopupGenderShow"
    position="bottom"
    >
    <UpdateGender
    v-if="isPopupGenderShow"
    @update-gender="isPopupGenderShow = false"
    v-model="userbase.gender"
    ></UpdateGender>
    </van-popup>
      <!-- /编辑性别 -->


      <!-- 编辑生日 -->
     <van-popup
    v-model="isPopupBirthdayShow"
    position="bottom"
    >
    <UpdateBirthday v-if="isPopupBirthdayShow" v-model="userbase.birthday" @update-birthday="isPopupBirthdayShow = false"></UpdateBirthday>
    </van-popup>

      <!-- /编辑生日 -->
  </div>
</template>

<script>
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
import {getUserbase} from '@/api/user'
export default {
name:'UserProifle',
data() {
    return {
        userbase:{},   //用户个人信息
        isPopupShow:false,
        isPopupGenderShow:false,
        isPopupBirthdayShow:false,
        isPopupImgShow:false,
        imgSrc:''   //预览的图片
    }
},
created() {
    this.loadUser()
},
methods: {
    onClickLeft() {
        this.$router.back()
    },
    onClickRight() {

    },
   async loadUser() {
        try {
            const {data} = await getUserbase()
            // console.log(data);
            this.userbase = data.data
        } catch(err) {
            this.$toast('获取用户信息失败,请稍后重试')
        }
    },
    OnChange() {
        // 获取文件对象
        const file = this.$refs.file.files[0]
        // 基于文件对象获取blob数据
        // console.log(file);
        const data = window.URL.createObjectURL(file)
        this.imgSrc = data
        this.isPopupImgShow = true
        // file-input 如果选了同一个文件不会触发change事件
        // 解决办法就是每次使用完毕后,把他的value清空
        this.$refs.file.value = ''
    }
},
components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
}

}
</script>

<style scoped lang="less">
 /deep/ .page-nav-bar {
   .van-nav-bar__text {
       color: #fff;
   }
    
}
 .img {
    width: 60px;
    height: 60px;
}
.van-popup {
    background-color: #f5f7f9;
}
</style>