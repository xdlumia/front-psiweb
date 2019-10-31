/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 18:07:17
 * @Description: 其他合同-单据信息
*/
<template>
  <form-card title="单据信息">
    <el-row :gutter="10">
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="合同号" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">合同号</div>
          <el-input disabled placeholder="请输入合同号" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[{type:'telePhone'},
            {required:true,message:'必填项'}
        ]" label="合同名称" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">合同名称</div>
          <el-input disabled placeholder="请输入合同名称" v-else v-model="data.telPhone" />
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