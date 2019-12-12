/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 09:31:58
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <side-detail
      :title="`销售退货单: ${code}`"
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
          <!-- detail.state 没有值得情况下会报错 detail.state也有可能为0 所以容错处理这里 必须是0   -->
          <el-button
            class="mr10"
            @click="buttonsClick(item.label)"
            v-if="currStatusType[detail.state|| 0].includes(item.label) && authorityButtons.includes(item.authCode)"
            size="mini"
            :type="item.type"
          >{{item.label}}</el-button>
        </span>

      </div>
      <!-- 客户信息 -->

      <el-form
        ref="form"
        size="mini"
        label-position="top"
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
          ref="detail"
          :code="code"
          :rowData="rowData"
          :data="detail || {}"
          class="d-auto-y"
          :params="{relationCode:code}"
          :button="false"
          style="height:calc(100vh - 170px) !important"
          :is="activeName"
        />

      </el-form>
    </side-detail>
    <!-- 退货单新增/编辑 -->
    <add
      v-if="editVisible"
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      :rowData="rowData"
    />
    <!-- 退货扫码 -->
    <return-scan
      v-if="scanVisible"
      :visible.sync='scanVisible'
      :code="code"
      :rowData='rowData'
      from="return"
      @reload="setEdit(),$reload()"
    />
  </div>
</template>
<script>
import detail from './details/detail' //详情
import add from './add' // 新增退货单
import returnScan from './return-scan' // 退货扫码
import VisibleMixin from '@/utils/visibleMixin';
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  components: {
    detail,
    add,
    returnScan
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: 'psi_sales_return_03' },
        { label: '撤销审核', type: '', authCode: 'psi_sales_return_06' },
        { label: '审核通过', type: 'primary', authCode: 'psi_sales_return_07' },
        { label: '编辑', type: 'primary', authCode: 'psi_sales_return_04' },
        { label: '删除', type: 'danger', authCode: 'psi_sales_return_05' },
        { label: '驳回', authCode: 'psi_sales_return_08' },
        { label: '退货扫码', type: 'primary', authCode: 'psi_sales_return_09' }
      ],
      // 编辑
      editVisible: false,
      // 退货扫码
      scanVisible: false,
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: 3, // 当前数据状态
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除'], // 新建
        '0': ['撤销审核', '审核通过', '驳回'], // 审核中
        '1': ['退货扫码'], // 待完成
        '2': ['退货扫码'], //部分完成
        '3': [], //已完成
        '4': ['提交审核', '编辑', '删除'], //已驳回
      },


      // tabs 切换操作栏
      tabs: {
        detail: '详情',
        salesOutLibrary: '销售出库单'
      },
      activeName: 'detail',
      form: {},
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '待完成',
        '2': '部分完成',
        '3': '已完成',
        '4': '已驳回',
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
        let { data } = await this.$api.seePsiSaleService.salesreturnedGetInfoByCode({ code: this.code })
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑' || label == '退货扫码') {
        if (label == '编辑') { this.editVisible = true }
        else if (label == '退货扫码') { this.scanVisible = true }
      } else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode,
          id: this.detail.id,
          processType: 'psi_sales_return_01',
        }
        let apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salesreturnedSubmitApproval',
            data: { ...params },
            needNote: null
          },
          '审核通过': {
            api: 'seePsiSaleService.salesreturnedPassApproval',
            data: { ...params },
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
