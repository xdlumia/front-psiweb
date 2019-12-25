<!--
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:44:55
 * @LastEditors  : 高大鹏
 * @LastEditTime : 2019-12-25 17:39:01
 * @Description: 商品分类
 -->
<template>
  <!-- 类目管理 -->
  <div v-loading="loading">
    <div class="cate" style="min-width:1256px;">
      <div class="cate-top">
        <el-button
          v-if="authorityButtons.includes('decorate_goods_classmgr_1001')"
          @click="fcateadd"
          type="primary"
          class="fr"
          size="mini"
        >新增</el-button>
      </div>
      <div class="jianTree" style="overflow-x:auto;">
        <div class="custom-tree-node mt20">
          <span class="b">分类名称</span>
          <div class="tree-node">
            <!--<span class="d-inline b">地市(2位)</span>-->
            <span class="b" style="display:inline-block;width:100px;">商品类别</span>
            <span class="b" style="display:inline-block;width:100px;">分类税率</span>
            <span class="b" style="display:inline-block;width:150px;">库存成本配置</span>
            <span class="b" style="display:inline-block;width:150px;">销售参考价配置</span>
            <span class="b" style="display:inline-block;width:100px;">分类创建人</span>
            <span class="b" style="display:inline-block;width:200px;">创建时间</span>
            <span
              v-if="authorityButtons.includes('decorate_goods_classmgr_1006')"
              class="b"
              style="display:inline-block;width:100px;"
            >是否有效</span>
            <span class="b ac" style="display:inline-block;width:230px;">操作</span>
          </div>
        </div>

        <div class="custom-tree-container cate-main" style="overflow-y:auto;max-height:600px;">
          <!-- lazy
          :load = "lazyTreeData"-->
          <el-tree
            class="mt10"
            node-key="id"
            :data="treeData"
            lazy
            accordion
            :default-expanded-keys="defalutOpenArr"
            :load="lazyTreeData"
            :indent="30"
            :props="defaultProps"
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <div class="tree-node">
                <span
                  class="d-elip"
                  style="display:inline-block;width:100px;"
                >{{ data.categoryCode | dictionary('PSI_SP_KIND') }}</span>
                <span
                  class="d-elip"
                  style="display:inline-block;width:100px;"
                >{{data.taxRate ? data.taxRate + '%' : '-'}}</span>
                <span class="d-elip" style="display:inline-block;width:150px;">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="data.inventoryPriceFormula"
                    placement="top"
                    v-if="data.inventoryPriceFormula"
                  >
                    <span>{{data.inventoryPriceFormula}}</span>
                  </el-tooltip>
                  <span v-else>-</span>
                </span>
                <span class="d-elip" style="display:inline-block;width:150px;">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="data.saleRefPriceFormula"
                    placement="top"
                    v-if="data.saleRefPriceFormula"
                  >
                    <span>{{data.saleRefPriceFormula}}</span>
                  </el-tooltip>
                  <span v-else>-</span>
                </span>
                <span class="d-elip" style="display:inline-block;width:100px;">{{data.creatorName}}</span>
                <span class="d-elip" style="width:200px;display:inline-block;">
                  <span>{{node.data.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
                </span>
                <span
                  v-if="authorityButtons.includes('decorate_goods_classmgr_1006')"
                  class="d-elip"
                  style="width:100px;display:inline-block;"
                >
                  <el-switch
                    v-model="node.data.isEnable"
                    active-value="1"
                    inactive-value="0"
                    active-color="#13ce66"
                    @change="() => fcateChange(node, data)"
                    inactive-color="#ff4949"
                  ></el-switch>
                </span>
                <span class="d-elip" style="width:230px;display:inline-block;">
                  <el-button
                    v-if="authorityButtons.includes('decorate_goods_classmgr_1002')"
                    :disabled="(node.data.parentId == null ? false : true) || (node.data.isEnable != 1)"
                    type="text"
                    size="mini"
                    icon="el-icon-plus"
                    @click="() => faddchild(data,'child',node)"
                  >新增子类</el-button>
                  <el-button
                    v-if="authorityButtons.includes('decorate_goods_classmgr_1003')"
                    class="ml20"
                    type="text"
                    size="mini"
                    icon="el-icon-edit"
                    @click="() => fcatehandel(data,'itself',node)"
                  >修改</el-button>
                  <el-button
                    v-if="authorityButtons.includes('decorate_goods_classmgr_1005')"
                    :disabled="node.data.isEnable != 1"
                    class="ml20"
                    type="text"
                    size="mini"
                    icon="el-icon-upload2"
                    @click="() => fcatetop(data,node)"
                  >置顶</el-button>
                  <el-button
                    v-if="authorityButtons.includes('decorate_goods_classmgr_1004')"
                    class="ml20"
                    type="text"
                    size="mini"
                    icon="el-icon-delete"
                    @click="() => fcatedelete(node, data)"
                  >删除</el-button>
                </span>
              </div>
            </span>
          </el-tree>
        </div>
      </div>

      <div class>
        <div class="block mt30">
          <el-pagination
            @current-change="curChangeHandle"
            :current-page.sync="firstForm.page"
            :page-size="firstForm.limit"
            layout="total, prev, pager, next"
            :total="tableCount"
          ></el-pagination>
        </div>
      </div>

      <el-dialog
        :title="titleHandel"
        :visible.sync="dialogVisible"
        width="519px"
        :before-close="handleClose"
      >
        <div class="p10">
          <!-- <div class="b ml30" style="height:30px;line-height:30px;">
            <span class="el-icon-warning f30 fl" style="color:#e6a23c;"></span>
            <span class="ml10 fl">分类新增成功后，不可更改及删除，请仔细核实分类信息！</span>
          </div>-->
          <el-form
            size="small"
            ref="form"
            :model="form"
            label-width="125px"
            :rules="rules"
            class="mt20"
          >
            <el-form-item size="small" label="选择类别" prop="categoryCode">
              <!-- <el-input placeholder="请输入分类名称" v-model="form.categoryCode"></el-input> -->
              <d-select
                :disabled="istype === 'child' || istype === 'itself'"
                v-model="form.categoryCode"
                dicCode="PSI_SP_KIND"
              ></d-select>
            </el-form-item>
            <el-form-item size="small" label="主分类名称" prop="className">
              <el-input
                :disabled="istype === 'child' || isEditChild"
                placeholder="请输入"
                v-model.trim="form.className"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="istype === 'child' || isEditChild"
              size="small"
              label="子分类名称"
              prop="childClassName"
            >
              <el-input placeholder="请输入" v-model.trim="form.childClassName"></el-input>
            </el-form-item>
            <el-form-item size="small" label="分类税率" prop="taxRate">
              <el-input placeholder="请输入" v-model="form.taxRate">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item
              size="small"
              label="库存成本公式"
              prop="inventoryPriceFormulaRatio"
              v-if="istype === 'child' || isEditChild"
            >
              <div style="display:flex;">
                <span style="white-space: nowrap;">采购均价*</span>
                <el-form-item prop="inventoryPriceFormulaRatio">
                  <el-input-number
                    controls-position="right"
                    :show-word-limit="false"
                    v-model.trim="form.inventoryPriceFormulaRatio"
                  ></el-input-number>
                </el-form-item>
                <span>+</span>
                <el-form-item prop="inventoryPriceFormulaFixedValue">
                  <el-input-number
                    controls-position="right"
                    :show-word-limit="false"
                    v-model.trim="form.inventoryPriceFormulaFixedValue"
                  ></el-input-number>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item
              size="small"
              label="销售参考价公式"
              prop="saleRefPriceFormulaRatio"
              v-if="istype === 'child' || isEditChild"
            >
              <div style="display:flex;" ref="saleFormula">
                <span style="white-space: nowrap;">销售均价*</span>
                <el-form-item prop="saleRefPriceFormulaRatio">
                  <el-input-number
                    controls-position="right"
                    :show-word-limit="false"
                    v-model.trim="form.saleRefPriceFormulaRatio"
                  ></el-input-number>
                </el-form-item>
                <span>+</span>
                <el-form-item prop="saleRefPriceFormulaFixedValue">
                  <el-input-number
                    controls-position="right"
                    :show-word-limit="false"
                    v-model.trim="form.saleRefPriceFormulaFixedValue"
                  ></el-input-number>
                </el-form-item>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitForm('form')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
export default {
  data () {
    return {
      isEnable: false,
      defaultProps: {
        children: 'children',
        label: 'className',
        isLeaf: 'leaf'
      },
      tableCount: 0,
      tableLimit: 5,
      tableCur: 1,
      dialogVisible: false,
      form: {
        id: null,
        categoryCode: '',
        taxRate: '',
        className: '',
        childClassName: '',
        parentid: null,
        inventoryPriceFormula: '',
        inventoryPriceFormulaRatio: 0,
        inventoryPriceFormulaFixedValue: 0,
        saleReferencePriceFormula: '',
        saleRefPriceFormulaRatio: 0,
        saleRefPriceFormulaFixedValue: 0
      },
      rules: {
        categoryCode: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        className: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        childClassName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        parentid: [
          { required: true, message: '请选择上级分类', trigger: 'change' }
        ],
        inventoryPriceFormulaRatio: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[-+]?\d{1,6}(\.\d{1,2})?$/, message: '请输入6位整数，两位小数', trigger: 'blur' }
        ],
        inventoryPriceFormulaFixedValue: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[-+]?\d{1,6}(\.\d{1,2})?$/, message: '请输入6位整数，两位小数', trigger: 'blur' }
        ],
        saleRefPriceFormulaRatio: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[-+]?\d{1,6}(\.\d{1,2})?$/, message: '请输入6位整数，两位小数', trigger: 'blur' }
        ],
        saleRefPriceFormulaFixedValue: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[-+]?\d{1,6}(\.\d{1,2})?$/, message: '请输入6位整数，两位小数', trigger: 'blur' }
        ],
        taxRate: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value > 100 || value < 0) {
                callback(new Error('请输入0-100，两位小数'))
              } else if (Number(value) === 100) {
                callback()
              } else if (!/^\d{1,2}(\.\d{1,2})?$/.test(value)) {
                callback(new Error('请输入0-100，两位小数'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      handel: false, // 点击的是新增还是编辑
      istype: '', // 区分点击的是添加子类还是编辑
      firstForm: { // 一级类目的参数
        page: 1,
        limit: 10
      },
      addchild: true,
      titleHandel: '新增子类',
      treeData: [],
      defalutOpenArr: [],
      dadnode: {},
      loading: false,
      resovle: '',
      treeId: '',
      treeClickData: [],
      treeClickNode: {},
      isEditChild: false
    }
  },
  components: {
  },
  computed: {
  },
  created () {
    // console.log(this.authorityButtons)
    this.fgoodsFirstClassList()
  },
  mounted () {
    this.form = Object.assign(this.form, {
      id: null,
      categoryCode: '',
      taxRate: '',
      className: '',
      childClassName: '',
      parentid: null
    })
  },
  watch: {
  },
  methods: {
    fgoodsFirstClassList () {
      this.defalutOpenArr = []
      this.$api.seeGoodsService.fgoodsFirstClassList(this.firstForm) // 获取物品一级类目
        .then(res => {
          this.loading = true
          const data = res.data || []
          this.treeData = data.map(item => {
            item.children = []
            return item
          })
          for (let i = 0; i < this.treeData.length; i++) {
            this.treeData[i].isEnable = this.treeData[i].isEnable.toString()
          }
          this.tableCount = res.count || ''
        }).finally(ero => {
          this.loading = false
        })
    },
    lazyTreeData (node, resovle) {
      this.dadnode = node
      this.resovle = resovle
      this.$api.seeGoodsService.fgetChildClassList({ id: node.data.id }) // 获取物品子类类目
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].isEnable = res.data[i].isEnable.toString()
            res.data[i].leaf = true
          }
          return resovle(res.data)
        }).finally(() => { })
    },
    fcateadd (data) { // 新增
      this.titleHandel = '新增'
      this.handel = true
      this.istype = null
      this.isEditChild = false
      this.dialogVisible = true
      // this.$refs.form && this.$refs.form.resetFields()
      this.form = Object.assign(this.form, {
        id: null,
        categoryCode: '',
        taxRate: '',
        className: '',
        childClassName: '',
        parentid: null
      })
      // this.form.handelClassName = ''// 清空
      // this.form.parentid = ''// 清空
    },
    fcateChange (node, data) { // 是否有效开关
      this.treeClickNode = node
      this.treeClickData = data
      if (data.isEnable == 1) { // 如果从无效改成有效
        this.loading = true
        this.$api.seeGoodsService.handelGoodsChild({ id: data.id, isEnable: data.isEnable }) //
          .then(res => {
            if (this.treeClickData.parentId) {
              this.fgoodsFirstClassList()
              this.$api.seeGoodsService.fgetChildClassList({ id: this.treeClickData.parentId }) // 获取物品子类类目
                .then(res => {
                  this.defalutOpenArr = [this.treeClickData.parentId]
                  node.parent.childNodes = []
                  node.parent.data.children = res.data.map(item => {
                    item.leaf = true
                    item.isEnable = item.isEnable.toString()
                    return item
                  })
                }).finally(() => { })

              // this.lazyTreeData(this.dadnode, this.resovle)
            } else {
              this.fgoodsFirstClassList()
            }
          }).finally(() => { this.loading = false })
      } else { // 从有效改成无效
        this.$confirm('分类设为无效后，选择或查询物品时，将不会再看到无效分类，您确认要把 ' + data.className + ' 分类设为无效么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$api.seeGoodsService.handelGoodsChild({ id: data.id, isEnable: data.isEnable }) //
            .then(res => {
              if (this.treeClickData.parentId) {
                this.fgoodsFirstClassList()
                this.$api.seeGoodsService.fgetChildClassList({ id: this.treeClickData.parentId }) // 获取物品子类类目
                  .then(res => {
                    this.defalutOpenArr = [this.treeClickData.parentId]
                    node.parent.childNodes = []
                    node.parent.data.children = res.data.map(item => {
                      item.leaf = true
                      item.isEnable = item.isEnable.toString()
                      return item
                    })
                  }).finally(() => { })

                // this.lazyTreeData(this.dadnode, this.resovle)
              } else {
                this.fgoodsFirstClassList()
              }
            }).finally(() => { this.loading = false })
        }).catch(() => { // 如果点了取消
          if (this.treeClickData.parentId) {
            this.fgoodsFirstClassList()
            this.$api.seeGoodsService.fgetChildClassList({ id: this.treeClickData.parentId }) // 获取物品子类类目
              .then(res => {
                node.parent.childNodes = []
                node.parent.data.children = res.data.map(item => {
                  item.leaf = true
                  item.isEnable = item.isEnable.toString()
                  return item
                })
              }).finally(() => { })
            // this.lazyTreeData(this.dadnode, this.resovle)
          } else {
            this.fgoodsFirstClassList()
          }
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    faddchild (data, type, node) { // 新增子类
      this.isEditChild = false
      this.titleHandel = '新增子类'
      this.treeClickNode = node
      this.treeClickData = data
      this.istype = type
      this.handel = false
      this.addchild = false
      this.dialogVisible = true
      this.$refs.form && this.$refs.form.resetFields()
      this.form.categoryCode = data.categoryCode
      this.form.className = data.className
      this.form.childClassName = ''
      this.form.taxRate = ''
      // this.form.handelClassName = ''// 清空
      this.treeId = data.id
    },
    fcatehandel (data, type, node) { // 修改
      this.titleHandel = '修改'
      console.log(data)
      console.log(node)
      this.isEditChild = !!data.parentId
      this.treeClickNode = node
      this.treeClickData = data
      this.istype = type
      this.handel = false
      this.addchild = false
      this.dialogVisible = true
      this.treeId = data.id
      this.form.className = data.className
      Object.keys(this.form).forEach(key => {
        this.form[key] = data[key]
      })
      if (this.isEditChild) {
        this.form.className = node.parent.label
        this.form.childClassName = data.className
      }
      // this.form.taxRate = data.taxRate
      // this.form.categoryCode = data.categoryCode
    },
    fcatetop (data, node) { // 置顶
      this.treeClickData = data
      this.$api.seeGoodsService.handelGoodsChild({ id: data.id, isTop: 1 }) //
        .then(res => {
          this.loading = true
          if (this.treeClickData.parentId) {
            this.$api.seeGoodsService.fgetChildClassList({ id: this.treeClickData.parentId }) // 获取物品子类类目
              .then(res => {
                this.loading = true
                for (let i = 0; i < res.data.length; i++) {
                  res.data[i].isEnable = res.data[i].isEnable.toString()
                  res.data[i].leaf = true
                }
                node.parent.childNodes = []
                node.parent.data.children = res.data || []
              }).finally(() => { this.loading = false })
          } else {
            this.fgoodsFirstClassList()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    fcatedelete (node, data) { // 删除
      this.treeClickNode = node
      this.treeClickData = data
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seeGoodsService.deleteGoodsInfo({ id: data.id }) //
          .then(res => {
            this.loading = true
            if (this.treeClickData.parentId) {
              this.$api.seeGoodsService.fgetChildClassList({ id: this.treeClickData.parentId }) // 获取物品子类类目
                .then(res => {
                  for (let i = 0; i < res.data.length; i++) {
                    res.data[i].isEnable = res.data[i].isEnable.toString()
                    res.data[i].leaf = true
                  }
                  // this.lazyTreeData(this.dadnode, this.resovle)
                  node.parent.childNodes = []
                  node.parent.data.children = res.data
                }).finally(() => { this.loading = false })
            } else {
              this.fgoodsFirstClassList()
            }
          }).finally(ero => {
            this.loading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    curChangeHandle (val) { // 分页
      this.fgoodsFirstClassList()
    },
    handleClose (done) { // 关闭弹框
      done()
    },
    submitForm (formName) { // 新增和编辑类目的弹框确定
      console.log(this.$refs.saleFormula.textContent)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false

          if (!this.handel) { // 编辑模式下，走修改接口
            if (this.istype === 'itself') { // 点击的是编辑n
              this.form.id = this.treeId
              if (this.isEditChild) {
                this.form.className = this.form.childClassName
              }
              this.$api.seeGoodsService.handelGoodsChild(this.form) //
                .then(res => {
                  this.loading = true
                  if (this.treeClickData.parentId) {
                    this.$api.seeGoodsService.fgetChildClassList({ id: this.treeClickData.parentId }) // 获取物品子类类目
                      .then(res => {
                        // this.treeClickNode.parent.data.children = [] //
                        for (let i = 0; i < res.data.length; i++) {
                          res.data[i].isEnable = res.data[i].isEnable.toString()
                          res.data[i].leaf = true
                        }
                        // this.lazyTreeData(this.dadnode, this.resovle)
                        this.treeClickNode.parent.childNodes = []
                        this.treeClickNode.parent.data.children = res.data
                      }).finally(() => { this.loading = false })
                  } else {
                    this.fgoodsFirstClassList()
                  }
                }).catch(ero => { })
            } else if (this.istype === 'child') { // 点击的是新增子类
              this.handel = false
              this.addchild = true
              this.$confirm('分类新增成功后，不可更改及删除，请仔细核实分类信息！您新增的子类名称为 ' + this.form.childClassName + ' ,所属分类为 ' + this.treeClickData.className + ' ，是否确认无误？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.loading = true
                this.form.parentId = this.treeId
                this.form.className = this.form.childClassName
                this.$api.seeGoodsService.saveGoodsChild(this.form) //
                  .then(res => {
                    this.$api.seeGoodsService.fgetChildClassList({ id: this.treeClickData.id }) // 获取物品子类类目
                      .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                          res.data[i].isEnable = res.data[i].isEnable.toString()
                          res.data[i].leaf = true
                        }
                        this.treeClickNode.childNodes = []
                        this.treeClickNode.data.children = res.data
                      }).finally(() => { this.loading = false })
                  }).catch(ero => { })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
            }
          } else if (this.handel) { // 新增
            this.$confirm('分类新增成功后，不可更改及删除，请仔细核实分类信息！您新增的分类名称为 ' + this.form.className + ' ，是否确认无误？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              this.$api.seeGoodsService.saveGoodsChild(this.form) //
                .then(res => {
                  this.fgoodsFirstClassList()
                })
                .finally(() => {
                  this.loading = false
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.cate {
  padding: 10px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-sizing: border-box;
  height: 100%;
}
.cate-top {
  height: 40px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-node .tree-node {
  width: 1200px;
}
.custom-tree-node .tree-node .d-inline {
  font-size: 14px;
}
.required-label::before {
  content: "*";
  color: #f56c6c;
  display: inline-block;
  margin-right: 4px;
}
</style>
<style>
.jianTree .el-tree-node__content {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
