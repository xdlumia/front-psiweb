/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-31 14:38:35
 * @Description: 选择客户
*/
<template>
  <div v-loading="loading">
    <div class="d-flex mt15 mb15">
      <el-select
        size="small"
        placeholder="请输入客户编号或名称"
        class="wfull mr5"
        filterable
        @change="commonclientinfoInfo"
        v-model="data.clientId"
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
        @click="commonclientinfoInfo"
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
        :disabled="!data.clientId"
        label="客户数据"
        name="clientData"
      ></el-tab-pane>
      <el-tab-pane
        :disabled="!data.clientId"
        label="历史报价单"
        name="salesQuote"
      ></el-tab-pane>
    </el-tabs>
    <!-- 此处hide是在调用clientData 组件的时候 隐藏 clientData 组件里的基本信息区域内容 
    button和params 是salesQuote组件用到的参数-->
    <components
      :is="currCompont"
      :data="clientInfo"
      :params="{clientId:data.clientId}"
      :button="false"
      :hide="['clientBasicInfo']"
    ></components>
  </div>
</template>
<script>
import clientInfo from './client-info'
import clientData from '../../client/details/client-data'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    clientInfo,
    clientData,
  },
  data() {
    return {
      loading: false,
      // 当前显示组件
      currCompont: 'clientInfo',
      // 客户详情
      clientInfo: {},
      clientOptions: [],
    }
  },
  created() {
    this.getClinent()
  },
  mounted() {

  },
  watch: {

    'data.clientId': {
      handler(val) {
        if (val) {
          this.commonclientinfoInfo()
        }
      },
      immediate: true,
    }
  },
  methods: {
    async getClinent(words) {
      this.loading = true;
      try {
        let { data } = await this.$api.seePsiCommonService.commonclientinfoQueryList();
        this.clientOptions = data || []
      } catch (error) {}
      this.loading = false;
    },
    // 获取客户详情信息
    commonclientinfoInfo() {
      if (!this.data.clientId) {
        this.$message.error({
          showClose: true,
          message: '客户内容不能为空'
        })
        return
      }
      this.loading = true
      this.$api.seePsiCommonService.commonclientinfoInfo(null, this.data.clientId)
        .then(res => {
          this.clientInfo = res.data || {};
          if(!this.data.id){
            Object.assign(this.data,{
              clientLinkman:res.data.linkManName,
              clientPhone:res.data.phone,
              clientReceivingAddress:res.data.address||res.data.registerAddres,
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
