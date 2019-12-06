/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-06 16:05:19
 * @Description: 采购调价单
*/
<template>
  <sideDetail
    :status="status"
    :title="`调价单: ${detail?detail.code:''}`"
    :visible="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpriceSubmitApproval',{
          adjustPriceType: 2,
          taskCode:detail.taskNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0].includes(detail.state)"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpriceCancel',{
          adjustPriceType: 2,
          taskCode:detail.taskNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpricePassApproval',{
          adjustPriceType: 2,
          taskCode:detail.taskNode,
          id:detail.id,
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.state)"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpriceReject',{
          adjustPriceType: 2,
          taskCode:detail.taskNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.state)"
      >驳回</el-button>
      <el-button
        @click="showEdit=true"
        size="mini"
        type="primary"
        v-if="detail&&[0].includes(detail.state)"
      >编辑</el-button>
      <el-button
        @click="$submission('seePsiCommonService.commonadjustpriceLogicDelete',{ id:detail.id },'删除')"
        size="mini"
        type="danger"
        v-if="detail&&[0].includes(detail.state)"
      >删除</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <approve-panel
          :busType="40"
          :id="detail.id"
          v-if="isDataReady"
        />
        <el-form
          :model="detail"
          v-if="detail&&visible"
        >
          <buying-goods-edit
            :customColumns="[
                { label:'采购价(平均值)',key:'purchaseAverage',prop:'purchaseAverage',width:140,format:(a,b)=>Number(b.purchaseAverage||b.inventoryPrice).toFixed(2) },
                { label:'库存成本(税前)',key:'inventoryPrice',prop:'inventoryPrice',width:140,format:(a,b)=>b.originalPrice||Number(b.repertoryCost-b.adjustPriceMoney).toFixed(2) },
                { label:'调整金额',key:'adjustPriceMoney',prop:'adjustPriceMoney',width:120, format:(a,b)=>b.adjustPriceMoney||0 },
                { label:'调整后库存成本(税前)',key:'repertoryCost',prop:'repertoryCost',width:140,
                  format:(a,b)=>b.repertoryCost||0
                },
                { label:'调整差异',key:'adjustPriceDifference	',prop:'adjustPriceDifference	',width:100,
                  format:(a,b)=>b.adjustPriceDifference||0
                },
              ]"
            :data="detail"
            :show="[
                'commodityCode','goodsName','goodsPic','categoryCode','className','specOne','configName','noteText','fullscreen'
              ]"
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
  props: {},
  data() {
    return {
      showEdit: false,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '通过',
        '3': '驳回',
        '4': '撤销'
      }
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.state] },
          { label: '单据创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true },
          { label: '调价类型', value: '采购调价' }
        ];
      }
    }
  },
  watch: {},
  methods: {
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
          limit: 15
        });
        data.commodityList = commodityList || [];
        return data;
      } else if (this.rowData) return this.rowData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>