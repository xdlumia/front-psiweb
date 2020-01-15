/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 10:19:38
 * @Description: 生成销售换货单
*/
<template>
  <el-dialog
    :visible.sync="showEditPage"
    width="1120px"
    @close="close"
    :status="status"
    v-dialogDrag
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{type=='add'?'生成销售换货单':`编辑:${codeSlice(code)}`}}</span>
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
      ref="form"
      size="small"
      :model="form"
      label-position="top"
      class="d-auto-y"
      style="height:calc(100vh - 110px)"
    >
      <d-tabs :style="{maxHeight:'calc(100vh - 110px)'}">
        <d-tab-pane
          v-for="(val,key) of tabs"
          :key="key"
          :label="val"
          :name="key"
        />

        <!-- 客户信息 -->
        <customerInfo
          disabled
          id="customerInfo"
          :data="form"
        />
        <!-- 公司信息 -->
        <companyInfo
          disabled
          id="companyInfo"
          :data="form"
        />
        <!-- 退换货商品 -->
        <goods-return-edit
          title="换入商品信息"
          from="exchange"
          :data="form"
          type="edit"
          :options="rowData.quotationCodes || []"
          id="goodsChangeEdit"
        />
        <!-- 账期信息 -->
        <return-bill-info
          id="returnBillInfo"
          :data="form"
          :hide="['actualRefundAmount']"
        />
        <!-- 其他费用 -->
        <other-fee
          id="otherFee"
          :data="form"
        />

        <!-- 自定义信息 -->
        <customInfo
          busType="18"
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

import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {

  },
  data() {
    return {
      loading: false,
      // tab操作栏
      tabs: {
        customerInfo: '客户信息',
        companyInfo: '公司信息',
        goodsChangeEdit: '退货商品信息',
        otherFee: '其他费用',
        returnBillInfo: '账期信息',
        customInfo: '自定义信息',
        extrasInfo: '备注信息',
      },
      // 新增orEdit框内容
      form: {
        actualRefundAmount: '',//98765432109876.12,
        alterationCode: '',//退换货编号,
        apprpvalNode: '',//9,
        attachList: [],//附件,
        attachs: '',//附件,
        busType: 1,//0 退货 1换货,
        commodityEntityList: [], //编辑的时候用到
        exChangeCommodityList: [], // 临时数据 存放修改后的商品
        businessCommoditySaveVoList: [
          // {
          //   alterationNumber:'',//9,
          //   alterationPrice:'',//98765432109876.12,
          //   apportionmentAmount:'',//98765432109876.12,
          //   busCode:'',//业务编号,
          //   busType:'',//9,
          //   commodityCode:'',//商品编号,
          //   commodityNumber:'',//9,
          //   costAmount:'',//98765432109876.12,
          //   discount:'',//98765432109876.12,
          //   discountSprice:'',//98765432109876.12,
          //   isAssembly:'',//9,
          //   isDirect:'',//9,
          //   isTeardown:'',//9,
          //   note:'',//备注,
          //   parentCommodityCode:'',//100000,
          //   pickingNumber:'',//9,
          //   preTaxAmount:'',//98765432109876.12,
          //   putawayType:'',//9,
          //   reference:'',//98765432109876.12,
          //   salesPrice:'',//98765432109876.12,
          //   shipmentsNumber:'',//9,
          //   snCode:'',//SN码,
          //   taxPrice:'',//98765432109876.12,
          //   taxTotalAmount:'',//98765432109876.12
          // }
        ],
        clientId: this.rowData.clientId,//100000,
        companyAccountId: this.rowData.companyAccountId,//100000,
        companyCode: '',//公司编码code,
        companySettlementId: this.rowData.companySettlementId,//100000,
        deptTotalCode: '',//部门code,
        exchangeNumber: '',//9,
        fieldList: [],//自定义字段,
        fields: '',//自定义字段,
        isDelete: '',//9,
        note: '',//备注,
        payTime: '',//1572403069457,
        quotationCode: (this.rowData.quotationCodes || [])[0] || '',//默认取报价单编号第一个,报价单编号,
        refundNumber: '',//9,
        salesNumber: '',//9,
        salesShipmentCode: this.rowData.shipmentCode,//销售出库单编号,
        shipmentFinanceSaveVoList: [
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
        shouldRefundAmount: '',//
        totalExchangeNumber: '',//换货总数量
        totalRefundAmount: '',//总计退货价格
        totalRefundNumber: '',//退货总数量
        isTax: 0
      }
    }
  },
  created() {
    // this.init()
  },
  mounted() {

  },
  computed: {
    rowDatas() {
      // 判断rowData 是多行数据还是单行数据
      if (this.rowData instanceof Array) {
        return this.rowData
      } else {
        return [this.rowData]
      }
    },
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiSaleService.salesexchangeGetInfoByCode({ code: this.code })
        data.shipmentFinanceSaveVoList = data.shipmentFinanceEntityList
        data.isTax = data.isTax || 0
        return data;
      }
    },
    // 保存表单数据
    async saveHandle() {
      await this.$showFormError(this.$refs.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.businessCommoditySaveVoList.map(item => item.putawayType = 1) // 退货入库
          this.form.exChangeCommodityList.map(item => { item.putawayType = 0 }) //换货出库
          let copyParams = JSON.parse(JSON.stringify(this.form))
          if (copyParams.businessCommoditySaveVoList.some(item => !item.commodityNumber || !item.alterationPrice)) {
            this.$message({
              message: '商品的退货数量和单价没有填写或当前没有可退货商品',
              type: 'error',
              showClose: true,
            });
            return
          }

          // 把退货和换货产品合并
          copyParams.businessCommoditySaveVoList = copyParams.businessCommoditySaveVoList.concat(copyParams.exChangeCommodityList)
          copyParams.businessCommoditySaveVoList.map(v => v.busCode = copyParams.quotationCode)
          copyParams.totalExchangeNumber = copyParams.exChangeCommodityList.reduce((sum, curr) => {

            // 税后总价
            curr.preTaxAmount = Number((curr.reference || 0) * (1 + (copyParams.isTax ? 0 : (curr.taxRate)) / 100) * (curr.commodityNumber || 0)).toFixed(2)
            // 销售单价
            curr.salesPrice = Number((curr.reference || 0) * (1 + (copyParams.isTax ? 0 : (curr.taxRate)) / 100)).toFixed(2)
            curr.costAmount = curr.inventoryPrice

            return sum + Number(curr.commodityNumber)
          }, 0)
          copyParams.shipmentFinanceSaveVoList = copyParams.shipmentFinanceSaveVoList.map(item => {
            item.isBillFee = 1
            return item
          })
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salesexchangeUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salesexchangeSave'
            // 编辑保存
          }
          this.$api.seePsiSaleService[api](copyParams)
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
