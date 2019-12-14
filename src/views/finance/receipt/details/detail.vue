/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-14 17:00:25
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel
      disabled
      busType="58"
      :data="data"
    />
    <form-card title="付款状态">
      <el-form-item
        :rules="[{required:true,message:'必填项',trigger: 'blur'}]"
        label="付款状态"
        prop="fbillCode"
      >
        <!-- TODO付款状态没有写 -->
      </el-form-item>
    </form-card>
    <make-invoice-info
      :invoiceType="1"
      disabled
      :data="data"
      id="invoice"
    />
    <make-buyer
      disabled
      :data="data"
      id="buyer"
    />
    <make-buyer
      disabled
      :data="data"
      from="供应商"
      id="saler"
      prefix="market"
      title="销售方信息"
    />
    <make-goods
      disabled
      :data="data"
      id="goods"
    />
    <!-- 备注信息 -->
    <extrasInfo
      disabled
      :data="data"
    />
  </div>
</template>
<script>

export default {
  props: {
    rowData: Object,
    data: {
      default: () => ({}),
      type: Object
    },
  },
  components: {

  },

  data() {
    return {

    }
  },
  computed: {
    rowDatas() {
      return []
    }
  },
  mounted() {

  },
  methods: {

  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
