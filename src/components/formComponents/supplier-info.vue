/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-07 17:40:20
 * @Description: 供应商信息
*/
<template>
  <form-card title="供应商信息">
    <el-row :gutter="10">
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="供应商名称" prop="supplierId" size="mini">
          <el-select
            :disabled="disabled"
            :loading="loading"
            :remote-method="getSuppliers"
            class="wfull"
            filterable
            placeholder="请选择"
            remote
            v-model="data.supplierId"
          >
            <el-option :key="item.id" :label="item.supplierName" :value="item.id" v-for="item in suppliers"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="发票抬头" size="mini">
          <el-input disabled placeholder="请输入发票抬头" v-model="currentSupplier.invoiceTitle" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="纳税人识别号" size="mini">
          <el-input disabled placeholder="请输入纳税人识别号" v-model="currentSupplier.taxpayersNum" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="注册地址" size="mini">
          <el-input disabled placeholder="请输入注册地址" v-model="currentSupplier.registerAddres" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[{type:'telePhone'},
        {required:true,message:'必填项'}]" label="注册电话" size="mini">
          <el-input disabled placeholder="请输入注册电话" v-model="currentSupplier.registerPhone" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="开户银行" size="mini">
          <el-input disabled placeholder="请输入开户银行" v-model="currentSupplier.accountBank" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item
          :rules="[
              {type:'bankCard',message:'请填写银行账户'},
              {required:true,message:'必填项'}
          ]"
          label="开户行账号"
          size="mini"
        >
          <el-input disabled placeholder="请输入开户行账号" v-model="currentSupplier.bankAccount" />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      suppliers: [],
      currentSupplier: {},
      loading: false
    };
  },
  watch: {
    'data.supplierId': {
      handler() {
        console.log(this);
        this.setExtrasInfo();
      }
    }
  },
  mounted() {
    this.setExtrasInfo();
  },
  methods: {
    async setExtrasInfo() {
      if (!this.data || !this.data.supplierId) return this.getSuppliers(' ');
      let [supplier] = this.suppliers.filter(
        item => item.id == this.data.supplierId
      );
      if (supplier) {
        this.currentSupplier = supplier;
      } else {
        let {
          data
        } = await this.$api.seePsiCommonService.commonsupplierinfoInfo(
          null,
          this.data.supplierId
        );
        this.suppliers = [data];
        this.currentSupplier = data || {};
      }
      this.$emit('change', this.currentSupplier);
    },
    async getSuppliers(words) {
      if (words) {
        this.loading = true;
        let {
          data
        } = await this.$api.seePsiCommonService.commonsupplierinfoPagelist({
          page: 1,
          limit: 20,
          fuzzySupplierName: words.trim()
        });
        this.suppliers = data;
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>