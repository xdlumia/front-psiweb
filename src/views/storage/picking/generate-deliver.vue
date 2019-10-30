/*
 * @Author: 徐贺
 * @Date: 2019-10-26 15:33:41
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 18:17:56
 * @Description: 拣货
*/
<template>
  <el-dialog
    :visible.sync="visible"
    title="拣货"
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
          <goodsPicking ref="goodsPicking" />
        </el-form>
        <pickingSn ref="pickingSn" />
      </el-main>
    </el-container>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="centerDialogVisible = false"
        size="small"
      >关 闭</el-button>
      <el-button
        type="primary"
        @click="centerDialogVisible = false"
        size="small"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import goodsPicking from '@/components/formComponents/goods-picking'
import pickingSn from '@/components/formComponents/picking-sn';

export default {
  components: {
    goodsPicking,
    pickingSn
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
      return window.innerHeight - 130;
    }
  },
  data() {
    return {
      activeName: ''
    };
  },
  mounted() { },
  methods: {
    handleClick({ label, name }) {
      this.activeName = '';
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__footer {
  text-align: center;
}
</style>