<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2019-12-25 14:01:25
 * @Description: 新增报价单
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
        <h3 style="flex:1;text-align:center;">报价单配置</h3>
        <div>
          <el-button type="primary" size="mini" @click="commonquotationconfigSave">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form ref="quotationForm" size="mini" :model="quotationForm" :rules="quotationFormRule">
        <d-tabs :style="{maxHeight: maxHeight + 'px'}">
          <d-tab-pane label="基本信息" name="information"></d-tab-pane>
          <d-tab-pane label="配置信息" name="goodsInfo"></d-tab-pane>
        </d-tabs>
        <information :data.sync="quotationForm" id="information"></information>
        <config-info :data.sync="quotationForm" id="goodsInfo"></config-info>
      </el-form>
      <!-- <add-facilitator ref="addFacilitator" :editId="editId" v-if="visible" @refresh="refresh"></add-facilitator> -->
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import information from './components/information'
import configInfo from './components/config-info'
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
  data () {
    return {
      quotationForm: {
        id: '',
        quotationName: '',
        goodName: '',
        commodityId: '',
        commodityCode: '',
        note: '',
        commonQuotationConfigDetailsEntitys: [],
        type: 0
      },
      quotationFormRule: {
        quotationName: { required: true, message: '请输入', trigger: 'blur' },
        goodName: { required: true, message: '请选择', trigger: 'change' },
        serviceTypeList: { required: true, message: '请选择', trigger: 'change' },
        commonQuotationConfigDetailsEntitys: { required: true, message: '请选择', trigger: 'change' }
      },
      loading: false
    }
  },
  components: {
    information,
    configInfo
  },
  computed: {
    maxHeight () {
      return window.innerHeight - 130;
    }
  },
  mounted () {
    this.quotationForm = Object.assign(this.quotationForm, this.detailForm)
    // console.log(this.quotationForm)
  },
  methods: {
    commonquotationconfigSave () {
      this.$refs.quotationForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.quotationForm.id ? 'commonquotationconfigUpdate' : 'commonquotationconfigSave'
          this.$api.seePsiCommonService[method](this.quotationForm).then(res => {
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
