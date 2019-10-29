/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-29 19:13:41
 * @Description: 账单调整
 */
<template>
  <form-card title='账单调整'>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="应收账单"
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
      <el-col :span="12">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="账单金额"
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
      <el-col :span="12">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="调整金额（正数增加金额，负数减少金额）"
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
      <el-col :span="12">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="调整后金额"
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
      default: true
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
