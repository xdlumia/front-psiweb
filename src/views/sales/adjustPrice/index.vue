/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 10:17:29
 * @Description: 销售-销售调价单
 */
<template>
  <div>
    <table-view
      busType="39"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_adjustPrice_1005')"
      :column="true"
      title="销售调价单"
      api="seePsiCommonService.commonadjustpriceList"
      exportApi="seePsiCommonService.commonadjustpriceExport"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
    >
      <template v-slot:button>
        <el-button
          type="primary"
          size="mini"
          v-if="authorityButtons.includes('psi_adjustPrice_1004')"
          @click="eventHandle('addVisible')"
        >新增调价</el-button>
      </template>
      <!-- 自定义按钮功能 -->
      <template slot-scope="{column,prop, row,value}">
        <!-- 调价单编号 -->
        <span
          v-if="prop == 'code'"
          class="d-text-blue d-pointer"
          @click="eventHandle('detailVisible',row)"
        > {{value | codeSlice}}</span>
        <span v-else-if="prop=='state'">
          <span>{{stateText[row.state]}}</span>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>

    <!-- 费用分摊详情 -->
    <Detail
      :code="rowData.code"
      adjustPriceType='1'
      busType='39'
      :visible.sync="detailVisible"
      :hide="['purchaseAverage','usableInventoryNum','repertoryCost']"
      :sort="['action','commodityCode','goodsPic','goodsName','categoryCode','className','specOne','inventoryPrice','saleReferencePrice','adjustPriceMoney','taxBeforeAdjustPrice','adjustPriceDifference','profitRate']"
      @reload="$refs.table.reload()"
      v-if="detailVisible"
    />
    <!-- 新增账单调整-->
    <!-- :sort="['action','commodityCode','goodsPic','goodsName','categoryCode','className','specOne','inventoryPrice','saleReferencePrice','adjustPriceMoney','taxBeforeAdjustPrice','adjustPriceDifference','profitRate']" -->

    <add
      :visible.sync="addVisible"
      adjustPriceType='1'
      v-if="addVisible"
      :hide="['purchaseAverage','usableInventoryNum','repertoryCost']"
      :sort="['action','commodityCode','goodsPic','goodsName','categoryCode','className','specOne','inventoryPrice','saleReferencePrice','adjustPriceMoney','taxBeforeAdjustPrice','adjustPriceDifference','profitRate']"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
// import add from './add' // 新增账单调价

import add from '@/views/order/price/edit.vue' //新增
import Detail from '@/views/order/price/detail.vue'; //采购调价单详情

export default {
  name: 'addjustPrice',
  components: {
    add,
    Detail
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
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '已通过',
        '3': '驳回',
        '4': '撤销'
      },
      loading: false,
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20,
        adjustPriceType: 1,
      },
      rowData: {},
      addVisible: false,
      detailVisible: false,
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this.rowData = row ? row : {}
      this[type] = true
      return
    },
    // 多选
    selectionChange(val) {
      console.log(val);

    },
  }
};
</script>
