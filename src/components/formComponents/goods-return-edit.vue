/*
 * @Author: web.王晓冬
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-14 10:46:36
 * @Description: 退货商品信息 换入商品信息 换出商品信息
*/
<template>
  <div>
    <form-card :title="true">
      <div slot="title">
        <span>{{title}}</span>
        <span class="fr">
          <el-link
            :underline="false"
            @click="fullscreen"
            type="primary"
          >全屏显示</el-link>
        </span>
      </div>
      <d-table
        api="seePsiSaleService.businesscommodityGetBusinessCommodityList"
        :params="params"
        :paging="false"
        ref="table"
        class="college-main"
        style="max-height:340px"
      >
        <el-table-column
          prop="commodityCode"
          min-width="100"
          label="商品编号"
          show-overflow-tooltip
        />

        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="goodsPic"
          min-width="100"
          label="商品图片"
          show-overflow-tooltip
        />
        <el-table-column
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        />
        <el-table-column
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        />
        <el-table-column
          prop="configName"
          label="配置"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="specOne"
          min-width="100"
          label="规格"
          show-overflow-tooltip
        />

        <el-table-column
          prop="costAmount"
          min-width="100"
          label="销售成本"
          show-overflow-tooltip
        />

        <el-table-column
          prop="costAmount"
          min-width="100"
          label="销售数量"
          show-overflow-tooltip
        />
        <el-table-column
          prop="refundNumber"
          min-width="100"
          label="退货商品数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item prop="id">
              <el-input
                size="mini"
                v-model="scope.row.id"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="taxPrice"
          min-width="140"
          label="退货单价"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item prop="id">
              <el-input
                size="mini"
                v-model="scope.row.id"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="taxRate"
          min-width="120"
          label="税率"
          show-overflow-tooltip
        />
        <el-table-column
          prop="taxPrice"
          min-width="120"
          label="税后退货单价"
          show-overflow-tooltip
        />
        <el-table-column
          prop="taxTotalAmount"
          min-width="120"
          label="税后总价"
          show-overflow-tooltip
        />
        <el-table-column
          prop="note"
          min-width="120"
          label="备注"
          show-overflow-tooltip
        />

      </d-table>
      <FullscreenElement
        :element="$refs.table"
        :visible.sync="showInFullscreen"
      />
    </form-card>
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
export default {
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    title: {
      default: '退货商品信息',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
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
