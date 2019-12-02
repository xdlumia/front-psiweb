/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 生成发货单
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="生成发货单"
    v-dialogDrag
    @close='close'
  >
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
        :style="{maxHeight:'calc(100vh - 240px)'}"
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
          />
        </el-form>

      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="submit"
        size="small"
      >保 存</el-button>
    </span>
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
      addForm: {
        "clientName": "",
        "consignee": "",
        "consigneeAddress": "",
        "consigneePhone": "",
        "note": "",
        "practicalShipmentsTime": "",
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
  mounted() {
    console.log(this.form, 'this.addForm.salesShipmentCodethis.addForm.salesShipmentCodethis.addForm.salesShipmentCode')
    this.addForm.salesShipmentCode = this.form.shipmentCode
    this.addForm.requireShipmentsTime = this.form.salesQuotationEntity.salesRequireArrivalTime
  },
  methods: {
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
          this.$api.seePsiWmsService.wmsshipmentsorderSave(this.addForm)
            .then(res => {
              this.close()
            })
            .finally(() => {

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