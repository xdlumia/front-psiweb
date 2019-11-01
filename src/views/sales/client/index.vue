/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 15:02:30
 * @Description: 销售-客户管理
 */
<template>
  <div>
    <table-view
      type="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="客户管理"
      @clear-filter="reset()"
      api="bizSystemService.getEmployeeList"
      exportApi="bizSystemService.getEmployeeList"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
      :filterOptions="filterOptions"
    >
      <template v-slot:button>
        <el-button
          type="primary"
          size="mini"
          @click="eventHandle('add')"
        >新增客户</el-button>
      </template>
      <template v-slot:filter>
        <filters
          ref="filters"
          @submit-filter="$refs.table.reload(1)"
          :form="queryForm"
        />
      </template>
      <!-- 自定义按钮功能 -->

      <template v-slot:moreButton>自定义更多按钮</template>
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="eventHandle('return',row)"
        > 销售退货单编号</span>
        <span @click="eventHandle('outLib',row)">销售出库单编号</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 新增 / 编辑 弹出框-->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      width="920px"
      v-dialogDrag
    >
      <components
        :is="dialogData.component"
        :dialogData="dialogData"
        @reload="$refs.table.reload(1)"
      ></components>
    </el-dialog>

    <!-- 抽屉弹出框 -->
    <side-detail
      :title="drawerData.title"
      :visible.sync="drawerData.visible"
      width="920px"
    >
      <components
        @buttonClick="eventHandle"
        :is="drawerData.component"
        :drawerData="drawerData"
        @reload="$refs.table.reload(1)"
      ></components>
    </side-detail>
  </div>
</template>
<script>
import clientAdd from './clientAdd' // 客户新增
import outLibDetails from '../outLibrary/outLib-details' //销售出库单详情
import filters from './filter' //筛选
let filterList = [
  { label: '排序', prop: 'sort', default: true, type: 'sort', options: [], },
  { label: '客户编号', prop: 'title', default: true, type: 'text' },
  { label: '客户名称', prop: 'city', default: true, type: 'text' },
  { label: '联系人', prop: 'pushTime', default: true, type: 'employee', },
  { label: '联系电话', prop: 'status', default: true, type: 'text' },
  { label: '提交人', prop: 'messageType', default: true, type: 'employee', },
  { label: '部门', prop: 'messageType2', default: true, type: 'employee', },
  { label: '提交时间', prop: 'messageType3', default: true, type: 'daterange', },
]
export default {
  name: 'return',
  components: {
    clientAdd,
    outLibDetails,
    filters
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
        title: "", // 标题
        city: "", // 城市
        pushTime: "",
        messageType: "",
        status: "",
        page: 1,
        limit: 20
      },
      //dialog弹出框
      dialogData: {
        visible: false,
        title: '',
        type: '',
        data: '',
      },
      // 侧边栏弹出框
      drawerData: {
        visible: false,
        title: '',
        type: '',
        data: '',
      },
      // 筛选框数据
      filterOptions: filterList
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      // 防止row为undefined 导致报错
      row = row ? row : {}
      // 这里对象key用中文会不会有隐患? TODO
      let typeObj = {
        'add': { comp: 'clientAdd', title: `新增客户` },
        '编辑': { comp: 'add', title: `编辑报价单:${row.id}` },
        'outLib': { comp: 'outLibDetails', title: '销售出库单' },
        '生成销售出库单': { comp: 'outLibDetails', title: '生成销售出库单' },
        '生成请购单': { comp: 'outLibDetails', title: '生成请购单' },
      }
      // 如果type是isDialog里的类型调用dialog弹出框
      let isDialog = ['add', '编辑', 'copy', 'merge']
      if (isDialog.includes(type)) {
        this.dialogData.visible = true
        this.dialogData.type = type
        this.dialogData.title = typeObj[type].title
        this.dialogData.component = typeObj[type].comp
        this.dialogData.data = row;
      } else {
        this.drawerData.visible = true
        this.drawerData.type = type
        this.drawerData.title = typeObj[type].title
        this.drawerData.component = typeObj[type].comp
        this.drawerData.data = row;
      }
    },
    // 多选
    selectionChange(val) {
      console.log(val);

    },
    submitFilter() {
      this.$emit('submit-filter')
    },
    // 重置
    reset() {
      this.$refs.filters.$refs.form.resetFields()
      this.$refs.table.reload(1);
    },
  }
};
</script>
