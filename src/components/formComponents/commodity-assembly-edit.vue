/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-07 20:10:38
 * @Description: 组装任务组装弹窗 
*/
<template>
  <div>
    <el-dialog
      v-loading="loading"
      :visible.sync="visible"
      @close='close'
      :title="`组装-${data.commodityCode}`"
      v-dialogDrag
    >
      <el-container>
        <el-main style="padding:0;max-height:600px;">
          <!-- 新需求，但是老代码暂时不删，防止变故 -->
          <!-- <form-card
            class="borrow-goods-info"
            title="库房"
          >
            <el-form
              label-position='top'
              size='mini'
              label-width="100px"
            >
              <el-form-item
                style="width:30%"
                label="库房"
                prop="name"
              >
                <el-select
                  :disabled="!!wmsId"
                  style="width:30%"
                  class="wfull"
                  v-model="wmsId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in usableList"
                    :key="item.id "
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </form-card> -->
          <!-- 商品列表 -->
          <form-card
            class="borrow-goods-info"
            title="新商品组装"
          >
            <el-table
              border
              :data="[data]"
              max-height="400"
              size="mini"
            >
              <el-table-column
                label="未装数量"
                min-width="70"
                prop="accomplishNum"
              >
                <template slot-scope="scope">
                  <span>{{(scope.row.allocationNum || 0) - (scope.row.accomplishNum || 0)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="商品编号"
                min-width="110"
                prop="commodityCode"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.commodityCode | codeSlice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="categoryCode"
                min-width="100"
                label="商品类别"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="className"
                min-width="100"
                label="商品分类"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="configName"
                min-width="100"
                label="商品配置"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="specOne"
                min-width="140"
                label="商品规格"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="商品名称"
                min-width="110"
                prop="goodsName"
              ></el-table-column>
              <el-table-column
                label="备注"
                min-width="120"
                prop="note"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>

            <div class="mt10 mb10">
              <span class="b mt5">完成数量</span>
              <el-input-number
                size="mini"
                style="width:200px;"
                class="ml10 mt5"
                v-model="num"
                :min='1'
                :max='(data.allocationNum || 0) - (data.accomplishNum || 0)'
                :controls='false'
              ></el-input-number>
              <!-- 新需求，但是老代码暂时不删，防止变故 -->
              <!-- v-on:keyup.13.native="getCommodityBySnCode()" -->
              <!-- <span class="fr d-text-black mr10 mt5">
                <span>本次成功扫码</span>
                <span class="b d-text-red f16"> {{tableData.length}} </span>
                <span>件，历史扫码</span>
                <span class="b d-text-green f16"> {{data.accomplishNum}} </span>
                <span>件，还需扫码</span>
                <span class="b d-text-blue f16"> {{(data.allocationNum || 0) - (data.accomplishNum || 0) - tableData.length}} </span>
                <span>件</span>
              </span> -->
            </div>
          </form-card>
          <!-- 新需求，但是老代码暂时不删，防止变故 -->
          <!-- <el-table
            :data='tableData'
            size='mini'
            border
            ref="companyTable"
            class="college-main mt15"
            max-height="300"
          >
            <el-table-column
              min-width="50"
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <i
                  @click="assDelete(scope)"
                  class="el-icon-error d-pointer"
                  style="font-size:20px;color:#F5222D"
                ></i>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              min-width="80"
              label="编号"
            ></el-table-column>
            <el-table-column
              min-width="100"
              label="状态"
              show-overflow-tooltip
            >
              <template slot-scope="">
                <span>待确定</span>
              </template>
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
              label="库房"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="operator"
              min-width="100"
              label="组装人"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="组装时间"
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
              prop="specOne"
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
          </el-table> -->
        </el-main>
      </el-container>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
          size="small"
        >确 定</el-button>
        <el-button
          @click="close"
          size="small"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {},
    detailForm: {}
  },
  data() {
    return {
      loading: false,
      snCode: '',
      tableData: [],
      usableList: [],
      wmsId: '',
      num: ''
    };
  },
  mounted() {
    // this.commonwmsmanagerUsableList()
    // this.getLastWmId()
  },
  methods: {
    //查询上一次选择的仓库，下一次不能更改
    // getLastWmId() {
    //   this.$api.seePsiWmsService.wmsflowrecordList({ page: 1, limit: 2, commodityCode: this.data.commodityCode, businessCode: this.detailForm.assembleTaskCode })
    //     .then(res => {
    //       let list = res.data || []
    //       this.wmsId = list[0].wmsId || ''
    //     })
    //     .finally(() => {

    //     })
    // },
    close() {
      this.$emit('update:visible', false)
    },
    // //请求可用库房
    // commonwmsmanagerUsableList() {
    //   this.$api.seePsiWmsService.commonwmsmanagerUsableList()
    //     .then(res => {
    //       this.usableList = res.data || []
    //     })
    //     .finally(() => {
    //     })
    // },
    //点击删除某项
    // assDelete(scope) {
    //   this.tableData.splice(scope.$index, 1)
    // },
    //回车事件,入库
    // getCommodityBySnCode() {
    //   if (this.wmsId) {
    //     if (((this.data.allocationNum || 0) - (this.data.accomplishNum || 0) - this.tableData.length) > 0) {
    //       if (this.tableData.length < this.data.currAccomplishNum) {
    //         this.$api.seePsiWmsService.wmsinventorydetailPutawayCommodityCheck({ snCode: this.snCode, commodityCode: this.data.commodityCode, putawayCommodityList: this.tableData, categoryCode: this.data.categoryCode, wmsId: this.wmsId })
    //           .then(res => {
    //             if (res.data) {
    //               this.tableData.push(res.data)
    //               this.snCode = ''
    //             }
    //           })
    //           .finally(() => {
    //           })
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: '配件不够用啦!'
    //         })
    //       }
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '当前商品待入库数量已为0!'
    //       })
    //     }
    //   } else {
    //     this.$message({
    //       type: 'error',
    //       message: '请先选择入库库房!'
    //     })
    //   }
    // },
    //保存
    submit() {
      if (this.num <= this.data.currAccomplishNum) {
        this.loading = true
        this.$api.seePsiWmsService.wmsassembletaskPutawayCommodity({ businessCode: this.detailForm.assembleTaskCode, businessId: this.detailForm.id, commodityCode: this.data.commodityCode, num: this.num })
          .then(res => {
            this.close()
            this.$emit('reload')
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.$message({
          type: 'error',
          message: '配件不够用啦!'
        })
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