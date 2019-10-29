/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  销售单 详情组件
 */
<template>
  <div
    class='d-auto-y'
    style='height:calc(100vh - 200px)'
  >
    <goodsPicking />
    <pickingInfo />
    <generateDeliver />
  </div>
</template>
<script>
import goodsPicking from '@/components/formComponents/goods-picking'
import pickingInfo from '@/components/formComponents/picking-info';
import generateDeliver from './generate-deliver';
export default {
  components: {
    goodsPicking,
    pickingInfo,
    generateDeliver
  },
}
</script>
<style scoped>
</style>
