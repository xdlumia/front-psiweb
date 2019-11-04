<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-04 11:05:32
 * @Description: 业务设置-公共
 -->
<template>
  <div class>
    <div>
      <el-col :span="16">
        <h3 class="mt10 d-text-gray b">公司设置</h3>
      </el-col>
      <el-col :span="8" class="ar">
        <el-button type="primary" size="small" style="margin-top: 20px;" @click="visible=true">+新增公司</el-button>
      </el-col>
    </div>
    <fieldset class="d-fieldset mb20">
      <legend>
        <i class="d-round12 d-circle d-bg-blue"></i>
        <span class="mr5">公司设置</span>
        <span class="f12 pb10" style="color: #999">说明：新增管理公司及结算账户</span>
      </legend>
      <d-table
        :params="queryForm"
        ref="companyTable"
        api="seeBaseinfoService.commoncorporationList"
        :data="tableData"
        :border="false"
        style="height: calc(100vh - 240px);"
      >
        <el-table-column label="公司名称" prop="corporationName"></el-table-column>
        <el-table-column label="开户行" prop="accountBank"></el-table-column>
        <el-table-column label="开户行账号" prop="account"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="commoncorporationLogicDelete(scope.row.id)"
            >删除</el-button>
            <el-button
              v-if="scope.row.state"
              type="text"
              size="small"
              @click="commoncorporationUpdate(scope.row.id, 0)"
            >启用</el-button>
            <el-button
              v-else
              type="text"
              size="small"
              @click="commoncorporationUpdate(scope.row.id, 1)"
            >停用</el-button>
          </template>
        </el-table-column>
      </d-table>
    </fieldset>
    <el-dialog :visible.sync="visible" title v-dialogDrag :show-close="false" width="1000px">
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">公司账户设置</h3>
        <div>
          <el-button type="primary" size="mini" @click="saveCompany">保存</el-button>
          <el-button size="mini" @click="visible=false">关闭</el-button>
        </div>
      </div>
      <add-company
        @refresh="refresh"
        :editId="editId"
        :isEdit="isEdit"
        v-if="visible"
        ref="addCompany"
      ></add-company>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import addCompany from './components/add-company'
export default {
  data() {
    return {
      queryForm: {
        page: 1,
        limit: 15
      },
      activeName: 'first',
      isEdit: false,
      editId: null,
      tableData: [],
      visible: false
    }
  },
  components: {
    addCompany
  },
  methods: {
    // 编辑
    edit(id) {
      this.visible = true
      this.isEdit = true
      this.editId = id
    },
    // 刷新
    refresh() {
      this.$refs.companyTable.reload(1)
      this.visible = false
    },
    // 保存
    saveCompany() {
      this.$refs.addCompany && this.$refs.addCompany.saveCompany()
    },
    commoncorporationLogicDelete(id) {
      this.$confirm(`是否删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seeBaseinfoService.commoncorporationLogicDelete({ id }).then(res => {
          this.$refs.companyTable.reload(1);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    commoncorporationUpdate(id, state) {
      this.$confirm(`是否${state ? '停用' : '启用'}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seeBaseinfoService.commoncorporationUpdate(
          { id, state }).then(res => {
          this.$refs.companyTable.reload(1);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-input-number--mini {
  width: 100px;
}
</style>
