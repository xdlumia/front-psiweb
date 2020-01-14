/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-14 14:22:57
 * @Description: 借出扫码
*/
<template>
  <div v-loading="loading">
    <el-container>
      <el-main :style="{maxHeight:'calc(100vh - 180px)'}">
        <form-card
          class="borrow-goods-info mt10"
          title="借出库商品"
        >

          <el-table
            border
            :data="data.commodityShowList"
            max-height="400"
            size="mini"
          >
            <el-table-column
              label="数量"
              min-width="100"
              prop="borrowLoanAccomplishNum"
            >
              <template slot-scope="scope">
                <span>{{scope.row.borrowLoanAccomplishNum}}/{{scope.row.borrowLoanNum}}</span>
              </template>
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
              prop="categoryCode"
            >
              <template slot-scope="scope"><span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span></template>
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
              <template slot-scope="scope"><span>{{scope.row.unit|dictionary('SC_JLDW')}}</span></template>
            </el-table-column>
          </el-table>

        </form-card>

        <!-- 机器号/SN码 -->
        <form-card title='SN码'>
          <div class="mt10 mb10">
            <span class="b mt5">扫SN码</span>
            <el-input
              v-on:keyup.13.native="shipmentCommodityCheck"
              v-model="snCode"
              size="mini"
              style="width:200px;"
              class="ml10 mt5"
            ></el-input>
          </div>
          <el-table
            border
            size="mini"
            :data="tableData"
            ref="companyTable"
            class="college-main"
            max-height="300"
          >
            <el-table-column
              min-width="50"
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <i
                  @click='deleteLend(scope)'
                  class="el-icon-error d-pointer"
                  style="font-size:20px;color:#F5222D"
                ></i>
              </template>
            </el-table-column>
            <el-table-column
              type='index'
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
              label="借出库房"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="operator"
              min-width="100"
              label="借出人"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="借出时间"
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
      </el-main>
    </el-container>
    <div
      slot="footer"
      class="dialog-footer mt20"
    >
      <el-button
        type="primary"
        @click="submit"
        size="small"
      >确 定</el-button>
      <el-button
        @click="close()"
        size="small"
      >取 消</el-button>
    </div>
  </div>
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
    data: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      loading: false,
      activeName: '',
      openingData: {},
      snCode: '',
      tableData: [],
      openVisible: false,
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
    //回车 出库
    shipmentCommodityCheck() {
      this.$api.seePsiWmsService.wmsinventorydetailShipmentCommodityCheck({ snCode: this.snCode, businessId: this.data.id, commodityList: this.tableData })
        .then(res => {
          if (res.data) {
            let commodityCodeList = []
            this.data.commodityShowList.forEach((item, index) => {
              // res.data.commodityCode  C1P0009RCSP20191107000003
              // if (item.commodityCode == res.data.commodityCode) {
              //   if (this.data.commodityShowList[index].borrowLoanAccomplishNum < this.data.commodityShowList[index].borrowLoanNum) {
              //     this.data.commodityShowList[index].borrowLoanAccomplishNum++
              //     this.tableData.push(res.data)
              //   } else {
              //     this.$message({
              //       type: 'error',
              //       message: '当前商品已经扫够啦!'
              //     })
              //   }
              // }
              commodityCodeList.push(item.commodityCode)
            })
            if (!commodityCodeList.includes(res.data.commodityCode)) {
              this.$message({
                type: 'error',
                message: '当前商品并非借出库商品！'
              })
            } else {
              let index = commodityCodeList.indexOf(res.data.commodityCode)
              if (this.data.commodityShowList[index].borrowLoanAccomplishNum < this.data.commodityShowList[index].borrowLoanNum) {
                this.data.commodityShowList[index].borrowLoanAccomplishNum++
                this.tableData.push(res.data)
              } else {
                this.$message({
                  type: 'error',
                  message: '当前商品已经扫够啦!'
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
    deleteLend(scope) {
      this.tableData.splice(scope.$index, 1)
      this.data.commodityShowList.forEach((item, index) => {
        if (item.commodityCode == scope.row.commodityCode) {
          this.data.commodityShowList[index].borrowLoanAccomplishNum--
        }
      })
    },
    //保存按钮
    submit() {
      this.loading = true
      this.$api.seePsiWmsService.wmsborrowloantaskLoanCommodity({ businessCode: this.data.borrowLoanCode, businessId: this.data.id, putawayCommodityList: this.tableData })
        .then(res => {
          this.close()
          this.$emit('reload')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.dialog-footer {
  text-align: center !important;
  display: block;
}
</style>