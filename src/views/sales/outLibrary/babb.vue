/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-05 10:41:57
 * @Description: 审核采购时间
*/
<template>
  <div>
    <el-dialog
      :visible.sync="showEditPage"
      width="920px"
      @close="close"
      v-dialogDrag
      v-loading="loading"
    >
      <!-- 报价单信息 -->
      <order-storage
        :button="false"
        :params="params"
      />
    </el-dialog>
  </div>
</template>
<script>

import VisibleMixin from '@/utils/visibleMixin';
export default {
  mixins: [VisibleMixin],
  components: {
  },
  data() {
    return {

    }
  },
  watch: {

  },
  created() {
  },
  mounted() {

  },
  computed: {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
