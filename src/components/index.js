/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 16:25:36
 * @Description: 公共组件引用
 */

import UploadFile from './upload-file.vue'
import QuillEditor from './quill-editor.vue'
import TableView from "@/components/tableView/index";
import DTabs from "@/components/tabs";
import DTabPane from "@/components/tabs/tab-pane";
import DStep from "@/components/d-step";
export default {
  install: (Vue) => {
    Vue.component('uploadFile', UploadFile)
    Vue.component('tableView', TableView)
    Vue.component('quillEditor', QuillEditor)
    Vue.component('dTabs', DTabs)
    Vue.component('dTabPane', DTabPane)
    Vue.component('dStep', DStep)
  }
}

