/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 15:48:20
 * @Description: 销售合同
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="销售合同" width="990px">
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <customerInfo id="customerInfo" />
          <companyInfo id="companyInfo" />
          <!-- 报价单 -->
          <priceSheet id="priceSheet" />
          <!-- 报价单 -->
          <billInfo id="billInfo" />
          <contract-extras id="customInfo"></contract-extras>
          <extrasInfo id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="销售出库单">销售出库单</el-tab-pane>
    </el-tabs>
  </sideDetail>
</template>
<script>
import priceSheet from './priceSheet';

export default {
  components: { priceSheet },
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: false,
      status: [
        { label: '合同创建人', value: '张收纳' },
        { label: '创建部门', value: '销售部' },
        { label: '创建时间', value: +new Date(), isTime: true }
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