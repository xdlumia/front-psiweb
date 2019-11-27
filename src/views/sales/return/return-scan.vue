/*
 * @Author: web.王晓冬
 * @Date: 2019-11-23 17:02:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-27 16:32:32
 * @Description: 退货扫码
*/

<template>
  <el-dialog
    :visible.sync="showEditPage"
    width="920px"
    v-dialogDrag
    @close="close"
    v-loading="loading"
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{`销售退货单:${code}`}}</span>
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
    >
      <!-- 库房列表 -->
      <warehouse-list :data="form" />
      <!-- 退换出入库商品 -->
      <goods-in-warehousing
        :params="{ busCode: rowData.quotationCode, busType: 1 }"
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
        //单据出入库商品数量变更集合
        alterationCommodityVoList: [
          // {
          //   alterationCode: '',//"示例：退换货单code",
          //   alterationNumber: '',//9,
          //   commodityCode: '',//"示例：商品编号",
          //   putawayType: '',// 入库1
          // }
        ],
        businessCode: '',//关联业务编号
        businessCodeList: [],//关联业务code List
        businessId: '',//0,
        businessType: '',//0,
        returnScanData: [], //临时数据 退货记录
        exchangeScanData: [], //临时数据 换货记录
        putawayCommodityList: [
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
  },
  methods: {
    //保存
    saveHandle() {
      this.form.businessCode = this.code
      this.form.businessId = this.rowData.id
      this.form.putawayCommodityList = [...this.form.returnScanData, ...this.form.exchangeScanData]
      this.form.alterationCommodityVoList = this.form.putawayCommodityList.map(item => {
        return {
          alterationCode: this.code,//"示例：退换货单code",
          alterationNumber: item.scanNumber,//退货数量/扫码次数
          commodityCode: item.commodityCode,//"示例：商品编号",
          putawayType: item.putawayType,// 入库1
        }
      })
      let api = 'salesreturnedScanReturned'
      if (this.from == 'exchange') {
        api = 'salesreturnedScanExchange'
      }
      this.$api.seePsiSaleService[api](this.form)
        .then(res => {
          this.setEdit()
          this.close()
        })
        .finally(() => {

        })
    }
  },

}
</script>
<style scoped>
</style>
