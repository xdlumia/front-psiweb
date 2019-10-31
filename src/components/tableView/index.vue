/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 17:03:25
 * @Description: table-view组件
 * 在原有d-table组件上增加以下功能
 * @params title 表格顶部title
 * @params type 当前是哪个功能页
 * @params selection 表格是否支持多选 默认false
 * @params filter 是否显示筛选 默认false
 * @params exportApi 导出api接口
 * @params moreButton 是否显示更多按钮 默认false
 * @slot filter 自定义筛选
 * @slot button 自定义操作按钮
 * @slot moreButton 自定义更多操作下拉按钮
 * @example 
  <!-- 
  <table-view
    type="1"
    ref="table"
    :filter="true"
    :moreButton="true"
    :column="true"
    title="报价单"
    api="bizSystemService.getEmployeeList"
    :params="queryForm"
    @selection-change="selectionChange"
  >
    <template v-slot:filter>自定义筛选列</template>
    <!-- 自定义按钮功能 
    <template v-slot:button>
      <el-button
        size="mini"
        type="primary"
        @click="quotoHandle('add')"
      >新建</el-button>
      <el-button
        size="mini"
        @click="quotoHandle('merge')"
      >合并生成出库单</el-button>
      <el-button
        size="mini"
        @click="quotoHandle('copy')"
      >复制生成报价单</el-button>
    </template>
    <template v-slot:moreButton>自定义更多按钮</template>
    <template slot-scope="{column,row,value,scope}">
      {{scope.$index}}
      <span @click="quotoHandle('quoto',row)">报价单编号</span>
      <span @click="quotoHandle('sales',row)">销售单编号</span>
      <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
      <span v-else>{{value}}</span>
    </template>
  </table-view>
-->
 */
<template>
  <div
    class="main-content"
    v-loading="loading"
    element-loading-text="正在初始化"
  >
    <tableTop
      @staHandle="staHandle"
      @moreHandle="moreHandle"
      @column="columnHandle"
      @clear-filter="clearFilter"
      :title="title"
      :filter="this.filter"
      :moreButton="this.moreButton"
      :column="this.column"
    >
      <!-- 自定义按钮 -->
      <template v-slot:button>
        <slot name="button"></slot>
      </template>
      <!-- 自定义更多按钮 -->
      <template v-slot:moreButton>
        <slot name="moreButton"></slot>
      </template>
      <!-- 自定义筛选 -->
      <template v-slot:filter>
        <slot name="filter"></slot>
      </template>
    </tableTop>

    <!-- 表格内容 -->
    <div
      class="ac mt35 d-text-gray"
      v-if="!headers.length"
    >暂无列内容</div>
    <d-table
      v-if="headers.length"
      @selection-change="selectionChange"
      :params="params"
      :api="api"
      ref="table"
      :style="{height:height}"
    >
      <el-table-column
        v-if="selection"
        :fixed="true"
        width="50"
        type="selection"
      ></el-table-column>
      <el-table-column
        :fixed="item.fixed"
        :key="index"
        :label="item.label"
        :min-width="item.width"
        v-for="(item,index) of headers"
      >
        <template slot-scope="scope">
          <slot
            :column="item"
            :row="scope.row"
            :scope="scope"
            :value="scope.row[item.prop]"
          />
        </template>
      </el-table-column>
    </d-table>
  </div>
</template>
<script>
import tableTop from "./table-top";
export default {
  components: {
    tableTop
  },
  props: {
    // 表格高度
    height: {
      type: String,
      default: "calc(100% - 40px)"
    },
    // 是否显示多选
    selection: {
      default: true,
      type: Boolean
    },
    //filter参数
    params: {
      type: [Object, String, Number],
      default: function () {
        return { page: 1, limit: 15 };
      }
    },
    api: String, // 接口
    // 标题
    title: String,
    type: "", //当前表格类型
    // 是否显示筛选
    filter: {
      type: Boolean,
      default: true
    },
    // 是否显示更多按钮
    moreButton: {
      type: Boolean,
      default: true
    },
    // 是否显示自定义列
    column: {
      type: Boolean,
      default: true
    },
    // 是否显示自定义列
    exportApi: {
      type: String,
    },
    // 自定义头
    // headers: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      loading: false,
      headers: [],
      selectionRow: []
    };
  },
  created() {
  },
  methods: {
    reload() {
      this.$refs.table.reload(1);
    },
    // 统计点击筛选
    staHandle(row) {
      this.params.id = row.id;
      this.$refs.table.reload(1);
    },
    // 更多操作
    moreHandle(type) {
      // 导出操作
      if (type == "export") {
        this.loading = true;
        let server = this.exportApi.split('.')[0]
        let url = this.exportApi.split('.')[1]
        let params = {}
        if (this.selectionRow.length) {
          params = { ids: this.selectionRow.map(item => item.id) }
        } else {
          params = this.params
        }
        this.$api[server][url](params)
          .then(res => {
            console.log("导出成功");
          })
          .finally(() => {
            //关闭loading
            this.loading = false;
          });

      }
    },
    // 返回的列数据
    columnHandle(cols) {
      this.headers = cols;
      this.params.cols = cols.map(r => r.id);
      setTimeout(() => {
        this.$refs.table.reload(1);
      });
    },
    // 多选
    selectionChange(val) {
      this.selection = val
      this.$emit("selection-change", val);
    },
    clearFilter() {
      this.$emit('clear-filter')
    }
  }
};
</script>
