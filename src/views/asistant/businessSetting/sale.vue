<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2020-01-08 14:30:13
 * @Description: 业务设置-销售
 -->
<template>
  <div class v-loading="loading">
    <div>
      <el-col :span="16">
        <h3 class="mt10 d-text-gray b">报价单</h3>
      </el-col>
      <el-col :span="8" class="ar">
        <el-button
          v-if="!isEdit && authorityButtons.includes('asystem_assist_sell_10001')"
          type="primary"
          size="small"
          style="margin-top: 20px;"
          @click="isEdit = true"
        >编辑</el-button>
        <el-button
          v-if="isEdit"
          type="primary"
          size="small"
          style="margin-top: 20px;"
          @click="save"
        >保存</el-button>
        <el-button v-if="isEdit" size="small" style="margin-top: 20px;" @click="cancel">取消</el-button>
      </el-col>
    </div>
    <el-form size="small" :model="sellEntity" :disabled="!isEdit" label-position="left">
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span class="mr5">报价单</span>
          <span class="f12 pb10" style="color: #999">说明：报价单设置</span>
        </legend>
        <el-form-item>
          <el-col :span="14">
            <span>【报价单】的“折后销售单价”大于等于“销售参考价”时，不用进行审核，自动通过</span>
          </el-col>
          <el-col :span="6">
            <el-switch
              v-model="sellEntity.quotationState"
              active-text="开"
              inactive-text="关"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="14">
            <span>【报价单】的“报价单有效期”默认时长</span>
          </el-col>
          <el-col :span="6">
            <el-input-number
              v-model="sellEntity.quotationTime"
              size="mini"
              controls-position="right"
              :min="1"
              :max="999"
              :precision="0"
              setp="1"
            ></el-input-number>天
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="14">
            <span>【报价单自动生成请购单】报价单审核通过后，根据库存判断，如库存不足，不足的部分自动生成请购单</span>
          </el-col>
          <el-col :span="6">
            <el-switch
              v-model="sellEntity.createBuyingOrderStatus"
              active-text="开"
              inactive-text="关"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-col>
        </el-form-item>
      </fieldset>
      <el-col :span="24">
        <h3 class="mt10 mb10 d-text-gray b">销售出库单</h3>
      </el-col>
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span>
            销售出库单
            <span class="f12 pb10" style="color: #999">说明：销售出库单设置</span>
          </span>
        </legend>
        <el-form-item>
          <el-col :span="14">
            <span>【销售出库单】的选择账期“现结”时，如果关联的【账单】“未结清”时，【出库单】不能进行“出库”</span>
          </el-col>
          <el-col :span="6">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="sellEntity.stockOutState"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="14">
            <span>【销售出库单】，有“标准”合同时，不用进行“合同完善”审核，自动通过</span>
          </el-col>
          <el-col :span="6">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="sellEntity.stockStandardState"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </el-col>
        </el-form-item>
      </fieldset>
      <el-col :span="24">
        <h3 class="mt10 mb10 d-text-gray b">附加发票税率</h3>
      </el-col>
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span class="mr5">税率设置</span>
        </legend>
        <el-col :span="24">
          <el-button
            class="ml10 mb10 mt10"
            type="primary"
            size="mini"
            @click="sellEntity.additionalInvoiceRateArray.push('')"
          >+新增税率</el-button>
        </el-col>
        <el-col :span="9">
          <el-form-item label label-width="0px">
            <div v-for="(item, index) in sellEntity.additionalInvoiceRateArray" :key="index">
              <el-form-item
                label-width="100px"
                :label="'选项' + (index + 1)"
                :rules="taxRate"
                :prop="'additionalInvoiceRateArray.' + index"
              >
                <!-- <span style="flex:0 0 90px;color:#606266" class="f14 ml10">选项{{index + 1}}</span> -->
                <div style="display:flex;">
                  <el-input
                    :show-word-limit="false"
                    v-model="sellEntity.additionalInvoiceRateArray[index]"
                  >
                    <span slot="append">%</span>
                  </el-input>
                  <el-button
                    type="text"
                    class="ml10"
                    style="padding:0"
                    @click="sellEntity.additionalInvoiceRateArray.splice(index, 1)"
                  >
                    <i class="el-icon-remove-outline f24"></i>
                  </el-button>
                </div>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
      </fieldset>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      loading: false,
      isEdit: false,
      tempObj: null,
      sellEntity: {
        quotationState: 0,
        quotationTime: 15,
        stockOutState: 0,
        stockStandardState: 0,
        createBuyingOrderStatus: 0,
        additionalInvoiceRateArray: []
      },
      taxRate: [
        { required: true, message: '请输入', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {
            if (!/^\d{1,3}(\.\d{1,2})?$/.test(value)) {
              callback(new Error('请输入0-999，两位小数'))
            } else {
              callback()
            }
          }
        }
      ]
    }
  },
  components: {
  },
  mounted () {
    this.commonsystemconfigInfo()
  },
  methods: {
    save () {
      const params = {
        configType: 1,
        configJson: JSON.stringify(this.sellEntity)
      }
      this.commonsystemconfigSave(params)
    },
    // 保存接口
    commonsystemconfigSave (params) {
      this.loading = true
      this.$api.seePsiCommonService.commonsystemconfigSave(params).finally(() => {
        this.commonsystemconfigInfo()
        this.loading = false
        this.isEdit = false
      })
    },
    cancel () {
      this.isEdit = false
      this.handleDefault()
    },
    // 处理返回数据
    handleDefault () {
      Object.keys(this.sellEntity).forEach(key => {
        this.sellEntity[key] = this.tempObj[key] || this.sellEntity[key]
      })
    },
    // 获取详情
    commonsystemconfigInfo () {
      this.loading = true
      this.$api.seePsiCommonService.commonsystemconfigInfo(null, 1).then(res => {
        this.tempObj = Object.assign({
          quotationState: 0,
          quotationTime: 15,
          stockOutState: 0,
          stockStandardState: 0,
          createBuyingOrderStatus: 0,
          additionalInvoiceRateArray: []
        }, JSON.parse(res.data.configJson))
        this.handleDefault()
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-input-number--mini {
  width: 100px;
}
</style>
