/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 选择拆卸商品
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="选择拆卸商品"
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
        <dismantlingMerchandise />
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
      >确定并拆卸</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dismantlingMerchandise from '@/components/formComponents/dismantling-merchandise';

export default {
  components: {
    dismantlingMerchandise
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