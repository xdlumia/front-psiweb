
import UploadFile from './upload-file.vue'
import QuillEditor from './quill-editor.vue'

const uploadFile = {
  install: (Vue) => {
    Vue.component('uploadFile', UploadFile)
  }
}
const quillEditor = {
  install: (Vue) => {
    Vue.component('quillEditor', QuillEditor)
  }
}
export { uploadFile, quillEditor }
