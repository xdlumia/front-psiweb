/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 15:31:05
 * @Description: 选择客户
*/
<template>
  <div>
    <div class="d-flex mt15 mb15">
      <el-select
        size="small"
        placeholder="请输入客户编号或名称"
        :remote-method="getEmployee"
        class="wfull mr5"
        filterable
        remote
        reserve-keyword
        v-model="clientId"
      >
        <el-option
          :key="item.id"
          :label="item.clientName"
          :value="item.id"
          v-for="item in clientOptions"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-search"
      >搜索</el-button>
    </div>
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
        name="historyQuote"
      ></el-tab-pane>
    </el-tabs>
    <!-- 此处hide是在调用clientData 组件的时候 隐藏 clientData 组件里的基本信息区域内容 -->
    <components
      :is="currCompont"
      :hide="['clientBasicInfo']"
    ></components>
  </div>
</template>
<script>
import clientInfo from './client-info'
import clientData from '../../client/details/client-data'
import historyQuote from './history-quote'
export default {
  props: ['rowData', 'code', 'visible'],
  components: {
    clientInfo,
    clientData,
    historyQuote,
  },
  data() {
    return {
      currCompont: 'clientInfo',
      // 当前操作步骤
      clientId: '',
      clientOptions: [],
      // 新增orEdit框内容

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    async getEmployee(words) {
      if (words) {
        let { data } = await this.$api.seePsiCommonService.commonclientinfoPagelist({
          fuzzyClientName: words,
          page: 1,
          limit: 50,
        });
        this.clientOptions = data || []
      } else {
        this.clientOptions = [];
      }
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
