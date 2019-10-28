<!--辅助管理:合同模板
/**
* 财务组件：模板管理
* @/components/finance/index.vue 组件存放位置
* @author web-王晓冬
* @date 2018年8月6日
**/
-->
<template>
    <div>
        <el-form ref="saveTemplateForm" :model="templateForm" size="small" label-width="80px">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item
                        label="模板名称"
                        prop="name"
                        :rules="[
                    { required: true, message: '请输入模板名称', trigger: 'blur' },
                    { max: 20, min:2,message:'2-20个字符' }
                ]"
                    >
                        <el-input v-model="templateForm.name" placeholder="请输入模板名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="模板描述">
                        <el-input
                            v-model="templateForm.description"
                            type="textarea"
                            placeholder="请输入模板描述"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item
                        label="模板分类"
                        prop="templateCategoryId"
                        :rules="[
                    { required: true, message: '请选择模板', trigger: 'blur' },
                ]"
                    >
                        <el-select
                            class="wfull"
                            v-model="templateForm.templateCategoryId"
                            placeholder="请选择模板分类"
                        >
                            <el-option
                                :label="item.name"
                                :value="item.id"
                                v-for="(item,index) of contractClass"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="关联表单">
                        <el-col :span="12" style="padding-left:0;padding-right:5px;">
                            <el-select
                                v-model="templateForm.formType"
                                placeholder="请选择类型"
                                @change="changeForm"
                            >
                                <el-option
                                    :label="item.content"
                                    :value="item.code"
                                    v-for="(item,index) of dictionaryOptions('BD_CATEGORY')"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12" style="padding-left:5px;padding-right:0;">
                            <el-select v-model="templateForm.formId" placeholder="请选择合同类型">
                                <el-option
                                    :label="item.name"
                                    :value="item.id"
                                    v-for="(item,index) of formList"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
  props: ['contractClass', 'templateForm'],
  components: {
  },
  data () {
    return {
      formList: []
    }
  },
  // created
  // mounted
  // activited
  // update
  // beforeRouteUpdate
  // metods
  methods: {
    changeForm (val) {
      this.templateForm.formId = '' // 清空类型
      this.$api.seeContractService.getFormList(val)
        .then(res => {
          if (res.code == 200) {//eslint-disable-line
            this.formList = res.data || []
          }
        })
    }
  }
  // filter
  // computed

}
</script>
<style scoped  style="scss">
</style>
