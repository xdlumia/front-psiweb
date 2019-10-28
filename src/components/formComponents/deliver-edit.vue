/*
 * @Author: 徐贺
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 17:20:29
 * @Description: 发货信息 可编辑
*/
<template>
  <form-card title="发货信息">
    <el-row>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'必填项'}
                ]"
          label="销售出库单编号"
          prop
          size="mini"
        >
          <el-input
            disabled
            placeholder="请输入销售出库单编号"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择日期'}
                ]"
          label="销售要求发货日期"
          size="mini"
        >
          <el-date-picker
            disabled
            class="wfull"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择日期'}
                ]"
          label="实际发货日期"
          size="mini"
        >
          <el-date-picker
            class="wfull"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请输入收货人'}
                ]"
          label="收货人"
          maxlength="32"
          size="mini"
        >
          <el-input placeholder="请输入收货人" />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          maxlength="32"
          :rules="[{type:'telePhone'},
                    {required:true,message:'请输入收货人电话'}]"
          label="收货人电话"
          size="mini"
        >
          <el-input
            placeholder="请输入收货人电话"
            v-model="form.telPhone"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请输入收货地址'}
                ]"
          maxlength="32"
          label="收货地址"
          size="mini"
        >
          <el-input placeholder="请输入收货地址" />
        </el-form-item>
      </el-col>
      <el-col
        :span="24"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          label="备注"
          prop="bankCard"
          size="mini"
        >
          <el-input
            type="textarea"
            maxlength="140"
            placeholder="请输入备注"
            v-model="form.bankCard"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
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