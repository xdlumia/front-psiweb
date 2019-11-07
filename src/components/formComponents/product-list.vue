/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 21:28:32
 * @Description: 整机列表 和 配件列表
*/
<template>
  <form-card title="整机列表">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >

      <el-table-column
        prop="id"
        label="日期"
        sortable
        width="180"
      >

      </el-table-column>
      <el-table-column
        type="selection"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="value"
        label="姓名"
        sortable
        width="180"
      >
        <template>
          <el-checkbox v-model="checked">备选项</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="label"
        label="地址"
      >
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: [],
      // 遍历表单
      tableData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    };
  },
  methods: {

  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
</style>