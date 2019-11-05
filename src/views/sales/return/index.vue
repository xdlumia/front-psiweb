/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 19:24:24
 * @Description: 销售-销售退货单
 */
<template>
  <div>
    <table-view
      busType="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="销售退货单"
      @clear-filter="reset()"
      api="bizSystemService.getEmployeeList"
      exportApi="bizSystemService.getEmployeeList"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
    >
      <template v-slot:filter>
        <filters
          ref="filters"
          @submit-filter="$refs.table.reload(1)"
          :form="queryForm"
        />
      </template>
      <!-- 自定义按钮功能 -->

      <template v-slot:moreButton>自定义更多按钮</template>
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="eventHandle('returnVisible',row)"
        > 销售退货单编号</span>
        <span @click="eventHandle('outLibVisible',row)">销售出库单编号</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
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
import filters from './filter' //筛选

export default {
  name: 'return',
  components: {
    returnDetails,
    outLibDetails,
    filters
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
