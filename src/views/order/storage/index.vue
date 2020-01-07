/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-06 11:28:42
 * @Description: 采购-采购入库单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :api="api"
      :exportButton="authorityButtons.includes('psi_purchase_storage_13')"
      :filter="filter"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      @selection-change="selectionChange"
      busType="30"
      exportApi="seePsiPurchaseService.purchaseputinExport"
      ref="tableView"
      title="采购入库单"
    >
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='putinCode'">
          <el-link
            :underline="false"
            @click="showDetail=true,currentCode=value"
            class="f12"
            type="primary"
          >{{value|codeSlice}}</el-link>
        </span>
        <span v-else-if="prop=='joinCode'">
          <el-link
            :underline="false"
            @click="openJoin(row)"
            class="f12"
            type="primary"
          >{{value|codeSlice}}</el-link>
        </span>
        <!-- 销售库用到这个页面但是接口没有返回状态 -->
        <span v-else-if="prop=='state'">
          {{stateText[row.state]}}
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail
      :code="currentCode"
      :visible.sync="showDetail"
      @reload="reload"
      v-if="showDetail"
    />
    <OrderBuyingDetail
      :code="joinCode"
      :visible.sync="joinDetail.buying"
      @reload="reload"
      v-if="joinDetail.buying"
    />
    <OrderDirectDetail
      :code="joinCode"
      :visible.sync="joinDetail.direct"
      @reload="reload"
      v-if="joinDetail.direct"
    />
    <OrderPrepareDetail
      :code="joinCode"
      :visible.sync="joinDetail.prepare"
      @reload="reload"
      v-if="joinDetail.prepare"
    />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 采购入库单详情
import OrderBuyingDetail from '../buying/detail'; // 请购单详情
import OrderDirectDetail from '../direct/detail'; // 直发单详情
import OrderPrepareDetail from '../prepare/detail'; // 备货单详情

export default {
  components: {
    TableView,
    Detail,
    OrderBuyingDetail,
    OrderDirectDetail,
    OrderPrepareDetail
  },
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    filter: {
      type: Boolean,
      default: true
    },
    api: {
      type: String,
      default: 'seePsiPurchaseService.purchaseputinList'
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
      showDetail: false,
      currentCode: '',
      joinCode: '',
      joinDetail: {
        buying: false,
        direct: false,
        prepare: false
      },
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '销售确认',
        '3': '已通过',
        '4': '已完成',
        '5': '已驳回',
        '6': '已终止'
      },
      // prettier-ignore
      filterOptions: [
        { label: '入库单编号', prop: 'putinCode', default: true },
        { label: '请购/直发/备货单编号', prop: 'joinCode', default: true },
        {          label: '来源', prop: 'source', default: true, type: 'select', options: [
            { label: '全部', value: '' },
            { label: '请购单', value: '请购单' },
            { label: '备货单', value: '备货单' },
            { label: '直发单', value: '直发单' },
          ]        },
        { label: '供应商', prop: 'supplierId', default: true, type: 'supplier' },
        { label: '销售预计到/发货时间', prop: 'SaleTime', type: 'dateRange', default: true },
        { label: '采购预计到/发货时间', prop: 'PurchaseTime', type: 'dateRange', default: true },
        { label: '总计数量', prop: 'PutinNum', type: 'numberRange', default: true, int: true },
        { label: '总计采购价', prop: 'PutinAmount', type: 'numberRange' },
        { label: '创建人', prop: 'creator', type: 'employee' },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' }
      ]
    };
  },
  mounted() { },
  methods: {
    // 多选
    selectionChange(val) {
      this.$emit('selection-change', val);
    },
    reload() {
      this.$refs.tableView.reload();
    },
    openJoin(row) {
      this.joinCode = row.joinCode;
      if (row.source == '请购单') {
        this.joinDetail.buying = true;
      } else if (row.source == '直发单') {
        this.joinDetail.direct = true;
      } else if (row.source == '备货单') {
        this.joinDetail.prepare = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
