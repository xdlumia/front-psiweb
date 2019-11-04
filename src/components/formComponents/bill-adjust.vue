/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 09:47:17
 * @Description: 账单调整
 */
<template>
  <div>
    <form-card title='账单调整'>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="应收账单"
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
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="账单金额"
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
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="调整金额（正数增加金额，负数减少金额）"
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
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true,message:'必填项'}]"
            label="调整后金额"
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
        'financeFee': { comp: 'financeFee', title: `费用单` }
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
