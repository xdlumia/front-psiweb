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
      @response='response'
      style="height:calc(100vh - 150px)"
      busType="48"
      :filterOptions='filterOptions'
      selection
      ref='allTable'
      api="seePsiWmsService.wmsinventoryList"
      exportApi="seePsiWmsService.commonwmsmanagerExport"
      :params="params"
      title="库存查询"
    >
      <template v-slot:button>
        <el-input
          class="mr15"
          style="width:300px;"
          size="small"
          placeholder="请输入机器码或SN码"
          v-model="snCode"
        >
          <el-button
            slot="append"
            type="primary"
            @click="stockLook"
          >商品查询</el-button>
          <div style='width:10px'></div>
        </el-input>
      </template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.columnFields=='unit'">{{value|dictionary('SC_JLDW')}}</span>
        <span v-else-if="column.columnFields=='categoryCode'">{{value|dictionary('PSI_SP_KIND')}}</span>
        <span
          v-else-if="column.columnFields=='inventoryWarning'"
          :class="value == 1 ? 'd-text-red' : value == 2 ? 'd-text-yellow' : ''"
        >{{value == 0 ? '正常' : value == 1 ? '库存积压' : '库存不足'}}</span>
        <span v-else-if="column.columnFields=='goodsPic'">
          <el-image
            style="width: 100px; height: 30px"
            :src="value"
            fit="fill"
          ></el-image>
        </span>
        <span v-else-if="column.columnFields=='commodityCode'">
          <span
            class="d-text-blue d-pointer"
            @click="changeTableVisible(row)"
          >{{value}}</span>
        </span>
        <span v-else>{{value}}</span>
      </template>
      <el-aside
        slot='tree'
        width="250px"
        class="choose-aside fl"
        style="height: calc(100% - 40px);"
      >
        <el-button
          type="text"
          class="ml10"
          @click="clickAll"
        >全部</el-button>
        <el-tree
          class="filter-tree ml10"
          :data="treeData"
          @node-click="handleNodeClick"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree"
        >
        </el-tree>

      </el-aside>
      <!-- </el-container> -->
      <!-- </template> -->
    </TableView>
    <span class="f18 d-text-blue b mt20 fr">库存成本总额：<span>{{totalInventoryPrice}}</span></span>
    <Details
      :drawerData='drawerData'
      :visible.sync='tableVisible'
      v-if="tableVisible"
    />
    <commodityInquiry
      :visible.sync='commVisible'
      :snCode='snCode'
      v-if="commVisible"
    />
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
import commodityInquiry from './commodity-inquiry.vue'
import SideStatusbar from '@/components/formComponents/side-statusbar';
export default {
  components: {
    Details,
    SideStatusbar,
    TableView,
    commodityInquiry
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
      defaultProps: {
        children: 'children',
        label: 'className'
      },
      snCode: '',
      queryForm: {
        page: 1,
        limit: 20
      },
      input2: '',
      treeData: [],
      componentActive: '',//当前的组件
      tableVisible: false,//销售单右侧抽屉
      commVisible: false,
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details'
      },
      totalInventoryPrice: 0,
      data: [],
      filterOptions: [
        { label: '商品编号', prop: 'goodsCodeCustomer', default: true },
        { label: '商品类别', prop: 'categoryCode', default: true },
        {
          label: '商品分类',
          prop: 'className',
          type: 'select',
          options: [
            { label: '待调拨', value: '1' },
            { label: '部分调拨', value: '2' },
            { label: '完成调拨', value: '3' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        { label: '商品名称', prop: 'goodsName', default: true },
        { label: '商品规格', prop: 'specOne', default: true },
        {
          label: '商品配置',
          prop: 'configId',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        },
        {
          label: '单位',
          prop: 'unit',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        },
        {
          label: '实物库存',
          prop: 'usableInventoryNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '入库数量',
          prop: 'sumShipmentNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '出库数量',
          prop: 'sumPutawayNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '待入库数量',
          prop: 'waitShipmentNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '待出库数量',
          prop: 'waitPutawayNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '锁库量',
          prop: 'lockInventoryNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '最低采购价',
          prop: 'minimumPurchasePrice',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '库存成本',
          prop: 'inventoryPrice',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '销售参考价',
          prop: 'saleReferencePrice',
          type: 'numberRange',
          default: true,
          int: true
        },
      ],
    };
  },
  created() {
    this.getTreeData()
  },
  mounted() {

  },
  methods: {
    response(res) {
      this.totalInventoryPrice = res.totalInventoryPrice
    },
    //tab换组件
    handleClick() {

    },
    filterNode() {

    },
    //点击编码
    changeTableVisible(row) {
      this.drawerData = row
      this.tableVisible = true
    },
    //点击商品查询
    stockLook() {
      if (this.snCode) {
        this.commVisible = true
      } else {
        this.$message({
          type: 'error',
          message: '请输入机器码或SN码'
        });
      }
    },
    //请求树列表的数据
    getTreeData() {
      this.$api.seeGoodsService.getGoodsClass()
        .then(res => {
          this.treeData = res.data || []
        })
        .finally(() => {

        })
    },
    reload() {
      this.$refs.allTable.reload()
    },
    //点击树节点
    handleNodeClick(data) {
      this.queryForm.classId = data.id
      this.reload()
    },
    clickAll() {
      this.queryForm.classId = null
      this.reload()
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
.d-text-yellow {
  color: rgba(255, 153, 0, 0.647058823529412);
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
/deep/.buying-requisition-page {
  border: 1px solid #f4f4f4;
}
/deep/.el-pagination {
  border-bottom: 1px solid #f4f4f4;
}
</style>
