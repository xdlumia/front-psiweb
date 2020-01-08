/*
 * @Author: 赵伦
 * @Date: 2019-12-24 15:43:40
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-08 11:40:36
 * @Description: 自由模式确定配置单
*/
<template>
  <div class="custom-config">
    <el-form :model="{commodityList:data}" ref="form" size="mini">
      <buying-goods-edit
        :customColumns="customColumns"
        :data="{commodityList:data}"
        :show="['!formTitle','className','commodityCode','goodsName','specOne','commodityNumber','saleReferencePrice']"
        :sort="['className','choose','commodityCode','goodsName','specOne','commodityNumber','saleReferencePrice']"
        :summary-method="getSummarys"
        no-card
        ref="goodsTable"
      >
      <template slot="commodityNumber" slot-scope="{row,prop,formProp}">
        <el-form-item :prop="formProp" :rules="[{validator:checkCommodityNumber.bind(this,row)}]" size="mini">
          <el-input v-model="row.commodityNumber"></el-input>
        </el-form-item>
      </template>
      </buying-goods-edit>
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
        {label:'商品数量',key:'commodityNumber',prop:'commodityNumber',slot:'commodityNumber'},
        {label:'操作',key:'choose',prop:'selected',type:'selection',width:80,selected:0,align:'center',hideHeaderSelection:true},
        {label:'销售参考价',key:'saleReferencePrice',prop:'saleReferencePrice',width:120},
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
        } else if (['saleReferencePrice'].includes(col.property)) {
          sums[index] = +Number(
            this.flatten(data)
              .map(
                item =>
                  +Number(
                    (item.selected?item.saleReferencePrice:0) *
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
    },
    flatten(data) {
      let all = [];
      data.map(item => {
        all.push(item);
        if (item.children && item.children.length) {
          all = all.concat(this.flatten(item.children));
        }
      });
      return all;
    },
    checkCommodityNumber(row,rule,value,cb){
      if(row.selected){
        value = Number(value)||0
        if(value>0&&value<=row.maxcommodityNumber){
          cb()
        }else cb(`可填区间[1-${row.maxcommodityNumber}]`)
      }else cb()
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-config{
  /deep/{
     .hide-expanded .el-table__expand-icon{
      display: inline-block !important;
    }
    .buying-goods-selector .el-table__row{
      height: auto;
    }
  }
}
</style>