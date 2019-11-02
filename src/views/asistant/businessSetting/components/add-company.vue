<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 17:19:40
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-02 18:09:44
 * @Description: 业务设置-新增公司
 -->
<template>
  <div class v-loading="loading">
    <el-form :model="companyForm" size="small" ref="companyForm" :rules="companyFormRules">
      <form-card title="公司财务信息">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="公司名称" prop="corporationName">
              <el-input v-model.trim="companyForm.corporationName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户银行" prop="accountBank">
              <el-input v-model.trim="companyForm.accountBank"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号" prop="account">
              <el-input v-model.trim.number="companyForm.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号" prop="taxpayersNum">
              <el-input v-model.trim="companyForm.taxpayersNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址" prop="address">
              <el-input v-model.trim="companyForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="phone">
              <el-input v-model.trim="companyForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="发票设定">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="发票最大限额" prop="invoiceSum">
              <d-select class="wfull" v-model="companyForm.invoiceSum" dicCode="PSI_GSSZ_FPZDXE"></d-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票税率" prop="jinvoiceTaxRate">
              <el-input v-model.trim="companyForm.jinvoiceTaxRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下限预警数量" prop="minLimitNum">
              <el-input v-model.trim="companyForm.minLimitNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card
        :title="index < 1"
        v-for="(item, index) in companyForm.commonCorporationAccountEntities"
        :key="index"
        class="mb10"
      >
        <div v-if="index < 1" slot="title" style="display:flex;justify-content:space-between">
          <span>公司账户</span>
          <el-button type="text" style="padding:0" @click="addAccount">+新建</el-button>
        </div>
        <el-row :gutter="40" style="position: relative">
          <el-col :span="8">
            <el-form-item
              label="账户类型"
              :prop="'commonCorporationAccountEntities.' + index + '.accountType'"
              :rules="commonCorporationAccountEntitiesRules.accountType"
            >
              <d-select class="wfull" v-model="item.accountType" dicCode="PSI_GSSZ_ZHLX"></d-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="accountType(index) !== 3">
            <el-form-item
              :label="accountNameLabel(index)"
              :prop="'commonCorporationAccountEntities.' + index + '.accountName'"
              :rules="commonCorporationAccountEntitiesRules.accountName"
            >
              <el-input v-model.trim="item.accountName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="accountType(index) === 5">
            <el-form-item
              label="开户银行（到支行）"
              :prop="'commonCorporationAccountEntities.' + index + '.accountBank'"
              :rules="commonCorporationAccountEntitiesRules.accountBank"
            >
              <el-input v-model.trim="item.accountBank"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="accountType(index) === 5">
            <el-form-item
              label="银行预留手机号"
              :prop="'commonCorporationAccountEntities.' + index + '.phone'"
              :rules="commonCorporationAccountEntitiesRules.phone"
            >
              <el-input v-model.trim="item.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="accountType(index) === 5">
            <el-form-item
              label="开户账号"
              :prop="'commonCorporationAccountEntities.' + index + '.account'"
              :rules="commonCorporationAccountEntitiesRules.account"
            >
              <el-input v-model.trim="item.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="账户状态"
              :prop="'commonCorporationAccountEntities.' + index + '.state'"
              :rules="commonCorporationAccountEntitiesRules.state"
            >
              <el-select class="wfull" v-model.trim="item.state">
                <el-option :value="1" label="启用"></el-option>
                <el-option :value="0" label="停用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="accountType(index) === 1 || accountType(index) === 2">
            <el-form-item
              :label="accountType(index) === 1 ? '支付宝收款二维码' : '微信收款二维码'"
              :prop="'commonCorporationAccountEntities.' + index + '.qrCode'"
              :rules="commonCorporationAccountEntitiesRules.qrCode"
              :ref="'qrCode'+index"
            >
              <div class="wfull" style="display:flex;">
                <upload-file
                  class="mr10"
                  v-model.trim="item.qrCode"
                  :limit="{type: ['jpg', 'jpeg', 'png']}"
                  v-if="!item.qrCode"
                  :size="0.5"
                  @uploadSuccess="removeValidate(index)"
                >
                  <slot>
                    <div style class="ba upload-wrapper">
                      <span class="el-icon-plus" style="font-size:36px;color:#999;"></span>
                    </div>
                  </slot>
                </upload-file>
                <div style class="ba upload-wrapper mr10" v-else>
                  <img style="width:100%;height:100%;object-fit: cover;" :src="item.qrCode" />
                </div>
                <p class="d-text-qgray f12" style="display: flex; flex-direction: column">
                  <span>仅支持jpg、jpeg、png格式</span>
                  <span>图片大小500KB以下,推荐分辨率600*600</span>
                  <el-button style="width: 65px;" type="text" @click="item.qrCode = ''">清空图片</el-button>
                </p>
              </div>
            </el-form-item>
          </el-col>
          <el-button
            style="position:absolute;padding:0;right:20px;top:-5px;border:none;"
            @click="companyForm.commonCorporationAccountEntities.splice(index, 1)"
          >
            <i style="font-size:20px;" class="el-icon-remove"></i>
          </el-button>
        </el-row>
      </form-card>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      loading: false,
      companyForm: {
        id: '',
        corporationName: '',
        accountBank: '',
        account: '',
        taxpayersNum: '',
        address: '',
        phone: '',
        invoiceSum: '',
        jinvoiceTaxRate: '',
        minLimitNum: '',
        commonCorporationAccountEntities: [{
          accountType: '',
          accountName: '',
          accountBank: '',
          phone: '',
          account: '',
          state: '',
          qrCode: ''
        }]
      },
      companyFormRules: {
        corporationName: { required: true, message: '请输入', trigger: 'blur' },
        accountBank: { required: true, message: '请输入', trigger: 'blur' },
        account: { required: true, message: '请输入', trigger: 'blur' },
        taxpayersNum: { required: true, message: '请输入', trigger: 'blur' },
        address: { required: true, message: '请输入', trigger: 'blur' },
        phone: { required: true, message: '请输入', trigger: 'blur' },
        invoiceSum: { required: true, message: '请选择', trigger: 'change' },
        jinvoiceTaxRate: { required: true, message: '请输入', trigger: 'blur' },
        minLimitNum: { required: true, message: '请输入', trigger: 'blur' }
      },
      commonCorporationAccountEntitiesRules: {
        accountType: { required: true, message: '请选择', trigger: 'change' },
        accountName: { required: true, message: '请输入', trigger: 'blur' },
        accountBank: { required: true, message: '请输入', trigger: 'blur' },
        phone: { required: true, message: '请输入', trigger: 'blur' },
        account: { required: true, message: '请输入', trigger: 'blur' },
        state: { required: true, message: '请选择', trigger: 'change' },
        qrCode: { required: true, message: '请上传', trigger: 'change' }
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    editId: {
      type: Number,
      default: null
    }
  },
  components: {
  },
  mounted() {
    if (this.editId && this.isEdit) {
      this.commoncorporationInfo(this.editId)
    }
  },
  methods: {
    // 移除图片上传校验
    removeValidate(index) {
      this.$refs.companyForm.clearValidate('commonCorporationAccountEntities.' + index + '.qrCode')
    },
    // 获取详情
    commoncorporationInfo(id) {
      this.loading = true
      this.$api.seePsiCommonService.commoncorporationInfo(null, id).then(res => {
        Object.keys(this.companyForm).forEach(key => {
          this.companyForm[key] = res.data[key] || this.companyForm[key]
        })
      }).finally(() => {
        this.loading = false
      })
    },
    // 保存
    saveCompany() {
      this.$refs.companyForm.validate(valid => {
        if (valid) {
          this.loading = true
          const port = this.isEdit ? 'commoncorporationUpdate' : 'commoncorporationSave'
          this.$api.seePsiCommonService[port](this.companyForm).then(res => {
            this.$emit('refresh')
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    // 添加公司账户
    addAccount() {
      this.companyForm.commonCorporationAccountEntities.push({
        accountType: '',
        accountName: '',
        accountBank: '',
        phone: '',
        account: '',
        state: '',
        qrCode: ''
      })
    },
    // 获取账户类型
    accountType(index) {
      return parseFloat(this.companyForm.commonCorporationAccountEntities[index].accountType.replace('PSI_GSSZ_ZHLX-', ''))
    },
    // 账户名称label
    accountNameLabel(index) {
      let name
      switch (this.accountType(index)) {
        case 3:
          name = '开户'
          break;
        case 1:
          name = '支付宝账户'
          break;
        case 2:
          name = '微信账户'
          break;
        default:
          name = '账户'
          break;
      }
      return name + '名称'
    }
  }
}
</script>

<style scoped lang='scss'>
.upload-wrapper {
  width: 100px;
  height: 100px;
  background: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  overflow: hidden;
}
</style>
