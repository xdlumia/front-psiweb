/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-14 14:35:17
 * @Description: 拣货单 拣货商品 点击 锁库量
*/
<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      v-if="visible"
      @close='close'
      title="已锁定商品记录"
      v-dialogDrag
    >
      <el-container>
        <el-main style="padding:0;max-height:500px;">
          <form-card title='锁定商品'>
            <el-table
              border
              size='mini'
              :data='[data]'
              ref="companyTable"
              class="college-main"
              style="max-height:300px"
            >
              <el-table-column
                fixed
                prop="title"
                label="拣货数量"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.pickingAccomplishNum}}/{{scope.row.pickingNum}}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="commodityCode"
                label="商品编号"
                min-width="140"
                show-overflow-tooltip
              >
                <template slot-scope="{row}">
                  <div
                    @click="openCommodityDetail(row.commodityCode)"
                    class="d-text-blue d-elip d-pointer"
                  >{{row.commodityCode | codeSlice}}</div>
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
                prop="goodsName"
                min-width="100"
                label="商品名称"
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
                prop="note"
                min-width="120"
                label="备注"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </form-card>

          <form-card title='已锁定的SN码'>
            <d-table
              api="seePsiWmsService.wmsflowrecordList"
              :params="{commodityCode:data.commodityCode,businessCode:drawerData.pickingOrderCode,page:1,limit:15}"
              ref="companyTable"
              @response='response'
              class="college-main"
              style="height:200px"
            >
              <el-table-column
                type="index"
                min-width="80"
                label="编号"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="snCode"
                label="SN码"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span class="">{{scope.row.snCode}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="robotCode"
                label="机器号"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span class="">{{scope.row.robotCode}}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-for="(item,index) of custom"
                :key="index"
                min-width="150"
                :label="item"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row[item]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="wmsName"
                min-width="100"
                label="入库库房"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="operator"
                min-width="100"
                label="入库人"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="createTime"
                min-width="100"
                label="入库时间"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
              </el-table-column>
            </d-table>
          </form-card>
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
      </span>
    </el-dialog>
    <CommodityDetail
      :code="currentCommodityCode"
      :visible.sync="showCommodityDetail"
      v-if="showCommodityDetail"
    />
  </div>
</template>
<script>
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';

export default {
  props: {
    visible: {
      type: Boolean,
      defaults: false
    },
    form: {
    },
    data: {},//当前点击行数据
    drawerData: {},//当前详情的数据
    showCommodityDetail: false,
    currentCommodityCode: '',
  },
  data() {
    return {
      tableData: [],
      custom: []
    };
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    // 打开商品详情
    openCommodityDetail(code) {
      this.showCommodityDetail = true;
      this.currentCommodityCode = code;
    },
    response(res) {
      let tableData = res.data || []
      tableData.forEach((item) => {
        if (item.fieldList.length > 0) {
          item.fieldList.forEach((item1) => {
            item[item1.fieldVal] = item1.fieldCode
            if (!this.custom.includes(item1.fieldVal)) {
              this.custom.push(item1.fieldVal)
            }
          })
        }
      })
    }
  },
  components: {
    CommodityDetail
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>