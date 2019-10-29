/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 17:04:00
 * @Description: 采购-请购单明细表
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>请购单明细表</span>
    </div>
    <div class="buying-requisition-page wfull hfull">
      <TableView :headers="tableHeader" api="bizSystemService.getEmployeeList" title="请购单明细表">
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
/**
 * 采购-请购单
 */
export default {
  props: {
    visible: Boolean
  },
  components: {
    TableView
  },
  data() {
    return {
      status: [],
      orderStorageVisible: false,
      addBorrowInVisible: true,
      tableHeader: [
        { label: '商品编号', prop: 'deptName', width: '180' },
        { label: '商品图片', prop: 'deptName', width: '180' },
        { label: '商品名称', prop: 'deptName', width: '180' },
        { label: '商品类别', prop: 'deptName', width: '180' },
        { label: '商品分类', prop: 'deptName', width: '180' },
        { label: '规格', prop: 'deptName', width: '180' },
        { label: '请购数量', prop: 'deptName', width: '180' },
        { label: '已采购数量', prop: 'deptName', width: '180' },
        { label: '已借入数量', prop: 'createTime', width: '180' },
        { label: '待入库数量', prop: 'createTime', width: '180' },
        { label: '库存总量', prop: 'createTime', width: '180' }
      ]
    };
  },
  methods: {
    logData(e) {
      console.log(e);
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
