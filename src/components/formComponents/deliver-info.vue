/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-07 14:26:41
 * @Description: 发货信息 1
*/
<template>
  <form-card title="发货信息">
    <el-row :gutter="10">
      <el-row :gutter="10">
        <el-col
          :span="item.span || 8"
          v-for="(item,index) of formItems"
          :key="index"
        >
          <el-form-item
            :rules="item.rules"
            :label="item.label"
            :prop="item.prop"
          >
            <el-input
              v-if="item.type =='input'"
              :disabled='disabled'
              :maxlength="item.maxlength"
              v-model.trim="data[item.prop]"
              :placeholder="`请输入${item.label}`"
            />
            <el-select
              class="wfull"
              v-else-if="item.type =='select'"
              :disabled='disabled'
              v-model="data[item.prop]"
              :placeholder="`请输入${item.label}`"
            >
              <el-option
                v-for="item in dictionaryOptions(item.dicName)"
                :key="item.code"
                :label="item.content"
                :value="item.code"
              />
            </el-select>
            <el-date-picker
              class="wfull"
              v-else-if="item.type =='date'"
              value-format="timestamp"
              :disabled='disabled'
              v-model="data[item.prop]"
              :placeholder="`请选择${item.label}`"
            />
            <el-select
              :disabled="disabled"
              :placeholder="`请输入${item.label}`"
              class="wfull"
              v-else-if="item.type =='serviceCodeSelect'"
              v-model="data[item.prop]"
            >
              <el-option
                :key="item.code"
                :label="item.content"
                :value="item.code"
                v-for="item in item.dictName?dictionaryOptions(item.dictName).filter(a=>serviceFilter.includes(a.code)):(item.options||[])"
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
              @change="serciceChange"
            >
              <el-option
                :key="item.code"
                :label="item.serviceName"
                :value="item.id"
                v-for="item in serviceOptions"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-row>

  </form-card>
</template>
<script>
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
        return []
      }
    }
  },
  data() {
    return {
      // 遍历表单
      Items: [
        { label: '销售预计发货时间', prop: 'salesExpectedShipmentsTime', type: 'date', rules: [{ required: true && !this.disabled, trigger: 'blur' }], },
        // { label: '客户名称', prop: 'clientName', type: 'input', rules: [{ required: false, trigger: 'blur' }], },
        { label: '客户联系人', prop: 'clientLinkman', type: 'input', rules: [{ required: true && !this.disabled, trigger: 'blur' }, { type: 'name' }], },
        { label: '客户联系电话', prop: 'clientPhone', type: 'input', rules: [{ required: true && !this.disabled, trigger: 'blur' }, { type: 'telePhone' }], },
        { label: '客户收货地址', prop: 'clientReceivingAddress', type: 'input', rules: [{ required: true && !this.disabled, trigger: 'blur' },], },
        { label: '服务商名称', prop: 'facilitator', type: 'serviceProvider', rules: [{ required: true }] },
        { label: '服务类型', prop: 'serveType', type: 'serviceCodeSelect', dictName: 'PSI_FWS_FWLX', exclude: 'serviceFilter', rules: [{ required: true }] },
        { label: '销售要求到货时间', prop: 'salesRequireArrivalTime', type: 'date', rules: [{ required: false, trigger: 'blur' }], },
        { label: '采购预计到货时间', prop: 'procurementExpectedArrivalTime', type: 'date', rules: [{ required: false, trigger: 'blur' }], },
        { label: '备注', prop: 'note', type: 'note', maxlength: 200, rules: [{ required: false, trigger: 'blur' }], },
      ],
      serviceOptions: [],
      serviceLoading: false,
      serviceFilter: []
    }
  },
  computed: {
    formItems() {
      return this.Items.filter(item => !this.hide.includes(item.prop))
    }
  },
  mounted() {
    if (this.data) {
      this.getServiceInfo()
    }
  },
  watch: {
    'data.facilitator': {
      handler() {
        this.getServiceInfo()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async getServiceInfo() {
      if (
        !this.data ||
        !this.data.facilitator
      ) {
        this.getServiceProvider();
        return;
      }
      let [service] = this.serviceOptions.filter(
        a => a.id == this.data.facilitator
      );
      if (!service) {
        let {
          data
        } = await this.$api.seePsiCommonService.commonserviceproviderInfo(
          null,
          this.data.facilitator
        );
        service = data;
        this.serviceOptions = [service];
      }
      if (service) {
        this.serviceFilter = service.serviceType.split(',');
        if (
          !this.serviceFilter.includes(this.data.serveType)
        ) {
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
    serciceChange() {
      let service = this.serviceOptions.find(
        a => a.id == this.data.facilitator
      );
      if (service) {
        this.data.bmcName = service.serviceName
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>