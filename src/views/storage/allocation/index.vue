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
      :selection='false'
      ref='allTable'
      exportApi="seePsiWmsService.wmsallocationorderExport"
      api="seePsiWmsService.wmsallocationorderList"
      :params="params"
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
        <span
          v-if="column.columnFields=='allocationOrderCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='allocationOrderState'">{{value == 1 ? '待调拨' : value == 2 ? '部分调拨' : value == 3 ? '完成调拨' : '终止'}}</span>
        <span v-else-if="column.columnFields=='allocationType'">{{value == 1 ? '内调' : '外调'}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      @reload='reload'
      ref='details'
      :drawerData='drawerData'
      :visible.sync='tableVisible'
      v-if="tableVisible"
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
      visible: false,
      componentActive: '',//当前的组件
      tableVisible: false,//销售单右侧抽屉
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details'
      },
      activeName: '',
      filterOptions: [
        { label: '调拨单编号', prop: 'allocationOrderCode', default: true },
        {
          label: '调拨状态',
          prop: 'allocationOrderState',
          type: 'select',
          options: [
            { label: '待调拨', value: '1' },
            { label: '部分调拨', value: '2' },
            { label: '完成调拨', value: '3' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: '调拨类型',
          prop: 'allocationType',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        },
        {
          label: '调入库房',
          prop: 'putawayWmsId',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        },
        { label: '调出库房', prop: 'shipmentWmsNames', default: true },
        {
          label: '调拨数量',
          prop: 'Num',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '创建时间',
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
      usableList: []
    };
  },
  created() {
    this.commonwmsmanagerUsableList()
  },
  mounted() {
    // this.reload()
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
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
    },
    //请求可用库房
    commonwmsmanagerUsableList() {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList()
        .then(res => {
          this.usableList = res.data || []
          this.usableList.forEach((item) => {
            item.label = item.name
            item.value = item.id
          })
          this.filterOptions[3].options = this.usableList
          this.filterOptions[4].options = this.usableList
        })
        .finally(() => {

        })
    },
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
