/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-02 14:16:47
 * @Description: 选择组装商品
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="选择组装商品"
    v-dialogDrag
  >
    <el-container>
      <el-main
        :style="{
                maxHeight:maxHeight+'px'
            }"
        style="padding:0;"
      >
        <el-form
          :model="form"
          class="p10"
        >
        </el-form>
        <assembledGoodsChoose ref="assembledGoodsChoose" />
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="$emit('close')"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="$emit('close')"
        size="small"
      >确定并组装</el-button>
    </span>
  </el-dialog>
</template>
<script>
import assembledGoodsChoose from '@/components/formComponents/assembled-goods-choose';

export default {
  components: {
    assembledGoodsChoose
  },
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
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>