<template>
  <div v-loading="loading">
    <el-form label-position="labelPosition" :model="formData" ref="form" label-width="100px"
             :disabled="popupRight.formState === 3" class="demo-ruleForm mt10" size="small">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" class="ml10 mr5" prop='userName'
                        :rules="{required:true, message: '请输入姓名', trigger: 'blur'}">
            <el-input v-model="formData.userName" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" class="ml10 mr5" prop='sex'>
            <el-radio-group v-model="formData.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号" class="ml10 mr5" prop='phone'
                        :rules="[{required:true, message: '请输入手机号', trigger: 'blur'}, {type: 'phone', message: '手机号格式不正确', trigger: 'blur'}]">
            <el-input v-model="formData.phone" type='number' placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" class="ml10 mr5" prop='idCard'
                        :rules="[{required:true, message: '请输入身份证号', trigger: 'blur'}, {type: 'IDCard', message: '身份证号格式不正确', trigger: 'blur'}]">
            <el-input v-model="formData.idCard" type='number' placeholder="请输入身份证号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="政治面貌" class="ml10 mr5" prop='politicalStatus'
                        :rules="{required:true, message: '请输入姓名', trigger: 'blur'}">
            <d-select dic-code="EX_POLITICAL_STATUS" v-model="formData.politicalStatus"
                      placeholder="请选择文化程度"></d-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文化程度" class="ml10 mr5" prop='highestDegree'>
            <d-select dic-code="EX_HIGHEST_DEGREE" v-model="formData.highestDegree" placeholder="请选择文化程度"></d-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

export default {
  props: [
    'userId',
    'popupRight'
  ],
  data () {
    return {
      labelPosition: 'top',
      loading: false,
      formData: {
        userName: '',
        sex: 1,
        politicalStatus: '',
        highestDegree: ''
      }
    }
  },
  computed: {},
  components: {},
  created () {
    if (this.popupRight.formState !== 1) {
      this.loadUserData()
    }
  },
  watch: {},
  methods: {
    loadUserData () {
      this.loading = true

      this.$api.exampleService.userInfo(this.popupRight.id).then((res) => {
        this.formData = res.data
      }).finally(() => {
        this.loading = false
      })
    },
    saveOrUpdate () {
      return this.$refs.form.validate().then(() => {
        this.loading = true
        let saveOrUpdateFn = this.popupRight.formState === 1 ? this.$api.exampleService.addUser : this.$api.exampleService.updateUser

        return saveOrUpdateFn(this.formData).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>
