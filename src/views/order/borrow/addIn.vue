/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 10:30:19
 * @Description: 采购入库单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>新增借入单</span>
      <span class="fr mr20">
        <el-button @click="close" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="借入信息" name="borrowIn" />
      <d-tab-pane label="借入商品" name="borrowGoods" />
      <div>
        <el-form :model="form" class="p10">
          <BorrowIn id="borrowIn" />
          <BorrowGoods id="borrowGoods" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import BorrowIn from '@/components/formComponents/borrow-in'; // 借入信息
import BorrowGoods from '@/components/formComponents/borrow-goods'; // 借入商品
import dTabs from '@/components/tabs/index';
import dTabPane from '@/components/tabs/tab-pane';

export default {
  components: {
    BorrowIn,
    BorrowGoods,
    dTabs,
    dTabPane
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
      activeName: '',
      random: +new Date() + '-' + Math.random()
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