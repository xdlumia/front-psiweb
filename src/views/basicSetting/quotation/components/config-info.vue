<!--
 * @Author: 高大鹏
 * @Date: 2019-11-09 12:27:18
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-28 14:47:19
 * @Description: description
 -->
<template>
  <div class v-loading="loading">
    <div>
      <form-card class="mb10" :title="true" v-if="!data.commonQuotationConfigDetailsEntitys.length">
        <div slot="title" style="display:flex;align-items: center">
          <span class="mr10">配置信息</span>
          <el-button size="mini" type="primary" plain @click="add">+添加商品</el-button>
        </div>
      </form-card>
      <form-card
        class="mb10"
        :title="index<1"
        v-for="(item, index) in data.commonQuotationConfigDetailsEntitys"
        :key="item.commodityCode"
      >
        <div slot="title" style="display:flex;align-items: center">
          <span class="mr10">配置信息</span>
          <el-button size="mini" type="primary" plain @click="add">+添加商品</el-button>
        </div>
        <el-row :gutter="10" class="d-relative">
          <el-col :span="8">
            <el-form-item label="商品编号">
              <el-input v-model.trim="item.commodityCode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品名称">
              <el-input v-model.trim="item.goodsName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分类">
              <el-input v-model.trim="item.className" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品数量">
              <el-input v-model.trim="item.commodityNum"></el-input>
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
    </div>
    <commodity-choose
      :kinds="[{label:'配件',value:'PSI_SP_KIND-2'},{label:'服务',value:'PSI_SP_KIND-3'}]"
      :visible.sync="showCommodityGoods"
      @choose="choose"
      v-if="showCommodityGoods"
      :codes="codes"
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
  computed: {
    codes () {
      return this.data.commonQuotationConfigDetailsEntitys.map(item => item.commodityCode)
    }
  },
  methods: {
    add () {
      this.showCommodityGoods = true
    },
    choose (goods) {
      const temp = this.data.commonQuotationConfigDetailsEntitys
      goods.forEach(good => {
        const { goodsName, commodityCode, className, commodityNum = 1, id: commodityId } = good
        const index = temp.findIndex(item => item.commodityCode === commodityCode)
        if (index === -1) {
          temp.push({ goodsName, commodityCode, className, commodityNum, commodityId })
        } else {
          temp[index].commodityNum = parseFloat(temp[index].commodityNum) + 1
        }
      })
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
