/*
 * @Author: 赵伦
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 15:38:42
 * @Description: 其他合同
*/
<template>
  <el-dialog :visible="visible" @close="close" v-dialogDrag>
    <div slot="title">
      <span>其他合同</span>
      <span class="fr mr20">
        <el-select class="mr10" size="mini" v-model="tmp">
          <el-option value>选择合同模板</el-option>
        </el-select>
        <el-button size="mini" type="primary">预览</el-button>
        <el-button @click="close" size="mini" type="primary">生成</el-button>
        <el-button @click="close" size="mini">取消</el-button>
      </span>
    </div>
    <d-tabs :style="{
      maxHeight:maxHeight+'px'
    }">
      <d-tab-pane label="单据信息" name="titleInfo" />
      <d-tab-pane label="甲方信息" name="firstClass" />
      <d-tab-pane label="乙方信息" name="secondClass" />
      <d-tab-pane label="合同期限" name="expire" />
      <d-tab-pane label="补充信息" name="desc" />
      <d-tab-pane label="备注信息" name="extrasInfo" />
      <div>
        <el-form :model="form" class="p10">
          <contract-title id="titleInfo"></contract-title>
          <contract-signer name="甲方" id="firstClass"></contract-signer>
          <contract-signer name="乙方" id="secondClass"></contract-signer>
          <contract-expire id="expire"></contract-expire>
          <contract-extras id="desc"></contract-extras>
          <extrasInfo id="extrasInfo" />
        </el-form>
      </div>
    </d-tabs>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {},
    from: String // 来源
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      tmp:'',
      activeName: '',
      randomStr: +new Date() + '-' + Math.random()
    };
  },
  mounted() {},
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>