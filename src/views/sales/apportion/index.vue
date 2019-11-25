/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-15 16:05:51
 * @Description: 销售-费用分摊单
 */
<template>
  <div>
    <table-view
      busType="19"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="费用分摊单"
      @clear-filter="reset()"
      api="seePsiSaleService.salescostapportionList"
      exportApi="seePsiSaleService.salescostapportioExport"
      :params="Object.assign(queryForm,params)"
    >
      <template v-slot:button>
        <el-button
          type="primary"
          size="mini"
          @click="eventHandle('addVisible')"
        >新增分摊</el-button>
      </template>
      <template v-slot:filter>
        <filters
          ref="filters"
          @submit-filter="$refs.table.reload(1)"
          :form="queryForm"
        />
      </template>
      <!-- 自定义按钮功能 -->
      <template slot-scope="{column,row,value}">
        <!-- 费用分摊单编号 -->
        <span
          v-if="column.columnFields == 'costApportionCode'"
          class="d-text-blue d-pointer"
          @click="eventHandle('detailVisible',row)"
        > {{value}}</span>
        <!-- 销售出库单编号 -->
        <span
          v-else-if="column.columnFields == 'costCode'"
          class="d-text-blue d-pointer"
          @click="eventHandle('outLibVisible',row)"
        > {{value}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>

    <!-- 费用分摊单详情-->
    <detail
      v-if="detailVisible"
      :visible.sync="detailVisible"
      :rowData="rowData"
      :code="rowData.costApportionCode"
      @reload="this.$refs.table.reload()"
    />
    <!-- 销售出库单详情 -->
    <feeDetails
      v-if="feeVisible"
      :visible.sync="feeVisible"
      :rowData="rowData"
      :code="rowData.salesShipmentCode"
      @reload="this.$refs.table.reload()"
    />
    <!-- 新增分摊-->
    <add
      type="add"
      :visible.sync="addVisible"
      :rowData="rowData"
      @reload="this.$refs.table.reload()"
    />
  </div>
</template>
<script>
import add from './add' // 新增分摊
import detail from './details' //客户详情
import feeDetail from './details' //客户详情
let filterList = [
  // { label: '客户编号', prop: 'title', default: true, type: 'text' },
  // { label: '客户名称', prop: 'city', default: true, type: 'text' },
  // { label: '联系人', prop: 'pushTime', default: true, type: 'employee', },
  // { label: '联系电话', prop: 'status', default: true, type: 'text' },
  // { label: '提交人', prop: 'messageType', default: true, type: 'employee', },
  // { label: '部门', prop: 'messageType2', default: true, type: 'employee', },
  // { label: '提交时间', prop: 'messageType3', default: true, type: 'daterange', },
]
export default {
  name: 'return',
  components: {
    add,
    detail,
    feeDetail
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
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      loading: false,
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20
      },
      rowData: {},
      addVisible: false,
      feeVisible: false,
      detailVisible: false,
      // 筛选框数据
      filterOptions: filterList
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row ? row : {}
      return
    },
  }
};
</script>
