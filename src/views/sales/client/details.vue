/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-16 09:25:27
 * @Description: 客户详情
*/
<template>
  <div>
    <side-detail
      destroy-on-close
      :title="`客户详情:${codeSlice(code)}`"
      :visible.sync="showDetailPage"
      @close="close"
      width="920px"
      :status="statusArr"
      v-loading="loading"
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
            v-if="currStatusType[detail.state || 0].includes(item.label) && authorityButtons.includes(item.authCode)"
            size="mini"
            :type="item.type"
          >{{item.label}}</el-button>
        </span>

      </div>
      <el-form
        v-loading="loading"
        ref="form"
        :model="form"
        size="mini"
        label-position="top"
      >
        <el-tabs v-model="activeName">
          <el-tab-pane
            v-for="(val,key) of tabs"
            :key="key"
            :label="val"
            :name="key"
          >
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <components
            class="d-auto-y"
            style="height:calc(100vh - 170px) !important"
            :is="activeName"
            :code="code"
            :data="detail || {}"
            :title="activeName=='financeBilling'?'发票记录':''"
            :params="activeName=='financeBilling'?{purchaseId:detail.id}:{clientId:detail.id}"
            :rowData="rowData"
            :button="false"
          ></components>
        </keep-alive>
      </el-form>
    </side-detail>
    <!-- 客户编辑 -->
    <clientAdd
      @reload="setEdit(),$reload()"
      :visible.sync="editVisible"
      :code="rowData.code"
      type="edit"
      :rowData="rowData"
    />
    <!-- 新增报价单 -->
    <quoteAdd
      :visible.sync="addQuotoVisible"
      type="add"
      :rowData="rowData"
    />
  </div>
</template>
<script>

import basicInfo from './details/basic-info' //详情
import clientData from './details/client-data' //详情
import clientAdd from './add' //详情
import quoteAdd from '../quote/add' //新增报价单
import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
    basicInfo,
    clientData,
    clientAdd,
    quoteAdd
  },
  data() {
    return {
      loading: false,
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '停用', type: 'primary', authCode: 'psi_sales_client_04' },
        { label: '启用', type: 'primary', authCode: 'psi_sales_client_05' },
        { label: '编辑', type: 'primary', authCode: 'psi_sales_client_06' },
        { label: '新增报价单', type: 'primary', authCode: 'psi_sales_client_07' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: this.detail.state,
      currStatusType: {
        0: ['停用', '编辑', '新增报价单'], // 启用中
        1: ['启用', '编辑', '新增报价单'], // 已停用
      },
      // tab操作栏
      tabs: {
        basicInfo: '详情',
        clientData: '客户数据',
        salesQuote: '报价单',
        salesOutLibrary: '销售出库单',
        contractSale: '销售合同',
        storageSales: '销售单',
        orderDirect: '直发单',
        salesReturn: '销售退货单',
        salesExchange: '销售换货单',
        storageDeliver: '发货单',
        financePayable: '应付账单',
        financeReceivable: '应收账单',
        financeBilling: '发票记录',
      },
      // tabs 默认显示项
      activeName: 'basicInfo',

      // form表单 详情里可以不注入数据
      form: {},
      editVisible: false,
      addQuotoVisible: false,
      stateText: {
        '0': '启用中',
        '1': '停用中',
      },
    }
  },
  computed: {
    statusArr() {
      if (!this.getDetail) return [];
      else {
        return [
          { label: '状态', value: this.stateText[this.detail.state] },
          { label: '单据创建人', value: this.detail.creatorName },
          { label: '创建部门', value: this.detail.deptName },
          { label: '创建时间', value: this.detail.createTime, isTime: true },
          { label: '来源', value: this.detail.source, dictName: 'PSI_KHGL_LY' }
        ];
      }
    }
  },
  mounted() {
  },
  watch: {

  },
  methods: {
    // 获取详情信息
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiCommonService.commonclientinfoInfoBycode(null, this.code)
        return data;
      }
    },
    buttonsClick(label) {
      // handleConfirm里的按钮操作是需要二次确认的
      let handleConfirm = ['停用', '启用', '删除']
      if (handleConfirm.includes(label)) {
        // // api对象
        // let apiObj = {
        //   '停用': 'customcolumnInfo',
        //   '启用': 'customcolumnInfo',
        //   '删除': 'customcolumnInfo',
        // }
        this.$confirm(`是否${label}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          let params = {
            id: this.rowData.id,
            state: label == '启用' ? 0 : 1
          }
          // 通过lable 查找接口方法
          this.$api.seePsiCommonService.commonclientinfoUpdate(params)
            .then(res => {
              this.$emit('reload')
              this.$reload()
              this.setEdit()
            });
        });
      }

      else if (label == '编辑' || label == '新增报价单') {
        if (label == '编辑') {
          this.editVisible = true
          return
        }
        if (label == '新增报价单') {
          this.addQuotoVisible = true
          return
        }
      }
    },
  },

  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
