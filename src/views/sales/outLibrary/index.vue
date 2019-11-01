/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 19:05:59
 * @Description: 销售-销售出库单首页
 */
<template>
  <div>
    <table-view
      @clear-filter="reset()"
      type="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="销售出库单"
      api="bizSystemService.getEmployeeList"
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
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="eventHandle('detailVisible',row)"
        >销售出库单编号</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 出库单详情 -->
    <outLib-details
      :visible.sync="detailVisible"
      :rowData="rowData"
    />

  </div>
</template>
<script>
import outLibDetails from './outLib-details' //销售出库单详情

import filters from './filter' //销售出库单详情
export default {
  name: 'outLibrary',
  components: { outLibDetails, filters },
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
      // 当前行数据
      rowData: {},

      detailVisible: false, // 出库单详情
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
    selectionChange() { },

    // 重置
    reset() {
      this.$refs.filters.$refs.form.resetFields();
      this.$refs.table.reload(1);
    },

  }
};
</script>
