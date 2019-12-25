/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-25 14:22:56
 * @Description: 整机配置单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <tableView
      :busType="66"
      :exportButton="authorityButtons.includes('psi_purchase_borrow_10')"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      @selection-change="selectionChange"
      api="seePsiCommonService.commonquotationconfigList"
      exportApi="seePsiCommonService.commonquotationconfigExport"
      ref="tableView"
      title="整机配置单"
    >
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary" v-if="authorityButtons.includes('psi_purchase_borrow_09')">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='code'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </tableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <Edit :visible.sync="showEdit" @reload="reload" type="add" v-if="showEdit" />
  </div>
</template>
<script>
import Detail from './detail';
import Edit from './edit';

export default {
  components: {
    Detail,
    Edit
  },
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 20 })
    }
  },
  data() {
    return {
      status: [],
      showDetail: false,
      showEdit: false,
      showSaleShipDetail: false,
      currentSaleShipCode: '',
      defaultParams: {
        page: 1,
        limit: 20,
        type: 1
      },
      stateText: {
        '0': '启用中',
        '1': '停用中'
      },
      // prettier-ignore
      filterOptions: [
        { label: '配置编号', prop: 'code', default: true },
        { label: '商品名称', prop: 'goodsName', default: true },
        { label: '创建人', prop: 'creator', type: 'employee', default: true },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange', default: true }
      ]
    };
  },
  methods: {
    // 多选
    selectionChange(val) {
      this.$emit('selection-change', val);
    },
    reload() {
      this.$refs.tableView.reload(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
