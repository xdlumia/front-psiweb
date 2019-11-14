/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-14 17:39:29
 * @Description: 拆卸商品编辑页面
*/  
<template>
  <form-card class="borrow-goods" title="商品信息">
    <div slot="title">
      <span>商品信息</span>
    </div>
    <el-table :data="data.commodityList||[]" max-height="400" ref="elTable" row-key="commodityCode" size="mini">
      <el-table-column class-name="hide-children" min-width="1" width="1"></el-table-column>
      <el-table-column label="操作" min-width="100" prop="name">
        <template slot-scope="{row,$index}">
          <span @click="addChild(row)" class="d-text-blue" v-if="!row.$parent">添加配件</span>
          <span @click="add($index,row)" class="f20 ml5 el-icon-circle-plus"></span>
          <span @click="del($index,row)" class="f20 ml5 el-icon-remove d-text-red" v-if="$index>0"></span>
        </template>
      </el-table-column>
      <el-table-column min-width="60">
        <template slot-scope="{row}">
          <div class="expanded-icons d-text-gray" v-if="row.children&&row.children.length">
            <span @click="expand(row)" class="el-icon-plus d-pointer" v-if="!row.expanded"></span>
            <span @click="expand(row)" class="el-icon-minus d-pointer" v-else></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" min-width="200" prop="commodityCode">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.commodityCode`" :rules="[{required:true}]">
            <commodity-selector
              :codes="data.commodityList.map(item=>item.commodityCode)"
              @choose="chooseGoods($event,$index,row)"
              type="code"
              v-model="row.commodityCode"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="200" prop="goodsName">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.goodsName`" :rules="[{required:true}]">
            <commodity-selector
              :codes="data.commodityList.map(item=>item.goodsName)"
              @choose="chooseGoods($event,$index,row)"
              v-model="row.goodsName"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="单件数量" min-width="120" prop="teardownNumber">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.teardownNumber`" :rules="[{required:true},{type:'positiveNum'}]">
            <el-input size="mini" v-model="row.teardownNumber"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="拆卸数量" min-width="120" prop="teardownNumber">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.teardownNumber`" :rules="[{required:true},{type:'positiveNum'}]">
            <el-input size="mini" v-model="row.teardownNumber"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="采购单价" min-width="110" prop="purchasePrice">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.purchasePrice`" :rules="[{required:true},{type:'price'}]">
            <el-input size="mini" v-model="row.purchasePrice"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="税率" min-width="110" prop="taxRate"></el-table-column>
      <el-table-column label="含税总价" min-width="110" prop>
        <template slot-scope="{row}">
          <span>{{+Number((row.purchasePrice*(1+(row.taxRate/100)))||0).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" min-width="100" prop="title" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-image :src="row.goodsPic" class="d-center" fit="fill" style="width: 100px; height: 40px">
            <span slot="error">暂无图片</span>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品类别" min-width="80" prop="categoryCode" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品分类" min-width="100" prop="className" show-overflow-tooltip></el-table-column>
      <el-table-column label="配置" min-width="100" prop="configName" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品规格" min-width="140" prop="specOne" show-overflow-tooltip></el-table-column>
      <el-table-column label="单位" min-width="80" prop="unit" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.unit | dictionary('SC_JLDW')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  components: {},
  props: {
    data: {
      default: () => {
        return {
          commodityList: []
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showInFullscreen: false
    };
  },
  mounted() {
    if (!this.data.commodityList || !this.data.commodityList.length) {
      this.data.commodityList = [
        {
          commodityCode: '',
          goodsName: ''
        }
      ];
    }
  },
  methods: {
    getData(data) {
      console.log(data);
    },
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    fullscreen() {
      this.showInFullscreen = true;
    },
    addChild(row) {
      row.children = row.children || [];
      row.children.push({
        $parent: row
      });
    },
    getScope(e) {
      console.log(e);
    },
    chooseGoods(goods, index, row) {
      let parent = row.$parent;
      goods = JSON.parse(JSON.stringify(goods));
      if (parent) {
        goods.map(item => (item.$parent = parent));
      }
      parent = this.data.commodityList;
      parent.splice.apply(parent, [index, 1].concat(goods));
    },
    add(i, row) {
      let parent = row.$parent || this.data.commodityList;
      parent.splice(i + 1, 0, {
        commodityCode: +new Date,
        $parent: row.$parent ? row.$parent : null
      });
    },
    del(i, row) {
      let parent = row.$parent || this.data.commodityList;
      parent.splice(i, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.borrow-goods {
  /deep/ {
    .el-input__suffix {
      display: none;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
