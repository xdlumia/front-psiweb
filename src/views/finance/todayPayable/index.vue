/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-10 17:39:07
 * @Description: 今日应付账单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <tableView
      :api="pageConfig.api.list"
      :busType="pageConfig.busType"
      :exportApi="pageConfig.api.export"
      :exportButton="authorityButtons.includes(pageConfig.func.export)"
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      :selectable="selectable"
      :selection="true"
      :title="pageConfig.title"
      @selection-change="handleSelectionChange"
      ref="tableView"
      v-loading="loading"
    >
      <template slot="top-filter">
        <bill-account-selector @change="reload" v-model="defaultParams.companySettlementId" />
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='billCode'">
          <el-link :underline="false" @click="showDetail=true,currentCode=value" class="f12" type="primary">{{value}}</el-link>
        </span>
        <span v-else-if="['feeDetailCode','feeTypeCode'].includes(prop)">
          <span>{{value|dictionary('ZD_DY_LX')}}</span>
        </span>
        <span v-else-if="prop=='overState'">
          <span>{{overText[value||0]}}</span>
        </span>
        <span v-else-if="prop=='settleStatus'">
          <span>{{settleText[value]}}</span>
        </span>
        <span v-else-if="prop=='busCode'">
          <!-- 关联单据编号 -->
          <el-link :type="hasBusPage(row)?'primary':'info'" :underline="false" @click="openBusPage(row)" class="f12">{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </tableView>
    <Detail :code="currentCode" :pageConfig="pageConfig" :visible.sync="showDetail" @reload="reload" v-if="showDetail" />
    <component
      :code="currentBusCode"
      :is="busInfo[currentBusType].detailPage"
      :visible.sync="showBusDetail"
      @reload="reload"
      v-if="showBusDetail"
    />
  </div>
</template>
<script>
import Detail from './detail';
import BusMixin from '@/views/finance/payment/busMixin';
/**
 * 今日应付账单
 */
export default {
  components: {
    Detail
  },
  mixins: [BusMixin],
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 20, billType: 1 })
    },
    filterOptions: {
      type: Array,
      // prettier-ignore
      default: () => [
        { label: '账单编号', prop: 'billCode', default: true },
        { label: '关联单据编号', prop: 'busCode', default: true },
        { label: '账单状态', prop: 'settleStatus', default: true, type:'select', options:[
          {label:'全部',value:'',},
          {label:'未结清',value:'0',},
          {label:'部分结清',value:'1',},
          {label:'已结清',value:'2',},
          {label:'已关闭',value:'3',},
        ] },
        { label: '逾期状态', prop: 'overState', default: true, type:'select', options:[
          {label:'全部',value:'',},
          {label:'未逾期',value:0},
          {label:'已逾期',value:1},
        ] },
        { label: '对方名称', prop: 'accountName', default: true },
        { label: '费用类型', prop: 'feeTypeCode', default: true, type:'select', options:[] },
        { label: '费用明细', prop: 'feeDetailCode', default: true, type:'select', options:[] },
        { label: '预付/收金额', prop: 'PredictAmount', type: 'numberRange', default: true },
        { label: '应付/收金额', prop: 'Amount', type: 'numberRange', default: true },
        { label: '实收/付金额', prop: 'FactAmount', type: 'numberRange', default: true },
        { label: '应收/付日期', prop: 'PayEndDate', type: 'dateRange', int: true, default: true },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '生成时间', prop: 'CreateTime', type: 'dateRange' },
        { label: '创建人', prop: 'creator', type: 'employee' },
      ]
    },
    pageConfig: {
      type: Object,
      default: () => ({
        title: '今日应付账单',
        busType: '51',
        // 票据类型(1收票，0开票)
        // 账单类型（0收款 1付款）
        type: 1,
        api: {
          list: 'seePsiFinanceService.todaybillList',
          export: 'seePsiFinanceService.todaybillExport',
          detail: 'seePsiFinanceService.todaybillGetInfoByCode',
          update: 'seePsiFinanceService.paybillUpdate',
          lateFee: 'seePsiFinanceService.todaybillChargeLateFee',
          delIncoming: 'seePsiFinanceService.todaybillDelRoutedMatching',
          addIncoming: 'seePsiFinanceService.todaybillInsertRoutedMatching',
          matchIncoming: 'seePsiFinanceService.todaybillRoutedMatching'
        },
        show: [],
        func: {
          lateFee: 'psi_todayPayable_01',
          operateRec: 'psi_todayPayable_02',
          addIncoming: '',
          delIncoming: '',
          matchIncoming: '',
          export: 'psi_todayPayable_03',
          addInvoice: 'psi_todayPayable_04',
          edit: 'psi_todayPayable_05'
        }
      })
    }
  },
  mounted() {
    // prettier-ignore
    if(this.pageConfig.title=='今日应付账单'){
      let now = new Date
      this.$set(this.defaultParams,'minPayEndDate',+new Date(`${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} 00:00`))
      this.$set(this.defaultParams,'maxPayEndDate',+new Date(`${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} 23:59`))
    }
    this.getFeeDetailCodeList();
  },
  data() {
    return {
      defaultParams: { page: 1, limit: 20, billType: 1 },
      status: [],
      loading: false,
      showDetail: false,
      currentCode: '',
      multipleSelection: [],
      stateText: {
        '0': '审核中',
        '1': '待复核',
        '2': '已通过',
        '3': '已驳回',
        '4': '已完成',
        '5': '终止',
        '-1': '新建'
      },
      settleText: {
        0: '未结清',
        1: '部分结清',
        2: '已结清',
        3: '已关闭'
      },
      overText: {
        0: '未逾期',
        1: '已逾期'
      }
    };
  },
  methods: {
    // prettier-ignore
    async getFeeDetailCodeList() {
      let dicList = JSON.parse(JSON.stringify(this.dictionaryOptions('ZD_DY_LX')))
      if(!dicList.length){
        let {data} = await this.$api.seeDictionaryService.getDicCommonValueList('ZD_DY_LX');
        dicList = data;
      }
      let parent = [];
      let dicParentObj = dicList.reduce((data, item) => {
        if (!item.parentCode) {
          data[item.code] = item;
          item.children = [];
          parent.push({
            label: item.content,
            value: item.code
          });
        }
        return data;
      },{});
      let children = [];
      dicList.map(item => {
        let parent = dicParentObj[item.parentCode];
        if (item.parentCode && parent) {
          parent.children.push(item);
          children.push({
            label: `${parent.content}-${item.content}`,
            value: item.code
          });
        }
      });
      this.filterOptions.filter(item=>item.prop=='feeTypeCode')[0].options = parent;
      this.filterOptions.filter(item=>item.prop=='feeDetailCode')[0].options = children;
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('selection-change', val);
    },
    // 选中一个的时候禁用
    selectable(row, index) {
      if (this.multipleSelection.length > 0) {
        return this.multipleSelection.every(item => item.id === row.id);
      }
      return true;
    },
    reload() {
      this.$refs.tableView.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
