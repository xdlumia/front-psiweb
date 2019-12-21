/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-21 07:57:08
 * @Description: 拣货
*/
<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="visible"
    title="拣货"
    @close="close"
    v-dialogDrag
  >
    <el-container>
      <el-main
        :style="{maxHeight:'calc(100vh - 180px)'}"
        style="padding:0;"
      >
        <form-card title='拣货商品'>
          <el-table
            border
            size='mini'
            :data='data.commodityList'
            ref="companyTable"
            class="college-main"
            style="max-height:300px"
          >
            <el-table-column
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
              prop="usableNum"
              min-width="100"
              label="可用库存"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column
              prop="commodityCode"
              label="商品编号"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="d-text-blue">{{scope.row.commodityCode}}</span>
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
        <pickingSn
          ref="pickingSn"
          :data='data'
        />
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
      >保 存</el-button>
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import goodsPicking from '@/components/formComponents/goods-picking'
import pickingSn from '@/components/formComponents/picking-sn';

export default {
  components: {
    goodsPicking,
    pickingSn
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {},
    data: {},
    drawerData: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      loading: false,
      activeName: ''
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
    //保存
    submit() {
      let tableData = this.$refs.pickingSn.tableData
      let custom = this.$refs.pickingSn.custom
      tableData.forEach((item) => {
        item.fieldList = [];
        custom.forEach((item1) => {
          item.fieldList.push({ fieldVal: item1, fieldCode: item[item1] })
        })
      })
      this.loading = true
      this.$api.seePsiWmsService.wmspickingorderBatchShipment({ businessCode: this.drawerData.pickingOrderCode, businessId: this.drawerData.id, putawayCommodityList: this.$refs.pickingSn.tableData, businessType: 10 })
        .then(res => {
          this.close()
          this.$emit('reload')
        })
        .finally(() => {
          this.loading = false
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