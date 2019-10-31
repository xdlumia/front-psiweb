/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 采购单 详情  入库商品  点击入库或者SN码公共弹窗
*/
<template>
  <el-dialog
    v-if='visible'
    :visible.sync="visible"
    :title="dialogData.title"
    v-dialogDrag
  >
    <!-- 入库仓库 -->
    <form-card
      title='入库仓库'
      class='wfull'
    >
      <div class='wfull d-flex'>
        <span class='mr10 mt5'>入库仓库</span>
        <el-select
          :disabled="dialogData.type == 'disable'"
          size='small'
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </form-card>
    <!-- 入库商品 -->
    <form-card
      title='入库商品'
      class='wfull'
    >
      <d-table
        api="seePumaidongService.collegeManagerList"
        :params="queryForm"
        ref="companyTable"
        class="college-main mt15"
        style="height:300px"
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          fixed
          prop="cityName"
          min-width="80"
          label="入库数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="商品编号"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="dialogData.type == 'able'"
          fixed
          prop="cityName"
          min-width="100"
          label="可用库存"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="商品类别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品分类"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="商品名称"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="单位"
          show-overflow-tooltip
        ></el-table-column>
      </d-table>
    </form-card>

    <!-- 机器号/SN码 -->
    <form-card title='机器号/SN码'>
      <el-form
        v-if="dialogData.type == 'able'"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="扫SN码">
          <el-input
            size='small'
            v-model="formInline.user"
            placeholder="配件请录入SN码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="扫机器码"
          class="ml10"
        >
          <el-input
            size='small'
            v-model="formInline.user"
            placeholder="整机请录入机器号"
          ></el-input>
        </el-form-item>
      </el-form>
      <d-table
        :paging='false'
        api="seePumaidongService.collegeManagerList"
        :params="queryForm"
        ref="companyTable"
        class="college-main"
        style="height:calc(100vh - 340px)"
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          v-if="dialogData.type == 'able'"
          fixed
          min-width="50"
          label="操作"
          show-overflow-tooltip
        >
          <template slot-scope="">
            <i
              class="el-icon-error d-pointer"
              style="font-size:20px;color:#F5222D"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="80"
          label="编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="SN码"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="机器号"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="入库库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="入库人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          v-if="dialogData.type == 'able'"
          prop="createTime"
          label="出库时间"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column
          v-if="dialogData.type == 'able'"
          prop="cityName"
          min-width="100"
          label="商品编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          v-if="dialogData.type == 'able'"
          prop="cityName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          v-if="dialogData.type == 'able'"
          prop="cityName"
          min-width="100"
          label="配置"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          v-if="dialogData.type == 'disable'"
          prop="createTime"
          label="入库时间"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
      </d-table>
    </form-card>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="$emit('close')"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="$emit('close')"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
    },
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      formInline: {
        user: ''
      },
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>