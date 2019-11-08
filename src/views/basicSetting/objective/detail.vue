<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-08 15:26:54
 * @Description: 促销详情
 -->
<template>
  <sideDetail
    :status="status"
    :visible.sync="showPop"
    @close="$emit('update:visible',false)"
    :title="'促销编号：' + code"
    width="990px"
    v-loading="loading"
  >
    <template slot="button">
      <el-button
        v-if="!detailForm.state"
        size="mini"
        type="danger"
        @click="commonpromotiongoalUpdate(rowData.id, 1)"
      >停用</el-button>
      <el-button
        v-else
        size="mini"
        type="primary"
        @click="commonpromotiongoalUpdate(rowData.id, 0)"
      >启用</el-button>
      <el-button size="mini" type="primary" @click="showEdit = true">编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form disabled size="mini">
          <!-- 基本信息 -->
          <information :data="detailForm"></information>
          <!-- 人员信息 -->
          <users-info ref="usersInfo" :data="detailForm" :detail="true" />
          <!-- 备注信息 -->
          <extras-info :data="detailForm" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="报价单">报价单</el-tab-pane>
      <el-tab-pane label="销售出库单">销售出库单</el-tab-pane>
      <el-tab-pane label="销售合同">销售合同</el-tab-pane>
    </el-tabs>
    <addObjective
      :visible.sync="showEdit"
      ref="addObjective"
      v-if="showEdit"
      @refresh="refresh"
      :detailForm="detailForm"
    ></addObjective>
  </sideDetail>
</template>

<script>
import information from './components/information'
import usersInfo from './components/users-info'
import addObjective from './add-objective'
export default {
  components: {
    information,
    usersInfo,
    addObjective
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
      status: [
        { label: '促销名称', value: this.rowData.promotionName },
        { label: '状态', value: this.rowData.state ? '停用' : '启用' },
        { label: '创建人', value: this.rowData.creatorName },
        { label: '部门', value: this.rowData.deptName },
        { label: '创建时间', value: this.rowData.createTime, isTime: true }
      ]
    }
  },
  mounted () {
    this.checkVisible();
    this.commonpromotiongoalInfoBycode()
  },
  watch: {
    visible () {
      this.checkVisible();
    }
  },
  methods: {
    refresh () {
      this.commonpromotiongoalInfoBycode()
      this.$refs.usersInfo.commonpromotiongoalpersonnelList(this.rowData.id)
      this.$emit('refresh')
    },
    checkVisible () {
      this.showPop = this.visible;
    },
    commonpromotiongoalInfoBycode () {
      this.loading = true
      this.$api.seePsiCommonService.commonpromotiongoalInfoBycode(null, this.code).then(res => {
        this.detailForm = res.data || {}
        this.detailForm.datetimerange = [res.data.begTime, res.data.endTime]
        this.status[0].value = res.data.promotionName
      }).finally(() => {
        this.loading = false
      })
    },
    commonpromotiongoalUpdate (id, state) {
      this.$confirm(`是否${!state ? '启用' : '停用'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiCommonService.commonpromotiongoalUpdate({ id, state }).then(res => {
          this.commonpromotiongoalInfoBycode()
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
