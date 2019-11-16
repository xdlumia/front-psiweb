/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 17:42:41
 * @Description: 采购调价单
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="采购调价单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">提交审核</el-button>
      <el-button size="mini" type="primary">撤销审核</el-button>
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="primary">删除</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <commodityInfo id="commodityInfo" />
          <extrasInfo id="extrasInfo" />
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </sideDetail>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: false
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