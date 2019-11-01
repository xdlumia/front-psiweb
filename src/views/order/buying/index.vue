/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 16:17:28
 * @Description: 采购-请购单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :filterOptions="filterOptions" :headers="tableHeader" api="bizSystemService.getEmployeeList" title="请购单">
      <template slot="button">
        <el-button @click="showDetail=true" size="mini" type="primary">请购单明细表</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <OrderBuyingDetail :visible.sync="showDetail" />
    <OrderBuyingDetailRec :visible.sync="orderBuyingDetailRecVisible" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import OrderBuyingDetail from './detail';
import OrderStorage from '../storage/edit';
import OrderBuyingDetailRec from './detailRec';
import AddBorrowIn from '@/views/order/borrow/addIn';
/**
 * 采购-请购单
 */
export default {
  components: {
    TableView,
    OrderBuyingDetail,
    OrderBuyingDetailRec,
    OrderStorage,
    AddBorrowIn,
  },
  data() {
    return {
      status: [],
      showDetail: true,
      addBorrowInVisible: false,
      orderBuyingDetailRecVisible: false,
      tableHeader: [
        { label: '请购单编号', prop: 'deptName', width: '180' },
        { label: '报价单编号', prop: 'deptName', width: '180' },
        { label: '单据状态', prop: 'deptName', width: '180' },
        { label: '销售要求到货时间', prop: 'deptName', width: '180' },
        { label: '采购预计到货时间', prop: 'deptName', width: '180' },
        { label: '单据执行人', prop: 'deptName', width: '180' },
        { label: '单据创建人', prop: 'deptName', width: '180' },
        { label: '创建部门', prop: 'deptName', width: '180' },
        { label: '创建时间', prop: 'createTime', width: '180' }
      ],
      filterOptions: [
        {
          label: '排序',
          type: 'sort',
          prop: 'sort',
          options: [
            { label: '交易记录最高', value: '1' },
            { label: '交易记录最低', value: '2' }
          ],
          default: true
        },
        { label: '采购单编号', prop: 'orderNo', default: true },
        { label: '报价单编号', prop: 'priceNo', default: true },
        {
          label: '价格',
          prop: 'priceRange',
          type: 'numberrange',
          default: true
        },
        {
          label: '单据状态',
          prop: 'orderStatus',
          type: 'dict',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '销售要求到货时间',
          prop: 'requireTime',
          type: 'daterange',
          default: true
        },
        {
          label: '采购要求到货时间',
          prop: 'requireTime2',
          type: 'daterange',
          default: true
        },
        {
          label: '单据执行人',
          prop: 'actUser',
          type: 'employee',
          default: true
        },
        {
          label: '单据创建人',
          prop: 'actUser2',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'actUser3', type: 'employee' },
        { label: '创建时间', prop: 'actUser4', type: 'daterange' }
      ]
    };
  },
  mounted() {},
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
