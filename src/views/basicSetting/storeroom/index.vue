<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:47:01
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-10 10:41:03
 * @Description: 库房管理
 -->
<template>
  <div class>
    <table-view
      ref="table"
      :filter="true"
      :filterOptions="filterOptions"
      :busType="46"
      title="库房管理"
      api="seePsiWmsService.commonwmsmanagerList"
      exportApi="seePsiWmsService.commonwmsmanagerExport"
      :params="Object.assign(queryForm, params)"
      :exportButton="authorityButtons.includes('psi_warehouse_1005')"
    >
      <template v-slot:filter>自定义筛选列</template>
      <!-- 自定义按钮功能 -->
      <template v-slot:button v-if="authorityButtons.includes('psi_warehouse_1001')">
        <el-button size="mini" type="primary" @click="editId = null,visible = true">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,scope}">
        <span v-if="column.columnFields=='operation'">
          <el-button
            v-if="!scope.row.state && authorityButtons.includes('psi_warehouse_1002')"
            type="text"
            @click="editId = scope.row.id,visible = true"
            style="padding:0"
          >编辑</el-button>
          <el-button
            type="text"
            v-if="!scope.row.state && authorityButtons.includes('psi_warehouse_1006')"
            @click="commonwmsmanagerLogicDelete(scope.row.id)"
            style="padding:0"
          >删除</el-button>
          <el-button
            type="text"
            v-if="scope.row.state == 1 && authorityButtons.includes('psi_warehouse_1004')"
            :disabled="scope.row.state !== 1"
            @click="commonwmsmanagerUpdateState(scope.row.id, 0)"
            style="padding:0"
          >停用</el-button>
          <el-button
            @click="commonwmsmanagerUpdateState(scope.row.id, 1)"
            type="text"
            v-else-if="!scope.row.state && authorityButtons.includes('psi_warehouse_1003')"
            style="padding:0"
          >启用</el-button>
        </span>
        <span v-else-if="column.columnFields=='state'">{{stateText[row.state]}}</span>
        <span v-else>{{value}}</span>
      </template>
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
      <add-store-room ref="addStoreRoom" :editId="editId" v-if="visible"
@refresh="refresh"></add-store-room>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import addStoreRoom from './add-storeroom'
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
  data() {
    return {
      visible: false,
      queryForm: {
        limit: 15,
        page: 1
      },
      editId: null,
      stateText: {
        0: '已停用',
        1: '启用中',
        2: '盘点中'
      },
      filterOptions: [
        { label: '库房名', prop: 'name', default: true },
        { label: '负责人', prop: 'personInChargeId', type: 'employee', default: true },
        {
          label: '状态',
          prop: 'state',
          type: 'select',
          default: true,
          options: [
            { label: '全部', value: null },
            { label: '启用中', value: 1 },
            { label: '已停用', value: 0 },
            { label: '盘点中', value: 2 }
          ]
        },
        {
          label: '创建人',
          prop: 'creator',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
        { label: '创建时间', prop: 'Time', type: 'dateRange', default: true }
      ]
    }
  },
  mounted() {
  },
  components: {
    addStoreRoom
  },
  methods: {
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
    saveStoreRoom() {
      this.$refs.addStoreRoom && this.$refs.addStoreRoom.commonwmsmanagerSave()
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
