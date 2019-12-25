/*
 * @Author: 赵伦
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-12 17:59:21
 * @Description: 换退货商品扫码卡片 
*/
<template>
  <div
    class="reject-scan-goods"
    v-loading="loading"
  >
    <!-- 商品列表 -->
    <buying-goods-edit
      :customColumns="[
        { label: '退货商品数量', key: 'alterationNumber', width: 140, prop: 'alterationNumber', showOverflowTip: true, 
          format:(a,row)=>`${row.returenNumber||0}/${row.alterationNumber||0}`
        },
      ]"
      :data="data"
      :show="[
        'commodityCode','goodsName','wsm','categoryCode','className','specOne','configName','unit','!formTitle'
      ]"
      :showSummary="false"
      :sort="['alterationNumber']"
      disabled
    />
    <div class="mt10 mb20">
      <span class="b">扫SN码/机器号</span>
      <el-input
        @keypress.13.native="checkSN"
        class="ml10"
        size="mini"
        style="width:200px;"
        type="input"
        v-model="inputSN"
      ></el-input>
      <span class="fr">
        <span>本次成功扫码</span>
        <span class="b d-text-red">{{status.current||0}}</span>
        <span>件，历史扫码</span>
        <span class="b d-text-green">{{status.historyNum||0}}</span>
        <span>件，还需扫码</span>
        <span class="b d-text-blue">{{(status.allNum||0)-(status.historyNum||0)-(status.current||0)}}</span>
        <span>件</span>
      </span>
    </div>
    <div class="b">机器号/SN记录</div>
    <el-table
      :data="snList"
      :row-class-name="getRowClassName"
      size="mini"
      style="height:400px;"
    >
      <el-table-column min-width="60">
        <template slot-scope="{$index,row}">
          <span
            @click="remove(row)"
            class="el-icon-circle-close f18 d-pointer d-text-red"
            v-if="!row.id"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        label="编号"
        min-width="60"
        show-overflow-tooltip
      >
        <template slot-scope="{$index}">
          <span>{{$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        min-width="100"
        prop="state"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{row.id?'已退货':'待退货'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="SN码"
        min-width="100"
        prop="snCode"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="机器号"
        min-width="100"
        prop="robotCode"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="出库库房"
        min-width="100"
        prop="wmsName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="出库人"
        min-width="100"
        prop="operator"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="出库时间"
        min-width="100"
        prop="createTime"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{row.createTime|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品编号"
        min-width="100"
        prop="commodityCode"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="商品名称"
        min-width="100"
        prop="goodsName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="商品类别"
        min-width="80"
        prop="categoryCode"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品分类"
        min-width="100"
        prop="className"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="配置"
        min-width="100"
        prop="configName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="商品规格"
        min-width="140"
        prop="specOne"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <openingInventory
      :visible.sync="openVisible"
      :data='openingData'
      @update="checkSN"
      v-if='openVisible'
    />
  </div>
</template>
<script>
import openingInventory from '@/components/formComponents/opening-inventory'
export default {
  props: {
    // 数据
    data: {
      type: Object,
      default: () => ({})
    },
    // 隐藏
    hide: {
      type: Array,
      default: () => []
    }
  },
  components: {
    openingInventory
  },
  data() {
    return {
      inputSN: '',
      loading: false,
      status: {
        current: 0,
        allNum: 0,
        historyNum: 0
      },
      putawayCommodityList: [],
      hisScanList: [],
      openVisible: false,
      openingData: {},
    };
  },
  computed: {
    snList() {
      return [].concat(this.putawayCommodityList || [], this.hisScanList || []);
    }
  },
  mounted() {
    this.getScanStatus();
    this.getHistoryScan();
  },
  methods: {
    getRowClassName({ row }) {
      return row.id ? 'd-bg-gray' : '';
    },
    async getHistoryScan() {
      this.loading = true;
      try {
        let total = this.data.commodityList.reduce((num, item) => {
          num += Number(item.alterationNumber) || 0;
          return num;
        }, 0);
        let { data } = await this.$api.seePsiWmsService.wmsflowrecordList({
          page: 1,
          limit: 999,
          businessCode: this.data.businessCode
        });
        this.hisScanList = data;
      } catch (error) { }
      this.loading = false;
    },
    async getScanStatus() {
      // let {
      //   data
      // } = await this.$api.seePsiPurchaseService.purchasealterationStatWms(
      //   null,
      //   this.data.businessCode
      // );
      // this.status = data || {};
      this.data.commodityList.reduce((data, item) => {
        // ${row.returenNumber||0}/${row.alterationNumber||0}
        data.allNum += item.alterationNumber;
        data.historyNum += item.returenNumber;
        return data;
      }, this.status);
    },
    async checkSN(e) {
      if (e) {
        e.preventDefault();
      }
      this.data.putawayCommodityList = this.data.putawayCommodityList || [];
      this.putawayCommodityList = this.putawayCommodityList || [];
      this.loading = true;
      try {
        let {
          data
        } = await this.$api.seePsiWmsService.wmsinventorydetailShipmentCommodityCheck(
          {
            businessId: this.data.businessId,
            commodityList: [],
            snCode: this.inputSN
          }
        );
        if (data) {
          let [commodity] = this.data.commodityList.filter(
            item => item.commodityCode == data.commodityCode
          );
          if (
            commodity &&
            !this.data.putawayCommodityList.some(
              item =>
                (item.snCode && item.snCode == data.snCode) ||
                (item.robotCode && item.robotCode == data.robotCode)
            )
          ) {
            if (commodity.alterationNumber > commodity.returenNumber) {
              if (!this.data.putawayCommodityList) {
                this.$set(this.data, 'putawayCommodityList', []);
              }
              let putawayData = { ...commodity, ...data };
              delete putawayData.id;
              this.data.putawayCommodityList.push(putawayData);
              this.putawayCommodityList.push(putawayData);
              this.$forceUpdate();
              commodity.returenNumber = (commodity.returenNumber || 0) + 1;
              this.status.current = (this.status.current || 0) + 1;
            } else {
              this.$message({
                message: '该商品退货数量已到上限，不能退货',
                type: 'warning',
                showClose: true
              });
            }
          }
        } else {
          this.openVisible = true
          this.openingData = {
            snCode: this.inputSN
          }
        }

      } catch (error) { }
      // this.inputSN = '';
      this.loading = false;
    },
    onTableData(e) { },
    remove(row) {
      let i = this.data.putawayCommodityList.indexOf(row);
      this.data.putawayCommodityList.splice(i, 1);
      this.putawayCommodityList.splice(i, 1);
      this.status.current--;
      this.data.commodityList.find(
        item => item.commodityCode == row.commodityCode
      ).returenNumber--;
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss" scoped>
.reject-scan-goods {
  /deep/ .d-bg-gray {
    background-color: #f2f2f2 !important;
  }
}
</style>