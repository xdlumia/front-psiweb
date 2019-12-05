/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-04 10:54:39
 * @Description: 借入/借出商品
*/  
<template>
  <div>
    <buying-goods-edit
      :customColumns="[
        { label:'借入数量', key:'borrowLoanNum',fixed:true, width:70, prop:'borrowLoanNum',format:(a,b,info)=>!info.isChild?`${b.borrowLoanAccomplishNum||0}/${b.borrowLoanNum||0}`:'' },
        { label:'借入库房', key:'borrowWmsName',fixed:true, width:120, prop:'borrowWmsName',showOverflowTip:true },
        { label:'机器号/SN码', key:'borrowLoanAccomplishNum',fixed:true, width:100, prop:'borrowLoanAccomplishNum',showOverflowTip:true,
          click:(row)=>(visible=true,currentCode=row.commodityCode,operationType=0),
        },
        { label:'返还数量', key:'returnNum',fixed:true, width:70, prop:'returnNum',format:(a,b,info)=>!info.isChild?`${b.returnAccomplishNum||0}/${b.returnNum||0}`:'' },
        { label:'返还库房', key:'returnWmsName',fixed:true, width:120, prop:'returnWmsName',showOverflowTip:true },
        { label:'机器号/SN码', key:'returnAccomplishNum',fixed:true, width:100, prop:'returnAccomplishNum',showOverflowTip:true,
          click:(row)=>(visible=true,currentCode=row.commodityCode,operationType=0),
        },
      ]"
      :data="data"
      :show="[
        'commodityCode','goodsName','goodsPic','categoryCode','className','specOne','configName','!add','unit'
      ]"
      :showSummary="false"
      :sort="[
        'expanded','borrowLoanNum','borrowWmsName','borrowLoanAccomplishNum','returnNum','returnWmsName',
        'returnAccomplishNum','commodityCode','goodsName','borrowLoanNum','costUnivalence',
      ]"
      :title="`${(data&&data.borrowLoanType==0)?'借入商品':'借出商品'}`"
      class="borrow-goods"
      ref="goodsTable"
    ></buying-goods-edit>
    <commodityRecordBorrow
      :params="{
      commodityCode:currentCode,
      businessCode:data.borrowLoanCode,
      operation:operationType
    }"
      :visible.sync="visible"
      v-if="visible"
    />
  </div>
</template>
<script>
import FullscreenElement from '@/components/fullscreen-element';
import commodityRecordBorrow from './commodity-record-borrow';

export default {
  components: {
    FullscreenElement,
    commodityRecordBorrow
  },
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
  computed: {
    // prettier-ignore
    customColumns(){
      // 1 借出 0 借入
      let columns = [];
      if(this.data){
        columns = [
          { label:'操作', key:'actions', width:120, prop:'actions',slot:'actions' },
          { label:'商品编号', key:'commodityCodes', width:140, prop:'commodityCode',slot:'commodityCode',showOverflowTip:true },
          { label:'商品名称', key:'goodsNames', width:140, prop:'goodsName',slot:'goodsName',showOverflowTip:true },
          { label:this.data.borrowLoanType==1?'借出数量':'借入数量', key:'borrowLoanNum', width:100, prop:'borrowLoanNum',slot:'borrowLoanNum'},
        ]
        if(this.data.borrowLoanType==0){
          columns.push({ label:'借入价格', key:'costUnivalence', width:100, prop:'costUnivalence',slot:'costUnivalence'})
        }
      }
      return columns;
    }
  },
  data() {
    return {
      currentCode: '',
      showInFullscreen: false,
      operationType: 0,
      visible: false
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
.borrow-goods {
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
