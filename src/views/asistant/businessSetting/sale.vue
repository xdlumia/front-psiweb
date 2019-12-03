<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-03 21:25:33
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
          v-if="!isEdit"
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
        <el-button v-if="isEdit" size="small" style="margin-top: 20px;"
@click="cancel">取消</el-button>
      </el-col>
    </div>
    <el-form size="small" :model="sellEntity" :disabled="!isEdit">
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
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      tempObj: null,
      sellEntity: {
        quotationState: 0,
        quotationTime: 15,
        stockOutState: 0,
        stockStandardState: 0
      }
    }
  },
  components: {
  },
  mounted() {
    this.commonsystemconfigInfo()
  },
  methods: {
    save() {
      const params = {
        configType: 1,
        configJson: JSON.stringify(this.sellEntity)
      }
      this.commonsystemconfigSave(params)
    },
    // 保存接口
    commonsystemconfigSave(params) {
      this.loading = true
      this.$api.seePsiCommonService.commonsystemconfigSave(params).finally(() => {
        this.commonsystemconfigInfo()
        this.loading = false
        this.isEdit = false
      })
    },
    cancel() {
      this.isEdit = false
      this.handleDefault()
    },
    // 处理返回数据
    handleDefault() {
      Object.keys(this.sellEntity).forEach(key => {
        this.sellEntity[key] = this.tempObj[key] || this.sellEntity[key]
      })
    },
    // 获取详情
    commonsystemconfigInfo() {
      this.loading = true
      this.$api.seePsiCommonService.commonsystemconfigInfo(null, 1).then(res => {
        this.tempObj = JSON.parse(res.data.configJson)
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
