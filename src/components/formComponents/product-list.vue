/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-06 10:56:54
 * @Description: 整机列表 和 配件列表  私有组件 你们用不了 
*/
<template>
  <form-card :title="title">
    <el-table
      size="mini"
      height="550px"
      ref="kind1"
      v-if="title=='整机列表'"
      :data="kind1List"
      border
      row-key="goodsCode"
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
        reserve-selection
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
      size="mini"
      height="550px"
      row-key="goodsCode"
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
        reserve-selection
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="编号"
        min-width="180"
        prop="goodsCode"
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
      <el-table-column
        prop="saleReferencePrice"
        width="120"
        label="销售参考价"
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
      selections:[],
      preKind1List:[],
      preKind1Name:'',
      preKind2List:[],
      preKind2Name:'',
    };
  },
  created() {
    this.selectGoodsNameList()
    this.selectGoodsInfoTreeList()
  },
  computed: {
    kind1List() {
      if (this.kind1Name) {
        if(this.preKind1Name==this.kind1Name) return this.preKind1List;
        this.preKind1Name = this.kind1Name;
        // 变平化数据
        let flattenKindData = this.$$util.jsonFlatten(this.kind1Data)
        // 根据nama筛选数据
        let filterData = flattenKindData.filter(item => item.name.indexOf(this.kind1Name) != -1)
        let newData = this.$$util.formatChildren(filterData, 'className')
        return this.preKind1List = newData
      } else {
        return this.kind1Data
      }

    },
    // 配件列表
    kind2List() {
      if (this.kind2Name) {
        if(this.preKind2Name==this.kind2Name) return this.preKind2List;
        this.preKind2Name = this.kind2Name;
        // 变平化数据
        let flattenKindData = this.$$util.jsonFlatten(this.kind2Data)
        // 根据nama筛选数据
        let filterData = flattenKindData.filter(item => item.name.indexOf(this.kind2Name) != -1)
        let newData = this.$$util.formatChildren(filterData, 'secondClassName')
        return this.preKind2List = newData
      } else {
        return this.kind2Data
      }

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
    flatCallback(list,fn) {
      list.map(item => {
        fn(item)
        if (item.children) {
          this.flatCallback(item.children,fn);
        }
      })
    },
    resetSelection(){
      let selections = this.selections
      let table = this.$refs[this.title=='整机列表'?'kind1':'kind2']
      table.clearSelection()
      this.$nextTick(()=>{
        let items = {}
        this.flatCallback(table.data,item=>{
          items[item.goodsCode] = item;
        })
        selections.map(sel=>{
          if(items[sel.goodsCode]){
            this.toggleRowSelection(items[sel.goodsCode],true,false)
          }else{
            this.toggleRowSelection(sel,true,false)
          }
        })
      })
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
      this.selections = val;
    }
  },
};
</script>
<style lang="scss" scoped>
</style>