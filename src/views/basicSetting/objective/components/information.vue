<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:31:10
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-08 13:54:59
 * @Description: 目标信息
 -->
<template>
  <form-card title="目标信息">
    <el-row :gutter="40" type="flex" justify="space-between">
      <el-col :span="12">
        <el-form-item label="目标名称" prop="promotionName">
          <el-input v-model.trim="data.promotionName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="目标时间" prop="datetimerange">
          <el-date-picker
            v-model="data.datetimerange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="dateChange"
          ></el-date-picker>
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
  },
  methods: {
    dateChange(value) {
      this.data.begTime = value[0]
      this.data.endTime = value[1]
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
