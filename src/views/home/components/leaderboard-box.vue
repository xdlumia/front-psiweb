<!--
 * @Author: xiaomin
 * @Date: 2019-11-15 15:32:30
 * @LastEditTime: 2019-11-15 17:58:15
 -->
<template>
  <div class="leaderboard-box">
    <h3 class="b h40 lh40" style="text-indent:20px;margin-bottom: -1px">销售员工利润排行</h3>
    <div class="box leaderboard-content ba">
      <el-tabs class="no-border-tab" v-model="currTab" @tab-click="handleClick">
        <el-tab-pane label="昨日" name="yesterday"></el-tab-pane>
        <el-tab-pane label="上周" name="fontWeek"></el-tab-pane>
        <el-tab-pane label="上月" name="frontMointh"></el-tab-pane>
        <el-tab-pane label="上季度" name="frontQuarter"></el-tab-pane>
        <el-tab-pane label="去年" name="frontYear"></el-tab-pane>
      </el-tabs>
      <div class="leaderboard-item-panel">
        <div class="leaderboard-item" v-for="(item, index) in rankData" :key="index">
          <span class="item-number" v-text="item.rank"></span>
          <span class="item-name" v-text="item.name"></span>
          <span class="item-performance" v-text="item.performance"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currTab: '',
      rankData: [],
      testData: [
        {
          rank: 1,
          name: '小丽',
          performance: 12345
        },
        {
          rank: 2,
          name: '李强',
          performance: 890987
        },
        {
          rank: 3,
          name: '张三',
          performance: 999345
        },
        {
          rank: 4,
          name: '王麻子',
          performance: 23
        },
        {
          rank: 6,
          name: 'candy',
          performance: 1111
        },
        {
          rank: 7,
          name: '阿吉斯坦',
          performance: 3333
        },
        {
          rank: 8,
          name: '啦啦啦',
          performance: 3333
        }
      ]
    }
  },

  watch: {
    'currTab': function(newVal) {
      this.getRankList(newVal)
    }
  },

  created() {
    this.currTab = 'yesterday'
  },

  methods: {
    handleClick(tab) {
      this.currTab = tab.name
    },

    getRankList() {
      // val: 根据不同参数，取不同排行数据
      setTimeout(() => {
        this.rankData = this.testData || []
      }, 1000)
    }
  }
}
</script>
