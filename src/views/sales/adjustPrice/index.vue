/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-10 10:53:45
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
      <template slot-scope="{column,row,value}">
        <!-- 调价单编号 -->
        <span
          v-if="column.columnFields == 'code'"
          class="d-text-blue d-pointer"
          @click="eventHandle('detailVisible',row)"
        > {{value}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>

    <!-- 费用分摊详情 -->
    <Detail
      :code="rowData.code"
      :visible.sync="detailVisible"
      @reload="$refs.table.reload()"
      v-if="detailVisible"
    />
    <!-- 新增账单调整-->
    <add
      :visible.sync="addVisible"
      adjustPriceType='1'
      v-if="addVisible"
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
