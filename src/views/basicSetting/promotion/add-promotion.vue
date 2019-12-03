<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-03 10:41:01
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
        <h3 style="flex:1;text-align:center;">促销</h3>
        <div>
          <el-button type="primary" size="mini" @click="commonpromotionSave">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form ref="promotionForm" size="mini" :model="promotionForm"
:rules="promotionFormRule">
        <d-tabs :style="{maxHeight: maxHeight + 'px'}">
          <d-tab-pane label="促销信息" name="information"></d-tab-pane>
          <d-tab-pane label="参与商品" name="goodsInfo"></d-tab-pane>
          <d-tab-pane label="参与人员" name="usersInfo"></d-tab-pane>
          <d-tab-pane label="备注信息" name="extrasInfo"></d-tab-pane>
          <!-- 基本信息 -->
          <information :data="promotionForm" id="information"></information>
          <!-- 商品信息 -->
          <goods-info :data="promotionForm" id="goodsInfo"></goods-info>
          <!-- 参与人员 -->
          <users-info :data="promotionForm" id="usersInfo"></users-info>
          <!-- 备注信息 -->
          <extras-info :data="promotionForm" id="extrasInfo" />
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
      promotionForm: {
        id: '',
        begTime: '',
        endTime: '',
        promotionName: '',
        promotionTarget: '',
        commodityNum: '',
        userNum: '',
        datetimerange: [],
        commonPromotionCommodityDetailsEntities: [],
        commonPromotionPersonnelEntities: [],
        note: '',
        attachList: []
      },
      promotionFormRule: {
        promotionName: { required: true, message: '请输入', trigger: 'blur' },
        datetimerange: { required: true, message: '请选择', trigger: 'change' },
        promotionTarget: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ],
        commonPromotionPersonnelEntities: { required: true, message: '请选择', trigger: 'change' },
        commonPromotionCommodityDetailsEntities: { required: true, message: '请选择', trigger: 'change' }
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
    this.promotionForm = Object.assign(this.promotionForm, this.detailForm)
  },
  methods: {
    commonpromotionSave() {
      this.$refs.promotionForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.promotionForm.id ? 'commonpromotionUpdate' : 'commonpromotionSave'
          this.$api.seePsiCommonService[method](this.promotionForm).then(res => {
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
