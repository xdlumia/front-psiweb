/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 15:37:46
 * @Description: 发货信息
*/
<template>
  <form-card title="发货信息">
    <el-row :gutter="10">
      <el-col
        :span="8"
        class=""
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'必填项'}
                ]"
          label="销售预计发货时间"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >销售预计发货时间</div>
          <el-date-picker
            placeholder="请选择"
            style="max-width:100%;"
            v-else
          ></el-date-picker>
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
          label="客户联系人"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >客户联系人</div>
          <el-input
            disabled
            placeholder="请输入客户联系人"
            v-else
          />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="">
        <el-form-item :rules="[{type:'telePhone'},
                    {required:true,message:'必填项'}]" label="客户联系人电话" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="disabled">客户联系人电话</div>
          <el-input disabled placeholder="请输入客户联系人电话" v-else v-model="data.telPhone" />
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
          label="客户收货地址"
          size="mini"
        >
          <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="disabled"
          >客户收货地址</div>
          <el-input
            disabled
            placeholder="请输入客户收货地址"
            v-else
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