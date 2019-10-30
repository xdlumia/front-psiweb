/*
 * @Author: 赵伦
 * @Date: 2019-10-28 17:05:01
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 15:09:29
 * @Description: 商品发货信息
*/  
<template>
  <form-card class="borrow-goods" title="商品发货信息">
    <div slot="title">
      <span>商品发货信息</span>
    </div>
    <d-table api="bizSystemService.getEmployeeList" ref="elTable" row-key="name" size="mini" style="height:600px;">
      <el-table-column class-name="hide-children" min-width="1" width="1"></el-table-column>
      <el-table-column min-width="60">
        <template slot-scope="{row}">
          <div class="expanded-icons d-text-gray" v-if="row.children&&row.children.length">
            <span @click="expand(row)" class="el-icon-plus d-pointer" v-if="!row.expanded"></span>
            <span @click="expand(row)" class="el-icon-minus d-pointer" v-else></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" min-width="110" prop="deptName"></el-table-column>
      <el-table-column label="商品图片" min-width="110" prop="name"></el-table-column>
      <el-table-column label="商品名称" min-width="110" prop="name"></el-table-column>
      <el-table-column label="商品类别" min-width="110" prop="name"></el-table-column>
      <el-table-column label="商品分类" min-width="110" prop="name"></el-table-column>
      <el-table-column label="规格" min-width="110" prop="name"></el-table-column>
      <el-table-column label="配置" min-width="110" prop="name"></el-table-column>
      <el-table-column label="备注" min-width="110" prop="name"></el-table-column>
      <el-table-column label="数量" min-width="70" prop="name"></el-table-column>
      <el-table-column label="序列号" min-width="140" prop="name">
        <template slot-scope="{row}">
          <el-input v-model="row.sn"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="订单号" min-width="140" prop="name">
        <template slot-scope="{row}">
          <el-input v-model="row.order"></el-input>
        </template>
      </el-table-column>
    </d-table>
  </form-card>
</template>
<script>
export default {
  components: {},
  props: {
    data: Object,
    disabled: Boolean
  },
  data() {
    return {
      showInFullscreen: false
    };
  },
  methods: {
    getData(data) {
      console.log(data);
    },
    expand(row) {
      this.$set(row, 'expanded', !row.expanded);
      this.$refs.elTable.toggleRowExpansion(row, row.expanded);
    },
    fullscreen() {
      this.showInFullscreen = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.expanded-icons {
  > span {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border: 1px solid #999;
    text-align: center;
  }
}
</style>
