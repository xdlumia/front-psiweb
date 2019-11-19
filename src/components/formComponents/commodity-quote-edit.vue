/*
 * @Author: 王晓冬
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-18 20:49:43
 * @Description: 新增销售报价单 商品信息 可编辑
*/  
<template>
  <form-card
    class="commodity-quote-edit"
    title="商品信息"
  >
    <div slot="title">
      <span>商品信息</span>
    </div>
    <el-table
      default-expand-all
      show-summary
      sum-text='总计'
      border
      :summary-method="getSummaries"
      :data="data.businessCommoditySaveVoList"
      max-height="400"
      ref="elTable"
      row-key="id"
      size="mini"
    >
      <el-table-column width="50">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="80"
        prop="name"
      >
        <template slot-scope="scope">
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
            :wmsId="data.type == 2 ? data.wmsId : null"
            @choose='commodityChoose(arguments,scope)'
            :multiple='true'
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
            :wmsId="data.type == 2 ? data.wmsId : null"
            @choose='commodityChoose(arguments,scope)'
            v-model="scope.row.goodsName"
            :codes='codes'
          />
        </template>
      </el-table-column>
      <el-table-column
        label="商品图片"
        min-width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-image
            style="width: 90px; height: 40px"
            :src="scope.row.goodsPic"
          />
        </template>
      </el-table-column>

      <el-table-column
        label="商品类别"
        min-width="110"
        prop="categoryCode"
      >
        <template slot-scope="scope">
          {{scope.row.categoryCode | dictionary('PSI_SP_KIND')}}
        </template>
      </el-table-column>

      <el-table-column
        label="商品分类"
        min-width="110"
        prop="className"
      ></el-table-column>

      <el-table-column
        label="配置"
        min-width="110"
        prop="configName"
      ></el-table-column>

      <el-table-column
        label="规格"
        min-width="110"
        prop="specOne"
      ></el-table-column>

      <el-table-column
        label="销售参考价"
        min-width="110"
        prop="reference"
      ></el-table-column>

      <el-table-column
        label="商品数量"
        min-width="110"
      >
        <template slot-scope="scope">
          <el-form-item
            class="mb0"
            :rules="[{required:true},{type:'positiveNum'}]"
          >
            <el-input
              size="mini"
              placeholder="请输入商品数量"
              v-model="scope.row.commodityNumber"
            />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column
        label="税率%"
        min-width="100"
        prop="taxRate"
      ></el-table-column>

      <el-table-column
        label="折扣"
        min-width="110"
      >
        <template slot-scope="scope">
          <el-form-item
            class="mb0"
            :rules="[{required:true},{type:'positiveNum'}]"
          >
            <el-input
              size="mini"
              placeholder="折扣"
              v-model="scope.row.discount"
            ></el-input>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column
        label="折后销售单价"
        min-width="110"
      >
        <template slot-scope="scope">
          <el-form-item
            class="mb0"
            :rules="[{required:true},{type:'price'}]"
          >
            <el-input
              size="mini"
              placeholder="请输入"
              v-model="scope.row.discountSprice"
            />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column
        label="备注"
        min-width="110"
      >
        <template slot-scope="scope">
          <el-form-item class="mb0">
            <el-input
              size="mini"
              v-model="scope.row.note"
            />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column
        label="是否直发"
        min-width="110"
      >
        <template slot-scope="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.isDirect"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column
        label="是否组装"
        min-width="110"
      >
        <template slot-scope="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.isAssembly"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column
        label="库存数量"
        min-width="110"
        prop="inventoryNumber"
      />
      <el-table-column
        label="最近销售价"
        min-width="110"
        prop="recentDiscountSprice"
      />

    </el-table>
    <el-button
      class="mt10"
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="addCommodity"
    >添加新商品</el-button>
    <commodityChoose
      @update=update
      isChooseOne
      :visibleData='visibleData'
      :visible='visible'
    />
  </form-card>
</template>
<script>
import commodityChoose from './commodity-choose'
import commoditySelector from '@/components/formComponents/commodity-selector';
let addRowData = {
  alterationNumber: '', //退换商品数量(出入数量),
  alterationPrice: '', //实际退/换单价,
  apportionmentAmount: '', //分摊后金额,
  commodityCode: '', //商品编号,
  commodityNumber: '', //商品数量,
  costAmount: '', //采购/销售成本金额,
  discount: '', //折扣,
  discountSprice: '', //折后单价,
  isAssembly: '', //是否组装,
  isDirect: '', //是否直发,
  isTeardown: '', //是否拆卸,
  note: '',
  parentCommodityCode: '', //父商品code,
  pickingNumber: '', //拣货数量,
  preTaxAmount: '', //含税总价,
  putawayType: '0', // 库存类型(出库/入库) 0= 出库,
  reference: '', //销售参考价,
  salesPrice: '', //销售单价,
  shipmentsNumber: '', //发货数量,
  taxPrice: '', //税后退货单价2,
  taxTotalAmount: '', //税后退货总价
}
export default {
  props: ['data'],
  components: { commodityChoose, commoditySelector },
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
      visible: false,
    };
  },
  methods: {
    //选择商品
    commodityChoose(e, scope) {
      let [list] = e[0]
      let type = e[1]
      this.data.businessCommoditySaveVoList[scope.$index].commodityCode = ''
      this.data.businessCommoditySaveVoList.forEach((item) => {
        if (item.commodityCode) {
          this.codes.push(item.commodityCode)
        }
      })
      if (!this.codes.includes(list.commodityCode)) {

        list.reference = list.saleReferencePrice //销售参考价

        this.$set(this.data.businessCommoditySaveVoList, scope.$index, { ...addRowData, ...list })
        this.codes = []
      }
    },
    // 添加商品
    addCommodity() {
      this.data.businessCommoditySaveVoList.push(addRowData)
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
    //点击新增一行 新增暂时不要了
    // appand(row) {
    //   // this.data.businessCommoditySaveVoList.splice(row.$index + 1, 0, { name: '新的', children: [], noChildren: true })
    //   this.data.businessCommoditySaveVoList.push({})
    // },
    //点击删除当前行
    deleteInfo(row) {
      console.log(row)
      // this.data.businessCommoditySaveVoList.splice(row.$index, 1)
    },
    //关闭弹窗
    update() {
      this.visible = false
    },

    sumitSn(data) {
      this.$set(this.data.businessCommoditySaveVoList[this.ceIndex], 'commodityInfoList', data)
      this.data.businessCommoditySaveVoList.forEach((item) => {
        if (item.commodityCode) {
          this.addForm.commodityList.push(item)
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.commodity-quote-edit {
  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
}
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

/deep/.el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}
/deep/.el-input__suffix {
  display: none !important;
}
</style>
