/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 11:15:18
 * @Description: 其他合同-甲方/乙方信息 字段已绑定 1 
*/
<template>
  <form-card :title="name+'信息'">
    <el-row :gutter="10">
      <el-col :span="8" class>
        <el-form-item :label="name+'名称'" :prop="`party${type}`" :rules="[ 
            {required:true,message:'必填项'}
        ]" size="mini">
          <el-input :disabled="disabled" :placeholder="`请输入${name}名称`" maxlength="32" v-model="data[`party${type}`]" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :prop="`party${type}Sign`" :rules="[
            {required:true,message:'必填项'}
        ]" label="签订人" size="mini">
          <el-input :disabled="disabled" maxlength="32" placeholder="请输入签订人" v-model="data[`party${type}Sign`]" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :prop="`party${type}Date`" :rules="[
            {required:true,message:'必填项'}
        ]" label="签订时间" size="mini">
          <el-date-picker
            :disabled="disabled"
            class="wfull"
            placeholder="请选择签订时间"
            v-model="data[`party${type}Date`]"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item
          :prop="`party${type}Id`"
          :rules="[
            {required:true,message:'必填项'},
            {type:'IDCard'}
        ]"
          label="证件号"
          size="mini"
        >
          <el-input :disabled="disabled" placeholder="请输入证件号" v-model="data[`party${type}Id`]" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :prop="`party${type}Linkman`" label="联系人" size="mini">
          <el-input :disabled="disabled" maxlength="32" placeholder="请输入联系人" v-model="data[`party${type}Linkman`]" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :prop="`party${type}Phone`" :rules="[ 
            {type:'telePhone'}
        ]" label="联系电话" size="mini">
          <el-input :disabled="disabled" placeholder="请输入联系电话" v-model="data[`party${type}Phone`]" />
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
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'A'
    }
  },
  data() {
    return {
      options: []
    };
  }
};
</script>
<style lang="scss" scoped>
</style>