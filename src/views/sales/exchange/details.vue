/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-14 19:57:52
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
            @click="buttonsClick(item.label)"
            v-if="currStatusType[detail.state || 0].includes(item.label) && authorityButtons.includes(item.authCode)"
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
        v-if="form&&detail"
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
          :params="{relationCode:code}"
          :code="this.code"
          :rowData="detail"
          :data="detail || {}"
          class="d-auto-y"
          :button="false"
          style="height:calc(100vh - 170px) !important"
          :is="activeName"
        ></components>
      </el-form>
    </side-detail>
    <!-- 退货单新增/编辑 -->
    <add
      v-if="editVisible"
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      :rowData="detail"
    />
    <!-- 换货扫码 -->
    <return-scan
      :visible.sync='scanVisible'
      :code="code"
      :rowData='detail'
      from="exchange"
      @reload="setEdit(),$reload()"
    />
  </div>
</template>
<script>
import detail from './details/detail' //详情
import add from '../return/add'
import returnScan from '../return/return-scan' // 换货扫码
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
        { label: '提交审核', type: 'primary', authCode: 'psi_sales_exchange_03' },
        { label: '撤销审核', type: '', authCode: 'psi_sales_exchange_06' },
        { label: '审核通过', type: 'primary', authCode: 'psi_sales_exchange_07' },
        { label: '编辑', type: 'primary', authCode: 'psi_sales_exchange_04' },
        { label: '删除', type: 'danger', authCode: 'psi_sales_exchange_05' },
        { label: '驳回', authCode: 'psi_sales_exchange_08' },
        { label: '换货扫码', type: 'primary', authCode: 'psi_sales_exchange_09' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: 3,
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除'], // 新建
        '0': ['撤销审核', '审核通过', '驳回'], // 审核中
        '1': ['换货扫码'], // 待完成
        '2': ['换货扫码'], //部分完成
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
        let { data } = await this.$api.seePsiSaleService.salesexchangeGetInfoByCode({ code: this.code })
        data.shipmentFinanceSaveVoList = data.shipmentFinanceEntityList
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑' || label == '换货扫码') {
        if (label == '编辑') { this.editVisible = true }
        else if (label == '换货扫码') { this.scanVisible = true }
      } else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode,
          id: this.detail.id,
          processType: 'psi_sales_exchange_01',
        }
        let apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salesexchangeSubmitApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '审核通过': {
            api: 'seePsiSaleService.salesexchangePassApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiSaleService.salesexchangeCancel',
            data: { ...params, ...{} },
            needNote: null
          },
          '驳回': {
            api: 'seePsiSaleService.salesexchangeReject',
            data: { ...params, ...{} },
            needNote: null
          },
          '删除': {
            api: 'seePsiSaleService.salesexchangeLogicDelete',
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
