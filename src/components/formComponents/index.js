/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 10:17:48
 * @Description: 公共表单组件引用
 */
const files = require.context('.', true, /\.vue$/)
// console.log(files.keys());
console.log(files('./apportion-info.vue').default);

let configRouters = []
files.keys().map(key => {
  // Vue.component('uploadFile', UploadFile)
  console.log(files(key).default.name);

});
import UploadFile from '../upload-file.vue'

// import QuillEditor from './quill-editor.vue'
// import TableView from "@/components/tableView/index";
// import DTabs from "@/components/tabs";
// import DTabPane from "@/components/tabs/tab-pane";
// import DStep from "@/components/d-step";
// import SideDetail from "@/components/side-detail";
export default {
  // install: (Vue) => {
  //   Vue.component('uploadFile', UploadFile)
  //   Vue.component('tableView', TableView)
  //   Vue.component('quillEditor', QuillEditor)
  //   Vue.component('dTabs', DTabs)
  //   Vue.component('dTabPane', DTabPane)
  //   Vue.component('dStep', DStep)
  //   Vue.component('sideDetail', SideDetail)
  // }
}

