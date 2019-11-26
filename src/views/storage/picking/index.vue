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
      :params="params"
      selection
      exportApi="seePsiWmsService.wmspickingorderExport"
      api="seePsiWmsService.wmspickingorderList"
      title="拣货单"
    >
      <template slot-scope="{column,row,value}">
        <span v-if="column.columnFields=='state'">{{pickingState[value]}}</span>
        <span
          v-if="column.columnFields=='pickingOrderCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span
          v-else-if="column.columnFields=='assembleTaskCode'"
          class="d-text-blue d-pointer"
          @click="getVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='commodityCategorys'">
          {{(dictionaryOptions('PSI_SP_KIND').forEach((item) => {
          classForm[item.code] = item.content
          }),value.split(',').map(item=> classForm[item])).join(',')}}
        </span>
        <span
          v-else-if="column.columnFields=='salesSheetCode'"
          class="d-text-blue d-pointer"
          @click="getshipVisible(row)"
        >{{value}}</span>

        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :drawerData='drawerData'
      v-if='tableVisible'
      :code="drawerData.pickingOrderCode"
      :visible.sync='tableVisible'
      @reload='reload'
    />
    <assemblyDetails
      :data='drawerData'
      :code="drawerData.assembleTaskCode"
      :visible.sync='assembleVisible'
      v-if="assembleVisible"
      @reload='reload'
    />
    <shipDetails
      :code="drawerData.salesSheetCode"
      :data='shipData'
      :visible.sync='shipVisible'
      v-if="shipVisible"
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
import assemblyDetails from '@/views/storage/assembly/details.vue';
import shipDetails from '@/views/storage/sales/details.vue';
import SideStatusbar from '@/components/formComponents/side-statusbar';
import Vue from 'vue'
export default {
  components: {
    Details,
    SideStatusbar,
    assemblyDetails,
    shipDetails,
    TableView
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
      pickingState: {
        '-1': '终止',
        0: '待拣货',
        1: '部分拣货',
        2: '完成拣货'
      },
      componentActive: '',//当前的组件
      tableVisible: false,//销售单右侧抽屉
      assembleVisible: false,//组装任务
      rowData: {},
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details',
      },
      activeName: '',
      filterOptions: [
        { label: '销售单编号', prop: 'salesSheetCode', default: true },
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
        {
          label: '商品类别',
          prop: 'commodityCategorys',
          type: 'dict',
          dictName: 'PSI_SP_KIND',
          default: true
        },
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
      classForm: {},
      isClass: false,
      shipVisible: false,//销售单
      shipData: {},//销售单详情
    };
  },
  mounted() {
    // setTimeout(() => {
    //   // this.classForm = {}
    //   this.dictionaryOptions('PSI_SP_KIND').forEach((item) => {
    //     this.classForm[item.code] = item.content
    //   })
    // }, 1000)
    // let list = this.dictionaryOptions('PSI_SP_KIND')
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
    },
    //打开组装任务详情
    getVisible(data) {
      this.assembleVisible = true
      this.rowData = data
    },
    getshipVisible(data) {
      this.shipVisible = true
      this.shipData = data
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
