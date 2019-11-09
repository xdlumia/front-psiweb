<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-09 11:26:30
 * @Description: description
 -->
<template>
  <sideDetail
    :status="status"
    :visible.sync="showPop"
    @close="$emit('update:visible',false)"
    :title="'报价单编号：' + code"
    width="990px"
    v-loading="loading"
  >
    <template slot="button">
      <el-button
        v-if="!detailForm.state"
        size="mini"
        type="danger"
        @click="commonserviceproviderUpdate(rowData.id, 1)"
      >停用</el-button>
      <el-button
        v-else
        size="mini"
        type="primary"
        @click="commonserviceproviderUpdate(rowData.id, 0)"
      >启用</el-button>
      <el-button size="mini" type="primary" @click="showEdit = true">编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form disabled size="mini"></el-form>
      </el-tab-pane>
      <el-tab-pane label="应付账单">应付账单</el-tab-pane>
    </el-tabs>
    <addQuotation
      :visible.sync="showEdit"
      ref="addQuotation"
      v-if="showEdit"
      @refresh="refresh"
      :detailForm="detailForm"
    ></addQuotation>
  </sideDetail>
</template>

<script>
import addQuotation from './add-quotation'
export default {
  components: {
    addQuotation
  },
  props: {
    visible: Boolean,
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showEdit: false,
      loading: false,
      showPop: false,
      detailForm: {},
      status: [
        { label: '状态', value: this.rowData.state ? '停用' : '启用' },
        { label: '报价单创建人', value: this.rowData.creatorName },
        { label: '创建部门', value: this.rowData.deptName },
        { label: '创建时间', value: this.rowData.createTime, isTime: true },
        { label: '来源', value: this.rowData.source, dictName: 'PSI_KHGL_LY' }
      ]
    }
  },
  mounted() {
    this.checkVisible();
    this.commonserviceproviderInfoBycode()
  },
  watch: {
    visible() {
      this.checkVisible();
    }
  },
  methods: {
    refresh() {
      this.commonserviceproviderInfoBycode()
      this.$emit('refresh')
    },
    checkVisible() {
      this.showPop = this.visible;
    },
    commonserviceproviderInfoBycode() {
      this.loading = true
      this.$api.seePsiCommonService.commonserviceproviderInfoBycode(null, this.code).then(res => {
        this.detailForm = res.data || {}
        this.detailForm.serviceTypeList = res.data.serviceType.split(',')
        this.status[0].value = res.data.state ? '停用' : '启用'
      }).finally(() => {
        this.loading = false
      })
    },
    commonserviceproviderUpdate(id, state) {
      this.$confirm(`是否${!state ? '启用' : '停用'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiCommonService.commonserviceproviderUpdate({ id, state }).then(res => {
          this.commonserviceproviderInfoBycode()
          this.$emit('refresh')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
