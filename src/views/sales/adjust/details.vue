/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 10:16:27
 * @Description: 账单调整详情
*/
<template>
  <div>
    <side-detail
      :title="`账单调整详情: ${codeSlice(code)}`"
      :visible.sync="showDetailPage"
      width="920px"
      :status="statusArr"
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
          <!-- apprpvalState可能为0的情况 -->
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
        class="d-auto-y"
        style="height:calc(100vh - 150px)"
      >
        <!-- 账单调整 -->
        <bill-adjust
          disabled
          :data="detail"
        />
        <!-- 备注信息 -->
        <extras-info
          disabled
          :data="detail"
        />

      </el-form>
    </side-detail>
    <!-- 客户编辑 -->
    <add
      v-if="editVisible"
      :visible.sync="editVisible"
      :rowData="rowData"
      @reload="setEdit(),$reload()"
      type="edit"
      :code="rowData.adjustCode"
    />
  </div>
</template>
<script>

import add from './add' // 详情
import VisibleMixin from '@/utils/visibleMixin';

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
        { label: '账单调整申请', type: 'primary', authCode: 'psi_sales_adjust_04' },
        { label: '撤销审核', type: 'primary', authCode: 'psi_sales_adjust_07' },
        { label: '通过', type: 'primary', authCode: 'psi_sales_adjust_08' },
        { label: '驳回', type: '', authCode: 'psi_sales_adjust_09' },
        { label: '编辑', type: 'primary', authCode: 'psi_sales_adjust_05' },
        { label: '删除', type: 'danger', authCode: 'psi_sales_adjust_06' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */

      currStatusType: {
        '-1': ['账单调整申请', '编辑', '删除'], // 新建
        '0': ['撤销审核', '通过', '驳回'], // 审核中
        '1': [], // 已通过
        '2': ['账单调整申请', '编辑'] // 已驳回
      },
      // tab操作栏
      detail: {},
      form: {},
      editVisible: false,
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '已通过',
        '2': '已驳回'
      }
    }
  },
  computed: {
    statusArr() {
      if (!this.getDetail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.state] },
          { label: '调整金额', value: this.detail.adjustAmount },
          { label: '调整后金额', value: this.detail.adjustAfterAmount },
          { label: '实际付款金额', value: this.detail.factAmount },
          { label: '收款方', value: this.detail.companySettlementInfo }
        ];
      }
    }
  },
  methods: {
    async getDetail() {
      if (this.code) {
        const { data } = await this.$api.seePsiFinanceService.fbilladjustGetInfoByCode({ code: this.code })
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑') {
        if (label == '编辑') { this.editVisible = true }
      } else {
        const params = {
          apprpvalNode: this.detail.apprpvalNode,
          id: this.detail.id,
          processType: 'psi_sales_adjust_01'
        }
        const apiObj = {
          '账单调整申请': {
            api: 'seePsiFinanceService.fbilladjustSubmitApproval',
            data: { ...params, ...{ apprpvalNode: '' } },
            needNote: null
          },
          '通过': {
            api: 'seePsiFinanceService.fbilladjustPassApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiFinanceService.fbilladjustCancel',
            data: { ...params, ...{} },
            needNote: null
          },
          '驳回': {
            api: 'seePsiFinanceService.fbilladjustReject',
            data: { ...params, ...{} },
            needNote: true
          },
          '删除': {
            api: 'seePsiFinanceService.fbilladjustDelete',
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
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
