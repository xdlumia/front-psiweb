/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-11 15:17:00
 * @Description: 采购单 详情  入库商品  点击入库或者SN码公共弹窗
*/
<template>
  <el-dialog
    :visible.sync="visible"
    @close="close"
    title="入库"
    v-loading="loading"
    v-dialogDrag
  >
    <el-container>
      <el-main :style="{maxHeight:'calc(100vh - 180px)'}">
        <!-- 入库仓库 -->
        <form-card
          title='入库仓库'
          class='wfull'
        >
          <div class='wfull d-flex'>
            <span class='mr10 mt5'>入库仓库</span>
            <el-select
              v-model="wmsId"
              :disabled="rowData.type == 'disable' || !!wmsId"
              size='mini'
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
          </div>
        </form-card>
        <!-- 入库商品 -->
        <form-card
          title='入库商品'
          class='wfull'
        >
          <el-table
            border
            size='mini'
            :data='[rowData]'
            ref="companyTable"
            class="college-main mt15"
            style="max-height:300px"
          >
            <el-table-column
              fixed
              min-width="80"
              label="入库数量"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{(scope.row.putinNumber || 0)+tableData.length}}/{{scope.row.commodityNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed
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
              fixed
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
            <span class="b mt5">机器号</span>
            <el-input
              v-on:keyup.13.native="shipmentCommodityCheck"
              size="mini"
              v-model="snCode"
              style="width:200px;"
              class="ml10 mt5"
            ></el-input>
            <span class="fr d-text-black mr10 mt5">
              <span>本次成功扫码 </span>
              <span class="b d-text-red f16">{{tableData.length}}</span>
              <span> 件，历史扫码 </span>
              <span class="b d-text-green f16">{{rowData.putinNumber || 0}}</span>
              <span> 件，还需扫码 </span>
              <span class="b d-text-blue f16">{{rowData.commodityNumber - (rowData.putinNumber || 0) - tableData.length}}</span>
              <span> 件</span>
            </span>
          </div>
        </form-card>

        <!-- 机器号/SN码 -->
        <form-card title='机器号/SN码'>
          <el-table
            border
            size="mini"
            :data="tableData"
            ref="companyTable"
            class="college-main"
            max-height="200px"
            :tree-props="{children: 'id', hasChildren: 'id'}"
          >
            <el-table-column
              min-width="50"
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <i
                  @click="deletePurchase(scope)"
                  class="el-icon-error d-pointer"
                  style="font-size:20px;color:#F5222D"
                ></i>
              </template>
            </el-table-column>
            <el-table-column
              type='index'
              prop="cityName"
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
              label="入库库房"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="operator"
              min-width="100"
              label="入库人"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="出库时间"
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

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    rowData: {
      type: Object,
    },
    form: {},
    drawerData: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      usableList: [],
      tableData: [],
      snCode: '',
      loading: false,
      wmsId: '',//库房id
    };
  },
  mounted() {
    this.commonwmsmanagerUsableList()
    this.getLastWmId()
  },
  methods: {
    //查询上一次选择的仓库，下一次不能更改
    getLastWmId() {
      this.$api.seePsiWmsService.wmsflowrecordList({ page: 1, limit: 2, commodityCode: this.rowData.commodityCode, businessCode: this.drawerData.purchaseCode })
        .then(res => {
          let list = res.data || []
          this.wmsId = list[0].wmsId || ''
        })
        .finally(() => {

        })
    },
    //回车机器号和SN码
    shipmentCommodityCheck() {
      if (this.wmsId) {
        if ((this.rowData.commodityNumber - (this.rowData.putinNumber || 0) - this.tableData.length) > 0) {
          this.loading = true
          this.$api.seePsiWmsService.wmsinventorydetailPutawayCommodityCheck({ snCode: this.snCode, commodityCode: this.rowData.commodityCode, putawayCommodityList: this.tableData, categoryCode: this.rowData.categoryCode, wmsId: this.wmsId })
            .then(res => {
              if (res.data) {
                this.tableData.push(res.data)
              }
            })
            .finally(() => {
              this.loading = false
            })
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
    //删除某条
    deletePurchase(scope) {
      this.tableData.splice(scope.$index, 1)
    },
    handleClick({ label, name }) {
      this.activeName = '';
    },
    //请求可用库房
    commonwmsmanagerUsableList() {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList()
        .then(res => {
          this.usableList = res.data
        })
        .finally(() => {
        })
    },
    close() {
      this.$emit('update:visible', false)
    },
    //保存
    submit() {
      this.loading = true
      //振兴入库
      this.$api.seePsiWmsService.wmsinventorydetailBatchPutaway({ businessCode: this.drawerData.purchaseCode, businessId: this.drawerData.id, putawayCommodityList: this.tableData, businessType: 32 })
        .then(res => {
          //龙哥算状态
          this.$api.seePsiPurchaseService.purchasePutin({ purchaseCode: this.drawerData.purchaseCode, id: this.drawerData.id })
            .then(res => {
              this.close()
              this.$emit('reload')
            })
            .finally(() => {
            })
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