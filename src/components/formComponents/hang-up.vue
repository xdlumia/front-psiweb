/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 挂起
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="挂起"
    @close='close'
    v-dialogDrag
    width='40%'
  >
    <el-form
      size='small'
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="挂起原因："
        prop="desc"
      >
        <el-input
          type="textarea"
          v-model="ruleForm.desc"
          max='300'
          placeholder="请输入最少五个字符"
        ></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >

      <el-button
        type="primary"
        @click="submit"
        size="small"
      >确 定</el-button>
      <el-button
        @click="close"
        size="small"
      >取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {}
  },
  watch: {
  },
  computed: {
  },
  data() {
    return {
      ruleForm: {
        name: '',
        desc: ''
      },
      rules: {
        desc: [
          { required: true, message: '请填写挂起原因', trigger: 'blur' },
          { min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() { },
  methods: {
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$api.seePsiWmsService.wmsdisassemblytaskHangTask({ hangCause: this.ruleForm.desc, id: this.data.id, isHang: 1 })
            .then(res => {
              this.$emit('reload')
              this.close()
            })
            .finally(() => {

            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    close() {
      this.$emit('update:visible', false)
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>