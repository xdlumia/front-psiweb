/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-09 09:55:35
 * @Description: 采购单 详情  拆卸任务 拆卸公共弹窗 
*/
<template>
  <el-dialog
    v-if='visible'
    v-loading="loading"
    :visible.sync="visible"
    @close='close'
    :title="`拆卸-${codeSlice(data.commodityCode)}`"
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
                @change="wmsDisabled = true"
                :disabled="wmsDisabled"
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
          class="borrow-goods-info"
          title="原商品"
        >
          <el-table
            border
            :data="[data]"
            max-height="400"
            size="mini"
          >
            <el-table-column
              label="拆卸数量"
              min-width="100"
            >
              <template slot-scope="scope">{{(scope.row.accomplishDisassemblyNum || 0)+(scope.row.nowNum || 0)}}/{{scope.row.disassemblyNum}}</template>
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
              label="可用库存"
              min-width="100"
              prop="singleNum"
            ></el-table-column>
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
              label="备注"
              min-width="120"
              prop="note"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
          <div class="mt10 mb10">
            <span class="b mt5">机器号/扫SN码</span>
            <el-input
              v-on:keyup.13.native="shipmentCommodityCheck"
              size="mini"
              style="width:200px;"
              class="ml10 mt5"
              v-model="snCode"
            ></el-input>
            <span class="fr d-text-black mr10 mt5">
              <span>本次成功扫码 </span>
              <span class="b d-text-red f16">{{data.nowNum || 0}}</span>
              <span> 件，历史扫码 </span>
              <span class="b d-text-green f16">{{data.accomplishDisassemblyNum || 0}}</span>
              <span> 件，还需扫码 </span>
              <span class="b d-text-blue f16">{{data.disassemblyNum - (data.accomplishDisassemblyNum || 0) - (data.nowNum || 0)}}</span>
              <span> 件</span>
            </span>
          </div>
        </form-card>
        <!-- 新商品 -->
        <form-card
          class="mb20"
          :title="index == 0 ? '新商品' : ''"
          v-for="(item,index) of data.childrenCommodityList"
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
              <template slot-scope="scope">{{(scope.row.accomplishDisassemblyNum || 0)+(scope.row.nowNum || 0)}}/{{scope.row.disassemblyNum}}</template>
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
              label="备注"
              min-width="120"
              prop="note"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>

          <div class="mt10 mb10">
            <span class="b mt5">机器号/扫SN码</span>
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
              <span class="b d-text-green f16">{{item.accomplishDisassemblyNum || 0}}</span>
              <span> 件，还需扫码 </span>
              <span class="b d-text-blue f16">{{item.disassemblyNum - (item.accomplishDisassemblyNum || 0) - (item.nowNum || 0)}}</span>
              <span> 件</span>
            </span>
          </div>
        </form-card>

        <!-- 机器号/SN码 -->
        <form-card title='机器号/SN码'>
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
            ></el-table-column>
            <el-table-column
              min-width="100"
              label="状态"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.operation == 1 ? '出库' : '入库'}}</template>
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
              prop="createTime"
              label="操作时间"
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
            >
              <template slot-scope="scope">
                <span>{{scope.row.commodityCode | codeSlice}}</span>
              </template>
            </el-table-column>
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
      </el-main>
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
    data: {},
    allData: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      openVisible: false,
      openingData: {},
      queryForm: {},
      snCode: '',
      tableData: [],
      value: '',
      usableList: [],
      loading: false,
      wmsId: '',//库房id
      wmsDisabled: false,
    };
  },
  mounted() {
    this.commonwmsmanagerUsableList()
  },
  methods: {
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    //查询上一次选择的仓库，下一次不能更改
    getLastWmId() {
      this.$api.seePsiWmsService.wmsflowrecordList({ page: 1, limit: 2, commodityCode: this.data.commodityCode, businessCode: this.allData.disassemblyTaskCode })
        .then(res => {
          let list = res.data || []
          if (list && list.length > 0 && list[0].wmsId) {
            this.wmsId = list[0].wmsId || ''
            this.wmsDisabled = true
            let wmsIdArr = []
            //检查当前库房id是否还可用
            this.usableList.forEach((item) => {
              wmsIdArr.push(item.id)
            })
            if (wmsIdArr.indexOf(this.wmsId) < 0) {
              this.$message({
                type: 'error',
                message: '当前库房已不可用!'
              })
              this.wmsId = ''
              this.wmsDisabled = true
            } else {
            }
          } else {
            this.wmsDisabled = false
          }
        })
        .finally(() => {

        })
    },
    close() {
      this.$emit('update:visible', false)
    },
    //请求可用库房
    commonwmsmanagerUsableList() {
      this.data.childrenCommodityList.forEach((item) => {
        item.nowNum = 0
      })
      this.data.nowNum = 0
      this.$api.seePsiWmsService.commonwmsmanagerUsableList()
        .then(res => {
          this.usableList = res.data || []
        })
        .finally(() => {
          this.getLastWmId()
        })
    },
    //上边的input  出库
    shipmentCommodityCheck() {
      if ((this.data.disassemblyNum - (this.data.accomplishDisassemblyNum || 0) - (this.data.nowNum || 0)) != 0) {
        this.$api.seePsiWmsService.wmsinventorydetailShipmentCommodityCheck({ snCode: this.snCode, businessId: this.data.id, commodityList: this.tableData, })
          .then(res => {
            if (res.data) {
              this.tableData.push(res.data)
              this.data.nowNum ? this.data.nowNum++ : this.data.nowNum = 1
            } else {
              this.openVisible = true
              this.openingData = {
                snCode: this.snCode
              }
            }
          })
          .finally(() => {

          })
      } else {
        this.$message({
          type: 'error',
          message: '当前商品待出库数量已为0!'
        })
      }
    },
    //点击删除
    deleteDis(scope) {
      this.tableData.splice(scope.$index, 1)
      if (scope.row.operation == 1) {
        this.data.nowNum--
      } else {
        this.data.childrenCommodityList.forEach((item, index) => {
          if (item.commodityCode == scope.row.commodityCode) {
            item.nowNum--
          }
        })
      }
    },
    //下边的,入库
    getCommodityBySnCode(item) {
      if (this.wmsId) {
        if ((item.disassemblyNum - (item.accomplishDisassemblyNum || 0) - (item.nowNum || 0)) != 0) {
          if ((item.singleNum || 0) * ((this.data.accomplishDisassemblyNum || 0) + this.data.nowNum) > ((item.accomplishDisassemblyNum || 0) + (item.nowNum || 0))) {
            this.$api.seePsiWmsService.wmsinventorydetailPutawayCommodityCheck({
              snCode: item.snCode,
              commodityCode: item.commodityCode,
              putawayCommodityList: this.tableData,
              categoryCode: item.categoryCode,
              wmsId: this.wmsId,
              purchasePrice: item.purchaseUnivalence,//采购价
              purchaseTaxes: item.purchaseUnivalence * item.taxRate * 0.01,//采购税金
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
          } else {
            this.$message({
              type: 'error',
              message: '出库量不够用!'
            })
          }
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
      let params = {
        businessCode: this.allData.disassemblyTaskCode,
        businessCodeList: [this.allData.disassemblyOrderCode],
        putawayCommodityList: this.tableData,
        parentCommodityCode: this.data.commodityCode
      }
      this.$api.seePsiWmsService.wmsdisassemblytaskPutawayCommodity(params)
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