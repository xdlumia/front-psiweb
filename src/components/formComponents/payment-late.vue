/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-29 15:32:49
 * @Description: 收款滞纳金
 */
<template>
  <form-card title='收款滞纳金'>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="滞纳金"
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
          label="滞纳金比例"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="滞纳金间隔"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="滞纳金上限"
          prop
          size="mini"
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
            <template slot="append">%</template>
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
