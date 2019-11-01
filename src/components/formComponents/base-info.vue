/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-29 19:01:19
 * @Description: 基本信息
 */
<template>
  <form-card title='基本信息'>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="客户编号"
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
          label="客户名称"
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
          label="联系人"
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
          label="联系电话"
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
          label="客户级别"
          prop
        >
          <el-select
            class="wfull"
            :disabled="disabled"
            filterable
            placeholder="请选择"
            v-model="form.customerName"
          >
            <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in options"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="行业"
          prop
        >
          <el-select
            class="wfull"
            :disabled="disabled"
            filterable
            placeholder="请选择"
            v-model="form.customerName"
          >
            <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in options"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="来源"
          prop
        >
          <el-select
            class="wfull"
            :disabled="disabled"
            filterable
            placeholder="请选择"
            v-model="form.customerName"
          >
            <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in options"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="16">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="详细地址"
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
          label="备注"
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
