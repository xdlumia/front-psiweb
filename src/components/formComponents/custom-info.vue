/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-26 14:16:20
 * @Description: 自定义信息 1
*/
<template>
  <form-card
    title="自定义信息"
    class="custom-info"
  >
    <el-table
      :data="data.fieldList||[]"
      size="mini"
    >
      <el-table-column
        label="字段名称"
        width="280"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-form-item
            class="mb0"
            :rules="{required:true}"
            :prop="`fieldList.${scope.$index}.fieldCode`"
          >
            <el-select
              size="mini"
              :disabled="disabled"
              v-model="scope.row.fieldCode"
            >
              <el-option
                v-for="item in fieldOptions"
                :key="item.id"
                :label="item.fieldName"
                :value="item.fieldCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        label="字段内容"
        width="280"
        prop="fieldVal"
        show-overflow-tooltip
      >
        <!-- :prop="`fieldList.${scope.$index}.fieldVal`" -->
        <template slot-scope="scope">

          <el-form-item
            class="mb0"
            :rules="{required:true}"
            :prop="`fieldList.${scope.$index}.fieldVal`"
          >
            <el-input
              size="mini"
              :disabled="disabled"
              v-model.trim="scope.row.fieldVal"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="80"
        v-if="!disabled"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="f18"
            type="text"
            icon='el-icon-remove-outline'
            @click="data.fieldList.splice(scope.$index,1)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="!disabled"
      class="mt10"
      type="text"
      icon="el-icon-circle-plus"
      @click="add"
    >添加自定义字段</el-button>

  </form-card>
</template>
<script>
export default {
  name: 'custom-info',
  props: {
    busType: [String, Number],
    data: {
      type: Object,
      default: () => {
        return { fieldList: [] }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fieldOptions: []
    }
  },
  created() {
    let formCode = this.busType || 27
    if (!this.busType) {
      this.$message({
        message: '你当前页面调用的自定义信息组件没有传busType参数',
        type: 'error',
        showClose: true,
      });

    }
    this.queryFieldsByForm(formCode)
  },
  methods: {

    queryFieldsByForm(formCode) {
      this.$api.seeBaseinfoService.formfieldsQueryFieldsByForm(null, formCode)
        .then(res => {
          this.fieldOptions = res.data || []
        })
    },
    add(){
      if(!this.data.fieldList) this.$set(this.data,'fieldList',[])
      this.data.fieldList.push({fieldCode:'',fieldVal:''})
    }
  },
};
</script>
<style lang="scss">
</style>