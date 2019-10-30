/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 15:35:28
 * @Description: 采购单详情
*/
<template>
  <SideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="请购单" width="990px">
    <template slot="button">
      <el-button @click="orderStorageVisible=true" size="mini" type="primary">采购</el-button>
      <el-button @click="addBorrowInVisible=true" size="mini" type="primary">借入</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <CommodityInfo />
          <CustomInfo />
          <ExtrasInfo />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
      <el-tab-pane label="报价单">报价单</el-tab-pane>
    </el-tabs>
    <OrderStorage :visible.sync="orderStorageVisible" from="请购" />
    <AddBorrowIn :visible.sync="addBorrowInVisible" />
  </SideDetail>
</template>
<script>
import CustomInfo from '@/components/formComponents/custom-info';
import ExtrasInfo from '@/components/formComponents/extras-info';
import SideDetail from '@/components/side-detail';
import SideStatusbar from '@/components/formComponents/side-statusbar';
import CommodityInfo from '@/components/formComponents/commodity-info'; // 商品信息
import OrderStorage from '../storage/edit';
import AddBorrowIn from '@/views/order/borrow/addIn';

export default {
  components: {
    CustomInfo,
    ExtrasInfo,
    SideStatusbar,
    SideDetail,
    OrderStorage,
    AddBorrowIn,
    CommodityInfo
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: true,
      orderStorageVisible: false,
      addBorrowInVisible: false,
      status: [
        { label: '状态', value: '新建' },
        { label: '单据创建人', value: '张收纳' },
        { label: '创建部门', value: '销售部' },
        { label: '创建时间', value: +new Date(), isTime: true },
        { label: '来源', value: '新建' }
      ]
    };
  }
};
</script>
<style lang="scss" scoped> 
</style>