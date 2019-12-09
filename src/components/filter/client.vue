/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-25 14:34:34
 * @Description: 客户模糊查询
*/
<template>
  <el-form-item
    :label="item.label"
    :prop="item.prop"
  >
    <el-select
      :loading="loading"
      :placeholder="item.placeholder||('请输入选择'+item.label)"
      :remote-method="getSupplier"
      @change="changed"
      class="wfull"
      filterable
      remote
      reserve-keyword
      v-model="form[item.prop]"
    >
      <el-option
        :key="item.id"
        :label="item.clientName"
        :value="item.id"
        v-for="item in options"
      ></el-option>
    </el-select>
    <span class="el-icon-search search-icon"></span>
  </el-form-item>
</template>
<script>
export default {
  props: {
    item: Object,
    form: Object
  },
  data() {
    return {
      options: [],
      loading: false
    };
  },
  methods: {
    async getSupplier(words) {
      if (words) {
        this.loading = true;
        let {
          data
        } = await this.$api.seePsiCommonService.commonclientinfoQueryList({
          fuzzySupplierName: words,
          page: 1,
          limit: 50
        });
        this.options = data || [];
        this.loading = false;
      } else {
        this.options = [];
      }
    },
    changed(e) {
      this.$emit('change');
    }
  }
};
</script>
<style lang="scss" scoped>
.search-icon {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 18px;
}
</style>