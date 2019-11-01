/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 调出扫码
*/
<template>
  <div>
    <div
      style="max-height:600px"
      class="borrow-goods-info mt10 d-auto-y"
    >
      <!-- 换入库商品 -->
      <form-card title="调出商品">
        <el-table
          border
          :data="tableData"
          style="max-height:300px"
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

      </form-card>

      <!-- 机器号/SN码 -->
      <form-card title='机器号/SN码'>

        <div class="mt10 mb10">
          <span class="b mt5">扫SN码</span>
          <el-input
            size="mini"
            style="width:200px;"
            class="ml10 mt5"
          ></el-input>
          <span class="b mt5 ml20">扫机器码</span>
          <el-input
            size="mini"
            style="width:200px;"
            class="ml10 mt5"
          ></el-input>
          <el-button
            type="primary"
            size='mini'
            class='fr mr5'
            @click="chooseVisible = true"
          >选择</el-button>
        </div>
        <d-table
          :paging='false'
          api="seePumaidongService.collegeManagerList"
          :params="queryForm"
          ref="companyTable"
          class="college-main"
          style="height:300px"
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
            label="借出库房"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cityName"
            min-width="100"
            label="借出人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="借出时间"
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
    </div>
    <div class="wfull d-center mt10">
      <span>
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
    <commodityChoose :visible.sync='chooseVisible' />
  </div>
</template>
<script>
import commodityChoose from '@/components/formComponents/commodity-choose'

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
      chooseVisible: false,
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
  },
  components: {
    commodityChoose
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>