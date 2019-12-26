<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 17:19:40
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2019-12-26 15:25:00
 * @Description: 新增商品
 -->
<template>
  <div class v-loading="loading">
    <el-form
      ref="goodForm"
      :model="goodForm"
      size="small"
      label-position="top"
      :rules="goodFormRules"
      :disabled="disabled"
    >
      <form-card title="商品信息">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="选择类别" prop="categoryCode">
              <d-select v-model="goodForm.categoryCode" dicCode="PSI_SP_KIND"></d-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主分类" prop="firstClassId">
              <el-select class="wfull" v-model="goodForm.firstClassId">
                <el-option
                  :value="item.id"
                  :label="item.className"
                  v-for="(item, index) in firstClassList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="子分类" prop="classId">
              <el-select class="wfull" v-model="goodForm.classId">
                <el-option
                  :value="item.id"
                  :label="item.className"
                  v-for="(item, index) in secondClassList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model.trim="goodForm.name" :maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品规格" prop="values[0].specOne">
              <el-input v-model.trim="goodForm.values[0].specOne" :maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位" prop="unit">
              <!-- <el-input v-model="goodForm.unit" :maxlength="15"></el-input> -->
              <d-select v-model="goodForm.unit" dicCode="SC_JLDW"></d-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品图片" prop="values[0].goodsPic">
              <div class="wfull" style="display:flex;">
                <upload-file
                  class="mr10"
                  v-model="goodForm.values[0].goodsPic"
                  :limit="{type: ['jpg', 'jpeg', 'png']}"
                  v-if="!goodForm.values[0].goodsPic"
                  :size="0.5"
                >
                  <slot>
                    <div style class="ba upload-wrapper">
                      <span class="el-icon-plus" style="font-size:36px;color:#999;"></span>
                    </div>
                  </slot>
                </upload-file>
                <div style class="ba upload-wrapper mr10" v-else>
                  <!-- <img
                    style="width:100%;height:100%;object-fit: cover;"
                    :src="goodForm.values[0].goodsPic"
                  />-->
                  <el-image
                    :src="goodForm.values[0].goodsPic"
                    style="width: 100%;height:100%;"
                    fit="scale-down"
                    :preview-src-list="[goodForm.values[0].goodsPic]"
                  ></el-image>
                </div>
                <p class="d-text-qgray f12" style="display: flex; flex-direction: column">
                  <span>仅支持jpg、jpeg、png格式</span>
                  <span>图片大小500KB以下,推荐分辨率600*600</span>
                  <el-button
                    style="width: 65px;"
                    type="text"
                    @click="goodForm.values[0].goodsPic = ''"
                  >清空图片</el-button>
                </p>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="商品价格">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item prop="values[0].inventoryPrice">
              <div
                slot="label"
                style="flex:1;display: flex;justify-content: space-between;align-items: center;"
              >
                <span>库存成本价</span>
                <el-switch
                  v-model="goodForm.values[0].inventoryPriceConfig"
                  active-text="计算值"
                  inactive-text="固定值"
                  :active-value="1"
                  :inactive-value="2"
                  @change="inventoryChange"
                ></el-switch>
              </div>
              <div style="display: flex;">
                <span
                  v-if="goodForm.values[0].inventoryPriceConfig == 1"
                  style="white-space: nowrap;"
                >{{goodForm.values[0].inventoryPriceFormula}}</span>
                <!-- <span
                  v-if="goodForm.values[0].inventoryPriceConfig == 1"
                >&nbsp;&nbsp; = &nbsp;&nbsp;</span>-->
                <el-input
                  @change="inventoryPriceChange"
                  :disabled="goodForm.values[0].inventoryPriceConfig == 1"
                  v-model.trim="goodForm.values[0].inventoryPrice"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售参考价" prop="values[0].saleReferencePrice">
              <div
                slot="label"
                style="flex:1;display: flex;justify-content: space-between;align-items: center;"
              >
                <span>销售参考价</span>
                <el-switch
                  v-model="goodForm.values[0].saleRefPriceConfig"
                  active-text="计算值"
                  inactive-text="固定值"
                  :active-value="1"
                  :inactive-value="2"
                  @change="salesChange"
                ></el-switch>
              </div>
              <div style="display: flex;">
                <span
                  v-if="goodForm.values[0].saleRefPriceConfig == 1"
                  style="white-space: nowrap;"
                >{{goodForm.values[0].saleRefPriceFormula}}</span>
                <!-- <span v-if="goodForm.values[0].saleRefPriceConfig == 1">&nbsp;&nbsp; = &nbsp;&nbsp;</span> -->
                <el-input
                  @change="saleReferencePriceChange"
                  :disabled="goodForm.values[0].saleRefPriceConfig == 1"
                  v-model.trim="goodForm.values[0].saleReferencePrice"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毛利率" prop="values[0].profitRate">
              <el-input
                :disabled="goodForm.values[0].saleRefPriceConfig == 1"
                @change="profitRateChange"
                v-model.trim="goodForm.values[0].profitRate"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品税率" prop="values[0].taxRate">
              <el-input v-model.trim="goodForm.values[0].taxRate">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="库存预警">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item
              label="最低库存量"
              prop="values[0].minInventoryNum"
              :rules="{validator: validateMinInventoryNum, trigger: 'blur'}"
            >
              <el-input v-model.trim="goodForm.values[0].minInventoryNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="最高库存量"
              prop="values[0].maxInventoryNum"
              :rules="{validator: validateMaxInventoryNum, trigger: 'blur'}"
            >
              <el-input v-model.trim="goodForm.values[0].maxInventoryNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="其他">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="是否启用" prop="values[0].isEnable">
              <el-switch
                v-model="goodForm.values[0].isEnable"
                active-text="开"
                inactive-text="关"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    code: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validateMinInventoryNum = (rule, value, callback) => {
      if (parseFloat(value) > parseFloat(this.goodForm.values[0].maxInventoryNum)) {
        callback(new Error('最低库存量不能大于最高库存量'))
      } else {
        callback()
      }
    }
    const validateMaxInventoryNum = (rule, value, callback) => {
      if (parseFloat(value) < parseFloat(this.goodForm.values[0].minInventoryNum)) {
        callback(new Error('最高库存量不能小于最低库存量'))
      } else {
        callback()
      }
    }
    return {
      validateMinInventoryNum,
      validateMaxInventoryNum,
      loading: false,
      firstClassList: [],
      goodForm: {
        id: '',
        goodsCode: '',
        categoryCode: '',
        firstClassId: '',
        classId: '',
        name: '',
        unit: '',
        columns: '规格',
        brand: 'psi',
        sourceFromCode: 'SP_SOURCE_FROM-1',
        values: [{
          goodsPic: '', // 商品图片
          inventoryPrice: '', // 库存成本价
          isEnable: 1, // 是否启用
          maxInventoryNum: '', // 最大库存
          minInventoryNum: '', // 最小库存
          originalAmount: '', // 期初总金额
          originalCostDifference: '',
          originalInventoryNum: '',
          originalPrice: '',
          originalPriceAdjustment: '',
          profitRate: '',
          saleReferencePrice: '', // 销售参考价
          specOne: '', // 规格
          warehouseId: '', // 库房ID
          taxRate: '', // 税率
          inventoryPriceConfig: 2, // 计算值 or 固定值
          inventoryPriceFormula: '',
          saleRefPriceConfig: 2, // 计算值 or 固定值
          saleRefPriceFormula: '',
          purchaseAvgPrice: 0, // 采购均价
          salesAvgPrice: 0 // 销售均价
        }]
      },
      goodFormRules: {
        categoryCode: { required: true, message: '请选择', trigger: 'change' },
        firstClassId: { required: true, message: '请选择', trigger: 'change' },
        classId: { required: true, message: '请选择', trigger: 'change' },
        name: { required: true, message: '请输入', trigger: 'blur' },
        unit: { required: true, message: '请选择', trigger: 'change' },
        'values[0].specOne': { required: true, message: '请输入', trigger: 'blur' },
        'values[0].inventoryPrice': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ],
        'values[0].profitRate': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ],
        'values[0].taxRate': [
          { required: true, message: '请输入', trigger: 'blur' },
          {
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
          }
        ],
        'values[0].saleReferencePrice': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ],
        'values[0].isEnable': { required: true, message: '请选择', trigger: 'change' },
        'values[0].warehouseId': { required: true, message: '请选择', trigger: 'change' },
        'values[0].originalInventoryNum': [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /^\d{1,11}?$/, message: '请输入正整数', trigger: 'blur' }],
        'values[0].originalPrice': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ],
        'values[0].originalPriceAdjustment': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ],
        'values[0].minInventoryNum': { pattern: /^\d{1,11}?$/, message: '请输入正整数', trigger: 'blur' },
        'values[0].maxInventoryNum': { pattern: /^\d{1,11}?$/, message: '请输入正整数', trigger: 'blur' }
      },
      classInfo: null
    }
  },
  components: {
  },
  computed: {
    // 二级分类列表
    secondClassList () {
      const temp = this.firstClassList.find(item => item.id === this.goodForm.firstClassId)
      return temp ? temp.children : []
    },
    // 分类计算公式
    classConfig () {
      return this.secondClassList.find(item => item.id === this.goodForm.classId)
    },
    // 价格分类 计算值 or 固定值
    priceConfig () {
      const { inventoryPriceConfig, saleRefPriceConfig } = this.goodForm.values[0] || {}
      return { inventoryPriceConfig, saleRefPriceConfig, classConfig: this.classConfig }
    }
  },
  mounted () {
    if (this.code) {
      this.getGoodsDetailV2(this.code)
    }
  },
  methods: {
    // 库存成本价 计算值切换
    inventoryChange (value) {
      if (value === 1 && this.goodForm.classId) {
        this.handleInventoryConfig()
      } else {
        this.goodForm.values[0].inventoryPrice = 0
        this.inventoryPriceChange()
      }
    },
    // 处理库存成本价
    handleInventoryConfig () {
      const temp = this.goodForm.values[0]
      this.goodForm.values[0].inventoryPriceFormula = `${temp.purchaseAvgPrice || 0} * ${this.classConfig.inventoryPriceFormulaRatio} + ${this.classConfig.inventoryPriceFormulaFixedValue} = `
      this.goodForm.values[0].inventoryPrice = ((temp.purchaseAvgPrice || 0) * this.classConfig.inventoryPriceFormulaRatio + this.classConfig.inventoryPriceFormulaFixedValue).toFixed(2)
      this.inventoryPriceChange()
    },
    // 销售参考价 计算值切换
    salesChange (value) {
      if (value === 1 && this.goodForm.classId) {
        this.handleSalesConfig()
      } else {
        this.goodForm.values[0].saleReferencePrice = 0
        this.saleReferencePriceChange()
      }
    },
    // 处理销售参考价
    handleSalesConfig () {
      const temp = this.goodForm.values[0]
      this.goodForm.values[0].saleRefPriceFormula = `${temp.salesAvgPrice || 0} * ${this.classConfig.saleRefPriceFormulaRatio} + ${this.classConfig.saleRefPriceFormulaFixedValue} = `
      this.goodForm.values[0].saleReferencePrice = ((temp.salesAvgPrice || 0) * this.classConfig.saleRefPriceFormulaRatio + this.classConfig.saleRefPriceFormulaFixedValue).toFixed(2)
      this.saleReferencePriceChange()
    },
    // 获取详情
    getGoodsDetailV2 (code) {
      this.goodForm = Object.assign(this.goodForm, {})
      this.$api.seeGoodsService.getGoodsDetailV2({ code }).then(res => {
        this.isDetail = true
        this.goodForm = Object.assign(this.goodForm, res.data);
        this.goodForm.firstClassId = res.data.firstClassId
        this.goodForm.classId = res.data.secondClassId
        // this.goodForm.columns = '规格'
        this.$emit('update', this.goodForm)
      })
    },
    // 库存成本价改变
    inventoryPriceChange () {
      const temp = this.goodForm.values[0]
      if (temp.saleReferencePrice && temp.inventoryPrice) {
        this.goodForm.values[0].profitRate = ((temp.saleReferencePrice / temp.inventoryPrice - 1) * 100).toFixed(2)
      } else {
        this.goodForm.values[0].profitRate = temp.inventoryPrice ? 0 : 100
      }
    },
    // 销售参考价改变
    saleReferencePriceChange () {
      const temp = this.goodForm.values[0]
      if (temp.inventoryPrice) {
        this.goodForm.values[0].profitRate = ((temp.saleReferencePrice / temp.inventoryPrice - 1) * 100).toFixed(2)
      } else {
        this.goodForm.values[0].profitRate = temp.saleReferencePrice ? 100 : 0
      }
    },
    // 毛利率改变
    profitRateChange () {
      const temp = this.goodForm.values[0]
      // temp.profitRate / 100 + 1 * temp.inventoryPrice
      this.goodForm.values[0].saleReferencePrice = ((temp.profitRate / 100 + 1) * temp.inventoryPrice).toFixed(2)
    },
    saveGood () {
      this.$refs.goodForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.isEdit ? 'editGoodsInfoV2' : 'saveGoodsInfo'
          this.$api.seeGoodsService[method](this.goodForm).then(res => {
            this.$emit('refresh')
          }).finally(() => { this.loading = false })
        }
      })
    },
    // 获取分类列表
    getGoodsClass () {
      this.$api.seeGoodsService.getGoodsClass({ categoryCode: this.goodForm.categoryCode }).then(res => {
        this.firstClassList = res.data
        if (!this.isDetail) {
          this.goodForm.classId = null
        }
        this.isDetail = false
      })
    }
  },
  watch: {
    'goodForm.categoryCode': {
      handler (newValue) {
        if (!this.isDetail) {
          this.goodForm.firstClassId = null
        }
        this.getGoodsClass()
      }
    },
    'goodForm.firstClassId': {
      handler (newValue) {
        if (!this.isDetail) {
          this.goodForm.classId = null
        }
      }
    },
    'goodForm.classId': {
      handler (newValue) {
        const temp = this.secondClassList.find(item => item.id === newValue)
        this.goodForm.values[0].taxRate = temp ? temp.taxRate : this.goodForm.values[0].taxRate
        if (this.classConfig) {
          if (this.goodForm.values[0].inventoryPriceConfig === 1) {
            this.handleInventoryConfig()
          }
          if (this.goodForm.values[0].saleRefPriceConfig === 1) {
            this.handleSalesConfig()
          }
        }
      }
    },
    priceConfig () {
      if (this.classConfig) {
        if (this.goodForm.values[0].inventoryPriceConfig === 1) {
          this.handleInventoryConfig()
        }
        if (this.goodForm.values[0].saleRefPriceConfig === 1) {
          this.handleSalesConfig()
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-form--label-top .el-form-item__label {
  width: 100%;
  display: flex;
}
.upload-wrapper {
  width: 100px;
  height: 100px;
  background: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  overflow: hidden;
}
</style>
