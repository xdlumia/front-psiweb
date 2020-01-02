/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-02 10:23:10
 * @Description: 生成发货单
*/
<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="visible"
    title="生成发货单"
    v-dialogDrag
    @close='close'
  >
    <div slot="title">
      <span>生成发货单</span>
      <span class="fr mr20">
        <el-button
          @click="close"
          size="mini"
        >关 闭</el-button>
        <el-button
          type="primary"
          @click="submit"
          size="mini"
        >保 存</el-button>
      </span>
    </div>
    <el-container>
      <el-header
        class="d-bg-white"
        style="height:54px;padding:0;"
      >
        <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
        >
          <el-tab-pane name="deliverEdit">
            <span
              slot="label"
              v-anchor:deliverEdit
            >发货信息</span>
          </el-tab-pane>
          <el-tab-pane name="logisticsEdit">
            <span
              slot="label"
              v-anchor:logisticsEdit
            >物流信息</span>
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main
        :style="{maxHeight:'calc(100vh - 180px)'}"
        style="padding:0;"
      >
        <el-form
          :model="addForm"
          ref='addForm'
          class="p10"
        >
          <deliverEdit
            ref="deliverEdit"
            :data='addForm'
          />
          <logisticsEdit
            ref="logisticsEdit"
            :data='addForm'
            :quotationData='quotationData'
          />
        </el-form>

      </el-main>
    </el-container>
  </el-dialog>
</template>
<script>
import deliverEdit from '@/components/formComponents/deliver-edit';
import logisticsEdit from '@/components/formComponents/logistics-edit';

export default {
  components: {
    deliverEdit,
    logisticsEdit
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      loading: false,
      quotationData: {},//通过报价单获取出来的信息
      addForm: {
        "clientName": "",
        "consignee": "",
        "consigneeAddress": "",
        "consigneePhone": "",
        "note": "",
        "practicalShipmentsTime": "",
        salesExpectedShipmentsTime: '',
        "requireShipmentsTime": "",
        "salesSheetCode": "",
        "salesShipmentCode": "",
        "shipmentsLogisticsList": [
          {
            "facilitator": "",
            "logisticsFees": "",
            "serveType": "",
            "shipmentsOrderId": "",
            "waybillCode": ""
          }
        ],
        "source": "销售单"
      },
    };
  },
  created() {
    this.getinfoByCode()
  },
  mounted() {
    this.addForm.salesShipmentCode = this.form.shipmentCode
    this.addForm.requireShipmentsTime = this.form.salesQuotationEntity.salesExpectedShipmentsTime
  },
  methods: {
    //根据报价单code查询收货 人 电话 地址 备注 ，物流信息，直接带入并且不准修改
    getinfoByCode() {
      this.$api.seePsiSaleService.salesquotationGetinfoByCode({ quotationCode: this.form.squotationCode })
        .then(res => {
          // res.data.facilitator = 6
          // res.data.serveType = 'PSI_FWS_FWLX-1'
          this.quotationData = res.data || {}
          this.addForm.consignee = res.data.clientLinkman//收货人
          this.addForm.consigneePhone = res.data.clientPhone//收货人电话
          this.addForm.consigneeAddress = res.data.clientReceivingAddress//收货地址
          this.addForm.note = res.data.note//备注
          this.addForm.shipmentsLogisticsList[0].facilitator = res.data.facilitator
          this.addForm.shipmentsLogisticsList[0].serveType = res.data.serveType
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    },
    submit() {
      this.addForm.clientName = this.form.clientName
      this.addForm.salesSheetCode = this.form.salesSheetCode
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.seePsiSaleService.salessheetDeliverGoods(this.addForm)
            .then(res => {
              this.$emit('reload')
              this.close()
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>