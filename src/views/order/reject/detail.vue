/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-09 10:37:23
 * @Description: 采购退货单
*/
<template>
  <sideDetail
    :status="status"
    :title="`采购退货单 ${detail?(detail.alterationCode||''):''}`"
    :visible.sync="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="$submission('seePsiPurchaseService.purchasealterationSubmitApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0,5].includes(detail.state)"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasealterationCancel',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasealterationPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          busCode:detail.alterationCode
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.state)"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasealterationReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)"
      >驳回</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary" v-if="detail&&[0,5].includes(detail.state)">编辑</el-button>
      <el-button
        @click="$submission('seePsiPurchaseService.purchasealterationLogicDelete',{ id:detail.id },'删除')"
        size="mini"
        type="primary"
        v-if="detail&&[0,5].includes(detail.state)"
      >删除</el-button>
      <el-button
        :disabled="canReject"
        @click="showScanGoods=true"
        size="mini"
        type="primary"
        v-if="detail&&[2,3].includes(detail.state)"
      >退货扫码</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <approve-panel :busType="31" :id="detail.id" v-if="isDataReady" />
        <el-form :model="detail" size="mini">
          <supplierInfo :data="detail" disabled id="supplierInfo"></supplierInfo>
          <companyInfo :data="detail" disabled id="companyInfo"></companyInfo>
          <buyingRejectDeliver
            :data="detail"
            :hide="[
                'saleTime','logisticsSn','collected'
              ]"
            disabled
            id="deliverInfo"
          />
          <buyingGoodsEdit
            :data="detail"
            :show="[
                'commodityCode','goodsPic','goodsName','categoryCode','className','specOne','configName','noteText','costAmount','alterationNumber','alterationPrice','taxRate','rejectPreTaxAmount','inventoryNumber','isAssembly','!add'
              ]"
            :sort="['expanded']"
            :summaryMethod="getSummarys"
            disabled
            id="commodityInfo"
          />
          <orderStorageBill :data="detail" :hide="['isBillFee']" :type="1" disabled feeDetailCode="ZD_DY_LX-4-2" id="billInfo" />
          <customInfo :data="detail" busType="31" disabled id="customInfo"></customInfo>
          <extrasInfo :data="detail" disabled id="extrasInfo"></extrasInfo>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单" name="putin">
        <FullscreenWrap v-if="isDataReady&&tabStatus.putin">
          <OrderStorage :button="false" :params="{page:1,limit:15,putinCode:detail.putinCode,relationCode:detail.alterationCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="采购单" name="order">
        <FullscreenWrap v-if="isDataReady&&tabStatus.order">
          <StoragePurchase :button="false" :params="{page:1,limit:15,putinCode:detail.putinCode}" />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="应收账单" name="recieve">
        <FullscreenWrap v-if="isDataReady&&tabStatus.recieve">
          <FinanceReceivable :button="false" :params="{page:1,limit:15,busCode:detail.alterationCode,relationCode:detail.alterationCode}" />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),$reload()" type="edit" />
    <scanGoods
      :id="detail.id"
      :rowData="{
        businessCode: detail.alterationCode,
        commodityList: detail.commodityList
      }"
      :visible.sync="showScanGoods"
      @reload="setEdit(),$reload()"
      v-if="showScanGoods"
    />
  </sideDetail>
</template>
<script>
import ScanGoods from './scanGoods';
import Edit from './edit';
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    ScanGoods,
    Edit
  },
  props: {},
  data() {
    return {
      showPop: false,
      showEdit: false,
      showScanGoods: false,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待退货',
        '3': '部分退货',
        '4': '已退货',
        '5': '已驳回'
      }
    };
  },
  mounted() {},
  watch: {},
  computed: {
    canReject() {
      if (!this.detail) return false;
      // ${row.returenNumber||0}/${row.alterationNumber||0}
      return !this.detail.commodityList.some(
        item => item.returenNumber < item.alterationNumber
      );
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiPurchaseService.purchasealterationGetByCode(
          null,
          this.code
        );
        data.commodityList = data.commodityList || [];
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
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
          this.$emit('totalAmountChange', sums[index]);
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