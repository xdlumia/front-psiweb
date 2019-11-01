<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:43:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-01 11:03:59
 * @Description: 商品管理
 -->
<template>
  <!-- 物品管理 -->
  <div class>
    <div class="d-content d-main">
      <div class="goods-top">
        <span class="f18 lh50 b">商品库</span>
        <div class="goods-shaixuan fr ac d-pointer d-relative mt10 ml10">
          <i @click="buildDrapDown = !buildDrapDown" class="iconfont icon-filter mr20"></i>
          <div v-if="buildDrapDown" class="d-absolute d-flex d-drapdown">
            <div class="wfull p10" style="background: #FFF;">
              <div class="wfull ac" style="border-bottom: 1px solid rgba(228, 228, 228, 1);">
                <span class="d-text-gray b">筛选</span>
                <i @click="buildDrapDown = false" class="el-icon-close fr f16 d-pointer"></i>
              </div>
              <div
                @click="clearAll"
                class="f13 d-text-qgray lh30"
                style="height: 30px;width: 100%;"
              >
                <span class="fl">
                  <i class="el-icon-search mr5"></i>物品筛选
                </span>
                <span class="f13 fr d-pointer d-text-blue">清除筛选</span>
              </div>
              <div class="mt5 mb5">
                <el-input
                  v-model="goodsForm.goodsCode"
                  class="bn"
                  placeholder="请输入物品编码"
                  size="small"
                  style="width: 100%;"
                >
                  <el-button @click="getGoodsList" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div class="mt10">
                <div class="d-text-qgray f13 fl" style="height:30px;">物品名称</div>
                <div>
                  <el-input
                    v-model="goodsForm.goodsName"
                    class="bn"
                    placeholder="请输入物品名称"
                    size="small"
                    style="width: 100%;"
                  >
                    <el-button @click="getGoodsList" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
              </div>

              <div class="mt10">
                <div class="d-text-qgray f13 fl" style="height:30px;">物品规格</div>
                <div>
                  <el-input
                    v-model="goodsForm.goodsSpec"
                    class="bn"
                    placeholder="请输入物品规格"
                    size="small"
                    style="width: 100%;"
                  >
                    <el-button @click="getGoodsList" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
              </div>

              <div class="mt10">
                <div class="d-text-qgray f13 fl" style="height:30px;">物品分类</div>
                <div>
                  <el-cascader
                    style="width: 100%;"
                    size="small"
                    change-on-select
                    :options="goodsClassifyList"
                    v-model="selectedOptions"
                    :props="props"
                    @change="handleChange"
                  ></el-cascader>
                </div>
              </div>
            </div>
          </div>
        </div>

        <el-button
          v-if="authorityButtons.includes('decorate_goods_mgr_1002')"
          @click="deleteGoodsList"
          size="medium"
          type="danger"
          style="margin-right:5px;margin-top:10px;"
          class="fr mr10 mt10"
        >删除</el-button>
        <el-button
          v-if="authorityButtons.includes('decorate_goods_mgr_1001')"
          size="medium"
          type="primary"
          @click="fhandelGoods('goodsAdd','add')"
          style="margin-right:5px;margin-top:10px;"
          class="fr mr5 mt10"
        >添加</el-button>
        <!-- 此需求暂不做,不要删 -->
        <el-button
          size="medium"
          type="primary"
          @click="exportExcel('goodsAdd','add')"
          style="margin-right:5px;margin-top:10px;"
          class="fr mr5 mt10 el-icon-upload2"
        >一键导出</el-button>
        <el-button
          size="medium"
          type="primary"
          @click="importExcel('importExcel','add')"
          style="margin-right:5px;margin-top:10px;"
          class="fr mr5 mt10 el-icon-download"
        >导入</el-button>
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
          </el-tabs>
        </div>
        <div style="flex:1">
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
            <el-table-column align="center" type="selection" min-width="55"></el-table-column>
            <el-table-column align="center" label="物品图片" min-width="120">
              <template slot-scope="scope">
                <div class="goodspic d-pointer">
                  <!-- <upload-pic @addPictureUrl="addPictureUrl" style="height:100%" :limit="{size:'2M',type:['jpg','png','gif','jpeg']}" > </upload-pic> -->
                  <img
                    v-if="scope.row.goodsPic"
                    :src="scope.row.goodsPic"
                    class="wfull"
                    v-img-view="'goodsManage'"
                  />
                  <span v-else>暂无图片</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="物品编码" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <span
                  @click="fcheckGoods('checkGoods',scope.row)"
                  class="d-text-blue d-pointer"
                >{{ scope.row.goodsCode }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="goodsCodeCustomer"
              label="商品编码"
              min-width="140"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="物品名称"
              min-width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="brand"
              label="品牌"
              min-width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="date"
              label="物品分类"
              min-width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class>{{ scope.row.firstClassName }}/{{ scope.row.secondClassName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单位" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.unit | dictionary('SC_JLDW')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="price"
              label="参考价"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column align="center" label="供应商" min-width="80">
              <template slot-scope="scope">
                <el-button
                  @click="fsupplierList('supplierList',scope.row)"
                  type="primary"
                  size="mini"
                >查看</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="80">
              <template slot-scope="scope">
                <el-button
                  v-if="authorityButtons.includes('decorate_goods_mgr_1003')"
                  @click="fhandelGoods('goodsAdd','handel',scope.row)"
                  size="mini"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="mt10 ac"
            @current-change="handleCurrentChange"
            :current-page.sync="goodsForm.page"
            :page-size="goodsForm.limit"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
// import uploadPic from '@/components/uploadPic'
import supplierList from './supplierList' // 供应商管理
import goodsAdd from './goodsAdd' // 新增/编辑物品
import checkGoods from './checkGoods' // 点击编码查看物品
import importExcel from './importExcel' // 物品导入
export default {
  data() {
    return {
      activeName: 'PSI_SP_KIND-1',
      multipleSelection: [],
      selectedOptions: [],
      picUrl: '',
      props: {
        value: 'id',
        label: 'className'
      },
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
        goodsCode: '', // 物品编码
        goodsName: '', // 物品名称
        goodsSpec: '', // 物品规格
        classId: ''// 物品分类id
      },
      goodsTable: [], // 物品列表
      goodsClassifyList: [], // 物品分类列表(下拉框用)
      categoryList: []
    }
  },
  components: {
    supplierList,
    goodsAdd,
    checkGoods,
    importExcel
  },
  computed: {
  },
  created() {
    this.getGoodsClassify()
    this.getGoodsList()
    this.getCategoryList()
  },
  watch: {
  },
  methods: {
    handleClick(name) {
      console.log(name)      
    },
    getCategoryList() {
      this.$api.seeDictionaryService.getDicCommonValueList('PSI_SP_KIND').then(res => {
        console.log(res)
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
