<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:47:01
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-05 10:05:29
 * @Description: 促销管理
 -->
<template>
  <div class>
    <table-view
      ref="table"
      :filter="true"
      :filterOptions="filterOptions"
      :busType="37"
      title="促销管理"
      api="seePsiCommonService.commonpromotionList"
      :params="Object.assign(queryForm, params)"
      exportApi="seePsiCommonService.commonpromotionExport"
    >
      <template v-slot:filter>自定义筛选列</template>
      <!-- 自定义按钮功能 -->
      <template v-slot:button>
        <el-button size="mini" type="primary" @click="visible = true">新增促销</el-button>
      </template>
      <template slot-scope="{column,row,value,scope}">
        <el-button
          type="text"
          v-if="column.columnFields=='code'"
          @click="detail(scope.row)"
          style="padding:0"
        >{{scope.row.code}}</el-button>
        <span v-else-if="column.columnFields=='state'">{{stateText[scope.row.state]}}</span>
        <span
          v-else-if="column.columnFields=='begTime'"
        >{{scope.row.begTime|timeToStr('YYYY-MM-DD hh:mm:ss')}}-{{scope.row.endTime|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
      <el-table-column label="www"></el-table-column>
    </table-view>
    <add-promotion
      :visible.sync="visible"
      ref="addPromotion"
      v-if="visible"
      @refresh="$refs.table.reload"
    ></add-promotion>
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
import addPromotion from './add-promotion'
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
      editId: null,
      stateText: {
        0: '已启用',
        1: '已停用',
        2: '已过期'
      },
      filterOptions: [
        { label: '促销编号', prop: 'code', default: true },
        { label: '促销名称', prop: 'promotionName', default: true },
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
        { label: '促销时间', prop: 'BegTime', type: 'dateRange', default: true },
        { label: '促销目标', prop: 'PromotionTarget', type: 'numberrange', default: true },
        { label: '参与商品', prop: 'CommodityNum', type: 'numberrange', default: true },
        { label: '参与人(人数)', prop: 'UserNum', type: 'numberrange', default: true },
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
    addPromotion,
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
      this.$refs.addPromotion && this.$refs.addPromotion.commonserviceproviderSave()
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
