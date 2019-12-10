<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-10 10:37:42
 * @Description: 业务设置-报表 promotion
 -->
<template>
  <div class>
    <div>
      <el-row>
        <el-col :span="16">
          <h3 class="mt10 mb10 d-text-gray b">提成报表</h3>
        </el-col>
        <el-col :span="8" class="ar">
          <el-button
            type="primary"
            size="small"
            style="margin-top: 20px;"
            @click="editId = null,visible = true"
            v-if="authorityButtons.includes('asystem_assist_forms_10002')"
          >+新增</el-button>
        </el-col>
      </el-row>
    </div>
    <fieldset class="d-fieldset mb20">
      <legend>
        <i class="d-round12 d-circle d-bg-blue"></i>
        <span class="mr5">提成报表</span>
        <span class="f12 pb10" style="color: #999">说明：提成设置</span>
      </legend>
      <d-table
        :params="queryForm"
        ref="commissionTable"
        api="seePsiCommonService.commonsystemreportList"
        :border="false"
        style="height: calc(100vh - 240px);"
      >
        <el-table-column label="提成员工名称" prop="employeeName"></el-table-column>
        <el-table-column label="底薪" prop="basePay"></el-table-column>
        <el-table-column label="提成比例" prop="commission">
          <template slot-scope="{row}">{{row.commission}}%</template>
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="authorityButtons.includes('asystem_assist_forms_10001') || authorityButtons.includes('asystem_assist_forms_10003')"
        >
          <template slot-scope="scope">
            <el-button
              v-if="authorityButtons.includes('asystem_assist_forms_10001')"
              type="text"
              size="small"
              @click="editId = scope.row.id,visible = true"
            >编辑</el-button>
            <el-button
              v-if="authorityButtons.includes('asystem_assist_forms_10003')"
              type="text"
              size="small"
              @click="deleteOne(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </d-table>
    </fieldset>
    <el-dialog :visible.sync="visible" top="20vh" v-dialogDrag
width="500px" title="提成员工设置">
      <add-commission :editId="editId" v-if="visible" @refresh="refresh"
@cancel="visible = false"></add-commission>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import addCommission from './components/add-commission'
export default {
  data() {
    return {
      visible: false,
      isEdit: false,
      tableData: [],
      queryForm: {
        page: 1,
        limit: 15
      },
      editId: null
    }
  },
  components: {
    addCommission
  },
  methods: {
    deleteOne(id) {
      this.$confirm(`是否删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiCommonService.commonsystemreportLogicDelete({ id }).then(res => {
          this.$refs.commissionTable.reload(1);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    refresh() {
      this.visible = false
      this.$refs.commissionTable.reload(1)
    },
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
