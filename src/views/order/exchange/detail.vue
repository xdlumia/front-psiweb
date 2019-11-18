/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-18 16:59:46
 * @Description: 换货单
*/
<template>
  <sideDetail :status="status" :visible="showDetailPage" @close="close" title="换货单" v-loading="loading" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">提交审核</el-button>
      <el-button size="mini" type="primary">撤销审核</el-button>
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="primary">删除</el-button>
      <el-button size="mini" type="primary">撤回</el-button>
      <el-button size="mini" type="primary">换货扫码</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form :model="detail" size="mini">
          <exchange-info :data="detail" disabled id="exchangeInfo" />
          <buying-exchange-goods :data="detail" disabled exchangeType="in" id="inGoods" />
          <buying-exchange-goods :data="detail" disabled exchangeType="out" id="outGoods" />
          <orderStorageBill :data="detail" :hide="['isBillFee']" :type="3" disabled id="billInfo" />
          <customInfo :data="detail" disabled id="customInfo"></customInfo>
          <extrasInfo :data="detail" disabled id="extrasInfo"></extrasInfo>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="账单管理">账单管理</el-tab-pane>
      <el-tab-pane label="发票管理">发票管理</el-tab-pane>
    </el-tabs>
    <Edit :rowData="detail" :visible.sync="showEdit" @reload="setEdit(),getDetail()" type="edit" v-if="showEdit" />
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';
import Edit from './edit';

export default {
  mixins: [VisibleMixin],
  components: {
    Edit
  },
  props: {},
  data() {
    return {
      showEdit: false
    };
  },
  mounted() {},
  watch: {},
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiWmsService.wmsswaporderGetByCode(
          null,
          this.code
        );
        return data;
      } else if (this.rowData) return this.rowData;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>