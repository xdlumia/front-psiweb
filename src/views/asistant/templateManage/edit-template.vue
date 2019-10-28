<!--辅助管理:合同模板
/**
* 财务组件：模板管理
* @/components/finance/index.vue 组件存放位置
* @author web-王晓冬
* @date 2018年8月6日
**/
-->

<template>
    <div>
        <el-row :gutter="20" style="width:1250px; margin:0 auto;" v-loading="loading">
          <el-col :span="8">
            <div style="overflow-y:auto; overflow-x:hidden" class="temp-fixed">
              <el-row :gutter="10">
                <el-col :span="24" class="d-text-gray">内置字段（不可修改,双击添加到模板正文</el-col>
                <el-col
                :span="12"
                v-for="(item,index) of beginFieldsList"
                :key="index"
                class="mt5 d-pointer">
                  <li class="module-item"
                  @dblclick="addField(item)"
                  draggable="true">
                  {{item.fieldName}}
                  <i class="fr el-icon-share" style="height: 28px; line-height: 28px;"></i>
                  </li>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24" class="d-text-gray mt20">自定义字段(双击添加到模板正文)</el-col>
                <el-col
                :span="12"
                v-for="(item,index) of customFieldsList"
                :key="index"
                class="mt5 d-pointer">
                  <li class="module-item"
                  @dblclick="addField(item)"
                  draggable="true">
                  {{item.fieldName}}
                  <i class="fr el-icon-share" style="height: 28px; line-height: 28px;"></i>
                  </li>
                </el-col>
              </el-row>
            </div>
            <!-- 没什么用占位用的 -->
            <div style="color:#fff">&nbsp;</div>
          </el-col>
          <el-col :span="16">
            <div style="height:32px;">合同编辑区域</div>
            <div class="editor-wrap">
              <!-- 工具栏 -->
              <div class="edit-toolBar">
                  <!-- <div class="edit-btn-group">
                    <a class="edit-btn" >
                      <i class="ediconfont icon-fontsize"></i>
                    </a>
                  </div> -->
                  <div class="edit-btn-group" v-for="(item,index) of editTool" :key="index">
                    <div class="edit-btn"
                    v-for="(subitem,i) of item.group" :key="i"
                    :title="subitem.label"
                    :class="{active:item.activeIndex==i}"
                    draggable="true"
                    @click="editBtn(subitem.role)">
                      <i v-if="item.iconType=='text'" style="font-size:16px">{{subitem.icon}}</i>
                      <i v-else class='ediconfont' :class="subitem.icon"></i>
                    </div>
                  </div>
              </div>
              <!-- 编辑区 -->
              <!-- <iframe id='editorBox' ref="editorBox" contentEditable></iframe> -->
              <div id ="editorBox" ref="editorBox" contenteditable v-html="templateForm.context"></div>
            </div>
            <div class="mt20">
              <el-button type="primary" @click="templateHandle('preview')" size="small">预览模板</el-button>
              <el-button type="primary" @click="templateHandle('save')" size="small">保存模板</el-button>
            </div>
          </el-col>
        </el-row>

    </div>
</template>
<script>
export default {
  props: ['templateForm'],
  data () {
    return {
      loading: false,
      fieldsList: {},
      beginFieldsList: [],
      customFieldsList: [],
      fontSize: '',
      editTool: [
        {
          group: [
            {
              role: 'bold',
              label: '粗体',
              icon: 'icon-bold'
            }, {
              role: 'italic',
              label: '斜体',
              icon: 'icon-italic'
            }, {
              role: 'underline',
              label: '下划线',
              icon: 'icon-underline'
            }, {
              role: 'strikeThrough',
              label: '删除线',
              icon: 'icon-strikeThrough'
            }
          ]
        }, {
          iconType: 'text',
          group: [
            {
              role: 'h1',
              label: 'h1标题',
              icon: 'H1'
            }, {
              role: 'h2',
              label: 'h2标题',
              icon: 'H2'
            }, {
              role: 'h3',
              label: 'h3标题',
              icon: 'H3'
            }, {
              role: 'h4',
              label: 'h4标题',
              icon: 'H4'
            }
          ]
        }, {
          group: [
            {
              role: 'justifyLeft',
              label: '居左对齐',
              icon: 'icon-align-left'
            }, {
              role: 'justifyCenter',
              label: '居中对齐',
              icon: 'icon-align-center'
            }, {
              role: 'justifyRight',
              label: '居右对齐',
              icon: 'icon-align-right'
            }
          ]
        }, {
          group: [
            {
              role: 'insertUnorderedList',
              label: '有序列表',
              icon: 'icon-ol'
            }, {
              role: 'insertOrderedList',
              label: '无序列表',
              icon: 'icon-ul'
            }
          ]
        }
      ]
    }
  },
  created () {
    // 初始化字段列表
    this.getFormfields({formId: this.templateForm.formId})
  },
  mounted () {
    var edit = this.$refs.editorBox
    edit.focus()
  },
  // activited
  // update
  // beforeRouteUpdate
  // metods
  methods: {

    // dragstart:function(){
    //   console.log(1)
    // },
    // 保存模板
    templateHandle (type) {
      if (type == 'preview') {//eslint-disable-line
        this.$emit('previewTemplate', 'preview')
      } else if (type == 'save') {//eslint-disable-line
        let divBox = this.$refs.editorBox
        // 获取合同编辑区域的字段span标签的fmd-code码
        let spans = divBox.querySelectorAll('a[fmd-code]')

        let codes = []
        for (let item of spans) {
          if (item.getAttribute('fmd-code') != null) {
            codes.push(item.getAttribute('fmd-code'))
          }
        }
        // 获取自定义字段的数据
        this.templateForm.userFields = this.customFieldsList.filter(item => {
          return codes.includes(item.fieldCode)
        })
        this.$emit('saveTemplate', 'save')
      }
    },
    // 添加字段
    addField (item) {
      // let model = `<div style="display:inline"><span style="color:#006699" data fmd-code=${item.fieldCode}>[ ${item.fieldName} ]</span></div> &nbsp`
      let model = `<a fmd-code=${item.fieldCode} style="color:#006699"> [ ${item.fieldName} ]</a> &nbsp`
      document.execCommand('insertHTML', false, model)
    },
    // 编辑功能
    editBtn (role) {
      // 实现业务功能
      switch (role) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
          document.execCommand('formatBlock', false, role)
          break
        default:
          document.execCommand(role, false, null)
          break
      }
    },
    // 获取字段列表
    getFormfields (params) {
      this.loading = true
      //  this.$api.seeContractService.getFormfields(params)
      this.$api.seeContractService.queryFormFields(params)
        .then(res => {
          if (res.code === 200) {
            let data = res.data || {}
            this.beginFieldsList = data.beginFieldsList || []
            this.customFieldsList = data.customFieldsList || []
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
  // filter
  // computed

}
</script>
<style scoped  style="scss">
  .module-item{ border:1px dashed #ccc; padding:5px 10px; line-height:28px; box-sizing: border-box; }
  .module-item:hover{border-color: #409EFF}
  .temp-fixed{position: fixed; top:53px; width: 400px; height: calc(100vh - 80px);}

</style>
