/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  组装任务
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <TableView
      busType="10"
      :filterOptions='filterOptions'
      selection
      ref='allTable'
      api="seePsiWmsService.wmsassembletaskList"
      exportApi="seePsiWmsService.wmsassembletaskExport"
      :params="params"
      title="组装任务"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='assembleTaskCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span
          v-else-if="column.columnFields=='assembleOrderCode'"
          class="d-text-blue d-pointer"
          @click="getassembleVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='assembleTaskState'">{{state[value]}}</span>
        <span v-else-if="column.columnFields=='pickingState'">{{pickingState[value]}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      @reload='reload'
      :code="drawerData.assembleTaskCode"
      :data='drawerData'
      :visible.sync='tableVisible'
      v-if="tableVisible"
    />
    <assembleDetails
      :code="rowData.assembleOrderCode"
      :data='rowData'
      :visible.sync='assembleVisible'
      v-if="assembleVisible"
    />
  </div>
</template>
<script>
/**
 * 采购-请购单 
 */
import TableView from '@/components/tableView';
import assembleDetails from '@/views/storage/assemble/details.vue';
import Details from './details.vue'
export default {
  components: {
    Details,
    TableView,
    assembleDetails
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
      state: {
        '-1': '终止',
        0: '未开始',
        1: '待组装',
        2: '部分组装',
        3: '完成组装'
      },
      pickingState: {
        '-1': '终止',
        0: '待拣货',
        1: '部分拣货',
        2: '完成拣货'
      },
      queryForm: {
        page: 1,
        limit: 20
      },
      tableVisible: false,//销售单右侧抽屉
      drawerData: {//弹框的相关数据
      },
      filterOptions: [
        { label: '组装任务编号', prop: 'assembleTaskCode', default: true },
        { label: '组装单编号', prop: 'assembleOrderCode', default: true },
        {
          label: '组装单状态',
          prop: 'state',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '待组装', value: '1' },
            { label: '部分组装', value: '2' },
            { label: '完成组装', value: '3' },
            { label: '未开始', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: '拣货状态',
          prop: 'pickingState',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '部分拣货', value: '1' },
            { label: '完成拣货', value: '2' },
            { label: '待拣货 ', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        { label: '商品名称', prop: 'goodsName', default: true },
        {
          label: '组装数量',
          prop: 'AssembleNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '未组数量',
          prop: 'UnassembledNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '已组数量',
          prop: 'AccomplishNum',
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
      assembleVisible: false,
      rowData: {}
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
    },
    reload() {
      this.$refs.allTable.reload()
    },
    //打开组装单详情
    getassembleVisible(row) {
      this.assembleVisible = true
      this.rowData = row
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
