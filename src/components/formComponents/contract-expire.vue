/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 18:15:15
 * @Description: 其他合同-合同期限
*/
<template>
  <form-card title="单据信息">
    <el-row :gutter="10">
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="开始时间" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">开始时间</div>
          <el-date-picker class="wfull" v-else></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="结束时间" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">结束时间</div>
          <el-date-picker class="wfull" v-else></el-date-picker>
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