<!--私有组件：
/**
* 辅助管理-公共设置-私有组件：充值记录
* @/components/asistant/common 组件存放位置
* @author web-徐贺
* @date 2019 9 11
**/
-->
<template>
  <div v-loading="loading" class=" main-content">
    <el-form ref="queryForm" :model="queryForm" size="small" inline>
        <el-form-item label="客户:" prop="biddingTitle" class="mb0">
          <el-input v-model="queryForm.biddingTitle" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="creatorName" class="mb0">
          <el-input v-model="queryForm.creatorName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="订单编号:" prop="creatorName" class="mb0">
          <el-input v-model="queryForm.creatorName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="开通套餐:" prop="state" class="mb0">
          <el-select v-model="queryForm.state" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="" :value="key" :label="val" v-for="(val,key) of biddingState" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="small" type="primary" @click="$refs.table.reload(1)" icon="el-icon-search">查询</el-button>
        <el-button size="small" @click="$refs.queryForm.resetFields(),$refs.table.reload(1)">重置</el-button>
      </el-form>
<!-- 表格数据 -->
      <d-table api="seePumaidongService.rechargerecordList" :params="queryForm" ref="table" class="mt10" style="height:calc(100% - 80px)">
          <el-table-column prop="biddingTitle" align="center" label="订单编号" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="state" align="center" label="提交时间" min-width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm')}}
            </template>
          </el-table-column>
          <el-table-column prop="biddingTitle" align="center" label="操作账号" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cityName" align="center" label="支付金额"></el-table-column>
          <el-table-column prop="creatorName" align="center" label="支付方式" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" min-width="140" label="流水号">
            <template slot-scope="scope">
              {{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm')}}
            </template>
          </el-table-column>
          <el-table-column prop="creatorName" align="center" label="费用类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creatorName" align="center" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creatorName" align="center" label="退款人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creatorName" align="center" label="退款时间" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" label="操作" width="100">
            <template slot-scope="scope">
              <el-button v-if="authorityButtons.includes('pmdwebset_bidding_1002')" size="mini" type="primary" plain @click="updateBidding('edit',scope.row)">退款</el-button>
            </template>
          </el-table-column>
        </d-table>

  </div>
</template>
<script>

export default {
  components: {
  },
  props: [],
  data () {
    return {
      loading: false,
      queryForm: {
        operationAccount: '', // 账号
        orderNumber: '' // 订单编号
      }
    }
  },
  created () {
  },
  computed: {
  },
  methods: {

  }
}
</script>
<style scoped style="scss">
</style>
