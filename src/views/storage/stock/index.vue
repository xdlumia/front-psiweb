/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  库存查询
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="47"
      :filterOptions='filterOptions'
      :headers="tableHeader"
      :selection='false'
      api="seePsiWmsService.wmsinventoryList"
      :params="queryForm"
      title="库存查询"
    >
      <template v-slot:button>
        <el-input
          style="width:300px;"
          size="small"
          placeholder="请输入机器码或SN码"
          v-model="input2"
        >
          <el-button
            slot="append"
            type="primary"
          >商品查询</el-button>
        </el-input>
      </template>
      <template slot-scope="{column,row,value}">
        <span @click="getTableVisible(row)">点击111</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
      <!-- <template v-slot:tree> -->
      <!-- <el-container class="choose-container"> -->
      <el-aside
        slot='tree'
        width="250px"
        class="choose-aside fl"
        style="height: calc(100% - 40px);"
      >
        <el-button
          type="text"
          class="ml10"
        >全部</el-button>
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
        >
        </el-tree>

      </el-aside>
      <!-- </el-container> -->
      <!-- </template> -->
    </TableView>
    <Details :drawerData='drawerData' />
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      queryForm: {
        commodityCode: '',//商品编号
        goodsPic: '',//商品图片
        categoryCode: '',//商品类别
        firstClassName: '',//商品分类 
        name: '',//商品名称
        specOne: '',//规格
        configName: '',//配置
        unit: '',//单位
        inventoryWarning: '',//库存预警
        unit: '',//虚拟库存
        unit: '',//实物库存
        unit: '',//期初库存
        unit: '',//入库数量
        unit: '',//出库数量
        unit: '',//待入库数量
        unit: '',//锁库量
        unit: '',//最低采购价
        unit: '',//库存成本
        unit: '',//销售参考价
        page: 1,
        limit: 20
      },
      input2: '',
      componentActive: '',//当前的组件
      tableVisible: false,//销售单右侧抽屉
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details'
      },
      activeName: '',
      status: [],
      data: [],
      tableHeader: [
        { label: '商品编号', prop: 'deptName', width: '140' },
        { label: '商品图片', prop: 'deptName', width: '100' },
        { label: '商品类别', prop: 'deptName', width: '140' },
        { label: '商品分类', prop: 'deptName', width: '100' },
        { label: '商品名称', prop: 'deptName', width: '100' },
        { label: '商品规格', prop: 'deptName', width: '140' },
        { label: '商品配置', prop: 'deptName', width: '100' },
        { label: '单位', prop: 'deptName', width: '100' },
        { label: '库存预警', prop: 'createTime', width: '100' },
        { label: '虚拟库存', prop: 'createTime', width: '100' },
        { label: '实物库存', prop: 'createTime', width: '100' },
        { label: '期初库存', prop: 'createTime', width: '100' },
        { label: '入库数量', prop: 'createTime', width: '100' },
        { label: '出库数量', prop: 'createTime', width: '100' },
        { label: '待入库数量', prop: 'createTime', width: '100' },
        { label: '待出库数量', prop: 'createTime', width: '100' },
        { label: '锁库量', prop: 'createTime', width: '100' },
        { label: '最低采购价', prop: 'createTime', width: '100' },
        { label: '库存成本', prop: 'createTime', width: '100' },
        { label: '销售参考价', prop: 'createTime', width: '100' }
      ],
      filterOptions: [
        { label: '商品编号', prop: 'allocationOrderCode', default: true },
        {
          label: '商品类别',
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
          label: '商品分类',
          prop: 'allocationType',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        },
        {
          label: '商品名称',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '商品规格',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '商品配置',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '单位',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '库存预警',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '虚拟库存',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '实物库存',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '期初库存',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '入库数量',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '出库数量',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '待入库数量',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '待出库数量',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '锁库量',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },
        {
          label: '最低采购价',
          prop: 'num',
          type: 'employee',
          dictName: 'FM_FANGYUAN_MJ',
          default: true
        },

        {
          label: '库存成本',
          prop: 'putawayWmsName',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        },
        {
          label: '销售参考价',
          prop: 'shipmentWmsNames',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        }
      ],
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.drawerData.tableVisible = true
      this.drawerData.title = '商品名' + data.id
    },
    //tab换组件
    handleClick() {

    },
    filterNode() {

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

.choose-aside {
  border: 1px solid #f2f2f2;
  border-bottom: none;
  float: left;
}
/deep/.d-table {
  width: calc(100% - 250px) !important;
  float: left;
}
</style>
