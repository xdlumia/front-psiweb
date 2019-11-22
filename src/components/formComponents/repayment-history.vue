/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-22 16:16:22
 * @Description: 借款单 - 还款记录
*/
<template>
  <div>
    <form-card title="还款记录">
      <d-table
        size="small"
        api="seePsiFinanceService.frepaymentrecordList"
        style="height:350px"
      >
        <el-table-column
          v-for="(col,index) of tableCol"
          :key="index"
          showOverflowTooltip
          :prop="col.prop"
          :label="col.label"
          :min-width="col.width"
        >
        </el-table-column>

      </d-table>

    </form-card>
  </div>
</template>
<script>

export default {
  mixins: [],
  components: {},
  props: {
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
    span: {
      type: Number,
      default: 8
    }
  },

  data() {
    return {
      tableCol: [
        { label: '还款金额', prop: 'repaymentAmount', width: '120', },
        { label: '还款日期', prop: 'repaymentDate', width: '120', },
        { label: '结算账户', prop: 'companySettlementInfo', width: '120', },
        { label: '流水凭证号', prop: 'serialNumber', width: '120', },
      ]
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