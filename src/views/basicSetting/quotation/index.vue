<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:47:01
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2019-12-25 14:02:20
 * @Description: 报价单配置
 -->
<template>
  <div class>
    <table-view
      ref="table"
      :filter="true"
      :filterOptions="filterOptions"
      :busType="35"
      title="报价单配置库"
      api="seePsiCommonService.commonquotationconfigList"
      :params="Object.assign(queryForm, params)"
      exportApi="seePsiCommonService.commonquotationconfigExport"
      :exportButton="authorityButtons.includes('psi_pricelist_1005')"
    >
      <template v-slot:filter>自定义筛选列</template>
      <!-- 自定义按钮功能 -->
      <template v-slot:button v-if="authorityButtons.includes('psi_pricelist_1001')">
        <el-button size="mini" type="primary" @click="editId = null,visible = true">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,scope}">
        <el-button
          type="text"
          v-if="column.columnFields=='code'"
          @click="detail(scope.row)"
          style="padding:0"
        >{{scope.row.code | codeSlice}}</el-button>
        <span v-else-if="column.columnFields=='state'">{{scope.row.state ? '已停用' : '已启用'}}</span>
        <span v-else>{{value}}</span>
      </template>
      <el-table-column label="www"></el-table-column>
    </table-view>
    <add-quotation
      :visible.sync="visible"
      ref="addQuotation"
      v-if="visible"
      @refresh="$refs.table.reload"
    ></add-quotation>
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
import addQuotation from './add-quotation'
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
        page: 1,
        type: 0
      },
      editId: null,
      filterOptions: [
        { label: '配置编号', prop: 'code', default: true },
        { label: '商品名称', prop: 'goodsName', default: true },
        { label: '配置名称', prop: 'quotationName', default: true },
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
    addQuotation,
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
      this.$refs.addQuotation && this.$refs.addQuotation.commonserviceproviderSave()
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
