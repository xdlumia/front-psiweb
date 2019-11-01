/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 15:41:51
 * @Description: 其他合同
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="其他合同" width="990px">
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <contract-title id="titleInfo"></contract-title>
          <contract-signer id="firstClass" name="甲方"></contract-signer>
          <contract-signer id="secondClass" name="乙方"></contract-signer>
          <contract-expire id="expire"></contract-expire>
          <contract-extras id="desc"></contract-extras>
          <extrasInfo id="extrasInfo" />
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </sideDetail>
</template>
<script>
export default {
  components: {},
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