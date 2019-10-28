/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 18:28:54
 * @Description: 备注信息
*/
<template>
  <form-card title="备注信息">
    <el-row>
      <el-col
        :span="24"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          label="备注"
          size="mini"
        >
          <el-input
            placeholder="请输入内容"
            type="textarea"
            :rows="3"
            show-word-limit
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="上传附件"
          size="mini"
        >
          <upload-file
            v-model="pic"
            :limit="{type:['jpg','png','gif','jpeg']}"
          ></upload-file>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="附件文件名称清单"
          size="mini"
        >
          <div>
            <el-input
              placeholder
              inline
            >
              <template slot="prepend">1.</template>
            </el-input>
          </div>
          <el-link
            :underline="false"
            class="el-icon-circle-plus-outline"
            size="mini"
            type="primary"
          >增加附件文件名称</el-link>
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
import uploadFile from '@/components/upload-file';

export default {
  components: {
    uploadFile
  },
  data() {
    return {
      pic: '',
    }
  }
};
</script>
<style lang="scss" scoped>
</style>