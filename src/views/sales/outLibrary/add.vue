/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 19:47:43
 * @Description: 编辑出库单
*/
<template>
  <el-dialog
    :title="type=='add'?'生成销售出库单':`编辑:${code}`"
    :visible.sync="showPop"
    width="920px"
    v-dialogDrag
  >
    <div v-loading="loading">
      <el-form
        :mode="addForm"
        rel="form"
        size="size"
        label-position="top"
      >
        <!-- 客户信息 -->
        <customerInfo :data="detailInfo" />
        <!-- 公司信息 -->
        <companyInfo :data="detailInfo" />
        <!-- 报价单信息 -->
        <quotationInfo :data="detailInfo">
          <el-tabs
            slot="tabs"
            v-model="activeName"
          >
            <el-tab-pane
              v-for="(item,index) of 11"
              :key="index"
              :label="`报价单${index}`"
              :name="index+''"
            ></el-tab-pane>
          </el-tabs>
          <div slot="body">
            <!-- 发货信息 -->
            <deliverInfo />
            <!-- 商品信息 -->
            <buying-goods-edit />
            <!-- 报价有效期 -->
            <payExpire />
            <!-- 附加发票 -->
            <extrataxInfo />
            <!-- 自定义信息 -->
            <customInfo />
            <!-- 备注信息 -->
            <extraInfo />
          </div>
        </quotationInfo>

        <!-- 收款滞纳金 -->
        <paymentLate ref="paymentLate" />
        <!-- 账期信息 -->
        <billInfo ref="billInfo" />
        <!-- 自定义信息 -->
        <customInfo />
        <!-- 备注信息 -->
        <extraInfo />
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
  props: ['visible', 'rowData', 'code', 'type'],
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
