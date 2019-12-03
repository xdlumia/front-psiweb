/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-27 17:38:31
 * @Description: 其他合同
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      api="seePsiContractService.contractList"
      busType="23"
      exportApi="seePsiContractService.contractExport"
      ref="tableView"
      title="其他合同"
    >
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else-if="prop=='contractCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <Edit :code="currentCode" :visible.sync="showEdit" @reload="reload" v-if="showEdit" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 其他合同详情
import Edit from './edit'; // 其他合同详情

export default {
  components: {
    TableView,
    Detail,
    Edit
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
      defaultParams: {
        page: 1,
        limit: 15
      },
      status: [],
      showDetail: false,
      showEdit: false,
      currentCode: '',
      // prettier-ignore
      filterOptions: [
        { label: '合同编号', prop: 'contractCode', default: true },
        { label: '甲方', prop: 'partyA', default: true },
        { label: '乙方', prop: 'partyB', default: true },
        { label: '合同开始时间', prop: 'BeginDate', type: 'dateRange', default: true },
        { label: '合同结束时间', prop: 'EndDate', type: 'dateRange', default: true },
        { label: '合同创建人', prop: 'creator', type: 'employee', default: true },
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
