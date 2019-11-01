/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 15:44:13
 * @Description: 选择客户
*/
<template>
  <div v-loading="loading">
    <el-input
      size="small"
      class="mt20 mb20"
      v-model="clientno"
      placeholder="请输入客户编号或名称"
    >
      <button slot="append">搜索</button>
    </el-input>
    <el-tabs
      v-model="currCompont"
      type="card"
    >
      <el-tab-pane
        label="客户信息"
        name="clientInfo"
      ></el-tab-pane>
      <el-tab-pane
        label="客户数据"
        name="clientData"
      ></el-tab-pane>
      <el-tab-pane
        label="历史报价单"
        name="historyQuoto"
      ></el-tab-pane>
    </el-tabs>
    <components :is="currCompont"></components>
  </div>
</template>
<script>
import clientInfo from './client-info'
import clientData from '../../client/details/client-data'
import historyQuoto from './history-quoto'
export default {
  props: ['dialogData', 'visible'],
  components: {
    clientInfo,
    clientData,
    historyQuoto,
  },
  data() {
    return {
      loading: false,
      currCompont: 'clientInfo',
      // 当前操作步骤
      clientno: '',
      activeName: 'first', // 数据源
      // 新增orEdit框内容
      addForm: {
        title: '', // 标题
        cityName: '', // 城市
        cityId: this.$local.fetch('cityInfo').id, // 城市
        id: '', // 主键id
        mainPic: '', // 主图
        content: '' // 内容
      },
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
