/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 16:57:03
 * @Description: 附加发票
*/
<template>
  <form-card title="附加发票">
    <el-row :gutter="10">
      <el-col :span="8" class="">
        <el-form-item label="发票金额" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">发票金额</div>
          <el-input disabled placeholder="请输入发票金额" type="number" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="">
        <el-form-item label="税率" prop size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">税率</div>
          <el-select class="wfull" placeholder="请选择" v-else v-model="form.taxrate">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="">
        <el-form-item label="税后金额" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">税后金额</div>
          <el-input disabled placeholder="请输入税后金额" type="number" v-else />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    form: {
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