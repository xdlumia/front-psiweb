/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 18:32:27
 * @Description: 选择流水
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>选择流水</span>
      <span class="fr mr20"></span>
    </div>
    <div>
      <d-table
        :params="params"
        @response="onTableData"
        @row-click="selectCurrent"
        api="seePsiFinanceService.fincomerecordList"
        style="height:400px;"
      >
        <el-table-column label="选择" prop=" ">
          <template slot-scope="{row}">
            <el-radio :label="row.id" v-model="current">
              <span></span>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="出账日期" min-width="100" prop="createTime">
          <template slot-scope="{row}">{{row.createTime|timeToStr('YYYY-MM-DD')}}</template>
        </el-table-column>
        <el-table-column label="收支状态" min-width="100">
          <template slot-scope="{row}">{{row.incomeType==0?'收款':'付款'}}</template>
        </el-table-column>
        <el-table-column label="对方账号" min-width="120" prop="oppositeAccount"></el-table-column>
        <el-table-column label="备注" min-width="100" prop="note"></el-table-column>
        <el-table-column label="流水金额" min-width="100" prop="incomeAmount"></el-table-column>
        <el-table-column label="已匹配金额" min-width="100" prop="matchedAmount"></el-table-column>
        <el-table-column label="未匹配金额" min-width="100" prop="unmatchAmount"></el-table-column>
        <el-table-column label="匹配状态" min-width="100">
          <template slot-scope="{row}">{{row.matchState}}</template>
        </el-table-column>
      </d-table>
    </div>
    <div class="ac" slot="footer">
      <el-button @click="save" size="mini" type="primary">保存</el-button>
      <el-button @click="close" size="mini">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    from: String, // 来源
    params: {
      type: Object,
      default: () => ({
        page: 1,
        limit: 15,
        matchState: ''
      })
    }
  },
  computed: {},
  data() {
    return {
      current: '',
      list: []
    };
  },
  mounted() {},
  methods: {
    selectCurrent(e) {
      this.current = e.id;
    },
    onTableData({ data }) {
      this.list = data;
      this.current = '';
    },
    save() {
      if (!this.current) {
        return this.$message({
          message: '请先选择匹配的流水记录',
          type: 'warning',
          showClose: true
        });
      } else {
        this.$emit(
          'change',
          this.list.filter(item => item.id == this.current)[0]
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>