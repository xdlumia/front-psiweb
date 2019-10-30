/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 11:17:45
 * @Description: 客户信息
*/
<template>
  <form-card title="客户信息">
    <el-row :gutter="10">
      <el-col
        :span="8"
        class=""
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'必填项'}
                ]"
          label="客户名称"
          prop
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >客户名称</div>
          <el-select
            class="wfull"
            filterable
            placeholder="请选择"
            v-else
            v-model="data.customerName"
          >
            <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in options"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class=""
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'必填项'}
                ]"
          label="发票抬头"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >发票抬头</div>
          <el-input
            disabled
            placeholder="请输入发票抬头"
            v-else
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class=""
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'必填项'}
                ]"
          label="纳税人识别号"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >纳税人识别号</div>
          <el-input
            disabled
            placeholder="请输入纳税人识别号"
            v-else
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class=""
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'必填项'}
                ]"
          label="注册地址"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >注册地址</div>
          <el-input
            disabled
            placeholder="请输入注册地址"
            v-else
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class=""
      >
        <el-form-item
          :rules="[{type:'telePhone'},
                    {required:true,message:'必填项'}]"
          label="注册电话"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >注册电话</div>
          <el-input
            disabled
            placeholder="请输入注册电话"
            v-else
            v-model="data.telPhone"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class=""
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'必填项'}
                ]"
          label="开户银行"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >开户银行</div>
          <el-input
            disabled
            placeholder="请输入开户银行"
            v-else
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class=""
      >
        <el-form-item
          :rules="[
                    {type:'bankCard',message:'请填写银行账户'},
                    {required:true,message:'必填项'}
                ]"
          label="开户行账号"
          prop="bankCard"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >开户行账号</div>
          <el-input
            disabled
            placeholder="请输入开户行账号"
            v-else
            v-model="data.bankCard"
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
      options: []
    };
  }
};
</script>
<style lang="scss" scoped>
</style>