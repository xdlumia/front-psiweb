/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 20:11:56
 * @Description: 费用分摊单详情
*/
<template>
  <div>
    <side-detail
      :title="`费用分摊单详情: ${code}`"
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
          :params="activeName=='financeFee'?{costCode:detail.costCode}:{relationCode:code}"
          :button="false"
          style="height:calc(100vh - 170px) !important"
          :is="activeName"
        />
      </el-form>
    </side-detail>
    <!-- 客户编辑 -->
    <add
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      :rowData="rowData"
    />
  </div>
</template>
<script>

import detailDetail from './details/detail' //详情
import add from './add' //新增
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    detailDetail,
    add
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: 'psi_sales_apportion_04' },
        { label: '编辑', type: 'primary', authCode: 'psi_sales_apportion_05' },
        { label: '删除', type: 'danger', authCode: 'psi_sales_apportion_06' },
        { label: '撤销审核', type: 'primary', authCode: 'psi_sales_apportion_07' },
        { label: '通过', type: 'primary', authCode: 'psi_sales_apportion_09' },
        { label: '驳回', type: '', authCode: 'psi_sales_apportion_08' },
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除'], // 新建
        '0': ['撤销审核', '通过', '驳回'], // 审核中
        '1': [], // 已分摊
      },
      // tab操作栏
      tabs: {
        detailDetail: '详情',
        financeFee: '费用单',
        salesOutLibrary: '销售出库单',
      },
      activeName: 'detailDetail',
      form: {},
      editVisible: false,
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '已分摊',
      },
    }
  },
  computed: {

  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiSaleService.salescostapportionGetInfoByCode({ code: this.code })
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑') {
        if (label == '编辑') { this.editVisible = true }
      } else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode || 'XSHHD-001',
          id: this.detail.id,
          processType: 'psi_sales_apportion_01',
        }
        let apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salescostapportionSubmitApproval',
            data: { ...params },
            needNote: null
          },
          '通过': {
            api: 'seePsiSaleService.salescostapportionPassApproval',
            data: { ...params },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiSaleService.salescostapportionCancel',
            data: { ...params, ...{} },
            needNote: null
          },
          '驳回': {
            api: 'seePsiSaleService.salescostapportionReject',
            data: { ...params, ...{} },
            needNote: this.detail.apprpvalNode || true
          },
          '删除': {
            api: 'seePsiSaleService.salescostapportionLogicDelete',
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
