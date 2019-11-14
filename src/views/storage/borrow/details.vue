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
    :visible.sync="visible"
    @close="close"
    :title="'借入借出任务-'+detailForm.borrowLoanCode"
    width="990px"
  >
    <div>
      <div class="drawer-header">

        <!-- v-if="drawerData.borrowLoanState == 4 || drawerData.borrowLoanState == 6 || drawerData.borrowLoanState == 9" -->
        <el-button
          @click="backVisible=true,isComponents = 'borrowPayback',dialogData.title='借入归还-UYGVUOUY'"
          size="mini"
          type="primary"
        >归还</el-button>
        <!-- v-if="drawerData.borrowLoanState == 5 || drawerData.borrowLoanState == 7 || drawerData.borrowLoanState == 8" -->
        <el-button
          @click="backVisible=true,isComponents = 'lendBack',dialogData.title='借出返还-'+detailForm.borrowLoanCode"
          size="mini"
          type="primary"
        >返还</el-button>

        <!-- v-if="drawerData.borrowLoanState == 2 || drawerData.borrowLoanState == 4 || drawerData.borrowLoanState == 9" -->
        <el-button
          @click="backVisible=true,isComponents = 'borrowScanCode',dialogData.title='借入扫码-'+detailForm.borrowLoanCode"
          size="mini"
          type="primary"
        >借入扫码</el-button>

        <!-- v-if="drawerData.borrowLoanState == 3 || drawerData.borrowLoanState == 5 || drawerData.borrowLoanState == 10" -->
        <el-button
          @click="backVisible=true,isComponents = 'lendScanCode',dialogData.title='借出扫码-'+detailForm.borrowLoanCode"
          size="mini"
          type="primary"
        >借出扫码</el-button>
      </div>
      <el-tabs class="wfull hfull tabs-view">
        <el-tab-pane label="详情">
          <el-form
            size="mini"
            :model="detailForm"
            v-if="detailForm"
          >
            <borrowIn
              :data="detailForm"
              disabled
            />
            <borrowGoods
              :data="detailForm"
              v-if="detailForm"
              disabled
            />
            <el-dialog
              :visible.sync="backVisible"
              :title="dialogData.title"
              v-dialogDrag
            >
              <components
                :is='isComponents'
                :data='detailForm'
                @close='close'
                @reload='reload'
              >
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
import borrowIn from '@/components/formComponents/borrow-in'
import borrowGoods from '@/components/formComponents/borrow-goods';
import SideDetail from '@/components/side-detail';
import borrowPayback from './borrow-payback';//借入归还
import lendBack from './lend-back';//借出返还
import borrowScanCode from './borrow-scan-code';//借入扫码
import lendScanCode from './lend-scan-code';//借出扫码

export default {
  props: ['drawerData', 'visible'],
  data() {
    return {
      status: [{ label: '借入/借出状态', value: '待归还/待返还' }, { label: '生成时间', value: '2019-9-21 10:04:38', isTime: true }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      backVisible: false,
      lendVisible: false,
      borrowVisible: false,
      lendCodeVisible: false,
      isComponents: 'borrowPayback',
      dialogData: {
        title: ''
      },
      state: {
        2: '待借入',
        3: '待借出',
        4: '部分借入',
        5: '部分借出',
        6: '待归还',
        7: '待返还',
        8: '部分返还',
        9: '部分归还',
        10: '完成返还',
        11: '完成归还',
        '-1': '终止',
      },
      detailForm: {}
    };
  },
  components: {
    borrowIn,
    borrowGoods,
    borrowPayback,
    SideDetail,
    lendBack,
    borrowScanCode,
    lendScanCode
  },
  mounted() {
    this.wmsallocationorderInfo()
  },
  methods: {
    close() {
      this.backVisible = false

      this.$emit('update:visible', false)
    },
    reload() {
      this.$emit('reload')
    },
    //查看调拨单详情
    wmsallocationorderInfo() {
      this.$api.seePsiWmsService.wmsborrowloanorderQueryInfoByOrderCode(null, this.drawerData.borrowLoanOrderCode)
        .then(res => {
          this.detailForm = res.data || {}
          this.status[0].value = this.state[res.data.borrowLoanState] || '全部'
          this.status[1].value = res.data.createTime
          this.status[2].value = res.data.creatorName
          this.status[3].value = res.data.deptName
          this.status[4].value = res.data.source
          console.log(this.detailForm, 'this.detailFormthis.detailFormthis.detailForm')
          this.detailForm.commodityList = this.detailForm.commodityShowList || [];
        })
        .finally(() => {

        })
    },
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
