/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:02:43 
 * @Description: 商品信息
 */
<template>
  <div class="commodity">
    <form-card title='商品信息'>
      <div slot="title">
        <span>商品信息</span>
        <span class="fr">
          <span>
            <el-link
              :underline="false"
              @click="fullscreen"
              type="primary"
            >全屏显示</el-link>
          </span>
        </span>
      </div>
      <d-table
        show-summary
        api="seePumaidongService.collegeManagerList"
        :params="queryForm"
        ref="companyTable"
        class="college-main"
        style="height:calc(100vh - 340px)"
        :tree-props="{children: 'id', hasChildren: 'id'}"
      >
        <el-table-column
          fixed
          prop="title"
          label="商品编号"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="d-text-blue">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="商品图片"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 40px"
              src="http://pics.sc.chinaz.com/files/pic/pic9/201910/zzpic20721.jpg"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <!-- :preview-src-list="srcList" -->
        <el-table-column
          fixed
          prop="cityName"
          min-width="100"
          label="商品名称"
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
          fixed
          align="left"
          prop="cityName"
          label="商品分类"
          width="120"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="cityName"
          min-width="140"
          label="规格"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="销售单价"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="商品数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="税率"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="title"
          label="折扣"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="折后总金额"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="120"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          type="selection"
          width="30"
        >
        </el-table-column>
        <el-table-column
          label="是否直发"
          width="100"
        >
        </el-table-column>
        <el-table-column
          type="selection"
          width="30"
        >
        </el-table-column>
        <el-table-column
          min-width="100"
          label="是否组装"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="100"
          label="销售参考价"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cityName"
          min-width="120"
          label="最近销售价"
          show-overflow-tooltip
        ></el-table-column>
      </d-table>
      <FullscreenElement
        :element="$refs.companyTable"
        :visible.sync="showInFullscreen"
      />
      <el-dialog
        title="机器号/SN码记录"
        :visible.sync="dialogVisible"
        width="600"
        v-dialogDrag
      >
        <commodityPicking />
      </el-dialog>
    </form-card>
  </div>
</template>
<script>
import commodityPicking from '@/components/formComponents/commodity-picking'
import FullscreenElement from '@/components/fullscreen-element';
export default {
  data() {
    return {
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      dialogVisible: false,
      srcList: ['http://pics.sc.chinaz.com/files/pic/pic9/201910/zzpic20721.jpg'],
      showInFullscreen: false
    }
  },
  methods: {
    fullscreen() {
      this.showInFullscreen = true;
    },
    getSummaries() {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
      });

      return sums;
    }
  },
  components: {
    commodityPicking,
    FullscreenElement
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-table__body-wrapper {
  z-index: 3;
}
/deep/.el-table_2_column_13 {
  padding: 0px;
  padding-top: 5px;
}
</style>
