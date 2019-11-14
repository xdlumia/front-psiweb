/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-14 10:57:46
 * @Description: 采购-借入借出单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView :busType="5" :filterOptions="filterOptions" api="seePsiWmsService.wmsborrowloanorderList" ref="tableView" title="借入借出单">
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary">新增</el-button>
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
        <span v-else-if="['returnTime','createTime'].includes(prop)">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <AddIn :visible.sync="showEdit" @reload="reload" type="add" />
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
      default: () => ({ page: 1, limit: 15 })
    }
  },
  data() {
    return {
      status: [],
      showDetail: false,
      showEdit: false,
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
        { label: '销售单编号', prop: 'salesSheetCode' },
        { label: '借入借出单编号', prop: 'borrowLoanCode' },
        { label: '借入借出类型（0-借入 1-借出）', prop: 'borrowLoanType' }, 
        { label: '最少借入借出数量',  prop: 'BorrowLoanNum', type: 'numberRange', int: true },
        { label: '最少返还数量', prop: 'ReturnNum', type: 'numberRange', int: true },
        { label: '部门ID', prop: 'deptId', type: 'dept' },
        { label: '创建人', prop: 'creator', type: 'employee' },
        { label: '创建开始时间', prop: 'CreateTime', type: 'dateRange' },
        { label: '返回开始时间', prop: 'ReturnTime', type: 'dateRange' }
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
