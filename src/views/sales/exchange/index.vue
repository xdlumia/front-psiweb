/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-05 15:48:33
 * @Description: 销售-销售换货单
 */
<template>
  <div>
    <table-view
      busType="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      :filterOptions="filterOptions"
      title="销售换货单"
      @clear-filter="reset()"
      api="bizSystemService.getEmployeeList"
      exportApi="bizSystemService.getEmployeeList"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
    >
      <!-- 自定义按钮功能 -->

      <template v-slot:moreButton>自定义更多按钮</template>
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="eventHandle('returnVisible',row)"
        > 销售退货单编号</span>
        <span @click="eventHandle('outLibVisible',row)">销售出库单编号</span>
        <span v-if="column.columnFields=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <returnDetails
      :visible.sync="returnVisible"
      :rowData="rowData"
      @reload="this.$refs.table.reload()"
    />
    <!-- 销售出库单 -->
    <outLibDetails
      :visible.sync="outLibVisible"
      :rowData="rowData"
      @reload="this.$refs.table.reload()"
    />
  </div>
</template>
<script>
import returnDetails from './details' //销售退货单详情
import outLibDetails from '../outLibrary/outLib-details' //销售出库单详情
let filterList = [
  { label: '排序', prop: 'sort', default: true, type: 'sort', options: [], },
  { label: '客户编号', prop: 'title', default: true, type: 'text' },
  { label: '客户名称', prop: 'city', default: true, type: 'text' },
  { label: '联系人', prop: 'pushTime', default: true, type: 'employee', },
  { label: '联系电话', prop: 'status', default: true, type: 'text' },
  { label: '提交人', prop: 'messageType', default: true, type: 'employee', },
  { label: '部门', prop: 'messageType2', default: true, type: 'employee', },
  { label: '提交时间', prop: 'messageType3', default: true, type: 'daterange', },
]
export default {
  name: 'return',
  components: {
    returnDetails,
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
        title: "", // 标题
        city: "", // 城市
        pushTime: "",
        messageType: "",
        status: "",
        page: 1,
        limit: 20
      },
      filterOptions: filterList,
      rowData: {},
      returnVisible: false,
      outLibVisible: false,
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row
      return
    },
    // 多选
    selectionChange(val) {
      console.log(val);

    },
    submitFilter() {
      this.$emit('submit-filter')
    },
    // 重置
    reset() {
      this.$refs.filters.$refs.form.resetFields()
      this.$refs.table.reload(1);
    },
  }
};
</script>
