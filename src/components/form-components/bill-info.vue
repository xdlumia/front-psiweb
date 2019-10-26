/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-26 16:07:15
 * @Description: 账单信息
 */
<template>
  <form-card title='账单信息'>
    <el-row>
      <el-col :span="8">
        <div class="d-text-black">结账方式</div>
        <div class="d-text-qgray mt5 mb20">2019-9-21</div>
      </el-col>
    </el-row>
    <d-table
      api="seePumaidongService.collegeManagerList"
      ref="companyTable"
      class="mt10"
      style="height:500px"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span class="d-text-blue">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cityName"
        min-width="140"
        label="城市"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="issuerName"
        min-width="100"
        label="发布人"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="authorityButtons.includes('pmdwebset_contents_college_1006')"
        prop="remark"
        label="报名记录"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="text"
            @click="setCompany(scope.row)"
          >查看记录</el-button>
          <span
            v-if="scope.row.newNum>0"
            class="d-text-red f12"
          >new</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="操作"
        width="200"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            v-if="authorityButtons.includes('pmdwebset_contents_college_1002')"
            size="medium"
            type="text"
            @click="updateCompany('edit',scope.row)"
          >编辑</el-button>
          <el-button
            v-if="authorityButtons.includes('pmdwebset_contents_college_1003')"
            size="medium"
            type="text"
            @click="delCompany([scope.row.id])"
          >删除</el-button>
        </template>
      </el-table-column>
    </d-table>
  </form-card>
</template>
<script>
export default {
  prop: ['data'],
  data() {
    return {
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
