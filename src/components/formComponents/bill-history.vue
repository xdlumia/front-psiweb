/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-11 17:59:23
 * @Description: 流水操作记录
*/
<template>
  <form-card title="操作记录">
    <div
      class="d-text-gray"
      v-if="!logData.length"
    >暂无操作记录</div>
    <el-card
      v-for="billItem of logData"
      :key="billItem.id"
    >
      <el-row :gutter="10">
        <el-col
          :key="item.prop"
          :span="12"
          v-for="item of formItems"
          v-show="!hide.includes(item.prop)"
        >
          <el-form-item :label="item.label">
            <el-input
              :value="billItem[item.prop]|timeToStr('YYYY-MM-DD HH:mm:ss')"
              disabled
              v-if="item.time"
            />
            <el-input
              :value="format(billItem[item.prop])"
              disabled
              v-else
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    hide: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      logData: [],
      formItems: [
        { label: '创建人', prop: 'userName', },
        { label: '创建时间', prop: 'createTime', time: true },
        { label: '创建方式 ', prop: 'description', },
      ]
    };
  },
  created() {
    this.logQueryList(this.data.id)
  },
  methods: {
    logQueryList(id) {
      let params = {
        businessId: id,
        businessType: '22', // 报价单
        limit: 99,
        page: 1
      }
      this.$api.operlogService.logQueryList(params)
        .then(res => {
          this.logData = res.data || []
        })
    },
    format(a) {
      if (a == null || a == undefined) return '';
      else return a;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
