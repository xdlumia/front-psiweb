/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-24 21:43:09
 * @Description: 换货单
*/
<template>
  <sideDetail :status="status" :visible="showDetailPage" @close="close" title="换货单" v-loading="loading" width="990px">
    <template slot="button">
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderSubmitApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0,-1].includes(detail.swapState)"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderCancel',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.swapState)"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.swapState)"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.swapState)"
      >驳回</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary" v-if="detail&&[0,-1].includes(detail.swapState)">编辑</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsswaporderDelete',{
          id:detail.id
        },'删除')"
        size="mini"
        type="danger"
        v-if="detail&&[0,-1].includes(detail.swapState)"
      >删除</el-button>
      <!-- <el-button @click="showExchangeGoods=true" size="mini" type="primary">换货扫码</el-button> -->
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form :model="detail" ref="form" size="mini" v-if="detail&&showDetailPage">
          <exchange-info :data="detail" disabled id="exchangeInfo" />
          <buying-exchange-goods :data="detail" disabled exchangeType="in" id="inGoods" />
          <buying-exchange-goods :data="detail" disabled exchangeType="out" id="outGoods" />
          <orderStorageBill :data="detail" :hide="['isBillFee']" :type="3" disabled id="billInfo" />
          <customInfo :data="detail" busType="1" disabled id="customInfo"></customInfo>
          <extrasInfo :data="detail" disabled id="extrasInfo"></extrasInfo>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="账单管理">账单管理</el-tab-pane>
      <el-tab-pane label="发票管理">发票管理</el-tab-pane>
    </el-tabs>
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),getDetail()" type="edit" v-if="showEdit" />
    <exchange-sweepcode :rowData="getExchangeGoods()" :visible.sync="showExchangeGoods" v-if="showExchangeGoods" />
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
      showExchangeGoods: false,
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待换货',
        '3': '部分换货',
        '4': '完成换货',
        '-1': '已驳回'
      }
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.swapState] },
          { label: '单据创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true },
          { label: '来源', value: this.detail.source }
        ];
      }
    }
  },
  mounted() {},
  watch: {},
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiWmsService.wmsswaporderGetByCode(
          null,
          this.code
        );
        []
          .concat(data.putinCommodityList, data.putoutCommodityList)
          .map(item => {
            item.commodityCode =
              item.swapOutCommodityCode || item.swapInCommodityCode;
          });
        return data;
      } else if (this.rowData) return this.rowData;
    },
    getExchangeGoods() {
      return {
        businessCode: this.detail.swapOrderCode,
        inCommodityList: this.detail.putinCommodityList.map(item => ({
          ...item
        })),
        outCommodityList: this.detail.putoutCommodityList.map(item => ({
          ...item
        }))
      };
    }
  }
};
</script>
<style lang="scss" scoped>
</style>