/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  拣货单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      ref='table'
      busType="8"
      :filterOptions='filterOptions'
      :params="queryForm"
      :selection='false'
      api="seePsiWmsService.wmspickingorderList"
      title="拣货单"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='assembleTaskCode' || column.columnFields=='shipmentCode'"
          class="d-text-blue"
        >{{value}}</span>
        <span
          v-else-if="column.columnFields=='pickingOrderCode'"
          class="d-text-blue"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='state'">{{value == -1 ? '终止' : value == 0 ? '待拣货' : value == 1 ? '部分拣货' : '完成拣货'}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :drawerData='drawerData'
      v-if='tableVisible'
      :visible.sync='tableVisible'
      @reload='reload'
    />
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
import SideStatusbar from '@/components/formComponents/side-statusbar';
export default {
  components: {
    Details,
    SideStatusbar,
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
        component: 'Details',
      },
      button: true,
      activeName: '',
      filterOptions: [
        { label: '销售单编号', prop: 'shipmentCode', default: true },
        { label: '组装任务编号', prop: 'assembleTaskCode', default: true },
        { label: '客户名称', prop: 'clientName', default: true },
        { label: '拣货单编号', prop: 'pickingOrderCode', default: true },
        {
          label: '拣货状态',
          prop: 'state',
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
          label: '拣货数量',
          prop: 'PickingNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '未拣数量',
          prop: 'NoPickingNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '已拣数量',
          prop: 'PickingAccomplishNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        { label: '拣货人', prop: 'PickingPerson', type: 'employee', default: true },
        { label: '商品类别', prop: 'commodityCategorys', default: true },
        { label: '商品名称', prop: 'commodityNames', default: true },
        {
          label: '生成时间',
          prop: 'Time',
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
      this.drawerData = data
      console.log(this.drawerData, 'this.drawerDatathis.drawerDatathis.drawerDatathis.drawerDatathis.drawerDatathis.drawerData')
    },
    reload() {
      this.$refs.table.reload()
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
