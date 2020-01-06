<template>
  <div>
    <!-- 退入库商品 -->
    <form-card title='退入库商品'>
      <div
        class="ac d-text-gray"
        v-if="!data.putawayCommodityList.filter(v=>v.putawayType==1).length"
      >无商品信息</div>
      <div
        v-for="(item,index) of data.putawayCommodityList.filter(v=>v.putawayType==1)"
        :key="index"
      >
        <el-table
          border
          size='mini'
          :data='[item]'
          ref="table"
          class="mt15"
          max-height="300"
        >
          <el-table-column
            fixed
            min-width="70"
            label="数量"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <!-- 扫码数量 -->
              <span>{{scope.row.alterationNumber || 0}}/{{scope.row.commodityNumber || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="commodityCode"
            label="商品编号"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.commodityCode | codeSlice}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="categoryCode"
            min-width="100"
            label="商品类别"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="className"
            min-width="100"
            label="商品分类"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="configName"
            min-width="100"
            label="商品配置"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="specOne"
            min-width="100"
            label="商品规格"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="unit"
            min-width="100"
            label="单位"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt10 mb10">
          <span class="b mt5">机器号/SN码</span>
          <el-input
            :disabled="item.alterationNumber == item.commodityNumber || !item.commodityNumber"
            @keyup.native.13="commodityCheck(item,'return')"
            size="mini"
            v-model="item.snCode"
            style="width:200px;"
            class="ml10 mt5"
          >
            <!-- <el-button
              slot="append"
              @click="commodityCheck(item,'return')"
            >确定</el-button> -->
          </el-input>
          <span class="fr d-text-black mr10 mt5">
            <span>本次成功扫码 </span>
            <span class="b d-text-red f16">{{item.scanNumber || 0}}</span>
            <span> 件，历史扫码 </span>
            <span class="b d-text-green f16">{{item.alterationNumber||0}}</span>
            <span> 件，还需扫码 </span>
            <span class="b d-text-blue f16">{{(item.commodityNumber||0) - (item.alterationNumber || 0) }}</span>
            <span> 件</span>
          </span>
        </div>
      </div>
    </form-card>
    <!-- 换出商品 -->
    <form-card
      title='换出商品'
      v-if="from=='exchange'"
    >
      <div
        v-for="(item,index) of data.putawayCommodityList.filter(v=>v.putawayType==0)"
        :key="index"
      >
        <el-table
          border
          size='mini'
          :data='[item]'
          ref="table"
          class="mt15"
          style="max-height:300px"
        >
          <el-table-column
            fixed
            min-width="70"
            label="数量"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <!-- 扫码数量 -->
              <span>{{scope.row.alterationNumber || 0}}/{{scope.row.commodityNumber || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="commodityCode"
            label="商品编号"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.commodityCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="categoryCode"
            min-width="100"
            label="商品类别"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="className"
            min-width="100"
            label="商品分类"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="configName"
            min-width="100"
            label="商品配置"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="specOne"
            min-width="100"
            label="商品规格"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="unit"
            min-width="100"
            label="单位"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt10 mb10">
          <span class="b mt5">机器号/SN码</span>
          <el-input
            :disabled="item.alterationNumber == item.commodityNumber || !item.commodityNumber"
            @keyup.native.13="commodityCheck(item,'exchange')"
            size="mini"
            v-model="item.snCode"
            style="width:200px;"
            class="ml10 mt5"
          >
            <!-- <el-button
              slot="append"
              @click="commodityCheck(item,'exchange')"
            >确定</el-button> -->
          </el-input>
          <span class="fr d-text-black mr10 mt5">
            <span>本次成功扫码 </span>
            <span class="b d-text-red f16">{{item.scanNumber || 0}}</span>
            <span> 件，历史扫码 </span>
            <span class="b d-text-green f16">{{item.alterationNumber||0}}</span>
            <span> 件，还需扫码 </span>
            <span class="b d-text-blue f16">{{(item.commodityNumber||0) - (item.alterationNumber || 0) }}</span>
            <span> 件</span>
          </span>
        </div>
      </div>
    </form-card>
    <!-- 扫描记录 -->
    <form-card
      title='扫描记录'
      class='wfull'
    >
      <el-table
        border
        size='mini'
        :data='[...data.returnScanData,...data.exchangeScanData]'
        ref="table"
        class="college-main mt15"
        max-height="300"
      >
        <el-table-column
          min-width="80"
          label="操作"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <i
              class="el-icon-delete-solid d-text-red d-pointer"
              @click="delRecord(scope)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          label="编号"
          type="index"
          width="50"
        >
        </el-table-column>

        <el-table-column
          min-width="80"
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- //来源 return 退货 exchange 换货 -->
            <span v-if="from=='return'">待退货</span>
            <span v-else>{{scope.row.operation == 0?'待入库':'待出库'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="snCode"
          label="SN码"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="robotCode"
          min-width="100"
          label="机器码"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="wmsName"
          min-width="100"
          label="入库库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operator"
          min-width="100"
          label="入库人"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          min-width="100"
          label="入库时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.createTime|timeToStr}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="commodityCode"
          label="商品编号"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="configName"
          min-width="100"
          label="配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specOne"
          min-width="100"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>

    </form-card>
    <openingInventory
      :disabled='true'
      :visible.sync="visible"
      :data='opingData'
      @update="commodityCheck(snItem,'exchange')"
      v-if='visible'
    />
  </div>
</template>
<script>
import openingInventory from '@/components/formComponents/opening-inventory'
export default {
  components: {
    openingInventory
  },
  props: {
    rowData: Object,
    params: Object,
    data: Object,
    from: String, //来源 return退货 exchange 换货
  },
  computed: {
  },
  data() {
    return {
      visible: false,
      opingData: {},
      snItem: ''
    };
  },
  mounted() {

  },
  methods: {

    //回车机器号和SN码
    commodityCheck(item, type) {
      if (type == 'return' && !this.data.wmsId) {
        this.$message({
          type: 'error',
          message: '请先选择入库库房!',
          showClose: true
        })
        return
      }
      let params = {
        snCode: item.snCode,
        commodityCode: item.commodityCode,
        categoryCode: item.categoryCode,
        purchasePrice: item.alterationPrice,// -采购价
        purchaseTaxes: item.taxTotalAmount, //-采购税金  采购价 *商品税率
        purchaseCost: item.reference,// -库存成本
        wmsId: this.data.wmsId
      }
      // 入库扫码
      let api = null

      //退货
      if (type == 'return') {
        api = 'wmsinventorydetailPutawayCommodityCheck'
        params.putawayCommodityList = this.data.returnScanData //退货
        delete params.commodityList
      }
      //换货
      else if (type == 'exchange') {
        params.wmsId = ''
        api = 'wmsinventorydetailShipmentCommodityCheck'
        params.commodityList = this.data.exchangeScanData //换货
        delete params.putawayCommodityList
      }
      this.$api.seePsiWmsService[api](params)
        .then(res => {
          if (res.data) {
            let data = res.data || {}
            data.fromType = type
            // putawayType操作类型 1入库 0 出库
            if (item.putawayType == 1) {
              // operation也是操作类型 0 入库 1出库.  这俩人写的 类型值还不统一.  噗噗噗....
              data.operation = 0
              if (item.commodityCode != data.commodityCode) {
                this.$message({
                  message: '当前扫码出来的商品不是当前操作的商品',
                  type: 'error',
                  showClose: true,
                });

                return
              }
            } else {
              data.operation = 1
            }
            // this.data.returnScanData.push({ ...item, ...data })
            data.id = item.id
            this.data[`${type}ScanData`].push({ ...item, ...data })

            // 本次扫码次数
            item.scanNumber = (item.scanNumber || 0) + 1
            item.alterationNumber++
          } else {
            this.visible = true
            this.snItem = item
            this.opingData = {
              snCode: item.snCode,
              commodityCode: item.commodityCode
            }
          }
        })
    },
    //删除某条
    delRecord(scope) {
      let row = scope.row
      let index = this.data[`${row.fromType}ScanData`].indexOf(scope.row)
      let item = this.data.putawayCommodityList.find(item => item.id == row.id)
      // 本次扫码次数
      item.scanNumber--
      item.alterationNumber--
      this.data[`${row.fromType}ScanData`].splice(index, 1)
    },
  }
};
</script>
<style lang="scss" scoped>
</style>