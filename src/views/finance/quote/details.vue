/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-14 18:13:07
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
        <el-tabs
          v-model="activeName"
          type="card"
        >
          <el-tab-pane
            v-for="(item,index) of tabs"
            :key="index"
            :label="item.label"
            :name="item.comp"
          >
            <components
              ref="detail"
              :code="code"
              :rowData="rowData"
              :data="detail || {}"
              class="d-auto-y"
              :params="item.params"
              :button="false"
              style="height:calc(100vh - 200px)"
              :is="activeName"
            />
          </el-tab-pane>
        </el-tabs>

      </el-form>
    </side-detail>
    <!-- 退货单新增/编辑 -->
    <add
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      @reload="setEdit(),$reload()"
      :rowData="rowData"
    />
  </div>
</template>
<script>
import detail from './details/detail' //详情
import add from './add' // 新增退货单
import VisibleMixin from '@/utils/visibleMixin';
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  components: {
    detail,
    add
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: '' },
        { label: '撤销审核', type: '', authCode: '' },
        { label: '审核通过', type: 'primary', authCode: '' },
        { label: '编辑', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
        { label: '驳回', authCode: '' },
        { label: '退货扫码', type: 'primary', authCode: '' }
      ],
      editVisible: false,
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
      tabs: [
        { label: '详情', comp: 'detail' },
        { label: '销售出库单', comp: 'salesOutLibrary', params: { shipmentCode: this.rowData.shipmentCode } },
      ],
      activeName: 'detail',
      form: {},
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
            needNote: true
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
