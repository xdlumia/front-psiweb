/*
 * @Author: 徐贺
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 17:20:29 
 * @Description: 调拨信息 公共
*/
<template>
  <form-card title="调拨信息">
    <el-row>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择调拨方式'}
                ]"
          label="调拨方式"
          prop
          size="mini"
        >
          <el-select
            v-model="form.allocationType"
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              label="内调"
              value="1"
            >
            </el-option>
            <el-option
              label="外调"
              value="2"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择调入库房'}
                ]"
          label="调入库房"
          prop
          size="mini"
        >
          <el-select
            v-model="form.putawayWmsId"
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              v-for="item in usableList"
              :key="item.id "
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        v-if='form.allocationType == 2'
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择服务商名称'}
                ]"
          label="服务商名称"
          maxlength="32"
          size="mini"
        >
          <el-select
            @change='facilitatorNameChange'
            v-model="form.facilitatorId"
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              v-for="item in providerList"
              :key="item.id"
              :label="item.serviceName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        v-if='form.allocationType == 2'
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择服务类型'}
                ]"
          label="服务类型"
          maxlength="32"
          size="mini"
        >
          <el-select
            v-model="form.serveType"
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              v-for="item in serviceTypeList"
              :key="item.code"
              :label="item.content"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        v-if='form.allocationType == 2'
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请输入运单编号'}
                ]"
          label="运单编号"
          maxlength="32"
          size="mini"
        >
          <el-input
            v-model="form.waybillCode"
            :disabled='disabled'
            placeholder="请输入"
          />
        </el-form-item>
      </el-col>
      <el-col
        v-if='form.allocationType == 2'
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请输入物流费用'}
                ]"
          label="物流费用"
          maxlength="32"
          size="mini"
        >
          <el-input
            v-model="form.logisticsFees"
            :disabled='disabled'
            placeholder="请输入"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="24"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          label="备注"
          prop="bankCard"
          size="mini"
        >
          <el-input
            :disabled='disabled'
            type="textarea"
            maxlength="140"
            placeholder="请输入备注"
            v-model="form.note"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      usableList: [],//库房列表
      providerList: [],//服务商列表
      serviceTypeList: [],//服务商类型列表
    };
  },
  created() {
    this.commonwmsmanagerUsableList()
    this.commonserviceproviderList()
  },
  mounted() {
  },
  methods: {
    //请求可用库房
    commonwmsmanagerUsableList() {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList()
        .then(res => {
          this.usableList = res.data
        })
        .finally(() => {

        })
    },
    //请求服务商列表
    commonserviceproviderList() {
      this.$api.seePsiCommonService.commonserviceproviderList({ page: 1, limit: 1000 })
        .then(res => {
          this.providerList = res.data
        })
        .finally(() => {

        })
    },
    //选择服务商切换的方法,请求服务商详情,拿出服务类型的code码
    facilitatorNameChange(val) {
      this.$api.seePsiCommonService.commonserviceproviderInfo(null, val)
        .then(res => {
          let serviceTypeArr = res.data.serviceType.split(',')
          this.serviceTypeList = this.dictionaryOptions('PSI_FWS_FWLX').filter((item) => {
            return serviceTypeArr.includes(item.code)
          })
          console.log(this.serviceTypeList)
        })
        .finally(() => {

        })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>