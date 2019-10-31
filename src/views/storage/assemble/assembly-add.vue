/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 新增组装单
*/
<template>
  <el-dialog
    width='80%'
    :visible.sync="visible"
    title="新增组装单"
    v-dialogDrag
  >
    <el-container>
      <el-main
        :style="{
                maxHeight:maxHeight+'px'
            }"
        style="padding:0;"
      >
        <el-form
          :model="form"
          class="p10"
        >
          <commodityInfoEdit ref="commodityInfoEdit" />
          <assembleInfo ref="assembleInfo" />
        </el-form>

      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="$emit('close')"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="$emit('close')"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import commodityInfoEdit from '@/components/formComponents/commodity-info-edit';
import assembleInfo from '@/components/formComponents/assemble-info';

export default {
  components: {
    commodityInfoEdit,
    assembleInfo
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    form: {}
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 200;
    }
  },
  data() {
    return {
      activeName: ''
    };
  },
  mounted() { },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>