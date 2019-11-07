/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 16:17:22
 * @Description: 到货信息
 */
<template>
  <form-card title="到货信息">
    <el-row :gutter="10">
      <el-col :span="8" v-if="!hide.includes('saleTime')">
        <el-form-item label="销售要求到货时间" prop="saleTime" :rules="[{ required: true, trigger: 'blur' }]">
          <el-date-picker
            :disabled="disabled"
            :placeholder="`请选择销售要求到货时间`"
            class="wfull"
            v-model="data.saleTime"
            value-format="timestamp"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="!hide.includes('purchaseTime')">
        <el-form-item label="采购预计到货时间" prop="purchaseTime" :rules="[{ required: true, trigger: 'blur' }]">
          <el-date-picker
            :disabled="disabled"
            :placeholder="`请选择采购预计到货时间`"
            class="wfull"
            v-model="data.purchaseTime"
            value-format="timestamp"
          />
        </el-form-item>
      </el-col>
      <el-col :key="index" :span="item.span || 8" v-for="(item,index) of formItems">
        <el-form-item :label="item.label" :prop="`logistics.${item.prop}`" :rules="item.rules">
          <el-input
            :disabled="disabled"
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
            :loading="serviceLoading"
            :remote-method="getServiceProvider"
            filterable
            remote
            v-else-if="item.type=='serviceProvider'"
            v-model="data.logistics[item.prop]"
          >
            <el-option :key="item.code" :label="item.serviceName" :value="item.code" v-for="item in serviceOptions" />
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
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      default: () => {
        return {
          logistics: {
            serviceCode: ''
          }
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => []
    }
  },
  data() {
    let formItems = [
      { label: '供应商联系人', prop: 'supplierLinkman', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
      { label: '供应商联系人电话', prop: 'supplierPhone', type: 'input', rules: [{ required: true, }, { type: 'phone' }], },
      { label: '服务商名称', prop: 'serviceCode', type: 'serviceProvider', },
      { label: '服务类型', prop: 'logisticsModelCode', type: 'select', dictName:'PSI_FWS_FWLX',
        exclude:'serviceFilter' },
      { label: '物流单号', prop: 'logisticsSn', type: 'input', },
      { label: '是否到付', prop: 'controlType', type: 'input', },
      { label: '物流费用', prop: 'totalAmount', type: 'input', rules: [{ type: 'price' }], },
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
      serviceFilter: []
    };
  },
  watch: {
    'data.logistics.serviceCode': {
      handler() {
        this.getServiceInfo();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getServiceInfo()
  },
  methods: {
    async getServiceInfo() {
      if (
        !this.data ||
        !this.data.logistics ||
        !this.data.logistics.serviceCode
      ){
        return;
      }
      let [service] = this.serviceOptions.filter(
        a => a.code == this.data.logistics.serviceCode
      );
      if(!service){
        let {data} = await this.$api.seePsiCommonService.commonserviceproviderInfoBycode(null,this.data.logistics.serviceCode)
        service = data;
        this.serviceOptions = [service]
      }
      if (service) {
        this.serviceFilter = service.serviceType.split(',');
        if (
          !this.serviceFilter.includes(this.data.logistics.logisticsModelCode)
        ) {
          this.data.logistics.logisticsModelCode = '';
        }
      }
    },
    async getServiceProvider(words) {
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
    }
  }
};
</script>
<style scoped>
</style>
