/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-08 09:03:19
 * @Description: 确定配置信息
*/
<template>
  <div v-loading="loading">
    <quotationInfo
      v-for="(item,index) of data.KIND1Data"
      :key="index"
      :title="item.name"
    >
      <div slot="body">
        这是个表单数据
      </div>
    </quotationInfo>
    <quotationInfo
      v-for="(item,index) of data.KIND2Data"
      :key="index"
      :title="item.name"
    >
      <el-button
        slot="title"
        type="primary"
        size="mini"
      >不选择此配置</el-button>
      <div slot="body">
        这是个表单数据
      </div>
    </quotationInfo>
  </div>
</template>
<script>
import quotationInfo from '@/components/formComponents/quotation-info'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    quotationInfo
  },
  data() {
    return {
      loading: false,
      // 当前操作步骤
      clientno: '',
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
    editClick() {

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
