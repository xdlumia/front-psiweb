/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 生成报溢报损单
*/
<template>
  <el-dialog
    :visible.sync="visible"
    :title="`生成${state[type]}单`"
    @close='close'
    v-dialogDrag
  >
    <el-container
      style="padding:0;max-height:700px;"
      class="d-auto-y"
    >
      <el-main style="padding:0;max-height:700px;">
        <el-form
          :model="data"
          class="p10"
        >
          <form-card :title="`${state[type]}信息`">
            <el-row>
              <el-col
                :span="8"
                class="pl5 pr5 pb5"
              >
                <el-form-item
                  :rules="[ 
                    {required:true,message:'请选择类型'}
                ]"
                  label="类型"
                  prop
                  size="mini"
                >
                  <el-select
                    v-model='type'
                    :disabled='disabled'
                    placeholder="请选择"
                    class="wfull"
                  >
                    <el-option
                      label="报溢"
                      :value="1"
                    >
                    </el-option>
                    <el-option
                      label="报损"
                      :value="2"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col
                :span="8"
                class="pl5 pr5 pb5"
              >
                <el-form-item
                  :rules="[ 
                    {required:true,message:'请选择库房'}
                ]"
                  label="出库/入库库房"
                  prop
                  size="mini"
                >
                  <el-select
                    v-model='data.wmsId'
                    :disabled='disabled'
                    placeholder="请选择"
                    class="wfull"
                  >
                    <el-option
                      v-for="item in usableList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                class="pl5 pr5 pb5"
              >
                <el-form-item
                  style="wfull"
                  :rules="[ 
                    {required:true,message:'请选择责任人'}
                ]"
                  label="责任人"
                  prop
                  size="mini"
                >
                  <employees-chosen
                    :disabled='disabled'
                    :multiple="false"
                    :closeOnSelect="false"
                    @input="choose"
                    style="width:100%"
                    class="d-inline"
                  >
                    <el-input
                      :value="creatorName"
                      size="mini"
                    ></el-input>
                  </employees-chosen>
                </el-form-item>
              </el-col>
              <el-col
                :span="24"
                class="pl5 pr5 pb5"
              >
                <el-form-item
                  label="备注"
                  size="mini"
                >
                  <el-input
                    v-model='data.note'
                    :disabled='disabled'
                    type="textarea"
                    maxlength="140"
                    placeholder="请输入备注"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
        </el-form>
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
            <el-table-column min-width="50">
              <template slot-scope="">
              </template>
            </el-table-column>
            <el-table-column
              label="商品编号"
              min-width="150"
              prop="commodityCode"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="商品名称"
              min-width="150"
              prop="goodsName"
            >
            </el-table-column>
            <el-table-column
              :label="`${state[type]}数量`"
              min-width="150"
            >
              <template
                slot-scope="scope"
                class="d-relative"
              >
                <span>
                  {{scope.row.commodityInfoList ? scope.row.commodityInfoList.length : 0}}
                </span>
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
        </form-card>
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="submit"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template> 
<script>

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {},
    type: {
      type: Number,
      default: 1
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      disabled: true,
      usableList: [],
      tableData: [],
      state: {
        1: '报溢',
        2: '报损'
      },
      creatorName:'',
      addForm: {
        commodityList: [],//商品列表
        type: 0,//类别（1-报溢 2-报损）
        wmsId: '',//库房id
        personInChargeId: '',//责任人id
        note: '',//备注
        source: '盘点单',
        totalCostPrice: '',//成本金额总计
        taxInclusiveTotalCostPrice: '',//含税成本金额总计
      },
    };
  },
  mounted() {
    this.commonwmsmanagerUsableList()
    this.getDetail()
  },
  methods: {
    //请求报溢/报损商品
    getDetail() {
      this.$api.seePsiWmsService.wmsblitemGenerateReportingOrder({ id: this.data.id, type: this.type })
        .then(res => {
          console.log(res, 'resresresresresresresresresresresresresresresresresres')
          this.tableData = res.data || []
        })
        .finally(() => {

        })
    },
    close() {
      this.$emit('update:visible', false)
    },
    //点一下保存
    submit() {
      this.addForm.commodityList = this.tableData
      this.addForm.type = this.type
      this.addForm.wmsId = this.data.wmsId
      this.addForm.note = this.data.note
      this.$api.seePsiWmsService.wmsreportinglossesSave(this.addForm)
        .then(res => {
          this.$emit('reload')
          this.close()
        })
        .finally(() => {

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
      this.addForm.totalCostPrice = sums[sums.length - 2] || 0
      this.addForm.taxInclusiveTotalCostPrice = sums[sums.length - 1] || 0
      return sums;
    },
    //请求可用库房
    async commonwmsmanagerUsableList() {
      let { data } = await this.$api.seePsiWmsService.commonwmsmanagerUsableList()
      this.usableList = data || []
    },
    //选择人员
    choose(value) {
      this.creatorName = value.employeeName
      this.addForm.personInChargeId = value.userId
    },
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>