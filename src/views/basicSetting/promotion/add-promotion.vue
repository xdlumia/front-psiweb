<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-06 18:07:15
 * @Description: 新增促销
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
        <h3 style="flex:1;text-align:center;">新增服务商</h3>
        <div>
          <el-button type="primary" size="mini" @click="commonserviceproviderSave">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form
        ref="facilitatorForm"
        size="mini"
        :model="facilitatorForm"
        :rules="facilitatorFormRule"
      >
        <d-tabs :style="{maxHeight: maxHeight + 'px'}">
          <d-tab-pane label="促销信息" name="information"></d-tab-pane>
          <d-tab-pane label="参与商品" name="goodsInfo"></d-tab-pane>
          <d-tab-pane label="参与人员" name="usersInfo"></d-tab-pane>
          <d-tab-pane label="备注信息" name="extrasInfo"></d-tab-pane>
          <!-- 基本信息 -->
          <information :data="facilitatorForm" id="information"></information>
          <!-- 商品信息 -->
          <goods-info :data="facilitatorForm" id="goodsInfo"></goods-info>
          <!-- 参与人员 -->
          <users-info :data="facilitatorForm" id="usersInfo"></users-info>
          <!-- 备注信息 -->
          <extras-info :data="facilitatorForm" id="extrasInfo" />
        </d-tabs>
      </el-form>
      <!-- <add-facilitator ref="addFacilitator" :editId="editId" v-if="visible" @refresh="refresh"></add-facilitator> -->
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import information from './components/information'
import goodsInfo from './components/goods-info'
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
      facilitatorForm: {
        id: '',
        serviceName: '',
        serviceTypeList: [],
        serviceType: '',
        linkMan: '',
        phone: '',
        receiptBank: '',
        shroffAccountNum: '',
        serviceGrade: '',
        trade: '',
        source: '',
        address: '',
        attachList: []
      },
      facilitatorFormRule: {
        serviceName: { required: true, message: '请输入', trigger: 'blur' },
        serviceTypeList: { required: true, message: '请选择', trigger: 'change' },
        linkMan: { required: true, message: '请输入', trigger: 'blur' },
        phone: { required: true, message: '请输入', trigger: 'blur' },
        receiptBank: { required: true, message: '请输入', trigger: 'blur' },
        shroffAccountNum: { required: true, message: '请输入', trigger: 'blur' },
        serviceGrade: { required: true, message: '请选择', trigger: 'change' },
        trade: { required: true, message: '请选择', trigger: 'change' },
        source: { required: true, message: '请选择', trigger: 'change' },
        address: { required: true, message: '请输入', trigger: 'blur' }
      },
      loading: false
    }
  },
  components: {
    information,
    goodsInfo,
    usersInfo
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  mounted() {
    this.facilitatorForm = Object.assign(this.facilitatorForm, this.detailForm)
  },
  methods: {
    commonserviceproviderSave() {
      this.$refs.facilitatorForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.facilitatorForm.id ? 'commonserviceproviderUpdate' : 'commonserviceproviderSave'
          this.facilitatorForm.serviceType = this.facilitatorForm.serviceTypeList.join(',')
          this.$api.seePsiCommonService[method](this.facilitatorForm).then(res => {
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
