/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-12 16:09:23
 * @Description: 借入/借出商品编辑页面
*/  
<template>
  <buying-goods-edit
    :customColumns="customColumns"
    :data="data"
    :show="[
      'goodsPic','categoryCode','className','specOne','configName','!add','unit'
    ]"
    :showSummary="false"
    :sort="['expanded','actions','commodityCodes','goodsNames','borrowLoanNum','costUnivalence',]"
    :title="`${(data&&data.borrowLoanType==0)?'借入商品':'借出商品'}`"
    class="borrow-goods"
    ref="goodsTable"
  >
    <template slot="actions" slot-scope="{row,info}">
      <span @click="add(info.index)" class="f20 el-icon-circle-plus" v-if="!info.isChild"></span>
      <span @click="del(info.index)" class="f20 ml5 el-icon-remove d-text-red" v-if="info.index>0&&!info.isChild"></span>
    </template>
    <template slot="commodityCode" slot-scope="{row,info,formProp}">
      <el-form-item :prop="formProp" :rules="[{required:true}]" v-if="!info.isChild">
        <commodity-selector
          :codes="data.commodityList.map(item=>item.commodityCode)"
          @choose="chooseGoods($event,info.index)"
          type="code"
          v-model="row.commodityCode"
        />
      </el-form-item>
      <span v-else>{{row.commodityCode}}</span>
    </template>
    <template slot="goodsName" slot-scope="{row,info,formProp}">
      <el-form-item :prop="formProp" :rules="[{required:true}]" v-if="!info.isChild">
        <commodity-selector
          :codes="data.commodityList.map(item=>item.commodityCode)"
          @choose="chooseGoods($event,info.index)"
          v-model="row.goodsName"
        />
      </el-form-item>
      <span v-else>{{row.goodsName}}</span>
    </template>
    <!-- 借出/入数量 -->
    <!-- <template slot="borrowLoanNum" slot-scope="{row,info,formProp}">
      <el-form-item :prop="formProp" :rules="[{required:true},{type:'positiveNum'},{validator:checkInputIntegerNumber.bind(this,row,'borrowLoanNum'),}]" v-if="!info.isChild">
        <el-input v-model="row.borrowLoanNum"></el-input>
      </el-form-item>
    </template> -->
    <template slot="costUnivalence" slot-scope="{row,info,formProp}">
      <el-form-item :prop="formProp" :rules="[{required:true},{type:'price'}]" v-if="!info.isChild">
        <el-input v-model="row.costUnivalence"></el-input>
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
  computed: {
    // prettier-ignore
    customColumns(){
      // 1 借出 0 借入
      let columns = [];
      if(this.data){
        columns = [
          { label:'操作', key:'actions', width:120, prop:'actions',slot:'actions' },
          { label:'商品编号', key:'commodityCodes', width:220, prop:'commodityCode',slot:'commodityCode',showOverflowTip:true },
          { label:'商品名称', key:'goodsNames', width:140, prop:'goodsName',slot:'goodsName',showOverflowTip:true },
          { label:this.data.borrowLoanType==1?'借出数量':'借入数量', key:'borrowLoanNum', width:100, prop:'borrowLoanNum', type:'inputinteger'},
        ]
        if(this.data.borrowLoanType==0){
          columns.push({ label:'借入价格', key:'costUnivalence', width:100, prop:'costUnivalence',slot:'costUnivalence'})
        }
      }
      return columns;
    }
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
