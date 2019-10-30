<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-30 20:13:06
 * @Description: 业务设置-库房
 -->
<template>
  <div class>
    <div>
      <el-col :span="16">
        <h3 class="mt10 d-text-gray b">拆卸单设置</h3>
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
    <el-form size="small" :model="warehouseEntity" :disabled="!isEdit" label-width="190px">
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span>自动分配设置</span>
        </legend>
        <el-col :span="8">
          <el-form-item label="是否开启自动分配:">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="warehouseEntity.disassemblyState"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="每人自动分配:">
            <el-input-number
              v-model="warehouseEntity.disassemblynNum"
              size="mini"
              controls-position="right"
              :min="1"
              setp="1"
            ></el-input-number>台
            <span class="f12 pb10" style="color: #999">说明：优先分配最少拆卸数量最少的拆卸人，如数量相同则默认分配</span>
          </el-form-item>
        </el-col>
      </fieldset>
      <el-col :span="24">
        <h3 class="mt10 mb10 d-text-gray b">组装单设置</h3>
      </el-col>
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span>自动分配设置</span>
        </legend>
        <el-col :span="8">
          <el-form-item label="是否开启自动分配:">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="warehouseEntity.assembleState"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="每人自动分配:">
            <el-input-number
              v-model="warehouseEntity.assembleNum"
              size="mini"
              controls-position="right"
              :min="1"
              setp="1"
            ></el-input-number>台
            <span class="f12 pb10" style="color: #999">说明：优先分配最少拆卸数量最少的拆卸人，如数量相同则默认分配</span>
          </el-form-item>
        </el-col>
      </fieldset>
      <el-col :span="24">
        <h3 class="mt10 mb10 d-text-gray b">组装任务设置</h3>
      </el-col>
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span class="mr5">是否开启扫码</span>
          <span class="f12 pb10" style="color: #999">说明：开启后组装单需要扫机器码和SN码才能完成</span>
        </legend>
        <el-col :span="8">
          <el-form-item label="是否开启扫码功能:">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="warehouseEntity.assembleTaskState"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </el-form-item>
        </el-col>
      </fieldset>
      <el-col :span="24">
        <h3 class="mt10 mb10 d-text-gray b">换货单设置</h3>
      </el-col>
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span class="mr5">审批设置</span>
        </legend>
        <el-col :span="8">
          <el-form-item label="是否开启审批:">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="warehouseEntity.exchangeState"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </el-form-item>
        </el-col>
      </fieldset>
      <el-col :span="24">
        <h3 class="mt10 mb10 d-text-gray b">拣货单设置</h3>
      </el-col>
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span class="mr5">自定义项设置</span>
        </legend>
        <el-col :span="24">
          <el-button class="ml10 mb10 mt10" type="primary" size="mini">+新增自定义项</el-button>
        </el-col>
        <el-col :span="9">
          <el-form-item label label-width="0px">
            <div style="display:flex;align-items:center">
              <span style="flex:0 0 90px;color:#606266" class="f14 ml10">自定义项名称</span>
              <el-input v-model="warehouseEntity.quotation1"></el-input>
              <el-button type="text" class="ml10">
                <i class="el-icon-remove-outline f24"></i>
              </el-button>
            </div>
          </el-form-item>
        </el-col>
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
      warehouseEntity: {
        assembleNum: 0,
        assembleState: 1,
        assembleTaskState: 1,
        disassemblyState: 1,
        disassemblynNum: 0,
        exchangeState: 1,
        pickingOrdersConfigArray: []
      }
    }
  },
  components: {
  },
  mounted() {
    this.commonsystemconfigList()
  },
  methods: {
    save() {

    },
    cancel() {

    },
    restoreDefault() {

    },
    commonsystemconfigList() {
      this.$api.seePsiCommonService.commonsystemconfigList().then(res => {
        Object.keys(this.warehouseEntity).forEach(key => {
          this.warehouseEntity[key] = res.data.warehouseEntity[key]
        })
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
