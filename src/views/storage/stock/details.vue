/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-28 14:01:02
 * @Description: 库房  报溢/报损单 详情组件
 */
<template>

  <SideDetail
    :status="status"
    :visible.sync="visible"
    @close="$emit('update:visible',false)"
    width="990px"
  >
    <div
      slot='title'
      class="mb10"
      style="background:#F2F2F2"
    >
      <div class="d-flex">
        <div>
          <el-image
            style="width: 120px; height: 120px"
            class="mt5"
            :src="drawerData.goodsPic"
            fit="fill"
          ></el-image>
        </div>
        <div class="ml15">
          <p class="f16 b">{{drawerData.goodsName}}-{{drawerData.commodityCode}}</p>
          <p class='d-text-qgray mt5'>商品类别：{{drawerData.categoryCode}}</p>
          <p class='d-text-qgray mt5'>商品分类：{{drawerData.firstClassName}}</p>
          <p class='d-text-qgray mt5'>商品规格：{{drawerData.specOne}}</p>
          <p class='d-text-qgray mt5'>商品配置：{{drawerData.configName}}</p>
        </div>
      </div>
    </div>
    <div>
      <div class="drawer-header">
        <el-button
          @click="changeBackVisible"
          size="mini"
          type="primary"
        >库房分布</el-button>
      </div>
      <el-tabs
        class="wfull hfull tabs-view"
        v-model="activeName"
      >
        <!-- <el-tab-pane
          label="成本明细"
          name='1'
        >
          <el-form>
          </el-form>
        </el-tab-pane> -->
        <el-tab-pane
          label="商品明细表"
          name='1'
        >
          <commodityDetails
            :drawerData='drawerData'
            v-if="activeName == '1'"
          />
        </el-tab-pane>
        <el-tab-pane
          label="供应商"
          name='2'
        >
          <orderSupplier
            :button="false"
            :params="{page:1,limit:15,commodityCode:drawerData.commodityCode}"
          ></orderSupplier>
        </el-tab-pane>
      </el-tabs>
    </div>
    <storehouseDistribution
      :visible.sync='backVisible'
      :drawerData='drawerData'
      v-if='backVisible'
    />
  </SideDetail>

</template>
<script>
import costDetails from '@/components/formComponents/cost-details'
import commodityDetails from '@/components/formComponents/commodity-details'
import storehouseDistribution from './storehouse-distribution'
import SideDetail from '@/components/side-detail';
export default {
  props: ['drawerData', 'visible'],
  data() {
    return {
      status: [{ label: '创建时间', value: '2019-9-21 10:04:38' }, { label: '创建人', value: '张三' }, { label: '来源', value: '销售单' }],
      backVisible: false,
      isComponents: '',
      activeName: '1',
      dialogData: {
        title: ''
      }
    };
  },
  components: {
    costDetails,
    commodityDetails,
    SideDetail,
    storehouseDistribution
  },
  mounted() {
    this.init()
  },
  methods: {
    changeBackVisible() {
      this.backVisible = true
    },
    init() {
      this.status[0].value = this.drawerData.createTime
      // this.status[1].value = this.drawerData.creatorName
      // this.status[2].value = this.drawerData.creatorName
    }
  }
}
</script>
<style lang='scss' scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
