/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-07 21:06:00
 * @Description: 报价单详情
*/
<template>
  <div>
    <side-detail
      :title="`报价单详情: ${codeSlice(code)}`"
      :visible.sync="showDetailPage"
      width="920px"
      :status="status"
      @close="close"
      v-loading="loading"
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
            v-if="currStatusType[detail.state || 0].includes(item.label) && authorityButtons.includes(item.authCode)"
            size="mini"
            :type="item.type"
          >{{item.label}}</el-button>
        </span>
        <el-button
          size="mini"
          class="mr10"
          type="primary"
          @click="showPrint=true"
        >打印</el-button>

      </div>
      <el-form
        ref="form"
        :model="form"
        size="mini"
        label-position="top"
        class="hide-form-error"
      >
        <el-tabs v-model="activeName">
          <el-tab-pane
            v-for="(val,key) of tabs"
            :key="key"
            :label="val"
            :name="key"
          >
          </el-tab-pane>
        </el-tabs>

        <components
          class="d-auto-y"
          :code="this.code"
          :rowData="detail"
          :button="false"
          :data="detail || {}"
          :params="activeName=='operationRecord'?{businessType:'20'}:{relationCode:code}"
          style="height:calc(100vh - 170px) !important"
          :is="activeName"
        ></components>

      </el-form>
    </side-detail>
    <!-- 报价单编辑 -->
    <add
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      :rowData="detail"
      @reload="setEdit(),$reload()"
    />
    <!-- 生成销售出库单 -->
    <outLibAdd
      v-if="outLibAddVisible"
      :visible.sync="outLibAddVisible"
      type="add"
      :rowData="detail"
      @reload="setEdit(),$reload()"
    />
    <!-- 生成请购单 -->
    <buyingAdd
      :visible.sync="buyingAddVisible"
      :params="{quotationCode:detail.quotationCode}"
      type="add"
      :rowData="detail"
      @reload="setEdit(),$reload()"
      v-if="buyingAddVisible"
    />
    <printPdf
      :rowData="detail"
      :visible.sync="showPrint"
      v-if="showPrint"
    />
  </div>
</template>
<script>
import detail from './quoteDetails/detail' // 详情
import add from './add' // 编辑
import outLibAdd from '../outLibrary/add' // 生成出库单
import buyingAdd from './add-buying' // 生成请购单
import VisibleMixin from '@/utils/visibleMixin';
import printPdf from './pdf'

export default {
  mixins: [VisibleMixin],
  components: {
    detail,
    add,
    outLibAdd,
    buyingAdd,
    printPdf
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: 'psi_sales_quote_06' },
        { label: '撤销审核', type: 'danger', authCode: 'psi_sales_quote_09' },
        { label: '审核通过', type: 'primary', authCode: 'psi_sales_quote_10' },
        { label: '编辑', type: 'primary', authCode: 'psi_sales_quote_07' },
        { label: '删除', type: 'danger', authCode: 'psi_sales_quote_08' },
        { label: '驳回', authCode: 'psi_sales_quote_11' },
        { label: '生成销售出库单', type: 'primary', authCode: 'psi_sales_quote_12' },
        { label: '生成请购单', type: 'primary', authCode: 'psi_sales_quote_13' },
        { label: '生成附加发票账单', type: 'primary', authCode: 'psi_sales_quote_16' },
        { label: '终止', authCode: 'psi_sales_quote_14' }
      ],
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '已通过',
        '2': '已驳回',
        '3': '完成',
        '4': '已终止'
      },
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: 1,  //this.detail.state//当前状态
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除'], // 新建 -1
        '0': ['撤销审核', '审核通过', '驳回'], // 审核中
        '1': ['生成销售出库单', '生成请购单', '终止'], // 已通过
        '2': ['提交审核', '编辑', '删除'], // 已驳回
        '3': ['生成附加发票账单'], // 完成
        '4': [] // 终止
      },
      editVisible: false, // 销售单编辑
      outLibAddVisible: false, // 生成销售出库单
      buyingAddVisible: false, // 生成请购单

      // tab操作栏
      tabs: {
        detail: '详情',
        salesOutLibrary: '销售出库单',
        orderBuying: '请购单',
        operationRecord: '操作记录'
      },
      activeName: 'detail',
      showPrint: false
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
  },
  methods: {
    async getDetail() {
      if (this.code) {
        const { data } = await this.$api.seePsiSaleService.salesquotationGetinfoByCode({ quotationCode: this.code })
        data.commodityEntityList.map(item => {
          item.children = item.partsInfoCommodityList
        })
        data.isTax = data.isTax || 0
        return data;
      }
    },
    formatDate(value) {
      let date = new Date(value) || new Date;
      return +new Date(date.toLocaleString('zh-cn', { hour12: false }).match(/(\d{4}\/\d{1,2}\/\d{1,2})/)[1])
    },
    // 判断禁用的按钮
    isDisabledButton(label) {
      let nowData = this.formatDate(Date.serversDate().getTime()) //服务器当前时间
      // let nowData = new Date().getTime() //当前时间
      let failureTime = this.formatDate(this.detail.failureTime) //报价单有效期截止
      /**
       * isPurchaseApply 是否存在请购单
       * shipmentCode 出库单
       */
      if (label == '生成请购单') {
        if ((this.detail.isPurchaseApply != '' && this.detail.isPurchaseApply != null && this.detail.isPurchaseApply != 0) || this.detail.shipmentCode || nowData > failureTime) {
          return true
        } else {
          return false
        }
      } else if (label == '生成销售出库单') {
        if (this.detail.shipmentCode || nowData > failureTime) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    buttonsClick(label) {
      // 需要弹出操作功能
      if (label == '编辑' || label == '生成销售出库单' || label == '生成请购单') {
        if (label == '编辑') { this.editVisible = true } else if (label == '生成销售出库单') { this.outLibAddVisible = true } else if (label == '生成请购单') { this.checkAddBuying() }
      } else {
        // 接口参数
        const params = {
          apprpvalNode: this.detail.apprpvalNode,
          id: this.detail.id,
          processType: 'psi_sales_quote_01' // 报价单的权限吗
        }
        // 操作接口
        const apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salesquotationSubmitApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '审核通过': {
            api: 'seePsiSaleService.salesquotationPassApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiSaleService.salesquotationCancel',
            data: params,
            needNote: null
          },
          '生成附加发票账单': {
            api: 'seePsiSaleService.salesquotationSaveAdditionalInvoiceFbill',
            data: { id: this.detail.id },
            needNote: null
          },
          '驳回': {
            api: 'seePsiSaleService.salesquotationReject',
            data: params,
            needNote: true
          },
          '删除': {
            api: 'seePsiSaleService.salesquotationLogicDelete',
            data: ({ id: this.detail.id }),
            needNote: null
          },
          '终止': {
            api: 'seePsiSaleService.salesquotationPause',
            data: params,
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
    checkAddBuying() {
      const buyingGoods = this.detail.commodityEntityList.filter(item => item.inventoryNumber < item.commodityNumber)
      if (buyingGoods.length > 0) {
        if (buyingGoods.filter(item => item.isDirect != 1).length > 0) {
          this.buyingAddVisible = true
        } else {
          this.$message({
            message: '直发商品不能申请请购',
            showClose: true,
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '库存充沛，不能申请采购',
          showClose: true,
          type: 'warning'
        })
      }
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
