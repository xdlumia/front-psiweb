<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-05 18:46:38
 * @Description: 新增服务商
 -->
<template>
  <div class>
    <el-form
      ref="facilitatorForm"
      size="mini"
      :model="facilitatorForm"
      :rules="facilitatorFormRule"
    >
      <d-tabs :style="{maxHeight: maxHeight + 'px'}">
        <d-tab-pane label="基本信息" name="information"></d-tab-pane>
        <d-tab-pane label="发票信息" name="invoiceInfo"></d-tab-pane>
        <d-tab-pane label="备注信息" name="extrasInfo"></d-tab-pane>
        <form-card title="基本信息" id="information">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="服务商名称" prop="serviceName">
                <el-input v-model="facilitatorForm.serviceName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人" prop="linkMan">
                <el-input v-model="facilitatorForm.linkMan"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="facilitatorForm.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务类型" prop="serviceType">
                <el-input v-model="facilitatorForm.serviceType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款银行" prop="receiptBank">
                <el-input v-model="facilitatorForm.receiptBank"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款账号" prop="shroffAccountNum">
                <el-input v-model="facilitatorForm.shroffAccountNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务商级别" prop="serviceGrade">
                <el-input v-model="facilitatorForm.serviceGrade"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行业" prop="trade">
                <el-input v-model="facilitatorForm.trade"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来源" prop="source">
                <el-input v-model="facilitatorForm.source"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="facilitatorForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </form-card>
        <!-- 发票信息 -->
        <invoice-info :data="facilitatorForm" id="invoiceInfo" />
        <!-- 备注信息 -->
        <extras-info :data="facilitatorForm" id="extrasInfo" />
      </d-tabs>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      facilitatorForm: {
        serviceName: '',
        serviceType: '',
        linkMan: '',
        phone: '',
        receiptBank: '',
        shroffAccountNum: '',
        serviceGrade: '',
        trade: '',
        source: '',
        address: ''
      },
      facilitatorFormRule: {
        serviceName: { required: true, message: '请输入', trigger: 'blur' },
        serviceType: { required: true, message: '请输入', trigger: 'blur' },
        linkMan: { required: true, message: '请输入', trigger: 'blur' },
        phone: { required: true, message: '请输入', trigger: 'blur' },
        receiptBank: { required: true, message: '请输入', trigger: 'blur' },
        shroffAccountNum: { required: true, message: '请输入', trigger: 'blur' },
        serviceGrade: { required: true, message: '请输入', trigger: 'blur' },
        trade: { required: true, message: '请输入', trigger: 'blur' },
        source: { required: true, message: '请输入', trigger: 'blur' },
        address: { required: true, message: '请输入', trigger: 'blur' }
      }
    }
  },
  components: {
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
