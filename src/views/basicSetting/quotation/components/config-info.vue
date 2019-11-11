<!--
 * @Author: 高大鹏
 * @Date: 2019-11-09 12:27:18
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-11 18:39:04
 * @Description: description
 -->
<template>
  <div class v-loading="loading">
    <form-card class="mb10" :title="true" v-if="!data.commonQuotationConfigDetailsEntitys.length">
      <div slot="title" style="display:flex;align-items: center">
        <span class="mr10">配置信息</span>
        <el-button size="mini" type="primary" plain @click="add">+添加商品</el-button>
      </div>
    </form-card>
    <form-card
      class="mb10"
      :title="index<1"
      v-for="(itme, index) in data.commonQuotationConfigDetailsEntitys"
      :key="index.commodityCode"
    >
      <div slot="title" style="display:flex;align-items: center">
        <span class="mr10">配置信息</span>
        <el-button size="mini" type="primary" plain @click="add">+添加商品</el-button>
      </div>
      <el-row :gutter="10" class="d-relative">
        <el-col :span="8">
          <el-form-item label="商品编号">
            <el-input v-model="itme.commodityCode" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品名称">
            <el-input v-model="itme.goodsName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分类">
            <el-input v-model="itme.className" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品数量">
            <el-input v-model="itme.commodityNum"></el-input>
          </el-form-item>
        </el-col>
        <el-button
          round
          style="padding:0;position:absolute;right:-4px;top:-9px;border:none"
          @click="data.commonQuotationConfigDetailsEntitys.splice(index, 1)"
        >
          <i class="el-icon-remove" style="font-size:22px"></i>
        </el-button>
      </el-row>
    </form-card>
    <commodity-choose
      :kinds="[{label:'配件',value:'PSI_SP_KIND-2'},{label:'服务',value:'PSI_SP_KIND-3'}]"
      :visible.sync="showCommodityGoods"
      @choose="choose"
      v-if="showCommodityGoods"
    />
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      showCommodityGoods: false,
      loading: false
    }
  },
  props: {
    data: Object
  },
  components: {
  },
  mounted () {
    if (this.data.id) {
      this.commonquotationconfigdetailsListConfigByGoodName(this.data.id)
    }
  },
  methods: {
    add () {
      this.showCommodityGoods = true
    },
    choose (goods) {
      const temp = this.data.commonQuotationConfigDetailsEntitys
      goods.forEach(good => {
        const { goodsName, commodityCode, className, commodityNum = 0, id: commodityId } = good
        if (!temp.filter(item => item.commodityCode === commodityCode).length) {
          temp.push({ goodsName, commodityCode, className, commodityNum, commodityId })
          // this.$set(this.data.commonQuotationConfigDetailsEntitys, this.data.commonQuotationConfigDetailsEntitys.length, { goodsName, commodityCode, className, commodityNum, commodityId })
          // this.data.commonQuotationConfigDetailsEntitys = temp.concat([{ goodsName, commodityCode, className, commodityNum, commodityId }])
        }
      })
      console.log(this.data.commonQuotationConfigDetailsEntitys)
    },
    commonquotationconfigdetailsListConfigByGoodName (quotationId) {
      this.loading = true
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName({ quotationId }).then(res => {
        this.data.commonQuotationConfigDetailsEntitys = res.data || []
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
