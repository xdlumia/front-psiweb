/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 19:44:34
 * @Description: 报价单信息
*/
<template>

  <div>
    <form-card :title="true">
      <div
        slot="title"
        class="d-flex"
        style="align-items:center"
      >
        <div @click="quotoCollapse = !quotoCollapse">
          {{title}}
          <i
            :class="{active:quotoCollapse}"
            class="collapse-arrow el-icon-arrow-right d-pointer"
          ></i>
        </div>
        <div class="ar d-cell">
          <slot name="title">

          </slot>
        </div>

      </div>
      <slot name="tabs">
      </slot>

      <transition name="el-zoom-in-top">
        <div v-show="quotoCollapse">
          <slot name="body">
            slot="body"
          </slot>
        </div>
      </transition>
    </form-card>
  </div>
</template>
<script>

export default {
  name: 'quotationInfo',
  props: {
    title: {
      type: String,
      default: "报价单信息"
    }
  },
  components: {
  },
  data() {
    return {
      quotoCollapse: true
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang="scss">
.collapse-arrow {
  transition: all 0.2s;
  &.active {
    transform: rotate(90deg);
  }
}
</style>
