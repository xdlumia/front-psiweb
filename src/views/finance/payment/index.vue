/*
 * @Author: 赵伦
 * @Date: 2019-10-25 13:37:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-05 18:22:05
 * @Description: 付款单
*/
<template>
  <div class="buying-requisition-page wfull hfull">
    <tableView
      :filterOptions="filterOptions"
      :params="Object.assign(defaultParams,params)"
      :selection="true"
      api="seePsiFinanceService.paybillList"
      busType="50"
      exportApi="seePsiFinanceService.paybillExport"
      ref="tableView"
      title="付款单"
      v-loading="loading"
    >
      <template slot="top-filter">
        <bill-account-selector
          @change="reload"
          v-model="defaultParams.companySettlementId"
        />
      </template>
      <template slot="button">
        <!-- 15.勾选付款单后，展示批量付款申请。新建、已驳回状态可点击批量提交付款申请。如勾选中包含了其他状态，则只提交新建、已驳回的即可。批量付款申请，不需弹出付款申请确认。 -->
        <el-button
          @click="multiPay"
          size="mini"
          title="新建、已驳回的付款单可批量申请"
          type="primary"
        >批量付款申请</el-button>
      </template>
      <template slot-scope="{column,row,value,prop}">
        <span v-if="prop=='billCode'">
          <el-link
            :underline="false"
            @click="showDetail=true,currentCode=value"
            class="f12"
            type="primary"
          >{{value}}</el-link>
        </span>
        <span v-else-if="['feeDetailCode','feeTypeCode'].includes(prop)">
          <span>{{value|dictionary('ZD_DY_LX')}}</span>
        </span>
        <!-- 0: '未逾期',
        1: '已逾期'-->
        <span v-else-if="prop=='overState'">
          <span>{{overText[value||0]}}</span>
        </span>
        <span v-else-if="prop=='payEndDate'">
          <span>{{value}}</span>
        </span>
        <span v-else-if="prop=='settleStatus'">
          <span>{{settleText[value]}}</span>
        </span>
        <span v-else-if="prop=='busCode'">
          <!-- 关联单据编号 -->
          <el-link
            :type="hasBusPage(row)?'primary':'info'"
            :underline="false"
            @click="openBusPage(row)"
            class="f12"
          >{{value}}</el-link>
        </span>
        <span v-else>{{value}}</span>
      </template>
    </tableView>
    <Detail
      :code="currentCode"
      :visible.sync="showDetail"
      @reload="reload"
      v-if="showDetail"
    />
    <Apply
      :visible.sync="showApply"
      @reload="reload"
      v-if="showApply"
    />
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
import Apply from './apply';
import BusMixin from './busMixin';
/**
 * 采购-请购单
 */
export default {
  components: {
    Detail,
    Apply
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
      default: () => ({})
    }
  },
  data() {
    return {
      status: [],
      loading: false,
      showApply: false,
      showDetail: false,
      currentCode: '',
      defaultParams: {
        page: 1,
        limit: 15,
        billType: 1
      },
      // prettier-ignore
      filterOptions: [
        { label: '付款单编号', prop: 'billCode', default: true },
        { label: '关联单据编号', prop: 'busCode', default: true },
        {          label: '账单状态', prop: 'settleStatus', default: true, type: 'select', options: [
            { label: '全部', value: '', },
            { label: '未结清', value: '0', },
            { label: '部分结清', value: '1', },
            { label: '已结清', value: '2', },
            { label: '已关闭', value: '3', },
          ]        },
        {          label: '逾期状态', prop: 'overSate', default: true, type: 'select', options: [
            { label: '全部', value: '', },
            { label: '未逾期', value: 0 },
            { label: '已逾期', value: 1 },
          ]        },
        { label: '对方名称', prop: 'accountName', default: true },
        { label: '费用类型', prop: 'feeTypeCode', default: true, type: 'select', options: [] },
        { label: '费用明细', prop: 'feeDetailCode', default: true, type: 'select', options: [] },
        { label: '预付/收金额', prop: 'PredictAmount', type: 'numberRange', default: true },
        { label: '应付/收金额', prop: 'Amount', type: 'numberRange', default: true },
        { label: '实收/付金额', prop: 'FactAmount', type: 'numberRange', default: true },
        { label: '应收/付日期', prop: 'PayEndDate', type: 'dateRange', int: true, default: true },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept' },
        { label: '生成时间', prop: 'CreateTime', type: 'dateRange' },
        { label: '创建人', prop: 'creator', type: 'employee' },
      ],
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
  mounted() {
    this.params.billType = 1;
    this.getFeeDetailCodeList();
  },
  methods: {
    // 是否即将逾期
    isNearOver(date) {
      return +new Date(date) - 7 * 24 * 60 * 60 * 1000 <= +new Date();
    },
    // prettier-ignore
    async getFeeDetailCodeList() {
      let dicList = JSON.parse(JSON.stringify(this.dictionaryOptions('ZD_DY_LX')))
      if (!dicList.length) {
        let { data } = await this.$api.seeDictionaryService.getDicCommonValueList('ZD_DY_LX');
        dicList = data;
      }
      let parent = [{ label: '全部', value: '', }];
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
      }, {});
      let children = [{ label: '全部', value: '', }];
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
      this.filterOptions.filter(item => item.prop == 'feeTypeCode')[0].options = parent;
      this.filterOptions.filter(item => item.prop == 'feeDetailCode')[0].options = children;
    },
    reload() {
      this.$refs.tableView.reload();
    },
    async multiPay() {
      let multi = this.$refs.tableView.selectionRow.filter(item =>
        [-1, 3].includes(item.state)
      );
      if (multi.length) {
        await this.$confirm(`是否批量提交付款申请？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning',
          center: true
        });
        this.loading = true;
        try {
          await this.$api.seePsiFinanceService.paybillBatchPaymentApply({
            apprpvalNode: null,
            ids: multi.map(item => item.id),
            processType: 'psi_payment'
          });
          this.reload();
        } catch (error) {
          console.error(error);
        }
        this.loading = false;
      } else {
        this.$message({
          message: '只有新建、已驳回的付款单可批量申请',
          type: 'warning',
          showClose: true
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.buying-requisition-page {
}
</style>
