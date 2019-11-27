/*
 * @Author: web.王晓冬
 * @Date: 2019-11-23 17:19:38
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-23 17:53:22
 * @Description: 库房列表
*/
<template>
  <!-- 入库仓库 -->
  <form-card :title="title">
    <el-form-item :label="title">
      <el-select
        v-model="data.wmsId"
        :disabled="disable"
        size='small'
      >
        <el-option
          v-for="item in usableList"
          :key="item.id "
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </form-card>

</template>
<script>

export default {
  components: {
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: '退入库房'
    },
    disable: Boolean,
  },
  computed: {

  },
  data() {
    return {
      usableList: []
    }
  },
  mounted() {
    this.commonwmsmanagerUsableList()
  },
  methods: {
    //请求可用库房
    commonwmsmanagerUsableList() {
      this.$api.seePsiWmsService.commonwmsmanagerUsableList()
        .then(res => {
          this.usableList = res.data
        })
        .finally(() => {
        })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>