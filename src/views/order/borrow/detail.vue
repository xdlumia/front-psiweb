/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-18 10:48:16
 * @Description: 借入借出详情
*/
<template>
  <sideDetail
    :status="status"
    :title="`借入借出单 ${detail?(detail.borrowLoanCode||''):''}`"
    :visible.sync="showDetailPage"
    @close="close"
    v-loading="loading"
    width="990px"
  >
    <template slot="button" v-if="detail">
      <el-button
        @click="$submission('seePsiWmsService.wmsborrowloanorderSubmitApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'提交审核')"
        size="mini"
        type="primary"
        v-if="detail&&[0,12].includes(detail.borrowLoanState)&&authorityButtons.includes('psi_purchase_borrow_03')"
      >提交审核</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsborrowloanorderCancel',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'撤销审核')"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.borrowLoanState)&&authorityButtons.includes('psi_purchase_borrow_06')"
      >撤销审核</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsborrowloanorderPassApproval',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
          busCode:detail.borrowLoanCode
        },'通过')"
        size="mini"
        type="primary"
        v-if="detail&&[1].includes(detail.borrowLoanState)&&authorityButtons.includes('psi_purchase_borrow_08')"
      >通过</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsborrowloanorderReject',{
          apprpvalNode:detail.apprpvalNode,
          id:detail.id,
        },'驳回',true)"
        size="mini"
        type="danger"
        v-if="detail&&[1].includes(detail.borrowLoanState)&&authorityButtons.includes('psi_purchase_borrow_07')"
      >驳回</el-button>
      <el-button
        @click="showEdit=true"
        size="mini"
        type="primary"
        v-if="detail&&[0,12].includes(detail.borrowLoanState)&&authorityButtons.includes('psi_purchase_borrow_04')"
      >编辑</el-button>
      <el-button
        @click="$submission('seePsiWmsService.wmsborrowloanorderLogicDelete',{
        id:detail.id
      },'删除')"
        size="mini"
        type="danger"
        v-if="detail&&[0,12].includes(detail.borrowLoanState)&&authorityButtons.includes('psi_purchase_borrow_05')"
      >删除</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情">
        <approve-panel :busType="5" :id="detail.id" v-if="isDataReady" />
        <el-form :model="detail" class="hide-form-error" size="mini">
          <borrow-in :data="detail" disabled />
          <borrow-goods :data="detail" disabled />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="销售出库单" name="outlib" v-if="isDataReady&&detail.salesShipmentCode">
        <FullscreenWrap v-if="tabStatus.outlib">
          <SalesOutLibrary
            :button="false"
            :params="{page:1,limit:15,shipmentCode:detail.salesShipmentCode,relationCode:detail.borrowLoanCode}"
          />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="请购单" name="buyingOrder" v-if="isDataReady&&detail.businessType==1">
        <FullscreenWrap v-if="tabStatus.buyingOrder">
          <OrderBuying
            :button="false"
            :params="{page:1,limit:15,purchaseApplyCode:detail.businessCode,relationCode:detail.borrowLoanCode}"
          />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),$reload()" type="edit" v-if="showEdit" />
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import Edit from './addIn';

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
        '2': '待借入',
        '3': '待借出',
        '4': '部分借入',
        '5': '部分借出',
        '6': '待归还',
        '7': '待返还',
        '8': '部分返还',
        '9': '部分归还',
        '10': '完成返还',
        '11': '完成归还',
        '12': '已驳回',
        '-1': '终止'
      }
    };
  },
  computed: {
    status() {
      if (!this.detail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.borrowLoanState] },
          { label: '单据创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true },
          { label: '来源', value: this.detail.source }
        ];
      }
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiWmsService.wmsborrowloanorderGetByCode(
          null,
          this.code
        );
        data.commodityList = data.commodityShowList || [];
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>