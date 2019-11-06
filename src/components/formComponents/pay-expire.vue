/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 20:06:38
 * @Description: 报价单有效期
*/
<template>
  <form-card title="报价单有效期">
    <el-row>
      <el-col :span="8">
        <el-form-item
          label="报价单有效期"
          prop="failureTime"
        >
          <el-date-picker
            v-model="data.failureTime"
            :disabled="disabled"
            value-format="timestamp"
            placeholder="请选择时间"
          ></el-date-picker>
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
  }
};
</script>
<style lang="scss" scoped>
</style>