/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-03 17:06:56
 * @Description: 财务-收入流水详情
<template>
  <div>
    <side-detail
      :title="`流水编号:${code}`"
      :visible.sync="showDetailPage"
      width="920px"
      :status="statusArr"
      @close="close"
    >
      <div class="drawer-header">
        <!-- 操作按钮 -->
        <span
          v-for="(item,index) of buttons"
          :key="index"
        >
          <!-- detail.state 没有值得情况下会报错 detail.state也有可能为0 所以容错处理这里 必须是0   -->
          <el-button
            class="mr10"
            @click="buttonsClick(item.label)"
            v-if="currStatusType[detail.state|| 0].includes(item.label)"
            size="mini"
            :type="item.type"
          >{{item.label}}</el-button>
        </span>

      </div>
      <el-form
        ref="form"
        :model="form"
        size="mini"
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
          v-if="Object.keys(detail).length"
          ref="detail"
          :code="code"
          :rowData="rowData"
          :data="detail || {}"
          class="d-auto-y"
          :params="{relationCode:code}"
          :button="false"
          style="height:calc(100vh - 200px)"
          :is="activeName"
        ></components>
      </el-form>
    </side-detail>
    <!-- 开票申请 -->
    <collectInvoice
      :visible.sync="editVisible"
      :rowData="rowData"
      type="edit"
      :invoiceType="0"
    />

  </div>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import detail from './details/detail' //详情
import collectInvoice from './collect-invoice' //详情
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  props: ['id'],
  components: {
    detail,
    collectInvoice
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: '' },
        { label: '撤销审核', type: '', authCode: '' },
        { label: '编辑', type: 'primary', authCode: '' },
        { label: '通过', type: 'primary', authCode: '' },
        { label: '驳回', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
      ],
      // 状态功能按钮
      currStatusType: {
        '-1': ['提交审核', '删除', '编辑'], // 新建
        '0': ['撤销审核', '通过', '驳回'], // 审核中
        '1': ['提交审核', '删除', '编辑'], //已驳回
        '2': [], //已收票
      },
      // tab操作栏
      tabs: {
        detail: '详情',
        financePayable: '应付账单',
        orderStorage: '采购入库单',
        financeFee: '费用单',
      },
      activeName: 'detail',
      editVisible: false,
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '已驳回',
        '2': '已收票',
      }
    }
  },

  computed: {
    statusArr() {
      if (!this.getDetail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.state] },
          { label: '发票类型', value: this.detail.invoiceTypeCode, dictName: 'CW_FP_LX' },
          { label: '商品金额(元)', value: this.detail.commodityTotalAmount },
          { label: '收票金额', value: this.detail.invoiceAmount },
          { label: '销售方名称', value: this.detail.marketName }
        ];
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    async getDetail() {
      if (this.id) {
        let { data } = await this.$api.seePsiFinanceService.finvoicereceivableInfo(null, this.rowData.id)
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑') {
        this.editVisible = true
      } else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode,
          id: this.detail.id,
          processType: 'psi_receipt'
        }
        let apiObj = {
          '提交审核': {
            api: 'seePsiFinanceService.finvoicereceivableSubmitApproval',
            data: { ...params },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiFinanceService.finvoicereceivableCancel',
            data: { ...params },
            needNote: null
          },
          '通过': {
            api: 'seePsiFinanceService.finvoicereceivablPassApproval',
            data: { busCode: this.detail.shipmentCode },
            needNote: null
          },
          '驳回': {
            api: 'seePsiFinanceService.finvoicereceivableReject',
            data: { busCode: this.detail.shipmentCode },
            needNote: null
          },
          '删除': {
            api: 'seePsiFinanceService.finvoicereceivableDelete',
            data: ({ id: this.detail.id }),
            needNote: null
          },

        }
        // 公共方法 mixin 引进来的
        this.$submission(
          apiObj[label].api,
          apiObj[label].data,
          label,
          apiObj[label].needNote)
      }
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
