/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-04 21:05:43
 * @Description: 报价单信息 编辑查看时使用
*/
<template>

  <!-- 报价单信息 -->
  <quotationInfo v-loading="loading">
    <el-tabs
      slot="tabs"
      v-model="activeName"
    >
      <el-tab-pane
        v-for="(item,index) of options"
        :key="index"
        :label="item"
        :name="item"
      ></el-tab-pane>
    </el-tabs>
    <div slot="body">
      <el-form
        label-position="top"
        :model="detail"
        size="small"
      >
        <!-- 发货信息 -->
        <deliverInfo
          :hide="['note']"
          :data="detail"
          disabled
        />
        <!-- 商品信息 -->
        <commodity-quote-info
          :data="detail"
          ref="commodity"
          disabled
        />
        <!-- 报价有效期 -->
        <payExpire
          :data="detail"
          disabled
        />
        <!-- 附加发票 -->
        <extrataxInfo
          :data="detail"
          disabled
        />
        <!-- 自定义信息 -->
        <customInfo
          :data="detail"
          busType="15"
          disabled
        />
        <!-- 备注信息 -->
        <extrasInfo
          :data="detail"
          disabled
        />
      </el-form>
    </div>
  </quotationInfo>
</template>
<script>

export default {
  //options 其实就是 quotationids
  props: ['options', 'quotationMap'],
  components: {
  },
  data() {
    return {
      loading: false,
      activeName: this.options[0], // 数据源
      detail: {},
    }
  },
  watch: {
    activeName: {
      handler(val) {
        this.getDetail()
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    async getDetail() {
      if (this.quotationMap && this.quotationMap[this.activeName]) {
        this.detail = this.quotationMap[this.activeName]
        return;
      }
      this.loading = true
      let { data } = await this.$api.seePsiSaleService.salesquotationGetinfoByCode({ quotationCode: this.activeName })
      this.detail = data || {}
      // this.$refs.commodity.businesscommodityGetBusinessCommodityList(this.detail.quotationCode)
      this.loading = false
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
