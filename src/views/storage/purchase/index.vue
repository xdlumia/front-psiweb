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
      :filter="true"
      :filterOptions='filterOptions'
      :params="Object.assign(queryForm,params)"
      selection
      :exportButton="authorityButtons.includes('psi_wms_purchase_03')"
      exportApi="seePsiPurchaseService.purchaseExport"
      ref='allTable'
      api="seePsiPurchaseService.purchaseList"
      title="采购单"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='putinCode'"
          class="d-text-blue d-pointer"
          @click="getputinVisible(row)"
        >{{value | codeSlice}}</span>
        <span
          v-else-if="column.columnFields=='purchaseCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value | codeSlice}}</span>
        <span v-else-if="column.columnFields=='putinState'">{{value == 0 ? '待入库' : value == 1 ? '部分入库' : value == 2 ? '完成入库' : value == 3 ? '终止' : ''}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :code="drawerData.purchaseCode"
      :drawerData='drawerData'
      @reload='reload'
      v-if="tableVisible"
      :visible.sync='tableVisible'
    />
    <storageDetails
      :code="rowData.putinCode"
      :visible.sync="assembleVisible"
      @reload="reload"
      v-if="assembleVisible"
    />
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import storageDetails from '@/views/order/storage/detail.vue';
import Details from './details.vue'
export default {
  components: {
    Details,
    TableView,
    storageDetails
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
      componentActive: '', // 当前的组件
      tableVisible: false, // 销售单右侧抽屉
      drawerData: { // 弹框的相关数据
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
            { label: '终止', value: '-1' }
          ],
          default: true
        },
        { label: '采购单编号', prop: 'purchaseCode', default: true },
        {
          label: '入库状态',
          prop: 'putinState',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '待入库', value: '0' },
            { label: '部分完成', value: '1' },
            { label: '完成入库', value: '2' },
            { label: '终止', value: '3' },
          ],
          default: true
        },
        // {
        //   label: '拆卸任务状态',
        //   prop: 'pickingState',
        //   type: 'select',
        //   options: [
        //     { label: '完成拣货', value: '2' },
        //     { label: '部分拣货', value: '1' },
        //     { label: '待拣货', value: '0' },
        //     { label: '终止', value: '-1' }
        //   ],
        //   default: true
        // },
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
        {
          label: '入库人',
          prop: 'putinPerson',
          type: 'employee',
          default: true
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
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true }
      ],
      assembleVisible: false,
      rowData: {}
    };
  },
  created() {
    this.commonwmsmanagerUsableList()
  },
  methods: {
    // 点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data || {}
    },
    // tab换组件
    handleClick() {

    },
    update() {
      this.tableVisible = false
    },
    reload() {
      this.$refs.allTable.reload()
    },
    //点击采购入库单编号
    getputinVisible(row) {
      this.assembleVisible = true
      this.rowData = row
    },
    //请求供应商列表，用作筛选
    commonwmsmanagerUsableList() {
      this.$api.seePsiCommonService.commonsupplierinfoPagelist({ page: 1, limit: 100 })
        .then(res => {
          this.usableList = res.data || []
          this.usableList.forEach((item) => {
            item.label = item.supplierName
            item.value = item.id
          })
          this.filterOptions[1].options = this.usableList
          console.log(this.usableList, 'this.usableListthis.usableListthis.usableList')
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
