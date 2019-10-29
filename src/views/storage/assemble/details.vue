/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  组装单 详情组件
 */
<template>
  <div
    class='d-auto-y'
    style='height:calc(100vh - 200px)'
  >
    <assembleNoedit />
    <assembleInfo />
    <assemblyTask />
    <commodityInfo />
  </div>
</template>
<script>
import assembleNoedit from '@/components/formComponents/assemble-noedit'
import assembleInfo from '@/components/formComponents/assemble-info';
import assemblyTask from './assembly-task';
import commodityInfo from '@/components/formComponents/commodity-info';
export default {
  components: {
    assembleNoedit,
    assembleInfo,
    assemblyTask,
    commodityInfo
  },
}
</script>
<style scoped>
</style>
