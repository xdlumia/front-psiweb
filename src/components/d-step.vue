/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 18:18:20
 * @Description: 操作步骤条
 * @params: data: Arrar 标题名称
 * @params: v-model: Number 当前步骤 
 * @method: input 点击事件 返回下标
 * @example  
    <d-step
      v-model="steps"
      @input="click"
      :data="['选择客户','选择产品','确定配置信息','填写报价信息']">
    </d-step>
*/
<template>
  <div>
    <div class="steps">
      <div
        class="step"
        :class="{active:value >= index+1}"
        :key="index"
        @click="stepClick(index)"
        v-for="(item,index) of data"
      ><span class="icon">
          <i
            v-if="value > index+1"
            class="el-icon-check"
          ></i>
          <span v-else>{{index+1}}</span>

        </span>
        <div class="step-index"></div>
        <div class="step-title">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    value: {
      type: Number,
      default: 1,
    },
    data: {
      type: Array,
      default: [],
    }
  },
  methods: {
    stepClick(index) {
      this.$emit('input', index + 1)
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang="scss">
.steps {
  display: flex;
  white-space: nowrap;
  .step {
    position: relative;
    flex: 1;
    display: flex;
    text-align: center;
    color: #bbb;
    line-height: 30px;
    position: relative;
    font-size: 15px;
    flex-basis: 50%;
    &::after {
      content: "";
      display: block;
      background-color: #fff;
    }
    .icon {
      display: block;
      background-color: #fff;
      position: relative;
      z-index: 1;
      content: attr(data-index);
      border-radius: 50%;
      width: 30px;
      height: 30px;
      border: 1px solid #bbb;
    }
    &::after {
      background-color: #bbb;
      position: absolute;
      top: 15px;
      height: 1px;
      right: 5px;
      left: 11px;
    }
    &:last-child {
      flex-basis: 0%;
      &::after {
        height: 0px;
      }
    }
    &.active {
      color: #fff;
      .icon {
        background-color: #409eff;
        border-color: #409eff;
      }
      .step-title {
        font-weight: bold;
      }
    }
    .step-title {
      z-index: 2;
      height: 32px;
      line-height: 32px;
      left: 32px;
      background-color: #fff;
      padding-left: 10px;
      padding-right: 10px;
      color: #666;
      font-size: 16px;
    }
  }
}
</style>
