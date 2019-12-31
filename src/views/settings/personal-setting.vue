<template>
  <div>
    <el-dialog
      title="个人设置"
      width="720px"
      :visible="visible"
      @close="close"
      destroy-on-close
    >
      <div v-loading="loading">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form
              :model="form"
              size="small"
              ref="form"
            >
              <el-form-item
                prop="nickName"
                label="昵称"
                :rules="{required:true}"
              >
                <el-input
                  v-model="form.nickName"
                  maxlength="25"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="email"
                :rules="[{required:false},{type:'email',message:'email格式不正确'}]"
                label="Email"
              >
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-upload
              class="avatar-uploader"
              action="'string'"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleCrop"
              accept="image/jpg, image/jpeg, image/png"
            >
              <el-avatar
                shape="square"
                :size="200"
                icon="el-icon-user-solid"
                :src="form.avatarUrl"
                style="font-size:120px"
              ></el-avatar>
              <div class="avatar-hover">
                上传头像图片
                <br>
                建议尺寸:200*200 png,jpg
              </div>
            </el-upload>

          </el-col>
        </el-row>

        <div class="ac mt10">
          <el-button
            size="small"
            @click="updatePassVisibled = true"
            type="primary"
          >修改密码</el-button>
          <el-button
            size="small"
            @click="save"
            type="primary"
          >确 定</el-button>
          <el-button
            size="small"
            @click="close"
          >取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑头像"
      width="520px"
      @close="editAvatarVisible = false"
      :visible="editAvatarVisible"
    >
      <VueCropper
        style="height:350px"
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :output-type="option.outputType"
        :info="true"
        :full="option.full"
        :fixed="fixed"
        :fixed-number="fixedNumber"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :fixed-box="option.fixedBox"
        :enlarge="option.enlarge"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight"
        :center-box="option.centerBox"
        :high="option.high"
        mode="cover"
      />
      <!-- <el-slider
        :max="10"
        :min="-10"
        @input="sliderSizeChange"
        v-model="cropperSliderSize"
      ></el-slider> -->
      <div class="ac mt10">
        <el-button
          size="small"
          @click="getCropBlob"
          type="primary"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      width="420px"
      @close="updatePassVisibled = false"
      :visible="updatePassVisibled"
    >

      <el-form
        :model="updatePassForm"
        size="small"
        ref="updatePassForm"
      >
        <el-form-item
          prop="oldPassword"
          label="当前密码"
          :rules="{required:true}"
        >
          <el-input
            show-password
            v-model="updatePassForm.oldPassword"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="newPassword"
          label="当前密码"
          :rules="{required:true}"
        >
          <el-input
            show-password
            v-model="updatePassForm.newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="confirmNewPassword"
          label="确认密码"
          :rules="{required:true}"
        >
          <el-input
            show-password
            v-model="updatePassForm.confirmNewPassword"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="ac mt10">
        <el-button
          size="small"
          @click="savePass"
          type="primary"
        >确 定</el-button>
      </div>
    </el-dialog>
    <upload-file
      style="display:none"
      ref="activeUpload"
      @uploadSuccess="uploadSuccess"
      :limit="obj"
    ></upload-file>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper,
    // leave
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      obj: {
        size: '1',
        type: ['jpg', 'png', 'jpeg',]
      },
      loading: false,
      // https://github.com/xyxiao001/vue-cropper 
      option: {
        img: '',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true, //上传图片是否可以移动
        fixedBox: false,
        original: false,
        canMoveBox: true, //截图框能否拖动
        autoCrop: true, //是否默认生成截图框
        enlarge: 2.5,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 200,
        autoCropHeight: 200,
        centerBox: true, //截图框是否被限制在图片里面
        high: true //是否按照设备的dpr 输出等比例图片
      },
      fixed: true, //是否开启截图框宽高固定比例
      fixedNumber: [1, 1], //截图框的宽高比例
      cropperSliderSize: 1, //滑块
      fileInfo: {}, //暂存文件名字
      editAvatarVisible: false,//编辑头像
      userInfo: this.$local.fetch('userInfo'),
      form: {
        nickName: '',
        id: '',
        email: '',
        avatarUrl: '',
      },
      updatePassVisibled: false,
      updatePassForm: {
        confirmNewPassword: '',// 确认新密码,
        id: '',// id,
        newPassword: '',// 新密码,
        oldPassword: '',// 用户原始密码
      }
    }
  },

  computed: {
  },
  mounted() {
    this.employeeInfo()
  },
  watch: {
    visible(val) {
      if (val) {
        this.userInfo = this.$local.fetch('userInfo'),
          this.form.nickName = this.userInfo.nickName
        this.form.id = this.userInfo.employeeId
        this.form.email = this.userInfo.email
        this.form.avatarUrl = this.userInfo.avatarUrl
        this.option.img = this.userInfo.avatarUrl
      }
    }
  },
  methods: {
    updatePass() {

    },
    employeeInfo() {
      let userInfo = this.$local.fetch('userInfo') || {}
      if (!userInfo.userId) return
      this.$api.bizSystemService.getEmployeeInfo(userInfo.employeeId)
        .then(res => {
          let data = res.data || {}
          userInfo.avatarUrl = data.avatarUrl
          userInfo.nickName = data.nickName
          userInfo.email = data.email
          this.$local.save('userInfo', userInfo)
          this.$store.commit('setUserInfo', userInfo)
        })
    },
    // sliderSizeChange(val) {
    //   let num = val > 0 ? 1 : -1
    //   this.$refs.cropper.changeScale(num)
    // },
    // 获取图片并且上传
    getCropBlob() {
      this.$refs.cropper.getCropBlob((data) => {
        data.name = this.fileInfo.name
        // 调用upload-file组件的阿里云上传
        const activeUpload = this.$refs.activeUpload
        activeUpload.doUpload(data)
      })
    },
    // 上传成功后返回的图片地址
    uploadSuccess(obj) {
      this.form.avatarUrl = obj.url
      this.editAvatarVisible = false
    },
    // 上传图片操作
    handleCrop(file) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      this.fileInfo = file
      // 点击弹出剪裁框
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw)
        this.editAvatarVisible = true;
      })
    },
    // 保存密码
    savePass() {
      this.updatePassForm.id = this.userInfo.employeeId
      this.$refs.updatePassForm.validate(valid => {
        if (valid) {
          this.$api.bizSystemService.updatePassword(this.updatePassForm)
            .then(res => {
              this.updatePassVisibled = false
            })
        }
      })
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.bizSystemService.rmemployeeUpdateAvatar(this.form)
            .then(res => {
              this.userInfo.nickName = this.form.nickName
              this.userInfo.email = this.form.email || ''
              this.userInfo.avatarUrl = this.form.avatarUrl || ''
              this.$local.save('userInfo', this.userInfo);
              this.$store.commit('setUserInfo', this.userInfo)
              this.close()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  width: 200px;
  height: 200px;
  position: relative;
  .avatar-hover {
    opacity: 0;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &:hover .avatar-hover {
    opacity: 1;
  }
}
</style>