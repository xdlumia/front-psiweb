/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-20 11:36:00
 * @Description: 报价单详情
*/
<template>
  <div>
    <side-detail
      title="报价单详情"
      :visible.sync="showDetailPage"
      width="920px"
      :status="status"
      @close="close"
    >
      <div slot="button">
        <!-- 操作按钮 -->
        <span
          v-for="(item,index) of buttons"
          :key="index"
        >
          <el-button
            class="mr10"
            @click="buttonsClick(item.label)"
            v-if="currStatusType[detail.state=1 || 0].includes(item.label)"
            size="mini"
            :type="item.type"
          >{{item.label}}</el-button>
        </span>

      </div>
      <el-form
        ref="form"
        :model="form"
        size="mini"
        label-position="top"
      >
        <el-tabs
          v-model="activeName"
          type="card"
        >
          <el-tab-pane
            v-for="(val,key) of tabs"
            :key="key"
            :label="val"
            :name="key"
          >
          </el-tab-pane>
        </el-tabs>

        <components
          class="d-auto-y"
          :code="this.code"
          :rowData="rowData"
          :button="false"
          :data="detail || {}"
          :params="{quotationCode:code}"
          style="height:calc(100vh - 200px)"
          :is="activeName"
        ></components>

      </el-form>
    </side-detail>
    <!-- 报价单编辑 -->
    <add
      :visible.sync="editVisible"
      :code="code"
      type="edit"
      :rowData="rowData"
    />
    <!-- 生成销售出库单 -->
    <outLibAdd
      :visible.sync="outLibAddVisible"
      :code="rowData.quotationCode"
      type="add"
      :rowData="rowData"
    />
    <!-- 生成请购单 -->
    <buyingAdd
      :visible.sync="buyingAddVisible"
      :code="rowData.quotationCode"
      type="add"
      :rowData="rowData"
    />
  </div>
</template>
<script>
import detail from './quoteDetails/detail' //详情
import add from './add' //编辑
import outLibAdd from '../outLibrary/add' //生成出库单
import buyingAdd from '@/views/order/buying/edit' //生成请购单
// import record from '@/components/formComponents/record' //操作记录
import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
    detail,
    add,
    outLibAdd,
    buyingAdd,
    // record
  },
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: '' },
        { label: '撤销审核', type: 'danger', authCode: '' },
        { label: '审核通过', type: 'primary', authCode: '' },
        { label: '编辑', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
        { label: '驳回', authCode: '' },
        { label: '生成销售出库单', type: 'primary', authCode: '' },
        { label: '生成请购单', type: 'primary', authCode: '' },
        { label: '终止', authCode: '' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: 1,  //this.detail.state//当前状态
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除'], //新建 -1
        '0': ['撤销审核', '审核通过', '驳回'], //审核中
        '1': ['生成销售出库单', '生成请购单', '终止'],// 已通过
        '2': ['提交审核', '编辑', '删除'], //已驳回
        '3': [], //完成
        // '4': [] //终止 //没有终止
      },
      editVisible: false, //销售单编辑
      outLibAddVisible: false, //生成销售出库单
      buyingAddVisible: false, //生成请购单
      // tab操作栏
      tabs: {
        detail: '详情',
        salesOutLibrary: '销售出库单',
        orderBuying: '请购单',
        record: '操作记录',
      },
      activeName: 'detail',
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiSaleService.salesquotationGetinfoByCode({ quotationCode: this.code })
        return data;
      }
    },
    buttonsClick(label) {
      if (label == '编辑' || label == '生成销售出库单' || label == '生成请购单') {
        if (label == '编辑') { this.editVisible = true }
        else if (label == '生成销售出库单') { this.outLibAddVisible = true }
        else if (label == '生成请购单') { this.buyingAddVisible = true }
        // this.$emit('buttonClick', label, this.drawerData.data)
      } else {
        let apiObj = {
          '提交审核': {
            api: 'seePsiSaleService.salesquotationApproval',
            data: { isAgree: 1, busCode: this.detail.quotationCode },
            needNote: null
          },
          '撤销审核': {
            api: 'seePsiSaleService.salesquotationApproval',
            data: { isAgree: 0, busCode: this.detail.quotationCode },
            needNote: null
          },
          '驳回': {
            api: 'seePsiSaleService.salesquotationApproval',
            data: { busCode: this.detail.quotationCode },
            needNote: null
          },
          '删除': {
            api: 'seePsiSaleService.salesquotationLogicDelete',
            data: ({ id: this.detail.id }),
            needNote: null
          },
          '终止': {
            api: 'seePsiSaleService.salesquotationPause',
            data: { busCode: this.detail.quotationCode },
            needNote: null
          }
        }
        // 公共方法 mixin 引进来的
        this.$submission(
          apiObj[label].api,
          apiObj[label].data,
          label,
          apiObj[label].needNote)
      }
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
