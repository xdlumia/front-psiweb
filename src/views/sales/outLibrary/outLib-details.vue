/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-26 17:29:33
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <side-detail
      title="出库单详情"
      :visible.sync="showDetailPage"
      width="920px"
      :status="status"
      @close="close"
    >
      <div slot="button">
        <!-- 操作按钮 -->
        <span
          v-for="(item,index) of buttons"
          :key="index"
        >
          <el-button
            class="mr10"
            @click="buttonsClick(item.label)"
            v-if="currStatusType[detail.state || 0].includes(item.label)"
            size="small"
            :type="item.type"
          >{{item.label}}</el-button>
        </span>

      </div>
      <el-form
        ref="form"
        size="mini"
        v-loading="loading"
        label-position="top"
      >
        <el-tabs
          v-model="activeName"
          type="card"
        >
          <el-tab-pane
            v-for="(val,key) of tabs"
            :key="key"
            :label="val"
            :name="key"
          >
          </el-tab-pane>
        </el-tabs>
        <components
          ref="detail"
          :params="{shipmentCode:code}"
          :code="this.code"
          :rowData="rowData"
          :data="detail || {}"
          class="d-auto-y"
          :button="false"
          style="height:calc(100vh - 200px)"
          :is="activeName"
        ></components>
      </el-form>
    </side-detail>

    <!-- 编辑 -->
    <add
      :visible.sync="editVisible"
      :rowData="rowData"
      type="edit"
      :params="{salesShipmentCode:rowData.shipmentCode}"
      :code="rowData.shipmentCode"
    />
    <!-- 生成合同 -->
    <addContract
      :visible.sync="addContractVisible"
      :rowData="rowData"
      type="addContract"
      :params="{salesShipmentCode:rowData.shipmentCode}"
      :code="rowData.shipmentCode"
    />
    <!-- 追加合同 -->
    <addContract
      :visible.sync="editContractVisible"
      :rowData="rowData"
      type="editContract"
      :params="{salesShipmentCode:rowData.shipmentCode}"
      :code="rowData.shipmentCode"
    />
    <!-- 生成换货单 -->
    <exchangeAdd
      :visible.sync="exchangeAddVisible"
      :rowData="rowData"
      type="add"
      :params="{salesShipmentCode:rowData.shipmentCode}"
      :code="rowData.shipmentCode"
    />
    <!-- 生成退货单 -->
    <returnAdd
      :visible.sync="returnAddVisible"
      :rowData="rowData"
      type="add"
      :params="{salesShipmentCode:rowData.shipmentCode}"
      :code="rowData.shipmentCode"
    />
    <!-- 开票申请 -->
    <collectInvoice
      :visible.sync="collectInvoiceVisible"
      :rowData="rowData"
      :invoiceType="1"
      :code="rowData.shipmentCode"
    />
  </div>
</template>
<script>
import add from './add' //销售出库单新增编辑
import addContract from './add-contract' //合同新增

import returnAdd from '../return/add' //退货单新增
import exchangeAdd from '../exchange/add' //换货单新增
import collectInvoice from '@/views/finance/receipt/collect-invoice' //开票申请

import detail from './outLibDetails/detail' //详情
import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
    detail,
    add,
    addContract,
    returnAdd,
    exchangeAdd,
    collectInvoice
  },

  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: '' },
        { label: '撤销审核', type: 'danger', authCode: '' },
        { label: '审核通过', type: 'primary', authCode: '' },
        { label: '编辑', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
        { label: '生成合同', type: 'primary', authCode: '' },
        { label: '驳回', authCode: '' },
        { label: '终止', authCode: '' },
        { label: '生成退货单', type: 'primary', authCode: '' },
        { label: '生成换货单', type: 'primary', authCode: '' },
        { label: '开票申请', type: 'primary', authCode: '' },
        { label: '编辑合同', type: 'primary', authCode: '' },
        { label: '合同完善', type: 'primary', authCode: '' },
        { label: '审核采购时间', type: 'primary', authCode: '' },
        { label: '收回合同', type: 'primary', authCode: '' },
        { label: '追加合同附件', type: 'primary', authCode: '' },
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除', '生成合同'], // 新建
        '0': ['撤销审核', '审核通过', '驳回', '合同完善', '追加合同附件'], //审核中
        '1': ['审核采购时间', '追加合同附件'], //请购处理
        '2': ['收回合同', '追加合同附件'], //合同收回
        '3': ['终止', '生成退货单', '生成换货单', '追加合同附件'], //已通过
        '4': ['生成退货单', '生成换货单', '开票申请', '追加合同附件'], //已完成
        '5': ['提交审核', '编辑', '删除', '编辑合同'], //已驳回
        '6': ['生成退货单'] //已终止
      },
      // tabs 组件名称对应的label名称
      tabs: {
        detail: '详情',
        salesQuote: '报价单',
        contractSale: '合同',
        salesReturn: '销售退货单',
        salesExchange: '销售换货单',
        financeReceivable: '应收账单',
        financeQuote: '发票记录',
        salesApportion: '费用分摊单'
      },

      // tabs当前选中
      activeName: 'detail',
      form: {},
      editVisible: false, // 销售出库单编辑
      addContractVisible: false, // 生成合同
      editContractVisible: false, // 追加合同
      returnAddVisible: false,
      exchangeAddVisible: false,
      collectInvoiceVisible: false, //开票申请

    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    buttonsClick(label) {
      // 需要弹出操作功能
      let labelObj = {
        '编辑': 'editVisible',
        '生成合同': 'addContractVisible',
        '追加合同附件': 'editContractVisible',
        '生成退货单': 'returnAddVisible',
        '生成换货单': 'exchangeAddVisible',
        '开票申请': 'collectInvoiceVisible',
      }
      // 需要弹出操作的功能
      if (labelObj.hasOwnProperty(label)) {
        let visible = labelObj[label]
        this[visible] = true
      }
      // 需要二次确认操作
      else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode,
          id: this.detail.id,
          processType: 'XSCKD-001',
        }
        // 使用 ...params是为了 方便增加或者删除参加{ ...params,...{} }
        let apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salesshipmentSubmitApproval',
            data: { ...params },
            needNote: null
          },
          '审核通过': {
            api: 'seePsiSaleService.salesshipmentPassApproval',
            data: { ...params },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiSaleService.salesshipmentCancel',
            data: params,
            needNote: null
          },
          '驳回': {
            api: 'seePsiSaleService.salesshipmentReject',
            data: params,
            needNote: null
          },
          '合同完善': {
            api: 'seePsiSaleService.salesshipmentPassContractApproval',
            data: params,
            needNote: null
          },
          '删除': {
            api: 'seePsiSaleService.salesshipmentLogicDelete',
            data: params,
            needNote: null
          },
          '终止': {
            api: 'seePsiSaleService.salesshipmentPause',
            data: { shipmentCode: this.detail.shipmentCode },
            needNote: null
          }
        }
        // 公共方法 mixin 引进来的
        this.$submission(
          apiObj[label].api,
          apiObj[label].data,
          label,
          apiObj[label].needNote)
      }
    },
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiSaleService.salesshipmentGetInfoByCode({ shipmentCode: this.code })
        return data;
      }
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
