<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-29 16:19:45
 * @Description: 业务设置-报表
 -->
<template>
  <div class>
    <div>
      <el-col :span="16">
        <h3 class="mt10 d-text-gray b">提成报表</h3>
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
    <fieldset class="d-fieldset mb20">
      <legend>
        <i class="d-round12 d-circle d-bg-blue"></i>
        <span class="mr5">提成报表</span>
        <span class="f12 pb10" style="color: #999">说明：提成设置</span>
      </legend>
      <el-table :data="tableData">
        <el-table-column label="提成员工名称"></el-table-column>
        <el-table-column label="底薪"></el-table-column>
        <el-table-column label="提成比例"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </fieldset>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      activeName: 'first',
      isEdit: false,
      tableData: []
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
