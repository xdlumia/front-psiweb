/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-05 13:50:10
 * @Description: 商品供应分类表
*/
<template>
  <el-dialog :fullscreen="true" :visible="visible" @close="close" title="商品供应分类表" v-dialogDrag>
    <div class="supplier-cat-page wfull" style="height:calc(100vh - 120px);position:relative;">
      <div class="cat-tree">
        <el-tabs @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="整机" name="first"></el-tab-pane>
          <el-tab-pane label="配件" name="second"></el-tab-pane>
          <el-tab-pane label="服务" name="third"></el-tab-pane>
        </el-tabs>
        <el-input class="ml5" placeholder="搜索分类名称" prefix-icon="el-icon-search" size="small" style="width:93%" v-model="filterText"></el-input>
        <el-button class="ml5" type="text">全部</el-button>
        <el-tree :data="data" :filter-node-method="filterNode" :props="defaultProps" class="filter-tree" default-expand-all ref="tree"></el-tree>
      </div>
      <TableView api="seePsiCommonService.commonsupplierinfoQueryList" busType="47" title="供应商">
        <template slot-scope="{column,row,value}">
          <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
          <span v-else>{{value}}</span>
        </template>
      </TableView>
    </div>
  </el-dialog>
</template>
<script>
import TableView from '@/components/tableView';

export default {
  components: {
    TableView
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status: [],
      showDetail: true,
      showEdit: false,
      activeName: 'first',
      filterText: '',
      multipleVisible: false,
      multipleSelection: [],
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
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    logData(e) {
      console.log(e);
    },
    close() {
      this.$emit('update:visible', false);
    },
    handleClick() {},
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除某项
    deleteChoose(row) {
      this.multipleSelection.splice(row.$index, 1);
      this.$refs.multipleTable.$refs.elTable.toggleRowSelection(row.row, false);
    }
  }
};
</script>
<style lang="scss" scoped>
.supplier-cat-page {
  position: relative;
  .cat-tree {
    position: absolute;
    top: 47px;
    width: 320px;
    height: calc(100% - 80px);
    border: 1px solid #f1f1f1;
    border-right: 0px;
  }
  .main-content {
    height: 100%;
    /deep/ {
      > div:first-child + div {
        > .el-table {
          width: calc(100% - 320px) !important;
          margin-left: 320px;
        }
      }
    }
  }
}
</style>
