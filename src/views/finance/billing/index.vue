/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 09:50:03
 * @Description: 销售-账单调整单
 */
<template>
  <div>
    <table-view
      type="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="账单调整单"
      @clear-filter="reset()"
      api="bizSystemService.getEmployeeList"
      exportApi="bizSystemService.getEmployeeList"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
      :filterOptions="filterOptions"
    >
      <template v-slot:button>
        <el-button
          type="primary"
          size="mini"
          @click="eventHandle('addVisible')"
        >新增账单调整</el-button>
      </template>
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
          @click="eventHandle('detailVisible',row)"
        > 账单调整</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>

    <!-- 费用分摊详情 -->
    <detail
      :visible.sync="detailVisible"
      :rowData="rowData"
      @reload="this.$refs.table.reload()"
    />
    <!-- 新增账单调整-->
    <add
      type="add"
      :visible.sync="addVisible"
      :rowData="rowData"
      @reload="this.$refs.table.reload()"
    />
  </div>
</template>
<script>
import add from './add' // 新增账单调整
import detail from './details' //客户详情
let filterList = [
  { label: '排序', prop: 'sort', default: true, type: 'sort', options: [{ label: '最新跟进', value: '' }, { label: '最新录入', value: '' }], },
  { label: '商户编号、商户名称/简称', prop: 'title', default: true, type: 'text' },
  { label: '联系人、联系人电话', prop: 'city', default: true, type: 'text' },
  { label: '商机阶段', prop: 'pushTime', default: true, type: 'select', },
  { label: '跟进时间起止', prop: 'status', default: true, type: 'daterange' },
  { label: '维护人', prop: 'messageType', default: true, type: 'employee', },
]
export default {
  name: 'return',
  components: {
    add,
    detail
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
      addVisible: false,
      detailVisible: false,
      // 筛选框数据
      filterOptions: filterList
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
