/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-07 20:17:39
 * @Description: 整机列表 和 配件列表  私有组件 你们用不了 
*/
<template>
  <form-card :title="title">
    <el-table
      height="550px"
      ref="kind1"
      v-if="title=='整机列表'"
      :data="kind1List"
      border
      row-key="name"
      @selection-change="selectionChange"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
      row-key="id"
      :data="kind2List"
      v-else
      ref="kind2"
      border
      default-expand-all
      @selection-change="selectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="secondClassName"
        label="商品分类"
        width="180"
      >
      </el-table-column>
      <el-table-column
        type="selection"
        width="120"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="编号"
        min-width="180"
      >
        <template slot-scope="scope">
          <span class="d-text-blue">{{scope.row.goodsCode}}</span>
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
      default: () => ({})
    },
  },
  data() {
    return {
      // 整机列表数据
      kind1Data: [],

      kind2Data: [],
      // 本地搜索
      kind1Name: '',
      kind2Name: '',
    };
  },
  created() {
    this.selectGoodsNameList()
    this.selectGoodsInfoTreeList()
  },
  computed: {
    kind1List() {
      // 变平化数据
      let flattenKindData = this.$$util.jsonFlatten(this.kind1Data)
      // 根据nama筛选数据
      let filterData = flattenKindData.filter(item => item.name.indexOf(this.kind1Name) != -1)
      let newData = this.$$util.formatChildren(filterData, 'className')
      return newData
    },
    // 配件列表
    kind2List() {
      // 变平化数据
      let flattenKindData = this.$$util.jsonFlatten(this.kind2Data)
      // 根据nama筛选数据
      let filterData = flattenKindData.filter(item => item.name.indexOf(this.kind2Name) != -1)
      let newData = this.$$util.formatChildren(filterData, 'secondClassName')
      return newData
    }
  },
  methods: {
    toggleRowSelection(row, selected = true) {
      if (this.title == '整机列表') {
        this.$refs.kind1.toggleRowSelection(row, selected);
      } else if (this.title == '配件列表') {
        this.$refs.kind2.toggleRowSelection(row, selected);
      }
    },
    filter(name) {
      if (this.title == '整机列表') {
        this.kind1Name = name
      } else if (this.title == '配件列表') {
        this.kind2Name = name
      }
    },
    // 重新加载
    reload() {
      if (this.title == '整机列表') {
        this.selectGoodsNameList()
      } else if (this.title == '配件列表') {
        this.selectGoodsInfoTreeList()
      }
    },
    // 获取整机列表
    selectGoodsNameList() {
      this.$api.seeGoodsService.selectGoodsNameList({ categoryCode: 'PSI_SP_KIND-1' })
        .then(res => {
          this.kind1Data = res.data || []
        })
    },
    // 获取配件列表
    selectGoodsInfoTreeList() {
      this.$api.seeGoodsService.selectGoodsInfoTreeList({ categoryCode: 'PSI_SP_KIND-2' })
        .then(res => {
          this.kind2Data = res.data || []
        })
    },
    // 多选
    selectionChange(val) {
      this.$emit('selection-change', val)
    }
  },
};
</script>
<style lang="scss" scoped>
</style>