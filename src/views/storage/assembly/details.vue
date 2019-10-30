/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  组装任务 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="drawerData.tableVisible"
    @close="$emit('update:visible',false)"
    title="组装任务"
    width="990px"
  >
    <template slot="button">
      <el-button
        @click="orderStorageVisible=true"
        size="mini"
        type="primary"
      >开始</el-button>
      <el-button
        @click="transferVisible=true"
        size="mini"
        type="primary"
      >转移</el-button>
      <el-button
        @click="hangVisible=true"
        size="mini"
        type="primary"
      >挂起</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <goodsAssemble />
          <assemblyInfo />
          <generateDeliver :status='status' />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="组装任务">组装任务</el-tab-pane>
    </el-tabs>
    <transfer
      :visible=transferVisible
      @update='update'
    />
    <hangUp
      :visible=hangVisible
      @update='update'
    />
  </SideDetail>

</template>
<script>
import goodsAssemble from '@/components/formComponents/goods-assemble'
import assemblyInfo from '@/components/formComponents/assembly-info';
import transfer from '@/components/formComponents/transfer';
import hangUp from '@/components/formComponents/hang-up';

import generateDeliver from './generate-deliver';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData'],
  data() {
    return {
      status: [{ label: '组装状态', value: '待组装' }, { label: '生成时间', value: '2019-9-21 10:04:38' }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      transferVisible: false,//转移
      hangVisible: true,//挂起
    };
  },
  components: {
    goodsAssemble,
    assemblyInfo,
    generateDeliver,
    SideDetail,
    transfer,
    hangUp
  },
  methods: {
    update() {
      this.transferVisible = false;
      this.hangVisible = false
    }
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
