/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-05 11:33:33
 * @Description: 采购-供应商
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :filterOptions="filterOptions" api="seePsiCommonService.commonsupplierinfoPagelist" busType="42" title="供应商">
      <template slot="button">
        <el-button @click="showCat=true" size="mini" type="primary">商品供应分类表</el-button>
        <el-button @click="showEdit=true" size="mini" type="primary">新增供应商</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :visible.sync="showDetail" />
    <Edit :visible.sync="showEdit" />
    <Cat :visible.sync="showCat" />
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
      filterOptions: [
        { label: '供应商编号', prop: 'supplierName', default: true },
        { label: '供应商名称', prop: 'code', default: true },
        { label: '状态', prop: 'status', default: true },
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
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
