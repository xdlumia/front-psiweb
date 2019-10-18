<template>
  <div class="wfull ">
    <upload-file ref="activeUpload" class="over active-upload" :class="refs" @uploadSuccess="uploadSuccess" :limit="obj" ></upload-file>
    <quill-editor ref="myQuillEditor" :options="editorOption" v-model="editorContent" placeholder="请输入"></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
const toolbarOptions = [
  ['bold', 'italic', 'underline'], // toggled buttons
  // ['blockquote', 'code-block'],

  // [{ header: 1 }, { header: 2 }], // custom button values
  [{
    list: 'ordered'
  }, {
    list: 'bullet'
  }],
  // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{
    indent: '-1'
  }, {
    indent: '+1'
  }], // outdent/indent
  // [{ direction: 'rtl' }], // text direction

  // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{
    header: [1, 2, 3, 4, 5, 6, false]
  }],

  [{
    color: []
  }
    // { background: [] }
  ], // dropdown with defaults from theme
  // [{ font: [] }],
  [{
    align: []
  }],
  // ['link', 'image', 'video']
  ['image']
]

export default {
  props: {
    refs: {
      default: 'myQuillEditor'
    },
    value: {
      required: true
    },
    toolbar: {
      required: false,
      default: function () {
        return toolbarOptions
      }
    }
  },
  components: {
    quillEditor
  },
  data () {
    return {
      obj: {
        size: '1',
        type: ['jpg', 'png', 'jpeg', 'js', 'gif', 'xlsx', 'xls']
      },
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      header: {
        token: sessionStorage.token
      }, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: this.toolbar, // 工具栏
            handlers: {
              image: (value) => {
                if (value) {
                  let uploadEl = this.$refs.activeUpload.$el
                  uploadEl.querySelector('input').click()
                  // 触发input框选择图片文件
                  // document.querySelector(`.${this.refs}.active-upload input`).click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      } // 富文本编辑器配置
    }
  },
  methods: {
    // 获取上传文件后ossurl
    uploadSuccess (obj) {
      let quill = this.$refs.myQuillEditor.quill
      // 获取光标所在位置
      let length = quill.getSelection().index
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', obj.url)
      // 调整光标到最后
      quill.setSelection(length + 1)
    }
  },
  mounted () {
    // this.detailContent = this.editorData
  },
  created () {

  },
  computed: {
    editorContent: {
      set: function (newVal) {
        this.$emit('input', newVal)
      },
      get: function () {
        return this.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .over {
        position: absolute;
        z-index: -99999;
        left: -99999;
    }
</style>
<style>
    /* 编辑器样式 */
    .ql-editor{
      padding:10px;
      min-height: 100px;
    }
    .ql-container {
        min-height: 100px;
    }
</style>
