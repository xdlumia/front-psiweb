/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 14:42:36
 * @Description: 退货商品信息
*/
<template>
  <div>
    <form-card title='退货商品信息'>
      <div slot="title">
        <span>退货商品信息</span>
        <span class="fr">
          <span>
            <el-link
              :underline="false"
              @click="fullscreen"
              type="primary"
            >全屏显示</el-link>
          </span>
        </span>
      </div>
      <d-table
        api="seePsiSaleService.salesalterationsheetList"
        :params="data"
        ref="table"
        class="college-main"
        style="height:calc(100vh - 340px)"
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          fixed
          prop="commodityCode"
          min-width="100"
          label="商品编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="goodsPic"
          min-width="100"
          label="商品图片"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="refundNumber"
          min-width="100"
          label="退货数量"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="configName"
          label="配置"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="specOne"
          min-width="100"
          label="规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="costAmount"
          min-width="100"
          label="销售成本"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="salesNumber"
          min-width="100"
          label="销售数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="taxPrice"
          min-width="140"
          label="退货单价"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="taxRate"
          min-width="120"
          label="税率"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="taxPrice"
          min-width="120"
          label="税后退货单价"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="taxTotalAmount"
          min-width="120"
          label="税后总价"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="inventoryNumber"
          min-width="120"
          label="总库存"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="note"
          min-width="120"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>

      </d-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
    </form-card>
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
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
      dialogVisible: false,
      showInFullscreen: false
    }
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    }
  },
  components: {
    FullscreenElement
  },
}
</script>
<style scoped>
</style>
