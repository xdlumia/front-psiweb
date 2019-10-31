/*
 * @Author: 徐贺
 * @Date: 2019-10-30 17:26:29
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-30 17:43:52
 * @Description: 组装记录弹窗 
*/
<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      title="组装记录"
      v-dialogDrag
    >
      <el-container>
        <el-main style="padding:0;max-height:500px;">
          <form-card title='组装信息'>
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
                min-width="100"
                label="数量"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="title"
                label="商品编号"
                min-width="140"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span class="d-text-blue">{{scope.row.id}}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="cityName"
                min-width="100"
                label="商品类别"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="商品分类"
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
                label="商品配置"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="140"
                label="商品规格"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="备注"
                show-overflow-tooltip
              ></el-table-column>
            </d-table>
          </form-card>

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
                label="机器号"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="库房"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="cityName"
                min-width="100"
                label="操作人"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="cityName"
                min-width="100"
                label="操作时间"
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
          @click="$emit('close')"
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
        limit: 20
      },
    };
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>