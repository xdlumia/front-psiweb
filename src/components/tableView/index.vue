<template>
  <div class="wfull hfull">
    <el-container class="wfull hfull table-view" ref="tableView">
      <el-header class="request-fullscreen-button" style="height:20px;padding:0;padding-right:10px;" v-if="fullscreenAvailable">
        <!-- 全屏化按钮 -->
        <el-link :underline="false" @click="showInFullscreen=!showInFullscreen" class="fr" type="primary">全屏</el-link>
      </el-header>
      <el-header class="p5 pl10 pr10 table-header" style="height:60px;">
        <slot name="header">
          <!-- 标题 -->
          <span class="f20 b title d-elip d-hidden">{{title}}</span>
          <!-- 状态按钮组 -->
          <span class="status-btn">
            <el-link :underline="false">全部</el-link>
            <el-link :underline="false" type="primary">待完成</el-link>
          </span>
        </slot>
        <!-- 右侧按钮组 -->
        <span class="footer-btns">
          <slot name="header-button" />
          <el-dropdown trigger="click">
            <span class="iconfont icongengduo1" title="更多"></span>
            <el-dropdown-menu slot="dropdown">
              <slot name="more-button">
                <el-dropdown-item>导出</el-dropdown-item>
                <el-dropdown-item>打印</el-dropdown-item>
              </slot>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 筛选 -->
          <el-popover placement="bottom" ref="filterPopover" trigger="click" width="200">
            <div class="table-filter-box">
              <el-container>
                <el-header style="height:30px;">
                  <span>筛选</span>
                  <el-link :underline="false" @click="closeFilter" class="el-icon-close close" title="关闭"></el-link>
                </el-header>
                <el-main style="max-height:500px;"></el-main>
                <el-footer style="height:30px;">
                  <el-link :underline="false" class="el-icon-circle-plus-outline" type="primary">添加筛选</el-link>
                  <el-link :underline="false" class="fr" type="primary">清空筛选</el-link>
                </el-footer>
              </el-container>
            </div>
            <span class="iconfont iconshaixuan" slot="reference" title="筛选"></span>
          </el-popover>

          <!-- 自定义列表 -->
          <span @click="showCustomColumn=!showCustomColumn" class="iconfont iconcolumns" title="自定义列"></span>
        </span>
      </el-header>
      <el-main class="wfull hfull p0">
        <d-table :api="api" class="hfull table">
          <slot name="table-body">
            <el-table-column
              :fixed="item.fixed"
              :key="index"
              :label="item.label"
              :min-width="item.width"
              :type="item.type"
              v-for="(item,index) of headers"
            >
              <template slot-scope="scope">
                <slot :column="item" :row="scope.row" :value="scope.row[item.prop]" />
              </template>
            </el-table-column>
          </slot>
        </d-table>
      </el-main>
    </el-container>
    <FullscreenElement :element="$refs.tableView" :visible.sync="showInFullscreen" />
    <CustomColumn :headers="headers" :visible.sync="showCustomColumn" />
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreenElement';
import CustomColumn from './customColumn';
/**
 * @author 赵伦 2019-10-24
 * @description 大列表页面模板
 */
export default {
  components: {
    FullscreenElement,
    CustomColumn
  },
  props: {
    title: String, // 页面标题
    fullscreenAvailable: Boolean, // 是否显示全屏操作
    api: String, // 接口
    headers: Array // 列头数据
  },
  data() {
    return {
      showInFullscreen: false,
      showCustomColumn: false
    };
  },
  methods: {
    closeFilter() {
      this.$refs.filterPopover.doClose();
    }
  }
};
</script>
<style lang="scss" scoped>
.table-view {
  border: 1px solid #ededed;
  border-radius: 10px;
  .p0 {
    padding: 0;
  }
  .table-header {
    display: flex;
    align-items: center;
    user-select: none;
    position: relative;
    > .title {
      display: inline-block;
      width: 120px;
    }
    .status-btn {
      display: inline-block;
      > * {
        margin-right: 24px;
        font-size: 16px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .footer-btns {
      position: absolute;
      right: 10px;
      top: 0;
      height: 24px;
      bottom: 0;
      margin: auto;
      > * {
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
  .table {
    /deep/ {
      > .el-pagination {
        position: relative;
        &::before {
          left: 0;
          top: -1px;
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background-color: #ebeef5;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.table-filter-box {
  margin: -10px;
  user-select: none;
  .el-header {
    height: 30px;
    text-align: center;
    line-height: 30px;
    padding: 0;
    .close {
      float: right;
      margin: 8px 0;
      cursor: pointer;
      margin-right: 10px;
      font-size: 16px;
    }
  }
  .el-footer {
    line-height: 30px;
    padding: 0 2px;
  }
}
</style>
