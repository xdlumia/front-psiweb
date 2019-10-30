/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 15:35:35
 * @Description: 直发单详情
*/
<template>
  <SideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="直发单" width="990px">
    <template slot="button">
      <el-button size="mini" type="primary">提交审核</el-button>
      <el-button size="mini" type="primary">撤销审核</el-button>
      <el-button @click="showEdit=true" size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="primary">驳回</el-button>
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini" type="primary">删除</el-button>
      <el-button @click="showDeliverGoods=true" size="mini" type="primary">发货</el-button>
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
    <EditDirect :visible.sync="showEdit" />
    <DeliverEdit :visible.sync="showDeliverGoods" />
  </SideDetail>
</template>
<script>
import ApprovePanel from '@/components/formComponents/approve-panel.vue'; //审核信息
import ArrivalInfo from '@/components/formComponents/arrival-info.vue'; //到货信息
import CustomInfo from '@/components/formComponents/custom-info.vue'; //自定义信息
import ExtrasInfo from '@/components/formComponents/extras-info.vue'; //备注信息
import SideDetail from '@/components/side-detail.vue'; //侧边详情弹框

import AddOrderStorage from '../storage/edit'; // 采购入库单
import EditDirect from './edit'; // 编辑直发单
import DeliverEdit from './deliverEdit'; // 编辑直发单

export default {
  components: {
    ApprovePanel,
    ArrivalInfo,
    CustomInfo,
    ExtrasInfo,
    SideDetail,
    AddOrderStorage,
    EditDirect,
    DeliverEdit
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: true,
      showEdit: false,
      showAddOrderStorage: false,
      showDeliverGoods: false,
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