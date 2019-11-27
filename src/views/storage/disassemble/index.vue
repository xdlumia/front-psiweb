/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  拆卸任务
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="12"
      :filterOptions='filterOptions'
      selection
      ref='allTable'
      api="seePsiWmsService.wmsdisassemblytaskList"
      exportApi="seePsiWmsService.wmsdisassemblytaskExport"
      :params="params"
      title="拆卸任务"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='disassemblyTaskCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span
          v-else-if="column.columnFields=='disassemblyOrderCode'"
          class="d-text-blue d-pointer"
          @click="getdisassemblyVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='disassemblyTaskState'">{{value == 0 ? '未开始' : value == 1 ? '待拆卸' : value == 2 ? '部分拆卸' : value == 3 ? '完成拆卸' : '全部'}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :code="drawerData.disassemblyTaskCode"
      :drawerData='drawerData'
      :visible.sync='tableVisible'
      v-if="tableVisible"
      @reload='reload'
    />
    <unpackDetails
      :code="rowData.disassemblyOrderCode"
      :visible.sync="disassemblyVisible"
      v-if="disassemblyVisible"
    />
  </div>
</template> 
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import unpackDetails from '@/views/order/unpack/detail.vue';
import Details from './details.vue'
export default {
  components: {
    Details,
    TableView,
    unpackDetails
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
      default: () => ({ page: 1, limit: 15 })
    }
  },
  data() {
    return {
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20
      },
      tableVisible: false,//销售单右侧抽屉
      drawerData: {//弹框的相关数据
      },
      filterOptions: [
        { label: '拆卸任务编号', prop: 'disassemblyTaskCode', default: true },
        { label: '拆卸单编号', prop: 'disassemblyOrderCode', default: true },
        {
          label: '拆卸状态',
          prop: 'state',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '待拆卸', value: '1' },
            { label: '部分拆卸', value: '2' },
            { label: '完成拆卸', value: '3' },
            { label: '未开始', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: '拆卸数量',
          prop: 'DisassemblyNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '未拆卸数量',
          prop: 'NoDisassemblyNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '已拆卸数量',
          prop: 'AccomplishDisassemblyNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '创建时间',
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
      disassemblyVisible: false,
      rowData: {}
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
    },
    //拆卸单
    getdisassemblyVisible(row) {
      this.disassemblyVisible = true
      this.rowData = row
    },
    //tab换组件
    handleClick() {

    },
    reload() {
      this.$refs.allTable.reload()
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
