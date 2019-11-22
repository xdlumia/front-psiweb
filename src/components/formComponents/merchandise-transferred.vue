/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 调出商品
*/
<template>
  <div>
    <!-- 换入库商品 -->
    <form-card
      class="borrow-goods-info mt10"
      title="调出商品"
    >
      <div class="mt10 mb10">
        <span class="b mt5">机器号/扫SN码</span>
        <el-input
          size="mini"
          style="width:200px;"
          class="ml10 mt5"
          v-model='snCode'
          v-on:keyup.13.native="getCommodityBySnCode"
        ></el-input>
        <span class="fr d-text-black mr10 mt5">
          <el-button
            type="primary"
            size='mini'
            @click="chooseVisible = true"
          >选择商品</el-button>
        </span>
      </div>
      <el-table
        style="width: 100%"
        size='mini'
        border
        :data='upTableData'
        ref="companyTable"
        class="college-main"
      >
        <el-table-column
          min-width="50"
          label="操作"
          show-overflow-tooltip
        >
          <template slot-scope="row">
            <i
              @click='deleteUpTable(row)'
              class="el-icon-error d-pointer"
              style="font-size:20px;color:#F5222D"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          type='index'
          min-width="80"
          label="编号"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="snCode"
          label="SN码"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.snCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="robotCode"
          label="机器号"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.robotCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="wmsName"
          min-width="100"
          label="借出库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          min-width="100"
          label="调拨人"
          show-overflow-tooltip
        >
          <template slot-scope=''>{{userName}}</template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="调拨时间"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column
          prop="commodityCode"
          min-width="100"
          label="商品编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="goodsName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="configName"
          min-width="100"
          label="配置"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>

      <el-table
        size='mini'
        border
        :data="downTableData"
        ref="companyTable"
        class="college-main mt20"
      >

        <el-table-column
          prop="num"
          min-width="80"
          label="数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="commodityCode"
          label="商品编号"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryCode"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</template>
        </el-table-column>
        <el-table-column
          prop="className"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.goodsName}}</template>
        </el-table-column>
        <el-table-column
          prop="configName"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specOne"
          min-width="100"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="unit"
          min-width="100"
          label="单位"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.unit | dictionary('PMD_RM_SHI_YONG_HY')}}</template>
        </el-table-column>
      </el-table>
    </form-card>
    <commodityChoose
      sn
      :visible.sync='chooseVisible'
      @choose='commodityChoose'
    />
  </div>
</template>
<script>
import commodityChoose from './commodity-choose'
export default {
  components: {
    commodityChoose
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
    },
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      snCode: '',
      chooseVisible: false,
      upTableData: [],
      downTableData: [],
      formInline: {
        user: ''
      },
      userName: this.$local.fetch("userInfo").userName
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    },
    //刪除某一項
    deleteUpTable(row) {
      this.upTableData.splice(row.$index, 1)
      this.doSth()
    },
    //查詢商品統計
    doSth() {
      let arr = []
      if (this.upTableData.length > 0) {
        this.upTableData.forEach((item) => {
          arr.push(item.commodityCode)
        })
        this.wmsallocationorderTempCommodityCount(arr)
      } else {
        this.downTableData = []
      }
    },
    //弹窗选择商品
    commodityChoose(selected) {
      let allId = []
      this.upTableData.forEach((item) => {
        allId.push(item.id)
      })
      let newArr = selected.filter(item => !allId.includes(item.id))
      if (newArr.length > 0) {
        newArr.forEach((item) => {
          this.upTableData.unshift(item)
        })
        this.doSth()
      }
    },
    //根据SN码或机器号查询商品
    getCommodityBySnCode() {
      if (this.form.putawayWmsId) {
        if (this.snCode) {
          this.$api.seePsiWmsService.wmsinventorydetailGetCommodityBySnCode({ snCode: this.snCode, wmsId: this.form.putawayWmsId })
            .then(res => {
              if (res.data) {
                let arr = this.upTableData.filter((item) => {
                  return item.id == res.data.id
                })
                // if (arr.length == 0) {
                this.upTableData.push(res.data)
                this.doSth()
                // } else {
                //   this.$message({
                //     type: 'info',
                //     message: '扫过喽'
                //   })
                // }
              }
            })
            .finally(() => {

            })
        }
      } else {
        this.$message({
          type: 'error',
          message: '请选择库房'
        })
      }

    },
    //临时商品统计
    wmsallocationorderTempCommodityCount(arr) {
      this.$api.seePsiWmsService.wmsallocationorderTempCommodityCount(arr)
        .then(res => {
          this.downTableData = res.data || []
        })
        .finally(() => {

        })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>