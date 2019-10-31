/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 11:15:24
 * @Description: 编辑直发单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>直发单</span>
      <span class="fr mr20">
        <el-button @click="close" size="mini" type="primary">通过</el-button>
        <el-button @click="close" size="mini">取消</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="发货信息" name="deliverInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10">
          <deliverInfo id="deliverInfo"></deliverInfo>
          <commodityInfo id="commodityInfo"></commodityInfo>
          <customInfo id="customInfo"></customInfo>
          <extrasInfo id="extrasInfo"></extrasInfo>
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
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: ''
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