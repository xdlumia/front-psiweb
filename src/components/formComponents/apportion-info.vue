/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 16:58:11
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
                @click="eventHandle('cost')"
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
      append-to-body
      v-dialogDrag
    >
      <d-table
        @selection-change="selectionChange"
        :params="params"
        :api="api"
        ref="table"
        :style="{height:'450px'}"
      >
        <el-table-column
          v-if="selection"
          :fixed="true"
          width="50"
          type="selection"
        ></el-table-column>
        <el-table-column
          :fixed="item.fixed"
          :key="index"
          :label="item.label"
          :min-width="item.width"
          v-for="(item,index) of headers"
        >
          <template slot-scope="scope">
            <slot
              :column="item"
              :row="scope.row"
              :scope="scope"
              :value="scope.row[item.prop]"
            />
          </template>
        </el-table-column>
      </d-table>
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
        'cost': { comp: 'cost', title: `费用单` },
        'outLib': { comp: 'outLib', title: `销售出库单` },
      }
      this.dialogData.visible = true
      this.dialogData.type = type
      this.dialogData.title = typeObj[type].title
      this.dialogData.component = typeObj[type].comp
      this.dialogData.data = row;
    },
    // 多选
    selectionChange(val) { },
  },
  components: {
  },
}
</script>
<style scoped>
</style>
