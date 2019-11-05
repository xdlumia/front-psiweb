<!--
 * @Author: 高大鹏
 * @Date: 2019-11-04 11:32:03
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-05 17:38:26
 * @Description: 新增提成报表
 -->
<template>
  <div class v-loading="loading">
    <el-form
      :model="userForm"
      size="small"
      label-width="80px"
      label-position="right"
      :rules="userFormRule"
      ref="userForm"
    >
      <el-form-item label="选择员工" prop="employeeId">
        <employees-chosen
          v-model="employee"
          :isEdit="true"
          :multiple="false"
          :closeOnSelect="false"
          @input="choseUser"
        >
          <el-input :value="userForm.employeeName"></el-input>
        </employees-chosen>
      </el-form-item>
      <el-form-item label="底薪" prop="basePay">
        <el-input v-model.trim="userForm.basePay">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="提成比例" prop="commission">
        <el-input v-model.trim="userForm.commission">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item class="ac">
        <el-button type="primary" @click="commonsystemreportSave">确定</el-button>
        <el-button @click="$emit('cancel')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      loading: false,
      employee: null,
      userForm: {
        id: '',
        employeeId: '',
        employeeName: '',
        basePay: '',
        commission: ''
      },
      userFormRule: {
        employeeId: { required: true, message: '请选择', trigger: 'change' },
        basePay: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入正整数，小数点后两位', trigger: 'blur' }
        ],
        commission: [{ required: true, message: '请输入', trigger: 'blur' }, {
          validator: (rule, value, callback) => {
            if (value > 100 || value < 0) {
              callback(new Error('请输入0-100，两位小数'))
            } else if (Number(value) === 100) {
              callback()
            } else if (!/^\d{1,2}(\.\d{1,2})?$/.test(value)) {
              callback(new Error('请输入0-100，两位小数'))
            } else {
              callback()
            }
          }
        }]
      }

    }
  },
  props: {
    editId: {
      type: Number,
      default: null
    }
  },
  components: {
  },
  mounted() {
    if (this.editId) {
      this.commonsystemreportInfo(this.editId)
    }
  },
  methods: {
    commonsystemreportInfo(id) {
      this.$api.seePsiCommonService.commonsystemreportInfo(null, id).then(res => {
        Object.keys(this.userForm).forEach(key => {
          this.userForm[key] = res.data[key] || this.userForm[key]
        })
      })
    },
    choseUser() {
      const { userId, employeeName } = this.employee
      this.userForm.employeeId = userId
      this.userForm.employeeName = employeeName
    },
    commonsystemreportSave() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.editId ? 'commonsystemreportUpdate' : 'commonsystemreportSave'
          this.$api.seePsiCommonService[method](this.userForm).then(res => {
            this.$emit('refresh')
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
