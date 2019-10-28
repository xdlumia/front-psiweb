/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 11:19:43
 * @Description: 备注信息
*/
<template>
  <form-card title="备注信息">
    <el-row>
      <el-col :span="24" class="pl5 pr5 pb5">
        <el-form-item label="备注" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">备注</div>
          <el-input placeholder type="textarea" v-else />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="上传附件" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">上传附件</div>
          <upload-file v-else></upload-file>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="附件文件名称清单" size="mini">
          <div class="wfull">
            <el-row>
              <el-col :span="2">
                <span>1.</span>
              </el-col>
              <el-col :span="22">
                <div class="d-text-gray mt10 d-elip wfull" v-if="!editable">附件文件名称</div>
                <el-input inline placeholder v-else></el-input>
              </el-col>
            </el-row>
            <el-link :underline="false" class="el-icon-circle-plus-outline" size="mini" type="primary" v-if="editable">增加附件文件名称</el-link>
          </div>
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
  props: {
    editable: Boolean
  }
};
</script>
<style lang="scss" scoped>
</style>