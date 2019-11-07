/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-07 12:58:08
 * @Description: 整机列表 和 配件列表   默认显示整机列表
*/
<template>
  <form-card :title="title">
    <d-table
      v-if="title=='整机列表'"
      refs="kind1"
      api="seeGoodsService.selectGoodsNameList"
      :params="params"
      border
      :paging="false"
      default-expand-all
      @selection-change="selectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="id"
        label="商品分类"
        width="180"
      >
      </el-table-column>
      <el-table-column
        type="selection"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="商品名称"
        width="180"
      >
      </el-table-column>
    </d-table>
    <d-table
      v-else
      ref="kind2"
      api="seeGoodsService.selectGoodsInfoTreeList"
      :params="querForm"
      border
      :paging="false"
      default-expand-all
      @selection-change="selectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="id"
        label="商品分类"
        width="180"
      >
      </el-table-column>
      <el-table-column
        type="selection"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="商品名称"
        width="180"
      >
      </el-table-column>
    </d-table>
  </form-card>
</template>
<script>

export default {
  props: {
    title: '整机列表',
  },
  data() {
    return {
      checked: [],
      // 遍历表单
      querForm: {
        name: '', //商品名称
        categoryCode: '', //商品分类
      }

    };
  },
  methods: {
    reload() {
      if (this.title == '整机列表') {
        this.$refs.kind1.reload(1)
      } else {
        this.$refs.kind1.reload(1)
      }
    },
    selectionChange(val) {
      this.$emit('selection-change', val)
    }
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
</style>