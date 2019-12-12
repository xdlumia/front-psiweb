/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-12 08:58:17
 * @Description: 采购-借入借出单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :busType="5"
      :exportButton="authorityButtons.includes('psi_purchase_borrow_10')"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      @selection-change="selectionChange"
      api="seePsiWmsService.wmsborrowloanorderList"
      exportApi="seePsiWmsService.wmsborrowloanorderExport"
      ref="tableView"
      title="借入借出单"
    >
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary" v-if="authorityButtons.includes('psi_purchase_borrow_09')">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='borrowLoanCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='salesSheetCode'">
          <el-link :underline="false" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='borrowLoanState'">{{stateText[value]}}</span>
        <span v-else-if="prop=='borrowLoanType'">{{value==0?'借入':'借出'}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <AddIn :visible.sync="showEdit" @reload="reload" type="add" v-if="showEdit" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 借入借出单详情
import AddIn from './addIn'; // 借入借出单详情

export default {
  components: {
    TableView,
    Detail,
    AddIn
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
      status: [],
      showDetail: false,
      showEdit: false,
      defaultParams: {
        page: 1,
        limit: 20
      },
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待借入',
        '3': '待借出',
        '4': '部分借入',
        '5': '部分借出',
        '6': '待归还',
        '7': '待返还',
        '8': '部分返还',
        '9': '部分归还',
        '10': '完成返还',
        '11': '完成归还',
        '12': '已驳回',
        '-1': '终止'
      },
      // prettier-ignore
      filterOptions: [
        { label: '借入借出单编号', prop: 'borrowLoanCode', default: true },
        { label: '销售出库单编号', prop: 'salesShipmentCode', default: true },
        {          label: '借入借出类型', prop: 'borrowLoanType', default: true, type: 'select', options: [
            { label: '借入', value: 0 },
            { label: '借出', value: 1 },
          ]        },
        { label: '最少借入借出数量', prop: 'BorrowLoanNum', type: 'numberRange', int: true, default: true },
        { label: '最少返还数量', prop: 'ReturnNum', type: 'numberRange', int: true, default: true },
        { label: '返回时间', prop: 'ReturnTime', type: 'dateRange', default: true },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
        { label: '创建人', prop: 'creator', type: 'employee' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' },
      ]
    };
  },
  methods: {
    // 多选
    selectionChange(val) {
      this.$emit('selection-change', val);
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
