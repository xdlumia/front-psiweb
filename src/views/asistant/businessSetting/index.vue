<!--
 * @Author: 高大鹏
 * @Date: 2019-10-28 17:06:25
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2020-01-02 14:43:58
 * @Description: description
 -->
<template>
  <el-container class="d-content business-setting main-content">
    <!-- 右侧切换 -->
    <el-aside width="110px">
      <el-tabs tab-position="left" v-model="componentActive">
        <el-tab-pane
          v-for="(item,index) of defaultComponent"
          :key="index"
          :label="item.label"
          :name="item.componentName"
        ></el-tab-pane>
      </el-tabs>
    </el-aside>
    <!-- <components style="margin-left:110px; min-width: 1100px; position: relative;"> -->
    <el-main>
      <components :is="componentActive"></components>
    </el-main>
  </el-container>
</template>

<script>
import sale from './sale' // 销售
import warehouse from './warehouse' // 库房
import finance from './finance' // 财务
import statement from './statement' // 报表
import account from './account' // 开账
import common from 'see-web-system/dist/components/businessSetting/companyAccount/index'
const defaultComponent = [
  { component: sale, componentName: 'sale', sort: 1, label: '销售', authorityCode: '' },
  { component: warehouse, componentName: 'warehouse', sort: 2, label: '库房', authorityCode: '' },
  { component: finance, componentName: 'finance', sort: 3, label: '财务', authorityCode: '' },
  { component: statement, componentName: 'statement', sort: 4, label: '报表', authorityCode: '' },
  { component: common, componentName: 'common', sort: 5, label: '公司', authorityCode: '' },
  { component: account, componentName: 'account', sort: 5, label: '开账', authorityCode: '' }
]
export default {
  data () {
    return {
      defaultComponent,
      syscode: this.$local.fetch('userInfo').syscode,
      componentActive: 'sale' // 业务设置当前选中
    };
  },
  components: {
    sale,
    warehouse,
    finance,
    statement,
    common,
    account
    // hotel
  },
  mounted () { },
  created () {
    // for (const item of this.$options.defaultSlot) {
    //   if (this.authorityButtons.includes(item.authorityCode)) {
    //     this.componentActive = item.componentName
    //     break
    //   }
    // }
  },
  methods: {
  }
};
</script>
<style>
.business-setting .el-tabs__item.is-left {
  width: 100px !important;
  text-align: center !important;
}
</style>
