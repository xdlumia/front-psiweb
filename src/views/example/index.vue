<template>
  <el-container class='d-content'>
    <el-header class="p0" height="50">
      <h2 class="f18 b fl lh50">用户列表</h2>
      <div class="d-inline fr">
        <el-button
          v-if="authorityButtons.includes('sys_employee_1001')"
          size="medium"
          @click="addUser"
          class="mr10 mt10"
          icon="el-icon-plus">新建</el-button>
        <el-popover
          class='mr20'
          placement="bottom"
          width="280"
          transition="fade-in-linear"
          trigger="click">
          <div class="pl5 pr5 d-text-qgray">
            <div class="ptb10 bb ac">
              <span class="d-text-gray b ">筛选</span>
              <span @click="clearFilter" class="fr f12 d-text-blue d-pointer">清除筛选</span>
            </div>
            <el-form size="mini" ref="filterForm" :model="filterForm">
              <el-form-item label="联系人">
                <el-input v-model="filterForm.field1" class="bn" placeholder="请输入用户名" size="small" style="width: 100%;">
                  <el-button @click="loadAllUsers" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <employees-select v-model="filterForm.field2" @onSelect="loadAllUsers"></employees-select>
              </el-form-item>
              <el-form-item label="创建日期">
                <el-radio-group v-model="filterForm.dateRangeSelect" class="label-checkbox" @change="changeDateRange">
                  <el-radio-button v-for="range in filterDateRangeList" :label="range.key" :key="range.key">
                    <div :class="range.class" class="d-circle d-round12"></div>
                    <span> {{range.text}}</span>
                  </el-radio-button>
                </el-radio-group>
                <div class="ml15">
                  <div class="d-circle d-round12 d-bg-geblc"></div>
                  <el-date-picker
                    :clearable=false
                    style="width:220px"
                    size="mini"
                    @change="loadAllUsers"
                    v-model="filterForm.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <el-button slot="reference" size="mini" type='text'><i class="iconfont icon-filter"></i></el-button>
        </el-popover>
      </div>
    </el-header>
    <el-main class="p0">
      <el-table
        height='calc(100vh - 210px)'
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        border
        class="mt10"
      >
        <el-table-column
          align='center'
          label="用户名"
          min-width="160"
          prop="userName"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align='center'
          label="性别"
          min-width="140"
          prop="sex"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align='politicalStatus'
          label="政治面貌"
          min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.politicalStatus | dictionary('EX_POLITICAL_STATUS')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          prop="highestDegree"
          label="文化程度"
          min-width="170">
          <template slot-scope="scope">
            <span>{{scope.row.politicalStatus | dictionary('EX_HIGHEST_DEGREE')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          prop="linkman"
          label="联系人"
          min-width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align='center'
          label="联系方式"
          min-width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          label="状态"
          min-width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align='center'
          label="操作"
          min-width="180">
          <template slot-scope="scope">
            <div>
              <el-button v-if="authorityButtons.includes('sys_employee_1002')"
                         @click="editUser(scope.row)" type="primary" size='mini'>修改
              </el-button>
              <el-button v-if="authorityButtons.includes('sys_employee_1003')"
                         @click="deleteUser(scope.row)" type="danger" size='mini'>删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt10 ac"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page.sync="pagination.page"
        :page-size="pagination.limit"
        layout="total, prev, pager, next"
        :total="pagination.count">
      </el-pagination>
    </el-main>
    <side-popup :visible.sync='popupRight.dialogVisiblePopup'
                :title='popupRight.title'
                :width='popupRight.width'
    >
      <div slot='header'>
        <el-button type="primary"  size="small"
                   @click="saveOrUpdateUser"
                   v-if="popupRight.formState !== 3">保存
        </el-button>
      </div>
      <div slot='body'>
        <example-form v-if="popupRight.dialogVisiblePopup" ref="exampleForm" :popupRight="popupRight"></example-form>
      </div>
    </side-popup>
  </el-container>
</template>
<script>
import moment from 'moment'
import exampleForm from './form'

export default {
  props: {},
  data () {
    return {
      loading: false, // 表格加载标志
      selectValue: this.value,
      pagination: {
        page: 1, // 当前显示页
        limit: 15, // 每页显示数量
        count: 0
      },
      filterForm: { // 筛选条件
        field1: '',
        field2: '',
        field3: [],
        dateRangeSelect: 3, // 默认近3天
        dateRange: this.createDateRange(3)
      },
      popupRight: {
        title: '',
        point: '',
        width: '800px',
        dialogVisiblePopup: false,
        formState: 1, // 1 新增 2 编辑 3 查看
        id: ''
      },
      filterDateRangeList: [{
        key: 3,
        text: '近三天',
        class: 'd-bg-pink'
      }, {
        key: 7,
        text: '近一周',
        class: 'd-bg-brown'
      }, {
        key: 30,
        text: '近一月',
        class: 'd-bg-blue'
      }, {
        key: 180,
        text: '近半年',
        class: 'd-bg-cyan'
      }],
      tableData: [],
      options: []
    }
  },
  components: {
    exampleForm
  },
  computed: {},
  created () {
    this.registryDictionary('EX_POLITICAL_STATUS', [{
      code: 1,
      content: '党员'
    }, {
      code: 2,
      content: '团员'
    }, {
      code: 3,
      content: '少先队员'
    }, {
      code: 4,
      content: '群众'
    }])

    this.registryDictionary('EX_HIGHEST_DEGREE', [{
      code: 1,
      content: '本科'
    }, {
      code: 2,
      content: '硕士'
    }, {
      code: 3,
      content: '博士'
    }, {
      code: 4,
      content: '大专'
    }])

    this.loadAllUsers() // 查询房屋图片详情
  },
  mounted () {
  },
  watch: {
    value: function (newValue) {
      this.selectValue = newValue
    }
  },
  methods: {
    // 加载表格数据
    loadAllUsers () {
      this.loading = true

      this.$api.exampleService.userList({...this.pagination,
        ...this.filterForm,
        startTime: this.filterForm.dateRange[0].valueOf(),
        endTime: this.filterForm.dateRange[1].valueOf()
      }).then((res) => {
        let {data, count, curr} = res

        Object.assign(this.pagination, {
          page: curr,
          count
        })
        this.tableData = data
      }).finally(() => {
        this.loading = false
      })
    },
    // 分页条当前页改变
    handleCurrentPageChange (val) {
      this.pagination.page = val
      this.loadAllUsers()
    },
    // 分页条大小改变
    handleSizeChange (val) {
      this.pagination.limit = val
      this.loadAllUsers()
    },
    createDateRange (days) {
      return [moment().hour(0).minute(0).second(0).subtract('days', days), moment().hour(23).minute(59).second(59)]
    },
    // 时间返回修改修改
    changeDateRange () {
      this.filterForm.dateRange = this.createDateRange(this.filterForm.dateRangeSelect)
      this.loadAllUsers()
    },
    saveOrUpdateUser () {
      this.$refs.exampleForm.saveOrUpdate().then((res) => {
        this.loadAllUsers()
        this.popupRight.dialogVisiblePopup = false
      })
    },
    addUser () {
      Object.assign(this.popupRight, {
        formState: 1,
        dialogVisiblePopup: true
      })
    },
    editUser (row) {
      Object.assign(this.popupRight, {
        formState: 2,
        id: row.id,
        dialogVisiblePopup: true
      })
    },
    deleteUser (row) {

    },
    // 清除筛选
    clearFilter () {
      this.pagination.page = 1
      Object.assign(this.filterForm, { // 筛选条件
        field1: '',
        field2: '',
        field3: [],
        dateRangeSelect: 3, // 默认近3天
        dateRange: this.createDateRange(3)
      })

      this.loadAllUsers()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
<style>
  .label-checkbox .el-checkbox-button .el-checkbox-button__inner,.label-checkbox .el-radio-button .el-radio-button__inner {
    text-align: left;
    background-color: transparent;
    color: black;
    box-shadow: none;
    border: 0;
  }
  .label-checkbox .el-radio-button,.label-checkbox .el-checkbox-button,
  .label-checkbox .el-checkbox-button__inner,
  .label-checkbox .el-radio-button__inner {
    width: 100%;
  }
  .label-checkbox .el-checkbox-button.is-checked .el-checkbox-button__inner:before,.label-checkbox .el-radio-button.is-active .el-radio-button__inner:before {
    content: "\E611";
    position: absolute;
    right: 20px;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    font-family: element-icons!important;
  }
</style>
