/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 10:18:11
 * @Description: 备注信息 字段已绑定 1
*/
<template>
  <form-card title="备注信息">
    <div slot="title">
      <span>备注信息</span>
      <span
        class="fr"
        v-if="canModify"
      >
        <el-link
          :underline="false"
          @click="startEdit"
          type="primary"
          v-if="!isEdit"
        >编辑</el-link>
        <span v-else>
          <el-link
            :underline="false"
            @click="save"
            class="mr10"
            type="primary"
          >保存</el-link>
          <el-link
            :underline="false"
            @click="cancel"
            type="primary"
          >取消</el-link>
        </span>
      </span>
    </div>
    <el-row>
      <el-col
        :span="24"
        class
      >
        <el-form-item
          label="备注"
          prop="note"
          size="mini"
        >
          <!-- <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="!canEditable"
          >{{data.note}}</div>-->
          <el-input
            :disabled="!canEditable"
            :rows="3"
            placeholder="请输入备注信息"
            show-word-limit
            type="textarea"
            v-model="data.note"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="24"
        v-if="needUpload"
      >
        <el-form-item
          label="上传附件:"
          prop="attachList"
        >
          <!-- <div
            class="d-text-gray mt10 d-elip wfull"
            v-if="!canEditable"
          >上传附件</div>-->
          <upload-file
            :disabled="!canEditable"
            :limit="{
            type:['doc','pdf','xls','ppt','docx','xlsx','pptx','zip','rar','jpg'],
          }"
            @uploadSuccess="uploadFile"
            list-type="text"
          >
            <div class="al">
              <!-- 产品刘晨辉说，附件最多上传10个 -->
              <el-button
                size="mini"
                type="primary"
                v-if="canEditable && (data.attachList || []).length<10"
              >点击上传</el-button>
              <div
                :key="item.url"
                v-for="(item,i) of data.attachList || []"
              >
                <span class="el-icon-document"></span>
                <span
                  @click="openFile(item)"
                  class="d-inline f14 d-text-gray w200 d-elip ml10 mr10"
                  style="vertical-align:top;"
                >{{item.fileName}}</span>
                <span>
                  <el-link
                    @click.stop="delFile(i)"
                    type="info"
                    v-if="canEditable"
                  >
                    <i class="el-icon-circle-close"></i>
                  </el-link>
                </span>
              </div>
            </div>
          </upload-file>
        </el-form-item>
      </el-col>
      <!-- 贺兴龙说，跟产品沟通过，清单可以不要 -->
      <!-- <el-col :span="24" v-if="needUpload">
        <el-form-item label="附件文件名称清单" size="mini">
          <div class="wfull d-clear">
            <el-row :gutter="10">
              <el-col :span="2" class="ar">
                <span>1.</span>
              </el-col>
              <el-col :span="22">
                <div class="d-text-gray d-elip wfull" v-if="!canEditable">附件文件名称</div>
                <el-input inline placeholder v-else></el-input>
              </el-col>
              <el-col :offset="2" :span="22">
                <el-link :underline="false" class="el-icon-circle-plus-outline" size="mini" type="primary" v-if="canEditable">增加附件文件名称</el-link>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-col>-->
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
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    needUpload: {
      type: Boolean,
      default: true
    },
    // 禁用状态是否编辑
    canModify: Boolean
  },
  data() {
    return {
      isEdit: false,
      preData: null
      // fileList: []
    };
  },
  watch: {
    data() {
      // this.init();
    }
  },
  mounted() {
    // this.init();
  },
  computed: {
    canEditable() {
      if (this.canModify) {
        return this.isEdit;
      } else {
        return !this.disabled;
      }
    }
  },
  methods: {
    // init() {
    //   if (this.data && this.data.attachList) {
    //     if (typeof this.data.attachList == 'string') {
    //       this.data.attachList = JSON.parse(this.data.attachList);
    //     }
    //     this.fileList = this.data.attachList || [];
    //   }
    // },
    uploadFile({ name, url, oldName }) {
      if (!this.data.attachList) this.$set(this.data, 'attachList', []);
      this.data.attachList = this.data.attachList || [];
      this.data.attachList.push({
        fileName: oldName,
        fileUrl: url
      });
    },
    delFile(i) {
      this.data.attachList.splice(i, 1);
      // this.fileList.splice(i, 1);
    },
    openFile(item) {
      window.open(item.fileUrl, '_blank');
    },
    cancel() {
      this.data.attachList = this.preData.attachList;
      this.data.note = this.preData.note;
      this.isEdit = false;
    },
    save() {
      this.$emit('change', {
        attachList: this.data.attachList,
        note: this.data.note
      });
      this.isEdit = false;
    },
    startEdit() {
      this.isEdit = true;
      this.preData = JSON.parse(JSON.stringify(this.data));
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
