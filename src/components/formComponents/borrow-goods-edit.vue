/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-04 09:42:34
 * @Description: 借入/借出商品编辑页面
*/  
<template>
  <form-card class="borrow-goods" title="借入/借出商品">
    <div slot="title">
      <span>借入/借出商品</span>
    </div>
    <el-table :data="data.commodityList" max-height="400" ref="elTable" row-key="commodityCode" size="mini">
      <el-table-column class-name="hide-children" min-width="1" width="1"></el-table-column>
      <el-table-column label="操作" min-width="70" prop="name">
        <template slot-scope="{$index}">
          <!-- el-icon-remove el-icon-circle-plus -->
          <span @click="add($index)" class="f20 el-icon-circle-plus"></span>
          <span @click="del($index)" class="f20 ml5 el-icon-remove d-text-red" v-if="$index>0"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="60">
        <template slot-scope="{row}">
          <div class="expanded-icons d-text-gray" v-if="row.children&&row.children.length">
            <span @click="expand(row)" class="el-icon-plus d-pointer" v-if="!row.expanded"></span>
            <span @click="expand(row)" class="el-icon-minus d-pointer" v-else></span>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column label="商品编号" min-width="130" prop="commodityCode">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.commodityCode`" :rules="[{required:true}]">
            <commodity-selector
              :codes="data.commodityList.map(item=>item.commodityCode)"
              @choose="chooseGoods($event,$index)"
              type="code"
              v-model="row.commodityCode"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="130" prop="goodsName">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.goodsName`" :rules="[{required:true}]">
            <commodity-selector
              :codes="data.commodityList.map(item=>item.commodityCode)"
              @choose="chooseGoods($event,$index)"
              v-model="row.goodsName"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="借出数量" min-width="100" prop="borrowLoanNum" v-if="data.borrowLoanType==1">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.borrowLoanNum`" :rules="[{required:true},{type:'positiveNum'}]">
            <el-input v-model="row.borrowLoanNum"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="借入数量" min-width="100" prop="borrowLoanNum" v-else>
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.borrowLoanNum`" :rules="[{required:true},{type:'positiveNum'}]">
            <el-input v-model="row.borrowLoanNum"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="借入价格(不含税)" min-width="120" prop="name" v-if="data.borrowLoanType==0">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`commodityList.${$index}.costUnivalence`" :rules="[{required:true},{type:'price'}]">
            <el-input v-model="row.costUnivalence"></el-input>
          </el-form-item>
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
          <div>{{row.categoryCode | dictionary('PSI_SP_KIND')}}</div>
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
          borrowLoanNum: '',
          commodityCode: '',
          costUnivalence: ''
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
    chooseGoods(e, i) {
      let list = this.data.commodityList;
      e = JSON.parse(JSON.stringify(e));
      e.map(item => {
        item.borrowLoanNum = 1;
        item.costUnivalence = 0;
      });
      list.splice.apply(list, [i, 1].concat(e));
    },
    add(i) {
      this.data.commodityList.splice(i + 1, 0, {
        borrowLoanNum: '',
        commodityCode: '',
        costUnivalence: ''
      });
    },
    del(i) {
      this.data.commodityList.splice(i, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.borrow-goods {
  /deep/ {
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__error {
        position: relative;
      }
    }
    .el-input__suffix {
      display: none;
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
