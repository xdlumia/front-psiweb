/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:02:43 
 * @Description: 拆卸商品 已绑定 1
 */
<template>
  <div>
    <buying-goods-edit
      :customColumns="[
        { label:'拆卸数量', fixed:true, key:'disassemblyNum', width:100, prop:'disassemblyNum',
          format:(a,row,info)=>info.isChild?'':`${(row.accomplishDisassemblyNum||0)}/${row.disassemblyNum||0}` 
        },
        { label:'待分配', fixed:true, key:'waitTeardownNumber', width:100, prop:'teardownNumber',
          format:(a,row,info)=>info.isChild?'':`${(row.undistributedNum||0)}`
        },
        { label:'机器号/SN码', fixed:true, key:'code', width:100, prop:'accomplishDisassemblyNum', click:(e)=>getTableVisible(e),
          format:(a)=>a||0,
        },
        { label:'配件数量', key:'singleNum', width:100, prop:'singleNum', },
        { label:'采购单价', key:'purchaseUnivalence', width:100, prop:'purchaseUnivalence',format:(a,row)=>row.purchaseUnivalence||row.inventoryPrice },
      ]"
      :data="data"
      :show="[
        'commodityCode','goodsName','categoryCode','className','specOne','configName','noteText','costAmountPrice','taxRate','!add','unit','expanded'
      ]"
      :showSummary="false"
      :sort="['expanded','disassemblyNum','commodityCode','goodsName','singleNum','purchaseUnivalence','costAmountPrice','taxRate','categoryCode','className','specOne','configName',]"
      title="拆卸商品"
    ></buying-goods-edit>
    <goods-unpack-record
      :commodityList="recCommodity"
      :params="{
        commodityCode:recCommodity[0].commodityCode,
        businessCode:data.disassemblyOrderCode
      }"
      :visible.sync="showRec"
      v-if="showRec"
    />
  </div>
</template>
<script>
import commodityPicking from '@/components/formComponents/commodity-picking';
import FullscreenElement from '@/components/fullscreen-element';
import machineSn from '@/components/formComponents/machine-sn';
export default {
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
      showRec: false,
      recCommodity: [],
      dialogVisible: false,
      showInFullscreen: false
    };
  },
  methods: {
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    //点击机器号和SN码
    getTableVisible(row) {
      this.showRec = true;
      row = JSON.parse(JSON.stringify(row));
      row.expanded = false;
      this.recCommodity = [row];
    },
    fullscreen() {
      this.showInFullscreen = true;
    }
  },
  components: {
    commodityPicking,
    machineSn,
    FullscreenElement
  }
};
</script>
<style scoped>
</style>
