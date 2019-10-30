/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  销售单 详情组件
 */
<template>
  <SideDetail
    :status="status"
    :visible.sync="drawerData.tableVisible"
    @close="$emit('update',false)"
    title="发货单"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="orderStorageVisible=true"
        size="mini"
        type="primary"
      >采购</el-button>
      <el-button
        @click="addBorrowInVisible=true"
        size="mini"
        type="primary"
      >借入</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <pickingDeliverEditable />
          <pickingLogisticsEditable />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="销售单">销售单</el-tab-pane>
    </el-tabs>
  </SideDetail>
</template>
<script>
import pickingDeliverEditable from '@/components/formComponents/picking-deliver-editable'
import pickingLogisticsEditable from '@/components/formComponents/picking-logistics-editable';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData'],
  data() {
    return {
      status: [{ label: '生成时间', value: '2019-9-21 10:04:38' }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
    };
  },
  components: {
    pickingDeliverEditable,
    pickingLogisticsEditable,
    SideDetail
  }
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
