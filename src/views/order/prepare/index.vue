/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-11 18:01:20
 * @Description: 采购-备货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      api="seePsiPurchaseService.purchasestockorderList"
      busType="29"
      exportApi="seePsiPurchaseService.purchasestockorderExport"
      ref="tableView"
      title="备货单"
    >
      <template slot="button">
        <el-button @click="showAdd=true" size="mini" type="primary">新建</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='stockCode'">
          <el-link class="f12" :underline="false" @click="showDetail=true,currentCode=value" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='state'">{{stateText[value]}}</span>
        <span v-else-if="['purchaseArrivalTime','createTime'].includes(prop)">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <AddOrderPrepare :visible.sync="showAdd" @reload="reload" v-if="showAdd" />
    <OrderPrepareDetail :code="currentCode" :visible.sync="showDetail" @reload="reload" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import AddOrderPrepare from './edit';
import OrderPrepareDetail from './detail';

export default {
  components: {
    TableView,
    AddOrderPrepare,
    OrderPrepareDetail
  },
  data() {
    return {
      status: [],
      showAdd: false,
      showDetail: false,
      currentCode: '',
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '已通过',
        '3': '部分完成',
        '4': '已完成',
        '5': '已驳回'
      },
      filterOptions: [
        { label: '请购单编号', prop: 'stockCode', default: true },
        {
          label: '采购预计到货时间',
          prop: 'PurchaseArrivalTime',
          type: 'dateRange',
          default: true
        },
        { label: '合同创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
      ]
    };
  },
  methods: {
    logData(e) {
      console.log(e);
    },
    reload() {
      console.log('table reload');
      this.$refs.tableView.reload(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
