/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 10:22:05
 * @Description: file content
*/
<template>
  <el-dialog
    :visible.sync="showDetailPage"
    width="1120px"
    @close="close"
    v-dialogDrag
  >
    <!-- 确定按钮 -->
    <div slot="title">
      <span>{{type=='add'?'新建报价单':type=='copy'?`复制:${codeSlice(code)}`:`编辑:${codeSlice(code)}`}}</span>
      <div class="fr mr30">
        <el-button
          size="mini"
          type="primary"
          v-show="steps==3&&!strictConfirmConfig"
          @click="strictConfirmConfig=true"
        >切换为严格匹配</el-button>
        <el-button
          size="mini"
          type="primary"
          v-show="steps==3&&strictConfirmConfig"
          @click="strictConfirmConfig=false"
        >切换为范围选择</el-button>
        <el-button
          @click="$emit('update:visible', false)"
          size="mini"
        >取 消</el-button>
        <el-button
          @click="changeStep"
          type="primary"
          v-if="steps < 4"
          size="mini"
        >下一步</el-button>
        <el-button
          v-else
          type="primary"
          @click="saveHandle('form')"
          size="mini"
        >保 存</el-button>
      </div>
    </div>
    <div v-loading="loading">
      <d-step
        v-model="steps"
        :data="['选择客户','选择产品','确定配置信息','填写报价信息']"
      ></d-step>
      <el-form
        v-if="visible"
        ref="form"
        size="small"
        :model="form"
        label-position="top"
        class="d-auto-y"
        style="height:calc(100vh - 140px)"
      >
        <!--  选择客户 和 填写报价信息  有相同的操作.两边数据要实时更新 所以使用 v-if 切换到当前的页面重新查询数据 -->
        <!-- 选择客户  -->
        <select-customer
          :data="form"
          v-show="steps==1"
        />

        <!-- 选择产品 -->
        <select-product
          :data="form"
          v-show="steps==2"
        />

        <!-- 确定配置信息 -->
        <confirm-info
          ref="confirmInfo"
          :data="form"
          :strictConfirmConfig="strictConfirmConfig"
          v-show="steps==3"
        />

        <!-- 填写报价信息 -->
        <quote-info
          :data="form"
          v-show="steps==4"
        />
      </el-form>

    </div>
  </el-dialog>
</template>
<script>
import selectCustomer from './add/select-customer'
import selectProduct from './add/select-product'
import confirmInfo from './add/confirm-info'
import quoteInfo from './add/quote-info'
import VisibleMixin from '@/utils/visibleMixin';
import { log } from 'util'
export default {
  mixins: [VisibleMixin],
  components: {
    selectCustomer,
    selectProduct,
    confirmInfo,
    quoteInfo,
  },
  data() {
    return {
      strictConfirmConfig: false,
      loading: false,
      currCompont: 'clientInfo',
      // 当前操作步骤
      steps: 1,
      // 新增orEdit框内容
      form: {
        KIND1Data: [], //临时存放第二步整机列表选中的数据
        KIND2Data: [], //临时存放第二步配件列表选中的数据
        KIND1List: [], //临时存放第三步整机列表选中的数据 数组存放
        KIND2List: {},//临时存放第三步配件列表选中的数据 对象存放
        id: '',
        apprpvalState: '', //审核状态
        attachList: [], //附件,
        companyAccountId: '', //公司发票信息
        registerPhone: '',
        companySettlementId: '', //公司结算账户
        commodityEntityList: [],
        businessCommoditySaveVoList: [ //商品信息合集
          // {
          //   alterationNumber: '', //退换商品数量(出入数量),
          //   alterationPrice: '', //实际退/换单价,
          //   apportionmentAmount: '', //分摊后金额,
          //   commodityCode: '', //商品编号,
          //   commodityNumber: '', //商品数量,
          //   costAmount: '', //采购/销售成本金额,
          //   discount: '', //折扣,
          //   discountSprice: '', //折后单价,
          //   isAssembly: '', //是否组装,
          //   isDirect: '', //是否直发,
          //   isTeardown: '', //是否拆卸,
          //   note: '',
          //   parentCommodityCode: '', //父商品code,
          //   pickingNumber: '', //拣货数量,
          //   preTaxAmount: '', //含税总价,
          //   putawayType: '0', // 库存类型(出库/入库) 0= 出库,
          //   reference: '', //销售参考价,
          //   salesPrice: '', //销售单价,
          //   shipmentsNumber: '', //发货数量,
          //   taxPrice: '', //税后退货单价2,
          //   taxTotalAmount: '', //税后退货总价
          // }
        ],
        clientId: '', //客户id
        clientLinkman: '', //客户联系人,
        clientPhone: '', //客户联系电话,
        clientReceivingAddress: '', //客户收货地址,=
        deptTotalCode: '', //部门code,
        failureTime: '', // 报价单有效期,
        fieldList: [], //自定义字段,
        note: '', //备注,
        preTaxAmount: '', //含税总价.12,
        procurementExpectedArrivalTime: '', //采购预计到货时间
        quotationCode: '', //报价单编号,
        salesExpectedShipmentsTime: '', //销售预计发货时间,
        salesRequireArrivalTime: '', //销售要求到货时间,
        shipmentCode: '', //出库单编号,
        source: '', //来源,
        state: '', //9,
        taxAmount: '', //税后金额,
        taxRate: '', //税率
        totalNumber: '', //总计数量,
        totalSalesAmount: '', //总计销售价
        totalCostAmount: '',//  销售参考价总计
        facilitator: '',
        serveType: '',
        bmcName: '',
        isTax: 0// 是否含税 0含税 1未税
      }
    }
  },
  created() {

  },
  mounted() {
    // this.initForm()
  },
  computed: {
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.type == 'add') {
          this.steps = 1
          for (let key in this.form) {
            if (this.form[key] instanceof Array) {
              this.form[key] = []
            } else {
              this.form[key] = ""
            }
          }
          this.form.isTax = 0
          this.getFailureTimeConfig()
        } else {
          this.steps = 4
        }
      }
    },
    //  等detail加载完成 并且给form 对象赋值完成之后再加载商品数据
    'form.id': {
      handler(val) {
        if (val && (this.type == 'edit' || this.type == 'copy') && this.form.id) {
          // this.form.businessCommoditySaveVoList = this.$$util.formatCommodity(data, 'commonGoodConfigDetailsEntityList')
          this.form.businessCommoditySaveVoList = this.form.commodityEntityList

        }
      }
    },
    async steps(index) {
      if (this.type != 'add' && index != 4) {
        this.$message.error({
          showClose: true,
          message: '编辑和复制的时候只能操作当前步骤'
        })
        this.steps = 4
        return
      }
      if (index === 3) {
        // 确定配置信息的时候查询整机
        this.$refs.confirmInfo.commonquotationconfigdetailsListConfigByGoodName()
      }
      else if (index === 4 && this.type == 'add') {
        // 不挑选此配置整机数据
        let wholeListNotChoose = []
        // 整机数据
        let wholeList = []
        this.form.KIND1List.forEach(item => {
          if (item.disabled) {
            wholeListNotChoose = wholeListNotChoose.concat(item.children)
          } else {
            wholeList = wholeList.concat(item)
          }
        })
        wholeListNotChoose = this.$$util.jsonFlatten(wholeListNotChoose)
        let wholeListData = []
        let quotationIds = this.strictConfirmConfig ? this.form.KIND1List.map(item => this.$refs.confirmInfo.findSelectedConfig(item)).filter(a => a) : []
        // 有quotationIds 值的时候再查询
        if (quotationIds.length) {
          let params = {
            ids: quotationIds,
            page: 1,
            limit: 999
          }
          let { data } = await this.$api.seePsiCommonService.commonquotationconfigInfoGood(params)
          wholeListData = data || []
          wholeListData = wholeListData.map(item => {
            (item.commonGoodConfigDetailsEntityList || []).forEach(sub => {
              sub.parentCommodityCode = item.commodityCode
              sub.commodityNumber = sub.commodityNum
            })
            item.categoryCode = 'PSI_SP_KIND-1'
            item.id = 'customId' + item.id
            item.inventoryNumber = item.usableInventoryNum
            item.reference = item.saleReferencePrice
            return item
          })
        }
        if (!this.strictConfirmConfig) {
          wholeListData = JSON.parse(JSON.stringify(wholeList)).map(item => {
            item.commonGoodConfigDetailsEntityList = this.$refs.confirmInfo.flatten(item.children).filter(item => item.selected)
            item.commonGoodConfigDetailsEntityList.map(sub => {
              sub.parentCommodityCode = item.goodsCode
              sub.isMachine = 1
              sub.reference = sub.saleReferencePrice
              sub.costAmount = sub.inventoryPrice
            })
            item.customConfig = true

            this.$api.seeGoodsService.getGoodsByNameForJXC({
              categoryCode: 'PSI_SP_KIND-1',
              goodsCode: item.goodsCode
            }).then(({ data: [good] }) => {
              Object.keys(good).map(key => {
                this.$set(item, key, good[key])
              })
              this.$set(item, 'reference', item.totalAmount)
              this.$set(item, 'discountSprice', +Number(item.reference * (1 + (item.taxRate || 0) / 100)).toFixed(2))
            })

            item.goodsName = item.configGoodName
            item.commodityCode = item.goodsCode
            item.categoryCode = 'PSI_SP_KIND-1'
            item.id = 'customId' + item.id
            item.inventoryNumber = item.usableInventoryNum
            item.reference = item.totalAmount
            item.costAmount = item.inventoryPrice
            item.isMachine = 1
            return item;
          })
        }
        // 配件列表
        let fixingsList = []
        for (let key in this.form.KIND2List) {
          // 扁平化数据
          // const flattenData = this.$$util.jsonFlatten(this.form.KIND2List[key])
          fixingsList = JSON.parse(JSON.stringify(Object.values(this.form.KIND2List).reduce((data, item) => {
            return data.concat(item || [])
          }, [])))
          fixingsList = fixingsList.map(item => {
            item.commodityCode = item.goodsCode
            item.goodsName = item.name;
            item.className = item.secondClassName
            item.inventoryNumber = item.usableInventoryNum
            item.reference = item.saleReferencePrice
            return item
          })
        }

        // let
        // 第4步整合商品信息
        this.form.businessCommoditySaveVoList = [...wholeListData, ...wholeListNotChoose, ...fixingsList].map(item => {
          item.discountSprice = +Number(item.reference * (1 + (item.taxRate || 0) / 100)).toFixed(2)
          item.discount = 1
          item.commodityNumber = 1;
          return item
        })
      }
    },
  },
  methods: {
    async getFailureTimeConfig() {
      let { data } = await this.$api.seePsiCommonService.commonsystemconfigInfo(null, 1)
      let { quotationTime } = JSON.parse(data.configJson)
      let time = +new Date() + quotationTime * 24 * 60 * 60 * 1000
      this.$set(this.form, 'failureTime', time)
    },
    changeStep() {
      if (this.steps == 3) {
        if (this.form.KIND1List.filter(a => !a.disabled).some(item => {
          return !this.$refs.confirmInfo.findSelectedConfig(item)
        })) {
          return this.$message({
            message: '请选择整机配置',
            showClose: true,
            type: 'warning'
          })
        } else {
          this.steps++
        }
      } else if (this.steps == 2) {
        if (this.form.KIND1Data.length + this.form.KIND2Data.length > 0) {
          this.steps++
        } else {
          return this.$message({
            message: '请选择产品',
            showClose: true,
            type: 'warning'
          })
        }
      } else {
        this.steps++
      }
    },
    async getDetail() {
      if (this.code) {
        this.form.id = ''
        let { data } = await this.$api.seePsiSaleService.salesquotationGetinfoByCode({ quotationCode: this.code });
        data.commodityEntityList.map(item => {
          item.isMachine && (item.customConfig = true);
          item.commonGoodConfigDetailsEntityList = item.partsInfoCommodityList
        })
        data.isTax = data.isTax || 0
        return data;
      }
    },
    // 保存表单数据
    async saveHandle() {
      await this.$showFormError(this.$refs.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = Object.assign(this.form, this.params)
          let copyParams = JSON.parse(JSON.stringify(params))
          copyParams.isTax = copyParams.isTax || 0

          delete copyParams.KIND1Data
          delete copyParams.KIND2Data

          copyParams.businessCommoditySaveVoList.forEach(item => {
            (item.commonGoodConfigDetailsEntityList || []).forEach(sub => {
              sub.parentCommodityCode = item.commodityCode
              sub.putawayType = 0 //0=出库
            })
            item.putawayType = 0 //0=出库
            // 税后总价
            item.preTaxAmount = Number((item.reference || 0) * (1 + (copyParams.isTax ? 0 : item.taxRate) / 100) * (item.commodityNumber || 0)).toFixed(2)
            // 销售单价
            item.salesPrice = Number((item.reference || 0) * (1 + (copyParams.isTax ? 0 : item.taxRate) / 100)).toFixed(2)
            item.costAmount = item.inventoryPrice
          })
          // 验证商品信息
          if (copyParams.businessCommoditySaveVoList.every(item => !item.commodityNumber)) {
            this.$message({
              message: '商品信息的商品数量不能为空',
              type: 'error',
              showClose: true,
            });
            return
          }
          let children = []
          copyParams.businessCommoditySaveVoList = copyParams.businessCommoditySaveVoList.map(item => {
            if (item.customConfig) {
              children = children.concat(item.commonGoodConfigDetailsEntityList)
              item.costAmount = item.inventoryPrice;
              item.inventoryPrice = item.reference;
              item.saleReferencePrice = item.reference;
              (item.commonGoodConfigDetailsEntityList || []).map(item => {
                item.costAmount = item.inventoryPrice
              })
            }
            item.isMachine = item.isMachine || 0
            delete item.commonGoodConfigDetailsEntityList
            return item;
          })
          copyParams.businessCommoditySaveVoList = copyParams.businessCommoditySaveVoList.concat(children)
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salesquotationSave' // 默认编辑更新
          // 新增保存
          if (this.isEdit) {
            api = 'salesquotationUpdate'
            // 编辑保存
          } else {
            copyParams.shipmentCode = ''
          }
          this.$api.seePsiSaleService[api](copyParams)
            .then(res => {
              this.$emit('update:visible', false)
              // 刷新列表
              this.$emit('reload')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
