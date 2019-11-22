/*
 * @Author: 赵伦
 * @Date: 2019-11-22 09:38:51
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-22 15:25:26
 * @Description: 销售方/购买方信息 已绑定 1
*/ 
<template>
  <form-card :title="title">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item :prop="`${prefix}Id`" :rules="[{required:true}]" label="名称">
          <el-select
            :disabled="disabled"
            :loading="searching"
            :placeholder="`请选择`"
            :remote="from=='本公司'?false:true"
            :remote-method="searchCompany"
            @change="companyChange"
            class="wfull"
            filterable
            v-model="data[`${prefix}Id`]"
          >
            <el-option :key="index" :label="item.name" :value="item.id" v-for="(item,index) in companyList"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :key="index" :span="item.span || 8" v-for="(item,index) of formItems">
        <el-form-item :label="item.label">
          <el-input
            :disabled="disabled"
            :placeholder="`请输入${item.label}`"
            v-if="item.type =='input'"
            v-model.trim="currentCompany[item.prop]"
          />
          <el-select
            :disabled="disabled"
            :placeholder="`请输入${item.label}`"
            class="wfull"
            v-else-if="item.type =='select'"
            v-model="currentCompany[item.prop]"
          >
            <el-option :key="item.code" :label="item.content" :value="item.code" v-for="item in dictionaryOptions(item.dicName)" />
          </el-select>
          <el-date-picker
            :disabled="disabled"
            :placeholder="`请选择${item.label}`"
            class="wfull"
            v-else-if="item.type =='date'"
            v-model="currentCompany[item.prop]"
            value-format="timestamp"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
/**
 * 换货这边组件只需要id和name，其他的信息实时查，字段不用绑定
 */
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
    hide: {
      type: Array,
      default: () => {
        return [];
      }
    },
    from: {
      type: String,
      default: '本公司' // 客户 供应商
    },
    prefix: {
      type: String,
      default: 'purchase'
    },
    title: {
      type: String,
      default: '购买方信息'
    }
  },
  data() {
    return {
      // prettier-ignore
      items: [
        { label: '纳税人识别号', prop: 'taxNo', type: 'input', rules: [{ required: true , trigger: 'blur' }] }, 
        { label: '地址', prop: 'address', type: 'input', rules: [{ required: true , trigger: 'blur' }] }, 
        { label: '电话', prop: 'phone', type: 'input', rules: [{ required: true , trigger: 'blur' }] }, 
        { label: '开户行', prop: 'bankName', type: 'input', rules: [{ required: true , trigger: 'blur' }] }, 
        { label: '开户行账号', prop: 'bankAccount', type: 'input', rules: [{ required: true , trigger: 'blur' }] }, 
      ],
      companyList: [],
      currentCompany: {},
      searching: false,
      preId: ''
    };
  },
  watch: {},
  computed: {
    formItems() {
      return this.items.filter(item => !this.hide.includes(item.prop));
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let id = this.data[`${this.prefix}Id`];
      if (this.from == '本公司') {
        this.getCompany();
      } else if (this.from == '供应商') {
        if (id) {
          this.getSupplierInfo(id);
        } else {
          this.getSuppliers();
        }
      } else if (this.from == '客户') {
        if (id) {
          this.getClientInfo(id);
        } else {
          this.getClients();
        }
      }
    },
    companyChange(id) {
      this.companyList.some(item => {
        if (item.id == id) {
          this.currentCompany = item;
          this.$set(this.data, `${this.prefix}Name`, item.name);
          return true;
        }
      });
    },
    async searchCompany(words = '') {
      this.searching = true;
      try {
        if (this.from == '客户') {
          await this.getClients(words);
        } else {
          await this.getSuppliers(words);
        }
      } catch (error) {
        console.error(error);
      }
      this.searching = false;
    },
    async getCompany() {
      let {
        data: dictList
      } = await this.$api.seeDictionaryService.getDicCommonValueList(
        'PSI_GSSZ_ZHLX'
      );
      let dictObj = dictList.reduce((data, item) => {
        data[item.code] = item.content;
        return data;
      }, {});
      let {
        data
      } = await this.$api.seeBaseinfoService.commoncorporationSelectForJxc();
      this.companyList = [].concat(
        ...data.map(item => {
          // id name taxNo address phone bankName bankAccount
          return [].concat(
            ...(item.commonCorporationAccountEntities || []).map(sub => {
              sub.accountType = dictObj[sub.accountType];
              return {
                id: sub.id,
                name: `${item.corporationName}(${sub.accountType}${sub.account})`,
                taxNo: item.taxpayersNum,
                address: item.address,
                phone: item.phone,
                bankName: sub.accountBank,
                bankAccount: sub.account
              };
            })
          );
        })
      );
      this.companyList.some(item => {
        if (item.id == this.data[`${this.prefix}Id`]) {
          this.currentCompany = item;
          this.$set(this.data, `${this.prefix}Name`, item.name);
          return true;
        }
      });
    },
    async getSuppliers(words = '') {
      let {
        data
      } = await this.$api.seePsiCommonService.commonsupplierinfoPagelist({
        page: 1,
        limit: 20
      });
      this.companyList = (data || []).map(item => {
        return {
          id: item.id,
          name: item.supplierName,
          taxNo: item.taxpayersNum,
          address: item.registerAddres,
          phone: item.registerPhone,
          bankName: item.accountBank,
          bankAccount: item.bankAccount
        };
      });
    },
    async getSupplierInfo(id) {
      let { data } = await this.$api.seePsiCommonService.commonsupplierinfoInfo(
        null,
        id
      );
      let info = {
        id: data.id,
        name: data.supplierName,
        taxNo: data.taxpayersNum,
        address: data.registerAddres,
        phone: data.registerPhone,
        bankName: data.accountBank,
        bankAccount: data.bankAccount
      };
      this.companyList = [info];
      this.currentCompany = info;
      this.$set(this.data, `${this.prefix}Name`, info.name);
    },
    async getClients(words = '') {
      let {
        data
      } = await this.$api.seePsiCommonService.commonclientinfoQueryList({
        page: 1,
        limit: 20,
        fuzzyClientName: words
      });
      this.companyList = (data || []).map(item => {
        return {
          id: item.id,
          name: item.companyName,
          taxNo: item.taxpayersNum,
          address: item.registerAddres,
          phone: item.registerPhone,
          bankName: item.accountBank,
          bankAccount: item.bankAccount
        };
      });
    },
    async getClientInfo(id) {
      let { data } = await this.$api.seePsiCommonService.commonclientinfoInfo(
        null,
        id
      );
      let info = {
        id: data.id,
        name: data.companyName,
        taxNo: data.taxpayersNum,
        address: data.registerAddres,
        phone: data.registerPhone,
        bankName: data.accountBank,
        bankAccount: data.bankAccount
      };
      this.companyList = [info];
      this.currentCompany = info;
      this.$set(this.data, `${this.prefix}Name`, info.name);
    }
  }
};
</script>
<style scoped>
</style>
