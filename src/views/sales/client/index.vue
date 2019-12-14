/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-14 20:04:55
 * @Description: 销售-客户管理
 */
<template>
  <div>
    <table-view
      busType="41"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_sales_client_08')"
      :column="true"
      title="客户管理"
      api="seePsiCommonService.commonclientinfoPagelist"
      :mergeFilter="true"
      :filterOptions="filterOptions"
      exportApi="seePsiCommonService.commonclientinfoExport"
      :params="Object.assign(queryForm,params)"
    >
      <template v-slot:button>
        <el-button
          type="primary"
          size="mini"
          @click="eventHandle('addVisible')"
          v-if="authorityButtons.includes('psi_sales_client_03')"
        >新增客户</el-button>
      </template>
      <!-- 自定义按钮功能 -->

      <template slot-scope="{column,row,value}">
        <!-- 客户编号 -->
        <span
          class="d-text-blue d-pointer"
          v-if="column.columnFields=='code'"
          @click="eventHandle('detailVisible',row)"
        > {{value}}</span>

        <!-- 行业 -->
        <span v-else-if="column.columnFields=='trade'">{{value | dictionary('PSI_KH_HY')}}</span>
        <!-- 来源 -->
        <span v-else-if="column.columnFields=='source'">{{value | dictionary('PSI_KHGL_LY')}}</span>
        <!-- 客户级别 -->
        <span v-else-if="column.columnFields=='grade'">{{value | dictionary('PSI_KH_KHJB')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>

    <!-- 客户详情  有些信息是点击后才加载 所以使用v-if-->
    <clientDetail
      v-if="detailVisible"
      :code="rowData.code"
      :visible.sync="detailVisible"
      :rowData="rowData"
      @reload="$refs.table.reload()"
    />
    <!-- 客户新增-->
    <clientAdd
      type="add"
      :visible.sync="addVisible"
      :rowData="rowData"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
import clientAdd from './add' // 客户新增
import clientDetail from './details' //客户详情
export default {
  name: 'return',
  components: {
    clientAdd,
    clientDetail
  },
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      loading: false,
      // 查询表单
      queryForm: {
        code: '', // 示例：编号,
        fuzzyClientName: '', // 客户姓名模糊查询用
        deptTotalCode: '', // 示例：部门code,
        grade: '', // 示例：客户级别,
        linkManName: '', // 示例：联系人,
        phone: '', // 示例：客户手机号,
        page: 1,
        limit: 20,
      },
      rowData: {},
      addVisible: false,
      detailVisible: false,
      // 筛选框数据
      filterOptions: [
        { label: '客户名称', prop: 'clientName', default: true, type: 'text' },
      ]
    };
  },
  methods: {
    // 按钮功能操作
    // 按钮功能操作
    eventHandle(type, row) {
      this.rowData = row ? row : {}
      this[type] = true
    }
  }
};
</script>
