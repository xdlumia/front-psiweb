<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-20 18:31:31
 * @Description: 新增费用单
 -->
<template>
  <div class>
    <el-dialog
      v-loading="loading"
      :visible.sync="visible"
      v-dialogDrag
      :show-close="false"
      width="1000px"
      title="新增费用单"
    >
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">新增费用单</h3>
        <div>
          <el-button type="primary" size="mini" @click="fcostSave">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form ref="costSheetForm" size="mini" :model="costSheetForm"
:rules="costSheetFormRule">
        <d-tabs :style="{maxHeight: maxHeight + 'px'}">
          <d-tab-pane label="基本信息" name="receiptsInfo"></d-tab-pane>
          <d-tab-pane label="费用信息" name="goodsInfo"></d-tab-pane>
        </d-tabs>
        <receiptsInfo :data.sync="costSheetForm" id="receiptsInfo"></receiptsInfo>
        <costInfo :data.sync="costSheetForm" id="goodsInfo"></costInfo>
        <extras-info :data.sync="costSheetForm" id="extrasInfo" />
      </el-form>
      <!-- <add-facilitator ref="addFacilitator" :editId="editId" v-if="visible" @refresh="refresh"></add-facilitator> -->
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import receiptsInfo from './components/receipts-info'
import costInfo from './components/cost-info'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      costSheetForm: {
        id: '',
        amount: '',
        chargeDate: '',
        clientId: '',
        clientName: '',
        clientType: '',
        costType: '',
        feeDetailCode: '',
        feeTypeCode: '',
        note: '', //
        companySettlementId: '',
        companySettlementInfo: '',
        companyCode: '', //
        bankAccount: '',
        phone: ''
      },
      costSheetFormRule: {
        amount: { required: true, message: '请输入', trigger: 'blur' },
        bankAccount: { required: true, message: '请输入', trigger: 'blur' },
        chargeDate: { required: true, message: '请输入', trigger: 'change' },
        clientId: { required: true, message: '请输入', trigger: 'change' },
        costType: { required: true, message: '请输入', trigger: 'change' },
        feeDetailCode: { required: true, message: '请输入', trigger: 'change' },
        feeTypeCode: { required: true, message: '请输入', trigger: 'change' },
        companySettlementId: { required: true, message: '请输入', trigger: 'change' }
      },
      loading: false
    }
  },
  components: {
    receiptsInfo,
    costInfo
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  mounted() {
    this.costSheetForm = Object.assign(this.costSheetForm, this.detailForm)
  },
  methods: {
    fcostSave() {
      this.$refs.costSheetForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.costSheetForm.id ? 'fcostUpdate' : 'fcostSave'
          this.$api.seePsiFinanceService[method](this.costSheetForm).then(res => {
            this.$emit('refresh')
            this.$emit('update:visible', false)
          }).finally(() => { this.loading = false })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
