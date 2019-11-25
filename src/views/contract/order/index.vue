/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-25 15:00:20
 * @Description: 采购合同
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      :params="params"
      api="seePsiContractService.contractpurchaseList"
      busType="24"
      ref="tableView"
      title="采购合同"
    >
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else-if="prop=='contractCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='purchasePutinCode'">
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

import Detail from './detail'; // 采购合同详情
import OrderStorageDetail from '../../order/storage/detail'; // 采购入库单详情

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
      showPutinDetail: false,
      currentCode: '',
      currentPutinCode: '',
      // prettier-ignore
      filterOptions: [
        { label: '合同编号', prop: 'contractCode', default: true },
        { label: '采购入库编号', prop: 'purchasePutinCode', default: true },
        { label: '供应商名称', prop: 'supplierName', default: true, },
        { label: '总计数量', prop: 'TotalNum', type: 'numberRange', default: true, int: true },
        { label: '总计采购价', prop: 'TotalAmount', type: 'numberRange', default: true },
        { label: '预计到货时间', prop: 'PurchaseTime', type: 'dateRange', default: true },
        { label: '合同创建人', prop: 'creator', type: 'employee', default: true },
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
