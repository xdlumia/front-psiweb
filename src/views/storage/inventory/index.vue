/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  盘点单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="0"
      :filterOptions='filterOptions'
      :params="params"
      :exportButton="authorityButtons.includes('psi_wms_inventory_03')"
      selection
      ref='allTable'
      api="seePsiWmsService.wmsblitemList"
      exportApi="seePsiWmsService.wmsblitemExport"
      title="盘点单"
    >
      <template v-slot:button>
        <el-button
          v-if="authorityButtons.includes('psi_wms_inventory_07')"
          type="primary"
          size='mini'
          @click="visible = true"
        >新增</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='blitemCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='blitemState'">{{value == 1 ? '进行中' :value == 2? '盘点完成' : value == -1? '已终止' : '-'}}</span>
        <span v-else-if="column.columnFields=='result'">{{value == 1 ? '盘盈' : value == 2 ? '盘亏' : value == 3 ? '有盈亏' : value == 4 ? '吻合' : '-'}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :drawerData='drawerData'
      :visible.sync='tableVisible'
      @reload='reload'
      v-if="tableVisible"
    />
    <inventoryAdd
      :visible.sync='visible'
      v-if="visible"
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
import inventoryAdd from './inventory-add'
export default {
  components: {
    Details,
    TableView,
    inventoryAdd
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
        wmsId: '',//库房id
        blitemCode: '',//盘点单编号
        type: '',//盘点类型（1-全盘 2-抽盘）
        blitemState: '',//盘点状态（1- 进行中 2-盘点完成）
        result: '',//盘点结果（1-盘盈 2-盘亏 3-有盈亏 4-吻合）
        inventorySurplusNum: '',//盘盈数量
        inventorySurplusSum: '',//盘盈金额（成本）
        inventoryLossesNum: '',//盘亏数量
        inventoryLossesSum: '',//盘亏金额（成本）
        blitemPerson: '',//盘点人	
        source: '',//来源
        deptId: '',//部门id
        companyCode: '',//公司code
        isDelete: '',//是否删除
        page: 1,
        limit: 20
      },
      visible: false,
      usableList: [],
      tableVisible: false,
      componentActive: '',//当前的组件
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details'
      },
      activeName: '',
      filterOptions: [
        { label: '盘点单编号', prop: 'blitemCode', default: true },
        {
          label: '盘点状态',
          prop: 'state',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '终止', value: '-1' },
            { label: '进行中', value: '1' },
            { label: '盘点完成', value: '2' }
          ],
          default: true
        },
        {
          label: '盘点结果',
          prop: 'result',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '盘盈', value: '1' },
            { label: '盘亏', value: '2' },
            { label: '有盈亏', value: '3' },
            { label: '吻合', value: '4' },
          ],
          default: true
        },
        {
          label: '盘点库房',
          prop: 'wmsId',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        },
        {
          label: '盘盈数量',
          prop: 'InventorySurplusNum',
          type: 'numberRange',
          default: true
        },
        {
          label: '盘盈金额(成本)',
          prop: 'InventorySurplusSum',
          type: 'numberRange',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '盘亏数量',
          prop: 'InventoryLossesNum',
          type: 'numberRange',
          default: true
        },
        {
          label: '盘亏金额(成本)',
          prop: 'InventoryLossesSum',
          type: 'numberRange',
          default: true
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
  created() {
    this.commonwmsmanagerUsableList()
  },
  methods: {
    //请求所有库房
    commonwmsmanagerUsableList() {
      this.$api.seePsiWmsService.commonwmsmanagerList({ page: 1, limit: 500 })
        .then(res => {
          this.usableList = res.data || []
          this.usableList.forEach((item) => {
            item.label = item.name
            item.value = item.id
          })
          this.usableList.unshift({ label: '全部', value: '' })
          this.filterOptions[3].options = this.usableList
        })
        .finally(() => {

        })
    },
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
