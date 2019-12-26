/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: web.徐贺
 * @LastEditTime: 2019-12-26 10:09:18
 * @Description: 20191123 需求 所有出库  增加一个弹窗，期初库存商品可以直接赋给它码
*/
<template>
  <el-dialog
    :visible="visible"
    @close='close'
    title="期初库存确认"
    v-dialogDrag
  >
    <el-container v-loading="loading">
      <el-main :style="{maxHeight:'calc(100vh - 180px)'}">
        <div class="wfull ac b f16">您扫码的商品没有被记录在库存中，请确认是否为期初库存商品，期初商品请选择商品名称</div>
        <el-table
          border
          size="mini"
          :data="tableData"
          ref="companyTable"
          class="college-main mt20"
          max-height='200'
        >
          <el-table-column
            prop="snCode"
            label="SN/机器码"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="">
              <span>{{data.snCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品编号"
            min-width="140"
          >
            <template
              slot-scope="scope"
              class="d-relative"
            >
              <commoditySelector
                :disabled='disabled'
                :multiple='false'
                :codes="tableData.map(item=>item.commodityCode)"
                @choose='commodityChoose(arguments,scope)'
                type="code"
                v-model="scope.row.commodityCode"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            min-width="150"
          >
            <template
              slot-scope="scope"
              class="d-relative"
            >
              <commoditySelector
                :multiple='false'
                :disabled='disabled'
                :codes="tableData.map(item=>item.commodityCode)"
                ref='commdity'
                @choose='commodityChoose(arguments,scope)'
                v-model="scope.row.goodsName"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="className"
            min-width="100"
            label="所属分类"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="unusedNum"
            min-width="100"
            label="未记录的期初数量"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
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
      >确定期初商品并记录</el-button>
      <el-button
        @click="close"
        size="small"
      >取消并重新扫码</el-button>
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
    disabled: {
      type: Boolean,
      default: false
    },
    data: {},
  },
  computed: {

  },
  data() {
    return {
      tableData: [{}],
      loading: false,
    };
  },
  created() {

  },
  mounted() {
    this.response()
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    //选择商品
    commodityChoose(e, scope) {
      let list = e[0] || []
      this.tableData = list
    },
    response() {
      if (this.data.commodityCode) {
        this.loading = true
        //这里只针对报损的情况，报损的商品是一对一的，所以这里加一个筛选条件，默认选择当前商品,选项直接置灰
        this.$api.seePsiWmsService.wmsinventoryList({ page: 1, limit: 15, commodityCode: this.data.commodityCode })
          .then(res => {
            if (res.data.length > 0) {
              this.tableData = [...res.data]
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    //保存按钮
    submit() {
      if (this.tableData.length > 0 && this.tableData[0].unusedNum > 0) {
        // snCode: this.tableData[0].categoryCode == 'PSI_SP_KIND-2' ? this.data.snCode : '',
        // robotCode: this.tableData[0].categoryCode == 'PSI_SP_KIND-1' ? this.data.snCode : '',
        let params = {
          wmsId: this.data.wmsId ? this.data.wmsId : '',//库房id
          commodityCode: this.tableData[0].commodityCode,
          categoryCode: this.tableData[0].categoryCode,
          snCode: this.data.snCode
        }
        this.$api.seePsiWmsService.wmsinventorydetailUpdateInitializeSnCode(params)
          .then(res => {
            this.$emit('update')
            this.close()
          })
          .finally(() => {
          })
      } else {
        this.$message({
          message: '未记录的期初数量为0：此商品的期初库存已全部记录，请确认商品名称',
          type: 'error',
          showClose: true,
        });
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