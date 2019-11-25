/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-25 15:00:30
 * @Description: 销售合同
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :filterOptions="filterOptions" :params="params" api="seePsiContractService.contractsalesList" busType="25" title="销售合同">
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else-if="prop=='contractCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='shipmentCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <OutLibDetail :code="currentOutlibCode" :visible.sync="showOutlibDetail" @reload="reload" v-if="showOutlibDetail" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 销售合同详情
import OutLibDetail from '../../sales/outLibrary/outLib-details'; // 销售出库单详情

export default {
  components: {
    TableView,
    Detail,
    OutLibDetail
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
      showOutlibDetail: false,
      currentOutlibCode: '',
      // prettier-ignore
      filterOptions: [
        { label: '合同编号', prop: 'contractCode', default: true },
        { label: '销售出库单编号', prop: 'shipmentCode', default: true },
        { label: '客户名称', prop: 'clientName', default: true },
        { label: '数量', prop: 'TotalNum', type: 'numberRange', int: true, default: true },
        { label: '销售总价', prop: 'TotalAmount', type: 'numberRange', default: true },
        { label: '预计发货时间', prop: 'SalesTime', type: 'dateRange', default: true },
        { label: '创建人', prop: 'creator', type: 'employee' },
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
