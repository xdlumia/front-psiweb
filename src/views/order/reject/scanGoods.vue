/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-13 15:52:39
 * @Description: 采购退货扫码
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>采购退货单</span>
      <span class="fr mr20"></span>
    </div>
    <el-form :model="form" class="p10">
      <form-card title="采购退货商品">
        <rejectScanCard id="rejectScanCard"></rejectScanCard>
      </form-card>
    </el-form>
    <div class="ac" slot="footer">
      <el-button @click="close" size="mini" type="primary">保存</el-button>
      <el-button @click="close" size="mini">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {},
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {};
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