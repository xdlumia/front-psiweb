<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:47:01
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2020-01-02 18:09:42
 * @Description: 目标管理
 -->
<template>
  <div class>
    <table-view
      ref="table"
      :filter="true"
      :filterOptions="filterOptions"
      :busType="38"
      title="目标管理"
      api="seePsiCommonService.commonpromotiongoalList"
      :params="Object.assign(queryForm, params)"
      exportApi="seePsiCommonService.commonpromotiongoalExport"
      :exportButton="authorityButtons.includes('psi_goal_manage_1005')"
    >
      <template v-slot:filter>自定义筛选列</template>
      <!-- 自定义按钮功能 -->
      <template v-slot:button v-if="authorityButtons.includes('psi_goal_manage_1001')">
        <el-button size="mini" type="primary" @click="editId = null,visible = true">新增目标</el-button>
      </template>
      <template slot-scope="{column,row,value,scope}">
        <el-button
          type="text"
          v-if="column.columnFields=='code'"
          @click="detail(scope.row)"
          style="padding:0"
        >{{scope.row.code | codeSlice}}</el-button>
        <span v-else-if="column.columnFields=='state'">{{stateText[scope.row.state]}}</span>
        <span
          v-else-if="column.columnFields=='begTime'"
        >{{scope.row.begTime|timeToStr('YYYY-MM-DD hh:mm:ss')}}-{{scope.row.endTime|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
      <el-table-column label="www"></el-table-column>
    </table-view>
    <add-objective
      :visible.sync="visible"
      ref="addObjective"
      v-if="visible"
      @refresh="$refs.table.reload"
    ></add-objective>
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
import addObjective from './add-objective'
import detail from './detail'
export default {
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 15 })
    }
  },
  data () {
    return {
      rowData: null,
      code: null,
      showDetail: false,
      visible: false,
      queryForm: {
        limit: 15,
        page: 1
      },
      stateText: {
        0: '已启用',
        1: '已停用',
        2: '已过期'
      },
      editId: null,
      filterOptions: [
        { label: '目标编号', prop: 'code', default: true },
        { label: '目标名称', prop: 'promotionName', default: true },
        // {          label: '状态',
        //   prop: 'state',
        //   type: 'select',
        //   default: true,
        //   options: [
        //     { label: '全部', value: null },
        //     { label: '启用', value: 0 },
        //     { label: '停用', value: 1 }
        //   ]
        // },
        { label: '目标时间', prop: 'BegTime', default: true, type: 'dateRange' },
        { label: '目标金额', prop: 'SumMoney', type: 'numberrange', default: true },
        { label: '参与人数', prop: 'SumUserNum', type: 'numberrange', default: true },
        {
          label: '创建人',
          prop: 'creator',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
        { label: '创建时间', prop: 'CreateTime', type: 'dateRange', default: true }
      ]
    }
  },
  mounted () {
  },
  components: {
    addObjective,
    detail
  },
  methods: {
    detail (row) {
      this.rowData = row
      this.code = row.code
      this.showDetail = true
    },
    commonwmsmanagerUpdateState (id, state) {
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
    commonwmsmanagerLogicDelete (id) {
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
    saveFacilitator () {
      this.$refs.addObjective && this.$refs.addObjective.commonserviceproviderSave()
    },
    refresh () {
      this.visible = false
      this.$refs.table.reload()
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
