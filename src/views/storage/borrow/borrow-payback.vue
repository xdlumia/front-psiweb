/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 借入归还
*/
<template>
  <div>
    <form-card
      class="borrow-goods-info"
      title="归还信息"
    >
      <el-form
        label-position='top'
        size='small'
        ref="queryForm"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="服务商名称"
              prop="name"
              :rules="[
            { required: true, message: '请输入服务商名称', trigger: 'blur' },
          ]"
            >
              <el-input
                v-model="queryForm.title"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="服务类型"
              prop="name"
              :rules="[
            { required: true, message: '请选择服务类型', trigger: 'change' },
          ]"
            >
              <el-select
                class="wfull"
                v-model="queryForm.title"
                placeholder="请选择"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="运单号"
              prop="name"
              :rules="[
            { required: true, message: '请输入运单号', trigger: 'blur' },
          ]"
            >
              <el-input
                v-model="queryForm.title"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="物流费用"
              prop="name"
              :rules="[
            { required: false, message: '', trigger: 'blur' },
          ]"
            >
              <el-input
                v-model="queryForm.title"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </form-card>
    <!-- 换入库商品 -->
    <form-card
      v-for="index of 2"
      :key='index'
      class="borrow-goods-info mt10"
      title="归还商品"
    >
      <el-table
        border
        :data="tableData"
        max-height="400"
        size="mini"
      >
        <el-table-column
          label="数量"
          min-width="100"
          prop="name"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="商品编号"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品类别"
          min-width="110"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="商品分类"
          min-width="110"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="商品名称"
          min-width="110"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="商品规格"
          min-width="110"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="单位"
          min-width="80"
          prop="name"
        ></el-table-column>
      </el-table>

      <div class="mt10 mb10">
        <span class="b mt5">机器号/扫SN码</span>
        <el-input
          size="mini"
          style="width:200px;"
          class="ml10 mt5"
        ></el-input>
        <span class="fr d-text-black mr10 mt5">
          <span>本次成功扫码</span>
          <span class="b d-text-red f16"> 3 </span>
          <span>件，历史扫码</span>
          <span class="b d-text-green f16"> 5 </span>
          <span>件，还需扫码</span>
          <span class="b d-text-blue f16"> 127 </span>
          <span>件</span>
        </span>
      </div>
    </form-card>

    <!-- 机器号/SN码 -->
    <form-card title='机器号/SN码记录'>
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
          prop="cityName"
          min-width="80"
          label="编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
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
          prop="cityName"
          min-width="100"
          label="出库库房"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="出库人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="出库时间"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品编号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="配置"
          show-overflow-tooltip
        ></el-table-column>
      </d-table>
    </form-card>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="close"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="close"
        size="small"
      >保 存</el-button>
    </span>
  </div>
  <!-- </el-dialog> -->
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
      tableData: [{ name: '写的假的' }],
      formInline: {
        user: ''
      },
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>