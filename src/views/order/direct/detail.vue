/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-08 18:12:15
 * @Description: 直发单详情
*/
<template>
  <sideDetail :status="status" :visible.sync="showPop" @close="$emit('update:visible',false)" title="直发单" width="990px">
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
          <approvePanel></approvePanel>
          <arrivalInfo :data="detail" disabled></arrivalInfo>
          <customInfo :data="detail" disabled></customInfo>
          <extrasInfo :data="detail" disabled></extrasInfo>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购入库单">采购入库单</el-tab-pane>
    </el-tabs>
    <addOrderStorage :visible.sync="showAddOrderStorage" from="备货" />
    <editDirect :visible.sync="showEdit" />
    <deliverEdit :visible.sync="showDeliverGoods" />
  </sideDetail>
</template>
<script>
import AddOrderStorage from '../storage/edit'; // 采购入库单
import EditDirect from './edit'; // 编辑直发单
import DeliverEdit from './deliverEdit'; // 编辑直发单
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {
    AddOrderStorage,
    EditDirect,
    DeliverEdit
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      showPop: false,
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