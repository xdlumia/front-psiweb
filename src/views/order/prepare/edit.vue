/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-08 10:33:54
 * @Description: 新增备货单
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>新增备货单</span>
      <span class="fr mr20">
        <el-button @click="save" size="mini" type="primary">保存</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="到货信息" name="arrivalInfo" />
      <d-tab-pane label="商品信息" name="commodityInfo" />
      <d-tab-pane label="自定义信息" name="customInfo" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10" ref="form" size="mini" v-if="visible">
          <form-card id="arrivalInfo" title="到货信息">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :rules="[{ required: true, trigger: 'blur' }]" label="采购预计到货时间" prop="purchaseArrivalTime">
                  <el-date-picker :placeholder="`请选择采购预计到货时间`" class="wfull" v-model="form.purchaseArrivalTime" value-format="timestamp" />
                </el-form-item>
              </el-col>
            </el-row>
          </form-card>
          <buyingGoodsEdit :data="form" id="commodityInfo" />
          <customInfo :data="form" id="customInfo" />
          <extrasInfo :data="form" id="extrasInfo" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
import VisibleMixin from '@/utils/visibleMixin';

export default {
  mixins: [VisibleMixin],
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: '',
      form: {
        // 附件 undefined
        attachList: [],
        // 商品信息 undefined
        commodityList: [],
        // 自定义字段 undefined
        fieldList: [],
        // 备注信息 示例：备注信息
        note: '',
        // 单据执行人 100000
        personInChargeId: '',
        // 采购预计到货时间 1572419862629
        purchaseArrivalTime: '',
        // 来源 示例：来源
        source: '',
        // 请购单编号 示例：请购单编号
        stockCode: ''
      }
    };
  },
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false);
    },
    save() {
      this.$refs.form.validate();
      console.log(JSON.parse(JSON.stringify(this.form)));
    }
  }
};
</script>
<style lang="scss" scoped>
</style>