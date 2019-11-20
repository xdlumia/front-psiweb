/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-20 18:08:32
 * @Description: 账单调整详情
*/
<template>
  <div>
    <side-detail
      title="账单调整详情"
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
          <!-- apprpvalState可能为0的情况 -->
          <el-button
            class="mr10"
            @click="buttonsClick(item.label)"
            v-if="currStatusType[detail.apprpvalState || 0].includes(item.label)"
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
      :visible.sync="editVisible"
      :rowData="rowData"
      type="edit"
      :code="rowData.adjustCode"
    />
  </div>
</template>
<script>

import add from './add' //详情
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
        { label: '调整申请', type: 'primary', authCode: '' },
        { label: '撤销审核', type: 'primary', authCode: '' },
        { label: '通过', type: 'primary', authCode: '' },
        { label: '驳回', type: 'primary', authCode: '' },
        { label: '编辑', type: '', authCode: '' },
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */

      currStatusType: {
        '-1': ['调整申请'], // 新建
        '0': ['撤销审核', '通过', '驳回'], // 审核中
        '1': [], // 已通过
        '2': ['调整申请', '编辑'], // 已驳回
      },
      // tab操作栏
      detail: {},
      form: {},
      editVisible: false,
    }
  },
  computed: {

  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiFinanceService.fbilladjustGetInfoByCode({ code: this.code })
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
          processType: 'TTZD-001',//报价单的权限吗
        }
        let apiObj = {
          '调整申请': {
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
            needNote: null
          },
          '删除': {
            api: 'seePsiFinanceService.fbilladjustLogicDelete',
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
