/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-11 15:59:02
 * @Description: 采购单 详情  入库商品  点击入库或者SN码公共弹窗
*/
<template>
  <el-dialog
    :visible.sync="visible"
    @close="close"
    title="机器号/SN码记录"
    v-dialogDrag
  >
    <!-- 入库仓库 -->
    <form-card
      title='入库仓库'
      class='wfull'
    >
      <div class='wfull d-flex'>
        <span class='mr10 mt5'>入库仓库</span>
        <span class='mr10 mt5'>{{wmsName}}</span>
        <!-- <el-select
          :disabled="true"
          size='small'
          v-model="value" 
          placeholder="请选择"
        >
          <el-option
            v-for="item in usableList"
            :key="item.id "
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select> -->
      </div>
    </form-card>
    <!-- 入库商品 -->
    <form-card
      title='入库商品'
      class='wfull'
    >
      <el-table
        border
        size='mini'
        :data='[dialogData]'
        ref="companyTable"
        class="college-main mt15"
        style="max-height:300px"
      >
        <el-table-column
          fixed
          min-width="80"
          label="入库数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.putinNumber || 0}}/{{scope.row.commodityNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="commodityCode"
          label="商品编号"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <div
              @click="openCommodityDetail(row.commodityCode)"
              class="d-text-blue d-elip d-pointer"
            >{{row.commodityCode}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed
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
          label="商品名称"
          min-width="140"
          show-overflow-tooltip
        >
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
          <template slot-scope="scope">
            <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </form-card>

    <!-- 机器号/SN码 -->
    <form-card title='机器号/SN码'>
      <d-table
        api="seePsiWmsService.wmsflowrecordList"
        :params="{page:1,limit:20,commodityCode:dialogData.commodityCode,businessCode:drawerData.purchaseCode}"
        @response="response"
        ref="companyTable"
        class="college-main"
        style="height:200px"
      >
        <el-table-column
          fixed
          type="index"
          min-width="80"
          label="编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
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
          fixed
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
          fixed
          prop="wmsName"
          min-width="100"
          label="入库库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="operator"
          min-width="100"
          label="入库人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="入库时间"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
      </d-table>
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
        @click="close"
        size="small"
      >保 存</el-button>
    </span>
    <CommodityDetail
      :code="currentCommodityCode"
      :visible.sync="showCommodityDetail"
      v-if="showCommodityDetail"
    />
  </el-dialog>
</template>
<script>
import CommodityDetail from '@/views/basicSetting/commodityLibrary/detail.vue';

export default {
  components: {
    CommodityDetail
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
    },
    form: {},
    drawerData: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      usableList: [],
      showCommodityDetail: false,
      currentCommodityCode: '',
      wmsName: '',
      tableData: [],
      formInline: {
        user: ''
      },
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
    response(res) {
      this.wmsName = res.data[0].wmsName || '-'
    },
    // 打开商品详情
    openCommodityDetail(code) {
      this.showCommodityDetail = true;
      this.currentCommodityCode = code;
    },
    //请求可用库房
    commonwmsmanagerUsableList() {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList()
        .then(res => {
          this.usableList = res.data
        })
        .finally(() => {

        })
    },
    // wmsflowrecordList() {
    //   this.$api.seePsiWmsService.wmsflowrecordList()
    //     .then(res => {
    //       this.usableList = res.data
    //     })
    //     .finally(() => {

    //     })
    // },
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>