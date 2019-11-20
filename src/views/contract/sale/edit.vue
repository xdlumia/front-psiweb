/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 11:55:52
 * @Description: 销售合同
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>生成销售合同</span>
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
      <d-tab-pane label="客户信息" name="customerInfo" />
      <d-tab-pane label="公司信息" name="companyInfo" />
      <d-tab-pane label="报价单信息" name="priceSheet" />
      <d-tab-pane label="账单信息" name="billInfo" />
      <d-tab-pane label="补充信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10">
          <customerInfo id="customerInfo" />
          <companyInfo id="companyInfo" />
          <!-- 报价单 -->
          <priceSheet id="priceSheet" />
          <!-- 报价单 -->
          <billInfo id="billInfo" />
          <contract-extras id="customInfo"></contract-extras>
          <extrasInfo id="extrasInfo" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import priceSheet from './priceSheet';

export default {
  components: {
    priceSheet,
  },
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
      randomStr: +new Date() + '-' + Math.random(),
      alwaysDropAndCopyForm:true,// 在getDetail返回数据后，重新覆盖form
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