<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2020-01-02 18:25:01
 * @Description: description
 -->
<template>
  <sideDetail
    :status="status"
    :visible.sync="showDetailPage"
    @close="$emit('update:visible',false)"
    :title="'服务商编号：' + $options.filters.codeSlice(code)"
    width="990px"
    v-loading="loading"
  >
    <template slot="button">
      <el-button
        v-if="!detailForm.state && authorityButtons.includes('psi_serviceprovider_1004')"
        size="mini"
        type="danger"
        @click="commonserviceproviderUpdate(rowData.id, 1)"
      >停用</el-button>
      <el-button
        v-if="detailForm.state && authorityButtons.includes('psi_serviceprovider_1003')"
        size="mini"
        type="primary"
        @click="commonserviceproviderUpdate(rowData.id, 0)"
      >启用</el-button>
      <el-button
        v-if="authorityButtons.includes('psi_serviceprovider_1002')"
        size="mini"
        type="primary"
        @click="showEdit = true"
      >编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view" v-model="activeTab">
      <el-tab-pane label="详情" name="detail">
        <el-form disabled size="mini">
          <form-card title="往来账款">
            <el-row>
              <el-col :span="8">
                <span class="b mr10">应付欠款</span>
                <span>{{totalAmount.totalArrearsAmount}}元</span>
              </el-col>
              <el-col :span="8">
                <span class="b mr10">预付款</span>
                <span>{{totalAmount.totalPredictAmount}}元</span>
              </el-col>
            </el-row>
          </form-card>
          <!-- 基本信息 -->
          <information disabled :data="detailForm"></information>
          <!-- 发票信息 -->
          <invoice-info disabled :data="detailForm" />
          <!-- 备注信息 -->
          <extras-info disabled :data="detailForm" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="应付账单" name="payable">
        <FullscreenWrap v-if="showDetailPage&&!loading&&activeTab=='payable'">
          <FinancePayable
            :button="false"
            :params="{page:1,limit:15,clientId:detailForm.id,clientType:2,relationCode:code}"
          />
        </FullscreenWrap>
      </el-tab-pane>
    </el-tabs>
    <addFacilitator
      :visible.sync="showEdit"
      ref="addFacilitator"
      v-if="showEdit"
      @refresh="refresh"
      :detailForm="detailForm"
    ></addFacilitator>
  </sideDetail>
</template>

<script>
import information from './information'
import addFacilitator from './add-facilitator'
export default {
  components: {
    information,
    addFacilitator
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
      activeTab: 'detail',
      showEdit: false,
      loading: false,
      showDetailPage: false,
      detailForm: {},
      totalAmount: {},
      status: []
    }
  },
  mounted () {
    this.checkVisible();
    this.commonserviceproviderInfoBycode()
  },
  watch: {
    visible () {
      this.checkVisible();
    }
  },
  methods: {
    refresh () {
      this.commonserviceproviderInfoBycode()
      this.$emit('refresh')
    },
    checkVisible () {
      this.showDetailPage = this.visible;
    },
    commonserviceproviderInfoBycode () {
      this.loading = true
      this.$api.seePsiCommonService.commonserviceproviderInfoBycode(null, this.code).then(res => {
        this.detailForm = res.data || {}
        this.detailForm.serviceTypeList = res.data.serviceType.split(',')
        this.status = [
          { label: '状态', value: this.detailForm.state ? '已停用' : '已启用' },
          { label: '服务商创建人', value: this.detailForm.creatorName },
          { label: '创建部门', value: this.detailForm.deptName },
          { label: '创建时间', value: this.detailForm.createTime, isTime: true },
          { label: '来源', value: this.detailForm.source, dictName: 'PSI_KHGL_LY' }
        ]

        this.fbillGetClientFbillStatistics()
      }).finally(() => {
        this.loading = false
      })
    },
    fbillGetClientFbillStatistics () {
      this.$api.seePsiFinanceService.fbillGetClientFbillStatistics({
        clientType: 2,
        clientId: this.detailForm.id,
        billType: 1
      }).then(res => {
        console.log(res.data)
        this.totalAmount = res.data
      })
    },
    commonserviceproviderUpdate (id, state) {
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
