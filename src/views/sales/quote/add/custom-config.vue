/*
 * @Author: 赵伦
 * @Date: 2019-12-24 15:43:40
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-25 17:52:48
 * @Description: 自由模式确定配置单
*/
<template>
  <div class="custom-config">
    <el-form :model="{commodityList:data}" ref="form" size="mini">
      <buying-goods-edit
        :customColumns="customColumns"
        :data="{commodityList:data}"
        :show="['!formTitle','className','commodityCode','goodsName','specOne','commodityNumber','saleReferencePrice']"
        :sort="['className','commodityCode','goodsName','specOne','commodityNumber','saleReferencePrice','choose']"
        :summary-method="getSummarys"
        no-card
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
            data
              .map(
                item =>
                  +Number(
                    (item.selected?item.saleReferencePrice:0) *
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
    },
    checkCommodityNumber(row,rule,value,cb){
      console.log(row)
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
</style>