/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  借入借出任务 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="drawerData.tableVisible"
    @close="$emit('update:visible',false)"
    title="借入借出任务"
    width="990px"
  >
    <div
      class="d-auto-y"
      style="height:calc(100vh - 160px)"
    >
      <div class="drawer-header">
        <el-button
          @click="backVisible=true,isComponents = 'borrowPayback',dialogData.title='借入归还-UYGVUOUY'"
          size="mini"
          type="primary"
        >归还</el-button>
        <el-button
          @click="backVisible=true,isComponents = 'lendBack',dialogData.title='借出返还-UYGVUOUY'"
          size="mini"
          type="primary"
        >返还</el-button>
        <el-button
          @click="backVisible=true,isComponents = 'borrowScanCode',dialogData.title='借入扫码-UYGVUOUY'"
          size="mini"
          type="primary"
        >借入扫码</el-button>
        <el-button
          @click="backVisible=true,isComponents = 'lendScanCode',dialogData.title='借出扫码-UYGVUOUY'"
          size="mini"
          type="primary"
        >借出扫码</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form>
            <lendInfo />
            <borrowGoods />
            <el-dialog
              center
              :visible.sync="backVisible"
              :title="dialogData.title"
              v-dialogDrag
            >
              <components :is='isComponents'>
              </components>
            </el-dialog>
            <!-- <borrowPayback :visible='backVisible' />
            <lendBack :visible='lendVisible' />
            <borrowScanCode :visible='borrowVisible' />
            <lendScanCode :visible='lendCodeVisible' /> -->
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="借入借出单">借入借出单</el-tab-pane>
      </el-tabs>
    </div>
  </SideDetail>

</template>
<script>
import lendInfo from '@/components/formComponents/lend-info'
import borrowGoods from '@/components/formComponents/borrow-goods';
import SideDetail from '@/components/side-detail';
import borrowPayback from './borrow-payback';//借入归还
import lendBack from './lend-back';//借出返还
import borrowScanCode from './borrow-scan-code';//借入扫码
import lendScanCode from './lend-scan-code';//借出扫码

export default {
  props: ['drawerData'],
  data() {
    return {
      status: [{ label: '借入/借出状态', value: '待归还/待返还' }, { label: '生成时间', value: '2019-9-21 10:04:38' }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      backVisible: false,
      lendVisible: false,
      borrowVisible: false,
      lendCodeVisible: false,
      isComponents: 'borrowPayback',
      dialogData: {
        title: ''
      }
    };
  },
  components: {
    lendInfo,
    borrowGoods,
    borrowPayback,
    SideDetail,
    lendBack,
    borrowScanCode,
    lendScanCode
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
</style>
