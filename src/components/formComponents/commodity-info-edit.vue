/*
 * @Author: 徐贺
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-29 16:16:52
 * @Description: 商品信息 可编辑
*/  
<template>
  <form-card
    class="borrow-goods-info"
    title="商品信息"
  >
    <div slot="title">
      <span>商品信息</span>
    </div>
    <el-table
      show-summary
      sum-text='总计'
      border
      :summary-method="getSummaries"
      :data="tableData"
      max-height="400"
      ref="elTable"
      :row-key="addForm.type == 1 ? 'commodityCode' : 'snCode'"
      :load="load"
      lazy
      size="mini"
      :tree-props="{children: 'children', hasChildren: 'configId'}"
    >
      <el-table-column
        fixed
        min-width="50"
        prop="name"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="80"
        prop="name"
      >
        <!-- v-if='scope.row.noChildren' v-if='scope.row.commodityCode'-->
        <template
          slot-scope="scope"
          v-if='scope.row.commodityCode'
        >
          <span v-if='!scope.row.quotationId'>
            <!-- <i
              class='el-icon-circle-plus f18 d-text-blue d-pointer'
              @click="appand(scope)"
            ></i> -->
            <i
              class='el-icon-remove f18 d-text-qgray ml5 d-pointer'
              @click="deleteInfo(scope)"
            ></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品编号"
        min-width="150"
      >
        <template
          slot-scope="scope"
          class="d-relative"
        >
          <!-- 报溢的话 需要选择库房以后再选 商品, 要传过去库房id, 商品是跟库库房来的 报损不需要 -->
          <commoditySelector
            :disabled='!!scope.row.quotationId'
            v-if="addForm.wmsId"
            :sn="addForm.type == 2 ? true : false"
            :params="addForm.type == 2 ? {wmsId:addForm.wmsId} : {wmsId:''}"
            @choose='commodityChoose(arguments,scope)'
            type="code"
            v-model="scope.row.commodityCode"
            :codes="tableData.map(item=>item.commodityCode)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        min-width="150"
      >
        <template
          slot-scope="scope"
          class="d-relative"
        >
          <commoditySelector
            :disabled='!!scope.row.quotationId'
            ref='commdity'
            v-if="addForm.wmsId"
            :sn="addForm.type == 2 ? true : false"
            :params="addForm.type == 2 ? {wmsId:addForm.wmsId} : {wmsId:''}"
            @choose='commodityChoose(arguments,scope)'
            v-model="scope.row.goodsName"
            :codes="tableData.map(item=>item.commodityCode)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="报溢报损数量"
        min-width="150"
      >
        <template
          slot-scope="scope"
          class="d-relative"
          v-if="scope.row.commodityCode && !scope.row.quotationId"
        >
          <div
            class="ac"
            style="width:130px;height:28px;background-color:#F5F7FA;color:#C0C4CC;border:1px solid #E4E7ED;border-radius:5px;line-height:27px"
          >
            {{scope.row.commodityInfoList ? scope.row.commodityInfoList.length : '扫码添加'}}
          </div>
          <i
            @click="clickCode(scope)"
            class="d-text-blue d-absolute f14 b d-pointer"
            style='right:15px;z-index:200;top:18px;'
          >码</i>
        </template>
      </el-table-column>
      <el-table-column
        label="成本金额"
        min-width="100"
        prop="inventoryPrice"
      ></el-table-column>
      <el-table-column
        label="税率"
        min-width="100"
        prop="taxRate"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.taxRate">{{scope.row.taxRate}}%</span>
        </template>
      </el-table-column>
      <el-table-column
        label="含税成本金额"
        min-width="100"
        prop="taxInclusiveTotalCostPrice"
      >
        <template
          slot-scope="scope"
          v-if="scope.row.commodityCode"
        >
          <span>{{scope.row.commodityInfoList ? ((Number(scope.row.taxRate) * 0.01 + 1) * Number(scope.row.commodityInfoList.length) * Number(scope.row.inventoryPrice)).toFixed(2) : 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品图片"
        min-width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.commodityCode"
            style="width: 100px; height: 40px"
            :src="scope.row.goodsPic"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="商品类别"
        min-width="110"
        prop="categoryCode"
      >
        <template slot-scope="scope">
          <span>{{scope.row.categoryCode|dictionary('PSI_SP_KIND')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品分类"
        min-width="110"
        prop="className"
      ></el-table-column>
      <el-table-column
        label="商品配置"
        min-width="110"
        prop="configName"
      ></el-table-column>
      <el-table-column
        label="商品规格"
        min-width="110"
        prop="specOne"
      ></el-table-column>
      <el-table-column
        label="单位"
        min-width="120"
        prop="unit"
      >
        <template slot-scope="scope">
          <span>{{scope.row.unit|dictionary('SC_JLDW')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <commodityChoose
      @update=update
      :visibleData='visibleData'
      :visible='visible'
    />
    <reportingLossesCode
      @sumitSn='sumitSn'
      :visible.sync='codeVisible'
      v-if="codeVisible"
      :commodityForm='commodityForm'
      :addForm='addForm'
      :type='addForm.type'
    />
  </form-card>
</template>
<script>
import commodityChoose from './commodity-choose'
import reportingLossesCode from './reporting-losses-code'
import commoditySelector from '@/components/formComponents/commodity-selector';
export default {
  props: ['addForm'],
  components: { commodityChoose, reportingLossesCode, commoditySelector },
  data() {
    return {
      tableData: [{}],
      commodityList: [],
      showInFullscreen: false,
      state: '',
      codes: [],
      value: '',
      ceIndex: '',
      visibleData: {

      },
      codeVisible: false,
      visible: false,
      commodityForm: {}//点击的当前行的商品信息
    };
  },
  methods: {

    //选择商品
    commodityChoose(e, scope) {
      let list = e[0]
      let type = e[1]
      if (this.addForm.type == 1) {
        this.tableData.forEach((item) => {
          if (item.commodityCode) {
            this.codes.push(item.commodityCode)
          }
        })
        list.forEach((item) => {
          if (!this.codes.includes(item.commodityCode) && scope.row.commodityCode && type == 'select') {//区分非选择状态下的选择商品信息
            this.$set(this.tableData, scope.$index, item)
          } else if (!this.codes.includes(item.commodityCode)) {
            this.tableData.unshift(item)
          }
        })
        this.codes = []
      } else {
        let codeList = []
        this.tableData.forEach((item) => {
          if (item.snCode || item.robotCode) {
            codeList.push(item.snCode + item.robotCode)
          }
        })
        list.forEach((item) => {
          // 有Sn码的时候，商品code有可能是重复的，所以要snCode—+机器号作为唯一值
          if (!codeList.includes((item.snCode + item.robotCode)) && scope.row.snCode && type == 'select') {//区分非选择状态下的选择商品信息
            this.$set(this.tableData, scope.$index, item)
          } else if (!codeList.includes((item.snCode + item.robotCode))) {
            this.tableData.unshift(item)
          }
        })
      }
    },
    //表格查询数据懒加载
    load(tree, treeNode, resolve) {
      this.$api.seePsiCommonService.commonquotationconfigdetailsListConfigByGoodName({ page: 1, limit: 50, commodityCode: tree.commodityCode })
        .then(res => {
          let list = res.data || []
          resolve(list)
        })
        .finally(() => {
          treeNode.loading = false
        })
    },
    //算合计的
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }

        if (column.property == 'inventoryPrice') {
          const values = data.map((item) => {
            if (item.commodityInfoList && item.commodityInfoList.length > 0) {
              return Number(item.inventoryPrice) * Number(item.commodityInfoList.length)
            }
          });
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
        if (column.property == 'taxInclusiveTotalCostPrice') {
          const values = data.map((item) => {
            if (item.commodityInfoList && item.commodityInfoList.length > 0) {
              return (Number(item.taxRate) * 0.01 + 1) * Number(item.commodityInfoList.length) * Number(item.inventoryPrice)
            }
          });
          sums[index] = (values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0)).toFixed(2);
        }
      })
      this.addForm.totalCostPrice = sums[sums.length - 3] || 0
      this.addForm.taxInclusiveTotalCostPrice = sums[sums.length - 1] || 0
      return sums;
    },
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    fullscreen() {
      this.showInFullscreen = true;
    },
    //点击新增一行
    appand(row) {
      // this.tableData.splice(row.$index + 1, 0, { name: '新的', children: [], noChildren: true })
      this.tableData.push({})
    },
    //点击删除当前行
    deleteInfo(row) {
      this.tableData.splice(row.$index, 1)
    },
    //关闭弹窗
    update() {
      this.visible = false
    },
    //点击码字
    clickCode(scope) {
      this.codeVisible = true
      this.commodityForm = scope.row
      this.ceIndex = scope.$index
    },
    sumitSn(data) {
      this.addForm.commodityList = []
      this.$set(this.tableData[this.ceIndex], 'commodityInfoList', data)
      this.tableData.forEach((item) => {
        if (item.commodityCode) {
          this.addForm.commodityList.push(item)
        }
      })
      console.log(this.addForm.commodityList, 'this.addForm.commodityListthis.addForm.commodityList')
    }
  }
};
</script>
<style lang="scss" scoped>
.expanded-icons {
  > span {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border: 1px solid #999;
    text-align: center;
  }
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
/deep/.el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}
/deep/.el-input__suffix {
  display: none !important;
}
</style>
<style>
.borrow-goods-info .el-autocomplete-suggestion {
  width: 400px !important;
}
</style>
