/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 20:28:36
 * @Description: 表格头部 
 */
<template>
  <div>
    <div class="pl15 pr15 d-flex-lr table-header-box">
      <section class="d-flex-lr">
        <div
          class="b f16"
          style="white-space:nowrap;margin-right:30px; color:#333;"
        >{{title}}</div>
        <div class="f12 d-text-qgray d-auto-x">
          <span
            class="mr20 sta-item"
            :class="{active:index == staActive}"
            @click="staHandle(item,index)"
            v-for="(item,index) of staList"
            :key="item.id"
          >{{item.title || '无'}}({{item.id}})</span>
        </div>
      </section>
      <section
        class="table-header-tool"
        style="white-space:nowrap;"
      >
        <slot name="button">
        </slot>
        <!-- 更多功能 -->
        <el-dropdown
          trigger="click"
          v-if="moreButton"
        >
          <el-button
            size="mini"
            class="tool-item ml15"
            icon="el-icon-more"
            title="更多"
          ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="$emit('moreHandle', 'export')">导出</span>
            </el-dropdown-item>
            <slot name="moreButton"></slot>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 筛选 -->
        <el-popover
          v-if="filter"
          placement="bottom"
          v-model="filterPopover"
          trigger="click"
          width="250"
        >
          <div class="table-filter-box">
            <div
              class="bb mb10"
              style="height:25px;"
            >
              <span
                class="b"
                style="margin-left:112px"
              >筛选</span>
              <el-link
                :underline="false"
                @click="filterPopover = false"
                class="el-icon-close close fr"
                title="关闭"
              ></el-link>
            </div>
            <div style="max-height:500px;">
              <slot name="filter">
                自定义筛选 使用示例:
                <br />&lt;template v-slot:filter> content&lt;/template>
              </slot>
            </div>
            <div style="height:30px; line-height:30px;">
              <el-link
                size="mini"
                :underline="false"
                class="el-icon-circle-plus-outline"
                type="primary"
              >添加筛选</el-link>
              <el-link
                size="mini"
                :underline="false"
                class="fr"
                type="primary"
              >清空筛选</el-link>
            </div>
          </div>
          <el-button
            size="mini"
            class="tool-item ml15"
            slot="reference"
            title="筛选"
            icon="iconfont icon-filter"
          ></el-button>
        </el-popover>
        <!-- 自定义列功能 -->
        <el-button
          v-if="column"
          @click="showCustomColumn=!showCustomColumn"
          size="mini"
          class="tool-item ml15"
          icon="iconfont icon-col"
          title="自定义列"
        ></el-button>
      </section>
    </div>
    <!-- 自定义列弹出框 -->
    <el-dialog
      width="800px"
      append-to-body
      v-dialogDrag
      :visible.sync="showCustomColumn"
      title="自定义列"
    >
      <div
        class="custom-column-view"
        v-loading="loading"
      >
        <div class="mb10">选择显示列（拖拽可调整排序）</div>
        <el-checkbox-group
          class="table-col-group"
          v-model="checkTableCol"
          size="mini"
        >
          <draggable v-model="tableColList">
            <el-checkbox-button
              class="mb5 mr5"
              :label="item.id"
              v-for="item in tableColList"
              :key="item.id"
            >{{item.title || '无title'}}</el-checkbox-button>
          </draggable>
        </el-checkbox-group>
        <div class="ac">
          <el-button
            @click="showCustomColumn = false"
            size="small"
          >取 消</el-button>
          <el-button
            @click="colConfirm"
            size="small"
            type="primary"
          >确 定</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "table-top",
  components: {
    draggable
  },
  props: {
    // s
    title: {
      default: ''
    },
    // 参数类型,查询统计和自定义列
    type: "",
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
    }
  },
  data() {
    return {
      loading: false,
      // 统计数据
      staList: [],
      //当前下标
      staActive: 0,
      // 筛选框是否显示
      filterPopover: false,
      // 自定义列是否显示
      showCustomColumn: false,
      // 自定义列数据
      tableColList: [],
      checkTableCol: [],
      // 临时测试数据
      tableHeader: [
        {
          label: "合同编号",
          prop: "deptName",
          width: "180"
        },
        {
          label: "采购入库单编号",
          prop: "deptName",
          width: "180"
        },
        { label: "供应商名称", prop: "deptName", width: "180" },
        { label: "总计数量", prop: "deptName", width: "180" },
        { label: "总计采购价", prop: "deptName", width: "180" },
        { label: "预计到货时间", prop: "deptName", width: "180" },
        { label: "合同创建人", prop: "deptName", width: "180" },
        { label: "创建部门", prop: "deptName", width: "180" },
        { label: "创建时间", prop: "createTime", width: "180" }
      ]
    };
  },
  created() {
    // 获取统计数据
    this.collegeManagerList();
    // // 获取列数据
    this.getTableCol();
  },
  methods: {
    // 获取统计数据
    collegeManagerList() {
      this.$api.seePumaidongService
        .collegeManagerList({ type: this.type, page: 1, limit: 8 })
        .then(res => {
          this.staList = res.data || [];
        });
    },
    // 统计筛选操作
    staHandle(row, index) {
      this.staActive = index;
      this.$emit("staHandle", row);
    },
    // 获取自定义列的值
    getTableCol() {
      this.$api.seePumaidongService
        .collegeManagerList({ page: 1, limit: 20 })
        .then(res => {
          this.tableColList = res.data || [];
          // 返回列数据
          this.$emit("column", this.tableHeader);
        });
    },
    // 自定义列提交
    colConfirm() {

      if (!this.checkTableCol.length) {
        this.$message({
          type: "error",
          message: "必须选择一列",
          showClose: true
        });
        return;
      }
      this.loading = true
      this.$api.seePumaidongService
        .collegeManagerList(this.checkTableCol)
        .then(res => {
          // 返回列数据
          this.$emit("column", this.tableHeader);
          // 保存成功
          this.showCustomColumn = false;
        })
        .finally(err => {
          this.loading = false
        })
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.table-header-box {
  justify-content: space-between;
  height: 45px;
  border: 1px solid #efefef;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  .sta-item {
    display: inline-block;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      color: #409eff;
    }
    &.active {
      font-weight: bold;
      color: #409eff;
    }
  }
}
.table-header-tool {
  .tool-item.el-button--mini {
    width: 28px;
    height: 28px;
    padding: 0;
  }
}
</style>
<style lang="scss">
.table-col-group {
  .el-checkbox-button .el-checkbox-button__inner {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    border-color: #409eff;
  }
}
</style>
