/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-17 15:56:35
 * @Description: 表格头部 
 */
<template>
  <div>
    <div class="table-header-box">
      <div class="d-flex-lr table-header-top">
        <!-- 表格顶部状态 -->
        <section class="d-flex-lr">
          <div
            class="b f16 d-nowrap"
            style="margin-right:30px; color:#333;"
          >{{title}}</div>
          <slot name="top-filter"></slot>
          <div
            v-if="this.$parent.$parent.button"
            class="f12 d-text-qgray d-auto-x"
          >
            <span
              class="mr20 sta-item"
              :class="{active:index == staActive}"
              @click="staHandle(item,index)"
              v-for="(item,index) of statusData"
              :key="item.id"
            >{{item.name || '无'}}({{item.count||0}})</span>
          </div>
        </section>
        <!-- 表格顶部统计 财务用到 -->
        <section class="table-header-tool d-nowrap">
          <slot
            name="button"
            v-if="$parent.$parent.button"
          >
          </slot>

          <!-- 更多功能 跟产品刘晨辉沟通直接放在外面 -->
          <el-button
            size="mini"
            @click="$emit('moreHandle', 'export')"
            v-if="exportButton"
          >导出
          </el-button>
          <slot name="exportButton"></slot>
          <!-- <el-dropdown
            trigger="click"
            v-if="exportButton"
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
              <slot name="exportButton"></slot>
            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- 筛选 -->
          <el-popover
            v-if="filter"
            placement="bottom"
            v-model="filterPopover"
            trigger="click"
            width="280"
            @hide="closeFilter"
          >
            <el-link
              :underline="false"
              @click="filterPopover = false"
              class="el-icon-close close fr"
              style="margin-top:2px;"
              title="关闭"
            ></el-link>
            <slot name="filterTable">
              <div class="table-filter-box">
                <div
                  class="bb mb10"
                  style="height:25px;"
                >
                  <span
                    class="b"
                    style="margin-left:112px"
                  >筛选</span>
                </div>
                <div
                  class="d-auto-y"
                  style="max-height:400px; overflow-x:hidden"
                >
                  <slot name="filter">
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
                    @click="clearFilter"
                    :underline="false"
                    class="fr"
                    type="primary"
                  >清空筛选</el-link>
                </div>
              </div>
            </slot>
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
      <div
        class="table-header-sta d-flex"
        v-if="isShowSta"
      >
        <div
          v-for="(item,index) of staData"
          :key="index"
          class="table-sta-item"
        >
          <p class="d-nowrap d-text-gray f13 mb5">{{item.name||'未命名'}}({{item.count}}笔)</p>
          <p
            class="f24"
            style="color:#333"
          >{{(item.amount||0) | milliFormat}}</p>
        </div>
      </div>
    </div>
    <!-- 自定义列弹出框 -->
    <el-dialog
      width="800px"
      top="100px"
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
        <!-- <el-checkbox-group 
        class="table-col-group"
        v-model="checkTableCol"
        size="mini"
        >-->
        <p
          class="ac d-text-gray"
          v-if="!tableColList.length"
        >暂无数据</p>
        <draggable v-model="tableColList">
          <el-button
            class="col-button mb10"
            size="mini"
            @click="item.isDisplay = !item.isDisplay"
            :type="item.isDisplay?'':'primary'"
            :label="item.id"
            v-for="item in tableColList"
            :key="item.id"
          >{{item.columnName || '无title'}}</el-button>
        </draggable>
        <!-- </el-checkbox-group> -->
        <div class="ac mt10">
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
    // 财务统计数据 列表(只有财务用到)
    staData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 状态数据 列表
    statusData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // title
    title: {
      default: ''
    },
    // 是否显示筛选
    filter: {
      type: Boolean,
      default: true
    },
    // 是否显示更多按钮
    exportButton: {
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
      //当前下标
      staActive: 0,
      // 筛选框是否显示
      filterPopover: false,
      // 自定义列是否显示
      showCustomColumn: false,
      // 自定义列数据
      tableColList: [], //表格列 表头数据
    };
  },
  created() {
    // 获取列数据
    this.getTableCol();
  },
  computed: {
    // 是否显示统计 
    isShowSta() {
      // 如果staData有数据则显示统计
      return this.staData.length && this.$parent.$parent.button
    }
  },
  methods: {
    // 统计筛选操作
    staHandle(row, index) {
      this.staActive = index;
      this.$emit("staHandle", row);
    },
    // 获取自定义列的值
    getTableCol() {
      if (!this.column) return
      // 获取busType参数
      let busType = this.$parent.busType
      this.$api.seePsiCommonService.customcolumnGetListAll({ busType: busType })
        .then(res => {
          //登陆过来以后请求的数据权限
          let dataAuthList = this.$local.fetch('dataAuthList') || []
          //库存查询需要做的所有数据权限的校验数据
          let colSettingArr = []
          if (dataAuthList.length > 0) {
            dataAuthList.forEach((item) => {
              //psi_wms_data_01  库存查询对应的code , 建平说目前只有库存查询做这个校验，所以写死，不影响其它页面
              if (item.code == 'psi_wms_data_01') {
                colSettingArr = item.colSetting || []
              }
            })
          } else {
            colSettingArr = [{ fieldCode: "minimumPurchasePrice", type: 0 }, { fieldCode: "inventoryPrice", type: 0 }]
          }
          this.tableColList = res.data || [];
          this.tableColList.forEach((item, index) => {
            colSettingArr.forEach((n) => {
              //这里 type = 0 是不显示
              if ((n.fieldCode == item.columnFields) && (n.type == 0)) {
                //有一样的，type为0 的，就不在自定义表头里面显示
                this.tableColList[index] = null
              }
            })
          })
          this.tableColList = this.tableColList.filter(item => item)
          let showHeader = this.tableColList.filter(item => !item.isDisplay)
          // 返回列数据
          this.$emit("column", showHeader);
        });
    },
    // 清空筛选
    clearFilter() {
      this.$emit('clear-filter')
    },
    closeFilter() {
      this.$emit('closeFilter')
    },
    // 自定义列提交
    colConfirm() {
      // item.isDisplay == 0 或者false的时候证明是选中了 这值定义的很奇怪对不对? enen
      // 获取选中的列
      let showHeader = this.tableColList.filter(item => !item.isDisplay)
      if (!showHeader.length) {
        this.$message({
          type: "error",
          message: "必须选择一列",
          showClose: true
        });
        return;
      }
      this.loading = true
      let params = {
        // busType是父级里的参数接收的 所以从父级里面取
        busType: this.$parent.busType,
        ids: showHeader.map(item => item.id)
      }
      this.$api.seePsiCommonService.customcolumnUpdate(params)
        .then(res => {
          // 返回列数据 
          this.$emit("column", showHeader);
          // 保存成功
          this.showCustomColumn = false;
        })
        .finally(err => {
          this.loading = false
        })
    }
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
.table-header-box {
  padding: 8px 15px;
  border: 1px solid #efefef;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  .table-header-top {
    height: 30px;
    justify-content: space-between;
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
  .table-header-sta {
    padding-top: 10px;
    .table-sta-item {
      padding-right: 20px;
      border-left: 1px solid #efefef;
      padding-left: 20px;
      &:first-child {
        padding-left: 0;
        border-left: none;
      }
    }
  }
}
.col-button.el-button {
  width: 142px;
  margin-left: 0px;
  margin-right: 10px;
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
