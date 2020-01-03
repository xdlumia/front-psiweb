/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-03 14:38:52
 * @Description: 生成销售退货单
*/
<template>
  <el-dialog
    :visible.sync="showEditPage"
    width="1120px"
    @close="close"
    v-dialogDrag
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{type=='add'?'生成销售退货单':`编辑:${code}`}}</span>
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
        <!-- 退换货商品 -->
        <goods-return-edit
          from="return"
          :data="form"
          type='edit'
          :options="rowData.quotationCodes || []"
          id="goodsChangeEdit"
        />

        <!-- 其他费用 -->
        <other-fee
          id="otherFee"
          :data="form"
        />
        <!-- 账期信息 -->
        <return-bill-info
          id="returnBillInfo"
          :data="form"
          :hide="['actualRefundAmount']"
        />

        <!-- 自定义信息 -->
        <customInfo
          busType="17"
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
        goodsReturn: '退货商品信息',
        otherFee: '其他费用',
        returnBillInfo: '账期信息',
        customInfo: '自定义信息',
        extrasInfo: '备注信息',
      },
      alwaysDropAndCopyForm: false,
      // 新增orEdit框内容
      form: {
        busType: 0, // 0退货 1换货
        actualRefundAmount: '',//实退金额
        alterationCode: '',//退换货编号,
        attachList: [],//附件,
        commodityEntityList: [], //别删 留着
        businessCommoditySaveVoList: [ //商品信息
          // {
          //   alterationNumber: '',//	退换商品数量(出入数量)
          //   alterationPrice: '',//实际退/换单价
          //   apportionmentAmount: '',// 分摊后金额
          //   busCode: '',//业务编号,
          //   busType: '',//9,
          //   commodityCode: '',//商品编号,
          //   commodityNumber: '',//商品数量
          //   costAmount: '',//采购/销售成本金额
          //   discount: '',//折扣
          //   discountSprice: '',//折后单价
          //   isAssembly: '',//是否组装
          //   isDirect: '',//是否直发
          //   isTeardown: '',//是否拆卸
          //   note: '',//备注,
          //   parentCommodityCode: '',//父商品code
          //   pickingNumber: '',//拣货数量
          //   preTaxAmount: '',//含税总价
          //   putawayType: '',//库存类型(出库/入库),
          //   reference: '',//参考价
          //   salesPrice: '',//销售单价
          //   shipmentsNumber: '',//发货数量,
          //   snCode: '',//SN码,
          //   taxPrice: '',//税后退货单价
          //   taxTotalAmount: '',//税后退货总价
          // }
        ],
        clientId: this.rowData.clientId,//100000,
        companyAccountId: this.rowData.companyAccountId,//100000,
        companySettlementId: this.rowData.companySettlementId,//100000,
        exchangeNumber: '',//9,
        id: '',
        fieldList: [],//自定义字段,
        note: '',//备注,
        payTime: '',//1572403069457,
        quotationCode: (this.rowData.quotationCodes || [])[0] || '',//默认取报价单编号第一个,
        refundNumber: '0',//9,
        salesNumber: '',//9,
        salesShipmentCode: '',//销售出库单编号,
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
        shouldRefundAmount: '',//应退金额
        totalExchangeNumber: '',//换货总数量,
        totalRefundAmount: '',//总计退货价格（影响金额）
        totalRefundNumber: '',//退货总数量
        isTax:0// 是否含税，0含税 1未税
      }
    }
  },
  created() {
    // this.init()
  },
  mounted() {

  },
  watch: {

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
        let { data } = await this.$api.seePsiSaleService.salesreturnedGetInfoByCode({ code: this.code })
        data.shipmentFinanceSaveVoList = data.shipmentFinanceEntityList
        data.isTax=data.isTax||0
        return data;
      }
    },
    // 保存表单数据
    async saveHandle() {
      // if (+this.form.actualRefundAmount > +this.form.shouldRefundAmount) {
      //   this.$message({
      //     message: '实退金额不能大于应退金额',
      //     type: 'warning',
      //     showClose: true,
      //   });
      //   return
      // }
      await this.$showFormError(this.$refs.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          // rules 表单验证是否通过
          let api = 'salesreturnedUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salesreturnedSave'
            // 编辑保存
          }
          // 获取销售出库单编号
          this.form.salesShipmentCode = this.rowData.shipmentCode
          let copyParams = JSON.parse(JSON.stringify(this.form))
          copyParams.businessCommoditySaveVoList = this.$$util.jsonFlatten(copyParams.businessCommoditySaveVoList, 'commonGoodConfigDetailsEntityList')
          copyParams.businessCommoditySaveVoList.forEach(item => {
            item.putawayType = 1 //1入库
          })
          if (copyParams.businessCommoditySaveVoList.some(item => !item.commodityNumber || !item.alterationPrice)) {
            this.$message({
              message: '商品的退货数量和单价没有填写或当前没有可退货商品',
              type: 'error',
              showClose: true,
            });
            return
          }
          copyParams.shipmentFinanceSaveVoList = copyParams.shipmentFinanceSaveVoList.map(item => {
            // TODO这里应该让用户自己选择
            // item.feeDetailCode = 'ZD_DY_LX-1-2' //退货费 费用明细",
            // item.feeTypeCode = 'ZD_DY_LX-1' // 销售费 费用类型",
            item.isBillFee = 1
            return item
          })
          this.loading = true
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
