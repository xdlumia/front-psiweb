/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-10 17:54:28
 * @Description: 采购-请购明细表
*/
<template>
  <el-dialog :fullscreen="true" :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>请购明细表</span>
    </div>
    <div class="buying-requisition-page wfull hfull">
      <tableView
        :filterOptions="filterOptions"
        :params="Object.assign(defaultParams,params)"
        api="seePsiPurchaseService.purchaseapplyorderCommoditys"
        busType="33"
        exportApi="seePsiPurchaseService.purchaseapplyorderDetailExport"
        title="请购明细表"
      >
        <template slot-scope="{column,row,value,prop}">
          <span v-if="prop=='goodsPic'">
            <el-image
              :preview-src-list="value?[value]:[]"
              :src="value"
              class="d-center"
              fit="contain"
              style="width:100px;height:40px;margin:0;"
            >
              <template slot="error">暂无图片</template>
            </el-image>
          </span>
          <span v-else-if="prop=='categoryCode'">{{value|dictionary('PSI_SP_KIND')}}</span>
          <span v-else-if="prop=='className'">{{value||''}}</span>
          <span v-else-if="prop=='commodityCode'">
            <el-link :underline="false" @click="showCommodityDetail=true,currentCommodityCode=value" class="f12" type="primary">{{value}}</el-link>
          </span>
          <span v-else-if="['applyNum','purchaseNum','borrowNum','waitPutinNum','inventoryNumber'].includes(prop)">
            <span>{{value||0}}</span>
          </span>
          <span v-else>{{value}}</span>
        </template>
      </tableView>
    </div>
    <CommodityDetail :code="currentCommodityCode" :visible.sync="showCommodityDetail" v-if="showCommodityDetail" />
  </el-dialog>
</template>
<script>
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';
/**
 * 采购-请购单
 */
export default {
  props: {
    visible: Boolean,
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 20 })
    }
  },
  components: {
    CommodityDetail
  },
  data() {
    return {
      defaultParams: {
        page: 1,
        limit: 20
      },
      status: [],
      currentCode: '',
      currentCommodityCode: '',
      showDetail: false,
      showCommodityDetail: false,
      orderStorageVisible: false,
      addBorrowInVisible: true,
      // prettier-ignore
      filterOptions: [
        { label: '商品编号', prop: 'commodityCode', default: true },
        { label: '请购单编号', prop: 'purchaseApplyCode', default: true },
        { label: '请购数量', prop: 'ApplyNum', type: 'numberRange', int: true, default: true },
        { label: '采购数量', prop: 'PurchaseNum', type: 'numberRange', int: true , default: true},
        { label: '借入数量', prop: 'BorrowNum', type: 'numberRange', int: true, default: true },
        { label: '待入库数量', prop: 'WaitPutinNum', type: 'numberRange', int: true, default: true },
      ]
    };
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
  /deep/ .d-table {
    height: calc(100vh - 116px) !important;
  }
}
</style>
