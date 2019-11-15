<!--
 * @Author: 高大鹏
 * @Date: 2019-10-28 17:11:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-15 14:31:18
 * @Description: 首页
 -->
<template>
  <div class="p20" style="box-sizing: border-box">
    <function-entry></function-entry>
    <basic-data></basic-data>
  </div>
</template>

<script type='text/ecmascript-6'>
import functionEntry from './components/function-entry'
import basicData from './components/basic-data'
export default {
  data() {
    return {
    }
  },
  components: {
    functionEntry,
    basicData
  }
}
</script>

<style scoped lang='scss'>
</style>
