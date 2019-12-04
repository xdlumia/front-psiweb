/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-04 11:24:36
 * @Description: 换货单
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>换货单{{from?`(${from})`:''}}</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs style="max-height:calc(100vh - 130px)">
      <d-tab-pane label="换货信息" name="exchangeInfo" />
      <d-tab-pane label="换入库商品" name="inGoods" />
      <d-tab-pane label="换出库商品" name="outGoods" />
      <d-tab-pane label="账期信息" name="billInfo" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div v-if="form&&showEditPage&&!loading">
        <el-form :model="form" class="p10" ref="form" size="mini">
          <exchange-info :data="form" id="exchangeInfo" />
          <buying-exchange-goods :data="form" @totalAmountChange="onInMoneyChange" exchangeType="in" id="inGoods" />
          <buying-exchange-goods :data="form" @totalAmountChange="onOutMoneyChange" exchangeType="out" id="outGoods" />
          <orderStorageBill
            :data="form"
            :hide="['isBillFee']"
            :max="Math.abs(money.in-money.out)"
            :type="money.in>money.out?0:1"
            feeDetailCode="ZD_DY_LX-4-3"
            id="billInfo"
          />
          <customInfo :data="form" busType="1" id="customInfo"></customInfo>
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
    from: String // 来源
  },
  computed: {},
  data() {
    return {
      money: {
        in: 0,
        out: 0
      },
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {},
  methods: {
    onInMoneyChange(e) {
      this.money.in = e;
    },
    onOutMoneyChange(e) {
      this.money.out = e;
    },
    getPreTaxAmount(type, row) {
      let np = type == 'in' ? 'swapInNum' : 'swapOutNum';
      let mp = type == 'in' ? 'swapInMoney' : 'swapOutMoney';
      return +Number(
        (row[mp] || 0) * (1 + (row.taxRate || 0) / 100) * (row[np] || 0) || 0
      ).toFixed(2);
    },
    getDetail() {
      if (this.rowData) return this.rowData;
      return {
        putinCommodityList: [],
        putoutCommodityList: [],
        fieldList: [],
        attachList: [],
        financeList: []
      };
    },
    async save() {
      await this.$refs.form.validate();
      this.loading = true;
      try {
        this.form.swapInNum = 0;
        this.form.swapInMoney = this.money.in;
        this.form.putinCommodityList.map(item => {
          this.form.swapInNum += Number(item.swapInNum) || 0;
          item.swapInCommodityCode = item.commodityCode;
        });
        this.form.swapOutNum = 0;
        this.form.swapOutMoney = this.money.out;
        this.form.putoutCommodityList.map(item => {
          this.form.swapOutNum += Number(item.swapOutNum) || 0;
          item.swapOutCommodityCode = item.commodityCode;
        });
        this.form.source = this.from || '新建';
        if (this.isEdit) {
          await this.$api.seePsiWmsService.wmsswaporderUpdate(this.form);
        } else {
          await this.$api.seePsiWmsService.wmsswaporderSave(this.form);
        }
        this.setEdit();
        this.close();
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>