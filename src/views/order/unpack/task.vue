/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 15:28:02
 * @Description: 拆卸任务单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>拆卸任务{{from?`(${from})`:''}}</span>
      <span class="fr mr20"></span>
    </div>
    <el-form :model="form" class="p10" v-if="form&&visible">
      <buying-goods-edit
        :customColumns="[
           { label:'待分配', fixed:true, key:'waitTearNumber', width:100, prop:'teardownNumber',format:(a,row)=>`0/${row.teardownNumber||0}` },
           { label:'本次分配数量', fixed:true, key:'currentTearNumber', width:100, prop:'teardownNumber',type:'inputinteger' },
        ]"
        :data="form"
        :show="[
          'commodityCode','goodsName','categoryCode','className','specOne','configName','noteText','!add','!fullscreen'
        ]"
        :showSummary="false"
        title="拆卸信息"
      ></buying-goods-edit>
      <choose-assembly :hide="['chooseContact']" />
    </el-form>
    <div class="ac" slot="footer">
      <el-button @click="close" size="mini" type="primary">保存</el-button>
      <el-button @click="close" size="mini">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    from: String // 来源
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    async getDetail() {
      if (this.code) {
        let { data } = await this.$api.seePsiWmsService.wmsdisassemblyorderInfo(
          null,
          this.code
        );
        data.commodityList = [
          {
            id: 1,
            commodityCode: '000',
            children: [{ id: 2 }]
          }
        ];
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>