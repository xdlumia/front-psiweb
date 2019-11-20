/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 14:40:43
 * @Description: 采购入库单的发货信息 1
*/
<template>
  <form-card title="发货信息">
    <el-row :gutter="10">
      <el-row :gutter="10">
        <el-col :key="index" :span="item.span || 8" v-for="(item,index) of formItems">
          <el-form-item :label="item.label" :prop="'logistics.'+item.prop" :rules="item.rules">
            <el-input
              :disabled="disabled"
              :maxlength="item.maxlength"
              :placeholder="`请输入${item.label}`"
              v-if="item.type =='input'"
              v-model.trim="data.logistics[item.prop]"
            />
            <el-select
              :disabled="disabled"
              :placeholder="`请输入${item.label}`"
              class="wfull"
              v-else-if="item.type =='select'"
              v-model="data.logistics[item.prop]"
            >
              <el-option :key="item.code" :label="item.content" :value="item.code" v-for="item in dictionaryOptions(item.dicName)" />
            </el-select>
            <el-select
              :disabled="disabled"
              :loading="loading"
              :remote-method="getClinent"
              class="wfull mr5"
              filterable
              placeholder="请输入客户名称选择"
              remote
              reserve-keyword
              v-else-if="item.type==='clientSelect'"
              v-model="data.logistics.clientId"
            >
              <el-option :key="item.id" :label="item.clientName" :value="item.id" v-for="item in clientOptions"></el-option>
            </el-select>
            <el-date-picker
              :disabled="disabled"
              :placeholder="`请选择${item.label}`"
              class="wfull"
              v-else-if="item.type =='date'"
              v-model="data.logistics[item.prop]"
              value-format="timestamp"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-row>
  </form-card>
</template>
<script>
// prettier-ignore
let formItems = [
  { label: '销售预计发货时间', prop: 'saleTime', type: 'date', rules: [{ required: true, trigger: 'blur' } ], },
  { label: '采购预计发货时间', prop: 'purchaseTime', type: 'date', rules: [{ required: true, trigger: 'blur' } ], },
  { label: '供应商联系人', prop: 'supplierLinkman', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'name' }], },
  { label: '供应商联系人电话', prop: 'supplierPhone', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'phone' }], },
  { label: '客户名称', prop: 'clientId', type: 'clientSelect', rules: [{ required: true, trigger: 'blur' }], },
  { label: '客户联系人', prop: 'clientLinkman', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'name' }], },
  { label: '客户联系电话', prop: 'clientPhone', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'phone' }], },
  { label: '客户收货地址', prop: 'clientAddress', type: 'input', rules: [{ required: true, trigger: 'blur' },], },
]
export default {
  props: {
    data: {
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultClientData:Object
  },
  data() {
    return {
      loading: false,
      clientOptions: [],
      // 遍历表单
      formItems: formItems.filter(item => !this.hide.includes(item.prop))
    };
  },
  watch: {
    'data.clientId': {
      handler(val) {
        if (val) {
          this.setClientExtrasInfo();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async getClinent(words) {
      if (words) {
        let {
          data
        } = await this.$api.seePsiCommonService.commonclientinfoQueryList({
          fuzzyNameOrCode: words
        });
        this.clientOptions = data || [];
      } else {
        this.clientOptions = [];
      }
    },
    async setClientExtrasInfo() {
      if(this.defaultClientData)return
      // 如果当前列表里有当前id 数据name可以正常显示
      let index = this.clientOptions.findIndex(
        item => this.data.clientId == item.id
      );
      let clientInfo;
      // 否则根据id查询当前数据 一般用户初始化页面显示数据的时候
      if (index == -1) {
        let data = await this.commonclientinfoInfo(this.data.clientId);
        clientInfo = data;
      } else clientInfo = this.clientOptions[index];
      if (clientInfo) {
        this.$set(this.data, 'clientLinkMan', clientInfo.linkManName);
        this.$set(this.data, 'clientPhone', clientInfo.phone);
        this.$set(this.data, 'clientReceivingAddress', clientInfo.address);
      }
    },
    // 获取客户详情信息
    async commonclientinfoInfo(id) {
      this.loading = true;
      let clientInfo;
      try {
        let { data } = await this.$api.seePsiCommonService.commonclientinfoInfo(
          null,
          id
        );
        clientInfo = data;
        this.clientOptions = [clientInfo];
      } catch (error) {}
      this.loading = false;
      return clientInfo;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>