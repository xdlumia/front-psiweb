<!--
 * @Author: 高大鹏
 * @Date: 2019-10-31 15:40:26
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-31 15:44:44
 * @Description: description
 -->
<!-- "/**",
      "* 查看物品详情    物品管理组件",
      "* @author web-徐贺",
      "* @params ////",
      "* @date 2018年8月15日",
      "**/",
      "-->
<template>
   <div>
       <div class="checktop">
        <span class="d-text-blcak f18 b fl">查看物品</span>
        <el-button @click="faddStandard" type="primary" icon="el-icon-plus" size="small" class="mr10 fr">添加规格</el-button>
       </div>
       <div class='checkcenter wfull'>
            <el-row>
                <!-- 左 -->
                <el-col :span="12">
                    <div class="house-l">
                        <!--大轮播-->
                        <div class="swiper-container gallery-top">
                            <div class="sbig swiper-wrapper">
                                <div class="swiper-slide" v-for="(item,index) of picarr" :key="index"><img :src="item.picurl" alt=""></div>
                            </div>
                        </div>
                        <div class="swiper-container gallery-thumbs">
                            <div class="ssmall swiper-wrapper">
                                <div class="swiper-slide" v-for="(item,index) of picarr" :key="index"><img :src="item.picurl" alt=""></div>
                            </div>
                            <div
class="swiper-button-prev swiper-button-white"
style="
            background-image:none;"><span></span></div>
                            <div
class="swiper-button-next swiper-button-white"
style="
            background-image:none;"><span></span></div>

                    </div>
                    </div>
                </el-col>
                <!-- 右 -->
                <el-col :span="10" class="ml20">
                    <div class="mt10">
                        <span class="f18">{{goodsDetailForm.name}}</span>
                    </div>
                    <div class="mt10">
                        <span class="mr20">物品分类：{{goodsDetailForm.firstClassName}}/{{goodsDetailForm.secondClassName}}</span>
                        <div class="mr10">品牌：{{goodsDetailForm.brand}}</div>
                        <div class="mr10 mt5">编码：{{goodsDetailForm.goodsCode}}</div>
                    </div>
                    <div style="height:53px;line-height:53px;background:#F2F2F2;" class="ac mt10">
                        <span class="mr10 f16">参考价：<span class="d-text-red">{{goodsDetailForm.price}}</span></span>
                    </div>

                    <div class="mt15" v-if="standard[0]" >
                        <span>{{standard[0].name}}</span>
                        <div>
                            <el-radio-group @change="getGoodsInfoByIdAndSpec" v-model="radio1" size="small">
                                <el-radio-button style="margin-left:0px;" class="mb5" v-for="(item,index) of specOneArr" :key="index" :label="item" border>{{item}}</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>

                    <div class="mt15" v-if="standard[1]" >
                        <span>{{standard[1].name}}</span>
                        <div>
                            <el-radio-group @change="getGoodsInfoByIdAndSpec" v-model="radio2" size="small">
                                <el-radio-button style="margin-left:0px;" class="mb5" v-for="(item,index) of specTwoArr" :key="index" :label="item" border>{{item}}</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>

                    <div class="mt15" v-if="standard[2]" >
                        <span>{{standard[2].name}}</span>
                        <div>
                            <el-radio-group @change="getGoodsInfoByIdAndSpec" v-model="radio3" size="small">
                                <el-radio-button style="margin-left:0px;" class="mb5" v-for="(item,index) of specThreeArr" :key="index" :label="item" border>{{item}}</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>

                    <div class="mt15" v-if="standard[3]" >
                        <span>{{standard[3].name}}</span>
                        <div>
                            <el-radio-group @change="getGoodsInfoByIdAndSpec" v-model="radio4" size="small">
                                <el-radio-button style="margin-left:0px;" class="mb5" v-for="(item,index) of specFourArr" :key="index" :label="item" border>{{item}}</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>

                    <div class="mt15" v-if="standard[4]" >
                        <span>{{standard[4].name}}</span>
                        <div>
                            <el-radio-group @change="getGoodsInfoByIdAndSpec" v-model="radio5" size="small">
                                <el-radio-button style="margin-left:0px;" class="mb5" v-for="(item,index) of specFiveArr" :key="index" :label="item" border>{{item}}</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>

                    <div class="mt15 mb15">
                        <span>计量单位：{{goodsDetailForm.unit | dictionary('SC_JLDW')}}</span>
                    </div>
                </el-col>

            </el-row>
       </div>
       <div class="mt10">
           <span>商品介绍：{{goodsDetailForm.goodsDesc}}</span>
       </div>
       <!-- //添加规格的弹框 -->
       <div class="zhezhaonone">
            <el-dialog
            :modal-append-to-body='true'
            v-dialogDrag
            title="规格信息"
            :append-to-body='true'
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <!-- 新数据 -->
            <div>
                <!-- <div style="width:95%;height:48px;color:#909399;border:1px solid rgb(235, 235, 235);border-bottom:none" class="mt20 ml10">
                <div class="hfull ac b fl" style="line-height:48px;width:130px">
                    主图
                </div>
                <div v-for="(item,index) of standard" :key="index" class="hfull ac b fl" style="line-height:48px;width:120px">
                    {{item.name}}
                </div>
                <div class="hfull ac b fl" style="line-height:48px;width:130px">
                    商品编码
                </div>
                </div> -->
                <div class="goods-table">
                    <el-table
                    class="ml10"
                    style="width: 95%;border:1px solid #ebebeb;"
                    :data="goodsSpecs">
                    <el-table-column
                        label='主图'
                        align="center"
                        width="130">
                        <template slot-scope="scope">
                            <div class="goodspic1 ac d-pointer"  @click="getUrlIndex(scope.row)">
                                <img v-if="scope.row.goodsPic" style="height:100%" :src="scope.row.goodsPic"/>
                                <upload-pic v-else @addPictureUrl="addPictureUrl" style="height:100%" :limit="{size:'2M',type:['jpg','png','gif','jpeg']}" > </upload-pic>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        :label="standard[0].name"
                        align="center"
                        v-if="standard.length>=1"
                        width="120">
                        <template slot-scope="scope">
                            <div>
                                <el-input v-model="scope.row.specOne" placeholder="请输入" :disabled="scope.row.name ? true : false" size="small"></el-input>
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
                                <el-input v-model="scope.row.specTwo" placeholder="请输入" :disabled="scope.row.name ? true : false" size="small"></el-input>
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
                                <el-input v-model="scope.row.specThree" placeholder="请输入" :disabled="scope.row.name ? true : false" size="small"></el-input>
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
                                <el-input v-model="scope.row.specFour" placeholder="请输入" :disabled="scope.row.name ? true : false" size="small"></el-input>
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
                                <el-input v-model="scope.row.specFive" placeholder="请输入" :disabled="scope.row.name ? true : false" size="small"></el-input>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label='物品编码'
                        width="130"
                        align="center"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div>
                                <el-input v-model="scope.row.goodsCode" disabled placeholder="系统自动生成" size="small"></el-input>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center">
                        <template slot-scope="scope">
                            <div>
                                <el-button @click="fdeleteTable(scope.row)" v-if="!scope.row.name" icon="el-icon-delete" circle></el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
                <div class="goodsadd ml10 mt5 ac">
                    <el-button @click="addTableInfo" type="text" icon="el-icon-plus">添加</el-button>
                </div>

            </div>
            <!-- 旧数据 -->
            <div>
                <!-- <div style="width:95%;height:48px;color:#909399;border:1px solid rgb(235, 235, 235);border-bottom:none" class="mt20 ml10">
                <div class="hfull ac b fl" style="line-height:48px;width:130px">
                    主图
                </div>
                <div v-for="(item,index) of standard" :key="index" class="hfull ac b fl" style="line-height:48px;width:120px">
                    {{item.name}}
                </div>
                <div class="hfull ac b fl" style="line-height:48px;width:130px">
                    商品编码
                </div>
                </div> -->
                <div class="goods-table" style='margin-top:50px'>
                    <el-table
                    class="ml10"
                    style="width: 95%;border:1px solid #ebebeb;"
                    :data="values">
                    <el-table-column
                        align="center"
                        label="主图">
                        <template slot-scope="scope">
                            <div class="goodspic1 ac d-pointer">
                                <img v-if="scope.row.goodsPic" style="height:100%" :src="scope.row.goodsPic"/>
                                <upload-pic v-else @addPictureUrl="addPictureUrl" style="height:100%" :limit="{size:'2M',type:['jpg','png','gif','jpeg']}" > </upload-pic>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        :label="standard[0].name"
                        v-if="standard.length>=1">
                        <template slot-scope="scope">
                            <div>
                                <el-input disabled v-model="scope.row.specOne" placeholder="请输入" size="small"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="standard[1].name"
                        v-if="standard.length>=2"
                        align="center">
                        <template slot-scope="scope">
                            <div>
                                <el-input disabled v-model="scope.row.specTwo" placeholder="请输入" size="small"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="standard[2].name"
                        v-if="standard.length>=3"
                        align="center">
                        <template slot-scope="scope">
                            <div>
                                <el-input disabled v-model="scope.row.specThree" placeholder="请输入" size="small"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="standard[3].name"
                        v-if="standard.length>=4"
                        align="center">
                        <template slot-scope="scope">
                            <div>
                                <el-input disabled v-model="scope.row.specFour" placeholder="请输入" size="small"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="standard[4].name"
                        v-if="standard.length>=5"
                        align="center">
                        <template slot-scope="scope">
                            <div>
                                <el-input disabled v-model="scope.row.specFive" placeholder="请输入" size="small"></el-input>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        show-overflow-tooltip
                        label="物品编码">
                        <template slot-scope="scope">
                            <div>
                                <el-input v-model="scope.row.goodsCode" disabled placeholder="系统自动生成" size="small"></el-input>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
                </div>

            </div>

            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取消</el-button>
                <el-button size="small" type="primary" @click="fdragInfo">保存</el-button>
            </span>
            </el-dialog>
       </div>
   </div>
</template>

<script>
import uploadPic from '@/components/upload-file'
import Swiper from 'Swiper'
export default {
  name: 'Swiper',
  props: ['popupRight'],
  data() {
    return {
      radio1: '',
      radio2: '',
      radio3: '',
      radio4: '',
      radio5: '',
      specForm: {
        goodsSpecId: '', // 商品规格id
        specOne: '',
        specTwo: '',
        specThree: '',
        specFour: '',
        specFive: ''
      },
      dialogVisible: false,
      standard: [],
      picUrl: '',
      picqArr: [],
      goodsDetailForm: {
      },
      urlIndexForm: {},
      swiperIndex: 0,
      values: [],
      galleryTop: '',
      galleryThumbs: '',
      picarr: [], // 轮播图图片src
      specOneArr: [],
      specTwoArr: [],
      specThreeArr: [],
      specFourArr: [],
      specFiveArr: [],
      goodsSpecs: []// 新增的规格的数组
    }
  },
  components: {
    uploadPic
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.lunbo()
  },
  watch: {
  },
  methods: {
    getGoodsDetail() {
      this.standard = []
      this.specOneArr = []
      this.specTwoArr = []
      this.specThreeArr = []
      this.specFourArr = []
      this.specFiveArr = []
      this.values = []
      this.picarr = []
      this.goodsDetailForm.values = []
      this.$api.seeGoodsService.getAllGoods({ id: this.popupRight.goodsId }) // 查询物品详情包含所有规格
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].goodsCode === this.popupRight.goodsCode) {
              this.goodsDetailForm = res.data[i]
              this.specForm.goodsSpecId = this.goodsDetailForm.id
              this.radio1 = this.goodsDetailForm.specOne
              this.radio2 = this.goodsDetailForm.specTwo
              this.radio3 = this.goodsDetailForm.specThree
              this.radio4 = this.goodsDetailForm.specFour
              this.radio5 = this.goodsDetailForm.specFive
            }
            this.values.push(
              { goodsPic: res.data[i].goodsPic,
                specOne: res.data[i].specOne,
                specTwo: res.data[i].specTwo,
                specThree: res.data[i].specThree,
                specFour: res.data[i].specFour,
                specFive: res.data[i].specFive,
                goodsCode: res.data[i].goodsCode
              })
            this.picarr.push({ picurl: res.data[i].goodsPic })// 所有图片的src
            this.picqArr.push(res.data[i].goodsPic)
            if (res.data[i].specOne && this.specOneArr.indexOf(res.data[i].specOne) === -1) {
              this.specOneArr.push(res.data[i].specOne)
            }

            if (res.data[i].specTwo && this.specTwoArr.indexOf(res.data[i].specTwo) === -1) {
              this.specTwoArr.push(res.data[i].specTwo)
            }
            if (res.data[i].specThree && this.specThreeArr.indexOf(res.data[i].specThree) === -1) {
              this.specThreeArr.push(res.data[i].specThree)
            }
            if (res.data[i].specFour && this.specFourArr.indexOf(res.data[i].specFour) === -1) {
              this.specFourArr.push(res.data[i].specFour)
            }
            if (res.data[i].specFive && this.specFiveArr.indexOf(res.data[i].specFive) === -1) {
              this.specFiveArr.push(res.data[i].specFive)
            }
          }
          this.swiperIndex = this.picqArr.indexOf(this.goodsDetailForm.goodsPic)
          this.lunbo()
          if (this.goodsDetailForm.columns) {
            const piarr = JSON.parse(this.goodsDetailForm.columns)
            for (var key in piarr) {
              this.standard.push({ name: piarr[key] }) // 材质
            }
          }
        }).catch(ero => {})
    },
    lunbo() {
      this.galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      })
      this.galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        initialSlide: this.swiperIndex,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
      this.galleryTop.controller.control = this.galleryThumbs
      this.galleryThumbs.controller.control = this.galleryTop
    },
    faddStandard() { // 点击添加规格点击添加规格
      this.dialogVisible = true
    },
    fdragInfo() { // 添加规格弹框确定添加规格弹框确定
      if (this.goodsSpecs.length === 0) {
        this.$message({
          showClose: true,
          message: '请添加物品规格',
          type: 'error'
        })
        return false
      }
      this.$api.seeGoodsService.addGoodsSpec({ goodsSpecs: this.goodsSpecs }) //
        .then(res => {
          this.getGoodsDetail()
          this.$emit('fUpdate')
          this.dialogVisible = false
        }).catch(ero => {})
    },
    handleClose(done) { // 弹框关闭
      done()
    },
    getGoodsInfoByIdAndSpec() { // 点击各种材质，请求不同材质的详情
      this.specForm.specOne = this.radio1
      this.specForm.specTwo = this.radio2
      this.specForm.specThree = this.radio3
      this.specForm.specFour = this.radio4
      this.specForm.specFive = this.radio5
      this.$api.seeGoodsService.getGoodsInfoByIdAndSpec(this.specForm) //
        .then(res => {
          if (res.data !== null) {
            this.goodsDetailForm = res.data
            this.swiperIndex = this.picqArr.indexOf(this.goodsDetailForm.goodsPic)
            this.galleryThumbs.slideTo(this.swiperIndex, 500, false) // 定位到当前图片的下标，第三个参数是回调函数
          }
        }).catch(ero => {})
    },
    addPictureUrl(url) { // 上传图片
      this.urlIndexForm.goodsPic = url.url
    },
    getUrlIndex(row) { // 决定把图片插在那个位置
      this.urlIndexForm = row
    },
    addTableInfo() { // 点击主表格添加点击主表格添加
      this.goodsSpecs.push({
        goodsId: this.popupRight.goodsId,
        goodsPic: '',
        specOne: '',
        specTwo: '',
        specThree: '',
        specFour: '',
        specFive: ''
      })
    },
    fdeleteTable(row) { // 主表格点击删除
      this.goodsSpecs.splice(this.goodsSpecs.indexOf(row), 1)
    }
  }

}
</script>

<style scoped>
    .checktop{
        width: 100%;
        height: 40px;
        border-bottom:1px solid #F2F2F2;
    }
    .checkcenter{
        min-height: 400px;
        max-height: 590px;
        border-bottom:1px solid #F2F2F2;
    }
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
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
/* 拿过来的 */
.swiper-container {
        width: 100%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-slide {
    cursor: pointer;
    background-size: cover;
    background-position: center;
    }
    .gallery-top {
        height: 80%;
        width: 100%;
    }
    .gallery-thumbs {
        height: 20%;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }
    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }
 .sbig{
    width: 383px;
    height: 337px;
}
.swiper-container{
    position: relative;
}

.ssmall{
    width: 630px;
    height: 80px;
    left: -102px;
}
.sbig img{
    width: 383px;
    height: 337px;
}
.ssmall img{
    width: 120px;
    height: 80px;
    float: left;
    margin-right: 0px;
}
.gallery-thumbs .swiper-slide {
    position: relative;
    width: 18%;
    height: 100%;
}
.swiper-button-white{
    width: 30px;
    height: 80px;
    background: rgba(0,0,0,.7);
    margin-top: -40px;
}
.swiper-button-prev{
    left: 0px;
}
.swiper-button-prev span:before {
content: "";
position: absolute;
top: 50%;
left: 50%;
margin-left: 5px;
width: 15px;
height: 15px;
border-left: 2px solid #fff;
border-bottom: 2px solid #fff;
transform: translate(-50%, -50%) rotate(45deg);
}
.swiper-button-next{
    right: 0px ;
}
.swiper-button-next span:before{
content: "";
position: absolute;
top: 50%;
left: 22%;
margin-left: 5px;
width: 15px;
height: 15px;
border-right: 2px solid #fff;
border-top: 2px solid #fff;
transform: translate(-50%, -50%) rotate(45deg);
}
.house-l{
    width: 383px;
}
.swiper-check{position:absolute; right:0; bottom:0px; width: 40px; height: 40px;}

</style>
<style>

/* .zhezhaonone .el-dialog__wrapper{left:-1100px} */
/* .goods-table .has-gutter{display:none} */
</style>
