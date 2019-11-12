/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-12 15:13:49
 * @Description: file content
*/
<template>
  <el-dialog
    :title="type=='add'?'新建报价单':`编辑:${code}`"
    :visible.sync="showDetailPage"
    width="920px"
    @close="close"
    v-dialogDrag
  >
    <div v-loading="loading">
      <d-step
        v-model="steps"
        @input="stepsClick"
        :data="['选择客户','选择产品','确定配置信息','填写报价信息']"
      ></d-step>
      <el-form
        v-if="visible"
        ref="form"
        size="small"
        :model="form"
        class="d-auto-y"
        style="height:calc(100vh - 220px)"
      >
        <!--  选择客户 和 填写报价信息  有相同的操作.两边数据要实时更新 所以使用 v-if 切换到当前的页面重新查询数据 -->
        <!-- 选择客户  -->
        <select-customer
          :data="form"
          v-show="steps==1"
        />

        <!-- 选择产品 -->
        <select-product
          :data="form"
          v-if="steps==2"
        />

        <!-- 确定配置信息 -->
        <confirm-info
          :data="form"
          v-if="steps==3"
        />

        <!-- 填写报价信息 -->
        <quote-info
          :data="form"
          v-show="steps==4"
        />
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
          @click="saveHandle('form')"
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
import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
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
      // 新增orEdit框内容
      form: {
        KIND1Data: [], //临时存放第二步整机列表选中的数据
        KIND2Data: [], //临时存放第二步配件列表选中的数据
        id: {},
        apprpvalState: '', //审核状态
        attachList: '', //附件,
        companyAccountId: '', //公司发票信息
        companySettlementId: '', //公司结算账户
        businessCommoditySaveVoList: [ //商品信息合集
          {
            alterationNumber: '', //9,
            alterationPrice: '', //98765432109876.12,
            apportionmentAmount: '', //98765432109876.12,
            busCode: '', //业务编号,
            busType: '', //9,
            commodityCode: '', //商品编号,
            commodityNumber: '', //9,
            costAmount: '', //98765432109876.12,
            discount: '', //98765432109876.12,
            discountSprice: '', //98765432109876.12,
            isAssembly: '', //9,
            isDirect: '', //9,
            isTeardown: '', //9,
            note: '', //备注,
            parentCommodityCode: '', //100000,
            pickingNumber: '', //9,
            preTaxAmount: '', //98765432109876.12,
            putawayType: '', //9,
            reference: '', //98765432109876.12,
            salesPrice: '', //98765432109876.12,
            shipmentsNumber: '', //9,
            snCode: '', //SN码,
            taxPrice: '', //98765432109876.12,
            taxTotalAmount: '', //98765432109876.12
          }
        ],
        clientId: '', //客户id
        clientLinkman: '', //客户联系人,
        clientPhone: '', //客户联系电话,
        clientReceivingAddress: '', //客户收货地址,=
        deptTotalCode: '', //部门code,
        failureTime: '', // 报价单有效期,
        fieldList: '', //自定义字段,
        note: '', //备注,
        preTaxAmount: '', //含税总价.12,
        procurementExpectedArrivalTime: '', //采购预计到货时间
        quotationCode: '', //报价单编号,
        salesExpectedShipmentsTime: '', //销售预计发货时间,
        salesRequireArrivalTime: '', //销售要求到货时间,
        shipmentCode: '', //出库单编号,
        source: '', //来源,
        state: '', //9,
        taxAmount: '', //税后金额,
        taxRate: '', //税率
        totalNumber: '', //总计数量,
        totalSalesAmount: '', //总计销售价
      }
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
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {

    // 步骤点击
    stepsClick(index) {
      // 点击第二步的时候判断有没有选择客户
      // if (index == 2 && !this.form.clientId) {
      //   this.$message.error({
      //     showClose: true,
      //     message: '请先选择客户'
      //   })
      //   this.steps = 1
      //   return
      // }
      if (this.type != 'add') {
        this.$message.error({
          showClose: true,
          message: '编辑和复制的时候只能操作当前步骤'
        })
        this.steps = 4
      }
    },
    // 保存表单数据
    saveHandle() {

      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          let params = Object.assign(this.form, this.params)
          // rules 表单验证是否通过
          let api = 'salessheetSave' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salessheetUpdate'
            // 编辑保存
          }
          this.$api.seePsiSaleService[api](params)
            .then(res => {
              this.$emit('update:visible', false)
              // 刷新列表
              this.$emit('reload')
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
