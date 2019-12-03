/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 11:29:10
 * @Description: 拆卸任务单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag v-loading="loading">
    <div slot="title">
      <span>拆卸任务{{from?`(${from})`:''}}</span>
      <span class="fr mr20"></span>
    </div>
    <el-form :model="form" class="p10" ref="form" v-if="form&&visible">
      <buying-goods-edit
        :customColumns="[
           { label:'待分配', fixed:true, key:'waitTearNumber', width:100, prop:'teardownNumber',
             format:(a,row,info)=>info.isChild?'':`${row.maxdisassemblyNum}`
           },
           { label:'本次分配数量', fixed:true, key:'disassemblyNum', width:100, prop:'disassemblyNum',slot:'disassemblyNum' },
        ]"
        :data="form"
        :show="[
          'commodityCode','goodsName','categoryCode','className','specOne','configName','noteText','!add','!fullscreen'
        ]"
        :showSummary="false"
        :sort="['expanded']"
        title="拆卸信息"
      >
        <template slot="disassemblyNum" slot-scope="{row,info,formProp}">
          <el-form-item
            :prop="formProp"
            :rules="[{required:true},{type:'positiveNum'},{validator:checkDisassemblyNum.bind(this,row)}]"
            v-if="!info.isChild"
          >
            <el-input size="mini" v-model="row.disassemblyNum"></el-input>
          </el-form-item>
        </template>
      </buying-goods-edit>
      <choose-unpackman :data="form" />
    </el-form>
    <div class="ac" slot="footer">
      <el-button @click="save" size="mini" type="primary">保存</el-button>
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
    return {
      alwaysDropAndCopyForm: true // 在getDetail返回数据后，重新覆盖form
    };
  },
  mounted() {},
  methods: {
    checkDisassemblyNum(row, rule, value, cb) {
      if (!(parseInt(value) || 0 > 1)) {
        cb(new Error('数量最低为1'));
      } else if (row.maxdisassemblyNum < parseInt(value)) {
        cb(new Error('数量不能高于未分配数量'));
      } else cb();
    },
    getCommodityInfo({
      children,
      commodityCode,
      goodsName,
      disassemblyNum,
      purchaseUnivalence,
      singleNum
    }) {
      return {
        childrenCommoditySaveVoList:
          children && children.length
            ? children.map(this.getCommodityInfo)
            : undefined,
        commodityCode,
        goodsName,
        disassemblyNum,
        purchaseUnivalence,
        singleNum
      };
    },
    async getDetail() {
      if (this.code) {
        let {
          data
        } = await this.$api.seePsiWmsService.wmsdisassemblyorderGetByCode(
          null,
          this.code
        );
        return data;
      } else if (this.rowData) {
        return this.rowData;
      }
    },
    afterDetailInit() {
      this.form.commodityList.map(item => {
        delete item.expanded;
        this.$set(item, 'maxdisassemblyNum', item.undistributedNum || 0);
        this.$set(item, 'disassemblyNum', item.undistributedNum || 0);
      });
    },
    async save() {
      await this.$refs.form.validate();
      let form = { ...this.form };
      form.commoditySaveVoList = form.commodityList.map(item => {
        return this.getCommodityInfo(item);
      });
      form.commoditySaveVoList.map(item => {
        (item.childrenCommoditySaveVoList || []).map(citem => {
          citem.disassemblyNum = item.disassemblyNum * citem.singleNum;
        });
      });
      delete form.commodityList;
      form.source = this.from || '新建';
      this.loading = true;
      try {
        await this.$api.seePsiWmsService.wmsdisassemblyorderGenerateTask(form);
        this.setEdit();
        this.close();
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>