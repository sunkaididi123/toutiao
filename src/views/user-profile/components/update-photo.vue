<template>
  <div class="update-photo">
      <img :src="img" ref="image" class="Bgimg">

      <!-- 工具栏 -->
      <div class="toobar">
          <div class="console" @click="$emit('close')">取消</div>
          <div class="confirm" @click="OnConfirm">完成</div>
      </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import {UpdateUserImg} from '@/api/user'
export default {
name:'UpdatePhoto',
data() {
    return {
        cropper:null
    }
},
props: {
    img: {
        type:[String,Object],
        required:true
    }
},
mounted() {
const image = this.$refs.image;
this.cropper = new Cropper(image, {
  viewMode: 1,
dragMode: 'move',
aspectRatio: 1,
autoCropArea: 1,
cropBoxMovable: false,
cropBoxResizable: false,
background: false,
movable: true
})
},
methods: {
 OnConfirm() {
     this.$toast.loading({
         message:'更新中...',
         forbidClick:true,
         duration:0
     })
        this.cropper.getCroppedCanvas().toBlob(async blob => {
        //  如果接口要求Content-Type	multipart/form-data
        // 则必须传递 FormData对象
        const formData = new FormData()
        formData.append('photo',blob)
     try {
         const {data} =  await  UpdateUserImg(formData)
    //  console.log(data);
     this.$emit('update-img',data.data.photo)
     this.$toast.success('更新成功')
     this.$emit('close')
     } catch(err) {
         this.$toast.fail('更新失败,请稍后重试')
     }

        })
    }
}
}

</script>

<style scoped lang="less">
.update-photo {
    background-color: #000;
    height: 100%;
    .Bgimg {
        display: block;
        max-width: 100%;
    }
    .toobar {
        position: fixed;
        display: flex;
        justify-content: space-between;
        bottom: 0;
        left: 0;
        right: 0;
    .console,.confirm {
        width: 90px;
        height: 90px;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    }
}
</style>