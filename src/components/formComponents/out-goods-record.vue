/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-30 17:43:52
 * @Description: 
调出商品记录 
*/
<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      @close='close'
      title="调出商品记录"
      v-dialogDrag
    >
      <el-container>
        <el-main style="padding:0;max-height:500px;">
          <form-card title='机器号/SN记录'>
            <d-table
              api="seePumaidongService.collegeManagerList"
              :params="queryForm"
              ref="companyTable"
              class="college-main"
              style="height:calc(100vh - 340px)"
              :tree-props="{children: 'id', hasChildren: 'id'}"
            >
              <el-table-column
                prop="cityName"
                min-width="80"
                label="编号"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="title"
                label="SN码"
                min-width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span class="">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="调出库房"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="调拨人"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="调拨时间"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="商品编号"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="商品名称"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
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
        limit: 20,
      },
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