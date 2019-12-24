/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-21 09:19:57
 * @Description: 调出扫码
*/
<template>
  <div v-loading='loading'>
    <div
      :style="{maxHeight:'calc(100vh - 180px)'}"
      class="borrow-goods-info mt10 d-auto-y"
    >
      <!-- 换入库商品 -->
      <form-card title="调出商品">
        <el-table
          border
          :data="dialogData.allocationCommodityList"
          max-height="300"
          size="mini"
        >
          <el-table-column
            label="数量"
            min-width="100"
            prop="num"
          >
            <template slot-scope="scope">
              {{Number(scope.row.outAccomplishNum)}}/{{scope.row.num}}
            </template>
          </el-table-column>
          <el-table-column
            prop="commodityCode"
            label="商品编号"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span class="d-text-blue">{{scope.row.commodityCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品类别"
            min-width="110"
            prop="categoryCode"
          >
            <template slot-scope="scope">
              <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品分类"
            min-width="110"
            prop="className"
          ></el-table-column>
          <el-table-column
            label="商品名称"
            min-width="110"
            prop="goodsName"
          ></el-table-column>
          <el-table-column
            label="商品规格"
            min-width="110"
            prop="specOne"
          ></el-table-column>
          <el-table-column
            label="单位"
            min-width="80"
            prop="unit"
          >
            <template slot-scope="scope">
              <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
            </template>
          </el-table-column>
        </el-table>

      </form-card>

      <!-- 机器号/SN码 -->
      <form-card title='机器号/SN码'>

        <div class="mt10 mb10">
          <span class="b mt5">扫SN码/机器码</span>
          <el-input
            size="mini"
            v-model="snCode"
            style="width:200px;"
            class="ml10 mt5"
            v-on:keyup.13.native="shipmentCommodityCheck(snCode)"
          ></el-input>
          <el-button
            type="primary"
            size='mini'
            class='fr mr5'
            @click="chooseVisible = true"
          >选择商品</el-button>
        </div>
        <el-table
          border
          size='mini'
          :data="downTableData"
          ref="companyTable"
          class="college-main"
          style="height:200px"
        >
          <el-table-column
            min-width="50"
            label="操作"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i
                @click="deleteSth(scope)"
                class="el-icon-error d-pointer"
                style="font-size:20px;color:#F5222D"
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            min-width="80"
            label="编号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="snCode"
            label="SN码"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.snCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="robotCode"
            label="机器号"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.robotCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="wmsName"
            min-width="100"
            label="调出库房"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="operator"
            min-width="100"
            label="调拨人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="调拨时间"
            min-width="140"
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
        </el-table>
      </form-card>
      <openingInventory
        :visible.sync="openVisible"
        :data='openingData'
        @update='shipmentCommodityCheck'
        v-if='openVisible'
      />
    </div>
    <div class="wfull d-center mt10">
      <span>
        <el-button
          @click="close"
          size="small"
        >关 闭</el-button>
        <el-button
          type="primary"
          @click="wmsallocationorderBatchUpdate"
          size="small"
        >保 存</el-button>
      </span>
    </div>

    <!-- :params='{wmsId:dialogData.putawayWmsId}' -->
    <commodityChoose
      v-if="dialogData.putawayWmsId"
      :visible.sync='chooseVisible'
      @choose='commodityChoose'
      sn
    />
  </div>
</template>
<script>
import commodityChoose from '@/components/formComponents/commodity-choose'
import openingInventory from '@/components/formComponents/opening-inventory'
export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
    },
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      chooseVisible: false,
      tableData: [],
      snCode: '',
      openVisible: false,
      loading: false,
      formInline: {
        user: ''
      },
      downTableData: []
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('close')
    },
    //弹窗选择商品
    commodityChoose(selected) {
      if (selected.length > 0) {
        selected.forEach((item) => {
          let snCode = item.snCode ? item.snCode : item.robotCode
          this.shipmentCommodityCheck(snCode)
        })
      }
    },
    //每次扫码,对应上边的
    doSth(data) {
      this.dialogData.allocationCommodityList.forEach((item) => {
        if (item.commodityCode == data.commodityCode) {
          if (Number(item.outAccomplishNum) < Number(item.num)) {//数量还不够的时候可以继续扫
            item.outAccomplishNum++
            this.downTableData.push(data)
          } else {
            this.$message({
              type: 'info',
              message: '当前商品已经调完了!'
            })
          }
        }
      })
    },
    //删除一条
    deleteSth(scope) {
      this.downTableData.splice(scope.$index, 1)
      this.dialogData.allocationCommodityList.forEach((item) => {
        if (item.commodityCode == scope.row.commodityCode) {
          item.outAccomplishNum--
        }
      })
    },
    //扫SN码
    shipmentCommodityCheck(snCode) {
      this.$api.seePsiWmsService.wmsallocationorderShipmentCommodityCheck({ businessId: this.dialogData.id, snCode: this.snCode, commodityList: this.downTableData })
        .then(res => {
          if (res.data) {
            let arr = this.downTableData.filter((item) => {
              return item.id == res.data.id
            })
            // if (arr.length == 0) {
            this.doSth(res.data)
            // } else {
            //   this.$message({
            //     type: 'info',
            //     message: '扫过喽'
            //   })
            // }
          } else {
            this.openVisible = true
            this.openingData = {
              snCode: this.snCode
            }
          }
          // this.snCode = ''
        })
        .finally(() => {

        })
    },
    //调出走的接口
    wmsallocationorderBatchUpdate() {
      if (this.downTableData.length > 0) {
        this.loading = true
        this.$api.seePsiWmsService.wmsallocationorderBatchUpdate({ putawayCommodityList: this.downTableData, businessCode: this.dialogData.allocationOrderCode, businessType: 0 })
          .then(res => {
            this.close()
            this.$emit('reload')
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请至少扫一个商品'
        })
      }

    }
  },
  components: {
    commodityChoose,
    openingInventory
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>