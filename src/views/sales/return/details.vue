/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 11:50:46
 * @Description: 销售出库单详情
*/
<template>
  <side-detail
    title="销售退货单"
    :visible.sync="showPop"
    width="920px"
  >
    <div class="drawer-header">
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
          v-for="(item,index) of tabs"
          :key="index"
          :label="item.label"
          :name="item.comp"
        >
          <components
            ref="detail"
            :code="code"
            :rowData="rowData"
            class="d-auto-y"
            :params="item.params"
            :button="false"
            style="height:calc(100vh - 200px)"
            :is="activeName"
          />
        </el-tab-pane>
      </el-tabs>

    </el-form>
  </side-detail>
</template>
<script>
import detail from './details/detail' //详情
export default {
  components: {
    detail,
  },
  props: ['visible', 'code', 'rowData'],
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
        1: ['提交审核', '编辑', '删除'], // 新建
        2: ['撤销审核', '审核通过', '驳回'], // 审核中
        3: ['退货扫码'], // 待退货
        4: ['退货扫码'], //部分退货
        5: [], //已退货
        6: ['提交审核', '编辑', '删除'], //已驳回
      },
      // tabs 切换操作栏
      tabs: [
        { label: '详情', comp: 'detail' },
        { label: '销售出库单', comp: 'salesOutLibrary', params: { shipmentCode: this.rowData.shipmentCode } },
      ],
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
        this.$emit('buttonClick', label, this.drawerData.data)
      }
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
