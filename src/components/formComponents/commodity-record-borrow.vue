/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: web.徐贺
 * @LastEditTime: 2020-01-14 14:26:29
 * @Description: 
借入/借出商品记录 
*/
<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="close"
      title="借入/借出商品记录"
      v-dialogDrag
      width="800px"
    >
      <el-container>
        <el-main style="padding:0;max-height:600px;">
          <form-card title="SN记录">
            <d-table
              :params="queryForm"
              :tree-props="{children: 'id', hasChildren: 'id'}"
              api="seePsiWmsService.wmsflowrecordList"
              class="college-main"
              ref="companyTable"
              style="height:350px;"
            >
              <el-table-column
                label="SN码"
                min-width="100"
                prop="snCode"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="机器号"
                min-width="100"
                prop="robotCode"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="库房"
                min-width="100"
                prop="wmsName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="借入/借出人"
                min-width="100"
                prop="operator"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="借入/借出时间"
                min-width="100"
                prop="createTime"
                show-overflow-tooltip
              >
                <template slot-scope="{row}">
                  <span>{{row.createTime|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="商品编号"
                min-width="100"
                prop="commodityCode"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.commodityCode | codeSlice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="商品名称"
                min-width="100"
                prop="goodsName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="配置"
                min-width="100"
                prop="configName"
                show-overflow-tooltip
              ></el-table-column>
            </d-table>
          </form-card>
        </el-main>
      </el-container>
      <span
        class="dialog-footer"
        slot="footer"
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
    params: {
      type: Object
    }
  },
  data() {
    return {
      data: '',
      tableData: Array(12)
        .fill('')
        .map(() => ({ name: '' })),
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      }
    };
  },
  mounted() {
    Object.assign(this.queryForm, this.params);
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>