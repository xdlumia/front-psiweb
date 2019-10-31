<!--
 * @Author: 高大鹏
 * @Date: 2019-10-31 15:40:26
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-31 15:44:15
 * @Description: description
 -->
<!-- "/**",
      "* 物品新增/编辑    物品管理组件",
      "* @author web-徐贺",
      "* @params ////",
      "* @date 2018年8月15日",
      "**/",
      "-->
<template>
    <div>
       <span class="d-text-blcak f18 b"><span v-if="popupRight.type === 'add'">添加物品</span><span v-else>编辑物品</span></span>
       <div>
        <el-form ref="addGoodsform" :model="addGoodsform" label-width="80px" size="small" class="mt10" style="border-top:1px solid #F2F2F2" :rules="rules">
            <el-form-item label="物品名称" class="mt20" prop="name">
                <el-input v-model="addGoodsform.name" placeholder="请输入物品名称" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="物品分类" prop="classIddArr">
                <el-cascader
                    style="width: 60%;"
                    size="small"
                    change-on-select
                    :options="goodsClassifyList"
                    v-model="addGoodsform.classIddArr"
                    :props="props"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="计量单位" prop="unit">
                <el-select v-model="addGoodsform.unit" placeholder="请选择计量单位" style="width:60%">
                    <el-option v-for="(item,index) of dictionaryOptions('SC_JLDW')" :key="index" :label="item.content" :value="item.code"></el-option>
                </el-select>
            </el-form-item>

            <el-button v-if="popupRight.type === 'add' && authorityButtons.includes('decorate_goods_mgr_1004')" @click="faddStandard" type="primary" icon="el-icon-plus" size="small" class="ml10" style="margin-bottom:20px;">添加规格</el-button>
            <!-- <div style="width:726px;height:48px;color:#909399;border:1px solid rgb(235, 235, 235);border-bottom:none" class="mt20 ml10">
              <div class="hfull ac b fl" style="line-height:48px;width:130px">
                主图
              </div>
              <div v-for="(item,index) of standard" :key="index" class="hfull ac b fl" style="line-height:48px;width:120px">
                {{item.name}}
              </div>
              <div class="hfull ac b fl" style="line-height:48px;width:150px">
                商品编码
              </div>
              <div class="hfull ac b fl" style="line-height:48px;width:130px">
                物品编码
              </div>
            </div> -->
            <div class="goods-table">
            <el-table
                class="ml10"
                style="width: 95%;border:1px solid #ebebeb;"
                :data="addGoodsform.values">
                <el-table-column
                    align="center"
                    label="主图"
                    width="130">
                    <template slot-scope="scope">
                        <div class="goodspic1 ac d-pointer" @click="getUrlIndex(scope.row)" style="position:relative">
                        <!-- v-if="scope.row.goodsPic"-->    <img style="height:100%" :src="scope.row.goodsPic"/>
                            <i class="el-icon-plus" v-if="!scope.row.goodsPic" style="position:absolute;top:17px;color:#FFF;left:37px;"></i>
                            <upload-pic @addPictureUrl="addPictureUrl" style="height:100%;position:absolute;top:0;" :limit="{size:'2M',type:['jpg','png','gif','jpeg']}"> </upload-pic>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    align="center"
                    :label="standard[0].name"
                    v-if="standard.length>=1"
                    width="120">
                    <template slot-scope="scope">
                        <div>
                            <el-input v-model="scope.row.specOne" placeholder="请输入" :disabled="popupRight.type !== 'add' ? true : false" size="small"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="standard[1].name"
                    v-if="standard.length>=2"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <div>
                            <el-input v-model="scope.row.specTwo" placeholder="请输入" :disabled="popupRight.type !== 'add' ? true : false" size="small"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="standard[2].name"
                    v-if="standard.length>=3"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <div>
                            <el-input v-model="scope.row.specThree" placeholder="请输入" :disabled="popupRight.type !== 'add' ? true : false" size="small"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="standard[3].name"
                    v-if="standard.length>=4"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <div>
                            <el-input v-model="scope.row.specFour" placeholder="请输入" :disabled="popupRight.type !== 'add' ? true : false" size="small"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="standard[4].name"
                    v-if="standard.length>=5"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <div>
                            <el-input v-model="scope.row.specFive" placeholder="请输入" :disabled="popupRight.type !== 'add' ? true : false" size="small"></el-input>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    width="150"
                    align="center"
                    label="商品编码"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>
                            <el-input v-model="scope.row.goodsCodeCustomer" placeholder="请输入商品编码" size="small"></el-input>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    width="130"
                    align="center"
                    label="物品编码"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>
                            <el-input v-model="goodscode" disabled placeholder="系统自动生成" size="small"></el-input>
                        </div>
                    </template>
                </el-table-column>

                 <el-table-column
                 v-if="popupRight.type === 'add'"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button @click="fdeleteTable(scope.row)" icon="el-icon-delete" circle></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            <div>
              <span class="d-text-qgray ml10">
                图片支持.jpg/.png/.jpeg格式，最大不超过10M。
              </span>
            </div>
            <div class="goodsadd ml10 mt5 ac" v-if="popupRight.type === 'add'">
                <el-button @click="addTableInfo" type="text" icon="el-icon-plus">添加</el-button>
            </div>

            <el-form-item label="品牌" class="mt30" prop='brand'>
                <el-input placeholder="请输入" v-model="addGoodsform.brand" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item
label="参考价"
class="mt20"
prop='price'
:rules="[
              { required: false, message: '请输入参考价格', trigger: 'blur' },
              {type: 'price', message: '', trigger: 'blur'}
            ]">
                <el-input placeholder="请输入" v-model="addGoodsform.price" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="商品介绍" prop="goodsDesc">
                <el-input placeholder="请输入" type="textarea" v-model="addGoodsform.goodsDesc"></el-input>
            </el-form-item>
        </el-form>
       </div>

       <!-- //添加规格的弹框 -->
       <div class="">
            <el-dialog
            :append-to-body='true'
            :modal-append-to-body='true'
            v-dialogDrag
            title="规格信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div>
                <div>
                    <span>规格：</span>
                </div>
                <div v-for="(item,index) of standardTable" :key="index">
                    <el-input size="small" v-model="item.name" style="width:60%"></el-input>
                    <i @click="deleteDragInfo(index)" class="el-icon-remove-outline f22 ml5 mt5 d-text-qgray d-pointer"></i>
                </div>
                <div class="goodsadd mt5 ac" style="width:60%;height:30px;line-height:30px;">
                    <el-button @click="addDragInfo" type="text" icon="el-icon-plus">添加</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="fdragInfo">确 定</el-button>
            </span>
            </el-dialog>
       </div>

    </div>
</template>

<script>
/* eslint-disable eqeqeq */
import uploadPic from '@/components/upload-file'
export default {
  props: ['popupRight'],
  data() {
    return {
      tableData3: [],
      values: [{ 'goodsPic': '', 'specOne': '金色', 'specTwo': '金属' }, { 'goodsPic': 'bbb.jpg', 'specOne': '黑色', 'specTwo': '金属' }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      addGoodsform: {
        goodsCodeCustomer: '',
        brand: '', // 品牌
        classIdd: [], // 分类id数组
        classIddArr: [], // 分类id数组
        classId: '',
        goodsPic: '',
        columns: '', // 列名
        goodsDesc: '', // 商品介绍
        name: '', // 物品名称
        price: '', // 价格
        unit: '', // 物品单位
        originalGoodsCodeCustomer: '', // 原始商品编码，作对比，方便后端去重
        values: [] // 物品规格值列表
      },
      goodsClassifyList: [], // 物品分类列表(下拉框用)
      selectedOptions: [],
      standardTable: [],
      rules: {
        name: [
          { required: true, message: '请输入物品名称', trigger: 'blur' }
        ],
        classIddArr: [
          { required: true, message: '请选择物品分类', trigger: 'change' }
        ],
        unit: [
          { required: true, message: '请选择计量单位', trigger: 'change' }
        ],
        goodsDesc: [
          { required: false, message: '', trigger: 'blur' },
          { min: 0, max: 140, message: '长度不能超过140个字符', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ]
      },
      props: {
        value: 'id',
        label: 'className'
      },
      picUrl: '',
      input: '',
      urlIndexForm: {},
      dialogVisible: false,
      goodscode: '', // 物品编码
      goodsCodeCustomer: '', // 商品编码
      standard: [] // 规格添加与删除
    }
  },
  computed: {
  },
  components: {
    uploadPic
  },
  created() {
    this.getGoodsClassify()
  },
  watch: {
  },
  methods: {
    getGoodsInfo() {
      this.standard = []
      this.$api.seeGoodsService.getGoodsDetail({ code: this.popupRight.goodsCode }) // 查看物品详情
        .then(res => {
          if (res.data.columns) {
            const piarr = JSON.parse(res.data.columns)
            for (var key in piarr) {
              this.standard.push({ name: piarr[key] })
            }
          }
          this.addGoodsform = res.data
          this.addGoodsform.values = []
          this.addGoodsform.values.push(
            { goodsPic: res.data.goodsPic,
              specOne: res.data.specOne,
              specTwo: res.data.specTwo,
              specThree: res.data.specThree,
              specFour: res.data.specFour,
              specFive: res.data.specFive,
              goodsCodeCustomer: res.data.goodsCodeCustomer
            })
          this.addGoodsform.originalGoodsCodeCustomer = res.data.goodsCodeCustomer
          this.addGoodsform.classIddArr = []
          this.goodscode = this.addGoodsform.goodsCode
          this.$api.seeGoodsService.fgetChildClassList({ id: res.data.firstClassId }) // 获取物品子类类目
            .then(ress => {
              for (let i = 0; i < this.goodsClassifyList.length; i++) {
                if (res.data.firstClassId === this.goodsClassifyList[i].id && ress.data) {
                  this.goodsClassifyList[i].children = ress.data
                }
              }
            }).catch(ero => {})
          this.addGoodsform.classIddArr.push(res.data.firstClassId, res.data.secondClassId)
          // console.log(this.addGoodsform.classIddArr, this.goodsClassifyList)
        }).catch(ero => {})
    },
    getupdateform() { // 点击进来清空
      this.standard = []
      this.addGoodsform = {
        brand: '', // 品牌
        classIdd: [], // 分类id数组
        classIddArr: [],
        classId: '',
        columns: '', // 列名
        goodsDesc: '', // 商品介绍
        name: '', // 物品名称
        price: '', // 价格
        unit: '', // 物品单位
        values: [] // 物品规格值列表
      }
      this.$nextTick(() => {
        this.$refs['addGoodsform'].resetFields()
      })
    },
    saveGoodsInfo() { // 新增保存物品
      const arr = []
      this.$refs['addGoodsform'].validate((valid) => {
        if (valid) {
          if (this.standard.length !== 0) {
            for (let i = 0; i < this.standard.length; i++) {
              arr.push(this.standard[i].name)
            }
          }
          this.addGoodsform.columns = arr.join(',')
          if (this.addGoodsform.values.length === 0) {
            this.$message.error('请至少添加一个规格')
          } else {
            const _classId = [...this.addGoodsform.classIddArr]
            this.addGoodsform.classId = _classId.pop()
            this.$api.seeGoodsService.saveGoodsInfo(this.addGoodsform) // 新增物品保存
              .then(res => {
                this.popupRight.dialogVisiblePopup = false
                this.$emit('fUpdate', '')
                this.standard = []
              }).catch(ero => {})
          }
        } else {
          return false
        }
      })
    },
    editGoodsInfo() {
      const _classId = [...this.addGoodsform.classIddArr]
      this.addGoodsform.classId = _classId.pop()
      this.addGoodsform.goodsCodeCustomer = this.addGoodsform.values[0].goodsCodeCustomer
      this.$api.seeGoodsService.editGoodsInfo(this.addGoodsform) // 物品编辑保存
        .then(res => {
          this.popupRight.dialogVisiblePopup = false
          this.$emit('fUpdate', '')
          this.standard = []
        }).catch(ero => {})
    },
    getUrlIndex(row) { // 决定把图片插在那个位置
      this.urlIndexForm = row
    },
    addPictureUrl(url) { // 上传图片
      this.urlIndexForm.goodsPic = url.url
      this.addGoodsform.goodsPic = url.url
      console.log(this.urlIndexForm.goodsPic)
    },
    addTableInfo() { // 点击主表格添加
      this.addGoodsform.values.push({ goodsPic: '', specOne: '', specTwo: '', specThree: '', specFour: '', specFive: '', goodsCodeCustomer: '' })
    },
    fdeleteTable(row) { // 主表格点击删除
      this.addGoodsform.values.splice(this.tableData3.indexOf(row), 1)
    },
    faddStandard() { // 点击添加规格
      this.standardTable = []
      for (const i of this.standard) {
        this.standardTable.push(i)
      }
      //   this.standard = this.standardTable
      this.dialogVisible = true
    },
    handleClose(done) { // 弹框关闭
      done()
    },
    addDragInfo() { // 新增规格里的添加
      if (this.standardTable.length < 5) {
        this.standardTable.push({ name: '' })
      } else {
        this.$message.error({
          message: '物品规格最多添加五条！'
        })
      }
    },
    deleteDragInfo(index) {
      this.standardTable.splice(index, 1)
    },
    fdragInfo() { // 添加材质弹框确定
      this.dialogVisible = false
      // this.standard = this.standardTable
      this.standard = []
      for (const i of this.standardTable) {
        this.standard.push(i)
        // console.log(i, this.standard)
      }
    },
    getGoodsClassify() { // 获取物品一级分类
      this.$api.seeGoodsService.fgoodsFirstClassList({ page: 1, limit: 100 }) // 获取物品一级类目
        .then(res => {
          console.log(res)
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].children = []
          }
          this.goodsClassifyList = res.data
        }).catch(ero => {})
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
          }).catch(ero => {})
      }
    }
  }
}
</script>

<style scoped>
.goodsadd{
    width: 95%;
    height: 35px;
    border:1px dashed #dcdfe6;
    line-height: 35px;
    border-radius: 4px;
}
.goodspic1{
    width: 90px;
    height: 50px;
    line-height: 50px;
    background: skyblue;
  }
.goodspic1 .upload{
      width: 100% !important;
      height: 100% !important;
    }

</style>
<style>
.v-modal{z-index: 9 !important;}
.zhezhaonone .el-dialog__wrapper{left:-1100px}
/* .goods-table .has-gutter{display:none} */
.goodspic1 .ac .el-icon-upload{opacity: 0;}
</style>
