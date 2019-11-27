/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-27 18:51:34
 * @Description: 客户详情
*/
<template>
  <div>
    <side-detail
      destroy-on-close
      :title="`客户详情:${rowData.code}`"
      :visible.sync="showPop"
      width="920px"
      :status="status"
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
            v-if="currStatusType[detail.state || 0].includes(item.label)"
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
        <keep-alive>
          <components
            class="d-auto-y"
            style="height:calc(100vh - 200px)"
            :is="activeName"
            :code="code"
            :params="{relationCode:code}"
            :rowData="rowData"
            :button="false"
          ></components>
        </keep-alive>
      </el-form>
    </side-detail>
    <!-- 客户编辑 -->
    <clientAdd
      @reload="$parent.$refs.table.reload(1)"
      :visible.sync="editVisible"
      :code="rowData.code"
      type="edit"
      :rowData="rowData"
    />
    <!-- 新建报价单 -->
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
import quoteAdd from '../quote/add' //新建报价单
import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
    basicInfo,
    clientData,
    clientAdd,
    quoteAdd
  },
  props: ['visible', 'rowData', 'code'],
  data() {
    return {
      loading: false,
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '停用', type: 'primary', authCode: '' },
        { label: '启用', type: 'primary', authCode: '' },
        { label: '编辑', type: '', authCode: '' },
        { label: '新建报价单', type: 'primary', authCode: '' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      // currStatus: this.detail.state,
      currStatusType: {
        0: ['停用', '编辑', '新建报价单'], // 启用中
        1: ['启用', '编辑', '新建报价单'], // 已停用
      },
      // tab操作栏
      tabs: {
        basicInfo: '详情',
        clientData: '客户数据',
        salesQuote: '报价单',
        salesOutLibrary: '销售出库单',
        salesOutLibrary: '销售合同',
        storageSales: '销售单',
        orderDirect: '直发单',
        salesReturn: '销售退货单',
        salesExchange: '销售换货单',
        storageDeliver: '发货单',
        financePayable: '应付账单',
        salesExchange2: '销售记录',
      },
      // tabs 默认显示项
      activeName: 'basicInfo',

      // form表单 详情里可以不注入数据
      form: {},
      editVisible: false,
      addQuotoVisible: false,
    }
  },
  computed: {
    showPop: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', false)
      }
    }
  },
  mounted() {

  },
  watch: {
    visible(val) {
      if (val) {

      }
    }
  },
  methods: {
    buttonsClick(label) {
      // handleConfirm里的按钮操作是需要二次确认的
      let handleConfirm = ['停用', '启用', '删除']
      if (handleConfirm.includes(label)) {
        // api对象
        let apiObj = {
          '停用': 'customcolumnInfo',
          '启用': 'customcolumnInfo',
          '删除': 'customcolumnInfo',
        }
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
              this.showPop = false
              this.$emit('reload')
            });
        });
      }
      // 如果是 编辑/生成销售出库单/生成请购单 等操作返回方法在首页index里操作
      else if (label == '编辑' || label == '新建报价单') {
        if (label == '编辑') {
          this.editVisible = true
          return
        }
        if (label == '新建报价单') {
          this.addQuotoVisible = true
          return
        }
      }
    },
  },
  watch: {
    visible(val) { }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
