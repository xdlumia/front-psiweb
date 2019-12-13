/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 19:00:26
 * @Description: 详情
<template>
  <div>
    <side-detail
      :title="`借款单编号:${code}`"
      :visible.sync="showDetailPage"
      width="920px"
      :status="statusArr"
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
            v-if="currStatusType[detail.state|| 0].includes(item.label) && authorityButtons.includes(item.authCode)"
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
        style="height:calc(100vh - 140px) !important"
      >
        <!-- 单据信息 -->
        <receipt-borrow-info
          disabled
          :data="detail"
        />
        <!-- 还款记录 -->
        <repayment-history
          :params="{
          limit: 20,
          page: 1,
          borrowingCode: this.rowData.borrowingCode, //借款单编号
        }"
          :data="detail"
        />
      </el-form>
    </side-detail>
    <!-- 还款 -->
    <addRefund
      :rowData="detail||{}"
      type="add"
      :visible.sync="receivableVisible"
      @reload="setEdit(),$reload()"
    ></addRefund>
  </div>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import addRefund from './add-refund'; //还款
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  components: {
    addRefund
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '还款', type: 'primary', authCode: 'psi_borrow_1004' },
        { label: '删除', type: 'danger', authCode: 'psi_borrow_1003' },
      ],
      // 收款单匹配
      receivableVisible: false,
      // 状态功能按钮
      currStatusType: {
        '0': ['删除', '还款'], // 未还清
        '1': ['删除'], // 已还清
      },
      stateText: { 0: '未还清', 1: '已还清' }
    }
  },

  computed: {
    statusArr() {
      if (!this.getDetail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.state] },
          { label: '借款人', value: this.detail.borrower },
          { label: '借款金额(元)', value: this.detail.borrowingAmount },
          { label: '借款日期', value: this.detail.borrowTime, isTime: true },
          { label: '结算账户', value: this.detail.companySettlementInfo }
        ];
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiFinanceService.fborrowingGetInfoByCode({ code: this.code })
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '还款') {
        this.receivableVisible = true
      } else {
        let apiObj = {
          '删除': {
            api: 'seePsiFinanceService.fborrowingDelete',
            data: { id: this.detail.id },
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
