<template>
  <el-container class="d-content main-content" v-loading="loading">
    <!-- 标签管理 -->
    <el-aside width="240px">
      <h3 style="border-bottom:1px solid #efefef; padding-bottom:5px;">标签管理</h3>
      <el-input
        v-model.trim="searchText"
        style="cursor: pointer;"
        placeholder="请输入字典名称"
        size="small"
        class="mt10"
      ></el-input>
      <ul class="diction-list mt10" style="height:calc(100% - 83px);overflow-y: auto">
        <li v-show="!dicData.length">没有数据</li>
        <li
          v-for="(item,index) of filterName"
          :class="{active:activeIndex==index}"
          @click="getDetailList(item,index)"
          :key="index"
        >{{item.name}}</li>
      </ul>
    </el-aside>

    <el-main>
      <!-- 标签名称 -->
      <div class="mb10 pb10 bb">
        <span>数据项管理 : {{activeName}} - {{queryForm.lamCode}}</span>
        <div class="fr">
          <span class="mr20">
            标签数量上限(
            <span class="d-text-red">{{defaultNumber}}</span> )
          </span>
          <span>
            标签选择数量：
            <el-input-number
              v-model="labelNumber"
              @change="changeTag"
              size="mini"
              :min="1"
              :max="defaultNumber"
            ></el-input-number>
          </span>
        </div>
      </div>
      <!-- 标签搜索 -->
      <el-form ref="queryForm" :inline="true" :model="queryForm" label-width="80px">
        <el-form-item label>
          <span class="el-form-item__label">数据项名称:</span>
          <el-input
            v-model.trim="queryForm.content"
            size="medium"
            placeholder="请输入名称搜索"
            class="w240"
          ></el-input>
          <!-- <el-select v-model="queryForm.state" size="medium" placeholder="启用/禁用">
              <el-option label="请选择" value=""></el-option>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
          </el-select>-->
          <el-button
            type="primary"
            size="medium"
            @click="$refs.tagsTable.reload"
            icon="el-icon-search"
          >查询</el-button>
          <el-button type="button" @click="resetTagTable" size="medium">重置</el-button>
          <el-button
            v-if="authorityButtons.includes('asystem_assist_label_1001')"
            type="button"
            icon="el-icon-plus"
            class="el-button--primary"
            @click="addOrEditHandle"
            size="medium"
          >新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 右侧table列表 -->
      <d-table
        api="seeHouseConfigService.getTagValueList"
        ref="tagsTable"
        :params="queryForm"
        style="height:calc(100% - 100px)"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="数据项名称" width="180" prop="content"></el-table-column>

        <!--暂时隐藏，不要删-->
        <!-- <el-table-column
            label="状态"
            width="180">
            <template slot-scope="scope" >
              <el-switch
                v-model="scope.row.isEnable"
                align="right"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus(scope.row)"
              ></el-switch>
            </template>
        </el-table-column>-->

        <el-table-column label="显示颜色" width="180">
          <template slot-scope="scope">
            <div class="block">
              <el-color-picker
                size="small"
                v-model="scope.row.updateColor"
                :show-alpha="false"
                :predefine="predefineColors"
                color-format="hex"
                @change="changeColor(scope.row)"
              ></el-color-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="authorityButtons.includes('asystem_assist_label_1002')"
              @click="addOrEditHandle(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="authorityButtons.includes('asystem_assist_label_1003')"
              @click="delTag(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </d-table>
      <!-- 标签添加和编辑 -->
      <el-dialog
        title="标签添加和编辑"
        :close-on-click-modal="false"
        :visible.sync="dicDialogVisible"
        width="550px"
      >
        <el-form
          v-loading="dialogLoading"
          class="pt10"
          size="small"
          :rules="rules"
          :model="addOrEditForm"
          ref="addOrEditForm"
          label-width="100px"
        >
          <el-form-item label="数据项名称:" prop="content">
            <el-input
              :maxlength="25"
              class="w320"
              v-model.trim="addOrEditForm.content"
              placeholder="请输入数据项名称"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态:">
                <el-switch class="fl"
                :active-value="1"
                :inactive-value="0"
                v-model="addOrEditForm.isEnable"
                >
              </el-switch>
          </el-form-item>-->
          <el-form-item label="颜色">
            <template>
              <div class="block">
                <span class="demonstration"></span>
                <el-color-picker
                  v-model="addOrEditForm.updateColor"
                  color-format="hex"
                  :show-alpha="false"
                ></el-color-picker>
              </div>
            </template>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <div class="ac">
            <el-button size="small" @click="dicDialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="savetag">保 存</el-button>
          </div>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'BusinessTag',
  data() {
    return {
      activeIndex: 0, // 标签下标
      searchText: '', // 标签搜索
      dialogVisible: false, // 新增编辑弹出框
      dialogTitle: '', // 弹出框名称
      dialogType: '', // dialog类型
      dictName: '',
      loading: true, // loading动画
      dialogLoading: false, // 新增或编辑弹出框
      activeName: '', // 当前选中项的名字
      defaultNumber: 20, // 默认的上限
      labelNumber: '', // 标签上限
      dicData: [],
      dicDialogVisible: false,
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      // 弹出框输入框验证
      rules: {
        content: [
          { required: true, message: '请输入标签名字,不能超过 25个字符', trigger: 'blur' },
          { min: 1, max: 25, message: '不能超过25个字符' }//eslint-disable-line
        ]
      },
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20,
        content: '',
        isEnable: '',
        lamCode: ''
      },
      // addOrEdit框内容
      addOrEditForm: {
        code: '',
        content: '',
        isEnable: true,
        lamCode: '',
        updateColor: ''
      },
      navData: [] // 所有权限码
    }
  },
  created() {
    // 初始拉取左侧标签项
    this.fnDicData()
  },
  computed: {
    filterName: function() {
      const self = this
      return this.dicData.filter((tag) => {
        return tag.name.indexOf(self.searchText) !== -1
      })
    }
  },
  methods: {
    resetTagTable() {
      this.queryForm.content = ''
      this.queryForm.state = ''
      // 刷新列表
      this.$refs.tagsTable.reload()
    },
    // 新增或编辑标签
    addOrEditHandle(index, row) {
      this.dicDialogVisible = true
      // row不存在表示新增
      if (row) {
        if (this.total == this.defaultNumber) {//eslint-disable-line
          this.$message.error('该标签添加已上限')
          return
        }
        this.addOrEditForm.code = row.code
        this.addOrEditForm.content = row.content
        this.addOrEditForm.isEnable = row.isEnable
        this.addOrEditForm.updateColor = row.updateColor
      } else {
        this.addOrEditForm.code = ''
        this.addOrEditForm.content = ''
        this.addOrEditForm.isEnable = true
        this.addOrEditForm.updateColor = '#409EFF'
      }
    },
    // 标签数量改变
    changeTag(val) {
      // console.log( this.lamCode )
      const params = {
        lamCode: this.queryForm.lamCode,
        labelNumber: this.labelNumber
      }
      this.$api.seeHouseConfigService.updateLabelToplimit(params)
        .then(res => {
          // 标签数量更改成功 更新标签里的值
          this.dicData[this.activeIndex].labelNumber = this.labelNumber
        })
    },
    // 保存数据字典
    savetag() {
      this.$refs['addOrEditForm'].validate((valid) => {
        if (valid) {
          const params = {
            code: this.addOrEditForm.code,
            content: this.addOrEditForm.content,
            isEnable: this.addOrEditForm.isEnable ? 1 : 0,
            updateColor: this.addOrEditForm.updateColor,
            lamCode: this.queryForm.lamCode
          }
          // 编辑的时候自动同步本地数据 不再重新拉数据
          this.fnSavetag(params)
        }
      })
    },
    // 编辑或者保存接口
    fnSavetag(params) {
      this.dialogLoading = true
      this.$api.seeHouseConfigService.editTag(params)
        .then(res => {
          this.dicDialogVisible = false // 关闭弹框
          this.$refs.tagsTable.reload()
        })
        .finally(res => {
          this.dicDialogVisible = false // 关闭弹框
          this.dialogLoading = false
        })
    },
    // 改变颜色
    changeColor(data) {
      const params = {
        code: data.code,
        content: data.content,
        state: data.state,
        isEnable: (data.isEnable == true) ? 1 : 0,//eslint-disable-line
        updateColor: data.updateColor,
        lamCode: this.lamCode,
        defaultColor: data.defaultColor
      }
      this.fnSavetag(params)
    },
    // 获取标签项详情
    getDetailList(data, index) {
      this.activeIndex = index
      this.queryForm.lamCode = data.code
      this.activeName = data.name
      this.labelNumber = data.labelNumber
      this.defaultNumber = Number(data.defaultNumber)
      // 加载当前字典数据项
      this.$refs.tagsTable.reload()
    },
    // 更改开关调用修改接口
    // changeStatus(data) {
    //   let params = {
    //     lamCode: this.lamCode,
    //     code: data.code,
    //     content: data.content,
    //     state: data.state,
    //     isEnable: data.isEnable,
    //     updateColor: data.updateColor,
    //   };
    //   this.fnSavetag(params)
    // },
    // 请求dicData数据
    fnDicData: function() {
      this.loading = true
      this.$api.seeHouseConfigService.getTagList()
        .then(res => {
          if (res.code == 200) {//eslint-disable-line
            this.dicData = res.data || [] // 加载数据
            this.queryForm.lamCode = res.data[0].code
            this.activeName = res.data[0].name
            this.labelNumber = res.data[0].labelNumber
            this.defaultNumber = Number(res.data[0].defaultNumber)
            // 如果当前标签没有权限不展示
            for (let i = 0; i < this.dicData.length; i++) {
              // 房间标签
              if (this.authorityButtons.indexOf('asystem_assist_label_1008') == '-1' && this.dicData[i].code == 'FJBQ') {//eslint-disable-line
                this.dicData.splice(i, 1)
              }
              // 户型标签
              if (this.authorityButtons.indexOf('asystem_assist_label_1009') == '-1' && this.dicData[i].code == 'HXBQ') {//eslint-disable-line
                this.dicData.splice(i, 1)
              }
              // 客户标签
              if (this.authorityButtons.indexOf('asystem_assist_label_1010') == '-1' && this.dicData[i].code == 'KHBQ') {//eslint-disable-line
                this.dicData.splice(i, 1)
              }
              // 楼盘标签
              if (this.authorityButtons.indexOf('asystem_assist_label_1011') == '-1' && this.dicData[i].code == 'LPBQ') {//eslint-disable-line
                this.dicData.splice(i, 1)
              }
            }
            // 刷新数据
            this.$refs.tagsTable.reload()
          }
        })
        .finally(res => {
          // 关闭loading
          this.loading = false
        })
    },
    // 右侧数据字典删除方法
    delTag(index, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$api.seeHouseConfigService.delTag(data.code)
            .then((res) => {
              // 刷新数据
              this.$refs.tagsTable.reload()
            })
        })
    }
  }
}
</script>
<style scoped>
.diction-list li {
  height: 38px;
  line-height: 38px;
  border-top: 1px solid #ebeef5;
  text-align: center;
  color: #606266;
  font-size: 13px;
  cursor: pointer;
}
.diction-list li:hover {
  cursor: pointer;
  color: #409eff;
}
.diction-list li.active {
  background: #ecf5ff;
}
</style>
