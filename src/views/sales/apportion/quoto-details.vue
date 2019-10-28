/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-25 19:24:40
 * @Description: 报价单详情
*/
<template>
  <div>
    <!-- 表格数据 -->
    <d-table
      api="seePumaidongService.clientapplyrecordList"
      :params="{page:1,limit:10,type:0,businessId:dialogMeta.data.id}"
      ref="setTable"
      style="height:460px"
    >
      <el-table-column
        prop=""
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.isRead==0"
            class="d-text-red f12"
          >new</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="wechatName"
        align="center"
        label="微信昵称"
        min-width="180"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="userPhone"
        align="center"
        label="客户电话"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="submitTime"
        align="center"
        label="提交时间"
        width="180"
      >
        <template slot-scope="scope">
          {{scope.row.submitTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
    </d-table>
  </div>
</template>
<script>
export default {
  props: ['dialogMeta'],
  beforeDestroy() {
    const data = {
      businessId: this.dialogMeta.data.id,
      type: 0
    }
    this.$api.seePumaidongService.clientapplyrecordUpdateReadStatus(data)
      .then(res => {
        this.$message.closeAll()
      })
  }
}
</script>
<style scoped>
</style>
