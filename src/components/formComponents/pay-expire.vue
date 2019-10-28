/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 11:20:51
 * @Description: 报价单有效期
*/
<template>
  <form-card title="报价单有效期">
    <el-row>
      <el-col :span="8">
        <el-form-item label="报价单有效期" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">6天</div>
          <el-input placeholder="请输入天数" v-else>
            <template slot="append">天</template>
          </el-input>
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
    editable: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>