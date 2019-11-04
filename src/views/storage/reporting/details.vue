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
    title="报溢/报损单"
    width="990px"
  >
    <div
      class="d-auto-y"
      style="height:calc(100vh - 130px)"
    >
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form>
            <reportingInfo :disabled='true' />
            <goodsOverflow />
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>

</template>
<script>
import reportingInfo from '@/components/formComponents/reporting-info'
import goodsOverflow from '@/components/formComponents/goods-overflow';
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData'],
  data() {
    return {
      status: [{ label: '生成/创建时间', value: '2019-9-21 10:04:38' }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      backVisible: false,
      isComponents: '',
      dialogData: {
        title: ''
      }
    };
  },
  components: {
    reportingInfo,
    goodsOverflow,
    SideDetail,
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
