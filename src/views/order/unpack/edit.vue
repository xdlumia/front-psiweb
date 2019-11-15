/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 09:00:36
 * @Description: 拆卸单
*/
<template>
  <el-dialog :visible="showEditPage" @close="close" v-dialogDrag>
    <div slot="title">
      <span>拆卸单{{from?`(${from})`:''}}</span>
      <span class="fr mr20">
        <el-button @click="close" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="商品信息" name="unpackGoods" />
      <d-tab-pane label="基本信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" size="mini" v-if="form&&visible">
          <unpackGoods :data="form" id="unpackGoods" />
          <extrasInfo :data="form" :needUpload="false" id="unpackGoods" />
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
  mounted() {},
  methods: {
    getDetail() {
      return {
        commodityList: []
      };
    }
  }
};
</script>
<style lang="scss" scoped>
</style>