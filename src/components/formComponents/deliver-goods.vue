/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-08 11:50:20
 * @Description: 商品发货信息
*/  
<template>
  <form-card class="deliver-goods" title="商品发货信息">
    <div slot="title">
      <span>商品发货信息</span>
    </div>
    <el-table :data="data.delivers" max-height="600px" ref="elTable" row-key="name" size="mini">
      <!-- <el-table-column class-name="hide-children" min-width="1" width="1"></el-table-column>
      <el-table-column min-width="60">
        <template slot-scope="{row}">
          <div class="expanded-icons d-text-gray" v-if="row.children&&row.children.length">
            <span @click="expand(row)" class="el-icon-plus d-pointer" v-if="!row.expanded"></span>
            <span @click="expand(row)" class="el-icon-minus d-pointer" v-else></span>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column label="商品编号" min-width="200" prop="title" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="d-text-blue" v-if="!row.fake">{{row.commodityCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" min-width="100" prop="goodsPic" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-image :src="row.goodsPic" class="d-center" fit="fill" style="width: 100px; height: 40px" v-if="!row.fake">
            <span slot="error">暂无图片</span>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="100" prop="goodsName" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.name||row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类别" min-width="80" prop="categoryCode" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品分类" min-width="80" prop="className" show-overflow-tooltip></el-table-column>
      <el-table-column label="规格" min-width="80" prop="specOne" show-overflow-tooltip></el-table-column>
      <el-table-column label="配置" min-width="80" prop="configName" show-overflow-tooltip></el-table-column>
      <el-table-column label="备注" min-width="200" prop="note"></el-table-column>
      <el-table-column label="数量" min-width="70" prop="commodityNumber"></el-table-column>
      <el-table-column fixed="right" label="序列号" min-width="200" prop="snCode">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`delivers.${$index}.deliverInfo.snCode`">
            <el-input size="mini" v-model="row.deliverInfo.snCode" :disabled="disabled"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="订单号" min-width="200" prop="orderCode">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`delivers.${$index}.deliverInfo.orderCode`">
            <el-input size="mini" v-model="row.deliverInfo.orderCode" :disabled="disabled"></el-input>
          </el-form-item>
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
      type: Object,
      default: () => ({})
    },
    disabled: Boolean
  },
  data() {
    return {
      showInFullscreen: false
    };
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
    }
  }
};
</script>
<style lang="scss" scoped>
.deliver-goods {
  /deep/ {
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__error {
        position: relative;
      }
    }
  }
  .expanded-icons {
    > span {
      display: inline-block;
      width: 16px;
      height: 16px;
      line-height: 16px;
      border: 1px solid #999;
      text-align: center;
    }
  }
}
</style>
