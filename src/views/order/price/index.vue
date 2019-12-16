/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-16 14:39:33
 * @Description: 采购-采购调价单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :exportButton="authorityButtons.includes('psi_purchase_adjust_pric_09')"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      api="seePsiCommonService.commonadjustpriceListCG"
      busType="40"
      exportApi="seePsiCommonService.commonadjustpriceExport"
      ref="tableView"
      title="采购调价单"
    >
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary" v-if="authorityButtons.includes('psi_purchase_adjust_pric_08')">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else-if="prop=='code'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='state'">
          <span>{{stateText[row.state]}}</span>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <Edit :hide="['saleReferencePrice','taxBeforeAdjustPrice','profitRate']" :visible.sync="showEdit" @reload="reload" v-if="showEdit" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; //采购调价单详情
import Edit from './edit'; //采购调价单详情

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
      default: () => ({ page: 1, limit: 20 })
    }
  },
  data() {
    return {
      defaultParams: {
        page: 1,
        limit: 20,
        adjustPriceType: 2
      },
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '已通过',
        '3': '驳回',
        '4': '撤销'
      },
      status: [],
      showDetail: false,
      currentCode: '',
      showEdit: false,
      // prettier-ignore
      filterOptions: [
        { label: '调价单编号', prop: 'code', default: true },
        { label: '调价差异', prop: 'AdjustPriceDifference', type: "numberRange", default: true },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
        { label: '创建人', prop: 'creator', type: 'employee', default: true },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange', default: true }
      ]
    };
  },
  mounted() {},
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
