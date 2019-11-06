<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:31:10
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-06 17:49:48
 * @Description: 促销信息
 -->
<template>
  <form-card title="促销信息">
    <el-row :gutter="10" type="flex" justify="space-between">
      <el-col :span="8">
        <el-form-item label="促销名称" prop="serviceName">
          <el-input v-model="data.serviceName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开始时间" prop="linkMan">
          <el-input v-model="data.linkMan"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结束时间" prop="phone">
          <el-input v-model="data.phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="促销目标" prop="serviceTypeList">
          <el-select multiple class="wfull" v-model="data.serviceTypeList" size="mini">
            <el-option
              v-for="(item, index) in dictionaryOptions('PSI_FWS_FWLX')"
              :key="index"
              :label="item.content"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
  }
}
</script>

<style scoped lang='scss'>
</style>
