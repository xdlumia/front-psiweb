/*
 * @Author: 赵伦
 * @Date: 2019-11-05 17:31:44
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-11 10:06:18
 * @Description: 商品分类树组件  字段已绑定 1 
*/
<template>
  <div class="wfull hfull d-auto-y commodity-cat-tree">
    <el-tabs @tab-click="handleMainCatClick" v-model="activeMainCat">
      <el-tab-pane :key="item.value" :label="item.label" :name="item.value" v-for="item of kinds"></el-tab-pane>
    </el-tabs>
    <el-input class="ml5" placeholder="搜索分类名称" prefix-icon="el-icon-search" size="small" style="width:93%" v-model="filterText"></el-input>
    <el-button @click="selectAll()" class="ml5" type="text">全部</el-button>
    <el-tree
      :data="catTree"
      :default-expand-all="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      @node-click="handleCatClick"
      class="filter-tree"
      highlight-current
      ref="tree"
    ></el-tree>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    mainCat: [String, Number],
    subCat: [String, Number],
    kinds: {
      type: Array,
      default: () => [
        { label: '整机', value: 'PSI_SP_KIND-1' },
        { label: '配件', value: 'PSI_SP_KIND-2' },
        { label: '服务', value: 'PSI_SP_KIND-3' }
      ]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      activeMainCat: 'PSI_SP_KIND-1',
      catTree: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'className'
      }
    };
  },
  mounted() {
    this.activeMainCat = this.kinds[0].value;
    this.handleMainCatClick();
  },
  methods: {
    // 获取主分类下商品分类树
    async handleMainCatClick() {
      let { data } = await this.$api.seeGoodsService.getGoodsClass({
        categoryCode: this.activeMainCat
      });
      this.catTree = data;
      this.$emit('update:mainCat', this.activeMainCat);
      this.selectAll();
    },
    selectAll() {
      this.$emit('update:subCat', '');
      this.changed();
    },
    // 树点击
    handleCatClick(data, node) {
      this.$emit('update:subCat', data.id);
      this.changed();
    },
    changed() {
      this.$emit('change');
    },
    // 树过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.className.indexOf(value) !== -1;
    }
  }
};
</script>
<style lang="scss" scoped>
.commodity-cat-tree {
  /deep/.el-tabs__nav-scroll {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>