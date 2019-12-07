/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-07 16:29:01
 * @Description: 其他合同-合同期限 字段已绑定 1 
*/
<template>
  <form-card title="合同期限">
    <el-row :gutter="10">
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="开始时间" prop="beginDate" size="mini">
          <el-date-picker :disabled="disabled" class="wfull" placeholder="请选择开始时间" v-model="data.beginDate" value-format="timestamp"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="结束时间" prop="endDate" size="mini">
          <el-date-picker :disabled="disabled" class="wfull" placeholder="请选择结束时间" v-model="data.endDate" value-format="timestamp"></el-date-picker>
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
      options: []
    };
  }
};
</script>
<style lang="scss" scoped>
</style>