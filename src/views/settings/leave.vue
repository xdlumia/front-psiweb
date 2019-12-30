<template>
  <div>
    <el-dialog
      :width="width"
      title="请假"
      :visible="visible"
      :append-to-body='appendToBody'
      @close="close"
      destroy-on-close
      v-loading="loading"
      v-dialogDrag
    >
      <el-form
        label-position="top"
        size="small"
        :model="form"
        ref="form"
      >
        <el-row
          class="mt10 mb10"
          :gutter="40"
        >
          <el-col :span="12">
            <el-form-item
              label="请假开始时间"
              prop="beginTime"
              :rules="{ required: true, message: '请选择请假开始时间', trigger: 'blur' }"
            >
              <el-date-picker
                v-model="form.beginTime"
                class="wfull"
                type="datetime"
                placeholder="请选择"
                @change="timeChange"
                :picker-options="beginTimeOptions"
                value-format="timestamp"
                :disabled="isDisabled"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="请假结束时间"
              prop="endTime"
              :rules="{ required: true, message: '请选择请假结束时间', trigger: 'blur' }"
              :disabled="isDisabled"
            >
              <el-date-picker
                v-model="form.endTime"
                class="wfull"
                type="datetime"
                placeholder="请选择"
                @change="timeChange"
                :picker-options="endTimeOptions"
                value-format="timestamp"
                :disabled="isDisabled"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="工作交接人"
              prop="workHandoverName"
              :rules="{required:true}"
            >
              <employees-chosen
                :closeOnSelect="false"
                :multiple="false"
                @input="chooseAssemble"
                :excludeList="excludeList"
                class="d-inline"
                style="width:100%"
              >
                <el-input
                  :disabled="isDisabled"
                  :value="form.workHandoverName"
                  size="mini"
                ></el-input>
              </employees-chosen>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item
              label="请假事由"
              prop="reasons"
            >
              <el-input
                v-model="form.reasons"
                type="textarea"
                maxlength="300"
                show-word-limit
                placeholder="请输入"
                :disabled="isDisabled"
              />
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>

      <div
        class="d-center pb20"
        v-if="!isDisabled"
      >
        <el-button
          size="small"
          type="primary"
          @click="submit"
        >确 定</el-button>
        <el-button
          size="small"
          @click="close"
        >取 消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
const parseTime = (time, cFormat) => {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
const toDayTime = new Date(`${parseTime(Date.now(), '{y}-{m}-{d}')} 00:00:00`).getTime()
const oneHour = 60 * 60 * 1000
export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '650px'
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    disabled: Boolean
  },
  data() {
    return {
      loading: false,
      form: {
        beginTime: '', // 请假开始时间
        endTime: '',    // 请假结束时间
        workHandoverMan: '', // 交接人id
        workHandoverName: '',
        deptId: this.$local.fetch('userInfo').deptId, // 部门id
        reasons: '', // 请假事由
        submitType: 0, // 提交方式
      },
      excludeList: [],
      beginTimeOptions: {
        disabledDate: (time) => {
          if (!this.form.endTime) {
            return time.getTime() < toDayTime
          } else {
            return time.getTime() < toDayTime || time.getTime() > this.form.endTime
          }
        }
      },
      endTimeOptions: {
        disabledDate: (time) => {
          if (!this.form.beginTime) {
            return time.getTime() < toDayTime
          } else {
            return new Date(`${parseTime(time, '{y}-{m}-{d}')} 23:59:59`).getTime() < this.form.beginTime
          }
        }
      }
    }
  },
  computed: {
    isDisabled() { // 已撤销的可重新编辑提交申请
      return (this.disabled && this.formData.processStatus != 5)
        || (this.formData.creator != this.$local.fetch('userInfo').userId && this.formData.processStatus == 5)
    }
  },
  created() {
    this.formData.formData && (this.form = JSON.parse(this.formData.formData))
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    // 更改时间
    timeChange() {
      if (this.form.beginTime && this.form.endTime) {
        this.getInvalidHandoverUserIdList()
      }
    },
    // 根据请假开始时间和结束时间查询不可用交接人用户id列表
    getInvalidHandoverUserIdList() {
      let params = {
        startTime: this.form.beginTime,
        endTime: this.form.endTime,
      }
      this.$api.seeOaService.absenceapplicationGetInvalidHandoverUserIdList(params)
        .then(res => {
          this.excludeList = res.data || []
          // 如果是先选择了人.后选择时间 如果有冲突的交接人就会清空当前交接人
          if (this.excludeList.includes(Number(this.form.workHandoverMan || ''))) {
            this.form.workHandoverName = '';
            this.form.workHandoverMan = '';
          }
        })
    },
    //选择组装人员
    chooseAssemble(value) {
      this.form.workHandoverName = value.employeeName;
      this.form.workHandoverMan = value.userId;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            ...this.form,
          }
          if ((params.endTime - params.beginTime) < oneHour) {
            return this.$message.error('请假时间最小为一小时');
          }
          this.loading = true
          this.$api.seeOaService.absenceapplicationSave(params).then(res => {
            if (res.code == 200) {
              this.close()
              this.$emit('reload')
            }
          }).finally(() => {
            this.loading = false
          })
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

