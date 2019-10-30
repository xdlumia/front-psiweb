/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 14:21:02
 * @Description: 销售出库单详情
*/
<template>
  <div>
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
      // tabs  组件名称对应的label名称
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
