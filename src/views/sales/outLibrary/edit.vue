/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 19:05:46
 * @Description: 编辑出库单
*/
<template>
  <el-dialog
    title="编辑出库单"
    :visible.sync="showPop"
    width="920px"
    v-dialogDrag
  >
    <div v-loading="loading">
      <el-form
        :mode="form"
        rel="form"
        label-position="top"
      >
        <!-- 报价信息组件 -->
        <quote-info></quote-info>
        <!-- 确定按钮 -->
        <div class="ac pt20">
          <el-button
            type="primary"
            @click="saveHandle('form')"
            size="small"
          >保存</el-button>
          <el-button
            @click="$emit('update:visible', false)"
            size="small"
          >取消</el-button>
        </div>
      </el-form>

    </div>
  </el-dialog>
</template>
<script>
// 填写报价信息
import quoteInfo from '@/views/sales/quote/add/quote-info.vue'
export default {
  props: ['visible', 'rowData', 'type'],
  components: {
    quoteInfo
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
      form: {
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
    // this.init()
  },
  mounted() {

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
    // 编辑和新增
    init() {
      const data = this.dialogMeta.data
      for (const key in this.form) {
        this.form[key] = data[key]
      }

    },
    // 保存表单数据
    saveHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const [currCity] = this.citys().filter(
            item => item.id === this.form.cityId
          )
          this.form.cityName = currCity.name
          this.loading = true
          delete this.form.start_date
          // rules 表单验证是否通过
          let api = 'collegeManagerUpdate' // 默认编辑更新
          // 新增保存
          if (this.dialogMeta.type === 'add') {
            api = 'collegeManagerSave'
            // 编辑保存
          }
          this.$api.seePumaidongService[api](this.form)
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
