/*
 * @Author: 赵伦
 * @Date: 2019-11-08 10:30:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-23 17:24:36
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
        <span class="fr" v-if="!hide.includes('fullscreen')&&!show.includes('!fullscreen')">
          <span>
            <el-link :underline="false" @click="showInFull=true" type="primary">全屏显示</el-link>
          </span>
        </span>
      </div>
      <el-table
        :class="[showSummary?'':'hide-summary']"
        :data="recalcRowKey(data[fkey])"
        :expand-row-keys="expandRowKeys"
        :style="{height:showInFull?'calc(100% - 40px)':''}"
        :summary-method="showSummary?getSummaries:null"
        ref="table"
        row-key="_rowKey"
        show-summary
        size="mini"
      >
        <el-table-column
          :align="item.align"
          :class-name="item.className"
          :fixed="item.fixed"
          :key="item.key"
          :label="item.label"
          :min-width="item.width"
          :prop="item.prop"
          :show-overflow-tooltip="item.showOverflowTip"
          v-for="item of useColumns"
        >
          <template slot-scope="{row}">
            <template v-if="item.key=='commodityCode'">
              <div @click="openCommodityDetail(row.commodityCode)" class="d-text-blue d-elip d-pointer">{{row.commodityCode}}</div>
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
            <!-- 字典结束 -->
            <!-- 数字类型，默认0 开始 -->
            <template v-else-if="item.type=='number'">
              <span>{{row[item.prop]||0}}</span>
            </template>
            <!-- 数字类型，默认0 结束 -->
            <!-- 时间戳开始 -->
            <template v-else-if="item.type=='timestamp'">
              <span>{{row[item.prop]|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
            <!-- 时间戳结束 -->
            <!-- 价格输入开始 -->
            <template v-else-if="item.type=='input'">
              <el-form-item :prop="`${getCurrentFormProp(row,item.prop)}`" :rules="item.rules||[]" size="mini">
                <el-input :disabled="disabled" class="wfull" v-model="row[item.prop]" />
              </el-form-item>
            </template>
            <!-- 价格输入结束 -->
            <!-- 商品数量开始 -->
            <template v-else-if="item.type=='inputinteger'">
              <el-form-item
                :prop="`${getCurrentFormProp(row,item.prop)}`"
                :rules="[{required:true},{type:'positiveNum'}].concat(Number(row[
                  `max${item.prop}`
                ])>0?[{
                  validator:checkInputIntegerNumber.bind(this,row,item.prop),
                  message:`可输入区间 [1-${row[`max${item.prop}`]}]`
                }]:[])"
                size="mini"
              >
                <el-input :disabled="disabled" class="wfull" v-model="row[item.prop]"></el-input>
              </el-form-item>
            </template>
            <!-- 商品数量结束 -->
            <template v-else-if="item.key=='action'">
              <i @click="deleteChoose(row)" class="el-icon-error d-pointer f20 d-text-red"></i>
            </template>
            <!-- 选择开始 -->
            <template v-else-if="item.type=='selection'">
              <el-form-item :prop="`${getCurrentFormProp(row,item.prop)}`" size="mini">
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
            <!-- 展开子项开始 -->
            <template v-else-if="item.type=='expanded'">
              <div class="expanded-icons d-text-gray" v-if="row.children&&row.children.length">
                <span @click="expand(row)" class="el-icon-plus d-pointer" v-if="!row.expanded"></span>
                <span @click="expand(row)" class="el-icon-minus d-pointer" v-else></span>
              </div>
            </template>
            <!-- 展开子项结束 -->
            <!-- 自定义slot开始 -->
            <template v-else-if="typeof item.slot!='undefined'">
              <slot
                :formProp="getCurrentFormProp(row,item.prop)"
                :info="getParentInfo(row)"
                :item="item"
                :name="item.slot"
                :prop="item.prop"
                :row="row"
              />
            </template>
            <!-- 自定义slot结束 -->
            <!-- 其他开始 -->
            <template v-else>
              <span
                :class="[item.click?'d-text-blue d-pointer':'']"
                @click="item.click?item.click(row,item):''"
              >{{item.format?item.format(row[item.prop],row,getParentInfo(row)):row[item.prop]}}</span>
            </template>
            <!-- 其他结束 -->
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
    <CommodityDetail :code="currentCommodityCode" :visible.sync="showCommodityDetail" v-if="showCommodityDetail" />
  </div>
</template>
<script>
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';

let fakeId = 1;
export default {
  components: {
    CommodityDetail
  },
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
    customColumns: {
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
    showSummary: {
      type: Boolean,
      default: true
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
    // type = timestamp     可选列表
    // dictName             如有该值表明是业务字典
    // format               定义format函数，会传值进去并显示返回数据 Function(value,row)
    let columns = [
      { label: '商品编号', key: 'commodityCode', width: 160, prop: 'commodityCode' },
      { label: '商品图片', key: 'goodsPic', width: 100, prop: 'goodsPic' },
      { label: '商品名称', key: 'goodsName', width: 100, prop: 'goodsName' },
      { label: '库房', key: 'wsm', width: 100, prop: 'wsmName' },
      { label: '商品类别', key: 'categoryCode', width: 80, prop: 'categoryCode', dictName: 'PSI_SP_KIND' },
      { label: '商品分类', key: 'className', width: 80, prop: 'className', },
      { label: '规格', key: 'specOne', width: 80, prop: 'specOne', },
      { label: '配置', key: 'configName', width: 100, prop: 'configName', },
      { label: '备注', key: 'noteText', width: 120, prop: 'note', },
      { label: '待采购数量', key: 'waitPurchaseNumber', width: 100, prop: 'waitPurchaseNumber', showOverflowTip: true, type: 'number' },
      { label: '销售单价', key: 'salesPrice', width: 100, prop: 'salesPrice', showOverflowTip: true, type: 'number' },
      { label: '采购成本价', key: 'costAmount', width: 100, prop: 'costAmount', showOverflowTip: true, type: 'number' },
      { label: '采购单价', key: 'purchasePrice', width: 100, prop: 'purchasePrice', type: 'input', showOverflowTip: true, rules: [{ required: true }, { type: 'price' }] },
      { label: '商品数量', key: 'commodityNumber', width: 80, prop: 'commodityNumber', showOverflowTip: true, type: 'inputinteger' },
      { label: '单位', key: 'unit', width: 80, prop: 'unit', dictName: 'SC_JLDW' },
      { label: '退货商品数量', key: 'alterationNumber', width: 140, prop: 'alterationNumber', showOverflowTip: true, type: 'inputinteger' },
      { label: '退货数量', key: 'alterationNumberRate', width: 140, prop: 'alterationNumber', showOverflowTip: true, },
      { label: '退货单价', key: 'alterationPrice', width: 80, prop: 'alterationPrice', type: 'input', showOverflowTip: true, rules: [{ required: true }, { type: 'price' }] },
      { label: '税率', key: 'taxRate', width: 60, prop: 'taxRate', format: a => a ? `${a}%` : '-' },
      {        label: '含税总价', key: 'preTaxAmount', width: 120, prop: 'preTaxAmount', showOverflowTip: true,
        format: (a, { costAmount, taxRate, commodityNumber }) => +Number((costAmount * (1 + (taxRate / 100)) * commodityNumber) || 0).toFixed(2)
      },
      {        label: '含税总价', key: 'purchasePreTaxAmount', width: 120, prop: 'preTaxAmount', showOverflowTip: true,
        format: (a, { costAmount, taxRate, commodityNumber }) => +Number((costAmount * (1 + (taxRate / 100)) * commodityNumber) || 0).toFixed(2)
      },
      {        label: '退货含税总价', key: 'rejectPreTaxAmount', width: 120, prop: 'preTaxAmount', showOverflowTip: true,
        format: (a, { alterationPrice, taxRate, alterationNumber }) => +Number((alterationPrice * (1 + (taxRate / 100)) * alterationNumber) || 0).toFixed(2)
      },
      { label: '总库存', key: 'inventoryNumber', width: 100, prop: 'inventoryNumber', type: 'number', showOverflowTip: true, },
      { label: '备注', key: 'note', width: 100, prop: 'note', type: 'input', rules: [] },
      { label: '是否组装', key: 'isAssembly', align: "center", width: 100, prop: 'isAssembly', type: 'selection', selected: 0 },
      { label: '操作', key: 'action', width: 100, prop: 'action' },
    ];
    return {
      showInFull: false,
      columns,
      fakeId: 1,
      expandRowKeys: [],
      showCommodityDetail: false,
      currentCommodityCode: ''
    };
  },
  computed: {
    // 筛选自定义列
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
      if (this.customColumns) {
        list = list.concat(this.customColumns);
      }
      if (this.sort && this.sort.length) {
        let sort = ['hideChildren'].concat(this.sort);
        let map = list.reduce((data, item) => {
          data[item.key] = item;
          return data;
        }, {});
        list = [];
        sort.map(key => {
          if (map[key]) {
            list.push(map[key]);
            delete map[key];
          }
        });
        Object.values(map).map(item => list.push(item));
      }
      if (
        (this.sort && this.sort.includes('expanded')) ||
        this.show.includes('expanded') ||
        this.hide.includes('!expanded')
      ) {
        list.unshift(
          {
            key: 'hideChildren',
            fixed: true,
            width: 1,
            className: 'hide-children'
          },
          {
            label: '',
            fixed: true,
            key: 'expanded',
            width: 40,
            type: 'expanded'
          }
        );
      }
      return list;
    }
  },
  mounted() {},
  methods: {
    // 校验正整数区间 默认row中 `max${prop}` 的值为上限
    checkInputIntegerNumber(row, prop, rule, value, cb) {
      let num = Number(value) || 0;
      let max = Number(row[`max${prop}`]) || 0;
      if (max > 0) {
        if (num > 0 && num <= max) {
          cb();
        } else cb(new Error(`可输入区间 [1-${max}]`));
      } else cb();
    },
    // 打开商品详情
    openCommodityDetail(code) {
      this.showCommodityDetail = true;
      this.currentCommodityCode = code;
    },
    // 获取父级信息
    getParentInfo(row) {
      let top = this.data[this.fkey];
      let isChild = row._rowKey != row.commodityCode;
      let ks = row._rowKey.split('_');
      isChild = ks.length > 1;
      let parentIndex = -1;
      let parent = top.filter(item => item.commodityCode == ks[0]);
      let info = {
        isChild,
        parent: isChild ? parent[0] : null,
        parentArray: isChild ? parent[0].children : top,
        parentIndex: isChild ? top.indexOf(parent[0]) : null,
        index: isChild ? parent[0].children.indexOf(row) : top.indexOf(row)
      };
      return info;
    },
    // 生成表单属性路径
    getCurrentFormProp(row, prop) {
      let info = this.getParentInfo(row);
      let key = info.isChild
        ? `${this.fkey}.${info.parentIndex}.children.${info.index}.${prop}`
        : `${this.fkey}.${info.index}.${prop}`;
      return key;
    },
    // 生成树列表需要的rowkey
    recalcRowKey(list, pk = '') {
      (list || []).map(item => {
        this.$set(
          item,
          '_rowKey',
          String(
            item._rowKey ||
              [pk, item.commodityCode || fakeId++].filter(a => a).join('_')
          )
        );
        if (pk) {
          this.$set(item, '$parentCode', pk);
        }
        if (item.children) {
          this.recalcRowKey(item.children, item._rowKey);
        }
      });
      return list || [];
    },
    // 展开树
    expand(row, isExpand) {
      this.$nextTick(() => {
        isExpand = typeof isExpand == 'boolean' ? isExpand : !row.expanded;
        this.$set(row, 'expanded', isExpand);
        this.$refs.table.toggleRowExpansion(row, isExpand);
        // this.expandRowKeys = [row._rowKey]
      });
    },
    // 统计算法
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
    // 选择商品
    choose(e) {
      this.data[this.fkey] = this.data[this.fkey] || [];
      this.data[this.fkey] = this.data[this.fkey].concat(
        e.map(this.goodToBuyingInfo)
      );
    },
    // 删除某个商品
    deleteChoose(row) {
      let { parent, index, isChild } = this.getParentInfo(row);
      if (isChild) {
        parent.splice(index, 1);
      } else {
        this.data[this.fkey].splice(index, 1);
      }
    },
    // 商品转换字段 可能不需要了吧
    goodToBuyingInfo(good) {
      let target = {
        commodityCode: 'commodityCode',
        commodityId: 'id',
        costAmount: 'inventoryPrice',
        inventoryNumber: 'usableInventoryNum'
      };
      let nGood = { ...good };
      delete nGood.id;
      Object.keys(target).map(key => {
        nGood[key] = target[key] ? good[target[key]] : '';
      });
      return nGood;
    },
    // 头部选择
    headerSelect({ prop }, select) {
      this.data[this.fkey].map(item => (item[prop] = select));
    },
    // 某一行选择
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
      .el-form-item__error {
        position: relative;
      }
    }
    .el-input__suffix {
      display: none;
    }
  }
}
</style>
<style lang="scss">
.hide-summary {
  .el-table__footer-wrapper,
  .el-table__fixed-footer-wrapper {
    display: none;
  }
}
</style>