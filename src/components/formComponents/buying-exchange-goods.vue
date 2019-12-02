/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 11:27:28
 * @Description: 换货单换货商品 已绑定字段 1
*/  
<template>
  <div>
    <buying-goods-edit
      :customColumns="customColumns"
      :data="data"
      :disabled="disabled"
      :fkey="fkey"
      :show="[
      'categoryCode','className','specOne','configName','noteText','costAmountPrice','taxRate','!add','unit',
    ]"
      :sort="['expanded'].concat(
      disabled?['snCodes','swapInNum','swapOutNum','swapInWmsNames','swapOutWmsNames']:[],
      ['actions','commodityCodes','commodityCode','goodsNames','swapInNum','swapInMoney','swapOutNum','swapOutMoney','taxRate','preTaxAmount']
    )"
      :summaryMethod="getSummaries"
      :title="exchangeType=='in'?'换入商品':'换出商品'"
      class="borrow-goods"
      ref="goodsTable"
    >
      <template
        slot="actions"
        slot-scope="{row,info}"
      >
        <span
          @click="add(row,info)"
          class="f20 ml5 el-icon-circle-plus d-pointer"
          v-if="!info.isChild"
        ></span>
        <span
          @click="del(row,info)"
          class="f20 ml5 el-icon-remove d-text-red d-pointer"
          v-if="(info.isChild)?false:(info.index>0)"
        ></span>
      </template>
      <template
        slot="commodityCode"
        slot-scope="{row,info,formProp}"
      >
        <el-form-item
          :prop="formProp"
          :rules="[{required:true}]"
        >
          <commodity-selector
            :codes="info.parentArray.map(item=>item.commodityCode)"
            :disabled="info.isChild?true:disabled"
            @choose="chooseGoods($event,row,info)"
            type="code"
            v-model="row.commodityCode"
          />
        </el-form-item>
      </template>
      <template
        slot="goodsName"
        slot-scope="{row,info,formProp}"
      >
        <el-form-item
          :prop="formProp"
          :rules="[{required:true}]"
        >
          <commodity-selector
            :codes="info.parentArray.map(item=>item.commodityCode)"
            :disabled="info.isChild?true:disabled"
            @choose="chooseGoods($event,row,info)"
            v-model="row.goodsName"
          />
        </el-form-item>
      </template>
      <template
        slot="swapInNum"
        slot-scope="{row,info,formProp}"
      >
        <el-form-item
          :prop="formProp"
          :rules="[{required:true},{type:'positiveNum'},{validator:checkSwapInNum.bind(this,row)}]"
          v-if="!info.isChild"
        >
          <el-input
            :disabled="disabled"
            size="mini"
            v-model="row.swapInNum"
          ></el-input>
        </el-form-item>
      </template>
      <template
        slot="swapInMoney"
        slot-scope="{row,info,formProp}"
      >
        <el-form-item
          :prop="formProp"
          :rules="[{required:true},{type:'price'}]"
          v-if="!info.isChild"
        >
          <el-input
            :disabled="disabled"
            size="mini"
            v-model="row.swapInMoney"
          ></el-input>
        </el-form-item>
      </template>
      <template
        slot="swapOutNum"
        slot-scope="{row,info,formProp}"
      >
        <el-form-item
          :prop="formProp"
          :rules="[{required:true},{type:'positiveNum'},{validator:checkSwapOutNum.bind(this,row)}]"
          v-if="!info.isChild"
        >
          <el-input
            :disabled="disabled"
            size="mini"
            v-model="row.swapOutNum"
          ></el-input>
        </el-form-item>
      </template>
      <template
        slot="swapOutMoney"
        slot-scope="{row,info,formProp}"
      >
        <el-form-item
          :prop="formProp"
          :rules="[{required:true},{type:'price'}]"
          v-if="!info.isChild"
        >
          <el-input
            :disabled="disabled"
            size="mini"
            v-model="row.swapOutMoney"
          ></el-input>
        </el-form-item>
      </template>

    </buying-goods-edit>
    <outGoodsRecord
      :visible.sync='dialogVisible'
      v-if="dialogVisible"
      :form='tpForm'
    />
  </div>
</template>
<script>
import outGoodsRecord from './out-goods-record'
export default {
  components: { outGoodsRecord },
  props: {
    data: {
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => []
    },
    exchangeType: {
      type: String,
      default: 'in'
    }
  },
  data() {
    return {
      showInFullscreen: false,
      dialogVisible: false,
      tpForm: {}
    };
  },
  mounted() {
    if (!this.data[this.fkey] || !this.data[this.fkey].length) {
      this.data[this.fkey] = [
        {
          commodityCode: '',
          goodsName: '',
          _rowKey: +new Date()
        }
      ];
    }
  },
  computed: {
    fkey() {
      return this.exchangeType == 'in'
        ? 'putinCommodityList'
        : 'putoutCommodityList';
    },
    // prettier-ignore
    customColumns() {
      let cols = [
        {          label: '含税总金额', key: 'preTaxAmount', width: 140, prop: 'preTaxAmount',
          format: (a, b) => this.getPreTaxAmount(b)
        },
      ]
      if (this.disabled) {
        cols = cols.concat([
          { label: '商品编号', key: 'commodityCode', width: 140, prop: 'commodityCode', showOverflowTip: true },
          { label: '商品名称', key: 'goodsNames', width: 140, prop: 'goodsName', showOverflowTip: true },
          { label: 'SN码/机器号', key: 'snCodes', fixed: true, width: 140, prop: 'goodsName',
            format: (a, b) => (this.exchangeType == 'in' ? b.swapInAccomplishNum : b.swapOutAccomplishNum) || 0,
            click: (a) => { this.changeDialog(a) }
          },
        ], this.exchangeType == 'in' ? [
          { label: '换入数量', key: 'swapInNum', fixed: true, width: 140, prop: 'swapInNum', },
          { label: '换入金额', key: 'swapInMoney', width: 140, prop: 'swapInMoney', },
          { label: '换入库房', key: 'swapOutWmsNames', fixed: true, width: 140, prop: 'swapOutWmsNames', },
        ] : [
          { label: '换出数量', key: 'swapOutNum', fixed: true, width: 140, prop: 'swapOutNum', },
          { label: '换出金额', key: 'swapOutMoney', width: 140, prop: 'swapOutMoney', },
          { label: '换出库房', key: 'swapOutWmsNames', fixed: true, width: 140, prop: 'swapOutWmsNames', },
        ], )
      } else {
        cols = cols.concat([
          { label: '商品编号', key: 'commodityCodes', width: 140, prop: 'commodityCode', slot: 'commodityCode' },
          { label: '商品名称', key: 'goodsNames', width: 140, prop: 'goodsName', slot: 'goodsName' },
        ], this.exchangeType == 'in' ? [
          { label: '换入数量', key: 'swapInNum', width: 140, prop: 'swapInNum', slot: 'swapInNum' },
          { label: '换入金额', key: 'swapInMoney', width: 140, prop: 'swapInMoney', slot: 'swapInMoney' },
        ] : [
          { label: '换出数量', key: 'swapOutNum', width: 140, prop: 'swapOutNum', slot: 'swapOutNum' },
          { label: '换出金额', key: 'swapOutMoney', width: 140, prop: 'swapOutMoney', slot: 'swapOutMoney' },
        ], [{ label: '操作', key: 'actions', width: 120, prop: 'actions', slot: 'actions' }])
      }
      return cols;
    }
  },
  methods: {
    changeDialog(row) {
      this.dialogVisible = true
      this.tpForm.commodityCode = row.commodityCode
      this.tpForm.businessCode = this.data.swapOrderCode//换货单/换货任务   this.data.swapTaskCode || 都用换货单的code
      this.tpForm.page = 1
      this.tpForm.limit = 20
      this.tpForm.operation = this.exchangeType == 'in' ? 0 : 1//参数，0入库 1 出库 
      this.tpForm.name = '换货'//区分换货和调拨单
    },
    getPreTaxAmount(row) {
      let np = this.exchangeType == 'in' ? 'swapInNum' : 'swapOutNum';
      let mp = this.exchangeType == 'in' ? 'swapInMoney' : 'swapOutMoney';
      return +Number(
        (row[mp] || 0) * (1 + (row.taxRate || 0) / 100) * (row[np] || 0) || 0
      ).toFixed(2);
    },
    getSummaries(param) {
      let { columns, data } = param;
      data = data || [];
      const sums = [];
      columns.forEach((col, index) => {
        if (['swapInNum', 'swapOutNum'].includes(col.property)) {
          let prop = col.property;
          sums[index] = +Number(
            data
              .map(item => Number(item[prop]) || 0)
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (['preTaxAmount'].includes(col.property)) {
          sums[index] = +Number(
            data
              .map(item => this.getPreTaxAmount(item))
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
          this.$emit('totalAmountChange', sums[index]);
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    },
    checkSwapInNum(row, rule, value, cb) {
      if (!(parseInt(value) || 0 > 1)) {
        cb(new Error('数量最低为1'));
      } else cb();
    },
    checkSwapOutNum(row, rule, value, cb) {
      if (!(parseInt(value) || 0 > 1)) {
        cb(new Error('数量最低为1'));
      } else cb();
    },
    checkDisassemblyNum(row, rule, value, cb) {
      if (!(parseInt(value) || 0 > 1)) {
        cb(new Error('数量最低为1'));
      } else cb();
    },
    getData(data) {
    },
    fullscreen() {
      this.showInFullscreen = true;
    },
    expand(row, isExpand) {
      this.$nextTick(() => {
        this.$refs.goodsTable.expand(row, isExpand);
      });
    },
    addChild(row) {
      let children = row.children || [];
      children.push({
        commodityCode: ''
      });
      this.$set(row, 'children', children);
      this.expand(row, true);
    },
    getScope(e) {
    },
    chooseGoods(goods, row, info) {
      let index = info.index;
      let parent = info.parent;
      goods = JSON.parse(JSON.stringify(goods));
      if (parent) {
        goods.map(item => {
          item._rowKey = `${parent._rowKey}_${item.commodityCode}`;
        });
      } else {
        goods.map(item => (item._rowKey = `${item.commodityCode}`));
      }
      let parentList = info.parentArray;
      parentList.splice.apply(parentList, [index, 1].concat(goods));
      if (row.children) {
        row.children.map(item => {
          item._rowKey = `${parentList[index]._rowKey}_${item.commodityCode}`;
        });
        this.$set(parentList[index], 'children', row.children);
      }
      if (row.expanded) {
        this.expand(row);
      }
    },
    add(row, info) {
      let i = info.index;
      let parent = row.$parent || this.data[this.fkey];
      parent.splice(i + 1, 0, {
        _rowKey: +new Date()
      });
    },
    del(row, info) {
      let i = info.index;
      let parent = info.parentArray;
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
      .el-form-item__error {
        position: relative;
      }
    }
  }
}
</style>
