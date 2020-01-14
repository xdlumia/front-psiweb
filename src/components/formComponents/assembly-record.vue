/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-07 14:53:11
 * @Description: 组装记录弹窗 
*/
<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      @close='close'
      title="组装记录"
      v-dialogDrag
    >
      <el-container>
        <el-main
          style="padding:0;"
          :style="{maxHeight:'calc(100vh - 120px)'}"
        >
          <form-card title='组装信息'>
            <el-table
              border
              :data="[data]"
              size='mini'
              ref="companyTable"
              class="college-main"
              max-height="250"
            >
              <el-table-column
                min-width="100"
                label="数量"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.accomplishNum || 0}}</span>
                </template>
              </el-table-column>
              <!-- /{{scope.row.allocationNum || 0}} -->
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
                min-width="100"
                label="备注"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </form-card>

          <form-card title='SN记录'>
            <d-table
              api="seePsiWmsService.wmsflowrecordList"
              :params="{commodityCode:data.commodityCode,businessCode:drawerData.assembleTaskCode ? drawerData.assembleTaskCode : drawerData.assembleOrderCode,page:1,limit:15,operation:0}"
              ref="companyTable"
              class="college-main"
              style=" height:200px"
            >
              <el-table-column
                type='index'
                min-width="80"
                label="编号"
                show-overflow-tooltip
              ></el-table-column>
              <!-- 组装全是入库,状态直接写死 -->
              <el-table-column
                prop="title"
                label="状态"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="">
                  <span>组装入库</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="title"
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
                min-width="100"
                label="机器号"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="wmsName"
                min-width="100"
                label="库房"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="operator"
                min-width="100"
                label="操作人"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                min-width="100"
                label="操作时间"
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
            </d-table>
          </form-card>
        </el-main>
      </el-container>
      <!-- <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="close"
          size="small"
        >关 闭</el-button>
      </span> -->
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
    data: {
      type: Object,
      default: () => ({})
    },
    drawerData: {}
  },
  data() {
    return {
      tableData: Array(12)
        .fill('')
        .map(() => ({ name: '' })),
      showCommodityDetail: false,
      currentCommodityCode: '',
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
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