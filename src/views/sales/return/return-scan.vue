/*
 * @Author: web.王晓冬
 * @Date: 2019-11-23 17:02:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-07 17:31:28
 * @Description: 退货扫码
*/

<template>
  <el-dialog
    :visible.sync="showEditPage"
    width="920px"
    v-dialogDrag
    @close="close"
    v-loading="loading"
    destroy-on-close
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{`销售${from == 'exchange'?'换':'退'}货单:${codeSlice(code)}`}}</span>
      <div class="fr mr30">
        <el-button
          type="primary"
          @click="saveHandle('form')"
          size="mini"
        >保存</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取消</el-button>
      </div>
    </div>

    <el-form
      @submit.native.prevent
      v-if="visible"
      :model="form"
      ref="form"
      class="d-auto-y"
      style="max-height:calc(100vh - 110px)"
    >
      <!-- 库房列表 -->
      <warehouse-list :data="form" />
      <!-- 退换出入库商品 -->
      <goods-in-warehousing
        :from="from"
        :data="form"
      />
    </el-form>
  </el-dialog>
</template> 
<script>

import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  props: { from: String }, //来源 return退货 exchange 换货
  components: {
  },
  data() {
    return {
      form: {
        loading: false,
        //单据出入库商品数量变更集合
        alterationCommodityVoList: [
          // {
          //   alterationCode: '',//"示例：退换货单code",
          //   alterationNumber: '',//9,
          //   commodityCode: '',//"示例：商品编号",
          //   putawayType: '',// 入库1
          // }
        ],
        wmsId: '', //库房
        businessCode: this.code,//关联业务编号
        businessCodeList: [],//关联业务code List
        businessId: '',//0,
        businessType: 17,//0,
        returnScanData: [], //临时数据 退货记录
        exchangeScanData: [], //临时数据 换货记录
        putawayCommodityList: [ //出入库商品信息
          // {
          //   commodityCode: '',//"示例：商品编号",
          //   operation: '',//0,入库0
          //   robotCode: '',//"示例：机器码",
          //   snCode: '',//"示例：商品SN码",
          //   wmsCommodityId: '',//100000,
          //   wmsId: '',//100000
          // }
        ]
      }
    }
  },
  created() {
    this.salesreturnedGetInfoByCode()
  },
  methods: {
    // 查询默认库房
    salesalterationsheetGetWmsCommodity(commodityCode) {
      let params = {
        quotationCode: this.rowData.quotationCode,
        commodityCode: commodityCode,
      }
      this.$api.seePsiSaleService.salesalterationsheetGetWmsCommodity(params)
        .then(res => {
          let data = res.data || {}
          this.form.wmsId = data.wmsId || ''
        })
    },
    // 获取商品信息
    salesreturnedGetInfoByCode() {
      if (this.code) {
        this.$api.seePsiSaleService.salesreturnedGetInfoByCode({ code: this.code })
          .then(res => {
            let data = res.data || {}
            this.form.putawayCommodityList = data.commodityEntityList
            let firstCommodity = this.form.putawayCommodityList[0]
            if (firstCommodity) {
              this.salesalterationsheetGetWmsCommodity(firstCommodity.commodityCode)
            }
          })
      }
    },
    //保存
    saveHandle() {
      this.form.alterationCommodityVoList = this.form.putawayCommodityList.map(item => {
        return {
          alterationCode: this.code,//"示例：退换货单code",
          alterationNumber: item.alterationNumber,//退货数量/扫码次数
          commodityCode: item.commodityCode,//"示例：商品编号",
          putawayType: item.putawayType,// 入库1
          purchasePrice: item.alterationPrice,// -采购价
          purchaseTaxes: item.taxTotalAmount, //-采购税金  采购价 *商品税率
          purchaseCost: item.reference,// -库存成本
        }
      })
      let copyParams = JSON.parse(JSON.stringify(this.form))
      copyParams.businessCode = this.code
      copyParams.businessId = this.rowData.id
      copyParams.putawayCommodityList = [...copyParams.returnScanData, ...copyParams.exchangeScanData]
      let api = 'salesreturnedScanReturned'
      if (this.from == 'exchange') {
        copyParams.businessType = 18
        api = 'salesexchangeScanExchange'
      }
      if (!copyParams.putawayCommodityList.length) {
        this.$message({
          message: '没有退换货扫码记录',
          type: 'error',
          showClose: true,
        });
        return
      }
      this.loading = true
      this.$api.seePsiSaleService[api](copyParams)
        .then(res => {
          this.$emit('reload')
          this.setEdit()
          this.close()
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

}
</script>
<style scoped>
</style>
