/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-10 17:30:53
 * @Description: 生成合同
*/
<template>
  <div>
    <el-dialog
      :visible.sync="showEditPage"
      width="920px"
      @close="close"
      v-dialogDrag
    >
      <!-- 确定按钮 -->
      <div slot="title">
        <span>{{type=='addContract'?'生成合同':'追加合同模板'}}</span>
        <div class="fr mr30">
          <el-select
            size="mini"
            v-model="form.templateId"
          >
            <el-option
              v-for="item in templateOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button
            @click="previewContract"
            size="mini"
          >预览</el-button>
          <el-button
            type="primary"
            @click="saveHandle('form')"
            size="mini"
          >保存</el-button>
          <el-button
            @click="$emit('update:visible', false)"
            size="mini"
          >取消</el-button>
        </div>
      </div>
      <div
        v-loading="loading"
        class="d-auto-y"
        style="height:calc(100vh - 110px)"
      >

        <d-tabs :style="{maxHeight:'calc(100vh - 130px)'}">
          <d-tab-pane
            v-for="(val,key) of tabs"
            :key="key"
            :label="val"
            :name="key"
          />
          <el-form
            v-if="visible"
            size="small"
            label-position="top"
          >
            <!-- 客户信息 -->
            <customerInfo
              disabled
              id="customerInfo"
              :data="detail"
              @res="getCustomerInfo"
            />
            <!-- 公司信息 -->
            <companyInfo
              @res="getCompanyInfo"
              disabled
              id="companyInfo"
              :data="detail"
            />
            <!-- 报价单信息 -->
            <quote-info :options="rowData.quotationCodes || []" />
            <!-- 账期信息 -->
            <billInfo
              disabled
              id="billInfo"
              :data="detail"
            />
          </el-form>
          <el-form
            v-if="visible"
            ref="form"
            size="small"
            :model="form"
            label-position="top"
          >
            <!-- 自定义信息 -->
            <customInfo
              id="customInfo"
              busType="25"
              :data="form"
            />
            <!-- 备注信息 -->
            <extrasInfo
              id="extrasInfo"
              :data="form"
            />
          </el-form>
        </d-tabs>
      </div>
    </el-dialog>
    <contractPreview
      :visible.sync="previewVisible"
      :templateData="templateData"
    ></contractPreview>
  </div>
</template>
<script>
// 填写报价信息
import quoteInfo from './quote-info';
import VisibleMixin from '@/utils/visibleMixin';
import contractPreview from '@/views/asistant/templateManage/contract-preview.vue';
export default {
  mixins: [VisibleMixin],
  components: {
    quoteInfo,
    contractPreview
  },
  data() {
    return {
      loading: false,
      // tab操作栏
      tabs: {
        customerInfo: '客户信息',
        companyInfo: '公司信息',
        quoteInfo: '报价单信息',
        billInfo: '账期信息',
        customInfo: '自定义信息',
        extrasInfo: '备注信息'
      },
      // 新增orEdit框内容
      form: {
        attachList: [], // 示例：附件,
        fieldList: [], // 示例：自定义字段,
        shipmentCode: this.rowData.shipmentCode, // 销售出库单编号,
        templateId: '', // 100000,
        templateName: '', // 100000
        id: '',
        note: '',
      },
      // 模板信息
      templateData: {},
      previewVisible: false,
      templateOptions: [], // 合同模板
      previewParams: {
        attachList: [
          // {
          //   fileName: '', // "身份证明",
          //   fileUrl: '', // "http://"
          // }
        ],
        clientInfo: {
          accountBank: '', // "示例：开户银行",
          address: '', // "示例：地址",
          attachs: '', // "string",
          bankAccount: '', // "示例：银行账号",
          clientName: '', // "示例：客户姓名",
          code: '', // "示例：编号",
          companyCode: '', // "示例：公司编码code",
          companyName: '', // "示例：公司名称",
          createTime: '', // 1572342343467,
          creator: '', // 100000,
          deptTotalCode: '', // "示例：部门code",
          grade: '', // "示例：客户级别",
          id: '', // 100000,
          invoiceAddres: '', // "示例：开票地址",
          invoiceTitle: '', // "示例：发票抬头",
          isDelete: '', // 9,
          linkManName: '', // "示例：联系人",
          modifier: '', // 100000,
          modifyTime: '', // 1572342343467,
          phone: '', // "示例：客户手机号",
          registerAddres: '', // "示例：注册地址",
          registerPhone: '', // "示例：注册电话",
          registrationNo: '', // "示例：注册号",
          remark: '', // "示例：备注",
          source: '', // "示例：客户来源",
          state: '', // 9,
          taxpayersNum: '', // "示例：纳税人识别号",
          trade: '', // "示例：行业"
        },
        clientName: '', // "示例：客户名称",
        companyCode: '', // "示例：公司编码code",
        contractCode: '', // "示例：合同编号",
        corporation: {
          account: '', // "示例：银行账号",
          accountBank: '', // "示例：开户银行",
          address: '', // "示例：地址",
          companyCode: '', // "示例：公司编码code",
          corporationName: '', // "示例：公司名称",
          createTime: '', // 1572342343394,
          creator: '', // 100000,
          deptTotalCode: '', // "示例：部门code",
          id: '', // 100000,
          invoice＿sum: '', // 9876543210987654,
          isDelete: '', // 9,
          jinvoiceTaxRate: '', // "示例：发票税率",
          minLimitNum: '', // 9,
          minLimitState: '', // 9,
          modifier: '', // 100000,
          modifyTime: '', // 1572342343394,
          phone: '', // "示例：电话",
          remark: '', // "示例：备注",
          state: '', // 9,
          taxpayersNum: '', // "示例：纳税人识别号"
        },
        corporationAccount: {
          account: '', // "示例：开户账号",
          accountBank: '', // "示例：开户银行",
          accountName: '', // "支付寶賬號",
          accountType: '', // "示例：账户类型",
          companyCode: '', // "示例：公司编码code",
          corporationId: '', // 100000,
          createTime: '', // 1572342343339,
          creator: '', // 100000,
          deptTotalCode: '', // "示例：部门code",
          id: '', // 100000,
          isDelete: '', // 9,
          linkManName: '', // "示例：联系人",
          modifier: '', // 100000,
          modifyTime: '', // 1572342343339,
          phone: '', // "示例：客户手机号",
          qrCode: '', // "示例：收款二维码",
          remark: '', // "示例：备注",
          state: '', // 1
        },
        createTime: '', // 1572346561975,
        creator: '', // 100000,
        creatorName: '', // "创建人名称",
        deptName: '', // "部门名称",
        deptTotalCode: '', // "示例：部门code",
        fieldList: [
          {
            fieldCode: '', // "fieldVal",
            fieldVal: '', // "张三"
          }
        ],
        financeList: [
          {
            busCode: '', // "示例：业务编号",
            busId: '', // 9,
            feeType: '', // "示例：费用类型",
            id: '', // 100000,
            isBillFee: '', // 0,
            payAmount: '', // 98765432109876.12,
            payTime: '', // 1572403069534,
            paymenDays: '', // "示例：账期",
            paymentType: '', // 9
          }
        ],
        leaderName: '', // "负责人名称",
        modifier: '', // 100000,
        modifierName: '', // "修改人名称",
        modifyTime: '', // 1572346561975,
        note: '', // "示例：备注信息",
        quotationList: [
          {
            apprpvalState: '', // 9,
            attachs: '', // "示例：附件",
            clientId: '', // 100000,
            clientLinkman: '', // "示例：客户联系人",
            clientName: '', // "阿里巴巴",
            clientPhone: '', // "示例：客户联系电话",
            clientReceivingAddress: '', // "示例：客户收货地址",
            commodityEntityList: [
              {
                alterationNumber: '', // 9,
                alterationPrice: '', // 98765432109876.12,
                apportionmentAmount: '', // 98765432109876.12,
                busCode: '', // "示例：业务编号",
                busType: '', // 9,
                categoryCode: '', // "类别编码",
                className: '', // "分类名称",
                commodityCode: '', // "示例：商品编号",
                commodityNumber: '', // 9,
                configName: '', // "配置名称",
                costAmount: '', // 98765432109876.12,
                discount: '', // 98765432109876.12,
                discountSprice: '', // 98765432109876.12,
                goodsName: '', // "商品名称",
                goodsPic: '', // "图片",
                id: '', // 100000,
                inventoryNumber: '', // "库存数量",
                isAssembly: '', // 9,
                isDirect: '', // 9,
                isTeardown: '', // 9,
                note: '', // "示例：备注",
                parentCommodityCode: '', // "100000",
                pickingNumber: '', // 9,
                preTaxAmount: '', // 98765432109876.12,
                putawayType: '', // 9,
                recentDiscountSprice: '', // "最近销售价",
                reference: '', // 98765432109876.12,
                salesPrice: '', // 98765432109876.12,
                shipmentsNumber: '', // 9,
                snCode: '', // "示例：SN码",
                specOne: '', // "规格",
                taxPrice: '', // 98765432109876.12,
                taxRate: '', // "商品税率",
                taxTotalAmount: '', // 98765432109876.12,
                unit: '', // "单位",
                waitPurchaseNumber: '', // 0
              }
            ],
            companyAccountId: '', // 100000,
            companyCode: '', // "示例：公司编码code",
            companySettlementId: '', // 100000,
            createTime: '', // 1572403069402,
            creator: '', // 100000,
            deptTotalCode: '', // "示例：部门code",
            failureTime: '', // 1572403069401,
            fields: '', // "示例：自定义字段",
            id: '', // 100000,
            isDelete: '', // 9,
            modifier: '', // 100000,
            modifyTime: '', // 1572403069402,
            note: '', // "示例：备注",
            preTaxAmount: '', // 98765432109876.12,
            procurementExpectedArrivalTime: '', // 1572403069401,
            quotationCode: '', // "示例：报价单编号",
            salesExpectedShipmentsTime: '', // 1572403069401,
            salesRequireArrivalTime: '', // 1572403069401,
            shipmentCode: '', // "示例：出库单编号",
            source: '', // "示例：来源",
            state: '', // 9,
            taxAmount: '', // 98765432109876.12,
            taxRate: '', // 98765432109876.12,
            totalNumber: '', // 9,
            totalSalesAmount: '', // 98765432109876.12
          }
        ],
        salesTime: '', // 1572346561946,
        shipmentCode: '', // "示例：销售出库单编号",
        source: '', // "示例：来源",
        templateId: '', // 100000,
        totalAmount: '', // 98765432109876.12,
        totalNum: '', // 9
      }
    }
  },
  created() {
    // this.init()
  },
  mounted() {
    // 获取合同模板
    this.getTemplateList(1)

  },
  watch: {
    visible(val) {
      if (val && this.type == 'editContract') {
        this.getByShipmentCode()
      }
    }
  },
  computed: {

  },
  methods: {
    // 获取客户信息
    getCustomerInfo(data) {
      this.previewParams.clientInfo = data
    },
    // 获取公司信息
    getCompanyInfo(data) {
      console.log(data);

      this.previewParams.corporation = data
    },
    getByShipmentCode() {
      this.$api.seePsiContractService.contractsalesGetByShipmentCode(null, this.code)
        .then(res => {
          let data = res.data || {}
          for (let key in this.form) {
            if (this.form[key] instanceof Array) {
              this.form[key] = data[key] || []
            } else {
              this.form[key] = data[key] || ''
            }
          }
        })
    },

    // 获取合同模板
    getTemplateList(params) {
      this.$api.seeBaseinfoService.templateList(null, params).then(res => {
        if (res.code == 200) {
          this.templateOptions = res.data || [];
        }
      });
    },
    // 获取详情
    async getDetail() {
      if (this.code) {
        const { data } = await this.$api.seePsiSaleService.salesshipmentGetInfoByCode({ shipmentCode: this.code })
        // 给previewParams 参数遍历数据
        for (let key in this.previewParams) {
          if (this.previewParams[key] instanceof Array) {
            this.previewParams[key] = data[key] || []
          } else if (this.previewParams[key] instanceof Object) {
            this.previewParams[key] = data[key] || {}
          } else {
            this.previewParams[key] = data[key] || ''
          }
        }
        // 财务列表
        this.previewParams.financeList = data.shipmentFinanceSaveVoList
        // 报价单列表
        this.previewParams.quotationList = data.salesQuotationEntitieList
        return data;
      }
    },
    // 合同预览
    previewContract() {
      if (!this.form.templateId) {
        this.$message({
          message: '请选择合同模板',
          type: 'error',
          showClose: true,
        });
        return
      }
      // 获取模板id
      this.previewParams.templateId = this.form.templateId
      this.previewParams.attachList = this.form.attachList
      this.previewParams.fieldList = this.form.fieldList
      this.templateData = this.templateOptions.find(item => item.id == this.form.templateId)
      this.$api.seePsiContractService.contractpurchasePreview(this.previewParams)
        .then(res => {
          this.templateData.context = res.data || ''
          this.previewVisible = true
        })

    },
    // 保存表单数据
    saveHandle() {
      if (this.form.templateId) {
        this.form.templateName = this.templateOptions.find(item => item.id == this.form.templateId).name
      }
      this.form.shipmentCode = this.rowData.shipmentCode // 销售出库单编号,
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          // rules 表单验证是否通过
          let api = 'salesshipmentInsertContract' //this.type = addContract //生成合同
          if (this.type == 'editContract') {
            let api = 'salesshipmentUpdateContract'  //生成合同
          }
          const params = Object.assign(this.form, this.params)
          this.$api.seePsiSaleService[api](params)
            .then(res => {
              this.close()
              this.setEdit()
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
