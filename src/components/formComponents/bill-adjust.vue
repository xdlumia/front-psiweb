/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-03 09:36:30
 * @Description: 账单调整
 */
<template>
  <div>
    <form-card title='账单调整'>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true,message:'必填项',trigger: 'blur'}]"
            label="应收账单"
            prop="fbiiBusCode"
          >
            <div
              class="not-disabled-class"
              @click="eventHandle('financeFee')"
            >
              <el-input
                :disabled="true"
                placeholder="请输入"
                v-model="data.fbiiBusCode"
              >
                <el-button
                  slot="append"
                  @click="eventHandle('financeReceivable')"
                  icon="el-icon-plus"
                ></el-button>

              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true,trigger: 'blur'},{type:'price',}]"
            label="账单金额"
            prop="adjustBeforAmount"
          >
            <el-input
              :disabled="true"
              placeholder="请输入"
              v-model.trim="data.adjustBeforAmount"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true,trigger: 'blur'},{type:'price'}]"
            label="调整金额（正数增加金额，负数减少金额）"
            prop="adjustAmount"
          >
            <el-input
              :disabled="disabled"
              placeholder="请输入"
              @input="adjustAmountChange"
              v-model.trim="data.adjustAmount"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true,trigger: 'blur'},{type:'price'}]"
            label="调整后金额"
            prop="adjustAfterAmount"
          >
            <el-input
              :disabled="true"
              placeholder="请输入"
              v-model="data.adjustAfterAmount"
            >
              <template slot="append">元</template>
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
        v-if="dialogData.visible"
        class="add-fee"
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
import { log } from 'util'
export default {
  name: 'bill-adjust',
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
      sumAmount: 0,
      //dialog弹出框
      dialogData: {
        visible: false,
        title: '',
        type: '',
        data: '',
      },
      options: [],
      multipleSelection: []
    }
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      if (this.disabled) return
      this.dialogData.visible = true
      this.dialogData.title = '应收账单'
      this.dialogData.component = 'financeReceivable'
    },
    // 弹出框选择行数据
    selectionChange(val) {
      if (val.length > 1) {
        this.$message({
          message: '只能选择一条数据',
          type: 'error',
          showClose: true,
        });
      };
      this.multipleSelection = val
    },
    adjustAmountChange() {
      if (!this.data.fbiiBusCode) {
        this.$message({
          message: '请先选择应收账单',
          type: 'error',
          showClose: true,
        });
        return
      }
      if (this.data.adjustAmount > this.sumAmount) {
        this.$message({
          message: `本次调整金额不能大于${this.sumAmount}`,
          type: 'error',
          showClose: true,
        });
        this.data.adjustAmount = this.sumAmount
      }
      this.data.adjustAfterAmount = this.sumAmount - (this.data.adjustAmount || 0)
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
      this.data.fbillId = rowData.id
      this.data.fbiiBusCode = rowData.billCode
      this.data.adjustBeforAmount = rowData.amount
      this.sumAmount = rowData.amount
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
