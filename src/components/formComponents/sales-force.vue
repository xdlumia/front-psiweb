/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-09 18:02:48
 * @Description: 销售人员 公共
*/
<template>
  <form-card title="销售人员">
    <el-row>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ {required:true,trigger:'blur'}]"
          label="销售人员"
          prop='salesForceId'
          size="mini"
        >
          <tree-select
            class="wfull"
            :disabled='disabled'
            ref="treeSelect"
            v-model="data.salesForceId"
            node-key="userId"
            size="mini"
            defaultExpandAll
            :props="{children:'employeeList', label:'employeeName'}"
            :data="treeData"
            placeholder="请选择人员"
          >
          </tree-select>
          <!-- <el-select
            v-model="data.salesForceId"
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              v-for="(item,index) of options"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select> -->
        </el-form-item>
      </el-col>
    </el-row>
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
      treeData: [],
    };
  },
  created() {
    this.getTreeData()
  },
  mounted() {

  },
  methods: {
    //请求树列表的数据
    getTreeData() {
      this.$api.bizSystemService.getDeptList({ type: '1' })
        .then(res => {
          let data = res.data || []
          let formatTree = treeData => treeData.map(item => {
            item.employeeName = item.deptName
            if (item.children) {
              formatTree(item.children)
              item.employeeList.unshift(...item.children)
              return item
            } else {
              return []
            }
          })
          this.treeData = formatTree(data)
        })
        .finally(() => {

        })
    },

  }
};
</script>
<style lang="scss" scoped>
</style>