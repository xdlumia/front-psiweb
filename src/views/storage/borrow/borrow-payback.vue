/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-11 15:08:55
 * @Description: 借入归还
*/
<template>
  <div v-loading="loading">
    <el-container>
      <el-main :style="{maxHeight:'calc(100vh - 180px)'}">
        <form-card
          class="borrow-goods-info"
          title="归还信息"
        >

          <el-form
            label-position='top'
            size='mini'
            ref="form"
            label-width="100px"
            :model="form"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  :rules="[ 
                    {required:form.logisticsFees ? true : false,message:'请选择服务商名称', trigger: 'change'}
                ]"
                  label="服务商名称"
                  maxlength="32"
                  size="mini"
                  prop="serviceProviderId"
                >
                  <el-select
                    @change='facilitatorNameChange'
                    v-model="form.serviceProviderId"
                    placeholder="请选择"
                    class="wfull"
                  >
                    <el-option
                      v-for="item in providerList"
                      :key="item.id"
                      :label="item.serviceName"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :rules="[ 
                    {required:form.logisticsFees ? true : false,message:'请选择服务类型', trigger: 'change'}
                ]"
                  label="服务类型"
                  maxlength="32"
                  size="mini"
                  prop="serveType"
                >
                  <el-select
                    v-model="form.serveType"
                    placeholder="请选择"
                    class="wfull"
                  >
                    <el-option
                      v-for="item in serviceTypeList"
                      :key="item.code"
                      :label="item.content"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="运单号"
                  prop="waybillCode"
                  :rules="[
            { required: form.logisticsFees ? true : false, message: '请输入运单号', trigger: 'blur' },
          ]"
                >
                  <el-input
                    v-model="form.waybillCode"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item
                  label="物流费用"
                  prop="logisticsFees"
                  :rules="[
              { required: false, message: '', trigger: 'blur' },
              { type:'price'},
            ]"
                >
                  <el-input
                    v-model="form.logisticsFees"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </form-card>
        <!-- 换入库商品 -->
        <form-card
          class="borrow-goods-info mt10"
          title="归还商品"
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
              prop="returnAccomplishNum"
            >
              <template slot-scope="scope">
                <span>{{scope.row.returnAccomplishNum}}/{{scope.row.returnNum}}</span>
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
              show-overflow-tooltip
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
              v-on:keyup.13.native="shipmentCommodityCheck"
              v-model="snCode"
              size="mini"
              style="width:200px;"
              class="ml10 mt5"
            ></el-input>
            <span class="fr d-text-black mr10 mt5">
              <span>本次成功扫码 </span>
              <span class="b d-text-red f16">{{codeNowNum || 0}}</span>
              <span> 件，历史扫码 </span>
              <span class="b d-text-green f16">{{codeHistoryNum}}</span>
              <span> 件，还需扫码 </span>
              <span class="b d-text-blue f16">{{codeAllNum - codeNowNum - (codeHistoryNum || 0)}}</span>
              <span> 件</span>
            </span>
          </div>
        </form-card>

        <!-- 机器号/SN码 -->
        <form-card title='机器号/SN码记录'>
          <!-- <div class="mt10 mb10">
            <span class="b mt5">机器号/扫SN码</span>
            <el-input
              v-on:keyup.13.native="shipmentCommodityCheck"
              v-model="snCode"
              size="mini"
              style="width:200px;"
              class="ml10 mt5"
            ></el-input>
          </div> -->
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
  </div>
  <!-- </el-dialog> -->
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
      loading: false,
      snCode: '',
      tableData: [],
      providerList: [],//服务商列表
      serviceTypeList: [],//服务类型
      form: {
        serviceProviderId: '',//服务商id
        serveType: '',//服务类型
        waybillCode: "",//运单号
        logisticsFees: '',//物流费用
      },
      codeNowNum: 0,//本次成功扫码
      codeHistoryNum: 0,//历史扫码
      codeAllNum: 0,//所有待扫码
    };
  },
  mounted() {
    this.commonserviceproviderList()
  },
  created() {
    this.getNum()
  },
  methods: {
    getNum() {
      if (this.data.commodityShowList.length > 0) {
        this.data.commodityShowList.forEach((item) => {
          this.codeHistoryNum = this.codeHistoryNum + item.returnAccomplishNum
          this.codeAllNum = this.codeAllNum + item.returnNum
        })
      }
    },
    close() {
      this.$emit('close')
    },
    //请求服务商列表
    commonserviceproviderList() {
      this.$api.seePsiCommonService.commonserviceproviderList({ page: 1, limit: 1000 })
        .then(res => {
          this.providerList = res.data
        })
        .finally(() => {

        })
    },
    //选择服务商切换的方法,请求服务商详情,拿出服务类型的code码
    facilitatorNameChange(val) {
      this.$api.seePsiCommonService.commonserviceproviderInfo(null, val)
        .then(res => {
          let serviceTypeArr = res.data.serviceType.split(',')
          this.serviceTypeList = this.dictionaryOptions('PSI_FWS_FWLX').filter((item) => {
            return serviceTypeArr.includes(item.code)
          })
        })
        .finally(() => {

        })
    },
    //回车 出库
    shipmentCommodityCheck() {
      this.$api.seePsiWmsService.wmsinventorydetailShipmentCommodityCheck({ snCode: this.snCode, businessId: this.data.id, commodityList: this.tableData })
        .then(res => {
          if (res.data) {
            this.data.commodityShowList.forEach((item, index) => {
              if (item.commodityCode == res.data.commodityCode) {
                if (this.data.commodityShowList[index].returnAccomplishNum < this.data.commodityShowList[index].returnNum) {
                  this.data.commodityShowList[index].returnAccomplishNum++
                  this.codeNowNum++
                  this.tableData.push(res.data)
                } else {
                  this.$message({
                    type: 'error',
                    message: '当前商品已经扫够啦!'
                  })
                }
              }
            })
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
          this.data.commodityShowList[index].returnAccomplishNum--
          this.codeNowNum--
        }
      })
    },
    //保存按钮
    submit() {
      let params = { businessCode: this.data.borrowLoanCode, businessId: this.data.id, putawayCommodityList: this.tableData }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.seePsiWmsService.wmsborrowloantaskBackCommodity(Object.assign(params, this.form))
            .then(res => {
              this.close()
              this.$emit('reload')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

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