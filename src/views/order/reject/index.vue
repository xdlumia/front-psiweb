/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-25 15:07:30
 * @Description: 采购-采购退货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      :params="params"
      api="seePsiPurchaseService.purchasealterationList"
      busType="31"
      exportApi="seePsiPurchaseService.purchasealterationExport"
      ref="tableView"
      title="采购退货单"
    >
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='alterationCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='putinCode'">
          <el-link :underline="false" @click="showPutinDetail=true,currentPutinCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <OrderStorageDetail :code="currentPutinCode" :visible.sync="showPutinDetail" @reload="reload" v-if="showPutinDetail" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 采购退货单详情
import OrderStorageDetail from '../storage/detail'; // 采购入库单详情

export default {
  components: {
    TableView,
    Detail,
    OrderStorageDetail
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
      default: () => ({ page: 1, limit: 15 })
    }
  },
  data() {
    return {
      status: [],
      showDetail: false,
      currentCode: '',
      showPutinDetail: false,
      currentPutinCode: '',
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待退货',
        '3': '部分退货',
        '4': '已退货',
        '5': '已驳回'
      },
      // prettier-ignore
      filterOptions: [
        { label: '退换货编号', prop: 'alterationCode', default: true },
        { label: '入库单编号', prop: 'putinCode', default: true },
        { label: '供应商', prop: 'supplierId', type: 'supplier', default: true },
        { label: '退货数量', prop: 'AlterationNum', type: 'numberRange', int: true, default: true },
        { label: '退货价', prop: 'AlterationAmount', type: 'numberRange', default: true },
        { label: '采购预计发货时间', prop: 'PurchasePlanTime', type: 'dateRange', default: true },
        // { label: '创建人', prop: 'creator', type: 'employee' },
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
      this.$refs.tableView.reload(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
