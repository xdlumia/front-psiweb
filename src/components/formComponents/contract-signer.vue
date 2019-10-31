/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 18:18:58
 * @Description: 其他合同-甲方/乙方信息
*/
<template>
  <form-card :title="name+'信息'">
    <el-row :gutter="10">
      <el-col :span="8" class>
        <el-form-item :label="name+'名称'" :rules="[ 
            {required:true,message:'必填项'}
        ]" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">甲方名称</div>
          <el-input :placeholder="`请输入${name}名称`" disabled v-else />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[
            {required:true,message:'必填项'}
        ]" label="签订人" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">签订人</div>
          <el-input disabled placeholder="请输入签订人" v-else v-model="data.telPhone" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[
            {required:true,message:'必填项'}
        ]" label="签订时间" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">签订时间</div>
          <el-date-picker class="wfull" v-else></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[
            {required:true,message:'必填项'}
        ]" label="证件号" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">证件号</div>
          <el-input disabled placeholder="请输入证件号" v-else v-model="data.telPhone" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[
            {required:true,message:'必填项'}
        ]" label="联系人" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">联系人</div>
          <el-input disabled placeholder="请输入联系人" v-else v-model="data.telPhone" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[
            {required:true,message:'必填项'}
        ]" label="联系电话" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">联系电话</div>
          <el-input disabled placeholder="请输入联系电话" v-else v-model="data.telPhone" />
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