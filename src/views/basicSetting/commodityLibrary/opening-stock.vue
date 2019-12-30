<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2019-12-30 10:27:00
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
                <el-select class="wfull" v-model="beginnForm.wmsId">
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
        <!-- 换入库商品 -->
        <form-card class="borrow-goods-info mt10" title="期初库存">
          <el-table border :data="[rowData]" max-height="400" size="mini">
            <el-table-column prop="goodsCode" label="期初商品" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{totalNum}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="goodsCode" label="商品编号" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="d-text-blue">{{scope.row.goodsCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品类别" min-width="110" prop="categoryCode">
              <template slot-scope="scope">{{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</template>
            </el-table-column>
            <el-table-column label="商品分类" min-width="110" prop="className">
              <template slot-scope="scope">
                <span class>{{ scope.row.firstClassName }}/{{ scope.row.secondClassName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" min-width="110" prop="name"></el-table-column>
            <el-table-column label="采购单价" min-width="110" prop="configName">
              <template>
                <el-form-item prop="purchasePrice" style="margin-top:18px;">
                  <el-input :show-word-limit="false" v-model.trim="beginnForm.purchasePrice"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="采购数量" min-width="130" prop="configName">
              <template>
                <el-form-item prop="num" style="margin-top:18px;">
                  <el-input-number
                    style="width:100px;"
                    controls-position="right"
                    v-model.trim="beginnForm.num"
                    :max="500"
                    :min="1"
                    :precision="0"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="采购总价" min-width="110" prop="configName">
              <template>{{beginnForm.purchasePrice * beginnForm.num}}</template>
            </el-table-column>
            <el-table-column label="商品规格" min-width="110" prop="specOne"></el-table-column>
            <el-table-column label="单位" min-width="80" prop="unit">
              <template slot-scope="{row}">{{row.unit | dictionary('SC_JLDW')}}</template>
            </el-table-column>
          </el-table>
        </form-card>
        <!-- <losses-code ref="lossesCode" :data="beginnForm" :rowData="rowData" :wmsName="wmsName"></losses-code> -->
      </el-form>
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
      loading: false,
      totalNum: 0,
      warehouseList: [],
      beginnForm: {
        commodityCode: '',
        categoryCode: this.rowData.categoryCode,
        wmsId: '',
        commodityList: [],
        num: 0,
        purchasePrice: 0,
        originalPriceAdjustment: ''
      },
      beginnFormRule: {
        commodityList: { required: true, message: '请选择', trigger: 'change' },
        promotionName: { required: true, message: '请输入', trigger: 'blur' },
        wmsId: { required: true, message: '请选择', trigger: 'change' },
        purchasePrice: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[-+]?\d{1,6}(\.\d{1,2})?$/, message: '请输入6位整数，两位小数', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[-+]?\d{1,6}(\.\d{1,2})?$/, message: '请输入6位整数，两位小数', trigger: 'blur' }
        ],
        promotionTarget: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ],
        commonPromotionGoalPersonnelEntities: { required: true, message: '请选择', trigger: 'change' },
        originalPriceAdjustment: [
          { pattern: /^[-+]?\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }
        ]
      }
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
      return (this.beginnForm.num * (parseFloat(this.beginnForm.originalPriceAdjustment) || 0)).toFixed(2)
    }
  },
  mounted () {
    this.commonwmsmanagerUsableList()
    this.wmsinventorycommodityinitialinfoInfo()
    // console.log(this.$refs.lossesCode)
  },
  methods: {
    wmsinventorycommodityinitialinfoInfo () {
      this.$api.seePsiWmsService.wmsinventorycommodityinitialinfoInfo(null, this.rowData.goodsCode).then(res => {
        this.totalNum = res.data || 0
      })
    },
    // 可用库房列表
    commonwmsmanagerUsableList () {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList().then(res => {
        this.warehouseList = res.data
      })
    },
    wmsinventorydetailInitializePutaway () {
      this.$refs.beginnForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.beginnForm.commodityCode = this.rowData.goodsCode
          this.$api.seePsiWmsService.wmsinventorydetailInitializePutaway(this.beginnForm).then(res => {
            this.$emit('inStorageSuccess')
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
