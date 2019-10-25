/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-25 17:18:31
 * @Description: 库房  销售单 详情组件
 */
<template>
<div class='d-auto-y' style='height:calc(100vh - 200px)'>
    <goodsExported/>
    <shipInfo/>
</div>
</template>
<script>
import goodsExported from './components/goodsExported.vue'
import shipInfo from './components/shipInfo.vue'
export default {
  components: {
      goodsExported,
      shipInfo
  },
}
</script>
<style scoped>

</style>
