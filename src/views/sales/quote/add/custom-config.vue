/*
 * @Author: 赵伦
 * @Date: 2019-12-24 15:43:40
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-25 15:00:03
 * @Description: 自由模式确定配置单
*/
<template>
  <div class="custom-config">
    <el-form :model="{commodityList:data}" :show-message="false">
      <buying-goods-edit
        :customColumns="customColumns"
        :data="{commodityList:data}"
        :show="['!formTitle','className','commodityCode','goodsName','specOne','commodityNumber','reference']"
        :sort="['className','commodityCode','goodsName','specOne','commodityNumber','reference','choose']"
        :summary-method="getSummarys"
        no-card
      />
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      // prettier-ignore
      customColumns:[
        {label:'操作',key:'choose',prop:'selected',type:'selection',width:80,selected:0,align:'center',hideHeaderSelection:true},
        {label:'销售参考价',key:'reference',prop:'reference',width:120},
      ]
    };
  },
  computed: {},
  methods: {
    getSummarys(param) {
      let { columns, data } = param;
      data = data || [];
      const sums = [];
      columns.forEach((col, index) => {
        if (['commodityNumber'].includes(col.property)) {
          let prop = col.property;
          sums[index] = +Number(
            data
              .map(item => Number(item[prop]) || 0)
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (['reference'].includes(col.property)) {
          sums[index] = +Number(
            data
              .map(
                item =>
                  +Number(
                    item.reference *
                      (1 + item.taxRate / 100) *
                      item.commodityNumber || 0
                  ).toFixed(2)
              )
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
          this.$emit('totalAmountChange', sums[index]);
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-config {
  /deep/ {
    .el-form-item.is-error .el-input__inner {
      border-color: #dcdfe6 !important;
    }
  }
}
</style>