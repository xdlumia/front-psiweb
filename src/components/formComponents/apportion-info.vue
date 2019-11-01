/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 16:35:36
 * @Description: 分摊信息
 */
<template>
  <form-card title='分摊信息'>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="费用单"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
            <el-button
              slot="append"
              icon="el-icon-plus"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="未匹配费用金额"
          prop
        >
          <el-input
            :disabled="disabled"
            placeholder="请输入"
            v-model="form.telPhone"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="[{required:true,message:'必填项'}]"
          label="关联单据"
          prop
        >
          <el-select
            class="wfull"
            :disabled="disabled"
            placeholder="请选择销售出库单"
            :rules="[{required:true,message:'必填项'}]"
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
          label="销售出库单"
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
  name: 'apportionInfo',
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
