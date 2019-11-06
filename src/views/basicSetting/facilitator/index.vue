<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:47:01
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-06 16:46:22
 * @Description: 服务商
 -->
<template>
  <div class>
    <table-view
      ref="table"
      :filter="true"
      :filterOptions="filterOptions"
      :busType="36"
      title="服务商管理"
      api="seePsiCommonService.commonserviceproviderList"
      :params="queryForm"
    >
      <template v-slot:filter>自定义筛选列</template>
      <!-- 自定义按钮功能 -->
      <template v-slot:button>
        <el-button size="mini" type="primary" @click="editId = null,visible = true">新增服务商</el-button>
      </template>
      <template slot-scope="{column,row,value,scope}">
        <el-button
          type="text"
          v-if="column.columnFields=='code'"
          @click="detail(scope.row)"
        >{{scope.row.code}}</el-button>
        <span v-else-if="column.columnFields=='state'">{{scope.row.state ? '停用' : '启用'}}</span>
        <span
          v-else-if="column.columnFields=='createTime'"
        >{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
      <el-table-column label="www"></el-table-column>
    </table-view>
    <add-facilitator
      :visible.sync="visible"
      ref="addFacilitator"
      v-if="visible"
      @refresh="$refs.table.reload"
    ></add-facilitator>
    <detail
      @refresh="$refs.table.reload(queryForm.page)"
      v-if="showDetail"
      :rowData="rowData"
      :code="code"
      :visible.sync="showDetail"
    ></detail>
  </div>
</template>

<script type='text/ecmascript-6'>
import addFacilitator from './add-facilitator'
import detail from './detail'
export default {
  data() {
    return {
      rowData: null,
      code: null,
      showDetail: false,
      visible: false,
      queryForm: {
        limit: 15,
        page: 1
      },
      editId: null,
      filterOptions: [
        { label: '服务商编号', prop: 'code', default: true },
        { label: '服务商名称', prop: 'fuzzyServiceName', default: true },
        { label: '状态',
          prop: 'state',
          type: 'select',
          default: true,
          options: [
            { label: '全部', value: null },
            { label: '启用', value: 0 },
            { label: '停用', value: 1 }
          ]
        },
        { label: '联系人', prop: 'linkMan', default: true },
        { label: '联系电话', prop: 'personInChargeName', default: true },
        {
          label: '创建人',
          prop: 'creator',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptName', type: 'dept', default: true },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange', default: true }
      ]
    }
  },
  mounted() {
  },
  components: {
    addFacilitator,
    detail
  },
  methods: {
    detail(row) {
      this.rowData = row
      this.code = row.code
      this.showDetail = true
    },
    commonwmsmanagerUpdateState(id, state) {
      this.$confirm(`是否${state ? '启用' : '停用'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.commonwmsmanagerUpdateState({ id, state }).then(res => {
          this.$refs.table.reload(this.queryForm.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    commonwmsmanagerLogicDelete(id) {
      this.$confirm(`是否删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.commonwmsmanagerLogicDelete({ id }).then(res => {
          this.$refs.table.reload(this.queryForm.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    saveFacilitator() {
      this.$refs.addFacilitator && this.$refs.addFacilitator.commonserviceproviderSave()
    },
    refresh() {
      this.visible = false
      this.$refs.table.reload()
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
