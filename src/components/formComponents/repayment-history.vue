/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-22 17:21:21
 * @Description: 借款单 - 还款记录
*/
<template>
  <form-card title="还款记录">
    <d-table
      size="small"
      api="seePsiFinanceService.frepaymentrecordList"
      :params="params"
      style="max-height:350px"
    >
      <el-table-column
        v-for="(col,index) of tableCol"
        :key="index"
        showOverflowTooltip
        :prop="col.prop"
        :label="col.label"
        :min-width="col.width"
      >
        <template slot-scope="scope">
          <span v-if="col.prop == 'repaymentDate'">{{scope.row[col.prop] | timeToStr}}</span>
          <span v-else>{{scope.row[col.prop]}}</span>
        </template>
      </el-table-column>
    </d-table>
  </form-card>
</template>
<script>

export default {
  mixins: [],
  components: {},
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      tableCol: [
        { label: '还款金额(元)', prop: 'repaymentAmount', width: '120', },
        { label: '还款日期', prop: 'repaymentDate', width: '120', },
        { label: '结算账户', prop: 'companySettlementInfo', width: '160', },
        { label: '流水凭证号', prop: 'serialNumber', width: '120', },
        { label: '录入人', prop: 'creator', width: '120', },
      ],
    };
  },
  watch: {

  },
  computed: {


  },
  methods: {
  }


};
</script>
<style lang="scss" scoped>
</style>