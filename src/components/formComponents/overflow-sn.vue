/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-30 17:43:52
 * @Description: 
报溢商品记录 
*/
<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      v-if="visible"
      @close='close'
      :title="data.type == 1 ? '报溢商品记录' : '报损商品记录'"
      v-dialogDrag
    >
      <el-container>
        <el-main style="padding:0;max-height:500px;">
          <form-card title='机器号/SN记录'>
            <d-table
              api="seePsiWmsService.wmsflowrecordList"
              :params="form"
              ref="companyTable"
              class="college-main"
              style="height:250px"
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
                prop="wmsName"
                min-width="100"
                :label="data.type == 1 ? '入库库房' : '出库库房'"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="operator"
                min-width="100"
                :label="data.type == 1 ? '入库人' : '出库人'"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="createTime"
                min-width="100"
                :label="data.type == 1 ? '入库时间' : '出库时间'"
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
                prop="className"
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

  </div>
</template>
<script>

export default {
  props: {
    visible: {
      type: Boolean,
      defaults: false
    },
    form: {

    },
    data: {}
  },
  data() {
    return {
      tableData: Array(12)
        .fill('')
        .map(() => ({ name: '' })),
    };
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>