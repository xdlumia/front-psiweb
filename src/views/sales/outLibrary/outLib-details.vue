/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 16:04:48
 * @Description: 销售出库单详情
*/
<template>
  <div>
    <div class="drawer-header">
      <!-- 操作按钮 -->
      <span
        v-for="(item,index) of buttons"
        :key="index"
      >
        <el-button
          class="mr10"
          @click="buttonsClick(item.name)"
          v-if="currStatusType[currStatus].includes(item.label)"
          size="small"
          :type="item.type"
        >{{item.label}}</el-button>
      </span>

    </div>
    <el-form
      ref="form"
      :model="form"
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
          :button="false"
          style="height:calc(100vh - 200px)"
          :is="activeName"
        ></components>
      </keep-alive>
    </el-form>
  </div>
</template>
<script>
import detail from './outLibDetails/detail' //详情
export default {
  components: {
    detail
  },
  props: ['drawerData'],
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
        { label: '生成合同', type: 'primary', authCode: '' },
        { label: '驳回', authCode: '' },
        { label: '终止', authCode: '' },
        { label: '生成退货单', type: 'primary', authCode: '' },
        { label: '生成换货单', type: 'primary', authCode: '' },
        { label: '开票申请', type: 'primary', authCode: '' },
        { label: '编辑合同', type: 'primary', authCode: '' },
        { label: '合同完善追加合同附件', type: 'primary', authCode: '' },
        { label: '审核采购时间', type: 'primary', authCode: '' },
        { label: '收回合同', type: 'primary', authCode: '' },
        { label: '追加合同附件', type: 'primary', authCode: '' },
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       * 1:新建 2:审核中 3:请购处理 4:合同收回 5:已通过 6:已完成 7:已驳回 8:已终止
       */
      currStatus: 1,
      currStatusType: {
        1: ['提交审核', '编辑', '删除', '生成合同'], // 新建
        2: ['撤销审核', '审核通过', '驳回', '合同完善追加合同附件'], //审核中
        3: ['审核采购时间', '追加合同附件'], //请购处理
        4: ['收回合同', '追加合同附件'], //合同收回
        5: ['终止', '生成退货单', '追加合同附件'], //已通过
        6: ['生成退货单', '生成换货单', '开票申请', '追加合同附件'], //已完成
        7: ['提交审核', '编辑', '删除', '编辑合同'], //已驳回
        8: ['生成退货单'] //已终止
      },
      // tabs 组件名称对应的label名称
      tabs: {
        detail: '详情',
        salesQuote: '报价单',
        contract: '合同',
        salesReturn: '销售退货单',
        salesExchange: '销售换货单',
        contract4: '应收账单',
        contract5: '发票记录',
        salesApportion: '费用分摊单'
      },

      // tabs当前选中
      activeName: 'detail',
      form: {},
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
        this.$emit('buttonClick', name, this.drawerData.data)
      }
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
