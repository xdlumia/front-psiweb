/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 17:15:43
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
            prop
          >
            <el-input
              :disabled="disabled"
              placeholder="请输入"
              v-model="form.telPhone"
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
            label="未匹配费用金额"
            prop
          >
            <el-input
              :disabled="disabled"
              placeholder="请输入"
              v-model="form.telPhone"
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
              placeholder="请选择销售出库单"
              :rules="[{required:true,message:'必填项'}]"
              v-model="form.customerName"
            >
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in options"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="销售出库单"
            prop
          >
            <el-input
              :disabled="disabled"
              placeholder="请输入"
              v-model="form.telPhone"
            >
              <el-button
                slot="append"
                @click="eventHandle('outLib')"
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
        :status="false"
        :more="false"
        :button="false"
        :column="false"
        :is="dialogData.component"
        :dialogData="dialogData"
      ></components>
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
      options: [],
      form: {
        telPhone: '我是电话号码'
      },
    }
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      // 防止row为undefined 导致报错
      row = row ? row : {}
      // 这里对象key用中文会不会有隐患? TODO
      let typeObj = {
        'financeFee': { comp: 'financeFee', title: `费用单` },
        'outLib': { comp: 'salesOutLibrary', title: `销售出库单` },
      }
      this.dialogData.visible = true
      this.dialogData.type = type
      this.dialogData.title = typeObj[type].title
      this.dialogData.component = typeObj[type].comp
      this.dialogData.data = row;

    },
  },
  components: {
  },
}
</script>
<style scoped>
</style>
