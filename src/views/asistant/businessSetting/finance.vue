<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-31 14:33:30
 * @Description: 业务设置-财务
 -->
<template>
  <div class v-loading="loading">
    <div>
      <el-col :span="16">
        <h3 class="mt10 d-text-gray b">逾期滞纳金</h3>
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
        <el-button v-if="isEdit" size="small" style="margin-top: 20px;" @click="cancel">取消</el-button>
      </el-col>
    </div>
    <el-form
      ref="financeConfigEntity"
      size="small"
      :model="financeConfigEntity"
      :disabled="!isEdit"
      label-position="left"
    >
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span class="mr5">逾期滞纳金</span>
        </legend>
        <el-row>
          <el-col :span="24">
            <el-button size="mini" type="primary" class="mb10 mt10" @click="addItem">+新增滞纳金方案</el-button>
          </el-col>
        </el-row>
        <div v-for="(item, index) in financeConfigEntity.financeConfigList" :key="index">
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item
                label="滞纳金方案名称"
                label-width="125px"
                :prop="'financeConfigList.' + index + '.overdueFineName'"
                :rules="{required:true,message:'请输入',trigger:'blur'}"
              >
                <el-input v-model="item.overdueFineName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="间隔时间"
                label-width="80px"
                :prop="'financeConfigList.' + index + '.overdueFineInterval'"
                :rules="{required:true,message:'请输入',trigger:'blur'}"
              >
                <div style="display:flex;">
                  <div>
                    <el-input-number
                      class="mr5"
                      v-model="item.overdueFineInterval"
                      size="mini"
                      controls-position="right"
                      :min="1"
                      setp="1"
                    ></el-input-number>
                  </div>天
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label
                :prop="'financeConfigList.' + index + '.overdueFineLimit'"
                :rules="{required:true,message:'请输入',trigger:'blur'}"
              >
                <div style="display:flex;">
                  <el-select v-model="item.limitType" class="mr5">
                    <el-option label="比例" :value="0"></el-option>
                    <el-option label="固定金额" :value="1"></el-option>
                  </el-select>
                  <el-input v-model="item.overdueFineLimit"></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="滞纳金上限"
                label-width="95px"
                :prop="'financeConfigList.' + index + '.overdueFineUpperLimit'"
                :rules="{required:true,message:'请输入',trigger:'blur'}"
              >
                <el-input v-model="item.overdueFineUpperLimit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="padding-top:2px;">
              <el-button
                type="text"
                style="padding:0"
                @click="financeConfigEntity.financeConfigList.splice(index, 1)"
              >
                <i class="el-icon-remove-outline f24"></i>
              </el-button>
            </el-col>
          </el-row>
        </div>
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
      financeConfigEntity: {
        financeConfigList: []
      }
    }
  },
  components: {
  },
  mounted() {
    this.commonsystemconfigInfo()
  },
  methods: {
    addItem() {
      this.financeConfigEntity.financeConfigList.push({
        limitType: 0,
        overdueFineInterval: 0,
        overdueFineLimit: '',
        overdueFineName: '',
        overdueFineUpperLimit: ''
      })
    },
    save() {
      this.$refs.financeConfigEntity.validate(valid => {
        if (valid) {
          const params = {
            configType: 3,
            configJson: JSON.stringify(this.financeConfigEntity)
          }
          this.commonsystemconfigSave(params)
        }
      })
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
      Object.keys(this.financeConfigEntity).forEach(key => {
        this.financeConfigEntity[key] = this.tempObj[key] || this.financeConfigEntity[key]
      })
    },
    commonsystemconfigInfo() {
      this.loading = true
      this.$api.seePsiCommonService.commonsystemconfigInfo(null, 3).then(res => {
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
