/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-06 15:20:45
 * @Description: 采购-供应商
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :filterOptions="filterOptions" api="seePsiCommonService.commonsupplierinfoPagelist" busType="42" ref="tableView" title="供应商">
      <template slot="button">
        <el-button @click="showCat=true" size="mini" type="primary">商品供应分类表</el-button>
        <el-button @click="showEdit=true" size="mini" type="primary">新增供应商</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='code'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else-if="prop=='state'">
          <span v-if="value==0">启用</span>
          <span v-else>停用</span>
        </span>
        <span v-else-if="prop=='productRange'">
          <el-tag
            :key="item"
            class="mr5"
            size="mini"
            type="info"
            v-for="item of getProductRangeList(value)"
          >{{item|dictionary('PSI_GYS_CPFW')}}</el-tag>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <Edit :visible.sync="showEdit" @reload="reload" />
    <Cat :visible.sync="showCat" @reload="reload" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 供应商详情
import Edit from './edit'; // 供应商详情
import Cat from './cat'; // 供应商详情

export default {
  components: {
    TableView,
    Detail,
    Edit,
    Cat
  },
  data() {
    return {
      status: [],
      showDetail: false,
      showEdit: false,
      showCat: false,
      currentCode: '',
      filterOptions: [
        { label: '供应商编号', prop: 'supplierName', default: true },
        { label: '供应商名称', prop: 'code', default: true },
        {
          label: '状态',
          prop: 'state',
          type: 'select',
          options: [{ label: '启用', value: 0 }, { label: '停用', value: 1 }],
          default: true
        },
        { label: '联系人', prop: 'linkManName', default: true },
        { label: '联系电话', prop: 'phone', default: true },
        { label: '产品范围', prop: 'productRange', default: true },
        { label: '供应商创建人', prop: 'creator', type: 'employee' },
        { label: '创建人部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
      ]
    };
  },
  methods: {
    logData(e) {
      console.log(e);
    },
    reload() {
      this.$refs.tableView.reload();
    },
    getProductRangeList(item) {
      return String(item || '')
        .split(',')
        .map(a => a.trim())
        .filter(a => a);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
