/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-14 10:34:05
 * @Description: 采购-直发单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      api="seePsiPurchaseService.purchasedirectList"
      busType="28"
      exportApi="seePsiPurchaseService.purchasedirectExport"
      title="直发单"
    >
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='directCode'">
          <el-link :underline="false" @click="open(value)" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='quotationCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='state'">{{stateText[value]}}</span>
        <span v-else-if="['purchaseDeliverTime','saleDeliverTime','createTime'].includes(prop)">{{value|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import Detail from './detail';

export default {
  components: {
    TableView,
    Detail
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
      stateText: {
        '0': '待完成',
        '1': '部分完成',
        '2': '已完成',
        '3': '已终止'
      },
      filterOptions: [
        { label: '直发单编号', prop: 'directCode', default: true },
        { label: '报价单编号', prop: 'quotationCode', default: true },
        { label: '客户', prop: 'clientName' },
        {
          label: '销售预计发货时间',
          prop: 'SaleDeliverTime',
          type: 'dateRange',
          default: true
        },
        {
          label: '采购预计发货时间',
          prop: 'PurchaseDeliverTime',
          type: 'dateRange',
          default: true
        },
        {
          label: '单据执行人',
          prop: 'personInChargeId',
          type: 'employee'
        },
        { label: '合同创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '最小创建时间', prop: 'CreateTime', type: 'dateRange' }
      ]
    };
  },
  methods: {
    logData(e) {
      console.log(e);
    },
    open(value) {
      console.log(value, 'open');
      this.showDetail = true;
      this.currentCode = value;
    },
    reload() {
      this.$refs.tableView.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
