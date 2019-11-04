/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 11:19:48
 * @Description: 付款单详情
*/
<template>
  <div>
    <side-detail
      title="付款单详情"
      :visible.sync="showPop"
      width="920px"
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
            v-if="currStatusType[currStatus].includes(item.label)"
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
            style="height:calc(100vh - 200px)"
            :is="activeName"
            :button="false"
          ></components>
        </keep-alive>
      </el-form>
    </side-detail>
    <!-- 客户编辑 -->
    <add
      :visible.sync="editVisible"
      type="edit"
      :rowData="rowData"
    />
  </div>
</template>
<script>

import detail from './details/detail' //详情
import add from './add' //详情

export default {
  components: {
    detail,
    add
  },
  props: ['visible', 'rowData'],
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '付款申请', type: 'primary', authCode: '' },
        { label: '通过', type: 'primary', authCode: '' },
        { label: '驳回', type: '', authCode: '' },
        { label: '复核通过', type: '', authCode: '' },
        { label: '付款', type: '', authCode: '' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      currStatus: 1,
      currStatusType: {
        1: ['付款申请'], // 新建
        2: ['通过', '驳回'] // 审核中
      },
      // tab操作栏
      tabs: {
        detail: '详情',
        salesQuote: '采购单',
        salesExchange: '销售换货单',
        financeFee: '费用单',
        salesReturn: '销售退货单',
        salesReturn1: '采购入库单'
      },
      activeName: 'detail',
      form: {},
      editVisible: false,
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
      else if (label == '付款申请' || label == '付款' || label == '生成请购单') {
        if (label == '付款申请') {
          this.editVisible = true
          return
        }
        if (label == '付款') {
          this.editVisible = true
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
