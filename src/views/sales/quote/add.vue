/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 17:49:33
 * @Description: file content
*/
<template>
  <div v-loading="loading">
    <p class="ar">
      <el-button
        @click="steps++"
        type="primary"
        :disabled="steps==4"
        size="small"
      >下一步</el-button>
    </p>
    <d-step
      v-model="steps"
      :data="['选择客户','选择产品','确定配置信息','填写报价信息']"
    ></d-step>
    <!-- 选择客户 -->
    <select-customer v-show="steps==1"></select-customer>
    <select-product v-show="steps==2"></select-product>
    <confirm-info v-show="steps==3"></confirm-info>
    <!-- 确定按钮 -->
    <div class="ac pt20">
      <el-button
        type="primary"
        @click="saveHandle('addForm')"
        size="small"
      >保存</el-button>
      <el-button
        @click="$emit('update:visible', false)"
        size="small"
      >取消</el-button>
    </div>
  </div>
</template>
<script>
import selectCustomer from './add/select-customer'
import selectProduct from './add/select-product'
import confirmInfo from './add/confirm-info'
export default {
  props: ['dialogData', 'visible'],
  components: {
    selectCustomer,
    selectProduct,
    confirmInfo
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
    // this.initCompanyAdd()
  },
  mounted() {
    // this.currStep()
  },
  methods: {
    // 点击步骤条触发
    currStep() {
      let stepsBox = this.$refs.stepsBox.$el
      let that = this
      stepsBox.addEventListener('click', function (e) {
        let steps = this.querySelectorAll('.el-step__icon-inner ')

        let currStep = e.target
        let className = currStep.className
        if (className === 'el-step__icon-inner') {
          if (+currStep.innerText > that.steps) {
            console.log(1);

          }
          that.steps = +currStep.innerText

        }
      }, false)
    },
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
