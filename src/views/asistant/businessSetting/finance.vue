<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-30 14:19:51
 * @Description: 业务设置-财务
 -->
<template>
  <div class>
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
        <el-button size="small" style="margin-top: 20px;" @click="restoreDefault">恢复默认</el-button>
      </el-col>
    </div>
    <el-form size="small" :model="saleForm" :disabled="!isEdit" label-position="left">
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span class="mr5">逾期滞纳金</span>
        </legend>
        <el-row>
          <el-col :span="24">
            <el-button size="mini" type="primary" class="mb10 mt10">+新增滞纳金方案</el-button>
          </el-col>
        </el-row>
        <div>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-form-item label="滞纳金方案名称" label-width="120px">
                <el-input v-model="saleForm.value"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="间隔时间" label-width="80px">
                <div style="display:flex;">
                  <div>
                    <el-input-number
                      class="mr5"
                      v-model="saleForm.quotation2"
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
              <el-form-item label>
                <div style="display:flex;">
                  <el-select v-model="saleForm.value2" class="mr5">
                    <el-option label="比例" value="1"></el-option>
                    <el-option label="金额" value="0"></el-option>
                  </el-select>
                  <el-input v-model="saleForm.value"></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="滞纳金上限" label-width="90px">
                <el-input v-model="saleForm.value"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="padding-top:2px;">
              <el-button type="text" style="padding:0">
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
      activeName: 'first',
      isEdit: false,
      saleForm: {
        value: '',
        value2: ''
      }
    }
  },
  components: {
  },
  methods: {
    save() {

    },
    cancel() {

    },
    restoreDefault() {

    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-input-number--mini {
  width: 100px;
}
</style>
