/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-15 19:14:31
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
          :data="form"
        />
        <!-- 公司信息 -->
        <companyInfo
          id="companyInfo"
          :data="form"
        />
        <!-- 退换货商品 -->
        <goods-return-edit
          :data="form"
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
        />

        <!-- 自定义信息 -->
        <customInfo
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
      // 新增orEdit框内容
      form: {
        busType: 0, // 0退货 1换货
        actualRefundAmount: '',//实退金额
        alterationCode: '',//退换货编号,
        attachList: [],//附件,
        businessCommoditySaveVoList: [ //商品信息
          {
            alterationNumber: '',//9,
            alterationPrice: '',//98765432109876.12,
            apportionmentAmount: '',//98765432109876.12,
            busCode: '',//业务编号,
            busType: '',//9,
            commodityCode: '',//商品编号,
            commodityNumber: '',//9,
            costAmount: '',//98765432109876.12,
            discount: '',//98765432109876.12,
            discountSprice: '',//98765432109876.12,
            isAssembly: '',//9,
            isDirect: '',//9,
            isTeardown: '',//是否拆卸
            note: '',//备注,
            parentCommodityCode: '',//100000,
            pickingNumber: '',//9,
            preTaxAmount: '',//98765432109876.12,
            putawayType: '',//9,
            reference: '',//98765432109876.12,
            salesPrice: '',//98765432109876.12,
            shipmentsNumber: '',//9,
            snCode: '',//SN码,
            taxPrice: '',//98765432109876.12,
            taxTotalAmount: '',//98765432109876.12
          }
        ],
        clientId: '',//100000,
        companyAccountId: '',//100000,
        companySettlementId: '',//100000,
        exchangeNumber: '',//9,
        fieldList: [],//自定义字段,
        note: '',//备注,
        payTime: '',//1572403069457,
        quotationCode: (this.rowData.quotationCodes || [])[0] || '',//默认取报价单编号第一个,
        refundNumber: '',//9,
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

    // 保存表单数据
    saveHandle() {
      this.$refs.form.validate(valid => {
        if (!this.form.shipmentFinanceSaveVoList.length) {
          this.$message({
            message: '请添加账期信息',
            type: 'error',
            showClose: true,
          });
          return
        }

        if (valid) {
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salesreturnedUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salesreturnedSave'
            // 编辑保存
          }
          this.$api.seePsiSaleService[api](this.form)
            .then(res => {
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
