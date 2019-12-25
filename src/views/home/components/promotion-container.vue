<template>
  <div class="promotion-container">
    <el-row :gutter="40" class="row-layout">
      <el-col class="promotion-left-col" :span="17" v-loading="loading">
        <el-tabs class="no-border-tab" v-model="currTab" @tab-click="handleClick">
          <el-tab-pane label="促销管理" name="indexQueryPromotion"></el-tab-pane>
          <el-tab-pane label="目标管理" name="indexQueryPromotionGoal"></el-tab-pane>
        </el-tabs>
        <!-- table 数据展示 -->
        <manage-table :paramsData="tableData"></manage-table>
      </el-col>
      <el-col class="promotion-right-col" :span="7">
        <!-- 销售员工利润排行 -->
        <leaderboard-box></leaderboard-box>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ManageTable from './manage-table'
import LeaderboardBox from './leaderboard-box'
import chunk from '@/utils/chunk'

export default {
  components: {
    ManageTable,
    LeaderboardBox
  },

  data () {
    return {
      currTab: '',
      tableData: [],
      loading: false
    }
  },

  created () {
    this.currTab = 'indexQueryPromotion'
  },

  watch: {
    currTab (newVal) {
      if (newVal) {
        this.loading = true
        this.$api.seePsiReportService[newVal]().then(res => {
          this.tableData = chunk(res.data, 6)[0]
        }).finally(() => { this.loading = false })
      }
    }
  },

  methods: {
    handleClick (tab) {
      this.currTab = tab.name
    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .row-layout {
  margin-left: -25px !important;
  margin-right: -25px !important;
}
.promotion-container {
  width: 100%;
  box-sizing: border-box;
  /deep/ .box {
    height: 350px;
    padding: 0 20px;
    box-sizing: border-box;
  }

  /deep/ .promotion-left-col {
    height: 100%;
    .el-tabs {
      margin: 0 20px;
    }
    // 管理表格
    .manage-table {
      padding-top: 10px;
      overflow: hidden;
      box-sizing: border-box;
      .table-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #cdcdcd;
        box-sizing: border-box;
        .item-title {
          text-align: center;
        }
      }
    }
  }

  /deep/ .promotion-right-col {
    // 排行榜
    .leaderboard-box {
      .el-tabs__header {
        margin-left: 20px;
        .el-tabs__item {
          padding: 0 12px;
        }
      }

      .leaderboard-item-panel {
        font-size: 14px;
        padding: 10px 30px 0 20px;
        box-sizing: border-box;
        overflow: hidden;
        .leaderboard-item {
          height: 40px;
          color: #333;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          &:nth-child(-n + 3) {
            .item-number {
              color: #fff;
              background: #525f6d;
            }
          }
          .item-number {
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            color: #666666d9;
            border-radius: 50%;
            background: #dcdcdce8;
          }
          .item-name {
            margin-left: 30px;
            width: 40%;
            box-sizing: border-box;
            white-space: nowrap;
          }
          .item-performance {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
