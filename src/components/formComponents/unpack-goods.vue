/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-12 16:27:00
 * @Description: 拆卸商品编辑页面
*/  
<template>
  <buying-goods-edit
    :customColumns="[
        { label:'操作', key:'actions', width:120, prop:'actions',slot:'actions' },
        { label:'商品编号', key:'commodityCodes', width:140, prop:'commodityCode',slot:'commodityCode' },
        { label:'商品名称', key:'goodsNames', width:140, prop:'goodsName',slot:'goodsName' },
        { label:'单件数量', key:'singleNum', width:100, prop:'singleNum',slot:'singleNum'},
        { label:'拆卸数量', key:'disassemblyNum', width:100, prop:'disassemblyNum',slot:'disassemblyNum'},
        { label:'采购单价', key:'purchaseUnivalence', width:100, prop:'purchaseUnivalence',slot:'purchaseUnivalence',showOverflowTip:true},
        { label:'含税总价', key:'taxPrice', width:100, prop:'taxPrice',showOverflowTip:true,format:(a,row,info)=>getTaxPrice(row,info)},
        { label:'采购总价', key:'childTotalPrice', width:100, prop:'childTotalPrice',showOverflowTip:true,format:(a,row,info)=>getChildTotalPrice(row,info)},
      ]"
    :data="data"
    :show="[
        'categoryCode','className','specOne','configName','noteText','costAmountPrice','taxRate','!add','unit','expanded'
      ]"
    :showSummary="false"
    :sort="['actions','commodityCodes','goodsNames','singleNum','disassemblyNum','purchaseUnivalence','childTotalPrice','taxRate','taxPrice','expanded']"
    class="borrow-goods"
    ref="goodsTable"
    title="拆卸商品"
  >
    <template slot="actions" slot-scope="{row,info}">
      <span @click="addChild(row,info)" class="d-text-blue d-pointer" v-if="!info.isChild&&!row.configId&&row.commodityCode">添加配件</span>
      <span @click="add(row,info)" class="f20 ml5 el-icon-circle-plus d-pointer" v-if="info.isChild?(info.parent.configId?false:true):true"></span>
      <span
        @click="del(row,info)"
        class="f20 ml5 el-icon-remove d-text-red d-pointer"
        v-if="(info.isChild)?(info.parent.configId?false:true):(data.commodityList.length>1)"
      ></span>
    </template>
    <template slot="commodityCode" slot-scope="{row,info,formProp}">
      <el-form-item :prop="formProp" :rules="[{required:true}]" ref="commodityCode">
        <commodity-selector
          :codes="info.parentArray.map(item=>item.commodityCode)"
          :kinds="(info.isChild)?
                    [{ label: '配件', value: 'PSI_SP_KIND-2' },{ label: '服务', value: 'PSI_SP_KIND-3' }]:
                    [{ label: '整机', value: 'PSI_SP_KIND-1' }]"
          @choose="chooseGoods($event,row,info)"
          type="code"
          v-model="row.commodityCode"
        />
      </el-form-item>
    </template>
    <template slot="goodsName" slot-scope="{row,info,formProp}">
      <el-form-item :prop="formProp" :rules="[{required:true}]">
        <commodity-selector
          :codes="info.parentArray.map(item=>item.commodityCode)"
          :kinds="(info.isChild)?
                    [{ label: '配件', value: 'PSI_SP_KIND-2' },{ label: '服务', value: 'PSI_SP_KIND-3' }]:
                    [{ label: '整机', value: 'PSI_SP_KIND-1' }]"
          @choose="chooseGoods($event,row,info)"
          v-model="row.goodsName"
        />
      </el-form-item>
    </template>
    <template slot="singleNum" slot-scope="{row,info,formProp}">
      <el-form-item
        :prop="formProp"
        :rules="[{required:true},{type:'positiveNum'},{validator:checkSingleNum.bind(this,row)}]"
        v-if="info.isChild"
      >
        <el-input
          :disabled="info.parent.configId?true:false"
          @change="changeChildNum(info.parent),checkAll()"
          size="mini"
          v-model="row.singleNum"
        ></el-input>
      </el-form-item>
    </template>
    <template slot="disassemblyNum" slot-scope="{row,info,formProp}">
      <el-form-item :prop="formProp" :rules="[{required:true},{type:'positiveNum'},{validator:checkDisassemblyNum.bind(this,row)}]">
        <el-input :disabled="info.isChild" @change="changeChildNum(row),checkAll()" size="mini" v-model="row.disassemblyNum"></el-input>
      </el-form-item>
    </template>
    <template slot="purchaseUnivalence" slot-scope="{row,info,formProp}">
      <el-form-item
        :prop="formProp"
        :rules="[{required:true},{type:'price'},{validator:checkPurchasePrice.bind(this,row,info)}]"
        v-if="info.isChild"
      >
        <el-input @change="checkAll" size="mini" v-model="row.purchaseUnivalence"></el-input>
      </el-form-item>
    </template>
  </buying-goods-edit>
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
    console.log(this);
    if (!this.data.commodityList || !this.data.commodityList.length) {
      this.data.commodityList = [
        {
          commodityCode: '',
          goodsName: '',
          _rowKey: +new Date()
        }
      ];
    }
  },
  methods: {
    checkSingleNum(row, rule, value, cb) {
      if (!(parseInt(value) || 0 > 1)) {
        cb(new Error('数量最低为1'));
      } else cb();
    },
    checkDisassemblyNum(row, rule, value, cb) {
      if (!(parseInt(value) || 0 > 1)) {
        cb(new Error('数量最低为1'));
      } else cb();
    },
    checkPurchasePrice(row, info, rule, value, cb) {
      if (info.isChild) {
        row = info.parent;
      }
      if (Array.isArray(row.children)) {
        let total = row.children.reduce((num, item) => {
          return (num += +Number(
            (item.purchaseUnivalence || 0) * (item.singleNum || 0)
          ).toFixed(2));
        }, 0);
        if (row.purchaseUnivalence != total) {
          // prettier-ignore
          this.expand(row,true)
          return cb(new Error(`整机单价${row.purchaseUnivalence || 0}等于配件价格和数量总和,当前配件总和${total}`));
        }
      }
      cb();
    },
    getTaxPrice(row, info) {
      // prettier-ignore
      return +Number((row.disassemblyNum * row.purchaseUnivalence * (1+(row.taxRate||0)/100))||0).toFixed(2);
    },
    getChildTotalPrice(row, info) {
      if (info.isChild) {
        // prettier-ignore
        return +Number((row.singleNum * row.purchaseUnivalence)||0).toFixed(2);
      } else return row.purchaseUnivalence;
    },
    changeChildNum(row) {
      if (row.children && row.children.length) {
        row.children.some(item => {
          this.$set(
            item,
            'disassemblyNum',
            row.disassemblyNum * item.singleNum || 0
          );
        });
      }
    },
    getData(data) {
      console.log(data);
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
      console.log(e);
    },
    // prettier-ignore
    async chooseGoods(goods, row, info) {
      let index = info.index;
      let parent = info.parent;
      goods = JSON.parse(JSON.stringify(goods));
      goods = goods.map(item=>{
        return {
          ...item,
          purchaseUnivalence: item.inventoryPrice
        }
      })
      if (!info.isChild) {
        for (let i = 0; i < goods.length; i++) {
          let good = goods[i]
          if(good.configId){
            let {data} = await this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName({
                quotationId: good.configId
            });
            if(data&&data.length){
              good.children = data.map(item=>({
                ...item,
                singleNum:item.commodityNum,
                purchaseUnivalence:item.inventoryPrice
              }))
            }
          }
        }
      }
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
      let parent = info.parentArray;
      parent.splice(i + 1, 0, {
        commodityCode: '',
        _rowKey: ''
      });
    },
    del(row, info) {
      let i = info.index;
      let parent = info.parentArray;
      parent.splice(i, 1);
    },
    checkAll() {
      let item = Array.isArray(this.$refs.commodityCode)
        ? this.$refs.commodityCode[0]
        : this.$refs.commodityCode;
      item.form.validate();
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
