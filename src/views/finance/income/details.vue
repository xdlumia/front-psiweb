/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 11:40:29
 * @Description: 财务-收入流水详情
<template>
  <div>
    <side-detail
      :title="`流水编号:${codeSlice(code)}`"
      :visible.sync="showDetailPage"
      width="920px"
      @close="close"
    >
      <div
        class="drawer-header"
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
            v-if="currStatusType[detail.matchState|| 0].includes(item.label) && authorityButtons.includes(item.authCode)"
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
        style="height:calc(100vh - 120px) !important"
      >
        <!-- 单据信息 -->
        <receipt-info
          disabled
          :span="12"
          incomeType="0"
          :data="detail"
        />

        <!-- 其他费用 -->
        <other-fee
          disabled
          :data="detail"
        />

        <!-- 备注信息 其他信息-->
        <extras-info
          disabled
          :data="detail"
        />
        <!-- 账单匹配详情 -->
        <match-bill-detail
          disabled
          :data="detail.fBillEntityList || []"
        />
        <!-- 操作记录 -->
        <bill-history
          disabled
          :data="rowData || {}"
        />
      </el-form>
    </side-detail>
    <!-- 账单匹配 -->
    <receivableMatch
      :rowData="rowData"
      :visible.sync="receivableVisible"
      @reload="$emit('reload')"
    ></receivableMatch>
  </div>
</template>
<script>
import add from './add' // 新增退货单
import VisibleMixin from '@/utils/visibleMixin';
import receivableMatch from './receivable-match'; //账单匹配
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  components: {
    add,
    receivableMatch
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '收款单匹配', type: 'primary', authCode: 'psi_income_1005' },
        { label: '删除', type: 'danger', authCode: 'psi_income_1004' },
      ],
      // 收款单匹配
      receivableVisible: false,
      // 状态功能按钮
      currStatusType: {
        '0': ['删除', '收款单匹配'], // 未匹配
        '1': ['收款单匹配'], // 部分匹配
        '2': [], // 已匹配
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
      if (label == '收款单匹配') {
        this.receivableVisible = true
      } else {
        let params = {
          id: this.detail.id,
          processType: 'XSTHD-001',//报价单的权限吗
        }
        let apiObj = {
          '删除': {
            api: 'seePsiFinanceService.revenuerecordDelete',
            data: params,
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
