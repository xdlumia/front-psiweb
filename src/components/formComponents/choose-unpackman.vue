/*
 * @Author: 徐贺
 * @Date: 2019-10-28 14:00:55
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-28 13:51:14
 * @Description: 拆卸单 人员分配 1
*/
<template>
  <form-card
    class="choose-man"
    title="人员分配"
  >
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :rules="[  
                {required:true,message:'必填项',trigger: 'input',}
            ]"
            label="选择拣货人"
            prop="disassemblyPerson"
            size="mini"
          >
            <employees-chosen
              :closeOnSelect="false"
              :multiple="false"
              @input="chooseChai"
              class="d-inline"
              style="width:100%"
            >
              <el-input
                :disabled="disabled"
                :value="employeeName"
                size="mini"
              ></el-input>
            </employees-chosen>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-form-item
        label="备注"
        size="mini"
      >
        <el-input
          :rows="3"
          placeholder="备注"
          show-word-limit
          type="textarea"
          v-model="data.note"
        />
      </el-form-item>
    </div>
  </form-card>
</template>
<script>
export default {
  components: {},
  props: {
    // 数据
    data: {
      type: Object,
      default: () => ({})
    },
    // 隐藏
    hide: {
      type: Array,
      default: () => []
    },
    disabled: Boolean
  },
  data() {
    return {
      options: [],
      employeeName: '',
      employeeAssembleName: '',
      dialogData: {
        visible: false
      }
    };
  },
  methods: {
    //选择拣货人员
    chooseChai(value) {
      this.employeeName = value.employeeName;
      this.$set(this.data, 'disassemblyPerson', value.userId);
    }
  }
};
</script>
<style lang="scss" scoped>
.choose-man {
  .add-icon {
    cursor: pointer;
  }
}
</style>
