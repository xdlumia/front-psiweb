/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 16:29:14
 * @Description: 采购入库单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>采购入库单{{from?`(${from})`:''}}</span>
      <span class="fr mr20">
        <el-button @click="close" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="换货信息" name="supplierInfo" />
      <d-tab-pane label="换入库商品" name="companyInfo" />
      <d-tab-pane label="换出库商品" name="arrivalInfo" />
      <div>
        <el-form :model="form" class="p10">
          <exchange-info />
          <goods-exchange />
          <goods-exchange />
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