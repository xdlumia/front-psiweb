/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 15:54:17
 * @Description: 拆卸单
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="拆卸单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">提交审核</el-button>
      <el-button @click="showTask=true" size="mini" type="primary">生成拆卸任务</el-button>
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="primary">删除</el-button>
      <el-button size="mini" type="primary">终止</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <goodsUnpack id="goodsUnpack" />
          <extrasInfo :needUpload="false" id="extrasInfo" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="拆卸任务">拆卸任务</el-tab-pane>
      <el-tab-pane label="采购单">采购单</el-tab-pane>
    </el-tabs>
    <Task :visible.sync="showTask" />
  </sideDetail>
</template>
<script>
import Task from './task';

export default {
  components: {
    Task
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: false,
      showTask: false,
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