/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 11:08:41
 * @Description: 供应商基本信息编辑 字段已绑定 1 
*/
<template>
  <form-card title="基本信息">
    <el-row :gutter="10" type="flex">
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="供应商名称" prop="supplierName" size="mini">
          <el-input :disabled="disabled" placeholder="请输入供应商名称" v-model="data.supplierName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="联系人" prop="linkManName" size="mini">
          <el-input :disabled="disabled" placeholder="请输入联系人" v-model="data.linkManName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item
          :rules="[ 
            {required:true,message:'必填项'},
            {type:'telePhone'},
        ]"
          label="联系电话"
          prop="phone"
          size="mini"
        >
          <el-input :disabled="disabled" placeholder="请输入联系电话" v-model="data.phone"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex">
      <el-col :span="8">
        <el-form-item label="产品范围" prop="productRange" size="mini">
          <el-select
            :disabled="disabled"
            class="wfull"
            default-first-option
            filterable
            multiple
            placeholder="请选择产品范围"
            size="mini"
            v-model="data.productRange"
          >
            <el-option :key="item.code" :label="item.content" :value="item.code" v-for="item in dictionaryOptions('PSI_GYS_CPFW')"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="供应商级别" prop="grade" size="mini">
          <d-select :disabled="disabled" class="wfull" dicCode="PSI_FWS_FWJB" placeholder="请选择" size="mini" v-model="data.grade"></d-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="行业" prop="trade" size="mini">
          <d-select :disabled="disabled" class="wfull" dicCode="PSI_KH_HY" placeholder="请选择" size="mini" v-model="data.trade"></d-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex">
      <el-col :span="8">
        <el-form-item label="来源" prop="tenementSource" size="mini">
          <d-select :disabled="disabled" class="wfull" dicCode="PSI_KHGL_LY" placeholder="请选择" size="mini" v-model="data.tenementSource"></d-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="详细地址" prop="address" size="mini">
          <el-input :disabled="disabled" placeholder="请输入联系电话" v-model="data.address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      value1: '',
      value2: '',
      value3: '',
      options: ['CPU', '内存', '主板', '机箱', 'GPU', '键盘', '鼠标']
    };
  }
};
</script>
<style lang="scss" scoped>
</style>