/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 11:14:09
 * @Description: 报价单信息
*/
<template>

  <div>
    <form-card :title="true">
      <div slot="title">
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
  </div>
</template>
<script>

export default {
  name: 'quotationInfo',
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
