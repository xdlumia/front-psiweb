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
      :headers="tableHeader"
      :selection='false'
      api="bizSystemService.getEmployeeList"
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
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
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
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
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
      ]
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
