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
     <transition name="el-zoom-in-top">
      <div class="editor-wrap editorPreview" ref="editorPreview" v-show="visible">
        <div class="editor-box">
          <div class="template-title" ref="templateTitle">
            <div class="template-box">
              <div class="title d-elip">{{templateData.name}}</div>
              <div class="close el-icon-close" @click="$emit('update:visible',false)"></div>
            </div>
          </div>
          <div v-if="templateData.context==''" class="ac d-text-qgray"> 暂无合同内容 </div>
          <div id="editorArticle" v-html="templateData.context">
            <!-- <editor-view creatHtml="">Hello world!</editor-view> -->
          </div>
        </div>
      </div>
    </transition>
 </div>
</template>

<script>
export default {
  props: {
    templateData: {
      default: {},
      required: true
    },
    visible: {
      default: false,
      required: true
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  created () {
  },
  computed: {
    visibleState () {
      return this.visible
    }
  },
  methods: {
    init () {
      let el = this.$refs.templateTitle
      let scrollEl = this.$refs.editorPreview
      scrollEl.addEventListener('scroll', function () {
        if ((scrollEl.scrollTop - 20) >= 0) {
          el.classList.add('active')
        } else {
          el.classList.remove('active')
        }
      })
    }
  },
  watch: {
    visibleState () {
      this.init()
    }
  }
}
</script>

<style>
</style>
