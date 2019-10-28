<!-- /**
      * 类目管理",
      * @author web-吴森",
      * @description 表单管理,
      * @date 2018年10月10日",
      **/
      -->
<template>
   <div  class="d-content" v-loading="loading" >
    <el-row class="bb  pb10">
        <el-col :span="12">
          <h3>表单管理</h3>
        </el-col>
    </el-row>
    <div class="pb10">
      <div v-for="(formValue,formKey,index) of formList" :key="index">
        <h4 class="d-text-gray">
            <span >{{formName[formKey]}}</span>
            ({{formValue==null?'0':formValue.length}})
        </h4>
        <el-row class="pt10 pr35" :gutter="30">
          <el-col :span="24" v-show="!formValue|| !formValue.length" style="color:#999">
            此模块暂无数据
          </el-col>
          <el-col class="mb10" :sm="12" :md="8" :lg="6" :xl="4" v-for="(subItem, i) of formValue" :key="i">
            <div>
              <el-card class="template-card" body-style="padding:10px;">
                <div style="height:87px;">
                  <el-row style="height:28px;">
                    <el-col :span="19" class="d-elip">
                      <strong class="d-inlineblock mr5 d-text-qgray">{{i+1}}</strong>
                      <span :title="subItem.name" >{{subItem.name}}</span>
                    </el-col>
                    <el-col :span="5" class="ar">
                      <el-tag size="mini" type="info" >内置</el-tag>
                      <!-- v-if="subItem.isBuiltIn==0"  -->
                    </el-col>
                  </el-row>
                  <div class="fr" style="margin-top:30px;" >
                    <el-button size="small" @click="formFieldConfig(subItem.id)" >
                      字段配置
                    </el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 侧边栏 -->
    <side-popup :modal="true" :visible.sync='dialog.formVisible' title='表单字段配置' width='800px'>
        <div v-loading="loadingSide" style="margin-right:5px;" >
              <div style="height:32px;" class="d-text-gray">内置字段（不可修改）
              </div>
              <el-row :gutter="10">
                <el-col
                :span="8"
                v-for="(item,index) of beginFieldsList"
                :key="index"
                class="mt5 d-pointer" >
                  <li class="module-item"
                   >
                  {{item.fieldName}}
                  <i class="fr el-icon-share" style="height: 28px; line-height: 28px;"></i>
                  </li>
                </el-col>
              </el-row>
               <div style="height:32px;" class="d-text-gray mt20">
                <span> 自定义字段 </span>
                 <span v-if="editDefineField" class="fr el-icon-edit" @click="editToDeleteField"></span>
                 <span v-else class="fr el-icon-check" @click="editToDeleteField" ></span>
              </div>
              <el-row :gutter="10">
                <el-col
                :span="8"
                v-for="(item,index) of customFieldsList"
                :key="index"
                class="mt5 d-pointer" >
                  <li class="module-item d-relative"
                   >
                  {{item.fieldName}}
                  <i class="el-icon-error d-text-red d-absoutle-error" v-if="!editDefineField" @click="deleteField(item.id)" > </i>
                  <i class="fr el-icon-share" style="height: 28px; line-height: 28px;"></i>
                  </li>
                </el-col>
                <el-popover
                placement="bottom"
                width="160"
                v-model="popVisible"
                >
                <div class="p5 d-text-gray" >
                  <div class="pl5 pb5">文本</div>
                  <el-input size="mini" placeholder="请输入" maxLength="16" v-model.trim="fieldName" ></el-input>
                  <div class="pl5 pb5 pt10">类型</div>
                  <el-select size="mini"  disabled value="文本" >
                    <option value="文本" selected  ></option>
                  </el-select>
                  <div class="ac pt10" >
                    <el-button size="mini" type="primary" @click="addField" >
                      确定
                    </el-button>
                  </div>
                </div>
                <div slot="reference">
                  <el-col
                    :span="8"
                    class="mt5 d-pointer d-relative" >
                      <li class="module-item ac"
                      >
                      <span class="el-icon-plus"></span>
                      </li>
                    </el-col>
                </div>
              </el-popover>

              </el-row>
        </div>
    </side-popup>

   </div>
</template>
<script>
/* eslint-disable eqeqeq */
export default {
  data () {
    return {
      loading: false,
      loadingSide: false,
      formList: {}, // 委托合同模板
      formName: {
        contractFormList: '合同',
        emergencyNoticeFormList: '紧急通知',
        financeFormList: '财务',
        noticeFormList: '通知',
        remindFormList: '合同提醒'
      },
      dialog: {
        formVisible: false
      },
      formId: '', // formId
      beginFieldsList: [], // 内置字段
      customFieldsList: [], // 自定义字段
      popVisible: false,
      fieldName: '',
      editDefineField: true
    }
  },
  components: {
  },
  computed: {

  },
  created () {
    // 初始化模板列表
    let arr = []//eslint-disable-line
    this.navData = JSON.parse(localStorage.getItem('navData')) || []
    this.getList() // 获取列表数据
  },
  watch: {
  },
  methods: {
    getList () {
      this.loading = true
      this.$api.seeContractService.getCatagoryCodeForm()
        .then((res) => {
          this.formList = res.data || {}
        }).finally(() => {
          this.loading = false
        })
    },
    // 字段配置
    formFieldConfig (formId) {
      this.formId = formId
      // 显示右侧浮层
      this.dialog.formVisible = true
      this.loadingSide = true // 显示右侧浮层loading
      this.$api.seeContractService.queryFormFields({formId: formId})
        .then((res) => {
          this.beginFieldsList = res.data.beginFieldsList // 内置字段
          this.customFieldsList = res.data.customFieldsList // 自定义字段
        })
        .finally(() => {
          this.loadingSide = false // 关闭右侧浮层loading
        })
    },
    addField () {
      if (!this.fieldName) {
        this.$message({
          message: '请输入文本内容！',
          type: 'warning'
        })
        return false
      }
      this.popVisible = false
      let params = {
        fieldName: this.fieldName,
        fieldsType: 1, //  0内置，1自定义
        formId: this.formId
      }
      this.$api.seeContractService.insertFormFields(params)
        .then((res) => {
          this.formFieldConfig(this.formId)
          this.fieldName = '' // 置空字段
        })
    },
    deleteField (fieldsId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seeContractService.deleteFormFields({fieldsId: fieldsId})
          .then((res) => {
            this.formFieldConfig(this.formId)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editToDeleteField () {
      this.editDefineField = !this.editDefineField
    }

  }
}
</script>

<style scoped style="scss">
.module-item{ border:1px dashed #ccc; padding:5px 20px; line-height:28px; box-sizing: border-box; }
.d-absoutle-error{position:absolute; top:0px;right:0px;}
</style>
