<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-30 14:42:55
 * @Description: 业务设置-报表 promotion
 -->
<template>
  <div class>
    <div>
      <el-col :span="16">
        <h3 class="mt10 mb10 d-text-gray b">提成报表</h3>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">启用</el-button>
            <el-button type="text" size="small">停用</el-button>
          </template>
        </el-table-column>
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
