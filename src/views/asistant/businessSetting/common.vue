<!--
 * @Author: 高大鹏
 * @Date: 2019-10-29 11:02:47
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-29 18:09:38
 * @Description: 业务设置-公共
 -->
<template>
  <div class>
    <div>
      <el-col :span="16">
        <h3 class="mt10 d-text-gray b">公司设置</h3>
      </el-col>
      <el-col :span="8" class="ar">
        <el-button type="primary" size="small" style="margin-top: 20px;" @click="visible=true">+新增公司</el-button>
      </el-col>
    </div>
    <fieldset class="d-fieldset mb20">
      <legend>
        <i class="d-round12 d-circle d-bg-blue"></i>
        <span class="mr5">公司设置</span>
        <span class="f12 pb10" style="color: #999">说明：新增管理公司及结算账户</span>
      </legend>
      <el-table :data="tableData">
        <el-table-column label="公司名称"></el-table-column>
        <el-table-column label="开户行"></el-table-column>
        <el-table-column label="开户行账号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">启用</el-button>
            <el-button type="text" size="small">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <el-dialog :visible.sync="visible" title v-dialogDrag :show-close="false" width="1000px">
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">公司账户设置</h3>
        <div>
          <el-button type="primary" size="mini">保存</el-button>
          <el-button size="mini" @click="visible=false">关闭</el-button>
        </div>
      </div>
      <add-company></add-company>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import addCompany from './components/add-company'
export default {
  data() {
    return {
      activeName: 'first',
      isEdit: false,
      tableData: [],
      visible: false
    }
  },
  components: {
    addCompany
  },
  methods: {
    save() {

    },
    cancel() {

    },
    restoreDefault() {

    }
  }
}
</script>

<style scoped lang='scss'>
/deep/ .el-input-number--mini {
  width: 100px;
}
</style>
