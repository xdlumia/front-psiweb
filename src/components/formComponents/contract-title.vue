/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 11:15:42
 * @Description: 其他合同-单据信息 字段已绑定 1 
*/
<template>
  <form-card title="单据信息">
    <el-row :gutter="10">
      <el-col :span="8" class>
        <el-form-item label="合同号" prop="contractCode" size="mini">
          <el-input :disabled="disabled" maxlength="32" placeholder="请输入合同号" v-model="data.contractCode" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="合同名称" prop="contractName" size="mini">
          <el-input :disabled="disabled" maxlength="32" placeholder="请输入合同名称" v-model="data.contractName" />
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