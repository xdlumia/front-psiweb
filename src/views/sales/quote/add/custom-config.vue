/*
 * @Author: 赵伦
 * @Date: 2019-12-24 15:43:40
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-24 17:46:12
 * @Description: 自由模式确定配置单
*/
<template>
  <div>
    <buying-goods-edit
      :customColumns="customColumns"
      :data="cdata"
      :show="['!formTitle','categoryCode','commodityCode','goodsName','specOne','commodityNumber','reference']"
      no-card
    />
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      cdata: {
        commodityList: []
      },
      // prettier-ignore
      customColumns:[
        {label:'操作',key:'choose',prop:'selected',type:'selection',selected:0,align:'center',hideHeaderSelection:true},
      ]
    };
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
</style>