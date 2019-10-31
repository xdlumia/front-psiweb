/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  组装单 详情组件
 */
<template>
  <SideDetail
    :status="status"
    :visible.sync="drawerData.tableVisible"
    @close="$emit('update:visible',false)"
    title="组装单"
    width="990px"
  >
    <template slot="button">
      <el-button
        type="primary"
        size='mini'
        @click="taskVisible = true"
      >
        生成拣货单和组装任务</el-button>
      <el-button
        type="primary"
        size='mini'
        :visible='addVisible'
        @close='addVisible = false'
      >终止</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <assembleNoedit />
          <assembleInfo :disabled='true' />
          <assemblyTask
            :visible='taskVisible'
            @close='taskVisible = false'
          />
          <commodityInfo />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="销售单">销售单</el-tab-pane>
      <el-tab-pane label="拣货单">拣货单</el-tab-pane>
      <el-tab-pane label="组装任务">组装任务</el-tab-pane>
      <el-tab-pane label="发货单">发货单</el-tab-pane>
      <el-tab-pane label="销售出库单">销售出库单</el-tab-pane>
      <el-tab-pane label="借入单">借入单</el-tab-pane>
      <el-tab-pane label="应收账单">应收账单</el-tab-pane>
    </el-tabs>
  </SideDetail>
</template>
<script>
import assembleNoedit from '@/components/formComponents/assemble-noedit'
import assembleInfo from '@/components/formComponents/assemble-info';
import assemblyTask from './assembly-task';
import commodityInfo from '@/components/formComponents/commodity-info';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData'],
  data() {
    return {
      status: [{ label: '组装状态', value: '待拆卸' }, { label: '生成时间', value: '2019-9-21 10:04:38' }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      taskVisible: false
    };
  },
  components: {
    assembleNoedit,
    assembleInfo,
    assemblyTask,
    commodityInfo,
    SideDetail
  },
}
</script>
<style lang='scss' scoped>
.side-page {
  .header-btns {
    position: absolute;
    right: 40px;
    top: 12px;
  }
  /deep/ {
    > .popup-main {
      > .popup-head {
        font-weight: bold;
        font-size: 18px;
        > .d-inline > .popup-close {
          position: absolute;
          right: 10px;
          top: 16px;
        }
      }
      > .popup-body {
        padding: 0;
        overflow: hidden;
      }
    }
  }
  .tabs-view {
    position: relative;
    /deep/ {
      & > .el-tabs__header {
        background-color: #f2f2f2;
        padding: 0 20px;
        margin-bottom: 0;
        > .el-tabs__nav-wrap::after {
          background-color: #f2f2f2;
        }
      }
      & > .el-tabs__content {
        height: calc(100% - 40px);
        overflow: hidden;
        overflow-y: auto;
        padding: 0 20px;
      }
    }
  }
}
</style>
