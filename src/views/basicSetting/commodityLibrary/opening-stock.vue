<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
<<<<<<< HEAD
 * @LastEditTime: 2019-12-20 09:24:19
=======
 * @LastEditTime: 2019-12-20 09:32:00
>>>>>>> hotfix
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
      title="期初库存"
    >
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">期初库存</h3>
        <div>
          <el-button type="primary" size="mini" @click="wmsinventorydetailInitializePutaway">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form ref="beginnForm" size="mini" :model="beginnForm" :rules="beginnFormRule">
        <form-card title="期初信息">
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="库房" prop="wmsId">
                <el-select
                  class="wfull"
                  v-model="beginnForm.wmsId"
                  :disabled="!!($refs.lossesCode && $refs.lossesCode.tableData.length)"
                >
                  <el-option
                    :value="item.id"
                    :label="item.name"
                    v-for="(item, index) in warehouseList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="期初调价值（元）" prop="originalPriceAdjustment">
                <el-input v-model="beginnForm.originalPriceAdjustment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="期初调价差异额" prop="originalCostDifference">
                <el-input v-model="originalCostDifference" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </form-card>
        <losses-code ref="lossesCode" :data="beginnForm" :rowData="rowData" :wmsName="wmsName"></losses-code>
      </el-form>
      <!-- <add-facilitator ref="addFacilitator" :editId="editId" v-if="visible" @refresh="refresh"></add-facilitator> -->
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import lossesCode from './losses-code'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      warehouseList: [],
      beginnForm: {
        commodityCode: '',
        wmsId: '',
        commodityList: [],
        num: '',
        originalPriceAdjustment: ''
      },
      beginnFormRule: {
        commodityList: { required: true, message: '请选择', trigger: 'change' },
        promotionName: { required: true, message: '请输入', trigger: 'blur' },
        wmsId: { required: true, message: '请选择', trigger: 'change' },
        promotionTarget: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ],
        commonPromotionGoalPersonnelEntities: { required: true, message: '请选择', trigger: 'change' },
        originalPriceAdjustment: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[-+]?\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  components: {
    lossesCode
  },
  computed: {
    maxHeight () {
      return window.innerHeight - 130;
    },
    wmsName () {
      const temp = this.warehouseList.find(item => item.id === this.beginnForm.wmsId)
      return temp ? temp.name : ''
    },
    originalCostDifference () {
      return (this.beginnForm.originalPriceAdjustment * ((this.$refs.lossesCode && this.$refs.lossesCode.tableData.length) || 0)).toFixed(2)
    }
  },
  mounted () {
    this.commonwmsmanagerUsableList()
    console.log(this.$refs.lossesCode)
  },
  methods: {
    // 可用库房列表
    commonwmsmanagerUsableList () {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList().then(res => {
        this.warehouseList = res.data
      })
    },
    wmsinventorydetailInitializePutaway () {
      this.$refs.beginnForm.validate(valid => {
        if (valid) {
          if (!this.$refs.lossesCode.tableData.length) {
            this.$message.error('请至少扫一个SN码或机器号')
            return
          }
          this.beginnForm.commodityList = this.$refs.lossesCode.tableData
          this.beginnForm.num = this.$refs.lossesCode.tableData.length
          this.beginnForm.commodityCode = this.rowData.goodsCode
          this.$api.seePsiWmsService.wmsinventorydetailInitializePutaway(this.beginnForm).then(res => {
            this.$emit('inStorageSuccess')
            this.$emit('update:visible', false)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
