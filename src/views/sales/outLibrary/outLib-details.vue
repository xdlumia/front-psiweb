/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-07 17:36:55
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
      <div
        slot="button"
        v-if="Object.keys(detail).length"
      >
        <!-- 操作按钮 -->
        <span
          v-for="(item,index) of buttons"
          :key="index"
        >
          <el-button
            class="mr10"
            :disabled="isDisabledButton(item.label)"
            @click="buttonsClick(item.label)"
            v-if="isShowButton(item.label)"
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
          :params="activeName == 'contractSale'? {shipmentCode:code}:{relationCode:code}"
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
      v-if="editVisible"
      :visible.sync="editVisible"
      :rowData="detail"
      type="edit"
      :params="{salesShipmentCode:code}"
      :code="code"
    />
    <!-- 生成合同 -->
    <addContract
      :visible.sync="addContractVisible"
      :rowData="detail"
      type="addContract"
      :params="{salesShipmentCode:code}"
      :code="code"
    />
    <!-- 追加合同 -->
    <addContract
      :visible.sync="editContractVisible"
      :rowData="detail"
      type="editContract"
      :params="{salesShipmentCode:code}"
      :code="code"
      @reload="setEdit(),$reload()"
    />
    <!-- 生成换货单 -->
    <exchangeAdd
      v-if="exchangeAddVisible"
      :visible.sync="exchangeAddVisible"
      :rowData="detail"
      type="add"
      :params="{salesShipmentCode:code}"
      :code="code"
      @reload="setEdit(),$reload()"
    />
    <!-- 生成退货单 -->
    <returnAdd
      v-if="returnAddVisible"
      :visible.sync="returnAddVisible"
      :rowData="detail"
      type="add"
      :params="{salesShipmentCode:code}"
      :code="code"
      @reload="setEdit(),$reload()"
    />
    <!-- 开票申请 -->
    <collectInvoice
      :visible.sync="collectInvoiceVisible"
      :rowData="collectInvoiceData"
      :invoiceType="0"
      :code="code"
      @reload="setEdit(),$reload()"
    />
    <!-- 采购审核时间 -->
    <approvalTime
      :visible.sync="timeApprovalVisible"
      :rowData="detail"
      @reload="setEdit(),$reload()"
    >
    </approvalTime>
  </div>
</template>
<script>
import add from './add' //销售出库单新增编辑
import addContract from './add-contract' //合同新增

import returnAdd from '../return/add' //退货单新增
import exchangeAdd from '../exchange/add' //换货单新增
import collectInvoice from '@/views/finance/receipt/collect-invoice' //开票申请
import approvalTime from './approvalTime' //审核采购时间

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
    collectInvoice,
    approvalTime
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
        { label: '合同收回', type: 'primary', authCode: '' },
        { label: '追加合同附件', type: 'primary', authCode: '' },
      ],
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '请购处理',
        '2': '回收合同',
        '3': '已通过',
        '4': '完成',
        '5': '驳回',
        '6': '终止',
      },
      /**
       * 根据当前状态判断显示哪些按钮
       */
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除', '生成合同'], // 新建
        '0': ['撤销审核', '审核通过', '驳回', '合同完善', '追加合同附件'], //审核中
        '1': ['审核采购时间', '追加合同附件'], //请购处理
        '2': ['合同收回', '追加合同附件'], //合同收回
        '3': ['终止', '生成退货单', '生成换货单', '追加合同附件'], //已通过
        '4': ['生成退货单', '生成换货单', '开票申请', '追加合同附件'], //已完成
        '5': ['提交审核', '编辑', '删除', '编辑合同'], //已驳回
        '6': ['生成退货单'] //已终止
      },
      // tabs 组件名称对应的label名称
      //1
      tabs: {
        detail: '详情',
        salesQuote: '报价单',
        contractSale: '合同',
        salesReturn: '销售退货单',
        salesExchange: '销售换货单',
        financeReceivable: '应收账单',
        financeBilling: '发票记录',
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
      timeApprovalVisible: false, //审核采购时间
      collectInvoiceData: {},

    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 判断禁用的按钮
    isDisabledButton(label) {
      // 采购预计到货时间为空 禁用采购审核时间
      if (label == '审核采购时间' && !this.detail.procurementExpectedArrivalTime) {
        return true
      } else if (label == '编辑合同' && this.detail.isContract) {
        return true
      } else {
        return false
      }
    },
    // 判断显示的按钮
    isShowButton(label) {
      let state = this.detail.state || 0
      let nodes = (this.detail.apprpvalNode || '').split(',')
      if (state == 0 && label == '审核通过') {
        // 如果 节点里有07 不显示审核通过
        return !nodes.includes('psi_sales_outlibrary_07')
      } else if (state == 0 && label == '合同完善') {
        // 如果 节点里有10 不显示合同完善
        return !nodes.includes('psi_sales_outlibrary_10')
      } else {
        return this.currStatusType[state].includes(label)
      }

    },
    async buttonsClick(label) {
      // 需要弹出操作功能
      let labelObj = {
        '编辑': 'editVisible',
        '生成合同': 'addContractVisible',
        '追加合同附件': 'editContractVisible',
        '生成退货单': 'returnAddVisible',
        '生成换货单': 'exchangeAddVisible',
        '开票申请': 'collectInvoiceVisible',
        '审核采购时间': 'timeApprovalVisible'
      }
      // 需要弹出操作的功能
      if (labelObj.hasOwnProperty(label)) {
        if (label == '生成退货单' || label == '生成换货单') {
          // 退换货的时候判断是否生成票据.如果已经生成不能再退货换货
          let { data } = await this.$api.seePsiFinanceService.finvoiceIsFinvoice({ busCode: this.code })
          if (data == true) {
            this.$message({
              message: `已经生成票据不能${label}`,
              type: 'error',
              showClose: true,
            });
            return
          }
        }
        if (label == '开票申请') {
          // 收集
          this.collectInvoiceData = {
            type: 0,
            busCode: this.detail.putinCode,
            busType: 0,
            purchaseId: this.detail.clientId,
            purchaseType: 0,
            marketId: this.detail.companySettlementId,
            marketType: 3,
            invoiceDetailList: []
              .concat(
                this.detail.commodityEntityList || [],
                this.detail.additionalCommodityList || []
              )
              .map(item => {
                return {
                  articleName: item.goodsName,
                  commodityCode: item.commodityCode,
                  isOrder: 1,
                  type: 0,
                  taxRate: item.taxRate,
                  price: item.reference,
                  quantity: item.commodityNumber
                };
              })
          };
        }
        let visible = labelObj[label]
        this[visible] = true
      }
      // 需要二次确认操作
      else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode, //数据里没值. 所以下写死
          id: this.detail.id,
          processType: 'psi_sales_outlibrary_01',
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
            data: { ...params, apprpvalNode: 'psi_sales_outlibrary_07' },
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
            needNote: true
          },
          '合同完善': {
            api: 'seePsiSaleService.salesshipmentPassContractApproval',
            data: { ...params, apprpvalNode: 'psi_sales_outlibrary_10' },
            needNote: null
          },
          '合同收回': {
            api: 'seePsiSaleService.salesshipmentWithdrawApproval',
            data: { ...params, apprpvalNode: 'psi_sales_outlibrary_13' },
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
