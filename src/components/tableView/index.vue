/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 15:13:58
 * @Description: table-view组件
 * 在原有d-table组件上增加以下功能
 * @params title 表格顶部title
 * @params type 当前是哪个功能页
 * @params selection 表格是否支持多选 默认false
 * @params filter 是否显示筛选 默认false
 * @params moreButton 是否显示更多按钮 默认false
 * @slot filter 自定义筛选
 * @slot button 自定义操作按钮
 * @slot moreButton 自定义更多操作下拉按钮
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
    };
  },
  created() {
    console.log(this.selection);
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
      if (type == "export") {
        console.log("导出操作");
      } else if (type == "print") {
        console.log("打印操作");
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
    selectionChange(val) {
      console.log(val);

      this.$emit("selection-change", val);
    }
  }
};
</script>
