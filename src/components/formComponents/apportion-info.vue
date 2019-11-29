/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-29 14:59:27
 * @Description: 分摊信息
 */
<template>
  <div>
    <form-card title='分摊信息'>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="费用单"
            prop="costCode"
          >
            <el-input
              :disabled="disabled"
              v-model="data.costCode"
            >
              <el-button
                slot="append"
                @click="eventHandle('financeFee')"
                icon="el-icon-plus"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="未分摊费用金额"
            prop
          >
            <el-input
              :disabled="disabled"
              v-model="data.telPhone"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="本次分摊费用金额"
            prop
          >
            <el-input
              :disabled="disabled"
              v-model="data.telPhone"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="关联单据"
            prop
          >
            <el-select
              class="wfull"
              :disabled="disabled"
              :rules="[{required:true,message:'必填项'}]"
              v-model="data.busType"
            >
              <el-option
                :key="val.busType"
                :label="val.title"
                :value="key"
                v-for="(val,key) in options"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="dialogData.title"
        >
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            :label="dialogData.title"
            prop
          >
            <el-input
              :disabled="disabled"
              v-model="data.busCode"
            >
              <el-button
                slot="append"
                @click="eventHandle(data.busType)"
                icon="el-icon-plus"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
    <!-- 新增 / 编辑 弹出框-->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      width="920px"
      v-dialogDrag
    >
      <components
        class="add-fee"
        :status="false"
        :more="false"
        :button="false"
        :column="false"
        @selection-change="selectionChange"
        :is="dialogData.component"
        :dialogData="dialogData"
      ></components>
      <div class="ac">
        <el-button
          size="small"
          @click="dialogData.visible = false"
        >取消</el-button>
        <el-button
          @click="confirm"
          size="small"
          type="primary"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'apportionInfo',
  props: {
    data: {
      default: () => { return {} }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //dialog弹出框
      dialogData: {
        visible: false,
        title: '',
        type: '',
        data: '',
      },
      options: {
        '0': { comp: 'salesOutLibrary', title: '销售出库单' },
        '1': { comp: 'orderStorage', title: '采购入库单' },
        '2': { comp: 'storageAllocation', title: '调拨单' },
        '3': { comp: 'orderBorrow', title: '借出借入单' },
        '4': { comp: 'orderExchange', title: '换货单' },
      },
      multipleSelection: [],
    }
  },
  watch: {
    'data.busType': {
      handler(val) {
        this.dialogData.title = this.options[val].title
        this.data.busCode = ''
      }
    }
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, ) {
      // 这里对象key用中文会不会有隐患? TODO
      let typeObj = {
        'financeFee': { comp: 'financeFee', title: `费用单` },
        ...this.options
      }
      this.dialogData.visible = true
      this.dialogData.type = type
      this.dialogData.title = typeObj[type].title
      this.dialogData.component = typeObj[type].comp
    },
    selectionChange(val) {
      if (val.length > 1) {
        this.$message({
          message: '只能选择一条数据',
          type: 'error',
          showClose: true,
        });
      };
      this.multipleSelection = val
      console.log(this.multipleSelection);

    },
    confirm() {
      if (this.multipleSelection.length > 1 || !this.multipleSelection.length) {
        this.$message({
          message: !this.multipleSelection.length ? '必须选择一条数据' : '只能选择一条数据',
          type: 'error',
          showClose: true,
        });
        return
      };
      let [rowData] = this.multipleSelection
      if (this.dialogData.type == 'financeFee') {
        this.data.costCode = rowData.costCode
      } else {
        let codeObj = {
          '0': 'shipmentCode',
          '1': 'putinCode',
          '2': 'allocationOrderCode',
          '3': 'borrowLoanCode',
          '4': 'swapOrderCode',
        }
        this.data.busCode = rowData[codeObj[this.data.busType]]
      }
      this.dialogData.visible = false
    }
  },
  components: {
  },
}
</script>
<style lang="scss" scoped>
/deep/.add-fee .main-content {
  height: calc(100vh - 159px);
}
</style>
