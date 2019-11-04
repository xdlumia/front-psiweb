/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  报溢/报损单 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="drawerData.tableVisible"
    @close="$emit('update:visible',false)"
    title="破标题"
    width="990px"
  >
    <div
      class="d-auto-y"
      style="height:calc(100vh - 130px)"
    >
      <div class="drawer-header">
        <el-button
          @click="backVisible=true"
          size="mini"
          type="primary"
        >库房分布</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="成本明细">
          <el-form>
            <costDetails />
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品明细表">
          <commodityDetails />
        </el-tab-pane>
        <el-tab-pane label="供应商">
          供应商
        </el-tab-pane>
      </el-tabs>
    </div>
    <storehouseDistribution :visible.sync='backVisible' />
  </SideDetail>

</template>
<script>
import costDetails from '@/components/formComponents/cost-details'
import commodityDetails from '@/components/formComponents/commodity-details'
import storehouseDistribution from './storehouse-distribution'
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData'],
  data() {
    return {
      status: [{ label: '创建时间', value: '2019-9-21 10:04:38' }, { label: '创建人', value: '张三' }, { label: '来源', value: '销售单' }],
      backVisible: false,
      isComponents: '',
      dialogData: {
        title: ''
      }
    };
  },
  components: {
    costDetails,
    commodityDetails,
    SideDetail,
    storehouseDistribution
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
    width: 100% !important;
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
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
