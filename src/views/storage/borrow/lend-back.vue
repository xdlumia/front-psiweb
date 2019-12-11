/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-11 15:12:12
 * @Description: 借出返还
*/
<template>
  <div v-loading="loading">
    <el-container>
      <el-main :style="{maxHeight:'calc(100vh - 180px)'}">
        <form-card
          class="borrow-goods-info"
          title="返还库房"
        >
          <el-form
            label-position='top'
            size='mini'
            ref="queryForm"
            label-width="100px"
          >
            <el-form-item
              style="width:30%"
              label="返还库房"
              prop="name"
            >
              <el-select
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
        <!-- 换入库商品 -->
        <form-card
          v-for="(item,index) of data.commodityShowList"
          :key='index'
          class="borrow-goods-info mt10"
          :title="index == 0 ? '返还商品' : ''"
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
            >
              <template slot-scope="scope">
                <span>{{scope.row.returnAccomplishNum + (item.timeNum || 0)}}/{{scope.row.returnNum}}</span>
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

          <div class="mt10 mb10">
            <span class="b mt5">机器号/扫SN码</span>
            <el-input
              v-on:keyup.13.native="shipmentCommodityCheck(item)"
              v-model="item.snCode"
              size="mini"
              style="width:200px;"
              class="ml10 mt5"
            ></el-input>
            <span class="fr d-text-black mr10 mt5">
              <span>本次成功扫码 </span>
              <span class="b d-text-red f16">{{item.timeNum || 0}}</span>
              <span> 件，历史扫码 </span>
              <span class="b d-text-green f16">{{item.returnAccomplishNum}}</span>
              <span> 件，还需扫码 </span>
              <span class="b d-text-blue f16">{{item.returnNum - item.returnAccomplishNum - (item.timeNum || 0)}}</span>
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
            style="max-height:300px"
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
              label="借入库房"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="operator"
              min-width="100"
              label="借入人"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="借入时间"
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
              prop="configName"
              min-width="100"
              label="配置"
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
  </div>
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
      activeName: '',
      tableData: [],
      usableList: [],
      wmsId: '',
      loading: false,
    };
  },
  mounted() {
    this.commonwmsmanagerUsableList()
  },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('close')
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
    //回车 入库
    shipmentCommodityCheck(item) {
      this.$api.seePsiWmsService.wmsinventorydetailPutawayCommodityCheck({ snCode: item.snCode, putawayCommodityList: this.tableData, categoryCode: item.categoryCode, commodityCode: item.commodityCode, wmsId: this.wmsId })
        .then(res => {
          if (res.data) {
            if ((item.returnNum - item.returnAccomplishNum - (item.timeNum || 0)) > 0) {
              this.tableData.push(res.data)
              item.timeNum ? item.timeNum++ : item.timeNum = 1
            } else {
              this.$message({
                type: 'error',
                message: '当前商品已经扫够了!'
              })
            }
          }
        })
        .finally(() => {
        })
    },
    //删除
    deleteLend(scope) {
      this.tableData.splice(scope.$index, 1)
      this.data.commodityShowList.forEach((item, index) => {
        if (item.commodityCode == scope.row.commodityCode) {
          this.data.commodityShowList[index].timeNum--
        }
      })
    },
    //保存按钮
    submit() {
      this.loading = true
      this.$api.seePsiWmsService.wmsborrowloantaskReturnCommodity({ businessCode: this.data.borrowLoanCode, businessId: this.data.id, putawayCommodityList: this.tableData })
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
  margin-top: 20px;
}
</style>