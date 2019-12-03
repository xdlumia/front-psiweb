/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-03 11:27:04
 * @Description: 采购退货单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>采购退货单</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs style="max-height:calc(100vh - 130px)">
      <d-tab-pane label="供应商信息" name="supplierInfo" />
      <d-tab-pane label="公司信息" name="companyInfo" />
      <d-tab-pane label="发货信息" name="deliverInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="账期" name="billInfo" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="visible&&form">
          <supplierInfo :data="form" @change="supplierChange" disabled id="supplierInfo"></supplierInfo>
          <companyInfo :data="form" disabled id="companyInfo"></companyInfo>
          <buyingRejectDeliver :data="form" :hide="[
            'saleTime','logisticsSn','collected'
          ]" id="deliverInfo" />
          <buyingGoodsEdit
            :data="form"
            :show="[
              'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','costAmount','alterationNumber','alterationPrice','taxRate','rejectPreTaxAmount','inventoryNumber','isAssembly','action','!add'
            ]"
            :sort="['expanded']"
            :summaryMethod="getSummarys"
            id="commodityInfo"
          />
          <orderStorageBill :data="form" :hide="['isBillFee']" :max="rejectAmount" :type="1" feeDetailCode="ZD_DY_LX-4-2" id="billInfo" />
          <customInfo :data="form" busType="31" id="customInfo"></customInfo>
          <extrasInfo :data="form" id="extrasInfo"></extrasInfo>
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    from: {
      type: String,
      default: '新建'
    }
  },
  computed: {},
  data() {
    return {
      rejectAmount: 0,
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {},
  methods: {
    supplierChange(e) {
      if (!this.form.logistics) this.$set(this.form, 'logistics', {});
      if (!this.form.logistics.supplierLinkman) {
        this.$set(this.form.logistics, 'supplierLinkman', e.linkManName || '');
        this.$set(this.form.logistics, 'supplierPhone', e.phone || '');
      }
    },
    async save() {
      await this.$refs.form.validate();
      this.loading = true;
      this.form.commodityList.reduce((data, item) => {
        data.alterationNum = data.alterationNum || 0;
        data.alterationNum += parseInt(item.alterationNumber) || 0;
        return data;
      }, this.form);
      this.form.alterationAmount = this.rejectAmount;
      this.form.source = this.from || '新建';
      try {
        if (this.isEdit) {
          await this.$api.seePsiPurchaseService.purchasealterationUpdate(
            this.form
          );
        } else {
          await this.$api.seePsiPurchaseService.purchasealterationSave(
            this.form
          );
        }
        this.setEdit();
        this.close();
      } catch (error) {}
      this.loading = false;
    },
    getDetail() {
      if (this.rowData) return this.rowData;
      let form = Object.assign(
        {
          logistics: {},
          attachList: [],
          commodityList: [],
          financeList: [],
          fieldList: []
        },
        this.params
      );
      form = JSON.parse(JSON.stringify(form));
      if (form.commodityList && form.commodityList.length) {
        form.commodityList.map(item => {
          item.alterationPrice = item.costAmount;
          item.alterationNumber =
            item.commodityNumber - (item.returenNumber || 0);
          item.maxalterationNumber = item.alterationNumber;
        });
      }
      return form;
    },
    getSummarys(param) {
      let { columns, data } = param;
      data = data || [];
      const sums = [];
      columns.forEach((col, index) => {
        if (['commodityNumber'].includes(col.property)) {
          let prop = col.property;
          sums[index] = +Number(
            data
              .map(item => Number(item[prop]) || 0)
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (['preTaxAmount'].includes(col.property)) {
          // 'alterationNumber','alterationPrice'
          sums[index] = +Number(
            data
              .map(
                item =>
                  +Number(
                    item.alterationPrice *
                      (1 + item.taxRate / 100) *
                      item.alterationNumber || 0
                  ).toFixed(2)
              )
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
          this.rejectAmount = sums[index];
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>