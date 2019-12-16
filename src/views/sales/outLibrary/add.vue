/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-16 15:20:24
 * @Description: 生成销售出库单出库单
*/
<template>
  <el-dialog
    :visible.sync="showEditPage"
    width="920px"
    @close="close"
    v-dialogDrag
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{type=='edit'?`编辑:${code}`:'生成销售出库单'}}</span>
      <div class="fr mr30">
        <el-button
          type="primary"
          @click="saveHandle('form')"
          size="mini"
        >保存</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取消</el-button>
      </div>
    </div>
    <el-form
      v-if="visible"
      ref="form"
      size="small"
      :model="form"
      label-position="top"
    >
      <d-tabs :style="{maxHeight:'calc(100vh - 110px)'}">
        <d-tab-pane
          v-for="(val,key) of tabs"
          :key="key"
          :label="val"
          :name="key"
        />
        <!-- 人员分配 -->
        <choose-assembly
          :hide="['note','assemblePerson']"
          id="choose-assembly"
          :data="form"
        />
        <!-- 客户信息 -->
        <customerInfo
          id="customerInfo"
          disabled
          :data="form"
        />
        <!-- 公司信息 -->
        <companyInfo
          disabled
          id="companyInfo"
          :data="form"
        />
        <!-- 报价单信息 -->
        <!-- <quote-info
          v-if="quoteCodes && quoteCodes.length"
          :options="quoteCodes"
        /> -->
        <!-- 收款滞纳金 -->
        <payment-late-sales
          id="paymentLateSales"
          :data="form"
        />
        <!-- 账期信息 -->
        <billInfo
          id="billInfo"
          :data="form"
        />
        <!-- 自定义信息 -->
        <customInfo
          busType="16"
          id="customInfo"
          :data="form"
        />
        <!-- 备注信息 -->
        <extrasInfo
          id="extrasInfo"
          :data="form"
        />
      </d-tabs>
    </el-form>
  </el-dialog>
</template>
<script>
// 填写报价信息
import quoteInfo from './quote-info';
import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
    quoteInfo
  },
  data() {
    return {
      loading: false,
      // tab操作栏
      tabs: {
        customerInfo: '客户信息',
        companyInfo: '公司信息',
        quoteInfo: '报价单信息',
        billInfo: '账期信息',
        customInfo: '自定义信息',
        extrasInfo: '备注信息',
      },
      // 新增orEdit框内容
      form: {
        id: '',
        pickingPerson: '', //拣货人
        companyAccountId: '',
        companySettlementId: '',
        apprpvalNode: '', // 审核节点,
        attachList: [], // 附件",
        clientId: '', // 100000,
        contractTemplate: '', // 9,
        fieldList: [], // 自定义字段",
        isContract: '', // 有无合同,
        lateFeesInfo: '', // 收款滞纳金id
        note: '', // 备注",
        paymentTypeCode: '',// 账单类型
        procurementExpectedArrivalTime: '', // 采购预计到货时间
        quotationIds: [], // 报价单ids
        salesExpectedShipmentsTime: '', // 销售预计发货时间
        salesRequireArrivalTime: '', // 销售要求到货时间,
        shipmentFinanceSaveVoList: [ //账期集合
          {
            busCode: '', // 业务编号",
            busType: '', // 9,
            feeDetailCode: 'ZD_DY_LX-1-1', // 费用明细",
            feeTypeCode: 'ZD_DY_LX-1', // 费用类型",
            isBillFee: 1, // 是否直接生成应收付,
            payAmount: 0, // 付款金额
            payTime: new Date().getTime(), // 付款时间
            paymenDays: '第1期', // 账期",
            paymentType: '', // 9
          }
        ],
        totalAmount: '', // 销售单总金额
        totalCostAmount: '', //销售参考价总金额
        totalNumber: '', //销售单总数量
        employeeName: '',
        employeeAssembleName: ''
      },
    }
  },
  created() {
    this.init()
  },
  mounted() {

  },
  computed: {
    // 客户 账单信息 

    quoteCodes() {
      let quotationCodes = null
      // 如果是编辑 详情数据里会带多个quotationCodes
      if (this.type == 'edit') {
        console.log(this.form)
        quotationCodes = this.form.quotationCodes
      }
      // 如果是合并 那操作的是出库单的数据 rowData 一定是多个数据.
      else if (this.type == 'merge') {
        quotationCodes = this.rowData.map(item => item.quotationCode)
      }
      //  如果是新增 那操作的是出库单的数据 是一条数据
      else if (this.type == 'add') {
        quotationCodes = [this.rowData].map(item => item.quotationCode)
      }
      return quotationCodes
    },
  },
  watch: {
    visible(val) {
    }
  },
  methods: {
    init() {
      if (this.type == 'merge') {
        let row = this.rowData[0]
        this.form.companyAccountId = row.companyAccountId
        this.form.companySettlementId = row.companySettlementId
        this.form.clientId = row.clientId // 100000,
        let ids = this.rowData.map(item => item.id)
        this.salesshipmentGetAddShipemtAmount(ids)
      } else {
        this.form.companyAccountId = this.rowData.companyAccountId
        this.form.companySettlementId = this.rowData.companySettlementId
        this.form.clientId = this.rowData.clientId // 100000,
        let ids = [this.rowData].map(item => item.id)
        if (this.type == 'add') {
          this.salesshipmentGetAddShipemtAmount(ids)
        }
      }
    },
    // 根据报价单id，计算获取销售出库单金额数据
    salesshipmentGetAddShipemtAmount(ids) {
      this.$api.seePsiSaleService.salesshipmentGetAddShipemtAmount({ quotationIds: ids })
        .then(res => {
          let data = res.data || {}
          this.form.totalAmount = data.totalAmount || 0
          this.form.totalCostAmount = data.totalCostAmount || 0
          this.form.totalNumber = data.totalNumber || 0
          this.form.shipmentFinanceSaveVoList[0].payAmount = this.form.totalAmount
        })
    },
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiSaleService.salesshipmentGetInfoByCode({ shipmentCode: this.code })
        return data;
      }
    },

    // 保存表单数据
    async saveHandle() {
      await this.$showFormError(this.$refs.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          // 最大不能超过销售单总金额
          const values = this.form.shipmentFinanceSaveVoList.map(item => Number(item.payAmount || 0));
          let tatal = +Number(values.reduce((sum, curr) => {
            const val = Number(curr)
            return sum + curr
          }, 0)).toFixed(2)
          if (tatal != this.form.totalAmount) {
            this.$message({
              message: '所有账期的付款金额不能大于或小于总价',
              type: 'error',
              showClose: true,
            });
            return
          }

          this.loading = true
          if (this.type == 'merge') {
            this.form.quotationIds = this.rowData.map(item => item.id)
          } else if (this.type == 'add') {
            this.form.quotationIds = [this.rowData].map(item => item.id)
          }
          // rules 表单验证是否通过
          let api = 'salesshipmentUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add' || this.type === 'merge') {
            api = 'salesshipmentSave'
            // 编辑保存
          }
          this.form.shipmentFinanceSaveVoList = this.form.shipmentFinanceSaveVoList.map(item => {
            item.feeDetailCode = 'ZD_DY_LX-1-1' // 销售出库费 费用明细",
            item.feeTypeCode = 'ZD_DY_LX-1' // 销售费 费用类型",
            return item
          })

          this.$api.seePsiSaleService[api](this.form)
            .then(res => {
              this.$emit('reload')
              this.close()
              this.setEdit()
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
