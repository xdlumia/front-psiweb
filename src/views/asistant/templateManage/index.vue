<!--辅助管理:合同模板
/**
* 财务组件：模板管理
* @/components/finance/index.vue 组件存放位置
* @author web-王晓冬
* @date 2018年8月6日
**/
-->
<template>
  <div class="d-content main-content">
    <el-row class="bb pb10">
      <el-col :span="12">
        <el-input
          class="w280 fl"
          placeholder="请输入合同名称"
          :size="buttonSize"
          @keyup.native.13="queryHandle"
          v-model="queryForm.name"
        >
          <div slot="append" class="d-pointer" @click="queryHandle">
            <i class="el-icon-search"></i>
          </div>
        </el-input>
      </el-col>
      <el-col :span="12" class="ar">
        <el-button
          v-if="authorityButtons.includes('asystem_assist_template_1001')"
          :size="buttonSize"
          type="primary"
          icon="el-icon-plus"
          @click="addTeamplate"
        >新建模板</el-button>
        <el-button
          v-if="authorityButtons.includes('asystem_assist_template_1002')"
          :size="buttonSize"
          icon="el-icon-plus"
          @click="addClass"
        >新建分类</el-button>
      </el-col>
    </el-row>
    <el-scrollbar class="pb10" style="height:calc(100% - 47px)" v-loading="loading">
      <div>
        <el-input
          v-if="isAddClass"
          class="w280 mt10"
          v-focus="isAddClass"
          v-model="saveClassForm.name"
          @keyup.native="saveTemplateClass"
          placeholder="分类名称(esc取消,enter保存)"
          :size="buttonSize"
        >
          <el-button slot="append" @click="saveTemplateClass('save')">确定</el-button>
        </el-input>
      </div>
      <div v-show="!templateList.length" class="mt10">暂无模板</div>
      <div
        class="contract-box mt10"
        :class="{active:index == dragActive}"
        v-for="(item,index) of templateList"
        :key="index"
        @drop="drop($event,index,item)"
        @dragover="allowDrop($event)"
        @dragenter="dragenter($event,index)"
      >
        <h4 class="d-text-gray">
          <div class="d-inlineblock template-className d-elip">
            <!-- v-if="item.edit" -->
            <el-input
              @keyup.native="updateTemplateClass($event,item,index)"
              @blur="updateTemplateClass('edit',item,index)"
              v-model="item.name"
              v-focus="item.edit"
              v-if="item.edit"
              class="w220"
              size="mini"
            ></el-input>
            <span v-else @dblclick="editTeamplateClass(item,index)">{{item.name}}</span>
            ({{item.templateList==null?'0':item.templateList.length}})
            <div class="template-tips">
              <i
                v-show="(!item.templateList|| !item.templateList.length) && item.isBuiltIn"
                class="el-icon-close d-pointer"
                @click="delClass(item,index)"
                title="删除分类"
              ></i>
              <span
                class="f12"
                style="color:#999"
                title="您可以拖拽审批表分类进行排序，亦可拖拽分类下的审批表进行排序;鼠标双击分类名称修改,回车即可保存修改，ESC不保存"
              >您可以拖拽审批表分类进行排序，亦可拖拽分类下的审批表进行排序;鼠标双击分类名称修改,回车即可保存修改，ESC不保存</span>
            </div>
          </div>
        </h4>
        <el-row class="pt10 pr35" :gutter="30">
          <el-col
            :span="24"
            v-show="!item.templateList|| !item.templateList.length"
            style="color:#999"
          >此分类下暂无合同模板</el-col>
          <el-col
            class="mb10"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="4"
            v-for="(subItem, i) of item.templateList"
            :key="i"
          >
            <div :draggable="isDraggable" @dragstart="dragstart($event,index,subItem)">
              <el-card
                class="template-card"
                :class="{active:templateActive == index+'-'+i}"
                body-style="padding:10px;"
              >
                <!-- 拖动区域 -->
                <div class="d-absolute drag-area" v-on:mousedown="dragMouseDown($event)"></div>
                <!-- 内容 -->
                <div style="height:87px;" @click="templateClick(index+'-'+i,subItem)">
                  <el-row style="height:28px;">
                    <el-col :span="19" class="d-elip">
                      <strong class="d-inlineblock mr5 d-text-qgray">{{i+1}}</strong>
                      <el-input
                        @keyup.native="updateTemplate($event,subItem,index)"
                        @blur="updateTemplate('blur',subItem,index)"
                        v-if="subItem.edit"
                        v-model="subItem.name"
                        v-focus="subItem.edit"
                        style="width:60%"
                        size="mini"
                      ></el-input>
                      <span
                        :title="subItem.name"
                        v-else
                        @dblclick="itemHandle(subItem,index,'rename')"
                      >{{subItem.name}}</span>
                    </el-col>
                    <el-col :span="5" class="ar">
                      <el-tag size="mini" type="info" v-if="subItem.isBuiltIn==0">内置</el-tag>
                      <el-switch
                        v-if="authorityButtons.includes('asystem_assist_template_1007') && subItem.isBuiltIn==1"
                        class="fr"
                        :active-value="0"
                        :inactive-value="1"
                        @change="updateTemplate('edit',subItem,index)"
                        v-model="subItem.isEnabled"
                      ></el-switch>
                    </el-col>
                  </el-row>
                  <p
                    class="template-text f12 d-text-qgray"
                    :title="subItem.description"
                  >{{subItem.description}}</p>
                  <p class="d-elip f12 d-text-qgray mt5" title="委托合同">表单关联:{{subItem.formName}}</p>
                </div>
                <div class="toolBar d-bg-white">
                  <div>
                    <el-button
                      v-if="authorityButtons.includes('asystem_assist_template_1003')"
                      size="mini"
                      class="mb5"
                      @click="templatePreview(subItem)"
                    >预览</el-button>
                  </div>
                  <div>
                    <el-button
                      v-if="authorityButtons.includes('asystem_assist_template_1004')"
                      size="mini"
                      class="mb5"
                      @click="itemHandle(subItem,index,'edit')"
                    >编辑</el-button>
                  </div>
                  <div>
                    <el-button
                      v-if="authorityButtons.includes('asystem_assist_template_1005')"
                      size="mini"
                      class="mb5"
                      @click="itemHandle(subItem,index,'rename')"
                    >重命名</el-button>
                  </div>
                  <div>
                    <el-button
                      v-if="authorityButtons.includes('asystem_assist_template_1006')"
                      size="mini"
                      class="mb5"
                      @click="itemHandle(subItem,index,'del')"
                    >删除</el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>

    <el-dialog
      :title="dialogTitile"
      v-loading="addLoading"
      modal-append-to-body
      append-to-body
      :close-on-press-escape="false"
      :fullscreen="isFullscreen"
      :visible.sync="dialogVisible"
      :before-close="dialogClose"
      :width="dialogWidth"
    >
      <component
        v-if="dialogVisible"
        @previewTemplate="templatePreview('editor')"
        @saveTemplate="editTemplateUpdate"
        :is="templateStep"
        :contractClass="templateList"
        :templateForm="saveTemplateForm"
        ref="templateStep"
      ></component>
      <div slot="footer" class="ac">
        <el-button
          v-if="templateStep=='addTemplate'"
          size="small"
          type="primary"
          @click="addTemplateSave"
        >保存并下一步</el-button>
        <!-- <el-button v-if="templateStep=='editTemplate'" size="small" type="primary" @click="templatePreview('editor')">预览模板</el-button>
        <el-button v-if="templateStep=='editTemplate'" size="small" type="primary" @click="editTemplateUpdate">保存模板</el-button>-->
      </div>
    </el-dialog>
    <!-- 合同预览 -->
    <contract-preview :visible.sync="isEditorPreview" :templateData="saveTemplateForm"></contract-preview>
    <!-- <transition name="el-zoom-in-top">
            <div class="editor-wrap editorPreview" v-show="isEditorPreview">
                <div class="editor-box">
                  <div class="title">{{saveTemplateForm.name}}</div>
                  <div class="close el-icon-close" @click="isEditorPreview = false"></div>
                  <div id="editorArticle" v-html="saveTemplateForm.context">
                  </div>
                </div>
            </div>
    </transition>-->
  </div>
</template>
<script>
import addTemplate from './add-template' // 添加模板第一步
import editTemplate from './edit-template' // 添加模板第一步
import contractPreview from '@/views/asistant/templateManage/contract-preview' // 模板预览
import Vue from 'vue'//eslint-disable-line
// import incomeTurnover from './incomeTurnover'//收支流水组件
export default {
  // components
  components: {
    addTemplate,
    editTemplate,
    contractPreview
  },
  props: ['source'],
  // data
  data() {
    return {
      // 模板查询
      queryForm: {
        name: '',
        dataSource: this.$local.fetch('userInfo').syscode
      },
      // 保存模板分类
      saveClassForm: {
        name: '',
        id: '',
        dataSource: this.$local.fetch('userInfo').syscode
      },
      oldTemplateName: '', // 修改前的模板和模板分类名称
      // 保存新建模板
      saveTemplateForm: {
        name: '', // 模板名称
        description: '', // 模板描述
        templateCategoryId: '', // 模板分类名称
        id: '',
        context: '', // 模板编辑器内容
        formId: '', // 模板表单内容
        isEnabled: '', // 是否开启
        dataSource: ''
      },
      loading: false, // 页面载入加载动画
      addLoading: false, // 保存动画
      isAddClass: false, // 是否添加分类
      isDraggable: false, // 是否拖拽
      currentDragJson: {},
      templateActive: '', // 当前选中模板的下标
      currentDragActive: '', // 当前拖拽的分组
      dialogVisible: false, // 弹出框是否显示
      dialogWidth: '460px',
      isFullscreen: false, // 弹出框是否全屏
      dialogTitile: '弹出框title',
      templateStep: 'addTemplate',
      dragActive: -1, // 无拖拽
      isEditorPreview: false,
      templateList: [] // 合同模板列表
    }
  },
  created() {
    // 初始化模板列表
    this.getTemplatecategoryList(this.queryForm)
  },
  // mounted
  // activited
  // update
  // beforeRouteUpdate
  // metods
  computed: {
    buttonSize() {
      return this.source ? 'mini' : 'small'
    }
  },
  methods: {
    //  查询模板
    queryHandle() {
      this.getTemplatecategoryList(this.queryForm)
    },

    // 新增分类
    addClass() {
      this.isAddClass = !this.isAddClass
    },
    // 新建模板分类事件
    saveTemplateClass(e, item) {
      if (e.keyCode == 13 || e == 'save') {//eslint-disable-line
        if (this.saveClassForm.name == '') {//eslint-disable-line
          this.$message.error('请输入分类名称')
          return
        }
        this.saveTemplatecategory(this.saveClassForm)
      } else if (e.keyCode == 27) {//eslint-disable-line
        this.isAddClass = false
      }
    },
    templateClick(index, row) {
      this.templateActive = index
      this.$emit('input', row.id)
    },
    // 编辑模板分类名称
    editTeamplateClass(item, index) {
      this.oldTemplateName = item.name
      item.edit = true
      this.templateList.splice(index, 0)
    },

    // 更新模板分类事件
    updateTemplateClass(e, item, index) {
      if (e.keyCode == 27) {//eslint-disable-line
        item.edit = false
        item.name = this.oldTemplateName
        this.templateList.splice(index, 0)
        this.$message.info('取消修改')
      } else if ((e.keyCode == 13 || e == 'edit') && item.edit) {//eslint-disable-line
        this.saveClassForm.name = item.name
        this.saveClassForm.id = item.id
        if (this.saveClassForm.name == '') {//eslint-disable-line
          this.$message.error('请输入分类名称')
          return
        }

        this.saveTemplatecategory(this.saveClassForm)
      }
    },

    // 删除分类
    delClass(item, index) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$api.seeContractService
            .delTemplatecategory({ id: item.id })
            .then(res => {
              if (res.code === 200) {
                this.templateList.splice(index, 1)
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 在编辑合同的关闭需要二次确认
    dialogClose(done) {
      if (this.templateStep == 'editTemplate') {//eslint-disable-line
        this.$confirm('您还没有保存合同模板,确认关闭？', {
          center: true,
          type: 'warning'
        })
          .then(_ => {
            done()
          })
          .catch(_ => { })
      } else {
        done()
      }
    },
    // 鼠标固定区域按下才能拖动
    dragMouseDown(e) {
      this.isDraggable = true // 开启拖动功能
    },
    // 模板列表项目操作按钮
    itemHandle(item, index, type) {
      for (const key in this.saveTemplateForm) {
        this.saveTemplateForm[key] = item[key]
      }
      if (type == 'edit') {//eslint-disable-line
        // 查询合同内容
        this.$api.seeContractService.getTemplateInfo(item.id)
          .then(res => {
            // 在列表的时候预览
            this.saveTemplateForm.context = res.data.context
          })
        // 显示编辑内容
        this.dialogVisible = true
        this.isFullscreen = true
        this.templateStep = 'editTemplate'
        this.dialogWidth = '100%'
        this.dialogTitile = '自定义模板'
      } else if (type == 'rename') {//eslint-disable-line
        this.oldTemplateName = item.name
        item.edit = true
        this.templateList[index].templateList.splice(
          this.templateList[index].templateList.indexOf(item), 0
        )
      } else if (type == 'del') {//eslint-disable-line
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$api.seeContractService.delTemplate({ id: item.id })
              .then(res => {
                if (res.code == 200) {//eslint-disable-line
                  this.templateList[index].templateList.splice(
                    this.templateList[index].templateList.indexOf(item), 1
                  )
                }
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 保存重命名
    updateTemplate(e, item, index) {
      if (e.keyCode == 27) {//eslint-disable-line
        item.edit = false
        item.name = this.oldTemplateName
        this.templateList[index].templateList.splice(this.templateList[index].templateList.indexOf(item), 0)
      } else if (
        ((e.keyCode == 13 || e == 'blur') && item.edit) || e == 'edit'//eslint-disable-line
      ) {
        item.edit = false
        this.templateList[index].templateList.splice(this.templateList[index].templateList.indexOf(item), 0)
        for (const key in this.saveTemplateForm) {
          this.saveTemplateForm[key] = item[key]
        }
        this.$api.seeContractService
          .updateTemplate(this.saveTemplateForm)
          .then(res => {
            if (res.code == 200) {//eslint-disable-line
              // this.getTemplatecategoryList(this.queryForm)
            }
          }).finally(() => {
            this.loading = false//eslint-disable-line
          })
      }
    },
    // 开始拖拽
    dragstart: function(event, index, item) {
      // 记录拖拽的内容和下标
      this.currentDragJson = item
      this.currentDragActive = index
    },
    // 被拖拽的元素在目标元素上同时鼠标放开触发的事件
    drop: function(event, index, item) {
      event.preventDefault()
      this.currentDragJson.templateCategoryId = item.id
      this.$api.seeContractService
        .updateTemplate(this.currentDragJson)
        .then(res => {
          if (res.code == 200) {//eslint-disable-line
            this.templateList[this.currentDragActive].templateList.splice(
              this.templateList[this.currentDragActive].templateList.indexOf(
                this.currentDragJson
              ),
              1
            )
            this.templateList[index].templateList.push(this.currentDragJson)
          }
        })

      this.dragActive = -1
      this.isDraggable = false // 关闭拖动
    },
    allowDrop: function(event) {
      event.preventDefault()
    },
    // 当拖曳元素进入目标元素的时候触发的事件
    dragenter(e, index) {
      this.dragActive = index
    },
    // 新增模板
    addTeamplate() {
      (this.dialogVisible = true),//eslint-disable-line
        (this.templateStep = 'addTemplate'),//eslint-disable-line
        (this.isFullscreen = false),//eslint-disable-line
        (this.dialogWidth = '460px'),//eslint-disable-line
        (this.dialogTitile = '新建模板')//eslint-disable-line
      // 新建清空
      for (const key in this.saveTemplateForm) {
        this.saveTemplateForm[key] = ''
      }
      this.saveTemplateForm.dataSource = this.$local.fetch('userInfo').syscode
    },

    // 模板第一步保存
    addTemplateSave() {
      // 必填项校验
      this.$refs.templateStep.$refs.saveTemplateForm.validate(valid => {
        if (valid) {
          this.addLoading = true
          delete this.saveTemplateForm.userFields
          this.$api.seeContractService.saveTemplate(this.saveTemplateForm)
            .then(res => {
              if (res.code == 200) {//eslint-disable-line
                this.isFullscreen = true
                this.templateStep = 'editTemplate'
                this.dialogWidth = '100%'
                this.dialogTitile = '自定义模板'
                this.getTemplatecategoryList(this.queryForm)
                this.saveTemplateForm.id = res.data || ''
              }
            })
            .finally(() => {
              this.addLoading = false
            })
        } else {
          return false
        }
      })
    },
    // 预览模板
    templatePreview(item) {
      if (item == 'editor') {//eslint-disable-line
        // 在编辑的时候预览
        this.saveTemplateForm.context = this.$refs.templateStep.$refs.editorBox.innerHTML
      } else {
        this.$api.seeContractService.getTemplateInfo(item.id)
          .then(res => {
            // 在列表的时候预览
            this.saveTemplateForm.context = res.data.context
          })
        this.saveTemplateForm.name = item.name
      }
      // 显示编辑器
      this.isEditorPreview = true
    },
    // 更新编辑模板
    editTemplateUpdate() {
      this.saveTemplateForm.context = this.$refs.templateStep.$refs.editorBox.innerHTML
      this.$api.seeContractService
        .updateTemplate(this.saveTemplateForm)
        .then(res => {
          if (res.code == 200) {//eslint-disable-line
            this.dialogVisible = false
            this.getTemplatecategoryList(this.queryForm)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 获取合同模板
    getTemplatecategoryList(params) {
      this.loading = true
      this.$api.seeContractService.getTemplatecategoryList(params).then(res => {
        if (res.code == 200) {//eslint-disable-line
          this.templateList = res.data || []
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 保存合同模板分类
    saveTemplatecategory: function(params) {
      this.loading = true
      this.$api.seeContractService.saveTemplatecategory(params).then(res => {
        if (res.code == 200) {//eslint-disable-line
          this.saveClassForm.name = ''
          this.queryForm.name = ''
          this.getTemplatecategoryList(this.queryForm)
        }
      })
        .finally(() => {
          this.isAddClass = false
          this.loading = false
        })
    }
  }

  // filter
  // computed
}
</script>
<style scoped  lang="scss">
.template-card {
  overflow: visible;
  position: relative;
  .template-text {
    overflow: hidden;
    width: 100%;
    max-height: 36px;
  }
}
.contract-box {
  border: 1px solid #fff;
  margin-right: 60px;
}
.contract-box.active {
  border-color: #409eff;
}
.template-card.active {
  border: 1px solid #409eff;
}
.template-card .toolBar {
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  z-index: 1;
}
.template-card:hover .toolBar {
  display: block;
}
.template-tips {
  display: none;
}
.template-className {
  border-left: 1px solid #409eff;
  padding-left: 10px;
}
.template-className:hover .template-tips {
  display: inline-block;
}
.drag-area {
  width: 100%;
  height: 10px;
  top: 0;
  left: 0;
}
.drag-area:hover {
  cursor: move;
}
</style>
