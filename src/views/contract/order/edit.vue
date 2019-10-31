/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 11:24:39
 * @Description: 采购合同
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>采购合同</span>
      <span class="fr mr20">
        <el-select class="mr10" size="mini" v-model="tmp">
          <el-option value>选择合同模板</el-option>
        </el-select>
        <el-button size="mini" type="primary">预览</el-button>
        <el-button @click="close" size="mini" type="primary">生成</el-button>
        <el-button @click="close" size="mini">取消</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="供应商信息" name="supplierInfo" />
      <d-tab-pane label="公司信息" name="companyInfo" />
      <d-tab-pane label="到货信息" name="arrivalInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="收票滞纳金" name="paymentLate" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10">
          <supplierInfo id="supplierInfo" />
          <companyInfo id="companyInfo" />
          <arrivalInfo id="arrivalInfo" />
          <commodityInfo id="commodityInfo" />
          <paymentLate id="paymentLate" />
          <billInfo id="billInfo" />
          <customInfo id="customInfo" />
          <extrasInfo id="extrasInfo" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {},
    from: String // 来源
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      tmp: '',
      activeName: '',
      randomStr: +new Date() + '-' + Math.random()
    };
  },
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>