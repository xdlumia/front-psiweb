/*
 * @Author: 徐贺
 * @Date: 2019-10-28 14:00:55
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-10 17:40:46
 * @Description: 生成拣货单和组装任务 人员分配 1
*/
<template>
  <form-card
    class="choose-man"
    title="人员分配"
  >
    <div>
      <el-row :gutter="20">
        <el-col
          :span="12"
          v-if="!hide.includes('pickingPerson')"
        >
          <el-form-item
            :rules="[  
              {required:true,message:'必填项',trigger: 'change',}
          ]"
            label="选择拣货人"
            prop="employeeName"
            size="mini"
          >
            <employees-chosen
              :closeOnSelect="false"
              :multiple="false"
              @input="chooseChai"
              value="791"
              class="d-inline"
              style="width:100%"
            >
              <el-input
                :disabled="disabled"
                :value="data.employeeName"
                size="mini"
              ></el-input>
            </employees-chosen>
          </el-form-item>
        </el-col>
        <el-col
          :span="12"
          v-if="!hide.includes('assemblePerson')"
        >
          <el-form-item
            :rules="[ 
              {required:true,message:'必填项',trigger: 'change',}
          ]"
            label="选择组装人"
            size="mini"
            prop="employeeAssembleName"
          >
            <employees-chosen
              :closeOnSelect="false"
              :multiple="false"
              @input="chooseAssemble"
              class="d-inline"
              style="width:100%"
            >
              <el-input
                :disabled="disabled"
                :value="data.employeeAssembleName"
                size="mini"
              ></el-input>
            </employees-chosen>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div v-if="!hide.includes('note')">
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
    disabled: Boolean,
  },
  data() {
    return {
      options: [],
      // employeeName: '',
      // employeeAssembleName: '',
    };
  },
  created() {
    this.data.employeeName = this.$options.filters.userName(this.data.pickingPerson)
  },
  methods: {
    //选择拣货人员
    chooseChai(value) {
      this.data.employeeName = value.employeeName;
      this.data.pickingPerson = value.userId;
    },
    //选择组装人员
    chooseAssemble(value) {
      this.data.employeeAssembleName = value.employeeName;
      this.data.assemblePerson = value.userId;
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
