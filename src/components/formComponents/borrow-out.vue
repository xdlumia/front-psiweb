/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:10:46
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 15:39:22
 * @Description: 借出信息
*/
<template>
  <form-card title="借出信息">
    <el-row>
      <el-col :span="8" class="pl5 pr5 pb5">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="借出类型" prop size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">借出</div>
          <el-select class="wfull" placeholder="请选择" v-else v-model="form.bankCard">
            <el-option label="借出" value="借出"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="pl5 pr5 pb5">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="借出库房" prop size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">库房A</div>
          <el-select class="wfull" placeholder="请选择" v-else v-model="form.bankCard">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="pl5 pr5 pb5">
        <el-form-item :rules="[ 
            {required:true,message:'必填项'}
        ]" label="借出方" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">北京凡特仁</div>
          <div v-else>
            <el-input placeholder="请输入借出方" />
            <div>
              <ChooseManSelect />
            </div>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="pl5 pr5 pb5">
        <el-form-item label="物流费用" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">500</div>
          <el-input placeholder="请输入物流费用" type="number" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="pl5 pr5 pb5">
        <el-form-item label="备注" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!editable"></div>
          <el-input placeholder="请输入备注" type="textarea" v-else />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
import ChooseManSelect from './choose-man-select';

export default {
  components: {
    ChooseManSelect
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    editable: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
