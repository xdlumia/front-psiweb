/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-04 11:53:09
 * @Description: 采购单详情
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="请购单" width="990px">
    <template slot="button">
      <el-button @click="orderStorageVisible=true" size="mini" type="primary">采购</el-button>
      <el-button @click="addBorrowInVisible=true" size="mini" type="primary">借入</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <arrivalInfo />
          <commodityInfo />
          <customInfo />
          <extrasInfo />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单">
        <FullscreenWrap>
          <OrderStorage />
        </FullscreenWrap>
      </el-tab-pane>
      <el-tab-pane label="报价单">
        <FullscreenWrap>
          <salesQuote />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <OrderStorageAdd :visible.sync="orderStorageVisible" from="请购" />
    <addBorrowIn :visible.sync="addBorrowInVisible" />
  </sideDetail>
</template>
<script>
import OrderStorageAdd from '../storage/edit';
import AddBorrowIn from '@/views/order/borrow/addIn';

export default {
  components: {
    OrderStorageAdd,
    AddBorrowIn
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
  },
  mounted() {
    this.checkVisible();
  },
  watch: {
    visible() {
      this.checkVisible();
    }
  },
  methods: {
    checkVisible() {
      this.showPop = this.visible;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>