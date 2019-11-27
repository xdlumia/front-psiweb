/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-27 18:48:16
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
          <el-button
            class="mr10"
            @click="buttonsClick(item.label)"
            v-if="currStatusType[detail.approvalState || -1].includes(item.label)"
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
          :code="code"
          :rowData="rowData"
          :data="detail || {}"
          class="d-auto-y"
          :params="{}"
          :button="false"
          style="height:calc(100vh - 200px)"
          :is="activeName"
        ></components>

      </el-form>
    </side-detail>
    <!-- 客户编辑 -->
    <add
      v-if="editVisible"
      adjustPriceType='1'
      :visible.sync="editVisible"
      @reload="setEdit(),getDetail()"
      :rowData="rowData"
      type="edit"
      :params="{relationCode:code}"
      :code="rowData.shipmentCode"
    />
  </div>
</template>
<script>

import detail from './details/detail' //详情
import add from '@/views/order/price/edit.vue' //新增
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
        { label: '撤销审核', type: 'primary', authCode: '' },
        { label: '通过', type: 'primary', authCode: '' },
        { label: '驳回', type: 'danger', authCode: '' },
        { label: '编辑', type: '', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */

      currStatusType: {
        '-1': ['提交审核', '编辑', '删除'], //  // 新建
        '0': ['撤销审核', '通过', '驳回'], // 审核中
        '1': [], // 已通过
      },
      // tab操作栏
      tabs: {
        detail: '详情',
      },
      activeName: 'detail',
      form: {},
      editVisible: false,
    }
  },
  computed: {

  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiCommonService.commonadjustpriceInfoByCode(null, this.code)
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑') {
        if (label == '编辑') { this.editVisible = true }
      } else {
        let params = {
          apprpvalNode: this.detail.apprpvalNode,
          id: this.detail.id,
          processType: 'psi_adjustPrice_1003',
        }
        let apiObj = {
          '提交审核': {
            api: 'seePsiCommonService.commonadjustpriceSubmitApproval',
            data: { ...params },
            needNote: null
          },
          '通过': {
            api: 'seePsiCommonService.commonadjustpricePassApproval',
            data: { ...params, ...{} },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiCommonService.commonadjustpriceCancel',
            data: { ...params, ...{} },
            needNote: null
          },
          '驳回': {
            api: 'seePsiCommonService.commonadjustpriceReject',
            data: { ...params, ...{} },
            needNote: null
          },
          '删除': {
            api: 'seePsiCommonService.commonadjustpriceLogicDelete',
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
