/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 18:24:43
 * @Description: 备注信息
*/
<template>
  <form-card title="备注信息">
    <div slot="title">
      <span>备注信息</span>
      <span class="fr" v-if="canModify">
        <el-link :underline="false" type="primary" v-if="!edit">编辑</el-link>
        <span v-else>
          <el-link :underline="false" class="mr10" type="primary">保存</el-link>
          <el-link :underline="false" type="primary">取消</el-link>
        </span>
      </span>
    </div>
    <el-row>
      <el-col :span="24" class="pl5 pr5 pb5">
        <el-form-item label="备注" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!canEditable">备注</div>
          <el-input :rows="3" maxlength="300" placeholder show-word-limit type="textarea" v-else v-model="form.textarea" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="上传附件" size="mini">
          <div class="d-text-gray mt10 d-elip wfull" v-if="!canEditable">上传附件</div>
          <upload-file v-else></upload-file>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="附件文件名称清单" size="mini">
          <div class="wfull d-clear">
            <el-row>
              <el-col :span="2" class="ar">
                <span>1.</span>
              </el-col>
              <el-col :span="22">
                <div class="d-text-gray d-elip wfull" v-if="!canEditable">附件文件名称</div>
                <el-input inline placeholder v-else></el-input>
              </el-col>
            </el-row>
            <el-link :underline="false" class="el-icon-circle-plus-outline" size="mini" type="primary" v-if="canEditable">增加附件文件名称</el-link>
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
    form: {
      type: Object,
      default: () => ({})
    },
    editable: {
      type: Boolean,
      default: true
    },
    canModify: Boolean
  },
  data() {
    return {
      edit: false
    };
  },
  computed: {
    canEditable() {
      if (this.canModify) {
        return this.edit;
      } else {
        return this.editable;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>