/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-14 14:33:12
 * @Description: 换货任务 换货扫码公共弹窗 
*/
<template>
  <el-dialog
    v-loading="loading"
    v-if='visible'
    :visible.sync="visible"
    @close='close'
    :title="`换货扫码-${codeSlice(data.swapTaskCode)}`"
    v-dialogDrag
  >
    <el-container>
      <el-main :style="{maxHeight:'calc(100vh - 180px)'}">
        <form-card
          class="borrow-goods-info"
          title="库房"
        >
          <el-form
            label-position='top'
            size='mini'
            ref="queryForm"
            label-width="100px"
          >
            <el-form-item
              style="width:30%"
              label="库房"
              prop="name"
            >
              <el-select
                :disabled="!!wmsId"
                style="width:30%"
                class="wfull"
                v-model="wmsId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in usableList"
                  :key="item.id "
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </form-card>

        <form-card
          class="borrow-goods-info mb20"
          :title="index == 0 ? '换入库商品' : ''"
          v-for="(item,index) of data.putinCommodityList"
          :key="index"
        >
          <el-table
            border
            :data="[item]"
            max-height="400"
            size="mini"
          >
            <el-table-column
              label="数量"
              min-width="100"
              prop="name"
            >
              <template slot-scope="scope">{{(scope.row.swapInAccomplishNum || 0)+(scope.row.nowNum || 0)}}/{{scope.row.swapInNum || 0}}</template>
            </el-table-column>
            <el-table-column
              prop="commodityCode"
              label="商品编号"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="d-text-blue">{{scope.row.commodityCode | codeSlice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品类别"
              min-width="110"
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
              label="商品配置"
              min-width="110"
              prop="configName"
            ></el-table-column>
            <el-table-column
              label="商品规格"
              min-width="110"
              prop="specOne"
            ></el-table-column>
            <el-table-column
              label="单位"
              min-width="120"
              prop="unit"
            >
              <template slot-scope="scope">
                <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="mt10 mb10">
            <span class="b mt5">扫SN码</span>
            <el-input
              v-on:keyup.13.native="getCommodityBySnCode(item)"
              size="mini"
              style="width:200px;"
              class="ml10 mt5"
              v-model="item.snCode"
            ></el-input>
            <span class="fr d-text-black mr10 mt5">
              <span>本次成功扫码 </span>
              <span class="b d-text-red f16">{{item.nowNum || 0}}</span>
              <span> 件，历史扫码 </span>
              <span class="b d-text-green f16">{{item.swapInAccomplishNum || 0}}</span>
              <span> 件，还需扫码 </span>
              <span class="b d-text-blue f16">{{(item.swapInNum - (item.swapInAccomplishNum || 0) - (item.nowNum || 0)) || 0}}</span>
              <span> 件</span>
            </span>
          </div>
        </form-card>

        <form-card
          class="borrow-goods-info"
          title="换出库商品"
        >
          <el-table
            border
            :data="data.putoutCommodityList"
            max-height="400"
            size="mini"
          >
            <el-table-column
              label="数量"
              min-width="100"
            >
              <template slot-scope="scope">{{scope.row.swapOutAccomplishNum || 0}}/{{scope.row.swapOutNum || 0}}</template>
            </el-table-column>
            <el-table-column
              prop="commodityCode"
              label="商品编号"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="d-text-blue">{{scope.row.commodityCode | codeSlice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品类别"
              min-width="110"
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
              label="商品配置"
              min-width="110"
              prop="configName"
            ></el-table-column>
            <el-table-column
              label="商品规格"
              min-width="110"
              prop="specOne"
            ></el-table-column>
            <el-table-column
              label="单位"
              min-width="120"
              prop="unit"
            >
              <template slot-scope="scope">
                <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="mt10 mb10">
            <span class="b mt5">扫SN码</span>
            <el-input
              v-on:keyup.13.native="shipmentCommodityCheck"
              size="mini"
              style="width:200px;"
              class="ml10 mt5"
              v-model="snCode"
            ></el-input>
            <span class="fr d-text-black mr10 mt5">
              <span>本次成功扫码 </span>
              <span class="b d-text-red f16">{{outNowNum}}</span>
              <span> 件，历史扫码 </span>
              <span class="b d-text-green f16">{{outHistoryNum}}</span>
              <span> 件，还需扫码 </span>
              <span class="b d-text-blue f16">{{outTotalNum - outNowNum - outHistoryNum}}</span>
              <span> 件</span>
            </span>
          </div>
        </form-card>

        <!-- 机器号/SN码 -->
        <form-card title='SN码'>
          <el-table
            border
            :data='tableData'
            size='mini'
            class="college-main"
            style="min-height:200px"
          >
            <el-table-column
              min-width="50"
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <i
                  @click='deleteDis(scope)'
                  class="el-icon-error d-pointer"
                  style="font-size:20px;color:#F5222D"
                ></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="commodityCode"
              min-width="80"
              label="编号"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.commodityCode | codeSlice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              min-width="100"
              label="状态"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.operation == 1 ? '换出' : '换入'}}</template>
            </el-table-column>
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
              label="扫SN码"
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
              label="库房"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="operator"
              min-width="100"
              label="换货人"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="换入/换出时间"
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
            >
              <template slot-scope="scope">
                <span>{{scope.row.commodityCode | codeSlice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品分类"
              min-width="110"
              prop="className"
            ></el-table-column>
            <el-table-column
              prop="configName"
              min-width="100"
              label="配置"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="goodsName"
              min-width="100"
              label="商品名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="商品规格"
              min-width="110"
              prop="specOne"
            ></el-table-column>
          </el-table>
        </form-card>
      </el-main>
      <openingInventory
        :visible.sync="openVisible"
        :data='openingData'
        @update='shipmentCommodityCheck'
        v-if='openVisible'
      />
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >

      <el-button
        type="primary"
        @click="submit"
        size="small"
      >确 定</el-button>
      <el-button
        @click="close"
        size="small"
      >取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import openingInventory from '@/components/formComponents/opening-inventory'
export default {
  components: {
    openingInventory
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
    },
    data: {},
    allData: {}
  },
  data() {
    return {
      dialogVisible: false,
      openVisible: false,
      queryForm: {},
      snCode: '',
      loading: false,
      openingData: {},
      tableData: [],
      value: '',
      usableList: [],
      wmsId: '',
      outNowNum: 0,//换出库商品本次成功扫码
      outHistoryNum: 0,//换出库商品历史扫码
      outTotalNum: 0//换出库商品一共有多少件
    };
  },
  mounted() {
    this.commonwmsmanagerUsableList()
    this.getLastWmId()
  },
  created() {
    this.getCalculation()
  },
  methods: {
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    //查询上一次选择的仓库，下一次不能更改
    getLastWmId() {
      this.$api.seePsiWmsService.wmsflowrecordList({ page: 1, limit: 2, commodityCode: this.data.putinCommodityList[0].commodityCode, businessCode: this.data.swapOrderCode })
        .then(res => {
          let list = res.data || []
          this.wmsId = list.length > 0 ? list[0].wmsId : ''
          console.log(this.wmsId, 'this.wmsIdthis.wmsIdthis.wmsId')
        })
        .finally(() => {

        })
    },
    close() {
      this.$emit('update:visible', false)
    },
    //进来先一顿计算
    getCalculation() {
      if (this.data.putoutCommodityList.length > 0) {
        this.data.putoutCommodityList.forEach((item) => {
          this.outHistoryNum = this.outHistoryNum + item.swapOutAccomplishNum
          this.outTotalNum = this.outTotalNum + item.swapOutNum
        })
      }
    },
    //请求可用库房
    commonwmsmanagerUsableList() {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList()
        .then(res => {
          this.usableList = res.data || []
        })
        .finally(() => {
        })
    },
    //下边的input  出库
    shipmentCommodityCheck() {
      this.$api.seePsiWmsService.wmsinventorydetailShipmentCommodityCheck({ snCode: this.snCode, businessId: this.data.id, commodityList: this.tableData, })
        .then(res => {
          if (res.data) {
            let commodityCodeList = []
            this.data.putoutCommodityList.forEach((item) => {
              // if (item.commodityCode == res.data.commodityCode) {
              //   if (item.swapOutNum - Number(item.swapOutAccomplishNum) > 0) {
              //     item.swapOutAccomplishNum ? item.swapOutAccomplishNum++ : item.swapOutAccomplishNum = 1
              //     this.outNowNum++
              //     this.tableData.push(res.data)
              //   } else {
              //     this.$message({
              //       type: 'error',
              //       message: '当前商品待出库数量已为0!'
              //     })
              //   }
              // }
              commodityCodeList.push(item.commodityCode)
            })
            if (!commodityCodeList.includes(res.data.commodityCode)) {
              this.$message({
                type: 'error',
                message: '当前商品并非换出库商品！'
              })
            } else {
              let index = commodityCodeList.indexOf(res.data.commodityCode)
              if (this.data.putoutCommodityList[index].swapOutNum - Number(this.data.putoutCommodityList[index].swapOutAccomplishNum) > 0) {
                this.data.putoutCommodityList[index].swapOutAccomplishNum ? this.data.putoutCommodityList[index].swapOutAccomplishNum++ : this.data.putoutCommodityList[index].swapOutAccomplishNum = 1
                this.outNowNum++
                this.tableData.push(res.data)
              } else {
                this.$message({
                  type: 'error',
                  message: '当前商品待出库数量已为0!'
                })
              }
            }
          } else {
            this.openVisible = true
            this.openingData = {
              snCode: this.snCode
            }
          }
        })
        .finally(() => {
        })
    },
    //点击删除
    deleteDis(scope) {
      this.tableData.splice(scope.$index, 1)
      if (scope.row.operation == 1) {
        this.data.putoutCommodityList.forEach((item, index) => {
          if (item.commodityCode == scope.row.commodityCode) {
            item.swapOutAccomplishNum--
            this.outNowNum--
          }
        })
      } else {
        this.data.putinCommodityList.forEach((item, index) => {
          if (item.commodityCode == scope.row.commodityCode) {
            item.nowNum--
          }
        })
      }
    },
    //上边的,入库
    getCommodityBySnCode(item) {
      if (this.wmsId) {
        if ((item.swapInNum - (item.swapInAccomplishNum || 0) - (item.nowNum || 0)) != 0) {
          // if ((item.singleNum || 0) * (this.data.accomplishDisassemblyNum || 0 + this.data.nowNum) > ((item.accomplishDisassemblyNum || 0) + (item.nowNum || 0))) {

          this.$api.seePsiWmsService.wmsinventorydetailPutawayCommodityCheck({
            snCode: item.snCode,
            commodityCode: item.commodityCode,
            putawayCommodityList: this.tableData,
            categoryCode: item.categoryCode,
            wmsId: this.wmsId,
            purchasePrice: item.swapInMoney,//采购价
            purchaseTaxes: item.swapInMoney * item.taxRate * 0.01,//采购税金
            purchaseCost: item.inventoryPrice,//采购成本
          })
            .then(res => {
              if (res.data) {
                this.tableData.push(res.data)
                item.nowNum ? item.nowNum++ : item.nowNum = 1
                item.snCode = ''
              }
            })
            .finally(() => {
            })
          // } else {
          //   this.$message({
          //     type: 'error',
          //     message: '出库量不够用!'
          //   })
          // }
        } else {
          this.$message({
            type: 'error',
            message: '当前商品待入库数量已为0!'
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: '请先选择入库库房!'
        })
      }
    },
    //保存按钮
    submit() {
      this.loading = true
      this.$api.seePsiWmsService.wmsswaptaskSwapCommodity({ businessCode: this.allData.swapOrderCode, businessCodeList: [this.allData.swapTaskCode], putawayCommodityList: this.tableData })
        .then(res => {
          this.$emit('reload')
          this.close()
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>