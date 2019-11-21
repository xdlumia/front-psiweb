/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 16:47:16
 * @Description: 付款申请
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>付款申请</span>
      <span class="fr mr20"></span>
    </div>
    <div>
      <el-form :model="form">
        <form-card>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item :rules="[
            {required:true,message:'必填项'}
            ]" label="预付金额" size="mini">
                <el-input v-model="form.data"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[
            {required:true,message:'必填项'}
            ]" label="应付金额" size="mini">
                <el-input v-model="form.data"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[
            {required:true,message:'必填项'}
            ]" label="付款时间" size="mini">
                <el-input v-model="form.data"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[
            {required:true,message:'必填项'}
            ]" label="申请付款金额" size="mini">
                <el-input v-model="form.data"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </form-card>
      </el-form>
    </div>
    <div class="ac" slot="footer">
      <el-button @click="close" size="mini" type="primary">保存</el-button>
      <el-button @click="close" size="mini">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    from: String // 来源
  },
  computed: {
    
  },
  data() {
    return {
      form: {},
      activeName: '',
      randomStr: +new Date() + '-' + Math.random()
    };
  },
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>