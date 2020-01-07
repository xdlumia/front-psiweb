/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-07 14:59:21
 * @Description: 扫码盘点
*/
<template>
  <el-dialog
    v-if='visible'
    :visible.sync="visible"
    @close='close'
    title="扫码盘点"
    v-dialogDrag
  >

    <!-- 换入库商品 -->
    <form-card
      class="borrow-goods-info mt10"
      title="机器号/SN"
    >
      <div class="mt10 mb10">
        <span class="b mt5">机器号/扫SN码</span>
        <el-input
          v-model='snCode'
          size="mini"
          style="width:200px;"
          class="ml10 mt5"
          v-on:keyup.13.native="getCommodityBySnCode"
        ></el-input>
      </div>
      <el-table
        border
        :data="[commodityForm]"
        max-height="400"
        size="mini"
      >
        <el-table-column
          label="已扫数量"
          min-width="100"
        >
          <template slot-scope="">
            <span>{{tableData.length}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="commodityCode"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.commodityCode | codeSlice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品类别"
          min-width="110"
          prop="categoryCode"
        >
          <template slot-scope="scope">
            <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品分类"
          min-width="110"
          prop="className"
        ></el-table-column>
        <el-table-column
          label="商品名称"
          min-width="110"
          prop="goodsName"
        ></el-table-column>
        <el-table-column
          label="商品配置"
          min-width="110"
          prop="configName"
        ></el-table-column>
        <el-table-column
          label="商品规格"
          min-width="110"
          prop="specOne"
        ></el-table-column>
        <el-table-column
          label="单位"
          min-width="80"
          prop="unit"
        >
          <template slot-scope="scope">
            <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
          </template>
        </el-table-column>
      </el-table>

    </form-card>

    <!-- 机器号/SN码 -->
    <form-card title='机器号/SN码'>
      <el-table
        border
        size='mini'
        :data='tableData'
        ref="companyTable"
        class="college-main"
        max-height="300"
      >
        <el-table-column
          min-width="50"
          label="操作"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <i
              @click="deleteSth(scope)"
              class="el-icon-error d-pointer"
              style="font-size:20px;color:#F5222D"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          min-width="80"
          label="编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="snCode"
          label="SN码"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.snCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="robotCode"
          label="机器号"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.robotCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="wmsName"
          min-width="100"
          label="出/入库库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operator"
          min-width="100"
          label="出/入库人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="出/入库时间"
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
        >
          <template slot-scope="scope">
            <span>{{scope.row.commodityCode | codeSlice}}</span>
          </template>
        </el-table-column>
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
    </form-card>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="submit"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    commodityForm: {},//当前行商品信息
    data: {},//用来取当前选择的库房信息
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      snCode: '',
      formInline: {
        user: ''
      },
      tableData: [],
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
    //删除某一项 
    deleteSth(scope) {
      this.tableData.splice(scope.$index, 1)
    },
    //SN码回车
    getCommodityBySnCode() {
      let params = {
        snCode: this.snCode,
        wmsId: this.data.wmsId,
        putawayCommodityList: this.tableData,
        commodityCode: this.commodityForm.commodityCode,
        categoryCode: this.commodityForm.categoryCode,
        // blitemId: this.data.id,//盘点单id
      }
      this.$api.seePsiWmsService.wmsblitemBlitemCommodityCheck(params)
        .then(res => {
          res.data ? this.tableData.push(res.data) : ''

        })
        .finally(() => {

        })
    },
    //保存
    submit() {
      if (this.tableData.length == 0) {
        this.$message({
          type: 'error',
          message: '请至少扫一个SN码或机器号'
        })
      } else {
        this.$emit('sumitSn', this.tableData)
        this.close()
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>