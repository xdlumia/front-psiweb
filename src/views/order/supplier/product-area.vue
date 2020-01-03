/*
 * @Author: 赵伦
 * @Date: 2019-11-05 17:31:44
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-03 18:09:19
 * @Description: 商品分类树组件  字段已绑定 1 
*/
<template>
  <div class="wfull hfull d-auto-y commodity-cat-tree">
    <el-input class="ml5 mt5" placeholder="搜索产品范围名称" prefix-icon="el-icon-search" size="small" style="width:93%" v-model="filterText"></el-input>
    <el-button @click="selectAll()" class="ml5" type="text">全部</el-button>
    <el-tree
      :data="catTree"
      :default-expand-all="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      @node-click="handleTreeClick"
      class="filter-tree"
      highlight-current
      node-key="code"
      ref="tree"
    ></el-tree>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    value: String
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
        label: 'content'
      }
    };
  },
  watch: {
    value() {
      this.$refs.tree.setCurrentKey(this.value);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getProductArea();
    });
  },
  methods: {
    // 获取主分类下商品分类树
    async getProductArea() {
      let { data } = await this.$api.seeDictionaryService.getDicCommonValueList(
        'PSI_GYS_CPFW'
      );
      this.catTree = data;
    },
    selectAll() {
      this.$emit('input', '');
      this.$refs.tree.setCurrentKey();
      this.changed();
    },
    // 树点击
    handleTreeClick(data, node) {
      this.$emit('input', data.code);
      this.changed();
    },
    changed() {
      this.$emit('change');
    },
    // 树过滤
    filterNode(value, data) {
      if (!value) return true;
      return (
        String(data.content)
          .toLowerCase()
          .indexOf(String(value).toLowerCase()) !== -1
      );
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