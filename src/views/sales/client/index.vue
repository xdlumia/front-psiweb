/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-19 13:54:31
 * @Description: 销售-客户管理
 */
<template>
  <div>
    <table-view
      class="client-table"
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
        > {{value | codeSlice}}</span>

        <!-- 行业 -->
        <span v-else-if="column.columnFields=='trade'">{{value | dictionary('PSI_KH_HY')}}</span>
        <!-- 来源 -->
        <span v-else-if="column.columnFields=='source'">{{value | dictionary('PSI_KHGL_LY')}}</span>
        <!-- 客户级别 -->
        <span v-else-if="column.columnFields=='grade'">{{value | dictionary('PSI_KH_KHJB')}}</span>
        <span v-else>{{value}}</span>
      </template>
      <!-- 右侧内容 -->
      <el-aside
        slot='tree'
        width="250px"
        class="choose-aside fl"
      >
        <el-input
          class="mt5 mb5 ml5"
          size="small"
          v-model="filterText"
          placeholder="搜索责任人"
        ></el-input>

        <el-button
          type="text"
          class="ml10"
          @click="clickAll"
        >全部</el-button>
        <p
          class="d-pointer common-btn"
          :class="{active:queryForm.responsibleUser == -1}"
          style="color:#606266"
          @click="handleNodeClick({userId:-1})"
        >公共</p>
        <el-tree
          :expand-on-click-node="false"
          style="height: calc(100vh - 242px);"
          class="ml10 d-auto-x"
          :data="treeData"
          @node-click="handleNodeClick"
          default-expand-all
          :props="{children: 'employeeList', label: 'employeeName' }"
          :filter-node-method="filterNode"
          ref="tree"
        >
        </el-tree>
      </el-aside>
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
        responsibleUser: '', //责任人
        page: 1,
        limit: 20,
      },
      filterText: '',
      treeData: [],
      rowData: {},
      addVisible: false,
      detailVisible: false,
      // 筛选框数据
      filterOptions: [
        { label: '客户名称', prop: 'clientName', default: true, type: 'text' },
        { label: '客户关联', prop: 'customerAssociated', default: true, type: 'text' },
      ]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getTreeData()
  },
  methods: {
    // 重新加载表格
    reload() {
      this.$refs.table.reload()
    },
    //请求树列表的数据
    getTreeData() {
      this.$api.bizSystemService.getDeptList({ type: '1' })
        .then(res => {
          let data = res.data || []
          let formatTree = treeData => treeData.map(item => {
            item.employeeName = item.deptName
            if (item.children) {
              formatTree(item.children)
              item.employeeList.unshift(...item.children)
              return item
            } else {
              return []
            }
          })
          this.treeData = formatTree(data)
        })
        .finally(() => {

        })
    },
    //点击树节点
    handleNodeClick(data) {
      // 点击人员的查询
      if (!data.totalCode) {
        this.queryForm.responsibleUser = data.userId
        this.queryForm.responsibleDeptCode = ''
        this.reload()
      } else {
        // 部门查询
        this.queryForm.responsibleUser = ''
        this.queryForm.responsibleDeptCode = data.totalCode
        this.reload()
      }
    },
    clickAll() {
      this.queryForm.responsibleUser = ''
      this.reload()
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.employeeName.indexOf(value) !== -1;
    },
    // 按钮功能操作
    eventHandle(type, row) {
      this.rowData = row ? row : {}
      this[type] = true
    }
  }
};
</script>
<style lang="scss" scoped>
.choose-aside {
  border: 1px solid #f2f2f2;
  border-bottom: none;
  float: left;
}
.common-btn {
  margin-left: 10px;
  padding-left: 10px;
  height: 28px;
  line-height: 28px;
  &:hover {
    background-color: #f3f6f9;
  }
  &.active {
    background-color: #f3f6f9;
  }
}
/deep/.client-table .d-table {
  float: left;
  width: calc(100% - 250px) !important;
}
</style>
