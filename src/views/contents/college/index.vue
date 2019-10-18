/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-09-29 11:02:11
 * @Description: 店长学院
 */
<template>
<div class="d-content main-content" v-loading="loading" element-loading-text="正在初始化">
  <el-form ref="queryForm" :model="queryForm" label-width="80px" size="small" inline>
    <div class="mb10">
        <el-form-item v-if="authorityButtons.includes('pmdwebset_contents_college_1004')" label="标题:" prop="title" class="mb0">
            <el-input v-model="queryForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item v-if="authorityButtons.includes('pmdwebset_contents_college_1004')" label="发布人:" prop="issuerName" class="mb0">
            <el-input v-model="queryForm.issuerName" placeholder="请输入发布人"></el-input>
        </el-form-item>
        <!-- <el-form-item v-if="authorityButtons.includes('pmdwebset_contents_college_1004')" label="城市:" prop="city" class="mb0">
          <el-select v-model.trim="queryForm.cityId" filterable placeholder="请选择城市">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in citys()" :key="index"></el-option>
          </el-select>
        </el-form-item> -->
        <el-button v-if="authorityButtons.includes('pmdwebset_contents_college_1004')" size="small" type="primary" @click="$refs.companyTable.reload()" >查 询</el-button>
        <el-button v-if="authorityButtons.includes('pmdwebset_contents_college_1004')" size="small" @click="reset()">重 置</el-button>
        <el-button v-if="authorityButtons.includes('pmdwebset_contents_college_1001')" size="small" type="primary" icon="el-icon-plus" @click="updateCompany('add')" class="fr mr30">新建</el-button>
    </div>
  </el-form>
    <el-row v-if="tableList[0] && authorityButtons.includes('pmdwebset_contents_college_1003')">
      <el-col :span="24"><div class="grid-content bg-purple  ml10 d-text-gray lh35">
          <div  class="d-inline ml20">
              <el-button plain size="small" @click="delCompany(tableList)">批量删除</el-button>
          </div>
      </div></el-col>
  </el-row>
  <!-- 表格数据 -->
  <d-table api="seePumaidongService.collegeManagerList" :params="queryForm" ref="companyTable" class="mt10 college-main" style="height:calc(100% - 40px)"   @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      :reserve-selection="true"
      width="55">
    </el-table-column>
    <el-table-column prop="title" label="标题" min-width="140" show-overflow-tooltip>
      <template slot-scope="scope">
        <span class="d-text-blue">{{scope.row.title}}</span>
      </template>
</el-table-column>
<el-table-column prop="cityName" min-width="140" label="城市" show-overflow-tooltip>
</el-table-column>
<el-table-column prop="issuerName" min-width="100" label="发布人" show-overflow-tooltip>
</el-table-column>
<el-table-column prop="createTime" label="发布时间" min-width="140" show-overflow-tooltip>
    <template slot-scope="scope">
        {{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}
      </template>
</el-table-column>
<el-table-column v-if="authorityButtons.includes('pmdwebset_contents_college_1006')" prop="remark" label="报名记录" min-width="140" show-overflow-tooltip>
    <template slot-scope="scope">
        <el-button size="medium" type="text"  @click="setCompany(scope.row)">查看记录</el-button>
        <span  v-if="scope.row.newNum>0"  class="d-text-red f12">new</span>
      </template>
</el-table-column>
<el-table-column align="left" label="操作" width="200" show-overflow-tooltip>
    <template slot-scope="scope">
        <el-button v-if="authorityButtons.includes('pmdwebset_contents_college_1002')" size="medium" type="text"  @click="updateCompany('edit',scope.row)">编辑</el-button>
        <el-button v-if="authorityButtons.includes('pmdwebset_contents_college_1003')" size="medium" type="text" @click="delCompany([scope.row.id])">删除</el-button>
      </template>
</el-table-column>
</d-table>
<!-- 新增 / 编辑 弹出框-->
<el-dialog :title="dialogMeta.title" :visible.sync="dialogMeta.visible" :width="dialogMeta.width" v-dialogDrag @close="closeBefore">
    <components :is="dialogMeta.component" :dialogMeta="dialogMeta" v-if="dialogMeta.visible" @submit="$refs.companyTable.reload()"></components>
</el-dialog>
</div>
</template>
<script>
import collegeAdd from './college-add'
import collegeRecord from './college-record'
export default {
  components: {
    collegeAdd,
    collegeRecord
  },
  data () {
    return {
      loading: false,
      // 查询表单
      queryForm: {
        // cityId: this.$local.fetch('cityInfo').id, // 城市
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      dialogMeta: {
        visible: false,
        width: '40%',
        title: '', // dialog标题
        component: '',
        data: '', // 编辑的时候存放数据
        type: '' // 是编辑还是新增
      },
      buttonsCode: [], // 按钮权限
      isLoad: false,
      tableList: [] // 多选数据
    }
  },
  methods: {
    // 配置公司
    setCompany (row) {
      this.dialogMeta.visible = true
      this.dialogMeta.type = ''
      this.dialogMeta.width = '720px'
      this.dialogMeta.title = '报名记录'
      this.dialogMeta.data = row
      this.dialogMeta.component = 'collegeRecord'
    },
    // 重置
    reset () {
      this.$refs.queryForm.resetFields()
      this.$refs.companyTable.reload()
    },
    // 初始化公司
    initCompany (row) {
      this.$confirm('确定初始化?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          if (row === row.sourceName === null || row.datasourceName === '') {
            this.$message({
              showClose: true,
              message: '请先配置数据源'
            })
            return
          }
          let params = {
            companyCode: row.companyCode,
            companyId: row.id
          }
          this.loading = true
          this.$api.companyInitService.initCompany(params)
            .then(res => {
              // 重新加载表格数据
              this.$refs.companyTable.reload()
            })
            .finally(() => {
              this.loading = false
            })
        })
    },
    // 编辑和新增用户
    updateCompany (type, data) {
      let title = '新增'
      if (type === 'edit') {
        title = '编辑'
      }
      this.dialogMeta.component = 'collegeAdd'
      if (type === 'check') {
        title = '查看消息'
        this.dialogMeta.component = 'collegeRecord'
      }
      this.dialogMeta.visible = true
      this.dialogMeta.type = type
      this.dialogMeta.width = '720px'
      this.dialogMeta.title = title
      this.dialogMeta.data = data
    },
    // 删除公司
    delCompany (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$api.seePumaidongService.collegeManagerDelete({
            ids: row
          })
            .then(res => {
              // 重新加载表格数据
              this.tableList = []
              this.$refs.companyTable.clearSelection()
              this.$refs.companyTable.reload()
            })
        })
    },
    // 获取权限
    getPower (val) {
      return this.buttonsCode.some(item => item === val)
    },
    handleSelectionChange (val) {
      this.tableList = []
      val[0] && val.map(item => {
        this.tableList.push(item.id)
      })
    },
    closeBefore () {
      if (this.dialogMeta.component === 'collegeRecord') {
        this.$refs.companyTable.reload()
      }
    }
  }
}
</script>
