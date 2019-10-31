/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 15:54:15
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <div class="mb10">
      <!-- 操作按钮 -->
      <span
        v-for="(item,index) of buttons"
        :key="index"
      >
        <el-button
          class="mr10"
          @click="buttonsClick(item.name)"
          v-if="currStatusType[currStatus].includes(item.label)"
          size="small"
          :type="item.type"
        >{{item.label}}</el-button>
      </span>

    </div>
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <!-- 状态详情 -->
      <sideStatusbar :status="[{ label: '状态', value: '新建' }]" />
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
        class="d-auto-y"
        style="height:calc(100vh - 200px)"
        :is="activeName"
      ></components>
    </el-form>
  </div>
</template>
<script>
import sideStatusbar from '@/components/formComponents/side-statusbar' //顶部状态
import detail from './outLibDetails/detail' //详情
import quote from './outLibDetails/quote' //报价单
export default {
  components: {
    sideStatusbar,
    detail,
    quote
  },
  props: ['drawerData'],
  data() {
    return {
      // 操作按钮
      buttons: [
        { label: '提交审核', name: 'submit', type: 'primary', authCode: '' },
        { label: '编辑', name: 'edit', type: 'primary', authCode: '' },
        { label: '撤销审核', name: 'undo', type: 'danger', authCode: '' },
        { label: '审核通过', name: 'pass', type: 'primary', authCode: '' },
        { label: '删除', name: 'del', type: 'danger', authCode: '' },
        { label: '驳回', name: 'reject', authCode: '' },
        { label: '审核采购时间', name: 'reject', authCode: '' },
        { label: '终止', name: 'termination', authCode: '' },
        { label: '收回合同', name: 'termination', authCode: '' },
        { label: '合同完善追加合同附件', name: 'generateSales', type: 'primary', authCode: '' },
        { label: '追加合同附件', name: 'generateSales', type: 'primary', authCode: '' },
        { label: '生成请购单', name: '', type: 'generateBuying', authCode: '' },

      ],
      /**
       * 根据当前状态判断显示哪些按钮
       * 1:新建 2:审核中 3:已通过 4:已驳回 5:已完成
       */
      currStatus: 1,
      currStatusType: {
        1: ['提交审核', '编辑', '删除'],
        2: ['撤销审核', '审核通过', '驳回'],
        3: ['生成销售出库单', '生成请购单', '终止'],
        4: ['提交审核', '编辑', '删除'],
        5: []
      },
      // tabs 组件名称对应的label名称
      tabs: {
        detail: '详情',
        quote: '报价单',
        contract: '合同',
        contract2: '销售退货单',
        contract3: '销售换货单',
        contract4: '应收账单',
        contract5: '发票记录',
        contract6: '费用分摊单'
      },

      // tabs当前选中
      activeName: 'detail',
      form: {},
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
