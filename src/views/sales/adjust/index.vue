/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-30 14:19:30
 * @Description: 销售-账单调整单
 */
<template>
  <div>
    <table-view
      busType="56"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="账单调整单"
      api="seePsiFinanceService.fbilladjustList"
      exportApi="seePsiFinanceService.fbilladjustExport"
      :params="Object.assign(queryForm,params)"
    >
      <template v-slot:button>
        <el-button
          type="primary"
          size="mini"
          @click="eventHandle('addVisible')"
        >新增账单调整</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <!-- 调整单编号 -->
        <span
          v-if="column.columnFields == 'adjustCode'"
          class="d-text-blue d-pointer"
          @click="eventHandle('detailVisible',row)"
        > {{value}}</span>
        <!-- 销售出库单编号 -->
        <span
          v-else-if="column.columnFields == 'salesShipmentCode'"
          class="d-text-blue d-pointer"
          @click="eventHandle('outLibVisible',row)"
        > {{value}}</span>
        <span v-else-if="column.columnFields == 'feeTypeCode'"> {{value | dictionary('ZD_DY_LX')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>

    <!-- 费用调整详情-->
    <detail
      v-if="detailVisible"
      :visible.sync="detailVisible"
      :rowData="rowData"
      :code="rowData.adjustCode"
      @reload="$refs.table.reload()"
    />
    <!-- 销售出库单详情 -->
    <outLibDetails
      v-if="outLibVisible"
      :visible.sync="outLibVisible"
      :rowData="rowData"
      :code="rowData.salesShipmentCode"
      @reload="$refs.table.reload()"
    />
    <!-- 新增分摊-->
    <add
      type="add"
      :visible.sync="addVisible"
      :rowData="rowData"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
import add from './add' // 新增账单调整
import detail from './details' //客户详情
import outLibDetails from '../outLibrary/outLib-details' //客户详情

export default {
  name: 'return',
  components: {
    add,
    detail,
    outLibDetails
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
      detailVisible: false,
      outLibVisible: false,
      // 筛选框数据
      filterOptions: [
        // { label: '商户编号、商户名称/简称', prop: 'title', default: true, type: 'text' },
        // { label: '联系人、联系人电话', prop: 'city', default: true, type: 'text' },
        // { label: '商机阶段', prop: 'pushTime', default: true, type: 'select', },
        // { label: '跟进时间起止', prop: 'status', default: true, type: 'daterange' },
        // { label: '维护人', prop: 'messageType', default: true, type: 'employee', },
      ]
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row ? row : {}
      return
    }
  }
};
</script>
