/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 19:26:48
 * @Description: 拆卸商品编辑页面
*/  
<template>
  <form-card class="borrow-goods" title="商品信息">
    <div slot="title">
      <span>商品信息</span>
    </div>

    <buying-goods-edit
      :customColumns="[
        { label:'操作', key:'action', width:100, prop:'action',slot:'action' },
        { label:'拆卸数量', fixed:true, key:'disassemblyNum', width:100, prop:'disassemblyNum',format:(a,row)=>`0/${row.disassemblyNum||0}` },
        { label:'待分配', fixed:true, key:'waitTeardownNumber', width:100, prop:'teardownNumber',format:(a,row)=>`${row.teardownNumber||0}` },
        { label:'机器号/SN码', fixed:true, key:'code', width:100, prop:'teardownNumber', click:(e)=>getTableVisible(e), format:()=> 1 },
        { label:'配件数量', key:'singleNum', width:100, prop:'singleNum', },
        { label:'采购单价', key:'purchasePrice', width:100, prop:'purchasePrice',format:(a,row)=>row.purchaseUnivalence||row.inventoryPrice },
      ]"
      :data="data"
      :show="[
        'categoryCode','className','specOne','configName','noteText','costAmountPrice','taxRate','!add','unit','expanded'
      ]"
      :showSummary="false"
      :sort="[]"
      title="拆卸商品"
    >
      <template slot="action" slot-scope="{row}">
        <span @click="addChild(row)" class="d-text-blue d-pointer" v-if="!getRowInfo(row).isChild">添加配件</span>
        <span @click="add(row)" class="f20 ml5 el-icon-circle-plus d-pointer"></span>
        <span
          @click="del(row)"
          class="f20 ml5 el-icon-remove d-text-red d-pointer"
          v-if="!getRowInfo(row).isChild?true:(getRowInfo(row).index>0)"
        ></span>
      </template>
    </buying-goods-edit>

    <el-table :data="data.commodityList||[]" max-height="400" ref="elTable" row-key="_rowKey" size="mini">
      <el-table-column class-name="hide-children" min-width="1" width="1"></el-table-column>
      <el-table-column label="操作" min-width="120" prop="name">
        <template slot-scope="{row}">
          <span @click="addChild(row)" class="d-text-blue d-pointer" v-if="!getRowInfo(row).isChild">添加配件</span>
          <span @click="add(row)" class="f20 ml5 el-icon-circle-plus d-pointer"></span>
          <span
            @click="del(row)"
            class="f20 ml5 el-icon-remove d-text-red d-pointer"
            v-if="!getRowInfo(row).isChild?true:(getRowInfo(row).index>0)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column min-width="40">
        <template slot-scope="{row}">
          <div class="expanded-icons d-text-gray" v-if="row.children&&row.children.length">
            <span @click="expand(row)" class="el-icon-plus d-pointer" v-if="!row.expanded"></span>
            <span @click="expand(row)" class="el-icon-minus d-pointer" v-else></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" min-width="200" prop="commodityCode" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-form-item :prop="getProp(row,'commodityCode')" :rules="[{required:true}]">
            <commodity-selector
              :codes="getRowInfo(row).parent.map(item=>item.commodityCode)"
              :kinds="!getRowInfo(row).isChild?
              [{ label: '配件', value: 'PSI_SP_KIND-2' },{ label: '服务', value: 'PSI_SP_KIND-3' }]:
              [{ label: '整机', value: 'PSI_SP_KIND-1' }]"
              @choose="chooseGoods($event,row)"
              type="code"
              v-model="row.commodityCode"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="200" prop="goodsName" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-form-item :prop="getProp(row,'goodsName')" :rules="[{required:true}]">
            <commodity-selector
              :codes="getRowInfo(row).parent.map(item=>item.goodsName)"
              :kinds="!getRowInfo(row).isChild?
              [{ label: '配件', value: 'PSI_SP_KIND-2' },{ label: '服务', value: 'PSI_SP_KIND-3' }]:
              [{ label: '整机', value: 'PSI_SP_KIND-1' }]"
              @choose="chooseGoods($event,row)"
              v-model="row.goodsName"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="单件数量" min-width="120" prop="singleNum" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-form-item
            :prop="getProp(row,'singleNum')"
            :rules="[{required:true},{type:'positiveNum'},{validator:checkPositiveNum.bind(this,row)}]"
            v-if="!getRowInfo(row).isChild"
          >
            <el-input size="mini" v-model="row.singleNum"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="拆卸数量" min-width="120" prop="disassemblyNum" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-form-item
            :prop="getProp(row,'disassemblyNum')"
            :rules="[{required:true},{type:'positiveNum'},{validator:checkDisassemblyNum.bind(this,row)}]"
            v-if="getRowInfo(row).isChild"
          >
            <el-input size="mini" v-model="row.disassemblyNum"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="采购单价" min-width="110" prop="purchaseUnivalence" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-form-item
            :prop="getProp(row,'purchaseUnivalence')"
            :rules="[{required:true},{type:'price'},{validator:checkPurchasePrice.bind(this,row)}]"
          >
            <el-input size="mini" v-model="row.purchaseUnivalence"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="税率" min-width="110" prop="taxRate"></el-table-column>
      <el-table-column label="含税总价" min-width="110" prop>
        <template slot-scope="{row}">
          <span>{{+Number((row.purchaseUnivalence*(1+(row.taxRate/100)))||0).toFixed(2)}}</span>
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
          goodsName: '',
          _rowKey: +new Date()
        }
      ];
    }
    console.log(this, this.data);
  },
  methods: {
    getProp(row, prop) {
      try {
        return !this.getRowInfo(row).isChild
          ? `commodityList.${this.getRowInfo(row).parentIndex}.children.${
              this.getRowInfo(row).index
            }.purchaseUnivalence`
          : `commodityList.${this.getRowInfo(row).index}.purchaseUnivalence`;
      } catch (error) {
        console.error(error);
      }
    },
    checkPositiveNum(row, rule, value, cb) {
      if (!(parseInt(value) || 0 > 1)) {
        cb(new Error('数量最低为1'));
      } else cb();
    },
    checkDisassemblyNum(row, rule, value, cb) {
      if (!(parseInt(value) || 0 > 1)) {
        cb(new Error('数量最低为1'));
      } else cb();
    },
    checkPurchasePrice(row, rule, value, cb) {
      let info = this.getRowInfo(row);
      if (info.isChild) {
        row = row.$parent;
        info = this.getRowInfo(row);
      }
      if (Array.isArray(row.children)) {
        let total = row.children.reduce((num, item) => {
          return (num += +Number(
            (item.purchaseUnivalence || 0) * (item.singleNum || 0)
          ).toFixed(2));
        }, 0);
        if (row.purchaseUnivalence > total) {
          return cb(new Error(`整机单价等于配件价格和数量总和${total}`));
        }
      }
      cb();
    },
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
    getRowInfo(row) {
      try {
        let isChild = row._rowKey != row.commodityCode;
        let ks = row._rowKey.split('_');
        let parentIndex = -1;
        let parent = (this.data[this.fkey] || []).filter(
          item => item.commodityCode == ks[0]
        );
        return {
          isChild,
          parent: isChild ? parent[0] : this.data[this.fkey] || [],
          parentIndex: isChild
            ? (this.data[this.fkey] || []).indexOf(parent[0])
            : null,
          index: isChild ? parent[0].children.indexOf(row) : parentIndex
        };
      } catch (e) {
        console.error(e);
        return {};
      }
    },
    addChild(row) {
      this.$set(row, 'children', row.children || []);
      row.children.push({
        _rowKey: +new Date(),
        $parentCode: row.commodityCode
      });
      console.log(row);
      if (!row.expanded) {
        this.$nextTick(() => this.expand(row));
      }
    },
    getScope(e) {
      console.log(e);
    },
    chooseGoods(goods, row) {
      let index = this.getRowInfo(row).index;
      let parent = row.$parent;
      goods = JSON.parse(JSON.stringify(goods));
      if (parent) {
        goods.map(item => {
          item.$parentCode = parent.commodityCode;
          item._rowKey = `${parent._rowKey}_${item.commodityCode}`;
        });
      } else {
        goods.map(item => (item._rowKey = `${item.commodityCode}`));
      }
      let parentList = parent ? parent.children : this.data.commodityList;
      parentList.splice.apply(parentList, [index, 1].concat(goods));
      if (row.children) {
        row.children.map(item => {
          item.$parentCode = parentList[index].commodityCode;
          item._rowKey = `${parentList[index]._rowKey}_${item.commodityCode}`;
        });
        this.$set(parentList[index], 'children', row.children);
      }
      if (row.expanded) {
        this.$nextTick(() => this.expand(parentList[index]));
      }
    },
    add(row) {
      let i = this.getRowInfo(row).index;
      let parent = row.$parent || this.data.commodityList;
      parent.splice(i + 1, 0, {
        _rowKey: +new Date()
      });
    },
    del(row) {
      let i = this.getRowInfo(row).index;
      let parent = this.getRowInfo(row).parent;
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
