/*
 * @Author: 赵伦
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-14 10:09:47
 * @Description: 借入借出信息 已绑定字段 1
 */
<template>
  <form-card :title="data.borrowLoanType==1?'借出信息':'借入信息'">
    <el-row :gutter="10">
      <el-col :key="index" :span="item.span || 8" v-for="(item,index) of formItems">
        <el-form-item
          :label="item.label"
          :prop="`${item.prop}`"
          :rules="item.rules"
          v-if="typeof item.borrowType!='undefined'?data.borrowLoanType==item.borrowType:true"
        >
          <el-input
            :disabled="disabled"
            :placeholder="`请输入${item.label}`"
            class="wfull"
            v-if="item.type =='input'"
            v-model.trim="data[item.prop]"
          />
          <el-input
            :disabled="disabled"
            :placeholder="`请输入${item.label}`"
            :rows="4"
            class="wfull"
            type="textarea"
            v-else-if="item.type =='textarea'"
            v-model.trim="data[item.prop]"
          />
          <el-select
            :disabled="disabled||disables.includes(item.prop)"
            :placeholder="`请输入${item.label}`"
            class="wfull"
            v-else-if="item.type =='select'"
            v-model="data[item.prop]"
          >
            <el-option
              :key="item.code"
              :label="item.content"
              :value="item.code"
              v-for="item in item.dictName?
              dictionaryOptions(item.dictName).filter(a=>serviceFilter.includes(a.code)):
              (item.options||[])"
            />
          </el-select>
          <el-select
            :disabled="disabled"
            :loading="serviceLoading"
            :remote-method="getServiceProvider"
            class="wfull"
            filterable
            remote
            v-else-if="item.type=='serviceProvider'"
            v-model="data[item.prop]"
          >
            <el-option :key="item.id" :label="item.serviceName" :value="item.id" v-for="item in serviceOptions" />
          </el-select>
          <el-select
            :disabled="disabled"
            :loading="wmsLoading"
            class="wfull"
            filterable
            remote
            v-else-if="item.type=='borrowwms'"
            v-model="data[item.prop]"
          >
            <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in wmsOptions" />
          </el-select>
          <el-date-picker
            :disabled="disabled"
            :placeholder="`请选择${item.label}`"
            class="wfull"
            v-else-if="item.type =='date'"
            v-model="data[item.prop]"
            value-format="timestamp"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disables: {
      type: Array,
      default: () => []
    },
    hide: {
      type: Array,
      default: () => []
    }
  },
  data() {
    // prettier-ignore
    let formItems = [
      { label: '借入类型', prop: 'borrowLoanType', type: 'select', rules: [{ required: true, trigger: 'blur' }],options:[
        {code:0,content:'借入'},
        {code:1,content:'借出'},
      ] },
      { label: '借出方', prop: 'outSide', type: 'input', rules: [{ required: true, },],borrowType:1, },
      { label: '借入库房', prop: 'borrowWmsId', type: 'borrowwms', rules: [{ required: true, },],borrowType:0, },
      { label: '借入方', prop: 'debtor', type: 'input', rules: [{ required: true, },],borrowType:0, },
      { label: '服务商名称', prop: 'serviceProviderId', type: 'serviceProvider', rules: [{ required: true, },], },
      { label: '服务类型', prop: 'serveType', type: 'select', dictName:'PSI_FWS_FWLX', exclude:'serviceFilter', rules: [{ required: true, },], },
      { label: '运单号', prop: 'waybillCode', type: 'input', rules: [{ required: true, },], },
      { label: '物流费用', prop: 'logisticsFees', type: 'input', rules: [{ type: 'price' }], },
      { label: '返回时间', prop: 'returnTime', type: 'date', },
      { label: '备注', span:24, prop: 'note', type: 'textarea', },
    ];
    return {
      options: [],
      serviceOptions: [],
      form: {
        telPhone: '我是电话号码'
      },
      // 遍历表单
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
      serviceLoading: false,
      serviceFilter: [],
      wmsLoading: false,
      wmsOptions: []
    };
  },
  watch: {
    'data.serviceProviderId': {
      handler() {
        this.getServiceInfo();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getServiceInfo();
    this.getWMS();
  },
  methods: {
    async getServiceInfo() {
      if (!this.data || !this.data.serviceProviderId) {
        this.getServiceProvider();
        return;
      }
      let [service] = this.serviceOptions.filter(
        a => a.id == this.data.serviceProviderId
      );
      if (!service) {
        let {
          data
        } = await this.$api.seePsiCommonService.commonserviceproviderInfo(
          null,
          this.data.serviceProviderId
        );
        service = data;
        this.serviceOptions = [service];
      }
      if (service) {
        this.serviceFilter = service.serviceType.split(',');
        if (!this.serviceFilter.includes(this.data.serveType)) {
          this.$set(this.data, 'serveType', '');
        }
      }
    },
    async getServiceProvider(words = '') {
      this.serviceLoading = true;
      let {
        data
      } = await this.$api.seePsiCommonService.commonserviceproviderList({
        page: 1,
        limit: 20,
        fuzzyServiceName: words.trim()
      });
      this.serviceOptions = data;
      this.serviceLoading = false;
    },
    async getWMS(words = '') {
      this.wmsLoading = true;
      let {
        data
      } = await this.$api.seePsiWmsService.commonwmsmanagerUsableList({
        page: 1,
        limit: 20,
        name: words
      });
      this.wmsOptions = data;
      this.wmsLoading = false;
    }
  }
};
</script>
<style scoped>
</style>
