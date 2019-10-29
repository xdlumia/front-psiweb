<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 17:19:40
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-29 18:07:46
 * @Description: 业务设置-新增公司
 -->
<template>
  <div class>
    <el-form :model="companyForm" size="small">
      <form-card title="公司财务信息">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="公司名称">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户银行">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址、电话">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="发票设定">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="发票最大限额">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票税率">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下限预警数量">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card :title="true">
        <div slot="title" style="display:flex;justify-content:space-between">
          <span>公司账户</span>
          <el-button type="text" style="padding:0">+新建</el-button>
        </div>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="账户类型">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付宝账户名称">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信账户名称">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户名称">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户名称">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户银行（到支行）">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行预留手机号">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户账号">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户状态">
              <el-input v-model="companyForm.value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      companyForm: {
        value: ''
      }
    }
  },
  components: {
  }
}
</script>

<style scoped lang='scss'>
</style>
