/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-25 10:22:45
 * @Description: 公共组件引用
 */

import UploadFile from './upload-file.vue'
import QuillEditor from './quill-editor.vue'
import TableTop from './table-top.vue'

const uploadFile = {
  install: (Vue) => {
    Vue.component('uploadFile', UploadFile)
  }
}
const tableTop = {
  install: (Vue) => {
    Vue.component('tableTop', TableTop)
  }
}
const quillEditor = {
  install: (Vue) => {
    Vue.component('quillEditor', QuillEditor)
  }
}
export { uploadFile, quillEditor, tableTop }
