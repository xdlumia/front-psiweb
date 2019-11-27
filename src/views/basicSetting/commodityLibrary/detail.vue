<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 14:07:33
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-26 15:37:28
 * @Description: description
 -->
<template>
  <sideDetail
    :visible.sync="showPop"
    @close="$emit('update:visible',false)"
    width="990px"
    v-loading="loading"
    :title="(rowData.name || rowData.goodsName) + ':' + (rowData.goodsCode || rowData.commodityCode)"
    class="good-detail"
  >
    <template slot="button" v-if="button">
      <el-button
        v-if="!(beginnForm && Object.keys(beginnForm).length)"
        size="mini"
        type="primary"
        @click="showBeginn = true"
      >期初库存</el-button>
      <el-button size="mini" type="primary" @click="showEdit = true">编辑</el-button>
      <el-button size="mini" type="danger" @click="deleteGood(rowData.id)">删除</el-button>
    </template>
    <div class="d-bg-gray" style="display: flex;margin:-40px -15px 10px">
      <el-image
        :src="rowData.goodsPic"
        style="width: 120px;height:120px;margin:20px;"
        fit="scale-down"
        :preview-src-list="[rowData.goodsPic]"
      >
        <div slot="error" class="image-slot">
          <el-image :src="noPic" style="width: 120px;height:120px;" fit="fit"></el-image>
        </div>
      </el-image>
      <!-- <img
        :src="rowData.goodsPic || noPic"
        style="width:120px;height:120px;object-fit: cover;margin:20px;"
      />-->
      <div style="display: flex;flex-direction: column;justify-content: space-around;margin:20px 0">
        <span>商品类别：{{rowData.categoryCode | dictionary('PSI_SP_KIND')}}</span>
        <span>商品分类：{{rowData.secondClassName}}</span>
        <span>商品规格：{{rowData.specOne}}</span>
        <span>商品配置：{{rowData.configName || '-'}}</span>
      </div>
    </div>
    <sideStatusbar style="margin:-10px -15px 10px" :status="status" />
    <el-tabs
      class="wfull hfull tabs-view tabs-view-good"
      style="height: calc(100vh - 270px)!important"
    >
      <el-tab-pane label="详情">
        <good :code="code" :disabled="true" ref="detail" @update="update"></good>
        <el-form
          size="mini"
          :model="beginnForm"
          disabled
          v-if="beginnForm && Object.keys(beginnForm).length"
        >
          <form-card title="期初库存（重要）">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="库房">
                  <el-input v-model="beginnForm.wmsName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="期初库存数量">
                  <el-input v-model="beginnForm.num"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="期初调价值（元）">
                  <el-input v-model="beginnForm.originalPriceAdjustment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="showEdit" title v-dialogDrag :show-close="false" width="1000px">
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">编辑商品</h3>
        <div>
          <el-button type="primary" size="mini" @click="saveGood">保存</el-button>
          <el-button size="mini" @click="showEdit=false">关闭</el-button>
        </div>
      </div>
      <good :code="code" :isEdit="true" @refresh="refresh" v-if="showEdit" ref="addGood"></good>
    </el-dialog>
    <opening-stock
      :visible.sync="showBeginn"
      ref="addPromotion"
      v-if="showBeginn"
      @inStorageSuccess="wmsinventorycommodityinitialinfoInfo"
      :rowData="rowData"
    ></opening-stock>
  </sideDetail>
</template>

<script>
import good from './add-good'
import openingStock from './opening-stock'
export default {
  components: {
    good,
    openingStock
  },
  props: {
    visible: Boolean,
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    code: {
      type: String,
      default: ''
    },
    button: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      noPic: require('@/assets/img/no-pic.png'),
      showEdit: false,
      showBeginn: false,
      loading: false,
      showPop: false,
      etailForm: {},
      status: [],
      beginnForm: {}
    }
  },
  mounted () {
    this.checkVisible();
    this.wmsinventorycommodityinitialinfoInfo()
  },
  watch: {
    visible () {
      this.checkVisible();
      this.wmsinventorycommodityinitialinfoInfo()
    }
  },
  methods: {
    saveGood () {
      this.$refs.addGood && this.$refs.addGood.saveGood()
    },
    wmsinventorycommodityinitialinfoInfo () {
      this.$api.seePsiWmsService.wmsinventorycommodityinitialinfoInfo(null, this.code).then(res => {
        this.beginnForm = res.data
      })
    },
    deleteGood (id) {
      this.$confirm(`是否删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.seeGoodsService.deleteGood({ id }).then(res => {
          this.$emit('refresh')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })

    },
    refresh () {
      this.$refs.detail.getGoodsDetailV2(this.code)
      this.showEdit = false
      this.$emit('reload')
    },
    update (temp) {
      this.rowData.categoryCode = temp.categoryCode
      this.rowData.secondClassName = temp.secondClassName
      this.rowData.specOne = temp.values[0].specOne
      this.rowData.goodsPic = temp.values[0].goodsPic
      this.rowData.name = temp.name
      this.rowData.goodsCode = temp.values[0].goodsCode
      this.status = [
        { label: '创建时间', value: temp.createTime, isTime: true },
        { label: '创建人', value: temp.creatorName },
        { label: '来源', value: temp.sourceFromCode, dictName: 'SP_SOURCE_FROM' }
      ]
    },
    checkVisible () {
      this.showPop = this.visible;
    }
  }
};
</script>
<style lang="scss" scoped>
.good-detail {
  /deep/ .tabs-view-good {
    height: calc(100vh - 240px) !important;
  }
}
</style>
