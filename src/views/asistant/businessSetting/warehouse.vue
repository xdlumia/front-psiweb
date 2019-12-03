<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-03 21:25:16
 * @Description: 业务设置-库房
 -->
<template>
  <div class v-loading="loading">
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
        <el-button v-if="isEdit" size="small" style="margin-top: 20px;"
@click="cancel">取消</el-button>
      </el-col>
    </div>
    <el-form size="small" :model="warehouseEntity" :disabled="!isEdit"
label-width="190px">
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
              v-model.number="warehouseEntity.disassemblynNum"
              size="mini"
              controls-position="right"
              :min="1"
              :max="999"
              :precision="0"
              setp="1"
            ></el-input-number>台
            <span class="f12 pb10" style="color: #999">说明：优先分配最少拆卸数量最少的拆卸人，如数量相同则默认分配</span>
          </el-form-item>
        </el-col>
      </fieldset>
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span>拆卸责任人</span>
        </legend>
        <div style="display: flex;" class="mb10 ml10 pt10">
          <div
            v-for="(item,index) in warehouseEntity.disassemblyUserId"
            :key="index"
            style="display:flex;flex-direction: column;align-items: center;margin-right:20px;"
          >
            <div
              style="width:40px;height:40px;display:flex;justify-content: center;align-items: center;border-radius: 50%;"
              class="mb5"
            >
              <img style="width:100%;height:100%" src="@/assets/img/adminimg.png" />
            </div>
            <span class="d-text-qgray">{{item.employeeName}}</span>
          </div>

          <employees-chosen
            v-model="warehouseEntity.disassemblyUserId"
            :isEdit="true"
            :closeOnSelect="false"
          >
            <el-button type="text" style="padding:0">
              <div
                style="width:40px;height:40px;display:flex;justify-content: center;align-items: center;border-radius: 50%;"
                class="ba"
              >
                <i class="el-icon-plus" style="font-size:20px;"></i>
              </div>
            </el-button>
          </employees-chosen>
        </div>
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
              :max="999"
              :precision="0"
              setp="1"
            ></el-input-number>台
            <span class="f12 pb10" style="color: #999">说明：优先分配最少拆卸数量最少的拆卸人，如数量相同则默认分配</span>
          </el-form-item>
        </el-col>
      </fieldset>
      <fieldset class="d-fieldset mb20">
        <legend>
          <i class="d-round12 d-circle d-bg-blue"></i>
          <span>组装责任人</span>
        </legend>
        <div style="display: flex;" class="mb10 ml10 pt10">
          <div
            v-for="(item,index) in warehouseEntity.assembleUserId"
            :key="index"
            style="display:flex;flex-direction: column;align-items: center;margin-right:20px;"
          >
            <div
              style="width:40px;height:40px;display:flex;justify-content: center;align-items: center;border-radius: 50%;"
              class="mb5"
            >
              <img style="width:100%;height:100%" src="@/assets/img/adminimg.png" />
            </div>
            <span class="d-text-qgray">{{item.employeeName}}</span>
          </div>

          <employees-chosen
            v-model="warehouseEntity.assembleUserId"
            :isEdit="true"
            :closeOnSelect="false"
          >
            <el-button type="text" style="padding:0">
              <div
                style="width:40px;height:40px;display:flex;justify-content: center;align-items: center;border-radius: 50%;"
                class="ba"
              >
                <i class="el-icon-plus" style="font-size:20px;"></i>
              </div>
            </el-button>
          </employees-chosen>
        </div>
      </fieldset>

      <!-- <el-col :span="24">
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
      </fieldset>-->
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
          <el-button
            class="ml10 mb10 mt10"
            type="primary"
            size="mini"
            @click="warehouseEntity.pickingOrdersConfigArray.push('')"
          >+新增自定义项</el-button>
        </el-col>
        <el-col :span="9">
          <el-form-item label label-width="0px">
            <div
              style="display:flex;align-items:center"
              v-for="(item, index) in warehouseEntity.pickingOrdersConfigArray"
              :key="index"
            >
              <span style="flex:0 0 90px;color:#606266" class="f14 ml10">自定义项名称</span>
              <el-input v-model="warehouseEntity.pickingOrdersConfigArray[index]"></el-input>
              <el-button
                type="text"
                class="ml10"
                @click="warehouseEntity.pickingOrdersConfigArray.splice(index, 1)"
              >
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
      loading: false,
      isEdit: false,
      tempObj: null,
      employee: null,
      warehouseEntity: {
        assembleNum: 0,
        assembleState: 0,
        assembleTaskState: 0,
        disassemblyState: 0,
        disassemblynNum: 0,
        exchangeState: 0,
        pickingOrdersConfigArray: [],
        disassemblyUserId: [],
        assembleUserId: []
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
        configType: 2,
        configJson: JSON.stringify(this.warehouseEntity)
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
      Object.keys(this.warehouseEntity).forEach(key => {
        this.warehouseEntity[key] = this.tempObj[key] || this.warehouseEntity[key]
      })
      console.log(this.warehouseEntity)
    },
    commonsystemconfigInfo() {
      this.loading = true
      this.$api.seePsiCommonService.commonsystemconfigInfo(null, 2).then(res => {
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
