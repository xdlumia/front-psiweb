/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-10 11:22:42
 * @Description: 采购-换货单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      :exportButton="authorityButtons.includes('psi_wms_swap_10')"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      @selection-change="selectionChange"
      api="seePsiWmsService.wmsswaporderList"
      busType="1"
      exportApi="seePsiWmsService.wmsswaporderExport"
      ref="tableView"
      title="换货单"
    >
      <template slot="button">
        <el-button @click="showEdit=true" size="mini" type="primary" v-if="authorityButtons.includes('psi_wms_swap_09')">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else-if="prop=='swapOrderCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="prop=='swapState'">{{stateText[value]}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <Edit :visible.sync="showEdit" @reload="reload" v-if="showEdit" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 换货单详情
import Edit from './edit'; // 换货单详情

export default {
  components: {
    TableView,
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
      currentCode: '',
      showEdit: false,
      defaultParams: {
        page: 1,
        limit: 20
      },
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待换货',
        '3': '部分换货',
        '4': '完成换货',
        '-1': '已驳回'
      },
      // prettier-ignore
      filterOptions: [
        { label: '换货单编号', prop: 'swapOrderCode', default: true, },
        { label: '换货方', prop: 'barterThirdparty', default: true, },
        { label: '换入数量', prop: 'SwapInNum', type: 'numberRange', int: true, default: true, },
        { label: '换入金额', prop: 'SwapInMoney', type: 'numberRange', default: true, },
        { label: '换出数量', prop: 'SwapOutNum', type: 'numberRange', int: true, default: true, },
        { label: '换出金额', prop: 'SwapOutMoney', type: 'numberRange', default: true, },
        { label: '创建人', prop: 'creator', type: 'employee', default: true, },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange' },
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
</style>
