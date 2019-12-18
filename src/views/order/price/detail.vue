/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-18 16:47:48
 * @Description: 采购调价单
*/
<template>
  <sideDetail
    :status="status"
    :title="`调价单: ${detail?(detail.code||''):''}`"
    :visible="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpriceSubmitApproval',{
          adjustPriceType: adjustPriceType,
          taskCode:detail.taskNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0].includes(detail.state)&&authorityButtons.includes('psi_purchase_adjust_pric_03')"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpriceCancel',{
          adjustPriceType: adjustPriceType,
          taskCode:detail.taskNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)&&authorityButtons.includes('psi_purchase_adjust_pric_06')"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpricePassApproval',{
          adjustPriceType: adjustPriceType,
          taskCode:detail.taskNode,
          id:detail.id,
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.state)&&authorityButtons.includes('psi_purchase_adjust_pric_10')"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpriceReject',{
          adjustPriceType: adjustPriceType,
          taskCode:detail.taskNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)&&authorityButtons.includes('psi_purchase_adjust_pric_07')"
      >驳回</el-button>
      <el-button
        @click="showEdit=true"
        size="mini"
        type="primary"
        v-if="detail&&[0].includes(detail.state)&&authorityButtons.includes('psi_purchase_adjust_pric_04')"
      >编辑</el-button>
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpriceLogicDelete',{ id:detail.id },'删除')"
        size="mini"
        type="danger"
        v-if="detail&&[0].includes(detail.state)&&authorityButtons.includes('psi_purchase_adjust_pric_05')"
      >删除</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <approve-panel
          :busType="busType"
          :id="detail.id"
          v-if="isDataReady"
        />
        <el-form
          :model="detail"
          v-if="detail&&visible"
        >
          <buying-goods-edit
            :customColumns="customColumns"
            :data="detail"
            :show="[
                'commodityCode','goodsName','goodsPic','categoryCode','className','specOne','fullscreen'
              ]"
            :sort="sort"
            :showSummary="false"
            disabled
            title="商品信息"
          ></buying-goods-edit>
          <extrasInfo
            :data="detail"
            disabled
            id="extrasInfo"
          />
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <Edit
      :hide="hide"
      :rowData="detail"
      :visible.sync="showEdit"
      @reload="setEdit(),$reload()"
      type="edit"
      v-if="showEdit"
    />
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import Edit from './edit';

export default {
  mixins: [VisibleMixin],
  components: {
    Edit
  },
  props: {
    sort: {
      type: Array,
      default: () => []
    },
    hide: {
      type: Array,
      default: () => []
    },
    adjustPriceType: {
      default: 2
    },
    busType: {
      default: 40
    }
  },
  data() {
    return {
      customColumnsArray: [
        { label: '采购价(平均值)', key: 'purchaseAverage', prop: 'purchaseAverage', width: 140, format: (a, b) => Number(b.purchaseAverage || b.inventoryPrice).toFixed(2) },
        { label: '库存成本(税前)', key: 'inventoryPrice', prop: 'inventoryPrice', width: 140, format: (a, b) => b.originalPrice || Number(b.repertoryCost - b.adjustPriceMoney).toFixed(2) },
        { label: '调整金额', key: 'adjustPriceMoney', prop: 'adjustPriceMoney', width: 120, format: (a, b) => b.adjustPriceMoney || 0 },
        {          label: '调整后库存成本(税前)', key: 'repertoryCost', prop: 'repertoryCost', width: 140,
          format: (a, b) => b.repertoryCost || 0
        },
        {          label: '调整差异', key: 'adjustPriceDifference	', prop: 'adjustPriceDifference	', width: 100,
          format: (a, b) => b.adjustPriceDifference || 0
        },
        { label: '销售参考价（税前）', key: 'saleReferencePrice', prop: 'saleReferencePrice', width: 130, },
        { label: '调整后销售参考价（税前）', key: 'taxBeforeAdjustPrice', prop: 'taxBeforeAdjustPrice', width: 180, format: (a, b) => this.calcTaxBeforeAdjustPrice(b) },
        { label: '利润率%', key: 'profitRate', prop: 'profitRate', width: 120, format: (a, b) => this.calcProfitRate(b) },
      ],
      showEdit: false,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '已通过',
        '3': '驳回',
        '4': '撤销'
      }
    };
  },
  computed: {
    customColumns() {
      return this.customColumnsArray.filter(item => !this.hide.includes(item.prop))
    },
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.state] },
          { label: '单据创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true },
          { label: '调价类型', value: this.adjustPriceType == 2 ? '采购调价' : '销售调价' }
        ];
      }
    }
  },
  watch: {},
  methods: {
    calcProfitRate(row) {
      let taxBeforeAdjustPrice = (+row.saleReferencePrice || 0) + (+row.adjustPriceMoney || 0)
      let inventoryPrice = +row.inventoryPrice || 0
      return Number(
        (taxBeforeAdjustPrice - inventoryPrice) / inventoryPrice * 100
      ).toFixed(0);
    },
    calcTaxBeforeAdjustPrice(row) {
      return +Number(
        (+row.saleReferencePrice || 0) + (+row.adjustPriceMoney || 0)
      ).toFixed(2);
    },
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiCommonService.commonadjustpriceInfoByCode(
          null,
          this.code
        );
        let {
          data: commodityList
        } = await this.$api.seePsiCommonService.commonadjustpricedetailedList({
          sellBillsId: data.id,
          page: 1,
          limit: 999
        });
        data.commodityList = commodityList || [];
        // 如果是销售调价单并且审核通过后
        if (this.adjustPriceType == 1 && data.state == 2) {
          data.commodityList.map(item => {
            item.saleReferencePrice = Number(item.saleReferencePrice || 0) - Number(item.adjustPriceMoney || 0)
            return item
          })
        }
        return data;
      } else if (this.rowData) return this.rowData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>