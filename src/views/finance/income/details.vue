/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 18:21:08
 * @Description: 财务-收入流水详情
<template>
  <div>
    <side-detail
      :title="`流水编号:${code}`"
      :visible.sync="showDetailPage"
      width="920px"
      :status="status"
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
            v-if="currStatusType[detail.state|| 0].includes(item.label)"
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
        <!-- 单据信息 -->
        <receipt-info
          disabled
          :data="detail"
        />

        <!-- 备注信息 其他信息-->
        <extras-info
          disabled
          :data="detail"
        />

      </el-form>
    </side-detail>
    <!-- 退货单新增/编辑 -->
    <add
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      :rowData="rowData"
    />
  </div>
</template>
<script>
import add from './add' // 新增退货单
import VisibleMixin from '@/utils/visibleMixin';
import { log } from 'util';
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
        { label: '收款单匹配', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
      ],
      receivableVisible: false,
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: 3, // 当前数据状态
      currStatusType: {
        '0': ['删除', '收款单匹配'], // 未匹配
        '1': [], // 已匹配
        '2': ['收款单匹配'], // 部分匹配
        '3': ['删除', '收款单匹配'], //未匹配
        '4': ['删除'], //未匹配借
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
            api: 'seePsiFinanceService.salesreturnedLogicDelete',
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
