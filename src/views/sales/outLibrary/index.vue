/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 15:20:08
 * @Description: 销售-销售出库单
 */
<template>
  <div>
    <table-view
      type="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="销售出库单"
      api="bizSystemService.getEmployeeList"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
    >
      <template v-slot:filter>自定义筛选列</template>
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="buttonsHandle('outLib',row)"
        >销售出库单编号</span>
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
        @buttonClick="buttonsHandle"
        :is="drawerData.component"
        :drawerData="drawerData"
        @reload="$refs.table.reload(1)"
      ></components>
    </side-detail>

  </div>
</template>
<script>
import outLibDetails from './outLib-details' //销售出库单详情
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
      default: () => {
        return {}
      }
    },
  },
  components: {
    outLibDetails,
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
    buttonsHandle(type, row) {
      let typeObj = {
        add: { comp: 'add', title: '新增报价单' },
        outLib: { comp: 'outLibDetails', title: '销售出库单' },
      }
      // 如果是新增复制合并调用dialog弹出框
      if (type == "add") {
        this.dialogVisible = true
      } else {
        // 否则调用抽屉弹出框
        this.drawerVisible = true;
      }
      // 非新增才会有row数据
      if (type != 'add') {
        this.drawerData.data = row;
      }

      this.drawerData.type = type
      this.drawerData.title = typeObj[type].title
      this.drawerData.component = typeObj[type].comp
    },
    // 多选
    selectionChange() { },

    // 重置
    reset() {
      this.$refs.queryForm.resetFields();
      this.$refs.table.reload();
    },
    // 删除公司
    delCompany(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.$api.seePumaidongService
          .collegeManagerDelete({
            ids: row
          })
          .then(res => {
            // 重新加载表格数据
            this.tableList = [];
            this.$refs.companyTable.clearSelection();
            this.$refs.companyTable.reload();
          });
      });
    }
  }
};
</script>
