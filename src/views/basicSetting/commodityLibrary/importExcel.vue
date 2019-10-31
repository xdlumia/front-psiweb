/**
* 物品：导入物品组件
* @author web-徐贺
* @date 2018年11月8日
**/
<template>
  <div>
    <div style="height: 300px;" class='mt30 ml30 fl w30'>
      <div class='d-text-white d-bg-blue w30 h30 d-circle lh30'>1</div>
      <div class='d-bg-blue h100 mb10' style='width:2px;margin:0 auto'></div>
      <div class='d-text-white d-bg-blue w30 h30 d-circle lh30'>2</div>
      <div class='d-bg-blue h100 mb10' style='width:2px;margin:0 auto'></div>
      <div class='d-text-white d-bg-blue w30 h30 d-circle lh30'>3</div>
    </div>
    <div class='fl mt30 ml30' v-loading='isDisable'>
      <div class='b mt10'>下载模板</div>
      <el-button size="small" @click='downLoad' style='margin-top:40px'>下载导入物品数据模板</el-button>
      <div class='b' style='margin-top:50px'>上传表格</div>
      <el-row style='margin-top:40px'>
        <el-col :span='12'>
          <!--  :limit=45 -->
          <el-upload
              ref='upload'
              class='ml10'
              :multiple='false'
              :show-file-list='false'
              accept='.xlsx,.xls'
              style='display:inline-block'
              :action="window.g.ApiUrl.seeGoodsService + '/goods/upload'"
              :headers="headers"
              :data='PreviewFileVo'
              :on-success='upLoadSuccess'
              :on-error='upLoadError'
              :before-upload='beforeUpload'
              >
              <el-button size="small">添加表格(仅支持已下载的模板上传)</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <div class='b' style='margin-top:55px'>导入完成</div>
    </div>
    <!-- 信息错误的弹框 -->
       <div class="">
            <el-dialog
            :append-to-body='true'
            :modal-append-to-body='true'
            v-dialogDrag
            title="商品编码重复，请重新导入"
            :visible.sync="dialogVisible"
            width="38%"
            :before-close="handleClose">
            <div>
              <el-table
                :data="tableData"
                height="300"
                border
                style="width: 100%">
                <el-table-column
                  prop="goodsName"
                  label="物品名称"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="goodsCode"
                  label="物品编码">
                </el-table-column>
              </el-table>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
       </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      window: window,
      PreviewFileVo: {
        fileName: ''// 文件名
      },
      tableData: [],
      isDisable: false,
      // 导出失败弹框控制
      dialogVisible: false
    }
  },
  methods: {
    downLoad () { // 下载
      // 发送请求
      let params = 'token=' + localStorage.token + '&finger=' + localStorage.finger
      window.location.href = window.g.ApiUrl.seeGoodsService + '/goods/downloadTemplet?' + params
    },
    upLoadSuccess (response) {
      if (response.code == 200) {//eslint-disable-line
        // 成功上传
        this.$message({type: 'success', message: response.msg})
        this.isDisable = false
        this.PreviewFileVo.fileName = ''
        this.$emit('fUpdate', '')
      } else {
        this.isDisable = false
        if (response.data == null || response.data.length === 0) {
          // 加载失败，返回错误信息
          this.$message({type: 'error', message: response.msg})
        } else {
          // 上传编码重复,跳出弹框,加进数据
          this.tableData = response.data
          this.dialogVisible = true
        }
      }
    },
    upLoadError () {
      this.isDisable = false
      // 上传失败
      this.$message.error('上传失败')
    },
    beforeUpload (file) {
      this.isDisable = true
      this.PreviewFileVo.fileName = file.name
      return true
    },
    handleClose (done) { // 弹框关闭
      done()
    }
  },
  computed: {
    headers () {
      return {token: localStorage.token, finger: localStorage.finger}
    }
  }
}
</script>
