/*
 * @Author: 赵伦
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-11 15:40:48
 * @Description: 换货信息 已绑定字段 1
 */
<template>
  <form-card title="换货信息">
    <el-row :gutter="10">
      <el-col
        :key="index"
        :span="item.span || 8"
        v-for="(item,index) of formItems"
      >
        <el-form-item
          :label="item.label"
          :prop="`${item.prop}`"
          :rules="item.rules"
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
            class="wfull"
            type="textarea"
            v-else-if="item.type =='textarea'"
            v-model.trim="data[item.prop]"
          />
          <el-select
            :disabled="disabled"
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
            <el-option
              :key="item.code"
              :label="item.serviceName"
              :value="item.id"
              v-for="item in serviceOptions"
            />
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
        return {
          logistics: {}
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
    // prettier-ignore
    let formItems = [
      { label: '换货方', prop: 'barterThirdparty', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
      { label: '换货方联系人', prop: 'contacts', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
      { label: '换货方联系人电话', prop: 'contactsPhone', type: 'input', rules: [{ required: true, }, { type: 'phone' }], },
      { label: '换货方地址', prop: 'address', type: 'input', rules: [{ required: true, }], },
      { label: '服务商名称', prop: 'serviceProviderId', type: 'serviceProvider', rules:[{validator:(rule,value,cb)=>{
        if(this.data.logisticsFees>0){
          if(!value) cb(new Error('此处为必填项'))
          else cb()
        }else cb();
      }}] },
      {        label: '服务类型', prop: 'serveType', type: 'select', dictName: 'PSI_FWS_FWLX',
        exclude: 'serviceFilter'      },
      { label: '运单编号', prop: 'waybillCode', type: 'input', },
      { label: '运费金额', prop: 'logisticsFees', type: 'input', rules: [{ type: 'price' }], },
      // { label: '备注', prop: 'note', type: 'textarea',span:24 },
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
    }
  }
};
</script>
<style scoped>
</style>
