/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-10 18:20:55
 * @Description: 财务-收入流水详情
<template>
  <div>
    <side-detail
      :title="`流水编号:${code}`"
      :visible.sync="showDetailPage"
      width="920px"
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
        style="height:calc(100vh - 110px)"
      >
        <!-- 单据信息 -->
        <receipt-info
          disabled
          :span="12"
          incomeType="0"
          :data="detail"
        />

        <!-- 备注信息 其他信息-->
        <extras-info
          disabled
          :data="detail"
        />
        <!-- <match-bill-detail
          disabled
          :data="detail"
        /> -->
        <!-- TODO 缺少账单匹配 -->
        <!-- TODO 缺少操作记录 -->
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
import VisibleMixin from '@/utils/visibleMixin';
import receivableMatch from './receivable-match'; //账单匹配
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  components: {
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
        let apiObj = {
          '删除': {
            api: 'seePsiFinanceService.revenuerecordDelete',
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
