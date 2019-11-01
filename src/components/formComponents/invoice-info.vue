/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-29 19:04:26
 * @Description: 发票信息
 */
<template>
  <form-card title='发票信息'>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="公司名称"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="纳税人识别号称"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="注册地址"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="注册电话"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="开户银行"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="开户行账号"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      default: () => { return {} }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      form: {
        telPhone: '我是电话号码'
      },
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
