/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-19 15:46:48
 * @Description: 采购-拆卸单
*/
<template>
  <div class="buying-requisition-page wfull hfull" v-loading="loading">
    <TableView
      :filterOptions="filterOptions"
      :params="params"
      @response="onTableData"
      api="seePsiWmsService.wmsdisassemblyorderList"
      busType="11"
      ref="tableView"
      title="拆卸单"
    >
      <template slot="button">
        <span>自动分配：</span>
        <el-switch class="mr10" v-model="switchValue"></el-switch>
        <el-button @click="showEdit=true" size="mini" type="primary">新增</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='createTime'">{{value}}</span>
        <span v-else-if="prop=='operation'">
          <span class="elTableDragDefault el-icon-rank f20" v-if="row.sequence>0"></span>
        </span>
        <span v-else-if="prop=='disassemblyOrderState'">{{stateText[value]}}</span>
        <span v-else-if="prop=='disassemblyOrderCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Detail :code="currentCode" :visible.sync="showDetail" @reload="reload()" v-if="showDetail" />
    <Edit :visible.sync="showEdit" @reload="reload()" v-if="showEdit" />
  </div>
</template>
<script>
import TableView from '@/components/tableView';

import Detail from './detail'; // 拆卸单详情
import Edit from './edit'; // 拆卸单详情

export default {
  components: {
    TableView,
    Detail,
    Edit
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
      status: [],
      showDetail: false,
      showEdit: false,
      switchValue: false,
      loading: false,
      currentCode: '',
      stateText: {
        '0': '新建',
        '1': '审核中',
        '2': '待执行',
        '3': '部分完成',
        '4': '已完成',
        '-1': '终止'
      },
      // prettier-ignore
      filterOptions: [
          { label: '拆卸单编号', prop: 'disassemblyOrderCode', default:true, },
          { label: '任务数量', prop: 'TaskNum', type: 'numberRange', int: true, default:true, },
          { label: '未分配数量', prop: 'UndistributedNum', type: 'numberRange', int: true, default:true, },
          { label: '未拆卸数量', prop: 'NoDisassemblyNum', type: 'numberRange', int: true, default:true, },
          { label: '已拆卸数量', prop: 'AccomplishDisassemblyNum', type: 'numberRange', int: true, default:true, },
          { label: '生成顺序', prop: 'Sequence', type: 'numberRange', int: true, default:true, },
          { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
          { label: '创建人', prop: 'creator', type: 'employee' },
          { label: '创建时间', prop: 'CreateTime', type: 'dateRange' },
      ]
    };
  },
  mounted() {
    this.$refs.tableView.$refs.table.rowDrop();
    this.$refs.tableView.$refs.table.$on('dragEnd', this.onDrag);
  },
  methods: {
    onTableData(e) {
      (e.data || []).map((item, i) => {
        item.$index = i;
      });
    },
    logData(e) {
      console.log(e);
    },
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
      } catch (e) {}
      this.loading = false;
      console.log(changed);
    },
    reload() {
      this.$refs.tableView.reload(1);
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
