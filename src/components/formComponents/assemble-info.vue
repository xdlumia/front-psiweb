/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 库房  组装单 详情组件 基本信息
 */
<template>
  <div>
    <form-card title='基本信息'>
      <el-row>
        <el-col :span="20">
          <div class="d-text-black">备注</div>
          <el-input
            :disabled="disabled"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </el-col>
      </el-row>
    </form-card>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      textarea: ''
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
