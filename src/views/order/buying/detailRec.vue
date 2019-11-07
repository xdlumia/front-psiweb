/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 17:57:27
 * @Description: 采购-请购明细表
*/
<template>
  <el-dialog :fullscreen="true" :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>请购明细表</span>
    </div>
    <div class="buying-requisition-page wfull hfull">
      <TableView :filterOptions="filterOptions" api="seePsiPurchaseService.purchaseapplyorderCommoditys" busType="33" title="请购明细表">
        <template slot-scope="{column,row,value,prop}">
          <span v-if="prop=='goodsPic'">
            <el-image :src="value" fit="contain" style="width:100px;height:40px;margin:0;">
              <template slot="error">暂无图片</template>
            </el-image>
          </span>
          <span v-else-if="prop=='categoryCode'">{{value|dictionary('PSI_SP_KIND')}}</span>
          <span v-else-if="prop=='commodityCode'">
            <el-link :underline="false" @click="showDetail=true,currentCode=value" type="primary">{{value}}</el-link>
          </span>
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
      currentCode: '',
      showDetail: false,
      orderStorageVisible: false,
      addBorrowInVisible: true,
      filterOptions: [
        { label: '商品编号', prop: 'commodityCode', default: true },
        { label: '请购单编号', prop: 'purchaseApplyCode', default: true },
        { label: '请购数量', prop: 'applyNum', default: true },
        { label: '采购数量', prop: 'purchaseNum', default: true },
        { label: '借入数量', prop: 'borrowNum', default: true },
        { label: '待入库数量', prop: 'waitPutinNum', default: true },
        { label: '部门', prop: 'deptTotalCode', type: 'dept' }
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
