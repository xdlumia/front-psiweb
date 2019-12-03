/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-03 17:54:49
 * @Description: 销售换货单详情
*/
<template>
  <div>
    <side-detail
      :title="`销售换货单:${code}`"
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
          ref="detail"
          :params="{relationCode:code}"
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
    <!-- 退货单新增/编辑 -->
    <add
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      :rowData="rowData"
    />
    <!-- 换货扫码 -->
    <return-scan
      :visible.sync='scanVisible'
      :code="code"
      :rowData='rowData'
      from="exchange"
      @reload='$refs.table.reload()'
    />
  </div>
</template>
<script>
import detail from './details/detail' //详情
import add from '../return/add'
import returnScan from '../return/return-scan' // 退货扫码
import VisibleMixin from '@/utils/visibleMixin';
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
        { label: '提交审核', type: 'primary', authCode: '' },
        { label: '撤销审核', type: '', authCode: '' },
        { label: '审核通过', type: 'primary', authCode: '' },
        { label: '编辑', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
        { label: '驳回', authCode: '' },
        { label: '退货扫码', type: 'primary', authCode: '' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: 3,
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除'], // 新建
        '0': ['撤销审核', '审核通过', '驳回'], // 审核中
        '1': ['退货扫码'], // 待完成
        '2': ['退货扫码'], //部分完成
        '3': [], //已完成
        '4': ['提交审核', '编辑', '删除'], //已驳回
      },
      editVisible: false,
      scanVisible: false,
      // tab操作栏
      tabs: {
        detail: '详情',
        salesOutLibrary: '销售出库单',
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
    showPop: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', false)
      }
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiSaleService.salesalterationsheetGetInfoByCode({ code: this.code })
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑' || label == '退货扫码') {
        if (label == '编辑') { this.editVisible = true }
        else if (label == '退货扫码') { this.outLibAddVisible = true }
      } else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode,
          id: this.detail.id,
          processType: 'psi_sales_exchange_01',
        }
        let apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salesalterationsheetSubmitApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '审核通过': {
            api: 'seePsiSaleService.salesalterationsheetPassApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiSaleService.salesalterationsheetCancel',
            data: { ...params, ...{} },
            needNote: null
          },
          '驳回': {
            api: 'seePsiSaleService.salesalterationsheetReject',
            data: { ...params, ...{} },
            needNote: null
          },
          '删除': {
            api: 'seePsiSaleService.salesalterationsheetLogicDelete',
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
