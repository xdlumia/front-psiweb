/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-13 19:40:53
 * @Description: 编辑换货单
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
      <span>{{type=='add'?'生成销售换货单':`编辑:${code}`}}</span>
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
      <d-tabs :style="{maxHeight:'calc(100vh - 180px)'}">
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
        <!-- 换入商品信息 -->
        <goods-return
          title="换入商品信息"
          id="goodsReturn"
          disabled
          :params="{busType:17,putawayType:0}"
        />
        <!-- 换出商品信息 -->
        <!-- <commodity-info-edit /> -->
        <goods-return
          id="goodsReturn"
          title="换出商品信息"
          disabled
          :params="{busType:17,putawayType:1}"
        />
        <!-- 账期信息 -->
        <return-bill-info
          id="returnBillInfo"
          disabled
          :data="form"
        />
        <!-- 其他费用 -->
        <other-fee
          id="otherFee"
          disabled
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
        goodsReturn: '换入商品信息',
        billInfo: '换出商品信息',
        otherFee: '其他费用',
        returnBillInfo: '账期信息',
        customInfo: '自定义信息',
        extrasInfo: '备注信息',
      },
      // 新增orEdit框内容
      form: {
        companyAccountId: '',
        companySettlementId: '',
        apprpvalNode: '', // 审核节点,
        attachList: [], // 附件",
        clientId: '', // 100000,
        contractTemplate: '', // 9,
        deptTotalCode: '', // 部门code",
        fieldList: [], // 自定义字段",
        isContract: '', // 有无合同,
        lateFeesId: '', // 收款滞纳金id
        note: '', // 备注",
        procurementExpectedArrivalTime: '', // 采购预计到货时间
        quotationIds: [], // 报价单ids
        salesExpectedShipmentsTime: '', // 销售预计发货时间
        salesRequireArrivalTime: '', // 销售要求到货时间,
        shipmentFinanceSaveVoList: [ //账期集合
          // {
          //   busCode:'', // 业务编号",
          //   busType:'', // 9,
          //   feeDetailCode:'', // 费用明细",
          //   feeTypeCode:'', // 费用类型",
          //   isBillFee:'', // 是否直接生成应收付,
          //   payAmount:'', // 付款金额
          //   payTime:'', // 付款时间
          //   paymenDays:'', // 账期",
          //   paymentType:'', // 9
          // }
        ],
        source: '', // 来源",
        state: '', // 9,
        totalAmount: '', // 98765432109876.12,
        totalNumber: '', //
      },
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

        if (valid) {
          this.loading = true
          this.form.quotationIds = this.rowDatas.map(item => item.id)
          // rules 表单验证是否通过
          let api = 'salesshipmentUpdate' // 默认编辑更新
          // 新增保存
          if (this.type === 'add') {
            api = 'salesshipmentSave'
            // 编辑保存
          }
          this.$api.seePsiSaleService[api](this.form)
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
