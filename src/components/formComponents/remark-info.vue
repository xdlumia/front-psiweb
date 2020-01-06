/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 10:46:24
 * @Description: 邮件担保 or 合同收回 备注信息 字段已绑定 1
*/
<template>
  <form-card title="备注信息">
    <div slot="title">
      <span>{{title}}</span>
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
          prop="attachsVos"
        >
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
                v-if="canEditable && (data.attachsVos || []).length<10"
              >点击上传</el-button>
              <div
                :key="item.url"
                v-for="(item,i) of data.attachsVos || []"
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
          附件文件名称清单：
          <div v-if="disabled && !(data.fileNames || []).length">暂无数据</div>
          <div
            v-for="(item,i) of data.fileNames ||[]"
            :key="i"
            class="mb5"
          >
            <span>{{i+1}}. </span>
            <el-input
              v-model="item.name"
              style="width:220px"
              inline
              placeholder="请输入担保内容"
            ></el-input>
            <i
              v-if="canEditable"
              @click="data.fileNames.splice(i, 1)"
              class="f18 d-text-gray ml10 el-icon-remove-outline"
            ></i>
          </div>
          <el-button
            v-if="canEditable"
            type="text"
            class="d-block"
            icon="el-icon-circle-plus-outline"
            @click="data.fileNames.push({name:''})"
          >增加附件文件名称</el-button>
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
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      default: '备注'
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
    //   if (this.data && this.data.attachsVos) {
    //     if (typeof this.data.attachsVos == 'string') {
    //       this.data.attachsVos = JSON.parse(this.data.attachsVos);
    //     }
    //     this.fileList = this.data.attachsVos || [];
    //   }
    // },
    uploadFile({ name, url, oldName }) {
      if (!this.data.attachsVos) this.$set(this.data, 'attachsVos', []);
      this.data.attachsVos = this.data.attachsVos || [];
      this.data.attachsVos.push({
        fileName: oldName,
        fileUrl: url
      });
    },
    delFile(i) {
      this.data.attachsVos.splice(i, 1);
      // this.fileList.splice(i, 1);
    },
    openFile(item) {
      window.open(item.fileUrl, '_blank');
    },
    cancel() {
      this.data.attachsVos = this.preData.attachsVos;
      this.data.note = this.preData.note;
      this.isEdit = false;
    },
    save() {
      this.$emit('change', {
        attachsVos: this.data.attachsVos,
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
