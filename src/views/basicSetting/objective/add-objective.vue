<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-08 14:29:53
 * @Description: 新增目标
 -->
<template>
  <div class>
    <el-dialog
      v-loading="loading"
      :visible.sync="visible"
      v-dialogDrag
      :show-close="false"
      width="1000px"
      title="新增库房"
    >
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">目标</h3>
        <div>
          <el-button type="primary" size="mini" @click="commonpromotiongoalSave">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form ref="objectiveForm" size="mini" :model="objectiveForm" :rules="objectiveFormRule">
        <d-tabs :style="{maxHeight: maxHeight + 'px'}">
          <d-tab-pane label="目标信息" name="information"></d-tab-pane>
          <d-tab-pane label="参与人员" name="usersInfo"></d-tab-pane>
          <d-tab-pane label="备注信息" name="extrasInfo"></d-tab-pane>
          <!-- 基本信息 -->
          <information :data="objectiveForm" id="information"></information>
          <!-- 参与人员 -->
          <users-info ref="usersInfo" :data="objectiveForm" id="usersInfo"></users-info>
          <!-- 备注信息 -->
          <extras-info :data="objectiveForm" id="extrasInfo" />
        </d-tabs>
      </el-form>
      <!-- <add-facilitator ref="addFacilitator" :editId="editId" v-if="visible" @refresh="refresh"></add-facilitator> -->
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import information from './components/information'
import usersInfo from './components/users-info'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      objectiveForm: {
        id: '',
        begTime: '',
        endTime: '',
        promotionName: '',
        sumMoney: '',
        sumUserNum: '',
        datetimerange: [],
        commonPromotionGoalPersonnelEntities: []
      },
      objectiveFormRule: {
        promotionName: { required: true, message: '请输入', trigger: 'blur' },
        datetimerange: { required: true, message: '请选择', trigger: 'change' },
        promotionTarget: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入正整数，小数点后两位', trigger: 'blur' }
        ],
        commonPromotionGoalPersonnelEntities: { required: true, message: '请选择', trigger: 'change' }
      },
      loading: false
    }
  },
  components: {
    information,
    usersInfo
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  mounted() {
    this.objectiveForm = Object.assign(this.objectiveForm, this.detailForm)
  },
  methods: {
    commonpromotiongoalSave() {
      this.$refs.objectiveForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.objectiveForm.sumMoney = this.$refs.usersInfo.sumMoney
          const method = this.objectiveForm.id ? 'commonpromotiongoalUpdate' : 'commonpromotiongoalSave'
          this.$api.seePsiCommonService[method](this.objectiveForm).then(res => {
            this.$emit('refresh')
            this.$emit('update:visible', false)
          }).finally(() => { this.loading = false })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
