/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-03 16:52:16
 * @Description: 侧边弹框状态条 已调试 1
*/
<!-- /**
 * @author 赵伦 2019-10-25
 * @description 侧边弹框状态条
 * @example
 * <side-statusbar :status="array" />
 *
 * array数据类型为
 * { label:'标签', value:'值', isTime:'是否需要转换为时间戳', dictName: '如果是业务字典，可以填写业务字典码名称' }
 */ -->
<template>
  <div style="margin-bottom:10px;">
    <div
      class="d-bg-gray side-statusbar"
      style="padding:10px 20px;"
    >
      <el-row type="flex">
        <el-col
          :key="index"
          class="d-text-qgray d-elip"
          v-for="(item,index) of status"
        >{{item.label}}</el-col>
      </el-row>
      <el-row type="flex">
        <el-col
          :key="index"
          class="d-elip"
          v-for="(item,index) of status"
        >
          <span v-if="item.isTime">{{item.value|timeToStr('YYYY-MM-DD HH:mm:ss')}}</span>
          <span v-else-if="item.dictName">{{item.value|dictionary(item.dictName)}}</span>
          <span v-else-if="item.options">{{getOptions(item)}}</span>
          <span
            :title="item.value"
            v-else
          >{{item.value}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
/**
 * @author 赵伦 2019-10-25
 * @description 侧边弹框状态条
 * @example
 * <side-statusbar :status="array" />
 *
 * array数据类型为
 * { label:'标签', value:'值', isTime:'是否需要转换为时间戳', dictName: '如果是业务字典，可以填写业务字典码名称' }
 */
export default {
  props: {
    status: {
      type: Array,
      default: () => [
        { label: '状态', value: '新建' },
        { label: '创建时间', value: +new Date(), isTime: true },
        { label: '来源', value: '新建' }
      ]
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    getOptions(item) {
      let [data] = item.options.filter(a => a.value == item.value);
      if (data) return data.label;
      else return '';
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
