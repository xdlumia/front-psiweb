<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2020-01-02 15:04:27
 * @Description: 业务设置-开账
 -->
<template>
  <div class v-loading="loading">
    <div>
      <el-col :span="16">
        <h3 class="mt10 d-text-gray b">开账</h3>
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
    <el-form size="small" :model="accountForm" :disabled="!isEdit" label-width="160px">
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span class="mr5">开账</span>
        </legend>
        <el-form-item label="开账状态：">
          <el-col :span="5">
            <el-switch
              v-model="accountForm.accountState"
              active-text="开"
              inactive-text="关"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-col>
          <el-col :span="18">
            <span class="d-text-qgray">开账功能：开账功能开启后，将锁定所有期初数据，不可修改。开账功能只可试用一次，请谨慎开启</span>
          </el-col>
        </el-form-item>
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
      accountForm: {
        accountState: 0
      }
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
        configType: 4,
        configJson: JSON.stringify(this.accountForm)
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
      Object.keys(this.accountForm).forEach(key => {
        this.accountForm[key] = this.tempObj[key] || this.accountForm[key]
      })
    },
    // 获取详情
    commonsystemconfigInfo () {
      this.loading = true
      this.$api.seePsiCommonService.commonsystemconfigInfo(null, 4).then(res => {
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
