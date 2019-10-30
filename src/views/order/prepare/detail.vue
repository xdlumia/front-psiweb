/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 15:35:20
 * @Description: 备货单详情
*/
<template>
  <SideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="备货单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">提交审核</el-button>
      <el-button size="mini" type="primary">撤销审核</el-button>
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="primary">删除</el-button>
      <el-button @click="showAddOrderStorage=true" size="mini" type="primary">采购</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form>
          <ApprovePanel></ApprovePanel>
          <ArrivalInfo></ArrivalInfo>
          <CustomInfo></CustomInfo>
          <ExtrasInfo></ExtrasInfo>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
    </el-tabs>
    <AddOrderStorage :visible.sync="showAddOrderStorage" from="备货" />
  </SideDetail>
</template>
<script>
import ApprovePanel from '@/components/formComponents/approve-panel.vue'; //审核信息
import ArrivalInfo from '@/components/formComponents/arrival-info.vue'; //到货信息
import CustomInfo from '@/components/formComponents/custom-info.vue'; //自定义信息
import ExtrasInfo from '@/components/formComponents/extras-info.vue'; //备注信息
import SideDetail from '@/components/side-detail.vue'; //侧边详情弹框

import AddOrderStorage from '../storage/edit'; // 采购入库单

export default {
  components: {
    ApprovePanel,
    ArrivalInfo,
    CustomInfo,
    ExtrasInfo,
    SideDetail,
    AddOrderStorage
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: true,
      showAddOrderStorage: false,
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