/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-25 17:56:24
 * @Description: 公共组件引用
 */

import UploadFile from './upload-file.vue'
import QuillEditor from './quill-editor.vue'
import TableView from "@/components/tableView/index";

const uploadFile = {
  install: (Vue) => {
    Vue.component('uploadFile', UploadFile)
  }
}
const tableView = {
  install: (Vue) => {
    Vue.component('tableView', TableView)
  }
}
const quillEditor = {
  install: (Vue) => {
    Vue.component('quillEditor', QuillEditor)
  }
}
export { uploadFile, quillEditor, tableView }
