/*
 * @Author: 王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-12 17:43:11
 * @Description: 新增销售报价单 商品信息 可编辑
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
      row-key="name"
      size="mini"
    >
      <!-- <el-table-column
        class-name="hide-children"
        min-width="1"
        width="1"
      ></el-table-column> -->
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
          <span>
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
      <el-table-column min-width="40">
        <template slot-scope="scope">
          <div
            class="expanded-icons d-text-gray"
            v-if="scope.row.configName"
          >
            <span
              @click="expand(scope.row)"
              class="el-icon-plus d-pointer"
              v-if="!scope.row.expanded"
            ></span>
            <span
              @click="expand(scope.row)"
              class="el-icon-minus d-pointer"
              v-else
            ></span>
          </div>
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
            :wmsId="addForm.type == 2 ? addForm.wmsId : null"
            @choose='commodityChoose(arguments,scope)'
            :isChooseOne='true'
            type="code"
            v-model="scope.row.commodityCode"
            :codes='codes'
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
            :wmsId="addForm.type == 2 ? addForm.wmsId : null"
            @choose='commodityChoose(arguments,scope)'
            v-model="scope.row.goodsName"
            :codes='codes'
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
          v-if="scope.row.commodityCode"
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
      ></el-table-column>
      <el-table-column
        label="含税成本金额"
        min-width="100"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品图片"
        min-width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-image
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
      ></el-table-column>
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
      ></el-table-column>
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
  props: ['data'],
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
      })
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
      this.$set(this.tableData[this.ceIndex], 'commodityInfoList', data)
      this.tableData.forEach((item) => {
        if (item.commodityCode) {
          this.addForm.commodityList.push(item)
        }
      })
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
