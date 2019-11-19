/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-19 18:03:31
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
          <!-- :prop="`fieldList.${scope.$index}.fieldCode`" -->
          <el-form-item
            class="mb0"
            :rules="{required:true}"
            :prop="`fieldList.${scope.$index}.fieldCode`"
          >

            <el-input
              size="mini"
              :disabled="disabled"
              v-model.trim="scope.row.fieldCode"
            />
            <!-- <el-select
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
            </el-select> -->
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
      @click="data.fieldList.push({fieldCode:'',fieldVal:''})"
    >添加自定义字段</el-button>

  </form-card>
</template>
<script>
export default {
  props: {
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
    this.queryFieldsByForm()
  },
  methods: {

    queryFieldsByForm() {
      this.$api.seeBaseinfoService.formfieldsQueryFieldsByForm(null, 1)
        .then(res => {
          this.fieldOptions = res.data || []
        })
    }
  },
};
</script>
<style lang="scss">
</style>