<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-04 16:35:23
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
        @click="commonpromotionUpdate(rowData.id, 1)"
      >停用</el-button>
      <el-button v-else size="mini" type="primary" @click="commonpromotionUpdate(rowData.id, 0)">启用</el-button>
      <el-button size="mini" type="primary" @click="showEdit = true">编辑</el-button>
    </template>
    <el-tabs class="wfull hfull tabs-view">
      <el-tab-pane label="详情">
        <el-form disabled size="mini">
          <!-- 基本信息 -->
          <information :data="detailForm"></information>
          <!-- 商品信息 -->
          <goods-info ref="goodsInfo" :data="detailForm" :detail="true" />
          <!-- 人员信息 -->
          <users-info ref="usersInfo" :data="detailForm" :detail="true" />
          <!-- 备注信息 -->
          <extras-info :data="detailForm" />
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="报价单">报价单</el-tab-pane>
      <el-tab-pane label="销售出库单">销售出库单</el-tab-pane>
      <el-tab-pane label="销售合同">销售合同</el-tab-pane>-->
    </el-tabs>
    <addPromotion
      :visible.sync="showEdit"
      ref="addPromotion"
      v-if="showEdit"
      @refresh="refresh"
      :detailForm="detailForm"
    ></addPromotion>
  </sideDetail>
</template>

<script>
import information from './components/information'
import goodsInfo from './components/goods-info'
import usersInfo from './components/users-info'
import addPromotion from './add-promotion'
export default {
  components: {
    information,
    goodsInfo,
    usersInfo,
    addPromotion
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
      status: [],
      stateText: {
        0: '已启用',
        1: '已停用',
        2: '已过期'
      }
    }
  },
  mounted () {
    this.checkVisible();
    this.commonpromotionInfoBycode()
  },
  watch: {
    visible () {
      this.checkVisible();
    }
  },
  methods: {
    refresh () {
      this.commonpromotionInfoBycode()
      this.$emit('refresh')
    },
    checkVisible () {
      this.showPop = this.visible;
    },
    commonpromotionInfoBycode () {
      this.loading = true
      this.$api.seePsiCommonService.commonpromotionInfoBycode(null, this.code).then(res => {
        this.detailForm = res.data
        this.detailForm.datetimerange = [res.data.begTime, res.data.endTime]
        this.status = [
          { label: '促销名称', value: this.detailForm.promotionName },
          { label: '状态', value: this.stateText[this.detailForm.state] },
          { label: '创建人', value: this.detailForm.creatorName },
          { label: '部门', value: this.detailForm.deptName },
          { label: '创建时间', value: this.detailForm.createTime, isTime: true }
        ]
        this.$refs.goodsInfo.commonpromotioncommoditydetailsList(this.rowData.id)
        this.$refs.usersInfo.commonpromotionpersonnelList(this.rowData.id)
      }).finally(() => {
        this.loading = false
      })
    },
    commonpromotionUpdate (id, state) {
      this.$confirm(`是否${!state ? '启用' : '停用'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seePsiCommonService.commonpromotionUpdate({ id, state }).then(res => {
          this.commonpromotionInfoBycode()
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
