/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 15:08:13
 * @Description: 直发单发货
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>直发单发货</span>
    </div>
    <el-form v-model="form">
      <DeliverGoods id="deliverGoods"></DeliverGoods>
    </el-form>
    <div class="ac" slot="footer">
      <el-button @click="close" size="mini" type="primary">确定</el-button>
      <el-button @click="close" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import DeliverGoods from '@/components/formComponents/deliver-goods.vue'; //商品发货信息

export default {
  components: {
    DeliverGoods
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