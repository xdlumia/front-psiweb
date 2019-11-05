<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:47:01
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-05 17:37:06
 * @Description: 库房管理
 -->
<template>
  <div class>
    <table-view
      type="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :filterOptions="filterOptions"
      :column="true"
      :busType="46"
      title="库房管理"
      api="seePsiWmsService.commonwmsmanagerList"
      :params="queryForm"
    >
      <template v-slot:filter>自定义筛选列</template>
      <!-- 自定义按钮功能 -->
      <template v-slot:button>
        <el-button size="mini" type="primary" @click="editId = null,visible = true">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,scope}">
        <span v-if="column.columnFields=='operation'">
          <el-button type="text" @click="editId = scope.row.id,visible = true">编辑</el-button>
          <el-button
            type="text"
            v-if="!scope.row.state"
            @click="commonwmsmanagerLogicDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            type="text"
            v-if="scope.row.state"
            @click="commonwmsmanagerUpdateState(scope.row.id, 0)"
          >停用</el-button>
          <el-button @click="commonwmsmanagerUpdateState(scope.row.id, 1)" type="text" v-else>启用</el-button>
        </span>
        <span v-if="column.columnFields=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
      <el-table-column label="www"></el-table-column>
    </table-view>
    <el-dialog
      :visible.sync="visible"
      top="20vh"
      v-dialogDrag
      :show-close="false"
      width="1000px"
      title="新增库房"
    >
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">新增库房</h3>
        <div>
          <el-button type="primary" size="mini" @click="saveStoreRoom">保存</el-button>
          <el-button size="mini" @click="visible=false">关闭</el-button>
        </div>
      </div>
      <add-store-room ref="addStoreRoom" :editId="editId" v-if="visible" @refresh="refresh"></add-store-room>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import addStoreRoom from './add-storeroom'
export default {
  data () {
    return {
      visible: false,
      queryForm: {
        limit: 15,
        page: 1
      },
      editId: null,
      filterOptions: [
        { label: '库房名', prop: 'name', default: true },
        { label: '负责人', prop: 'personInChargeName', type: 'employee', default: true },
        {
          label: '创建人',
          prop: 'creatorName',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptName', type: 'dept', default: true },
        { label: '创建时间', prop: 'Time', type: 'dateRange', default: true }
      ]
    }
  },
  mounted () {
  },
  components: {
    addStoreRoom
  },
  methods: {
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
    saveStoreRoom () {
      this.$refs.addStoreRoom && this.$refs.addStoreRoom.commonwmsmanagerSave()
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
