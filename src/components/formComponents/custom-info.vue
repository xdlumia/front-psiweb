/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 18:18:24
 * @Description: 自定义信息
*/
<template>
  <form-card title="自定义信息">
    <el-table :data="tableData" size="mini">
      <el-table-column label="字段名称" min-width="80" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="字段内容" min-width="200" prop="value" show-overflow-tooltip>
        <template>
          <el-form-item class="mt10" prop size="mini">
            <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">字段名称字段内容</div>
            <el-select class="wfull" placeholder="请选择" v-else v-model="form.value">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [{ name: '安装系统', value: '邮箱' }]
    },
    options: [],
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