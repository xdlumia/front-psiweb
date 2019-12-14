/*
 * @Author: 王晓冬
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-14 17:21:27
 * @Description: 退货记录里
*/
<template>
  <div>
    <el-dialog
      :visible.sync="showPop"
      :title="`销售${pre}单:${code}`"
      v-dialogDrag
    >
      <form-card :title="`销售${pre}`">
        <el-table
          size="mini"
          border
          :data="[rowData]"
          row-key="id"
          ref="table"
        >
          <el-table-column
            v-if="title=='换入商品信息'"
            prop="alterationNumber"
            min-width="80"
            label="退货数量"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.alterationNumber}}/{{scope.row.commodityNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="title=='换出商品信息'"
            prop="alterationNumber"
            min-width="80"
            label="换货数量"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.alterationNumber}}/{{scope.row.commodityNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="commodityCode"
            min-width="100"
            label="商品编号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="categoryCode"
            min-width="80"
            label="商品类别"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}
            </template>
          </el-table-column>

          <el-table-column
            prop="className"
            min-width="80"
            label="商品分类"
            show-overflow-tooltip
          />
          <el-table-column
            prop="goodsName"
            min-width="100"
            label="商品名称"
            show-overflow-tooltip
          />

          <el-table-column
            prop="configName"
            label="商品配置"
            min-width="80"
            show-overflow-tooltip
          />
          <el-table-column
            prop="specOne"
            label="商品规格"
            min-width="80"
            show-overflow-tooltip
          />

          <el-table-column
            prop="isTeardown"
            min-width="120"
            label="单位"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}
            </template>
          </el-table-column>
        </el-table>
      </form-card>

      <form-card title='机器号/SN记录'>
        <d-table
          api="seePsiWmsService.wmsflowrecordList"
          :params="{commodityCode:rowData.commodityCode,businessCode:code,page:1,limit:15}"
          ref="companyTable"
          class="college-main"
          style=" height:200px"
        >
          <el-table-column
            type='index'
            min-width="80"
            label="编号"
            show-overflow-tooltip
          ></el-table-column>
          <!-- 组装全是入库,状态直接写死 -->
          <el-table-column
            prop="title"
            label="状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="">
              <span>退货入库</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="title"
            label="SN码"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span class="">{{scope.row.snCode}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="robotCode"
            min-width="100"
            label="机器号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="wmsName"
            min-width="100"
            label="库房"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="operator"
            min-width="100"
            label="操作人"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            min-width="100"
            label="操作时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
          </el-table-column>
          <el-table-column
            prop="commodityCode"
            min-width="100"
            label="商品编号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="goodsName"
            min-width="100"
            label="商品名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="configName"
            min-width="100"
            label="配置"
            show-overflow-tooltip
          ></el-table-column>
        </d-table>
      </form-card>
      <div class="ac mt5">
        <el-button
          size="small"
          @click="showPop = false"
        >关 闭</el-button>
      </div>
    </el-dialog>
    <CommodityDetail
      :code="currentCommodityCode"
      :visible.sync="showCommodityDetail"
      v-if="showCommodityDetail"
    />
  </div>
</template>
<script>
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';

export default {
  props: {
    visible: {
      type: Boolean,
      defaults: false
    },
    title: String,
    data: {
      type: Object,
      default: () => ({})
    },
    code: [Number, String],
    pre: String,
    rowData: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      showCommodityDetail: false,
      currentCommodityCode: '',
    };
  },
  computed: {
    showPop: {
      get(val) {
        return this.visible = true
      },
      set() {
        this.$emit('update:visible', false)
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    // 打开商品详情
    openCommodityDetail(code) {
      this.showCommodityDetail = true;
      this.currentCommodityCode = code;
    },
  },
  components: {
    CommodityDetail
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>