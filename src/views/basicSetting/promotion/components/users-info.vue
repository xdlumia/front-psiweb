<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 17:45:14
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-07 11:30:56
 * @Description: 商品信息
 -->
<template>
  <div class>
    <form-card :title="true">
      <div slot="title" style="display:flex;align-items:center">
        <span class="mr20">参与人员</span>
        <employees-chosen
          v-model="employee"
          :isEdit="true"
          :multiple="true"
          :closeOnSelect="false"
          @input="choose"
          style="width:200px"
          class="d-inline"
        >
          <el-input size="mini" value :show-word-limit="false"></el-input>
        </employees-chosen>
      </div>
      <el-table :data="employee" style="width: 100%;margin-bottom: 20px;" row-key="id">
        <el-table-column label="员工名称" prop="employeeName"></el-table-column>
        <el-table-column label="所属部门" prop="deptName"></el-table-column>
        <el-table-column label="岗位名称" prop="positionName"></el-table-column>
      </el-table>
    </form-card>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      employee: []
    }
  },
  components: {
  },
  methods: {
    choose(users) {
      console.log(users)
      this.employee = users
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
