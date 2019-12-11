/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-11 17:42:15
 * @Description: 财务-支出流水详情
*/
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
          :data="detail"
        />

        <!-- 其他费用 -->
        <extras-info
          disabled
          :data="detail"
        />
        <!-- 匹配账单信息 -->
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

  </div>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import { log } from 'util';
export default {
  mixins: [VisibleMixin],
  components: {

  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '删除', type: 'danger', authCode: 'psi_outlay_1005' },
      ],
      editVisible: false,
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: 3, // 当前数据状态
      currStatusType: {
        '0': ['删除'], // 未匹配
        '1': [], // 部分匹配
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
        let { data } = await this.$api.seePsiFinanceService.payrecordGetInfoByCode({ code: this.code })
        return data;
      }
    },
    buttonsClick(label) {
      let apiObj = {
        '删除': {
          api: 'seePsiFinanceService.payrecordDelete',
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
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
