/*
 * @Author: web.王晓冬
 * @Date: 2019-11-23 17:02:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-27 10:38:40
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
      <!-- 退入库商品 -->
      <goods-in-warehousing
        :params="{ busCode: rowData.quotationCode, busType: 1, putawayType: 0 }"
        :data="form"
      />
      <!-- 扫描记录 -->
      <sacn-record :data="form" />
    </el-form>
  </el-dialog>
</template> 
<script>

import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
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
        businessCodeList: '',//关联业务code List
        businessId: '',//0,
        businessType: '',//0,
        putawayCommodityList: [
          // {
          //   commodityCode: '',//"示例：商品编号",
          //   operation: '',//0,
          //   robotCode: '',//"示例：机器码",
          //   snCode: '',//"示例：商品SN码",
          //   wmsCommodityId: '',//100000,
          //   wmsId: '',//100000
          // }
        ]
      }
    }
  },
  methods: {
    //保存
    saveHandle() {
      this.$api.seePsiWmsService.salesreturnedScanReturned({ businessCode: this.drawerData.purchaseCode, businessId: this.drawerData.id, putawayCommodityList: this.tableData, businessType: 13 })
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
