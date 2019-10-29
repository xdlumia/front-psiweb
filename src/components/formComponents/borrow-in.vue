/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:10:46
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 16:56:06
 * @Description: 借入信息
*/
<template>
  <form-card title="借入信息">
    <el-row :gutter="10">
      <el-col :span="8" class="">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="借入类型" prop size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">借入</div>
          <el-select class="wfull" disabled placeholder="请选择" v-else v-model="data.bankCard">
            <el-option label="借入" value="借入"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="库房" prop size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">库房A</div>
          <el-select class="wfull" placeholder="请选择" v-else v-model="data.bankCard">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="借入方" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">北京凡特仁</div>
          <el-input placeholder="请输入借入方" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="" v-if="disabled">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="服务商名称" prop size="mini">
          <el-select class="wfull" placeholder="请选择" v-model="data.bankCard">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="" v-if="disabled">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="服务类型" prop size="mini">
          <el-select class="wfull" placeholder="请选择" v-model="data.bankCard">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="" v-if="disabled">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="运单号" size="mini">
          <el-input placeholder="请输入运单号" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="">
        <el-form-item label="物流费用" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">500</div>
          <el-input placeholder="请输入物流费用" type="number" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="">
        <el-form-item label="返还时间" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">500</div>
          <el-date-picker class="wfull" v-else></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="">
        <el-form-item label="备注" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled"></div>
          <el-input placeholder="请输入备注" type="textarea" v-else />
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
