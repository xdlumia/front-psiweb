/*
 * @Author: 徐贺
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-13 10:32:02
 * @Description: 物流信息 可编辑
*/
<template>
  <!-- <el-form
    :model="data"
    class="p10"
    label-position='top'
  > -->
  <div>
    <form-card
      class="mb10 d-relative"
      :title="index == 0 ? '物流信息' : ''"
      v-for="(item, index) in data.shipmentsLogisticsList"
      :key="index"
    >
      <i
        @click="deleteLogArr(index)"
        v-if='index != 0'
        class="d-absolute el-icon-remove f22 d-pointer"
        style="right:5px;top:5px;z-index:100;"
      ></i>
      <el-row>
        <el-col
          :span="8"
          class="pl5 pr5 pb5"
        >
          <el-form-item
            :prop="'shipmentsLogisticsList.' + index + '.facilitator'"
            :rules="[ 
                    {required:true,message:'请选择服务商'}
                ]"
            label="服务商"
            size="mini"
          >
            <el-select
              @change='facilitatorNameChange($event,index)'
              class="wfull"
              v-model="item.facilitator"
              placeholder="请选择"
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
          :span="8"
          class="pl5 pr5 pb5"
        >
          <el-form-item
            :prop="'shipmentsLogisticsList.' + index + '.serveType'"
            :rules="[ 
                    {required:true,message:'请选择服务类型'}
                ]"
            label="服务类型"
            size="mini"
          >
            <el-select
              class="wfull"
              v-model="item.serveType"
              placeholder="请选择"
            >
              <el-option
                v-for="item1 in item.serviceTypeList"
                :key="item1.code"
                :label="item1.content"
                :value="item1.code"
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
            :prop="'shipmentsLogisticsList.' + index + '.logisticsFees'"
            maxlength="32"
            :rules="[{type:'price'},
                    {required:true,message:'请输入运费金额'}]"
            label="运费金额"
            size="mini"
          >
            <el-input
              placeholder="请输入运费金额"
              v-model="item.logisticsFees"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          class="pl5 pr5 pb5"
        >
          <el-form-item
            :prop="'shipmentsLogisticsList.' + index + '.waybillCode'"
            :rules="[ 
                    {required:true,message:'请输入运单号'}
                ]"
            maxlength="40"
            label="运单号"
            size="mini"
          >
            <el-input
              placeholder="请输入运单号"
              v-model="item.waybillCode"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
    <el-button
      @click="addLogArr"
      icon="el-icon-circle-plus"
      type="text"
    >增加物流信息</el-button>
    <!-- </el-form> -->
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    data: {},
  },
  data() {
    return {
      options: [],
      providerList: [],//服务商列表
    };
  },
  mounted() {
    this.commonserviceproviderList()
    console.log(this.dictionaryOptions('PSI_FWS_FWLX'))
  },
  methods: {
    //增加物流信息
    addLogArr() {
      this.data.shipmentsLogisticsList.push({
        facilitator: "",
        logisticsFees: 0,
        serveType: "",
        shipmentsOrderId: 0,
        waybillCode: ""
      })
    },
    //删除物流信息
    deleteLogArr(index) {
      this.data.shipmentsLogisticsList.splice(index, 1)
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
    //服务商列表切换的时候, 找出当前服务商对应的服务类型
    facilitatorNameChange(val, index) {
      this.$api.seePsiCommonService.commonserviceproviderInfo(null, val)
        .then(res => {
          let serviceTypeList = []
          let serviceTypeArr = res.data.serviceType.split(',')
          serviceTypeList = this.dictionaryOptions('PSI_FWS_FWLX').filter((item) => {
            return serviceTypeArr.includes(item.code)
          })
          this.$set(this.data.shipmentsLogisticsList[index], 'serviceTypeList', serviceTypeList)
        })
        .finally(() => {

        })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>