/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 11:31:58
 * @Description: 销售-报价单
 */
<template>
  <div>
    <table-view
      type="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="报价单"
      @clear-filter="reset()"
      api="bizSystemService.getEmployeeList"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
    >
      <template v-slot:filter>
        <filters
          ref="filters"
          @submit-filter="$refs.table.reload(1)"
          :form="queryForm"
        />
      </template>
      <!-- 自定义按钮功能 -->
      <template
        v-if="button"
        v-slot:button
      >
        <el-button
          size="mini"
          type="primary"
          @click="eventHandle('add')"
        >新建</el-button>
        <el-button
          size="mini"
          @click="eventHandle('merge')"
        >合并生成出库单</el-button>
        <el-button
          size="mini"
          @click="eventHandle('copy')"
        >复制生成报价单</el-button>
      </template>
      <template v-slot:moreButton>自定义更多按钮</template>
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="eventHandle('quoto',row)"
        > 报价单编号</span>
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
import quotoDetails from './quoto-details' //报价详情
import outLibDetails from '../outLibrary/outLib-details' //销售详
import filters from './filter' //筛选

import add from './add' //新增
import merge from './merge' //合并
export default {
  name: 'quote',
  components: {
    quotoDetails,
    outLibDetails,
    add,
    merge,
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
      }
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      // 防止row为undefined 导致报错
      row = row ? row : {}
      // 这里对象key用中文会不会有隐患? TODO
      let typeObj = {
        'add': { comp: 'add', title: '新增报价单' },
        '编辑': { comp: 'add', title: `编辑报价单:${row.id}` },
        'copy': { comp: 'add', title: '复制报价单' },
        'merge': { comp: 'merge', title: '合并生成销售出库单' },
        'quoto': { comp: 'quotoDetails', title: `报价单:${row.id}` },
        'outLib': { comp: 'outLibDetails', title: `销售出库单:${row.id}` },
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
