/*
 * @Author: 赵伦
 * @Date: 2019-12-24 11:36:25
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-25 15:21:20
 * @Description: 整机配置编辑组件
*/
<template>
  <div class="product-config">
    <!-- 基本信息 -->
    <form-card id="baseInfo" title="基本信息">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :rules="[{required:true}]" class="wfull" label="商品名称" prop="goodName">
            <commodity-selector
              :autoClear="false"
              :disabled="disabled"
              :kinds="[{label: '整机', value:'PSI_SP_KIND-1'}]"
              :multiple="false"
              :params="{isConfig: 0}"
              @choose="choose"
              class="wfull"
              v-model="data.goodName"
            ></commodity-selector>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品编号" prop="commodityCode">
            <el-input disabled v-model="data.commodityCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="note">
            <el-input :disabled="disabled" type="textarea" v-model="data.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
    <!-- 配置信息 -->
    <buying-goods-edit
      :customColumns="[
        {label:'商品编号',key:'chooseCommodityCode',type:'chooseCommodityCode',prop:'commodityCode',width:200},
        {label:'商品名称',key:'chooseGoodsName',type:'chooseCommodityName',prop:'goodsName',width:200},
        {label:'商品最大数量',key:'commodityNum',type:'inputinteger',prop:'commodityNum',width:140},
      ]"
      :data="data"
      :disabled="disabled"
      :kinds="[
        { label: '配件', value: 'PSI_SP_KIND-2' },
        { label: '服务', value: 'PSI_SP_KIND-3' }
      ]"
      :show="[disabled?'':'action','goodsPic','className']"
      :showSummary="false"
      :sort="['action','chooseCommodityCode','chooseGoodsName','goodsPic','className','commodityNum']"
      buttonChoose
      id="goods"
      title="配置信息"
    ></buying-goods-edit>
  </div>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  props: {
    data: Object,
    disabled: Boolean
  },
  methods: {
    choose(goods) {
      this.data.commodityId = goods[0].id
      this.data.commodityCode = goods[0].commodityCode;
      this.data.goodName = goods[0].goodsName;
    }
  }
};
</script>
<style lang="scss" scoped>
.product-config {
  /deep/ .el-select {
    display: block;
  }
}
</style>