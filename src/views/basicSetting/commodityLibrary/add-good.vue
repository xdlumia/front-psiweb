<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 17:19:40
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-25 10:12:19
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
              <el-input v-model="goodForm.name" :maxlenght="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品规格" prop="values[0].specOne">
              <el-input v-model="goodForm.values[0].specOne" :maxlenght="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位" prop="unit">
              <!-- <el-input v-model="goodForm.unit" :maxlenght="15"></el-input> -->
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
            <el-form-item label="库存成本价" prop="values[0].inventoryPrice">
              <el-input @change="inventoryPriceChange" v-model="goodForm.values[0].inventoryPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售参考价" prop="values[0].saleReferencePrice">
              <el-input
                @change="saleReferencePriceChange"
                v-model="goodForm.values[0].saleReferencePrice"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毛利率" prop="values[0].profitRate">
              <el-input @change="profitRateChange" v-model="goodForm.values[0].profitRate">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品税率" prop="values[0].taxRate">
              <el-input v-model="goodForm.values[0].taxRate" disabled>
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="库存预警">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="最低库存量" prop="values[0].minInventoryNum">
              <el-input v-model="goodForm.values[0].minInventoryNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最高库存量" prop="values[0].maxInventoryNum">
              <el-input v-model="goodForm.values[0].maxInventoryNum"></el-input>
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
      <form-card title="期初库存（重要）" v-if="false">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="库房" prop="values[0].warehouseId">
              <el-select class="wfull" v-model="goodForm.values[0].warehouseId">
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
            <el-form-item label="期初库存数量" prop="values[0].originalInventoryNum">
              <el-input v-model="goodForm.values[0].originalInventoryNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初库存成本（元）" prop="values[0].originalPrice">
              <el-input v-model="goodForm.values[0].originalPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初调价值（元）" prop="values[0].originalPriceAdjustment">
              <el-input v-model="goodForm.values[0].originalPriceAdjustment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初调价差异额" prop="values[0].originalCostDifference">
              <el-input v-model="goodForm.values[0].originalCostDifference" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初总金额" prop="values[0].originalAmount">
              <el-input v-model="goodForm.values[0].originalAmount" disabled></el-input>
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
  data() {
    return {
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
        values: [{
          goodsPic: '',
          inventoryPrice: '',
          isEnable: 1,
          maxInventoryNum: '',
          minInventoryNum: '',
          originalAmount: '',
          originalCostDifference: '',
          originalInventoryNum: '',
          originalPrice: '',
          originalPriceAdjustment: '',
          profitRate: '',
          saleReferencePrice: '',
          specOne: '',
          warehouseId: '',
          taxRate: ''
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
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入正整数，小数点后两位', trigger: 'blur' }
        ],
        'values[0].profitRate': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入正整数，小数点后两位', trigger: 'blur' }
        ],
        'values[0].taxRate': { required: true, message: '请输入', trigger: 'blur' },
        'values[0].saleReferencePrice': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入正整数，小数点后两位', trigger: 'blur' }
        ],
        'values[0].isEnable': { required: true, message: '请选择', trigger: 'change' },
        'values[0].warehouseId': { required: true, message: '请选择', trigger: 'change' },
        'values[0].originalInventoryNum': [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /^\d{1,11}?$/, message: '请输入正整数', trigger: 'blur' }],
        'values[0].originalPrice': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入正整数，小数点后两位', trigger: 'blur' }
        ],
        'values[0].originalPriceAdjustment': [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入正整数，小数点后两位', trigger: 'blur' }
        ],
        'values[0].minInventoryNum': { pattern: /^\d{1,11}?$/, message: '请输入正整数', trigger: 'blur' },
        'values[0].maxInventoryNum': { pattern: /^\d{1,11}?$/, message: '请输入正整数', trigger: 'blur' }
      },
      warehouseList: []
    }
  },
  components: {
  },
  computed: {
    secondClassList() {
      const temp = this.firstClassList.find(item => item.id === this.goodForm.firstClassId)
      return temp ? temp.children : []
    },
    openingInventory() {
      const { originalPrice, originalPriceAdjustment, originalInventoryNum } = this.goodForm.values[0] || {}
      return { originalPrice, originalPriceAdjustment, originalInventoryNum }
    }

  },
  mounted() {
    this.commonwmsmanagerUsableList()
    if (this.code) {
      this.getGoodsDetailV2(this.code)
    }
  },
  methods: {
    getGoodsDetailV2(code) {
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
    inventoryPriceChange() {
      const temp = this.goodForm.values[0]
      if (temp.saleReferencePrice) {
        this.goodForm.values[0].profitRate = ((temp.saleReferencePrice / temp.inventoryPrice - 1) * 100).toFixed(2)
      }
    },
    saleReferencePriceChange() {
      const temp = this.goodForm.values[0]
      this.goodForm.values[0].profitRate = ((temp.saleReferencePrice / this.goodForm.values[0].inventoryPrice - 1) * 100).toFixed(2)
    },
    profitRateChange() {
      const temp = this.goodForm.values[0]
      this.goodForm.values[0].saleReferencePrice = ((Number(temp.saleReferencePrice / 100) + 1) * this.goodForm.values[0].inventoryPrice).toFixed(2)
    },
    commonwmsmanagerUsableList() {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList().then(res => {
        this.warehouseList = res.data
      })
    },
    saveGood() {
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
    getGoodsClass() {
      this.$api.seeGoodsService.getGoodsClass({ categoryCode: this.goodForm.categoryCode }).then(res => {
        this.firstClassList = res.data
        if (!this.isDetail) {
          this.goodForm.classId = null
        }
        this.isDetail = false
      })
    },
    handleGoodPrice() {
      const temp = this.goodForm.values[0]
      this.goodForm.values[0].profitRate = temp.saleReferencePrice / temp.inventoryPrice - 1
    }
  },
  watch: {
    'goodForm.categoryCode': {
      handler: function(newValue) {
        if (!this.isDetail) {
          this.goodForm.firstClassId = null
        }
        this.getGoodsClass()
      }
    },
    'goodForm.firstClassId': {
      handler: function(newValue) {
        if (!this.isDetail) {
          this.goodForm.classId = null
        }
      }
    },
    'goodForm.classId': {
      handler: function(newValue) {
        const temp = this.secondClassList.find(item => item.id === newValue)
        this.goodForm.values[0].taxRate = temp ? temp.taxRate : this.goodForm.values[0].taxRate
      }
    },
    'openingInventory': {
      handler: function(newValue) {
        const temp = this.goodForm.values[0]
        temp.originalAmount = temp.originalPrice * temp.originalInventoryNum
        temp.originalCostDifference = (temp.originalPrice - temp.originalPriceAdjustment) * temp.originalInventoryNum
      }
    }
  }
}
</script>

<style scoped lang='scss'>
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
