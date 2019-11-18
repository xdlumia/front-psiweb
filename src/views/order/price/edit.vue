/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-16 17:08:22
 * @Description: 采购调价单
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>采购调价单{{from?`(${from})`:''}}</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" v-if="form&&visible" ref="form">
          <buying-goods-edit
            :data="form"
            :customColumns="[
            { label:'采购价(平均值)',key:'costAmount',prop:'costAmount',width:140, },
            { label:'库存成本(税前)',key:'inventoryNumber',prop:'inventoryNumber',width:140, },
            { label:'调整金额',key:'adjustPriceMoney',prop:'adjustPriceMoney',width:120,slot:'adjustPriceMoney' },
            { label:'调整后库存成本(税前)',key:'repertoryCost',prop:'repertoryCost',width:140,
              format:(a,b)=>calcRepertoryCost(b)
            },
            { label:'调整差异',key:'adjustPriceDifference	',prop:'adjustPriceDifference	',width:100,
              format:(a,b)=>calcAdjustPriceDifference(b)
            },
            ]"
            :show="[
              'commodityCode','goodsName','goodsPic','categoryCode','className','specOne','configName','noteText','!fullscreen'
            ]"
            :showSummary="false"
            title="商品信息"
          >
            <template slot="adjustPriceMoney" slot-scope="{row,info,formProp}">
                <el-form-item
                    :prop="formProp"
                    :rules="[{required:true},{type:'price'},{validator:checkAdjustPrice.bind(this,row)}]"
                    v-if="!info.isChild"
                >
                    <el-input size="mini" v-model="row.adjustPriceMoney"></el-input>
                </el-form-item>
            </template>
          </buying-goods-edit>
          <extrasInfo id="extrasInfo" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    from: String // 来源
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this);
  },
  methods: {
    getDetail() {
      console.log('get detail')
      return {
        commodityList: []
      };
    },
    calcRepertoryCost(row){
      return +Number((row.inventoryNumber+(+row.adjustPriceMoney))||0).toFixed(2)
    },
    calcAdjustPriceDifference(row){
      return +Number((row.usableInventoryNum*(+row.adjustPriceMoney))||0).toFixed(2);
    },
    async save() {
      console.log(this.form);
      await this.$refs.form.validate()
      let form = {...this.form}
      form.commonAdjustPriceDetailedEntityList = form.commodityList.map(item=>{
        form.adjustPriceDifference = form.adjustPriceDifference||0
        form.adjustPriceDifference += this.calcAdjustPriceDifference(item)
        return {
          adjustPriceMoney:item.adjustPriceMoney,
          adjustPriceDifference:this.calcAdjustPriceDifference(item),
          commodityCode:item.commodityCode,
          commodityId:item.id,
          repertoryCost:this.calcRepertoryCost(item),
        }
      })
      form.adjustPriceDifference = +Number(form.adjustPriceDifference).toFixed(2)
      form.adjustPriceType = 2
      console.log(form)
      this.loading = true;
      try {
        await this.$api.seePsiCommonService.commonadjustpriceSave(form)
        this.setEdit()
        this.close()
      } catch (error) { }
      this.loading = false;
    },
    checkAdjustPrice(row,rule,value,cb){
      if(this.calcRepertoryCost(row)>0){
        cb()
      }else{
        cb(new Error('调整后金额不能为负'))
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>