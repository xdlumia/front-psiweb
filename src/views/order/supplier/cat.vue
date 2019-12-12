/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-12 11:51:03
 * @Description: 商品供应分类表
*/
<template>
  <el-dialog :fullscreen="true" :visible="visible" @close="close" title="商品供应分类表" v-dialogDrag>
    <div class="supplier-cat-page wfull" style="height:calc(100vh - 120px);position:relative;">
      <div class="cat-tree">
        <commodity-cat :mainCat.sync="queryForm.categoryCode" :subCat.sync="queryForm.goodClassId" @change="reload" />
      </div>
      <TableView
        :filter="false"
        :params="queryForm"
        api="seePsiCommonService.commonsupplierinfoQueryListClassification"
        busType="47"
        exportApi="seePsiCommonService.commonsupplierinfoExport"
        ref="tableView"
        title="供应商"
      >
        <template slot-scope="{column,row,value,prop}">
          <span v-if="prop=='code'">
            <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
          </span>
          <span v-else-if="prop=='state'">
            <span v-if="value==0">启用中</span>
            <span v-else>停用中</span>
          </span>
          <span v-else-if="prop=='productRange'">
            <el-tag
              :disable-transitions="false"
              :key="item"
              @close="delProductRange(row,item)"
              class="mr5"
              closable
              size="mini"
              type="info"
              v-for="item of getProductRangeList(value)"
            >{{item|dictionary('PSI_GYS_CPFW')}}</el-tag>
          </span>
          <span v-else>{{value}}</span>
        </template>
      </TableView>
    </div>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload" />
  </el-dialog>
</template>
<script>
import TableView from '@/components/tableView';
import Detail from './detail';

export default {
  components: {
    TableView,
    Detail
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
      showDetail: false,
      currentCode: '',
      showEdit: false,
      activeName: 'first',
      filterText: '',
      multipleVisible: false,
      multipleSelection: [],
      // 查询表单
      queryForm: {
        goodClassId: '',
        categoryCode: '',
        page: 1,
        limit: 20
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isModified: false
    };
  },
  methods: {
    close() {
      if (this.isModified) this.$emit('reload');
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
    },
    reload() {
      this.$refs.tableView.reload();
    },
    getProductRangeList(item) {
      return String(item || '')
        .split(',')
        .map(a => a.trim())
        .filter(a => a);
    },
    async delProductRange(row, item) {
      await this.$confirm(`是否删除？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
        center: true
      });
      let leftList = this.getProductRangeList(row.productRange)
        .filter(a => a != item)
        .join(',');
      await this.$api.seePsiCommonService.commonsupplierinfoUpdate({
        id: row.id,
        code: row.code,
        productRange: leftList
      });
      row.productRange = leftList;
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
