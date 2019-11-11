/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 18:04:15
 * @Description: 销售换货单详情
*/
<template>
  <side-detail
    title="销售退货单"
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
        ></components>
      </keep-alive>
    </el-form>
  </side-detail>
</template>
<script>
import detail from './details/detail' //详情
export default {
  components: {
    detail,
  },
  props: ['visible', 'rowData'],
  data() {
    return {
      // 操作按钮
      buttons: [
        // label:按钮名称  type:按钮样式  authCode:权限码
        { label: '提交审核', type: 'primary', authCode: '' },
        { label: '撤销审核', type: '', authCode: '' },
        { label: '审核通过', type: 'primary', authCode: '' },
        { label: '编辑', type: 'primary', authCode: '' },
        { label: '删除', type: 'danger', authCode: '' },
        { label: '驳回', authCode: '' },
        { label: '退货扫码', type: 'primary', authCode: '' }
      ],
      /**
       * 根据当前状态判断显示哪些按钮
       */
      currStatus: 3,
      currStatusType: {
        '-1': ['提交审核', '编辑', '删除'], // 新建
        '0': ['撤销审核', '审核通过', '驳回'], // 审核中
        '1': ['退货扫码'], // 待完成
        '2': ['退货扫码'], //部分完成
        '3': [], //已完成
        '4': ['提交审核', '编辑', '删除'], //已驳回
      },
      // tab操作栏
      tabs: {
        detail: '详情',
        outLibrary: '销售出库单',
      },
      activeName: 'detail',
      form: {},
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
      let handleConfirm = ['提交审核', '撤销审核', '驳回', '删除']
      if (handleConfirm.includes(label)) {
        this.$confirm(`是否${label}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          let apiObj = {
            '提交审核': 'salesalterationsheetApproval',
            '撤销审核': 'salesalterationsheetApproval',
            '驳回': 'salesalterationsheetApproval',
            '删除': 'salesalterationsheetDelete',
          }
          this.$api.seePumaidongService.collegeManagerDelete({ id: [123] })
            .then(res => {
              this.$emit('reload')
              this.showPop = false
            });
        });
      }
      // 如果是 编辑/退货扫码
      else if (label == '编辑' || label == '退货扫码') {
        if (label == '编辑') { this.editVisible = true }
        // TODO 退货扫码 未调用真实组件
        if (label == '退货扫码') { this.editVisible = true }

      }
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
