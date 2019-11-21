/*
 * @Author: 赵伦
 * @Date: 2019-11-21 15:17:23
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 15:29:30
 * @Description: 结算账户
*/
<template>
  <el-row align="center" justify="space-between" style="width:300px;flex:0 0 300px;" type="flex">
    <el-col :span="6">
      <span style="line-height:28px;">结算账户：</span>
    </el-col>
    <el-col :span="18">
      <el-select @change="update" size="mini" v-model="selectedValue">
        <el-option label="全部" value></el-option>
        <el-option
          :key="index"
          :label="`${item.corporationName}${item.accountType}(${item.account})`"
          :value="item.id"
          v-for="(item, index) in settlementAccount"
        ></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      accountList: [],
      selectedValue: ''
    };
  },
  watch: {
    value() {
      this.selectedValue = this.value;
    }
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
      this.$emit('change', this.selectedValue);
    }
  }
};
</script>