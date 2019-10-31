/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 16:13:22
 * @Description: 借入借出详情
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="借入借出单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <borrow-in />
          <borrow-goods />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="销售单">销售单</el-tab-pane>
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