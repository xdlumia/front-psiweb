/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:10:46
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 16:30:02
 * @Description: 换货信息
*/
<template>
  <form-card title="换货信息">
    <el-row :gutter="10">
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="换货方" prop size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">换货方</div>
          <el-select class="wfull" disabled placeholder="请选择" v-else v-model="data.bankCard">
            <el-option label="换货方" value="换货方"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="换货方联系人" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">北京凡特仁</div>
          <el-input placeholder="请输入换货方联系人" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item
          :rules="[ 
            {required:true,message:'必填项'},
            {type:'telPhone'},
        ]"
          label="换货方联系人电话"
          size="mini"
        >
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">北京凡特仁</div>
          <el-input placeholder="请输入换货方联系人" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="换货方地址" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">北京凡特仁</div>
          <el-input placeholder="换货方地址" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="服务商名称" prop size="mini">
          <el-select class="wfull" placeholder="请选择" v-model="data.bankCard">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="服务类型" prop size="mini">
          <el-select class="wfull" placeholder="请选择" v-model="data.bankCard">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="运单号" size="mini">
          <el-input placeholder="请输入运单号" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class>
        <el-form-item label="物流费用" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">500</div>
          <el-input placeholder="请输入物流费用" type="number" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="24" class>
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
