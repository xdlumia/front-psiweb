/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 新增盘点单
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="新增盘点单"
    @close='close'
    v-dialogDrag
  >
    <el-container
      style="padding:0;max-height:700px;"
      class="d-auto-y"
    >
      <el-header
        class="d-bg-white"
        style="height:54px;padding:0;"
      >
        <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
        >
          <el-tab-pane name="deliverEdit">
            <span
              slot="label"
              v-anchor:deliverEdit
            >盘点信息</span>
          </el-tab-pane>
          <el-tab-pane name="logisticsEdit">
            <span
              slot="label"
              v-anchor:logisticsEdit
            >盘点商品</span>
          </el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main style="padding:0;max-height:700px;">
        <el-form
          :model="addform"
          class="p10"
        >
          <inventoryInfo
            ref="deliverEdit"
            :addform='addform'
          />
        </el-form>
        <inventoryCommodities
          v-if="addform.type == 2"
          ref="logisticsEdit"
          :addform='addform'
        />
      </el-main>
    </el-container>
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
  </el-dialog>
</template>
<script>
import inventoryInfo from '@/components/formComponents/inventory-info';
import inventoryCommodities from '@/components/formComponents/inventory-commodities';

export default {
  components: {
    inventoryInfo,
    inventoryCommodities
  },
  props: {
    visible: {
      type: Boolean,
      default: false
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
      addform: {
        wmsId: '',//库房id
        blitemPerson: '',//盘点人
        type: 1,//盘点类型  1 全盘  2抽盘
        note: '',//备注
      }
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