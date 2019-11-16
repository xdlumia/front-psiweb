/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 17:42:28
 * @Description: 采购调价单
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag>
    <div slot="title">
      <span>采购调价单{{from?`(${from})`:''}}</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" v-if="form&visible">
          <buying-goods-edit
            :data="form"
            :show="[
              'commodityCode','goodsName','categoryCode','className','specOne','configName','noteText','!fullscreen'
            ]"
            :showSummary="false"
            title="商品信息"
          ></buying-goods-edit>
          <extrasInfo id="extrasInfo" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    from: String // 来源
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this);
  },
  methods: {
    getDetail() {
      return {
        commodityList: []
      };
    },
    save() {
      console.log(this.form);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>