/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 16:52:22
 * @Description: file content
*/
<template>
  <el-dialog
    :title="type=='add'?'生成销售退货单':`编辑:${code}`"
    :visible.sync="showPop"
    width="920px"
    v-dialogDrag
  >
    <div v-loading="loading">
      <el-form
        v-if="visible"
        size="small"
        :model="addForm"
        class="d-auto-y"
        style="height:calc(100vh - 160px)"
      >
        <!-- 客户信息 -->
        <customerInfo :data="addForm" />
        <!-- 公司信息 -->
        <companyInfo :data="addForm" />
        <!-- 换入商品信息 -->
        <!-- <commodity-info-edit /> -->
        <goods-return
          title="换入商品信息"
          :data="addForm"
          :params="{busType:17,putawayType:0}"
        />
        <!-- 换出商品信息 -->
        <!-- <commodity-info-edit /> -->
        <goods-return
          title="换出商品信息"
          :data="addForm"
          :params="{busType:17,putawayType:1}"
        />

        <!-- 其他费用 -->
        <other-fee :data="addForm" />

        <!-- 账期信息 -->
        <return-bill-info :data="addForm" />

        <!-- 自定义信息 -->
        <custom-info :data="addForm" />
        <!-- 备注信息 -->
        <extras-info :data="addForm" />

      </el-form>
      <!-- 确定按钮 -->
      <div class="ac pt20">
        <el-button
          @click="$emit('update:visible', false)"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="saveHandle('addForm')"
          size="small"
        >保 存</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: ['visible', 'code', 'type'],
  components: {

  },
  data() {
    return {
      loading: false,
      // 新增orEdit框内容
      addForm: {
        id: '',
        actualRefundAmount: '',//实退金额,
        alterationCode: '',//退换货编号,
        apprpvalNode: '',//审核节点
        attachList: '',//附件,
        busType: '',//业务类型 17,
        businessCommoditySaveVoList: [ //商品信息集合
          // {
          //   alterationNumber: '',//9,
          //   alterationPrice: '',//98765432109876.12,
          //   apportionmentAmount: '',//98765432109876.12,
          //   busCode: '',//业务编号,
          //   busType: '',//9,
          //   commodityCode: '',//商品编号,
          //   commodityNumber: '',//9,
          //   costAmount: '',//98765432109876.12,
          //   discount: '',//98765432109876.12,
          //   discountSprice: '',//98765432109876.12,
          //   isAssembly: '',//9,
          //   isDirect: '',//9,
          //   isTeardown: '',//9,
          //   note: '',//备注,
          //   parentCommodityCode: '',//100000,
          //   pickingNumber: '',//9,
          //   preTaxAmount: '',//98765432109876.12,
          //   putawayType: '',//9,
          //   reference: '',//98765432109876.12,
          //   salesPrice: '',//98765432109876.12,
          //   shipmentsNumber: '',//9,
          //   snCode: '',//SN码,
          //   taxPrice: '',//98765432109876.12,
          //   taxTotalAmount: '',//98765432109876.12
          // }
        ],
        clientId: '',// 客户id
        companyAccountId: '',//公司发票账户id,
        companySettlementId: '',//公司结算账户id
        deptTotalCode: '',//部门code,
        exchangeNumber: '',//换出数量,
        fieldList: '',//自定义字段,
        note: '',//备注,
        payTime: '',//付款时间,
        quotationCode: '',//报价单编号,
        refundNumber: '',//退货数量,
        salesNumber: '',//销售数量,
        salesShipmentCode: '',//销售出库单编号,
        shipmentFinanceSaveVoList: [ //账期信息  其他信息
          // {
          //   busCode: '',//业务编号,
          //   busType: '',//9,
          //   feeDetailCode: '',//费用明细,
          //   feeTypeCode: '',//费用类型,
          //   isBillFee: '',//0,
          //   payAmount: '',//98765432109876.12,
          //   payTime: '',//1572403069534,
          //   paymenDays: '',//账期,
          //   paymentType: '',//9
          // }
        ],
        shouldRefundAmount: '',//应退金额,
        source: '',//来源,
        state: '',//单据状态,
        totalExchangeNumber: '',//换货总数量,
        totalRefundAmount: '',//总计退货价格,
        totalRefundNumber: '',//退货总数量
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
        this.$emit('update:visible', false)
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.initForm()
      }
    }
  },
  methods: {
    // 初始化表单
    initForm() {
      if (this.type === 'edit') {
        this.salesalterationsheetGetInfoByCode()
      } else if (this.type === 'add') {
        // 清空form表单
        this.$nextTick(() => {
          this.$refs.addForm.resetFields()
          this.addForm.id = ''
        })
      }
    },
    // 保存表单数据
    saveHandle() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salesalterationsheetUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salesalterationsheetSave'
            // 编辑保存
          }
          this.$api.seePumaidongService[api](this.addForm)
            .then(res => {
              this.visible = false
              this.$emit('reload', 'success')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    //根据code 查看详情
    salesalterationsheetGetInfoByCode() {
      this.$api.seePsiSaleService.salesalterationsheetGetInfoByCode({ code: this.code })
        .then(res => {
          let data = res.data || {}
          for (let key in this.addForm) {
            if (this.addForm[key] instanceof Array) {
              this.addForm[key] = data[key] || []
            } else {
              this.addForm[key] = data[key]
            }
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
