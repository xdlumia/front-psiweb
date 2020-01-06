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
      style="background:#F2F2F2;margin: -10px -15px 10px;"
    >
      <div class="d-flex">
        <div>
          <el-image
            style="width: 120px; height: 120px"
            class="mt5 ml20"
            :src="drawerData.goodsPic"
            fit="fill"
          ></el-image>
        </div>
        <div class="ml15">
          <p class="f16 b">{{drawerData.goodsName}}-{{drawerData.commodityCode}}</p>
          <p class='d-text-qgray mt5'>商品类别：{{drawerData.categoryCode | dictionary('PSI_SP_KIND')}}</p>
          <p class='d-text-qgray mt5'>商品分类：{{drawerData.className}}</p>
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
          name='orderSupplier'
        >
          <FullscreenWrap v-if="activeName == 'orderSupplier'">
            <orderSupplier
              :button="false"
              :params="{page:1,limit:15,commodityCode:drawerData.commodityCode}"
            ></orderSupplier>
          </FullscreenWrap>
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
      status: [{ label: '创建时间', value: '-', isTime: true }, { label: '创建人', value: '-' }, { label: '来源', value: '-', dictName: 'SP_SOURCE_FROM' }],
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
    codeSlice(code) {
      return this.$options.filters.codeSlice(code)
    },
    changeBackVisible() {
      this.backVisible = true
    },
    init() {
      this.status[0].value = this.drawerData.createTime
      this.status[1].value = this.drawerData.creatorName
      this.status[2].value = this.drawerData.source
    }
  }
}
</script>
<style lang='scss' scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
