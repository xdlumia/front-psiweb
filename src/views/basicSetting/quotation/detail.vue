<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2020-01-02 18:25:54
 * @Description: description
 -->
<template>
  <sideDetail
    :status="status"
    :visible.sync="showPop"
    @close="$emit('update:visible',false)"
    :title="'报价单编号：' + $options.filters.codeSlice(code)"
    width="990px"
    v-loading="loading"
  >
    <template slot="button">
      <el-button
        v-if="!detailForm.state && authorityButtons.includes('psi_pricelist_1004')"
        size="mini"
        type="danger"
        @click="commonquotationconfigUpdate(rowData.id, 1)"
      >停用</el-button>
      <el-button
        v-if="detailForm.state && authorityButtons.includes('psi_pricelist_1003')"
        size="mini"
        type="primary"
        @click="commonquotationconfigUpdate(rowData.id, 0)"
      >启用</el-button>
      <el-button
        v-if="authorityButtons.includes('psi_pricelist_1002')"
        size="mini"
        type="primary"
        @click="showEdit = true"
      >编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form disabled size="mini">
          <information :data="detailForm" :detail="true"></information>
          <configDetail ref="configDetail" :quotationId="rowData.id"></configDetail>
        </el-form>
      </el-tab-pane>
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
import information from './components/information'
import configDetail from './components/config-detail'
export default {
  components: {
    addQuotation,
    information,
    configDetail
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
  data () {
    return {
      showEdit: false,
      loading: false,
      showPop: false,
      detailForm: {},
      status: []
    }
  },
  mounted () {
    this.checkVisible();
    this.commonquotationconfigInfoBycode()
  },
  watch: {
    visible () {
      this.checkVisible();
    }
  },
  methods: {
    refresh () {
      this.commonquotationconfigInfoBycode()
      this.$emit('refresh')
    },
    checkVisible () {
      this.showPop = this.visible;
    },
    commonquotationconfigInfoBycode () {
      this.loading = true
      this.$api.seePsiCommonService.commonquotationconfigInfoBycode(null, this.code).then(res => {
        this.detailForm = res.data || {}
        this.detailForm = Object.assign(this.detailForm, { goodName: this.rowData.goodName })
        this.status = [
          { label: '状态', value: this.detailForm.state ? '已停用' : '已启用' },
          { label: '提交人', value: this.detailForm.creatorName },
          { label: '创建部门', value: this.detailForm.deptName },
          { label: '创建时间', value: this.detailForm.createTime, isTime: true }
        ]

        this.$refs.configDetail.commonquotationconfigdetailsListConfigByGoodName(res.data.id)
      }).finally(() => {
        this.loading = false
      })
    },
    commonquotationconfigUpdate (id, state) {
      this.$confirm(`是否${!state ? '启用' : '停用'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiCommonService.commonquotationconfigUpdate({ id, state }).then(res => {
          this.commonquotationconfigInfoBycode()
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
