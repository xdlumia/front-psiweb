/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-11 15:50:55
 * @Description: 转移
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="转移"
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
        :rules="[  
              {required:true,message:'必填项',trigger: 'input',}
          ]"
        label="转移给："
        prop="pickingPerson"
        size="mini"
      >
        <employees-chosen
          :closeOnSelect="false"
          :multiple="false"
          @input="chooseChai"
          class="d-inline"
          style="width:100%"
        >
          <el-input
            style="width:50%"
            :value="employeeName"
            size="mini"
          ></el-input>
        </employees-chosen>
      </el-form-item>
      <el-form-item
        label="转移原因："
        prop="desc"
      >
        <el-input
          type="textarea"
          v-model="ruleForm.hangUpNote"
          max='300'
          placeholder="请输入"
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
        assemblePerson: '',
        assembleTaskCode: '',
        hangUpNote: ''
      },
      employeeName: '',
      rules: {
        assemblePerson: [
          { required: true, message: '请选择转移对象', trigger: 'blur' },
        ],
        hangUpNote: [
          { required: true, message: '请填写转移原因', trigger: 'blur' },
          { min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() { },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    //选择组装人
    chooseChai(value) {
      this.employeeName = value.employeeName;
      this.ruleForm.assemblePerson = value.userId;
    },
    submit() {
      this.ruleForm.id = this.data.id
      this.$api.seePsiWmsService.wmsassembletaskTransferTask(this.ruleForm)
        .then(res => {
          this.$emit('reload')
          this.close()
        })
        .finally(() => {
        })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>