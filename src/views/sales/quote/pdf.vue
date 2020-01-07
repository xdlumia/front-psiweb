<template>
  <el-dialog :visible.sync="showDetailPage" @close="close" class="print-pdf" title="报价单" v-dialogDrag width="1000px">
    <!-- 确定按钮 -->
    <div slot="title">
      <span>打印报价单</span>
      <div class="fr mr30">
        <span class="mr20">
          <el-checkbox v-model="showPrice">分项价格</el-checkbox>
        </span>
        <el-button @click="close" size="mini">取 消</el-button>
        <el-button @click="print" size="mini" type="primary">打印</el-button>
      </div>
    </div>
    <div style="min-height:400px;" v-loading="loading">
      <div ref="detail" style="width:100%;" v-if="isDataReady">
        <div class="d-bg-white print-pdf">
          <div class="header">
            <h1>报价单</h1>
            <div class="code">报价单编号: {{detail.quotationCode}}</div>
          </div>
          <div class="border-line wfull">
            <div class="p20">
              <div class="sub-title">客户名称：{{detail.client.clientName}}</div>
              <div class="border-line">
                <el-row class="large-lenh">
                  <el-col :span="12">联系人: {{detail.clientLinkman}}</el-col>
                  <el-col :span="12">电话: {{detail.clientPhone}}</el-col>
                  <el-col :span="12">地址: {{detail.clientReceivingAddress}}</el-col>
                </el-row>
              </div>
              <div class="border-line">
                <el-row class="large-lenh">
                  <el-col :span="12">销售方公司名称: {{detail.company.corporationName}}</el-col>
                  <el-col :span="12">销售代表: {{detail.creatorName}}</el-col>
                  <el-col :span="12">电话: {{detail.creator|userInfo('userAccount')}}</el-col>
                  <el-col :span="12">邮箱: {{detail.creator|userInfo('email')}}</el-col>
                </el-row>
              </div>
              <div class="sub-title mt20">产品汇总</div>
              <div class="wfull border-line-t">
                <el-table :data="detail.commodityEntityList" style="width:100%">
                  <el-table-column label="商品名称" min-width="200" prop="goodsName"></el-table-column>
                  <el-table-column label="单价" min-width="100" prop="preDiscountSprice" v-if="showPrice"></el-table-column>
                  <el-table-column :align="showPrice?'left':'right'" label="数量" min-width="80" prop="commodityNumber"></el-table-column>
                  <el-table-column align="right" label="总价" min-width="100" prop="taxTotalAmount" v-if="showPrice">
                    <template slot-scope="{row}">{{+Number(row.commodityNumber*row.preDiscountSprice).toFixed(2)}}</template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="ar border-line large-lenh">
                <span class="d-inline w200">税率：{{taxRate}}</span>
                <span class="d-inline w200">税金：{{taxMoney}}</span>
              </div>
              <div class="ar footer-total">
                <span class="d-inline w200 al">合计(含税)</span>
                <span>{{+Number(totalAmount).toFixed(2)}}</span>
              </div>
            </div>
          </div>
          <div class="p20" v-if="isHasProductConfig">
            <div class="sub-title">产品配置</div>
            <div
              :key="item.commodityCode"
              v-for="item of detail.commodityEntityList"
              v-show="item.children&&item.children.length?true:false"
            >
              <div class="border-line-t wfull">
                <el-table :data="[item]" :show-header="false" style="width:100%">
                  <el-table-column label="商品名称" min-width="200" prop="goodsName"></el-table-column>
                  <el-table-column label="单价" min-width="100" prop="preDiscountSprice" v-if="showPrice"></el-table-column>
                  <el-table-column :align="showPrice?'left':'right'" label="数量" min-width="80" prop="commodityNumber"></el-table-column>
                  <el-table-column align="right" label="总价" min-width="100" prop="taxTotalAmount" v-if="showPrice">
                    <template slot-scope="{row}">{{+Number(row.commodityNumber*row.preDiscountSprice).toFixed(2)}}</template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="border-line p10">
                <!-- 配置 -->
                <el-table :data="item.children" :show-header="false" class="no-border" style="width:100%">
                  <el-table-column label="商品名称" min-width="200" prop="goodsName"></el-table-column>
                  <el-table-column label min-width="100" prop v-if="showPrice"></el-table-column>
                  <el-table-column :align="showPrice?'left':'right'" label="数量" min-width="80" prop="commodityNum">
                    <template slot-scope="{row}">X{{row.commodityNum}}</template>
                  </el-table-column>
                  <el-table-column label min-width="100" prop v-if="showPrice"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import detail from './quoteDetails/detail';
import VisibleMixin from '@/utils/visibleMixin';
import Print from '@/utils/print';
import axios from 'axios';

export default {
  mixins: [VisibleMixin],
  components: {
    detail
  },
  props: {
    rowData: Object
  },
  data() {
    return {
      showPrice: true
    };
  },
  computed: {
    totalAmount() {
      if (!this.detail) return 0;
      else {
        return this.detail.commodityEntityList.reduce(
          (total, item) => total + (item.discountSprice * item.commodityNumber),
          0
        );
      }
    },
    isHasProductConfig() {
      if (!this.detail) return false;
      else {
        return this.detail.commodityEntityList.some(item =>
          item.children && item.children.length ? true : false
        );
      }
    },
    // prettier-ignore
    taxMoney(){
      if (!this.detail) return '';
      return +Number(this.detail.commodityEntityList.reduce((total, item) => {
        return total + +Number((item.preDiscountSprice*(this.detail.isTax?0:item.taxRate)/100)*item.commodityNumber) || 0;
      }, 0)).toFixed(2);
    },
    // prettier-ignore
    taxRate(){
      if (!this.detail) return '';
      let prodata = this.detail.commodityEntityList.reduce((data, item) => {
        data.total += (Number(item.discountSprice/(1+(+(this.detail.isTax?0:item.taxRate)/100))) || 0)*item.commodityNumber;
        data.taxTotal += (Number(item.discountSprice) || 0)*item.commodityNumber
        return data;
      }, {
        total:0,
        taxTotal:0,
      });
      return +(Number(prodata.taxTotal/prodata.total-1)*100).toFixed(0) + '%'
    },
  },
  methods: {
    async getDetail() {
      if (this.rowData) {
        let data = JSON.parse(JSON.stringify(this.rowData));
        data.commodityEntityList.map(item => {
          item.preDiscountSprice = +Number(
            item.discountSprice / (1 + (data.isTax?0:item.taxRate) / 100)
          ).toFixed(2);
          (item.children || []).map(
            item => (item.commodityNum = item.commodityNumber)
          );
        });
        let {
          data: client
        } = await this.$api.seePsiCommonService.commonclientinfoInfo(
          null,
          data.clientId
        );
        let {
          data: company
        } = await this.$api.seeBaseinfoService.commoncorporationInfo(
          null,
          data.companyAccountId
        );
        let configIds = data.commodityEntityList
          .map(item => item.configId)
          .filter(a => a);
        if (configIds.length) {
          let {
            data: configs
          } = await this.$api.seePsiCommonService.commonquotationconfigInfoGood(
            {
              ids: configIds,
              page: 1,
              limit: 999
            }
          );
          let configObj = configs.reduce((data, item) => {
            data[item.commodityCode] = item;
            return data;
          }, {});
          data.commodityEntityList.map(item => {
            let config = configObj[item.commodityCode];
            if (config) {
              item.children = config.commonGoodConfigDetailsEntityList;
            }
          });
        }
        return { ...data, client, company };
      }
    },
    print() {
      Print(this.$refs.detail, {
        windowWidth: 960,
        title: `报价单${this.detail.quotationCode}.pdf`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$color: #00c1e6;
.print-pdf {
  .header {
    border-left: 20px solid $color;
    padding-left: 20px;
    border-bottom: 1px solid $color;
    height: 60px;
    position: relative;
    padding-top: 40px;
    h1 {
      color: black;
      font-weight: bold;
    }
    .code {
      position: absolute;
      right: 20px;
      bottom: 10px;
    }
  }
  .footer-total {
    color: $color;
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;
  }
  /deep/ {
    .el-table__footer-wrapper tbody td,
    .el-table__header-wrapper tbody td {
      background-color: #fff;
    }
    .el-table__footer-wrapper {
      margin-top: 0px;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: 1px solid #00c1e6;
    }
    .no-border.el-table {
      td,
      th.is-leaf {
        border-bottom: 0px solid #00c1e6;
      }
      td {
        padding: 2px 0;
      }
    }
  }
  .border-line {
    border-bottom: 1px solid $color;
  }
  .border-line-v {
    border-top: 1px solid $color;
    border-bottom: 1px solid $color;
  }
  .border-line-t {
    border-top: 1px solid $color;
  }
  .sub-title {
    font-weight: bold;
    color: $color;
    font-size: 18px;
    line-height: 40px;
  }
  .large-lenh {
    line-height: 40px;
  }
}
</style>
<style lang="scss">
</style>
