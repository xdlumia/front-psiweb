/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 14:59:08
 * @Description: file content
*/
<template>
  <el-dialog
    title="新建报价单"
    :visible.sync="showPop"
    width="920px"
    v-dialogDrag
  >
    <div v-loading="loading">
      <d-step
        v-model="steps"
        @input="stepsClick"
        :data="['选择客户','选择产品','确定配置信息','填写报价信息']"
      ></d-step>
      <el-form
        size="small"
        :model="addForm"
        class="d-auto-y"
        style="height:calc(100vh - 220px)"
      >
        <!-- 选择客户 -->
        <select-customer v-show="steps==1"></select-customer>
        <select-product v-show="steps==2"></select-product>
        <confirm-info v-show="steps==3"></confirm-info>
        <quote-info v-show="steps==4"></quote-info>
      </el-form>
      <!-- 确定按钮 -->
      <div class="ac pt20">

        <el-button
          @click="$emit('update:visible', false)"
          size="small"
        >取 消</el-button>
        <el-button
          @click="steps++"
          type="primary"
          v-if="steps < 4"
          size="small"
        >下一步</el-button>
        <el-button
          v-else
          type="primary"
          @click="saveHandle('addForm')"
          size="small"
        >保 存</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import selectCustomer from './add/select-customer'
import selectProduct from './add/select-product'
import confirmInfo from './add/confirm-info'
import quoteInfo from './add/quote-info'
export default {
  props: ['visible', 'type'],
  components: {
    selectCustomer,
    selectProduct,
    confirmInfo,
    quoteInfo,
  },
  data() {
    return {
      loading: false,
      currCompont: 'clientInfo',
      // 当前操作步骤
      steps: 1,
      clientno: '',
      activeName: 'first', // 数据源
      // 新增orEdit框内容
      addForm: {
        title: '', // 标题
        cityName: '', // 城市
        cityId: this.$local.fetch('cityInfo').id, // 城市
        id: '', // 主键id
        mainPic: '', // 主图
        content: '' // 内容
      },
    }
  },
  created() {

  },
  mounted() {
    // this.initForm()
  },
  computed: {
    showPop: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', false)
      }
    }
  },
  methods: {
    // 初始化表单
    initForm() {
      if (this.type === 'edit' || this.type === 'copy') {
        this.steps = 4
        const data = this.data
        for (const key in this.addForm) {
          this.addForm[key] = data[key]
        }

      } else if (this.type === 'add') {
        // 清空form表单
        this.$nextTick(() => {
          this.$refs.addForm.resetFields()
          this.addForm.id = ''
        })

      }
    },
    // 步骤点击
    stepsClick(index) {
      if (this.type != 'add') {
        this.$message.error({
          showClose: true,
          message: '编辑和复制的时候只能操作当前步骤'
        })
        this.steps = 4
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
          if (this.type === 'add') {
            api = 'collegeManagerSave'
            // 编辑保存
          }
          this.$api.seePumaidongService[api](this.addForm)
            .then(res => {
              this.visible = false
              this.$emit('submit', 'success')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
