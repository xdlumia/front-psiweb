/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-14 14:36:42
 * @Description: 报溢报损扫码公共弹窗
*/
<template>
  <el-dialog
    v-if='visible'
    :visible.sync="visible"
    @close='close'
    :title="type == 1 ? 'SN码 报溢商品' : 'SN码 报损商品'"
    v-dialogDrag
  >
    <el-container
      :style="{maxHeight:'calc(100vh - 180px)'}"
      style="padding:0;"
      class="d-auto-y"
    >
      <el-main style="padding:0;max-height:700px;">
        <!-- 换入库商品 -->
        <form-card
          class="borrow-goods-info mt10"
          title="SN码"
        >
          <div class="mt10 mb10">
            <span class="b mt5">扫SN码</span>
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
              :label="type == 1 ? '报溢数量' : '报损数量'"
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
                <span class="">{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
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
                <span class="">{{scope.row.unit | dictionary('SC_JLDW')}}</span>
              </template>
            </el-table-column>
          </el-table>

        </form-card>

        <!-- 机器号/SN码 -->
        <form-card title='SN码'>
          <el-table
            border
            size='mini'
            :data='tableData'
            ref="companyTable"
            class="college-main"
            height="200"
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
        <openingInventory
          :disabled='true'
          :visible.sync="openVisible"
          :data='openingData'
          @update='getCommodityBySnCode'
          v-if='openVisible'
        />
      </el-main>
    </el-container>
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
import openingInventory from '@/components/formComponents/opening-inventory'
export default {
  components: {
    openingInventory
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    commodityForm: {},//当前行商品信息
    addForm: {},//用来取当前选择的库房信息
    type: ''//类别（1-报溢 2-报损） 报溢报损调不通的接口 
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
      openVisible: false,
      openingData: {},
      formInline: {
        user: ''
      },
      tableData: [],
    };
  },
  mounted() { },
  created() {
    this.getCommodityInfoList()
  },
  methods: {
    getCommodityInfoList() {
      if (this.commodityForm.commodityInfoList && this.commodityForm.commodityInfoList.length > 0) {
        this.tableData = [...this.commodityForm.commodityInfoList]
      }
    },
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
      let api = this.type == 1 ? 'wmsinventorydetailPutawayCommodityCheck' : 'wmsinventorydetailShipmentCommodityCheck'
      let params = {
        snCode: this.snCode,
        wmsId: this.addForm.wmsId,
        putawayCommodityList: this.tableData,//入库 字段不同
        commodityCode: this.commodityForm.commodityCode,
        categoryCode: this.commodityForm.categoryCode,
        commodityList: this.tableData,//出库 字段不同
      }
      this.$api.seePsiWmsService[api](params)
        .then(res => {
          // res.data ? this.tableData.push(res.data) : ''
          if (res.data) {
            this.tableData.push(res.data)
          } else {
            if (this.type == 2) {
              this.openVisible = true
              this.openingData = {
                snCode: this.snCode,
                wmsId: this.addForm.wmsId,
                commodityCode: this.commodityForm.commodityCode,
              }
            }
          }
        })
        .finally(() => {

        })
    },
    //保存
    submit() {
      if (this.tableData.length == 0) {
        this.$message({
          type: 'error',
          message: '请至少扫一个SN码'
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