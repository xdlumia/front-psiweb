/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 18:18:38
 * @Description: 其他合同
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>其他合同</span>
      <span class="fr mr20">
        <el-button @click="close" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="单据信息" name="supplierInfo" />
      <d-tab-pane label="甲方信息" name="companyInfo" />
      <d-tab-pane label="乙方信息" name="arrivalInfo" />
      <d-tab-pane label="合同期限" name="commodityInfo" />
      <d-tab-pane label="补充信息" name="paymentLate" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10">
          <contract-title></contract-title>
          <contract-signer name="甲方"></contract-signer>
          <contract-signer name="乙方"></contract-signer>
          <contract-expire></contract-expire>
          <contract-extras></contract-extras>
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