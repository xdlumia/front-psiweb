/*
 * @Author: 徐贺
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 17:20:29
 * @Description: 盘点信息 公共
*/
<template>
  <form-card title="盘点信息">
    <el-row>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择盘点库房'}
                ]"
          label="盘点库房"
          prop
          size="mini"
        >
          <el-select
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          style="wfull"
          :rules="[ 
                    {required:true,message:'请选择盘点人'}
                ]"
          label="盘点人"
          prop
          size="mini"
        >
          <commoditySelector
            style="wfull"
            :disabled='disabled'
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择盘点类型'}
                ]"
          label="盘点类型"
          prop
          size="mini"
        >
          <el-select
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
            :disabled='disabled'
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
import commoditySelector from '@/components/formComponents/commodity-selector';

export default {
  props: {
    form: {
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
  },
  components: {
    commoditySelector
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-form-item__content .d-inline {
  width: 100%;
}
/deep/.el-form-item__content .d-inline .el-select {
  width: 100%;
}
</style>