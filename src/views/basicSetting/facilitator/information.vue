<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:31:10
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-06 17:47:05
 * @Description: description
 -->
<template>
  <form-card title="基本信息">
    <el-row :gutter="10" type="flex" justify="space-between">
      <el-col :span="8">
        <el-form-item label="服务商名称" prop="serviceName">
          <el-input v-model="data.serviceName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系人" prop="linkMan">
          <el-input v-model="data.linkMan"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="data.phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="服务类型" prop="serviceTypeList">
          <!-- <el-input v-model="data.serviceTypeList"></el-input> -->
          <el-select multiple class="wfull" v-model="data.serviceTypeList" size="mini">
            <el-option
              v-for="(item, index) in dictionaryOptions('PSI_FWS_FWLX')"
              :key="index"
              :label="item.content"
              :value="item.code"
            ></el-option>
          </el-select>
          <!-- <d-select
                  class="wfull"
                  dicCode="PSI_FWS_FWLX"
                  v-model="data.serviceTypeList"
                  size="mini"
          ></d-select>-->
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收款银行" prop="receiptBank">
          <el-input v-model="data.receiptBank"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收款账号" prop="shroffAccountNum">
          <el-input v-model="data.shroffAccountNum"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="服务商级别" prop="serviceGrade">
          <d-select class="wfull" dicCode="PSI_FWS_FWJB" v-model="data.serviceGrade" size="mini"></d-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行业" prop="trade">
          <d-select size="mini" class="wfull" dicCode="PSI_KH_HY" v-model="data.trade"></d-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="来源" prop="source">
          <d-select size="mini" class="wfull" dicCode="PSI_KHGL_LY" v-model="data.source"></d-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="data.address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
  }
}
</script>

<style scoped lang='scss'>
</style>
