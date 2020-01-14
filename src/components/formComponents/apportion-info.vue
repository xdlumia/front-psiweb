/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-14 15:42:58
 * @Description: 分摊信息
 */
<template>
  <div>
    <form-card title='分摊信息'>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项',trigger:'blur'}]"
            label="费用单"
            prop="costCode"
          >
            <el-input
              :disabled="disabled"
              :value="$options.filters.codeSlice(data.costCode)"
            >
              <el-button
                slot="append"
                @click="eventHandle('financeFee')"
                icon="el-icon-plus"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项',trigger:'blur'}]"
            label="未分摊费用金额"
            prop="unAmount"
          >
            <el-input
              :disabled="true"
              v-model="data.unAmount"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项',trigger:'blur'}]"
            label="本次分摊费用金额"
            prop="costAmount"
          >
            <el-input
              :disabled="disabled"
              v-model="data.costAmount"
              @input="costAmountChange"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项',trigger:'blur'}]"
            label="关联单据"
            prop="busType"
          >
            <el-select
              class="wfull"
              :disabled="disabled"
              @change="busTypeChange"
              :rules="[{required:true,message:'必填项'}]"
              v-model="data.busType"
            >
              <el-option
                :key="val.busType"
                :label="val.title"
                :value="key"
                v-for="(val,key) in options"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="data.busType"
        >
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            :label="dialogData.title"
            prop="busCode"
          >
            <!-- <div
              class="not-disabled-class"
              @click="eventHandle(data.busType)"
            > -->
            <el-input
              :disabled="disabled"
              :value="$options.filters.codeSlice(data.busCode)"
            >
              <el-button
                slot="append"
                @click="eventHandle(data.busType)"
                icon="el-icon-plus"
              ></el-button>
            </el-input>
            <!-- </div> -->
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
    <goods-apportion
      v-loading="loading"
      ref="goodsTable"
      :data="tableData"
    />
    <!-- 新增 / 编辑 弹出框-->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      width="920px"
      v-dialogDrag
    >
      <components
        v-if="dialogData.visible"
        class="dialog"
        :status="false"
        :more="false"
        :params="{stateList:[2,4]}"
        :button="false"
        :column="false"
        @selection-change="selectionChange"
        :is="dialogData.component"
        :dialogData="dialogData"
      ></components>
      <div class="ac">
        <el-button
          size="small"
          @click="dialogData.visible = false"
        >取消</el-button>
        <el-button
          @click="confirm"
          size="small"
          type="primary"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'apportionInfo',
  props: {
    data: {
      default: () => { return {} }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      sumAmount: 0, //总金额
      //dialog弹出框
      dialogData: {
        visible: false,
        title: '',
        type: '',
        data: '',
      },
      options: {
        '0': { comp: 'salesOutLibrary', title: '销售出库单' },
        '1': { comp: 'orderStorage', title: '采购入库单' },
        '2': { comp: 'storageAllocation', title: '调拨单' },
        '3': { comp: 'orderBorrow', title: '借出借入单' },
        '4': { comp: 'orderExchange', title: '换货单' },
      },
      multipleSelection: [],
      goodsTableData: [],
    }
  },
  computed: {
    tableData() {
      this.goodsTableData.map(item => {
        // 全部商品含税总价
        let amoutPrice = this.goodsTableData.reduce((sum, cur) => {
          return sum + Number(cur.preTaxAmount || 0)
        }, 0)
        // 算出当前商品总价占比
        let currRate = (item.preTaxAmount || 0) / amoutPrice
        item.apportionmentAmount = (currRate * (this.data.costAmount || 0)).toFixed(2)
        return item
      })
      this.data.businessCommoditySaveVoList = this.goodsTableData
      this.data.businessCommoditySaveVoList.map(item => {
        item.busType = 6
      })
      return this.goodsTableData
    }
  },
  watch: {
    'data.busType': {
      handler(val) {
        this.goodsTableData = []
        if (val) {
          this.dialogData.title = this.options[val].title
          this.getCommodityList()
        }
      }
    }
  },
  methods: {
    busTypeChange(val) {
      this.dialogData.title = this.options[val].title
      this.data.busCode = ''
      this.data.businessCommoditySaveVoList = []
    },
    costAmountChange() {
      if (!this.data.costCode) {
        this.$message({
          message: '请先选择费用单',
          type: 'error',
          showClose: true,
        });
        return
      }
      if (this.data.costAmount > this.sumAmount) {
        this.$message({
          message: `本次分摊费用金额不能大于${this.sumAmount}`,
          type: 'error',
          showClose: true,
        });
        this.data.costAmount = this.sumAmount
      }
      this.data.unAmount = this.sumAmount - (this.data.costAmount || 0)
    },
    // 按钮功能操作
    eventHandle(type) {
      if (this.disabled) return
      let typeObj = {
        'financeFee': { comp: 'financeFee', title: `费用单` },
        ...this.options
      }
      this.dialogData.visible = true
      this.dialogData.type = type
      this.dialogData.title = typeObj[type].title
      this.dialogData.component = typeObj[type].comp
    },
    // 弹出框选择行数据
    selectionChange(val) {
      if (val.length > 1) {
        this.$message({
          message: '只能选择一条数据',
          type: 'error',
          showClose: true,
        });
      };
      this.multipleSelection = val
    },
    // 数据选择完成确认
    confirm() {
      if (this.multipleSelection.length > 1 || !this.multipleSelection.length) {
        this.$message({
          message: !this.multipleSelection.length ? '必须选择一条数据' : '只能选择一条数据',
          type: 'error',
          showClose: true,
        });
        return
      };
      let [rowData] = this.multipleSelection
      if (this.dialogData.type == 'financeFee') {
        this.data.costCode = rowData.costCode
        this.sumAmount = rowData.unAmount
        this.data.unAmount = rowData.unAmount
      } else {
        let codeObj = {
          '0': 'shipmentCode',
          '1': 'putinCode',
          '2': 'allocationOrderCode',
          '3': 'borrowLoanCode',
          '4': 'swapOrderCode',
        }
        this.data.busCode = rowData[codeObj[this.data.busType]]
        this.getCommodityList()
      }
      this.dialogData.visible = false
    },
    getCommodityList() {
      if (!this.data.busCode) return

      if (this.data.busType == 0) {  //销售出库单
        this.$api.seePsiSaleService.salesshipmentGetShipmentCommodity({ code: this.data.busCode })
          .then(res => {
            let commodityList = res.data || []
            commodityList.map(item => {
              // TODO销售价取折后价还是 参考价
              // item.salesPrice = item.discountSprice
              item.salesPrice = item.reference
            })
            this.goodsTableData = commodityList
          })
      }
      else if (this.data.busType == 1) { //采购入库单
        this.$api.seePsiPurchaseService.purchaseputinGetByCode(null, this.data.busCode)
          .then(res => {
            let commodityList = (res.data || {}).commodityList || []
            commodityList.map(item => {
              item.salesPrice = item.costAmount
            })
            this.goodsTableData = commodityList
          })
      }
      else if (this.data.busType == 2) { //调拨单
        this.goodsTableData = []
        // 换货单，借入借出单，调拨单，本期不拉取商品信息。 所以retrun
        return
        this.$api.seePsiWmsService.wmsallocationorderInfo(null, this.data.busCode)
          .then(res => {
            this.goodsTableData = (res.data || {}).allocationCommodityList
          })
      }
      else if (this.data.busType == 3) { //借出借入单
        this.goodsTableData = []
        return
        this.$api.seePsiWmsService.wmsborrowloanorderGetByCode(null, this.data.busCode)
          .then(res => {
            this.goodsTableData = (res.data || {}).commodityShowList
          })
      }
      else if (this.data.busType == 4) { //换货单
        this.goodsTableData = []
        return
        this.$api.seePsiWmsService.wmsswaporderGetByCode(null, this.data.busCode)
          .then(res => {
            let data = res.data || {}
            this.goodsTableData = [...data.putinCommodityList, ...putoutCommodityList]
          })
      }
    }
  },
  components: {
  },
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.dialog .main-content {
  height: calc(100vh - 159px);
}
.not-disabled-class .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  cursor: pointer;
}
</style>
