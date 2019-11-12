/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 采购 采购单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="32"
      :filterOptions='filterOptions'
      :params="queryForm"
      :selection='false'
      api="seePsiPurchaseService.purchaseList"
      title="采购单"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='putinCode'"
          class="d-text-blue"
        >{{value}}</span>
        <span
          v-if="column.columnFields=='purchaseCode'"
          class="d-text-blue"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else-if="column.columnFields=='putinState'">{{value == 0 ? '待入库' : value == 1 ? '部分完成' : value == 2 ? '完成入库' : value == 3 ? '终止' : '全部'}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :drawerData='drawerData'
      @update='update'
      v-if="tableVisible"
      :visible.sync='tableVisible'
    />
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
export default {
  components: {
    Details,
    TableView
  },
  data() {
    return {
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20
      },
      componentActive: '',//当前的组件
      tableVisible: false,//销售单右侧抽屉
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details'
      },
      activeName: '',
      filterOptions: [
        { label: '采购入库单编号', prop: 'putinCode', default: true },
        {
          label: '供应商名称',
          prop: 'supplierId',
          type: 'select',
          options: [
            { label: '完成拣货', value: '2' },
            { label: '部分拣货', value: '1' },
            { label: '待拣货', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        { label: '采购单编号', prop: 'purchaseCode', default: true },
        {
          label: '入库状态',
          prop: 'putinState',
          type: 'select',
          options: [
            { label: '完成拣货', value: '2' },
            { label: '部分拣货', value: '1' },
            { label: '待拣货', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: 'dismantleState',
          prop: 'pickingState',
          type: 'select',
          options: [
            { label: '完成拣货', value: '2' },
            { label: '部分拣货', value: '1' },
            { label: '待拣货', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: '入库数量',
          prop: 'WillPutinNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '未入库量',
          prop: 'WithoutPutinNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '已入库量',
          prop: 'AlreadyPutinNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        // { label: 'creator', prop: 'creator', type: 'employee', default: true },
        {
          label: '生成时间',
          prop: 'CreateTime',
          type: 'daterange',
          default: true
        },
        {
          label: '单据创建人',
          prop: 'creator',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
      ],
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data || {}
    },
    //tab换组件
    handleClick() {

    },
    update() {
      this.tableVisible = false
    }
  }
};
</script>
<style lang="scss" scoped>
.side-page {
  /deep/ {
    > .popup-main {
      width: 50% !important;
      > .popup-head {
        font-weight: bold;
        > .d-inline > .popup-close {
          position: absolute;
          right: 10px;
          top: 16px;
        }
      }
      > .popup-body {
        padding: 0;
        overflow: hidden;
      }
    }
  }
  .tabs-view {
    position: relative;
    /deep/ {
      & > .el-tabs__header {
        background-color: #f2f2f2;
        padding: 0 10px;
        > .el-tabs__nav-wrap::after {
          background-color: #f2f2f2;
        }
      }
      & > .el-tabs__content {
        height: calc(100% - 55px);
        overflow: hidden;
        overflow-y: auto;
        padding: 0 10px;
      }
    }
  }
}
</style>
