/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  调拨单 
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="6"
      :filterOptions='filterOptions'
      :headers="tableHeader"
      :selection='false'
      ref='allTable'
      api="seePsiWmsService.wmsallocationorderList"
      :params="queryForm"
      title="调拨单"
    >
      <template v-slot:button>
        <el-button
          type="primary"
          size='mini'
          @click="visible = true"
        >新增</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.columnFields=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span
          v-else-if="column.columnFields=='allocationOrderCode'"
          class="d-text-blue"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      ref='details'
      :drawerData='drawerData'
      @update='update'
      v-if="drawerData.tableVisible"
    />
    <allocationAdd
      @reload='reload'
      v-if='visible'
      :visible.sync='visible'
    />
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
import allocationAdd from './allocation-add'
export default {
  components: {
    Details,
    TableView,
    allocationAdd
  },
  data() {
    return {
      // 查询表单
      queryForm: {
        allocationOrderCode: '',//调拨单编号
        allocationOrderState: '',//调拨状态 （1-待调拨 2-部分调拨 3-完成调拨 4-终止）
        allocationType: '',//调拨类型 （1-内调 2-外调）
        putawayWmsName: '',//调入库房id 
        shipmentWmsNames: '',//调出库房名称(可能多个)
        num: '',//'调拨数量'
        deptId: '',//部门id
        companyCode: '',//公司code
        minTime: '',//开始时间
        maxTime: '',//结束时间
        page: 1,
        limit: 20
      },
      visible: false,
      componentActive: '',//当前的组件
      drawerData: {//弹框的相关数据
        tableVisible: false,//销售单右侧抽屉
        title: '',
        component: 'Details'
      },
      activeName: '',
      tableHeader: [
        { label: '调拨单编号', prop: 'deptName', width: '140' },
        { label: '调拨状态', prop: 'deptName', width: '100' },
        { label: '调拨类型', prop: 'deptName', width: '100' },
        { label: '调入库房', prop: 'deptName', width: '100' },
        { label: '调出库房', prop: 'deptName', width: '140' },
        { label: '调拨数量', prop: 'deptName', width: '100' },
        { label: '创建时间', prop: 'createTime', width: '140' },
        { label: '单据创建人', prop: 'createTime', width: '100' },
        { label: '创建部门', prop: 'createTime', width: '100' }
      ],
      filterOptions: [
        {
          label: '排序',
          type: 'sort',
          prop: 'sort',
          options: [
            { label: '交易记录最高', value: '1' },
            { label: '交易记录最低', value: '2' }
          ],
          default: true
        },
        { label: '调拨单编号', prop: 'allocationOrderCode', default: true },
        {
          label: '调拨状态',
          prop: 'allocationOrderState',
          type: 'dict',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '调拨类型',
          prop: 'allocationType',
          type: 'dict',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '调入库房',
          prop: 'putawayWmsName',
          type: 'dict',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '调出库房',
          prop: 'shipmentWmsNames',
          type: 'dict',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '调拨数量',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '开始时间',
          prop: 'minTime',
          type: 'daterange',
          default: true
        },
        {
          label: '结束时间',
          prop: 'maxTime',
          type: 'daterange',
          default: true
        },
        {
          label: '单据创建人',
          prop: 'creatorName',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptName', type: 'employee', default: true },
      ]
    };
  },
  created() {

  },
  mounted() {
    // this.reload()
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.drawerData.tableVisible = true
      this.drawerData.title = '调拨单-' + data.allocationOrderCode
      this.drawerData.code = data.allocationOrderCode
      // this.$refs.details.wmsallocationorderInfo()
    },
    reload() {
      this.$refs.allTable.reload()
    },
    //tab换组件
    handleClick() {

    },
    update() {
      this.drawerData.tableVisible = false
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
