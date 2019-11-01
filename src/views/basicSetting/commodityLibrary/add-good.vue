<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 17:19:40
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-01 18:42:45
 * @Description: 新增商品
 -->
<template>
  <div class>
    <el-form :model="goodForm" size="small" label-position="top">
      <form-card title="商品信息">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="选择类别">
              <d-select v-model="goodForm.categoryCode" dicCode="PSI_SP_KIND"></d-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主分类">
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
            <el-form-item label="子分类">
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
            <el-form-item label="商品名称">
              <el-input v-model="goodForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品规格">
              <el-input v-model="goodForm.values.specOne"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位">
              <el-input v-model="goodForm.unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品图片">
              <div class="wfull" style="display:flex;">
                <upload-file
                  class="mr10"
                  v-model="goodForm.values.goodsPic"
                  :limit="{type: ['jpg', 'jpeg', 'png']}"
                  v-if="!goodForm.values.goodsPic"
                  :size="0.5"
                >
                  <slot>
                    <div style class="ba upload-wrapper">
                      <span class="el-icon-plus" style="font-size:36px;color:#999;"></span>
                    </div>
                  </slot>
                </upload-file>
                <div style class="ba upload-wrapper mr10" v-else>
                  <img
                    style="width:100%;height:100%;object-fit: cover;"
                    :src="goodForm.values.goodsPic"
                  />
                </div>
                <p class="d-text-qgray f12" style="display: flex; flex-direction: column">
                  <span>仅支持jpg、jpeg、png格式</span>
                  <span>图片大小500KB以下,推荐分辨率600*600</span>
                  <el-button
                    style="width: 65px;"
                    type="text"
                    @click="goodForm.values.goodsPic = ''"
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
            <el-form-item label="库存成本价">
              <el-input v-model="goodForm.values.inventoryPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售参考价">
              <el-input v-model="goodForm.values.saleReferencePrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毛利率">
              <el-input v-model="goodForm.values.profitRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品税率">
              <el-input v-model="goodForm.values.taxRate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="库存预警">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="最低库存量">
              <el-input v-model="goodForm.values.minInventoryNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最高库存量">
              <el-input v-model="goodForm.values.maxInventoryNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="其他">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="是否启用">
              <el-switch
                v-model="goodForm.values.isEnable"
                active-text="开"
                inactive-text="关"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
      <form-card title="期初库存（重要）">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="库房">
              <el-input v-model="goodForm.values.warehouseId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初库存数量">
              <el-input v-model="goodForm.values.originalInventoryNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初库存成本（元）">
              <el-input v-model="goodForm.values.originalPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初调价值（元）">
              <el-input v-model="goodForm.values.originalPriceAdjustment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初调价差异额">
              <el-input v-model="goodForm.values.originalCostDifference" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期初总金额">
              <el-input v-model="goodForm.values.originalAmount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      firstClassList: [],
      goodForm: {
        categoryCode: '',
        firstClassId: '',
        classId: '',
        name: '',
        unit: '',
        columns: '规格',
        values: {
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
        }
      }
    }
  },
  components: {
  },
  computed: {
    secondClassList() {
      const temp = this.firstClassList.find(item => item.id === this.goodForm.firstClassId)
      return temp ? temp.children : []
    }
  },
  methods: {
    saveGood() {
      this.$api.seeGoodsService.saveGoodsInfo(this.goodForm).then(res => {

      })
    },
    // 获取分类列表
    getGoodsClass() {
      this.$api.seeGoodsService.getGoodsClass({ categoryCode: this.goodForm.categoryCode }).then(res => {
        console.log(res)
        this.firstClassList = res.data
      })
    }
  },
  watch: {
    'goodForm.categoryCode': {
      handler: function(newValue) {
        console.log(newValue)
        this.getGoodsClass()
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
