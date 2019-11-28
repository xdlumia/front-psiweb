/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  组装单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="9"
      :filterOptions='filterOptions'
      selection
      ref='allTable'
      :params="params"
      exportApi="seePsiWmsService.wmsassembleorderExport"
      api="seePsiWmsService.wmsassembleorderList"
      title="组装单"
    >
      <template v-slot:button>
        <!-- <div class='fl mr10 mt5'>
          <span class="d-text-black">自动分配：</span>
          <el-switch v-model="isSelfMotion">
          </el-switch>
        </div> -->
        <el-button
          type="primary"
          size='mini'
          @click="addVisible = true"
        >新增</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='assembleOrderCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='operation'">
          <span class="elTableDragDefault el-icon-rank f20 ml10"></span>
          <el-button
            class="ml15"
            size="mini"
            type="primary"
            @click="roof(row)"
          >置顶</el-button>
        </span>
        <span v-else-if="column.columnFields=='assembleOrderState'">{{value == 0 ? '未开始' : value == 1 ? '待执行' : value == 2 ? '部分完成' : value == 3 ? '已完成' : value == -1 ? '终止' : ''}}</span>
        <span v-else-if="column.columnFields=='pickingState'">{{value == 0 ? '待拣货' : value == 1 ? '部分拣货' : value == 2 ? '完成拣货' : '终止'}}</span>
        <span v-else>{{value}}</span>
      </template>

    </TableView>
    <Details
      :data='drawerData'
      :visible.sync='tableVisible'
      :code="drawerData.assembleOrderCode"
      v-if="tableVisible"
      @reload='reload'
    />
    <assemblyAdd
      :isSelfMotion='isSelfMotion'
      :visible.sync='addVisible'
      v-if="addVisible"
      @reload='reload'
    />
  </div>
</template>
<script>
/** 
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
import assemblyAdd from './assembly-add.vue'
export default {
  components: {
    Details,
    TableView,
    assemblyAdd
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
      default: () => ({ page: 1, limit: 15 })
    }
  },
  data() {
    return {
      // 查询表单
      isSelfMotion: true,
      tableVisible: false,//销售单右侧抽屉
      drawerData: {},//弹框的相关数据
      addVisible: false,//新增弹窗
      activeName: '',
      filterOptions: [
        { label: '组装单编号', prop: 'assembleOrderCode', default: true },
        {
          label: '组装单状态',
          prop: 'state',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '待执行', value: '1' },
            { label: '部分完成', value: '2' },
            { label: '已完成', value: '3' },
            { label: '未开始', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: '拣货状态',
          prop: 'pickingState',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '部分拣货', value: '1' },
            { label: '完成拣货', value: '2' },
            { label: '待拣货', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: '任务数量',
          prop: 'TaskNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '未组装数量',
          prop: 'UnassembledNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '已组装数量',
          prop: 'AccomplishNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '待分配',
          prop: 'UndistributedNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '创建时间',
          prop: 'CreateTime',
          type: 'daterange',
          default: true
        },
        {
          label: '单据创建人',
          prop: 'creator',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
      ],
    };
  },
  mounted() {
    this.$refs.allTable.$refs.table.rowDrop();
    this.$refs.allTable.$refs.table.$on('dragEnd', this.onDrag);
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
    },
    reload() {
      this.$refs.allTable.reload()
    },
    //置顶
    roof(row) {
      this.$confirm('确认置顶当前组装单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiWmsService.wmsassembleorderTopSquence(null, row.id)
          .then(res => {
            this.reload()
          })
          .finally(() => {

          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    },
    //拖拽
    async onDrag(list) {
      let changed = list.filter((item, i) => {
        let isChanged = item.$index != i;
        item.$index = i;
        return isChanged;
      });
      let [a, b] = changed;
      this.loading = true;
      try {
        if (a.sequence && b.sequence) {
          await this.$api.seePsiWmsService.wmsdisassemblyorderUpdatesSquence([
            { id: a.id, sequence: b.sequence },
            { id: b.id, sequence: a.sequence }
          ]);
        }
        this.reload();
      } catch (e) { }
      this.loading = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.side-page {
  /deep/ {
    > .popup-main {
      width: 50% !important;
      > .popup-head {
        font-weight: bold;
        > .d-inline > .popup-close {
          position: absolute;
          right: 10px;
          top: 16px;
        }
      }
      > .popup-body {
        padding: 0;
        overflow: hidden;
      }
    }
  }
  .tabs-view {
    position: relative;
    /deep/ {
      & > .el-tabs__header {
        background-color: #f2f2f2;
        padding: 0 10px;
        > .el-tabs__nav-wrap::after {
          background-color: #f2f2f2;
        }
      }
      & > .el-tabs__content {
        height: calc(100% - 55px);
        overflow: hidden;
        overflow-y: auto;
        padding: 0 10px;
      }
    }
  }
}
</style>
