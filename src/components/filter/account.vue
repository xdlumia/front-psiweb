/*
 * @Author: 赵伦
 * @Date: 2019-11-21 15:17:23
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-25 15:33:19
 * @Description: 结算账户
*/
<template>
  <el-form-item
    :label="item.label"
    :prop="item.prop"
  >
    <el-select
      class="wfull"
      @change="update"
      size="mini"
      v-model="selectedValue"
    >
      <el-option
        label="全部"
        value
      ></el-option>
      <el-option
        :key="index"
        :label="`${item.corporationName}${item.accountType}(${item.account})`"
        :value="item.id"
        v-for="(item, index) in settlementAccount"
      ></el-option>
    </el-select>
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
      selectedValue: '',
      accountList: [],
    };
  },
  watch: {

  },
  computed: {
    settlementAccount() {
      return [].concat(
        ...this.accountList.map(item => {
          return [].concat(
            ...(item.commonCorporationAccountEntities || []).map(sub => {
              sub.accountType = this.$options.filters.dictionary(
                sub.accountType,
                'PSI_GSSZ_ZHLX'
              );
              return Object.assign(sub, {
                corporationName: item.corporationName
              });
            })
          );
        })
      );
    }
  },
  mounted() {
    this.getCompany();
  },
  methods: {
    async getCompany() {
      let {
        data
      } = await this.$api.seeBaseinfoService.commoncorporationSelectForJxc();
      this.accountList = data;
    },
    update() {
      this.$emit('input', this.selectedValue);
      this.$emit('change');
    }
  }
};
</script>