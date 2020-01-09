<!--
 * @Author: 高大鹏
 * @Date: 2019-10-28 17:11:46
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2020-01-08 16:01:55
 * @Description: 首页
 -->
<template>
  <div class="p20" style="box-sizing: border-box;min-width:1565px;">
    <function-entry></function-entry>
    <basic-data></basic-data>
    <salesStatistics></salesStatistics>
    <promotion></promotion>
  </div>
</template>

<script type='text/ecmascript-6'>
import functionEntry from './components/function-entry'
import basicData from './components/basic-data'
import salesStatistics from './components/sales-statistics'
import promotion from './components/promotion-container'
export default {
  data () {
    return {
    }
  },
  components: {
    functionEntry,
    basicData,
    salesStatistics,
    promotion
  }
}
</script>

<style scoped lang='scss'>
// tab
/deep/ .no-border-tab {
  .el-tabs__header {
    margin: 0;
    .el-tabs__item {
      padding: 0 12px;
    }
  }
  .el-tabs__nav-wrap::after {
    height: 0;
    background: none;
  }
  .el-tabs__active-bar {
    display: none;
  }
}
</style>
