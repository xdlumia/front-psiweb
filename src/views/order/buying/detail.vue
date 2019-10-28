/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 17:17:05
 * @Description: 采购单详情
*/
<template>
  <side-popup :visible.sync="showPop" class="side-page" title="请购单" width="990px">
    <el-container class="wfull hfull">
      <el-header class="p0 d-bg-gray" style="height:70px;">
        <div class="pl10 pr10 ar">
          <el-button size="mini" type="primary">采购</el-button>
          <el-button size="mini" type="primary">借入</el-button>
        </div>
        <SideStatusbar />
      </el-header>
      <el-main class="p0">
        <el-tabs class="wfull hfull tabs-view">
          <el-tab-pane label="详情">
            <el-form>
              <CustomerInfo />
              <ApprovePanel />
              <CustomInfo />
              <CompanyInfo />
              <PayExpire />
              <ExtrasInfo />
              <ChooseMan />
              <BorrowOut />
              <PayBillDetail />
              <PaymentLog />
              <BorrowGoods />
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
          <el-tab-pane label="报价单">报价单</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </side-popup>
</template>
<script>
import SideStatusbar from '@/components/formComponents/side-statusbar';
import ApprovePanel from '@/components/formComponents/approve-panel';
import CustomInfo from '@/components/formComponents/custom-info';
import CustomerInfo from '@/components/formComponents/customer-info';
import CompanyInfo from '@/components/formComponents/company-info';
import PayExpire from '@/components/formComponents/pay-expire';
import ExtrasInfo from '@/components/formComponents/extras-info';
import ChooseMan from '@/components/formComponents/choose-man';
import BorrowOut from '@/components/formComponents/borrow-out';
import PayBillDetail from '@/components/formComponents/paybill-detail';
import PaymentLog from '@/components/formComponents/payment-log';
import BorrowGoods from '@/components/formComponents/borrow-goods';

export default {
  components: {
    SideStatusbar,
    ApprovePanel,
    CustomInfo,
    CompanyInfo,
    PayExpire,
    ExtrasInfo,
    CustomerInfo,
    ChooseMan,
    BorrowOut,
    PayBillDetail,
    PaymentLog,
    BorrowGoods
  },
  data() {
    return {
      showPop: true
    };
  }
};
</script>
<style lang="scss" scoped>
.side-page {
  /deep/ {
    > .popup-main {
      > .popup-head {
        font-weight: bold;
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
        padding: 0 10px;
        margin-bottom: 0;
        > .el-tabs__nav-wrap::after {
          background-color: #f2f2f2;
        }
      }
      & > .el-tabs__content {
        height: calc(100% - 40px);
        overflow: hidden;
        overflow-y: auto;
        padding: 0 10px;
      }
    }
  }
}
</style>