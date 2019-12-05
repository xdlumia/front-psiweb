<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:43:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-05 10:53:59
 * @Description: 商品管理
 -->
<template>
  <!-- 物品管理 -->
  <div class>
    <div class="d-content d-main">
      <div
        class="goods-top"
        style="display:flex;justify-content: space-between;align-items: center"
      >
        <span class="f18 lh50 b">商品库</span>
        <div style="display: flex;align-items: center;">
          <el-button
            v-if="authorityButtons.includes('decorate_goods_mgr_1001')"
            size="mini"
            type="primary"
            @click="handleAddGood('goodsAdd','add')"
            style="margin-right:5px;margin-top:10px;"
            class="mr5 mt10"
          >添加</el-button>
          <el-popover
            class="mr5 mt10"
            placement="bottom"
            v-model="filterPopover"
            trigger="click"
            width="250"
          >
            <el-link
              :underline="false"
              @click="filterPopover = false"
              class="el-icon-close close fr"
              style="margin-top:2px;"
              title="关闭"
            ></el-link>
            <dFilter
              v-model="goodsForm"
              :options="filterOptions"
              @change="goodsForm.page=1,getGoodsList()"
            />
            <el-button
              size="mini"
              class="tool-item"
              slot="reference"
              title="筛选"
              icon="iconfont icon-filter"
              style="padding:5px;"
            ></el-button>
          </el-popover>
        </div>
      </div>
      <div class="goods-wrapper">
        <div class="ba mr5 mt10 p10" style="flex:0 0 240px;box-sizing: border-box;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-for="(item, index) in categoryList"
              :key="index"
              :label="item.content"
              :name="item.code"
            ></el-tab-pane>
            <el-button type="text" @click="setCategory">全部</el-button>
            <el-tree
              ref="categoryTree"
              highlight-current
              node-key="id"
              :data="treeData"
              :props="props"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-tabs>
        </div>
        <div style="flex:1;width: calc(100% - 240px)">
          <el-table
            ref="multipleTable"
            border
            height="calc(100vh - 230px)"
            :data="goodsTable"
            tooltip-effect="dark"
            class="mt10"
            style="width: 100%;border:1px solid #ebebeb;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.configId"
                  type="text"
                  @click="copycode = scope.row.goodsCode,copy=true,visible = true"
                >复制新增</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品编号" min-width="160"
show-overflow-tooltip>
              <template slot-scope="scope">
                <span
                  @click="showDetailDialog(scope.row)"
                  class="d-text-blue d-pointer"
                >{{ scope.row.goodsCode }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="物品图片" width="140">
              <template slot-scope="scope">
                <!-- <upload-pic @addPictureUrl="addPictureUrl" style="height:100%" :limit="{size:'2M',type:['jpg','png','gif','jpeg']}" > </upload-pic> -->
                <el-image
                  :src="scope.row.goodsPic"
                  style="width: 80px;height:80px"
                  fit="scale-down"
                  :preview-src-list="[scope.row.goodsPic]"
                >
                  <div slot="error" class="image-slot">
                    <el-image :src="noPic" style="width: 60px;height:60px;" fit="fit"></el-image>
                  </div>
                </el-image>
                <!-- <img v-if="scope.row.goodsPic" :src="scope.row.goodsPic" class="wfull" />
                <span v-else style="white-space:nowrap;">暂无图片</span>-->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="categoryCode"
              label="商品类别"
              min-width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class>{{ scope.row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="date"
              label="商品分类"
              min-width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class>{{ scope.row.firstClassName }}/{{ scope.row.secondClassName }}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="name"
              label="商品名称"
              min-width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="specOne"
              label="商品规格"
              min-width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="configName"
              label="配置"
              min-width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="unit"
              align="center"
              label="单位"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">{{row.unit | dictionary('SC_JLDW')}}</template>
            </el-table-column>
            <el-table-column
              prop="taxRate"
              align="center"
              label="税率"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{scope.row.taxRate ? scope.row.taxRate + '%' : ''}}</template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="mt10 ac"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page.sync="goodsForm.page"
            :page-size="goodsForm.limit"
            :page-sizes="[15, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="visible" title v-dialogDrag
:show-close="false" width="1000px">
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">新增商品</h3>
        <div>
          <el-button type="primary" size="mini" @click="saveGood">保存</el-button>
          <el-button size="mini" @click="visible=false">关闭</el-button>
        </div>
      </div>
      <add-good @refresh="refresh" v-if="visible" ref="addGood"
:code="copycode" :copy="copy"></add-good>
    </el-dialog>
    <detail
      @refresh="showDetail=false,getGoodsList()"
      @reload="getGoodsList"
      v-if="showDetail"
      :code="code"
      :visible.sync="showDetail"
    ></detail>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
// import uploadPic from '@/components/uploadPic'
import detail from './detail'
import addGood from './add-good'
export default {
  data() {
    return {
      filterPopover: false,
      noPic: require('@/assets/img/no-pic.png'),
      copy: false,
      copycode: null,
      showDetail: false,
      visible: false,
      activeName: 'PSI_SP_KIND-1',
      multipleSelection: [],
      selectedOptions: [],
      picUrl: '',
      props: {
        value: 'id',
        label: 'className'
      },
      filterOptions: [
        { label: '商品编码', prop: 'goodsCode', default: true },
        { label: '商品名称', prop: 'goodsName', default: true },
        { label: '商品规格', prop: 'goodsSpec', default: true }
      ],
      currentPage1: 5,
      buildDrapDown: false,
      value: '',
      popupRight: {
        tlite: '',
        point: '',
        nWidth: '800px',
        type: 'add',
        dialogVisiblePopup: false,
        goodsCode: '',
        goodsId: ''
      },
      total: 0, // 总数
      goodsForm: {
        page: 1,
        limit: 15,
        categoryCode: 'PSI_SP_KIND-1', // 类目
        goodsCode: '', // 物品编码
        goodsName: '', // 物品名称
        goodsSpec: '', // 物品规格
        classId: ''// 物品分类id
      },
      goodsTable: [], // 物品列表
      goodsClassifyList: [], // 物品分类列表(下拉框用)
      categoryList: [],
      treeData: [],
      editId: '',
      rowData: null,
      code: ''
    }
  },
  components: {
    addGood,
    detail
  },
  computed: {
  },
  created() {
    this.getGoodsClassify()
    this.getGoodsList()
    this.getCategoryList()
    this.getGoodsClass()
  },
  watch: {
  },
  methods: {
    showDetailDialog(row) {
      this.showDetail = true
      this.rowData = row
      this.code = row.goodsCode
    },
    editGood(goodsCode) {
      this.editId = goodsCode
      this.visible = true
    },
    refresh() {
      this.visible = false
      this.getGoodsList()
    },
    saveGood() {
      this.$refs.addGood && this.$refs.addGood.saveGood()
    },
    setCategory() {
      this.$refs.categoryTree.setCurrentKey(null)
      this.goodsForm.categoryCode = this.activeName
      this.goodsForm.classId = null
      this.getGoodsList()
    },
    handleNodeClick(data, node) {
      this.goodsForm.classId = data.id
      this.goodsForm.categoryCode = null
      this.getGoodsList()
    },
    // 获取分类列表
    getGoodsClass() {
      this.$api.seeGoodsService.getGoodsClass({ categoryCode: this.activeName }).then(res => {
        this.treeData = res.data
      })
    },
    handleClick() {
      this.setCategory()
      this.getGoodsClass()
      // this.getGoodsList()
    },
    // 获取类目列表
    getCategoryList() {
      this.$api.seeDictionaryService.getDicCommonValueList('PSI_SP_KIND').then(res => {
        this.categoryList = res.data || []
      })
    },
    getGoodsList() { // 获取物品列表
      this.$api.seeGoodsService.getGoodsList(this.goodsForm) //
        .then(res => {
          this.goodsTable = res.data
          this.total = res.count
        }).catch(ero => { })
    },
    getGoodsClassify() { // 获取物品一级分类
      this.$api.seeGoodsService.fgoodsFirstClassList({ page: 1, limit: 15 }) // 获取物品一级类目
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].children = []
          }
          this.goodsClassifyList = res.data
        }).catch(ero => { })
    },
    handleSelectionChange(val) { // 表格复选框勾选
      this.multipleSelection = val
    },
    handleChange(value) { // 筛选条件点击
      if (value.length === 1) {
        const goodsid = value[0]
        this.$api.seeGoodsService.fgetChildClassList({ id: goodsid }) // 获取物品子类类目
          .then(res => {
            for (let i = 0; i < this.goodsClassifyList.length; i++) {
              if (goodsid === this.goodsClassifyList[i].id && res.data) {
                this.goodsClassifyList[i].children = res.data
              }
            }
          }).catch(ero => { })
      }
      this.goodsForm.classId = this.selectedOptions[this.selectedOptions.length - 1]
      this.getGoodsList()
    },
    addPictureUrl(url) { // 上传图片
      this.picUrl = url.url
    },
    // 导出模板
    exportExcel() {
      this.$confirm('是否一键导出物品数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送请求
        const params = 'token=' + localStorage.token + '&finger=' + localStorage.finger
        window.location.href = window.g.ApiUrl.seeGoodsService + '/goods/exportGoodsInfo?' + params
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        })
      })
    },
    // 导入模板
    importExcel(popname) {
      this.popupRight.dialogVisiblePopup = !this.popupRight.dialogVisiblePopup
      this.popupRight.point = popname
      this.popupRight.tlite = '导入物品'
    },
    handleCurrentChange(val) { // 分页点击
      this.goodsForm.page = val
      this.getGoodsList()
    },
    handleSizeChange(val) {
      this.goodsForm.limit = val
      this.getGoodsList()
    },
    deleteGoodsList() { // 批量删除
      const ids = []
      this.multipleSelection.forEach(element => {
        ids.push(element.id)
      })
      if (ids.length !== 0) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.seeGoodsService.deleteGoodsList({ ids: ids })
            .then(res => {
              this.getGoodsList()
            }).catch(ero => { })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'error',
          message: '请选择要删除的物品'
        })
      }
    },
    clearAll() { // 清除筛选
      this.goodsForm = {
        page: 1,
        limit: 15,
        goodsCode: '', // 物品编码
        goodsName: '', // 物品名称
        goodsSpec: '', // 物品规格
        classId: ''// 物品分类id
      }
      this.selectedOptions = []
      this.getGoodsList()
    },
    fsupplierList(popname, row) { // 点击查看
      this.popupRight.dialogVisiblePopup = !this.popupRight.dialogVisiblePopup
      this.popupRight.point = popname
      this.popupRight.goodsCode = row.goodsCode

      setTimeout(() => { // 触发子组件方法
        this.$refs[this.popupRight.point].getSuppliersByGoodsId()
      }, 50)
    },
    handleAddGood() {
      this.copy = false
      this.copycode = null
      this.visible = true
    },
    fhandelGoods(popname, type, row) { // 点击新增或者编辑
      this.popupRight.dialogVisiblePopup = !this.popupRight.dialogVisiblePopup
      this.popupRight.point = popname
      if (type === 'add') {
        this.popupRight.type = 'add'
        this.popupRight.tlite = '新增物品'
      } else {
        this.popupRight.type = 'handel'
        this.popupRight.tlite = '编辑物品'
      }
      if (row) {
        this.popupRight.goodsCode = row.goodsCode
        setTimeout(() => { // 触发子组件方法，先获取一级类目
          this.$refs[this.popupRight.point].getGoodsInfo()
        }, 50)
      } else {
        setTimeout(() => { // 触发子组件方法
          this.$refs[this.popupRight.point].getupdateform()
        }, 50)
      }
    },
    fcheckGoods(popname, row) { // 点击编码查看
      this.popupRight.dialogVisiblePopup = !this.popupRight.dialogVisiblePopup
      this.popupRight.point = popname
      this.popupRight.goodsCode = row.goodsCode
      this.popupRight.goodsId = row.goodsId
      setTimeout(() => { // 触发子组件方法
        this.$refs[this.popupRight.point].getGoodsDetail()
      }, 50)
    },
    runSubsetRight() { // 新增/编辑确定按钮
      if (this.popupRight.type === 'add') {
        setTimeout(() => { // 触发子组件方法
          this.$refs[this.popupRight.point].saveGoodsInfo()
        }, 50)
      } else {
        setTimeout(() => { // 触发子组件方法
          this.$refs[this.popupRight.point].editGoodsInfo()
        }, 50)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.goods-wrapper {
  display: flex;
}
.d-content {
  .goods-top {
    width: 100%;
    height: 50px;
  }
  .goods-shaixuan {
    display: inline-block;
    width: 36px;
    height: 34px;
    line-height: 36px;
    color: #409eff;
  }
}
.goodspic {
  width: 40px;
  height: 30px;
  margin: 0 auto;
  .upload {
    width: 100% !important;
    height: 100% !important;
  }
}
.d-drapdown {
  width: 250px;
  height: 463px;
  border: 1px solid #ebeef5;
  z-index: 2;
  left: -211px;
  top: 38px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
