/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  换货任务
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="2"
      :filterOptions='filterOptions'
      :selection='false'
      ref='allTable'
      api="seePsiWmsService.wmsswaptaskList"
      title="换货任务"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='swapTaskCode'"
          class="d-text-blue"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='swapState'">{{state[value]}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :drawerData='drawerData'
      :visible.sync='tableVisible'
      @reload='reload'
      v-if="tableVisible"
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
      state: {
        2: '待换货',
        3: '部分换货',
        4: '完成换货'
      },
      button: true,
      tableVisible: false,//销售单右侧抽屉
      drawerData: {//弹框的相关数据
      },
      filterOptions: [
        { label: '换货任务编号', prop: 'swapTaskCode', default: true },
        { label: '换货方', prop: 'barterThirdparty', default: true },
        {
          label: '换货状态',
          prop: 'swapState',
          type: 'select',
          options: [
            { label: '待组装', value: '1' },
            { label: '部分组装', value: '2' },
            { label: '完成组装', value: '3' },
            { label: '未开始', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: '换入数量',
          prop: 'SwapInNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '换出数量',
          prop: 'SwapOutNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '换入金额',
          prop: 'SwapInMoney',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '换出金额',
          prop: 'SwapOutMoney',
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
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
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
