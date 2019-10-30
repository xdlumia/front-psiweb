/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 11:03:19
 * @Description: 报价单信息
*/
<template>

  <!-- 报价单信息 -->
  <form-card
    title="报价单信息"
    ref="quoto"
  >
    <div>
      报价单信息
      <i
        @click="quotoCollapse = !quotoCollapse"
        :class="{active:quotoCollapse}"
        class="collapse-arrow el-icon-arrow-right d-pointer"
      ></i>
    </div>
    <slot name="tabs">
      slot="tabs"
    </slot>

    <transition name="el-zoom-in-top">
      <div v-show="quotoCollapse">
        <slot name="body">
          slot="body"
        </slot>
      </div>
    </transition>
  </form-card>

</template>
<script>

export default {
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
