/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 11:24:21
 * @Description: 侧边弹框状态条
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
    <div class="d-bg-gray side-statusbar" style="margin:-10px;padding:10px 20px;">
      <el-row>
        <el-col :key="item.label" :span="span" class="d-text-qgray" v-for="item of status">{{item.label}}</el-col>
      </el-row>
      <el-row>
        <el-col :key="item.label" :span="span" v-for="item of status">
          <span v-if="item.isTime">{{item.value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
          <span v-else-if="item.dictName">{{item.value|dictionary(item.dictName)}}</span>
          <span v-else>{{item.value}}</span>
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
  computed: {
    span() {
      let length = this.status.length;
      let baseSpan = Math.floor(24 / length);
      return baseSpan;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
