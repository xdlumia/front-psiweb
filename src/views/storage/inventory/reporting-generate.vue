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
    title="生成报溢报损单"
    @close='close'
    v-dialogDrag
  >
    <el-container
      style="padding:0;max-height:700px;"
      class="d-auto-y"
    >
      <el-main style="padding:0;max-height:700px;">
        <el-form
          :model="addForm"
          class="p10"
        >
          <form-card title="报溢报损信息">
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
                    v-model='addForm.type'
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
                    v-model='addForm.wmsId'
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

                  <!-- v-model="employee"
          :isEdit="true"
          :multiple="true"
          :closeOnSelect="false"
          @input="choose" -->
                  <employees-chosen
                    :disabled='disabled'
                    :multiple="false"
                    :closeOnSelect="false"
                    @input="choose"
                    style="width:100%"
                    class="d-inline"
                  >
                    <el-input
                      :value="employeeName"
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
                    v-model='addForm.note'
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
            border
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
              <template
                slot-scope="scope"
                v-if='scope.row.goodsCode'
              >
                <span>
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
                <commoditySelector
                  :wmsId='addForm.wmsId'
                  @choose='commodityChoose(arguments,scope)'
                  type="code"
                  v-model="scope.row.goodsCode"
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
                  :wmsId='addForm.wmsId'
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
                v-if="scope.row.goodsCode"
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
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      disabled: true,
      usableList: [],
      tableData: [],
      employeeName: '',
      addForm: {
        commodityList: [],//商品列表
        type: 2,//类别（1-报溢 2-报损）
        wmsId: '',//库房id
        personInChargeId: '',//责任人id
        note: '',//备注
        totalCostPrice: '',//成本金额总计
        taxInclusiveTotalCostPrice: '',//含税成本金额总计
      },
    };
  },
  mounted() {
    this.commonwmsmanagerUsableList()
  },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    },
    //点一下保存
    submit() {
      this.$api.seePsiWmsService.wmsreportinglossesSave(this.addForm)
        .then(res => {

        })
        .finally(() => {

        })
    },
    //请求可用库房
    async commonwmsmanagerUsableList() {
      let { data } = await this.$api.seePsiWmsService.commonwmsmanagerUsableList()
      this.usableList = data || []
    },
    //选择人员
    choose(value) {
      this.employeeName = value.employeeName
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