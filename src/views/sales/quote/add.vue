<!--
 /**
  * @desc 加盟项目-新增编辑
  * @author web-徐非凡
  * @date 2019年05月27日
-->
<template>
  <el-form
    label-width="160px"
    v-loading="loading"
    :model="addForm"
    ref="addForm"
    size="small"
    label-position="top"
  >
    <div style="height:calc(100vh - 150px)" class="d-auto-y pr20 d-relative">
      <!-- 新增 / 编辑 -->
      <form-card title="主要信息">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-form-item
                label="标题"
                prop="title"
                :rules="[{required: false, message: '请输入标题'},{min: 1, max: 25, message: '不能超过25个字符' }]"
              >
                <el-input
                  v-model.trim="addForm.title"
                  placeholder="请输入标题"
                  :maxlength="32"
                  class="wfull"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="城市" prop="cityId" :rules="[{required: true, message: '请选择城市'}]">
                <el-select
                  filterable
                  v-model="addForm.cityId"
                  size="small"
                  placeholder="请选择城市"
                  class="wfull"
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="(item,index) in citys()"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div :class='["grid-content bg-purple",{"h180":addForm.mainPic}]'>
              <el-form-item label="主图" prop="mainPic" :rules="[{required: true, message: '请上传主图'}]">
                <upload-file
                  :limit="obj"
                  v-model="addForm.mainPic"
                  listType="picture"
                  v-show="!addForm.mainPic"
                >
                  <el-button size="small" icon="el-icon-upload2">上传图片</el-button>
                </upload-file>
                <div
                  class="invitation-picUrl"
                  style="width:220px; height: 124px;"
                  v-show="addForm.mainPic"
                >
                  <i class="el-icon-delete delete" @click="addForm.mainPic = ''"></i>
                  <el-image class="wfull hfull" fit="cover" :src="addForm.mainPic"></el-image>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="内容描述">
        <quillEditor ref="myTextEditor" :value="addForm.content" @input="QuillEditor" class="pb20"></quillEditor>
      </form-card>
    </div>
    <div class="ac pt20">
      <el-button type="primary" @click="saveHandle('addForm')" size="small">保 存</el-button>
      <el-button @click="dialogMeta.visible = false" size="small">取 消</el-button>
    </div>
  </el-form>
</template>
<script>
import quillEditor from '@/components/quill-editor'
import uploadFile from '@/components/upload-file'
export default {
  props: ['dialogMeta'],
  components: {
    quillEditor,
    uploadFile
  },
  data() {
    return {
      loading: false,
      dataSource: [], // 数据源
      // 新增orEdit框内容
      addForm: {
        title: '', // 标题
        cityName: '', // 城市
        cityId: this.$local.fetch('cityInfo').id, // 城市
        id: '', // 主键id
        mainPic: '', // 主图
        content: '' // 内容
      },
      imgfile: '', // 图片数组
      obj: {
        size: '5',
        type: ['jpg', 'jpeg', 'png', 'gif']
      }
    }
  },
  created() {
    this.initCompanyAdd()
  },
  methods: {
    // 编辑和新增
    initCompanyAdd() {
      if (this.dialogMeta.type === 'add') {
        // 清空form表单
        this.$nextTick(() => {
          this.$refs.addForm.resetFields()
          this.addForm.id = ''
        })
      } else {
        const data = this.dialogMeta.data
        for (const key in this.addForm) {
          this.addForm[key] = data[key]
        }
        this.addForm.start_date = [
          new Date(data.startTime),
          new Date(data.endTime)
        ]
      }
    },
    // 保存表单数据
    saveHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const [currCity] = this.citys().filter(
            item => item.id === this.addForm.cityId
          )
          this.addForm.cityName = currCity.name
          this.loading = true
          delete this.addForm.start_date
          // rules 表单验证是否通过
          let api = 'collegeManagerUpdate' // 默认编辑更新
          // 新增保存
          if (this.dialogMeta.type === 'add') {
            api = 'collegeManagerSave'
            // 编辑保存
          }
          this.$api.seePumaidongService[api](this.addForm)
            .then(res => {
              this.dialogMeta.visible = false
              this.$emit('submit', 'success')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    changeTime(time) {
      this.addForm.startTime = time[0]
      this.addForm.endTime = time[1]
    },
    QuillEditor(val) {
      this.addForm.content = val
    }
  }
}
</script>
<style lang="scss" scoped>
.invitation-picUrl {
  position: relative;
  border: 1px solid #efefef;
  .delete {
    position: absolute;
    cursor: pointer;
    z-index: 2;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    right: 0;
    top: 0;
  }
}
</style>
