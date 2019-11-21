/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 10:20:02
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <side-detail
      title="销售退货单"
      :visible.sync="showDetailPage"
      width="920px"
      :status="status"
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
        <!-- 单据信息 -->
        <receipt-info
          disabled
          :data="detail"
        />

        <!-- 其他费用 -->
        <other-fee
          disabled
          :data="detail"
        />

      </el-form>
    </side-detail>
    <!-- 退货单新增/编辑 -->
    <add
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      :rowData="rowData"
    />
  </div>
</template>
<script>
import add from './add' // 新增退货单
import VisibleMixin from '@/utils/visibleMixin';
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  components: {
    add
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '收款单匹配', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
      ],
      editVisible: false,
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: 3, // 当前数据状态
      currStatusType: {
        '-1': ['删除', '收款单匹配'], // 未匹配
        '0': [], // 已匹配
        '1': ['收款单匹配'], // 部分匹配
        '2': ['删除', '收款单匹配'], //未匹配
        '3': ['删除'], //未匹配借
      },
    }
  },

  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiFinanceService.revenuerecordGetInfoByCode({ code: this.code })
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑' || label == '退货扫码') {
        if (label == '编辑') { this.editVisible = true }
        else if (label == '退货扫码') { this.outLibAddVisible = true }
      } else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode || 'XSHHD-001',
          id: this.detail.id,
          processType: 'XSTHD-001',//报价单的权限吗
        }
        let apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salesreturnedSubmitApproval',
            data: { ...params },
            needNote: null
          },
          '审核通过': {
            api: 'seePsiSaleService.salesreturnedPassApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiSaleService.salesreturnedCancel',
            data: { ...params, ...{} },
            needNote: null
          },
          '驳回': {
            api: 'seePsiSaleService.salesreturnedReject',
            data: { ...params, ...{} },
            needNote: null
          },
          '删除': {
            api: 'seePsiSaleService.salesreturnedLogicDelete',
            data: { ...params, ...{} },
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
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
