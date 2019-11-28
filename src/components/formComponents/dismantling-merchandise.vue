/*
 * @Author: 徐贺
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-29 16:16:52 
 * @Description: 拆卸商品
*/  
<template>
  <form-card
    class="borrow-goods-info"
    title="拆卸商品"
  >
    <div slot="title">
      <span>拆卸商品</span>
      <span class="fr">
        <span>
          <el-link
            :underline="false"
            @click="fullscreen"
            type="primary"
          >全屏显示</el-link>
        </span>
      </span>
    </div>
    <el-table
      border
      :data="data.commodityList"
      max-height="400"
      ref="companyTable"
      row-key="id"
      size="mini"
      :tree-props="{children: 'childrenCommodityList'}"
    >
      <el-table-column
        min-width="1"
        width="50"
      ></el-table-column>
      <el-table-column
        label="操作"
        min-width="80"
        prop="name"
      >
        <template
          slot-scope="scope"
          v-if='scope.row.childrenCommodityList !=null'
        >
          <el-button
            size="mini"
            type="primary"
            @click="disassemble(scope)"
          >拆卸</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="拆卸数量"
        min-width="100"
        prop="name"
      >
        <template slot-scope="scope">{{scope.row.accomplishDisassemblyNum || 0}}/{{scope.row.disassemblyNum}}</template>
      </el-table-column>
      <el-table-column
        label="机器号/SN码"
        min-width="100"
        prop="name"
      >
        <template slot-scope="scope">
          <span
            class="d-text-blue"
            @click="getTableVisible(scope.row)"
          >{{scope.row.accomplishDisassemblyNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        min-width="110"
        prop="goodsName"
      ></el-table-column>
      <el-table-column
        prop="commodityCode"
        label="商品编号"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span class="d-text-blue">{{scope.row.commodityCode}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品类别"
        min-width="100"
        prop="name"
      >
        <template slot-scope="scope">
          <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品分类"
        min-width="100"
        prop="className"
      ></el-table-column>
      <el-table-column
        label="商品规格"
        min-width="110"
        prop="specOne"
      ></el-table-column>
      <el-table-column
        label="备注"
        min-width="120"
        prop="note"
      ></el-table-column>
    </el-table>
    <FullscreenElement
      :element="$refs.companyTable"
      :visible.sync="showInFullscreen"
    />
    <disassDsassemble
      :allData='data'
      @reload="$emit('reload'),disVisible = false"
      :data='visibleData'
      :visible.sync='disVisible'
      @close='disVisible = false'
    />
    <goods-unpack-record
      :params='{businessCode:data.disassemblyTaskCode,commodityCode:recCommodity[0].commodityCode}'
      :commodityList="
      recCommodity"
      :data='data'
      :visible.sync="showRec"
      v-if="showRec"
    />
  </form-card>

</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import disassDsassemble from './disass-disassemble';//拆卸

export default {
  props: ['data'],
  components: { FullscreenElement, disassDsassemble },
  data() {
    return {
      showInFullscreen: false,
      state: '',
      value: '',
      visibleData: {

      },
      recCommodity: [],
      showRec: false,
      disVisible: false
    };
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    },
    //点击机器号和SN码
    getTableVisible(row) {
      this.showRec = true;
      this.recCommodity = [row];
    },
    //点击拆卸
    disassemble(scope) {
      this.disVisible = true
      this.visibleData = scope.row
    },
  }
};
</script>
<style lang="scss" scoped>
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
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
/deep/.el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}
/deep/.el-input__suffix {
  display: none !important;
}
</style>
<style>
.borrow-goods-info .el-autocomplete-suggestion {
  width: 400px !important;
}
</style>
