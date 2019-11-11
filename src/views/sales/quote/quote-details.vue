/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 19:38:08
 * @Description: 报价单详情
*/
<template>
  <div>
    <side-detail
      title="报价单详情"
      :visible.sync="showPop"
      width="920px"
      :status="statusData"
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
            v-if="currStatusType[rowData.state].includes(item.label)"
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
        <keep-alive>
          <components
            class="d-auto-y"
            :code="this.code"
            :rowData="rowData"
            :button="false"
            style="height:calc(100vh - 240px)"
            :is="activeName"
          ></components>
        </keep-alive>
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
      :visible.sync="editVisible"
      :code="code"
      type="add"
      :rowData="rowData"
    />
    <!-- 生成请购单 -->
    <buyingAdd
      :visible.sync="buyingAddVisible"
      :code="code"
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
import buy from './quoteDetails/buy' //采购单
import record from '@/components/formComponents/record' //操作记录
let stateObj = {
  '-1': '新建',
  '0': '审核中',
  '1': '已通过',
  '2': '已驳回',
  '3': '完成',
  '4': '终止',
}
export default {
  components: {
    detail,
    add,
    outLibAdd,
    buyingAdd,
    buy,
    record
  },
  props: ['visible', 'rowData', 'code'],
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
      // currStatus: 1,  //this.rowData.state//当前状态
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
        buy: '请购单',
        record: '操作记录',
      },
      activeName: 'detail',
      form: {},
      //头部状态数据
      statusData: [
        { label: '状态', value: stateObj[this.rowData.state] },
        { label: '创建人', value: this.rowData.creatorName, },
        { label: '创建部门', value: this.rowData.deptName, },
        { label: '创建时间', value: this.rowData.createTime, isTime: true },
        { label: '来源', value: this.rowData.source },
      ],
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
  watch: {
    visible(val) {
      // this.statusData = []
    }
  },
  methods: {
    buttonsClick(label) {
      // handleConfirm里的按钮操作是需要二次确认的
      let handleConfirm = ['提交审核', '撤销审核', '驳回', '删除', '终止']
      if (handleConfirm.includes(label)) {
        this.$confirm(`是否${label}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          this.$api.seePumaidongService.collegeManagerDelete({ id: [123] })
            .then(res => {
              this.$emit('reload')
            });
        });
      }
      // 如果是 编辑/生成销售出库单/生成请购单 等操作返回方法在首页index里操作
      else if (label == '编辑' || label == '生成销售出库单' || label == '生成请购单') {
        if (label == '编辑') { this.editVisible = true }
        if (label == '生成销售出库单') { this.outLibAddVisible = true }
        if (label == '生成请购单') { this.buyingAddVisible = true }
        // this.$emit('buttonClick', label, this.drawerData.data)
      }
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
