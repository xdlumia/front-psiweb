/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 调入商品
*/
<template>
  <div>
    <div
      :style="{maxHeight:'calc(100vh - 180px)'}"
      class="borrow-goods-info mt10 d-auto-y"
    >
      <form-card
        v-for="(item,index) of dialogData.allocationCommodityList"
        :key="index"
        class="borrow-goods-info mt10"
        title="机器号/SN"
      >
        <el-table
          :data='[item]'
          border
          max-height="400"
          size="mini"
        >
          <el-table-column
            label="调入数量"
            min-width="100"
            prop="total"
          >
            <template slot-scope="scope">
              <span>{{Number(scope.row.accomplishNum)}}/{{item.total}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="commodityCode"
            label="商品编号"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="">
              <span class="d-text-blue">{{item.commodityCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品类别"
            min-width="110"
          >
            <template slot-scope="">
              <span>{{item.categoryCode|dictionary('PSI_SP_KIND')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品分类"
            min-width="110"
          >
            <template slot-scope="">
              <span>{{item.className}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            min-width="110"
          >
            <template slot-scope="">
              <span>{{item.goodsName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品规格"
            min-width="110"
          >
            <template slot-scope="">
              <span>{{item.configName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            min-width="80"
          >
            <template slot-scope="">
              <span>{{item.unit|dictionary('SC_JLDW')}}</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="mt10 mb10">
          <span class="b mt5">扫SN码</span>
          <el-input
            v-model="item.snCode"
            v-on:keyup.13.native="shipmentCommodityCheck(item,index)"
            size="mini"
            style="width:200px;"
            class="ml10 mt5"
          ></el-input>
          <!-- <span class="fr d-text-black mr10 mt5">
            <span>本次成功扫码</span>
            <span class="b d-text-red f16"> {{downTableData.length}} </span>
            <span>件，历史扫码</span>
            <span class="b d-text-green f16"> 5 </span>
            <span>件，还需扫码</span>
            <span class="b d-text-blue f16"> 127 </span>
            <span>件</span>
          </span> -->
        </div>
      </form-card>

      <el-table
        border
        size='mini'
        :data='downTableData'
        ref="companyTable"
        class="college-main mt20"
        style="calc(100vh - 340px)"
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
          label="调入库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operator"
          min-width="100"
          label="收货人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="收货时间"
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
    </div>
    <div class="wfull d-center mt10">
      <span>
        <el-button
          @click="close"
          size="small"
        >关 闭</el-button>
        <el-button
          type="primary"
          @click="wmsallocationorderBatchSsave"
          size="small"
        >保 存</el-button>
      </span>
    </div>
    <commodityChoose :visible.sync='chooseVisible' />
  </div>
</template>
<script>
import commodityChoose from '@/components/formComponents/commodity-choose'

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
      chooseVisible: false,
      downTableData: [],
      formInline: {
        user: ''
      },
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    },
    //扫SN码
    shipmentCommodityCheck(item, index) {
      let params = {
        businessId: this.dialogData.id,
        putawayCommodityList: this.downTableData || [],
        snCode: item.snCode,
        categoryCode: item.categoryCode,
        commodityCode: item.commodityCode,
        wmsId: this.dialogData.putawayWmsId
      }
      this.$api.seePsiWmsService.wmsallocationorderPutawayCommodityCheck(params)
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
          }
          item.snCode = ''
        })
        .finally(() => {

        })
    },
    //每次扫码,对应上边的
    doSth(data) {
      this.dialogData.allocationCommodityList.forEach((item) => {
        // item.accomplishNum = 0
        if (item.commodityCode == data.commodityCode) {
          // if (Number(item.accomplishNum) < Number(item.total)) {//数量还不够的时候可以继续扫
          item.accomplishNum++
          this.downTableData.push(data)
          // } else {
          //   this.$message({
          //     type: 'info',
          //     message: '扫过喽'
          //   })
          // }
        }
      })
    },
    //删除一条
    deleteSth(scope) {
      this.downTableData.splice(scope.$index, 1)
      this.dialogData.allocationCommodityList.forEach((item) => {
        if (item.commodityCode == scope.row.commodityCode) {
          item.accomplishNum--
        }
      })
    },
    //调入扫码保存
    wmsallocationorderBatchSsave() {
      if (this.downTableData.length > 0) {
        this.$api.seePsiWmsService.wmsallocationorderBatchSsave({ putawayCommodityList: this.downTableData, businessCode: this.dialogData.allocationOrderCode, businessId: this.dialogData.id, })
          .then(res => {
            this.close()
            this.$reload()
          })
          .finally(() => {
          })
      } else {
        this.$message({
          type: 'info',
          message: '请至少扫一个商品'
        })
      }
    }
  },
  components: {
    commodityChoose
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>