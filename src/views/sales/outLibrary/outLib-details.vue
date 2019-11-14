/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-14 11:17:14
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <side-detail
      title="出库单详情"
      :visible.sync="showDetailPage"
      width="920px"
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
            v-if="currStatusType[rowData.state = 4 || -1].includes(item.label)"
            size="small"
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
    <exchangeAdd
      :visible.sync="exchangeAddVisible"
      :rowData="rowData"
      type="add"
      :params="{salesShipmentCode:rowData.shipmentCode}"
      :code="rowData.shipmentCode"
    />
    <returnAdd
      :visible.sync="returnAddVisible"
      :rowData="rowData"
      type="add"
      :params="{salesShipmentCode:rowData.shipmentCode}"
      :code="rowData.shipmentCode"
    />
  </div>
</template>
<script>
import add from './add' //销售出库单新增编辑
import returnAdd from '../return/add' //退货单新增
import exchangeAdd from '../exchange/add' //换货单新增

import detail from './outLibDetails/detail' //详情
import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
    detail,
    add,
    returnAdd,
    exchangeAdd
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
        { label: '合同完善追加合同附件', type: 'primary', authCode: '' },
        { label: '审核采购时间', type: 'primary', authCode: '' },
        { label: '收回合同', type: 'primary', authCode: '' },
        { label: '追加合同附件', type: 'primary', authCode: '' },
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      //头部状态数据
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '请购处理',
        '2': '回收合同',
        '3': '已通过',
        '4': '完成',
        '5': '已驳回',
        '6': '终止',
      },
      currStatus: 1,
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除', '生成合同'], // 新建
        '0': ['撤销审核', '审核通过', '驳回', '合同完善追加合同附件'], //审核中
        '1': ['审核采购时间', '追加合同附件'], //请购处理
        '2': ['收回合同', '追加合同附件'], //合同收回
        '3': ['终止', '生成退货单', '追加合同附件'], //已通过
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
      returnAddVisible: false,
      exchangeAddVisible: false,

    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    buttonsClick(label) {
      let labelObj = {
        '编辑': 'editVisible',
        '生成合同': 'editVisible',
        '追加合同附件': 'editVisible',
        '生成退货单': 'returnAddVisible',
        '生成换货单': 'exchangeAddVisible',
      }
      console.log(label);

      if (labelObj.hasOwnProperty(label)) {
        let visible = labelObj[label]
        this[visible] = true
      }
      // 需要二次确认操作
      else {
        let apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salesshipmentApproval',
            data: { isAgree: 1, busCode: this.detail.shipmentCode },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiSaleService.salesshipmentApproval',
            data: { isAgree: 0, busCode: this.detail.shipmentCode },
            needNote: null
          },
          '驳回': {
            api: 'seePsiSaleService.salesshipmentApproval',
            data: { busCode: this.detail.shipmentCode },
            needNote: null
          },
          '删除': {
            api: 'seePsiSaleService.salesshipmentLogicDelete',
            data: ({ id: this.detail.id }),
            needNote: null
          },
          '终止': {
            api: 'seePsiSaleService.salesshipmentPause',
            data: { busCode: this.detail.shipmentCode },
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
