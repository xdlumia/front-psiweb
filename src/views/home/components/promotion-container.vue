<template>
  <div class="promotion-container">
    <el-row :gutter="40" class="row-layout">
      <el-col class="promotion-left-col" :span="17">
        <el-tabs class="no-border-tab" v-model="currTab" @tab-click="handleClick">
          <el-tab-pane label="促销管理" name="promotion"></el-tab-pane>
          <el-tab-pane label="目标管理" name="aims"></el-tab-pane>
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

export default {
  components: {
    ManageTable,
    LeaderboardBox
  },

  data() {
    return {
      currTab: '',
      tableData: [],
      res: {
        promotion: [
          {
            id: 1,
            title: '国庆促销',
            total: 100,
            nums: 20,
            percent: 20
          },
          {
            id: 2,
            title: '国庆促销',
            total: 120,
            nums: 20,
            percent: 20
          },
          {
            id: 3,
            title: '国庆促销',
            total: 80,
            nums: 20,
            percent: 20
          },
          {
            id: 4,
            title: '国庆促销',
            total: 90,
            nums: 20,
            percent: 20
          },
          {
            id: 5,
            title: '国庆促销',
            total: 100,
            nums: 10,
            percent: 20
          },
          {
            id: 6,
            title: '国庆促销',
            total: 100,
            nums: 4,
            percent: 20
          }
        ],
        aims: []
      }
    }
  },

  created() {
    this.currTab = 'promotion'
  },

  watch: {
    'currTab': function(newVal) {
      this.getManageTableData(newVal)
    }
  },

  methods: {
    handleClick(tab) {
      this.currTab = tab.name
    },

    getManageTableData(val) {
      this.tableData = this.res[val]
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
  // tab
  /deep/ .no-border-tab {
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__nav-wrap::after {
      height: 0;
      background: none;
    }
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
        .el-tabs__active-bar {
          display: none;
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
