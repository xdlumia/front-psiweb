<!--
 * @Author: xiaomin
 * @Date: 2019-11-15 15:32:30
 * @LastEditTime: 2019-12-20 14:37:49
 -->
<template>
  <div class="leaderboard-box">
    <h3 class="b h40 lh40" style="text-indent:20px;margin-bottom: -1px">销售员工利润排行</h3>
    <div class="box leaderboard-content ba">
      <el-tabs class="no-border-tab" v-model="currTab" @tab-click="handleClick">
        <el-tab-pane label="昨日" name="5"></el-tab-pane>
        <el-tab-pane label="上周" name="6"></el-tab-pane>
        <el-tab-pane label="上月" name="7"></el-tab-pane>
        <el-tab-pane label="上季度" name="8"></el-tab-pane>
        <el-tab-pane label="去年" name="9"></el-tab-pane>
      </el-tabs>
      <div class="leaderboard-item-panel">
        <div class="leaderboard-item" v-for="(item, index) in rankData" :key="index">
          <span class="item-number">{{item.rank}}</span>
          <span class="item-name">{{item.name}}</span>
          <span class="item-performance">{{item.performance | thousandBitSeparator}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filterMix from './filter'

export default {
  mixins: [filterMix],
  data () {
    return {
      currTab: '',
      rankData: [],
      indexProfitTopLoading: false,
      testData: [
        {
          rank: 1,
          name: '小丽',
          performance: Math.floor(Math.random() * 10000)
        },
        {
          rank: 2,
          name: '李强',
          performance: Math.floor(Math.random() * 10000)
        },
        {
          rank: 3,
          name: '张三',
          performance: Math.floor(Math.random() * 10000)
        },
        {
          rank: 4,
          name: '王麻子',
          performance: Math.floor(Math.random() * 10000)
        },
        {
          rank: 6,
          name: 'candy',
          performance: Math.floor(Math.random() * 10000)
        },
        {
          rank: 7,
          name: '阿吉斯坦',
          performance: Math.floor(Math.random() * 10000)
        },
        {
          rank: 8,
          name: '啦啦啦',
          performance: Math.floor(Math.random() * 10000)
        }
      ]
    }
  },

  watch: {
    currTab (newVal) {
      this.indexProfitTop(newVal)
    }
  },

  created () {
    this.currTab = '5'
  },

  methods: {
    handleClick (tab) {
      this.currTab = tab.name
    },
    // 销售员工利润排行
    indexProfitTop (dateFlag) {
      this.indexProfitTopLoading = true
      this.$api.seePsiReportService.indexProfitTop({ dateFlag }).then(res => {
        console.log('销售员工利润排行', res.data)
        this.rankData = this.testData || []
      }).finally(() => { this.indexProfitTopLoading = false })
    }
  }
}
</script>
