/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-30 09:57:03
 * @Description: 公共组件引用
 */

import UploadFile from './upload-file.vue'
import QuillEditor from './quill-editor.vue'
import TableView from "@/components/tableView/index";
import DTabs from "@/components/tabs";
import DTabPane from "@/components/tabs/tab-pane";

export default {
  install: (Vue) => {
    Vue.component('uploadFile', UploadFile)
    Vue.component('tableView', TableView)
    Vue.component('quillEditor', QuillEditor)
    Vue.component('dTabs', DTabs)
    Vue.component('dTabPane', DTabPane)
  }
}

