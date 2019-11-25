/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-25 17:16:38
 * @Description: table-view组件
 * 在原有d-table组件上增加以下功能
 * @params title 表格顶部title
 * @params busType 当前是哪个功能页
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
    busType="1"
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
        @click="quoteHandle('add')"
      >新建</el-button>
      <el-button
        size="mini"
        @click="quoteHandle('merge')"
      >合并生成出库单</el-button>
      <el-button
        size="mini"
        @click="quoteHandle('copy')"
      >复制生成报价单</el-button>
    </template>
    <template v-slot:moreButton>自定义更多按钮</template>
    <template slot-scope="{column,row,value,scope}">
      {{scope.$index}}
      <span @click="quoteHandle('quote',row)">报价单编号</span>
      <span @click="quoteHandle('sales',row)">销售单编号</span>
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
    element-loading-text="正在导出"
  >
    <table-top
      @staHandle="staHandle"
      @moreHandle="moreHandle"
      @column="columnHandle"
      @clear-filter="clearFilter"
      :title="title"
      :filter="this.filter"
      :moreButton="this.moreButton"
      :column="this.column"
      :statusData="statusList"
      :staData="staList"
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
      <template slot="filterTable">
        <slot
          name="filterTable"
          v-if="filterOptions || autoFilterOptions"
        >
          <dFilter
            v-model="params"
            :options="filterOptions || autoFilterOptions"
            @change="reload()"
          />
        </slot>
      </template>
      <template slot="top-filter">
        <slot name="top-filter" />
      </template>
    </table-top>

    <!-- 表格内容 -->
    <!-- <div
      class="ac mt35 d-text-gray"
      v-if="!headers.length"
    >暂无列内容</div> -->
    <!-- 插入树列表 兼容类似库房查询的页面样式 -->
    <!-- <template v-slot:tree> -->
    <slot name="tree"></slot>
    <!-- </template> -->
    <d-table
      class="d-table"
      :autoInit="false"
      @response="tabelRes"
      @selection-change="selectionChange"
      :params="params"
      :api="api"
      ref="table"
      :style="{height:tableHeader}"
    >
      <el-table-column
        v-if="selection"
        :selectable="selectable"
        :fixed="true"
        width="50"
        type="selection"
      ></el-table-column>
      <el-table-column
        v-for="(item,index) of headers"
        :key="index"
        show-overflow-tooltip
        :label="item.columnName"
        :min-width="item.width || 180"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <slot
            :column="item"
            :prop="item.columnFields"
            :row="scope.row"
            :scope="scope"
            :value="formatState(scope.row,item.columnFields)"
          />
        </template>
      </el-table-column>
    </d-table>
  </div>
</template>
<script>
import tableTop from "./table-top";
import { log } from 'util';
export default {
  components: {
    tableTop
  },
  props: {
    // 表格高度
    height: {
      type: String,
      default: "calc(100% - 46px)"
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
    busType: [String, Number], //当前表格类型
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
    // 筛选配置
    filterOptions: Array,
    selectable: Function,
    // 自定义头
    // headers: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      loading: false,
      // 表格头
      headers: [],
      // 选中多行
      selectionRow: [],
      // 状态数据列表
      statusList: [],
      // 财务统计数据列表
      staList: [],
      statusText: {},
      // 自动加载的筛选数据
      autoFilterOptions: null,
    };
  },
  created() {
    console.log(this.$parent.button);

  },
  mounted() {

  },
  computed: {

    // 判断当前表格的高度
    tableHeader() {
      // 如果首页有操作按钮 并且有统计
      if (this.$parent.button && this.staList.length) {
        return 'calc(100% - 110px)'
      }
      // 如果没有按钮 那一定也没有统计
      else if (!this.$parent.button) {
        return 'calc(100vh - 240px)'
      }
      // 否则就是默认高度
      else {
        return this.height
      }
    },
  },
  methods: {
    // 重新加载
    reload() {
      this.$refs.table && this.$refs.table.reload(1);
    },
    // 表格加载成功返回参数
    tabelRes(res) {
      // 获取状态列表数据
      this.statusList = this.$refs.table.response.statisticData || []
      // statusText统计状态
      this.statusList.forEach(item => {
        if (item.name != '全部') {
          this.statusText[item.state] = item.name
        }
      })
      // 获取统计列表数据(财务独有)
      this.staList = this.$refs.table.response.busStatisticData || []
      this.$emit('response', res)
    },
    // 统计点击筛选
    staHandle(row) {
      this.params.state = row.state;
      this.$refs.table.reload(1);
    },
    // 更多操作
    moreHandle(type) {
      // 导出操作
      if (type == "export") {
        this.loading = true;
        let params = {}
        if (this.selectionRow.length) {
          params = { ...this.params, ids: this.selectionRow.map(item => item.id), }
        } else {
          params = this.params
        }
        // 格式化导出接口
        let apiFn = this.exportApi.split('.').reduce((api, item) => api[item], this.$api)
        apiFn(params)
          .then(res => {
            if (res.data) {
              window.open(res.data)
              console.log("导出成功");
            } else {
              console.error("导出失败");
            }
          })
          .finally(() => {
            //关闭loading
            this.loading = false;
          });

      }
    },
    // 格式化状态和时间
    formatState(row, fields) {
      if (fields.match(/(Time|Date)/)) {
        return this.$options.filters.timeToStr(row[fields], 'YYYY-MM-DD HH:mm:ss')
      }
      else if (fields == 'state' || fields == 'approvalState') {
        return this.statusText[row[fields]]
      } else {
        return row[fields]
      }

    },
    // 返回的自定义列数据
    columnHandle(cols) {
      //  自定添加筛选
      if (!this.filterOptions) {
        let filterOptions = []
        cols.forEach(item => {
          // 过滤状态不用添加到筛选里的类型
          let notFilter = ['state', 'matchState']
          if (!notFilter.includes(item.columnFields)) {

            let type = 'text' //默认筛选类型是text
            let columnFields = item.columnFields //筛选字段
            let options = [] //筛选下拉数据

            // 如果字段里有时间那么筛选就是时间段类型
            if (item.columnFields.match(/Time|Date/)) {
              type = 'daterange'
            }
            // 如果是数量或者金额字段
            else if (item.columnFields.match(/Number|Amount/)) {
              type = 'numberrange'
            }
            // 如果是创建人
            else if (item.columnFields == 'creator' || item.columnFields == 'creatorName') {
              type = 'employee'
            }
            // 如果是有无合同
            else if (item.columnFields == 'isContract') {
              type = 'select'
              options = [{ label: '有', value: 1 }, { label: '无', value: 0 }]
            }
            // 收支状态
            else if (item.columnFields == 'incomeType') {
              type = 'select'
              options = [{ label: '付款', value: 1 }, { label: '收款', value: 0 }]
            }
            // 如果是账户信息
            else if (item.columnFields == 'companySettlementInfo') {
              columnFields = 'companySettlementId'
              type = 'account'
            }
            // 如果是部门
            else if (item.columnFields == 'deptTotalCode') {
              type = 'dept'
            }
            filterOptions.push(
              {
                label: item.columnName,
                prop: columnFields,
                default: true,
                type: type,
                options: options
              })
          }
        })
        this.autoFilterOptions = filterOptions
      }
      // 列表默认请求的就是全部列数据 所以这里就不用重新请求了
      this.headers = cols;
      this.$refs.table.reload(1)
    },
    // 多选
    selectionChange(val) {
      this.selectionRow = val
      this.$emit("selection-change", val);
    },
    clearFilter() {
      this.$emit('clear-filter')
    }
  }
};
</script>
