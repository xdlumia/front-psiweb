/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-06 11:27:07
 * @Description: 采购-备货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :exportButton="authorityButtons.includes('psi_purchase_stock_11')"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      api="seePsiPurchaseService.purchasestockorderList"
      busType="29"
      exportApi="seePsiPurchaseService.purchasestockorderExport"
      ref="tableView"
      title="备货单"
    >
      <template slot="button">
        <el-button @click="showAdd=true" size="mini" type="primary" v-if="authorityButtons.includes('psi_purchase_stock_04')">新建</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='stockCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value|codeSlice}}</el-link>
        </span>
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
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 20 })
    }
  },
  data() {
    return {
      defaultParams: {
        page: 1,
        limit: 20
      },
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
      // prettier-ignore
      filterOptions: [
        { label: '备货单编号', prop: 'stockCode', default: true },
        { label: '采购预计到货时间', prop: 'PurchaseArrivalTime', type: 'dateRange', default: true },
        { label: '创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
      ]
    };
  },
  methods: {
    reload() {
      this.$refs.tableView.reload(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
