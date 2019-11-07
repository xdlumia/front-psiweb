/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-07 17:07:51
 * @Description: 整机列表 和 配件列表   默认显示整机列表
*/
<template>
  <form-card :title="title">
    <el-table
      height="550px"
      v-if="title=='整机列表'"
      :data="kind1Data"
      :params="params"
      border
      @selection-change="selectionChange"
      :tree-props="{children: 'nameList', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="className"
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
        prop="name"
        label="商品名称"
        min-width="180"
      >
      </el-table-column>

    </el-table>
    <el-table
      height="550px"
      :data="kind1Data"
      v-else
      ref="kind2"
      api="seeGoodsService.selectGoodsInfoTreeList"
      :params="params"
      border
      default-expand-all
      @selection-change="selectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="firstClassName"
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
        label="编号"
        min-width="120"
      >
        <template slot-scope="scope">
          {{scope.row.categoryCode}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="specOne"
        min-width="120"
        label="规格"
      >
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      default: '整机列表'
    },
    params: {
      type: Object,
      default: '整机列表'
    },
  },
  data() {
    return {
      checked: [],
      // 整机列表数据
      kind1Data: [],

      kind2Data: [],
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
        this.selectGoodsNameList()
      } else {
        this.selectGoodsInfoTreeList()
      }
    },
    // 获取整机列表
    selectGoodsNameList() {
      this.$api.seeGoodsService.selectGoodsNameList(this.params)
        .then(res => {
          this.kind1Data = res.data || []
        })
    },
    // 获取配件列表
    selectGoodsInfoTreeList() {
      this.$api.seeGoodsService.selectGoodsInfoTreeList(this.params)
        .then(res => {
          this.kind2Data = res.data || []
        })
    },
    // 多选
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