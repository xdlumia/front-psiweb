/*
 * @Author: 赵伦
 * @Date: 2019-11-08 10:30:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-14 15:43:02
 * @Description: 采购模块用的商品信息 1
*/
<template>
  <div class="buying-goods-selector">
    <form-card :title="hide.includes('formTitle')||show.includes('!formTitle')?'':'商品信息'">
      <div slot="title">
        <span>{{title||'商品信息'}}</span>
        <commodity-selector
          :codes="this.data[fkey]?this.data[fkey].map(item=>item.commodityCode):[]"
          @choose="choose"
          class="ml10"
          v-if="(!disabled)&&!hide.includes('add')&&!show.includes(`!add`)"
        />
        <span class="fr">
          <span>
            <el-link :underline="false" @click="showInFull=true" type="primary">全屏显示</el-link>
          </span>
        </span>
      </div>
      <el-table
        :data="data[fkey]"
        :style="{height:showInFull?'calc(100% - 40px)':''}"
        :summary-method="getSummaries"
        ref="table"
        show-summary
        size="mini"
      >
        <el-table-column
          :align="item.align"
          :key="item.key"
          :label="item.label"
          :min-width="item.width"
          :prop="item.prop"
          :show-overflow-tooltip="item.showOverflowTip"
          v-for="item of useColumns"
        >
          <template slot-scope="{row,$index}">
            <template v-if="item.key=='commodityCode'">
              <div class="d-text-blue d-elip">{{row.commodityCode}}</div>
            </template>
            <template v-else-if="item.key=='goodsPic'">
              <el-image :src="row.goodsPic" class="d-center" fit="fill" style="width: 100px; height: 40px">
                <span slot="error">暂无图片</span>
              </el-image>
            </template>
            <!-- 字典开始 -->
            <template v-else-if="item.dictName">
              <span>{{row[item.prop] | dictionary(item.dictName)}}</span>
            </template>
            <template v-else-if="item.type=='number'">
              <span>{{row[item.prop]||0}}</span>
            </template>
            <!-- 字典结束 -->
            <!-- 价格输入开始 -->
            <template v-else-if="item.type=='input'">
              <el-form-item :prop="`${fkey}.${$index}.${item.prop}`" :rules="item.rules||[]" size="mini">
                <el-input :disabled="disabled" class="wfull" v-model="row[item.prop]" />
              </el-form-item>
            </template>
            <!-- 价格输入结束 -->
            <!-- 商品数量开始 -->
            <template v-else-if="item.type=='inputinteger'">
              <el-form-item
                :prop="`${fkey}.${$index}.${item.prop}`"
                :rules="[{required:true},{type:'positiveNum'}].concat(Number(row[
                  `max${item.prop}`
                ])>0?[{
                  min:1,
                  max:row[`max${item.prop}`],
                  message:`可输入区间 [1-${row[`max${item.prop}`]}]`
                }]:[])"
                size="mini"
              >
                <el-input :disabled="disabled" class="wfull" v-model="row[item.prop]"></el-input>
              </el-form-item>
            </template>
            <!-- 商品数量结束 -->
            <template v-else-if="item.format">
              <span>{{item.format(row[item.prop],row)}}</span>
            </template>
            <template v-else-if="item.key=='action'">
              <i @click="deleteChoose($index)" class="el-icon-error d-pointer f20 d-text-red"></i>
            </template>
            <!-- 选择开始 -->
            <template v-else-if="item.type=='selection'">
              <el-form-item :prop="`${fkey}.${$index}.${item.prop}`" size="mini">
                <el-checkbox
                  :disabled="disabled"
                  :false-label="0"
                  :true-label="1"
                  @change="columnSelect(item,$event)"
                  v-model="row[item.prop]"
                ></el-checkbox>
              </el-form-item>
            </template>
            <!-- 选择结束 -->
            <template v-else>{{row[item.prop]}}</template>
          </template>
          <template slot="header" v-if="item.type=='selection'">
            <el-checkbox
              :disabled="disabled"
              :false-label="0"
              :true-label="1"
              @change="headerSelect(item,$event)"
              v-model="item.selected"
            >{{item.label}}</el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </form-card>
    <FullscreenElement :element="$refs.table" :visible.sync="showInFull" />
  </div>
</template>
<script>
export default {
  props: {
    // 数据
    data: {
      type: Object,
      default: () => ({})
    },
    // 隐藏
    hide: {
      type: Array,
      default: () => []
    },
    // 显示
    show: {
      type: Array,
      default: () => []
    },
    // 默认列表字段
    fkey: {
      type: String,
      default: 'commodityList'
    },
    // 单价字段
    priceKey: {
      type: String,
      default: 'costAmount'
    },
    // 统计方法
    summaryMethod: {
      type: Function
    },
    // 排序
    sort: {
      type: Array
    },
    disabled: Boolean,
    title: String
  },
  data() {
    // prettier-ignore
    // 类型说明
    // type = number        数字类型，默认0，无法输入
    // type = input         可输入input框，可定义rules进行校验
    // type = inputinteger  正整数输入框，可定义每一行数据的 `max${item.prop}` 值为其最大值进行校验，必填
    // type = selection     可选列表
    // dictName             如有该值表明是业务字典
    // format               定义format函数，会传值进去并显示返回数据 Function(value,row)
    let columns = [
      { label: '商品编号', key: 'commodityCode', width: 160, prop: 'commodityCode' },
      { label: '商品图片', key: 'goodsPic', width: 100, prop: 'goodsPic' },
      { label: '商品名称', key: 'goodsName', width: 100, prop: 'goodsName' },
      { label: '库房', key: 'wsm', width: 100, prop: 'wsmName' },
      { label: '商品类别', key: 'categoryCode', width: 80, prop: 'categoryCode',dictName:'PSI_SP_KIND' },
      { label: '商品分类', key: 'className', width: 80, prop: 'className', },
      { label: '规格', key: 'specOne', width: 80, prop: 'specOne', },
      { label: '配置', key: 'configName', width: 100, prop: 'configName', },
      { label: '备注', key: 'noteText', width: 120, prop: 'note', },
      { label: '待采购数量', key: 'waitPurchaseNumber', width: 100, prop: 'waitPurchaseNumber',showOverflowTip:true,type:'number' },
      { label: '销售单价', key: 'salesPrice', width: 100, prop: 'salesPrice',showOverflowTip:true,type:'number' },
      { label: '采购成本价', key: 'costAmount', width: 100, prop: 'costAmount',showOverflowTip:true,type:'number' },
      { label: '采购单价', key: 'costAmountPrice', width: 100, prop: 'costAmount',type:'input',showOverflowTip:true,rules:[{required:true},{type:'price'}] },
      { label: '商品数量', key: 'commodityNumber', width: 80, prop: 'commodityNumber',showOverflowTip:true,type:'inputinteger' },
      { label: '单位', key: 'unit', width: 80, prop: 'unit',dictName:'SC_JLDW' },
      { label: '退货商品数量', key: 'alterationNumber', width: 140, prop: 'alterationNumber',showOverflowTip:true,type:'inputinteger' },
      { label: '退货数量', key: 'alterationNumberRate', width: 140, prop: 'alterationNumber',showOverflowTip:true, },
      { label: '退货单价', key: 'alterationPrice', width: 80, prop: 'alterationPrice',type:'input',showOverflowTip:true,rules:[{required:true},{type:'price'}] },
      { label: '税率', key: 'taxRate', width: 60, prop: 'taxRate', format:a=>a?`${a}%`:'-' },
      { label: '含税总价', key: 'preTaxAmount', width: 120, prop: 'preTaxAmount', showOverflowTip:true,
        format:(a,{costAmount,taxRate,commodityNumber})=>+Number((costAmount*(1+(taxRate/100))*commodityNumber)||0).toFixed(2) 
      },
      { label: '退货含税总价', key: 'rejectPreTaxAmount', width: 120, prop: 'preTaxAmount',showOverflowTip:true, 
        format:(a,{alterationPrice,taxRate,alterationNumber})=>+Number((alterationPrice*(1+(taxRate/100))*alterationNumber)||0).toFixed(2) 
      },
      { label: '总库存', key: 'inventoryNumber', width: 100, prop: 'inventoryNumber',type:'number',showOverflowTip:true, },
      { label: '备注', key: 'note', width: 100, prop: 'note',type:'input',rules:[] },
      { label: '是否组装', key: 'isAssembly', align:"center", width: 100, prop: 'isAssembly',type:'selection',selected:0 },
      { label: '操作', key: 'action', width: 100, prop: 'action' },
    ];
    return {
      showInFull: false,
      columns
    };
  },
  computed: {
    useColumns() {
      let list = [];
      if (this.hide.length) {
        if (this.disabled)
          ['add', 'action'].map(
            a => this.hide.includes(a) || this.hide.push(a)
          );
        list = this.columns.filter(item => !this.hide.includes(item.key));
      } else if (this.show.length) {
        list = this.columns.filter(item => this.show.includes(item.key));
      } else {
        list = this.columns;
      }
      if (this.sort && this.sort.length) {
        let map = list.reduce((data, item) => (data[item.key] = item), {});
        list = [];
        this.sort.map(key => list.push(map[key]));
      }
      return list;
    }
  },
  mounted() {},
  methods: {
    getSummaries(param) {
      if (this.summaryMethod) return this.summaryMethod(param);
      let { columns, data } = param;
      data = data || [];
      const sums = [];
      columns.forEach((col, index) => {
        if (['commodityNumber'].includes(col.property)) {
          let prop = col.property;
          sums[index] = +Number(
            data
              .map(item => Number(item[prop]) || 0)
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
        } else if (['preTaxAmount'].includes(col.property)) {
          sums[index] = +Number(
            data
              .map(
                item =>
                  +Number(
                    item[this.priceKey] *
                      (1 + item.taxRate / 100) *
                      item.commodityNumber || 0
                  ).toFixed(2)
              )
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
          this.$emit('totalAmountChange', sums[index]);
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    },
    choose(e) {
      this.data[this.fkey] = this.data[this.fkey] || [];
      this.data[this.fkey] = this.data[this.fkey].concat(
        e.map(this.goodToBuyingInfo)
      );
    },
    deleteChoose(i) {
      this.data[this.fkey].splice(i, 1);
    },
    goodToBuyingInfo(good) {
      let target = {
        alterationNumber: '',
        alterationPrice: '',
        apportionmentAmount: '',
        busCode: '',
        busType: '',
        categoryCode: 'categoryCode',
        className: 'className',
        commodityCode: 'commodityCode',
        goodsName: 'goodsName',
        commodityNumber: '',
        configName: 'configName',
        costAmount: 'inventoryPrice',
        discount: '',
        discountSprice: '',
        goodsPic: 'goodsPic',
        inventoryNumber: 'usableInventoryNum',
        isAssembly: '',
        isDirect: '',
        isTeardown: '',
        note: '',
        parentCommodityCode: '',
        pickingNumber: '',
        preTaxAmount: '',
        putawayType: '',
        recentDiscountSprice: '',
        reference: '',
        salesPrice: '',
        shipmentsNumber: '',
        snCode: '',
        specOne: 'specOne',
        taxPrice: '',
        taxRate: 'taxRate',
        taxTotalAmount: '',
        unit: ''
      };
      let nGood = {};
      Object.keys(target).map(key => {
        nGood[key] = target[key] ? good[target[key]] : '';
      });
      return nGood;
    },
    headerSelect({ prop }, select) {
      this.data[this.fkey].map(item => (item[prop] = select));
    },
    columnSelect(item, select) {
      let { prop } = item;
      let first = 0;
      if (this.data[this.fkey].length > 1) {
        if (
          this.data[this.fkey].some((item, i) => {
            if (i == 0) first = item[prop];
            else return first != item[prop];
          })
        ) {
          item.selected = 0;
        } else {
          item.selected = 1;
        }
      } else if (this.data[this.fkey].length == 1) {
        item.selected = this.data[this.fkey][0][prop];
      }
      this.$set(item, 'selected', item.selected);
    }
  }
};
</script> 
<style lang="scss" scoped>
.buying-goods-selector {
  /deep/ {
    .el-form-item {
      margin-bottom: 0;
    }
    .el-input__suffix {
      display: none;
    }
  }
}
</style>