/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 报溢报损扫码公共弹窗
*/
<template>
  <div>
    <!-- 换入库商品 -->
    <form-card class="borrow-goods-info mt10" title="期初库存">
      <el-table border :data="[rowData]" max-height="400" size="mini">
        <el-table-column prop="goodsCode" label="期初商品" min-width="140" show-overflow-tooltip>
          <template slot-scope>
            <span>{{tableData.length}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="goodsCode" label="商品编号" min-width="140" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.goodsCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品类别" min-width="110" prop="categoryCode">
          <template slot-scope="scope">{{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</template>
        </el-table-column>
        <el-table-column label="商品分类" min-width="110" prop="className">
          <template slot-scope="scope">
            <span class>{{ scope.row.firstClassName }}/{{ scope.row.secondClassName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="110" prop="name"></el-table-column>
        <el-table-column label="商品配置" min-width="110" prop="configName"></el-table-column>
        <el-table-column label="商品规格" min-width="110" prop="specOne"></el-table-column>
        <el-table-column label="单位" min-width="80" prop="unit">
          <template slot-scope="{row}">
            {{row.unit | dictionary('SC_JLDW')}}
          </template>
        </el-table-column>
      </el-table>
      <div class="mt10 mb10">
        <span class="b mt5">机器号/扫SN码</span>
        <el-input
          v-model="snCode"
          size="mini"
          style="width:200px;"
          class="ml10 mt5"
          v-on:keyup.13.native="getCommodityBySnCode"
        ></el-input>
      </div>
    </form-card>

    <!-- 机器号/SN码 -->
    <form-card title="机器号/SN码">
      <el-table border size="mini" :data="tableData" ref="companyTable" class="college-main">
        <el-table-column min-width="50" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <i
              @click="deleteSth(scope)"
              class="el-icon-error d-pointer"
              style="font-size:20px;color:#F5222D"
            ></i>
          </template>
        </el-table-column>
        <el-table-column type="index" min-width="80" label="编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="snCode" label="SN码" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.snCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="robotCode" label="机器号" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.robotCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wmsName" min-width="100" label="入库库房" show-overflow-tooltip>
          <template slot-scope>{{wmsName}}</template>
        </el-table-column>
        <el-table-column prop="operator" min-width="100" label="入库人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="入库时间" min-width="140" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column prop="commodityCode" min-width="100" label="商品编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsName" min-width="100" label="商品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="configName" min-width="100" label="配置" show-overflow-tooltip></el-table-column>
      </el-table>
    </form-card>
  </div>
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
    wmsName: {
      type: String,
      default: ''
    },
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    }, // 当前行商品信息
    data: {
      type: Object,
      default: () => {
        return {}
      }
    } // 用来取当前选择的库房信息
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
      tableData: []
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    // 删除某一项
    deleteSth(scope) {
      this.tableData.splice(scope.$index, 1)
    },
    // SN码回车
    getCommodityBySnCode() {
      if (!this.data.wmsId) {
        this.$message.error('请先选择库房')
        return
      }
      // const api = this.type == 1 ? 'wmsinventorydetailPutawayCommodityCheck' : 'wmsinventorydetailShipmentCommodityCheck'
      const params = {
        snCode: this.snCode,
        wmsId: this.data.wmsId,
        putawayCommodityList: this.tableData,
        commodityCode: this.rowData.goodsCode,
        categoryCode: this.rowData.categoryCode
      }
      this.$api.seePsiWmsService['wmsinventorydetailPutawayCommodityCheck'](params)
        .then(res => {
          res.data ? this.tableData.push(res.data) : ''
          this.snCode = ''
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
