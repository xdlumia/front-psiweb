/*
 * @Author: 徐贺
 * @Date: 2019-10-28 14:00:55
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-15 15:35:15
 * @Description: 生成拣货单和组装任务 人员分配 1
*/
<template>
  <form-card class="choose-man" title="人员分配">
    <div>
      <el-row>
        <el-col :span="10">
          <el-form-item
            :rules="[ 
              {required:true,message:'必填项'}
          ]"
            label="选择拆卸人"
            prop
            size="mini"
            v-if="!hide.includes('chooseTeardown')"
          >
            <employees-chosen :closeOnSelect="false" :multiple="false" @input="choose" class="d-inline" style="width:100%">
              <el-input :disabled="disabled" :value="employeeName" size="mini"></el-input>
            </employees-chosen>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            :rules="[ 
              {required:true,message:'必填项'}
          ]"
            label="选择组装人"
            prop
            size="mini"
            v-if="!hide.includes('chooseContact')"
          ></el-form-item>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-form-item label="备注" size="mini">
        <el-input :rows="3" maxlength="300" placeholder="备注" show-word-limit type="textarea" />
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
      addform: {},
      dialogData: {
        visible: false
      }
    };
  },
  methods: {
    //选择人员
    choose(value) {
      console.log(value);
      // value = {
      //   deptName: '进销存开发',
      //   employeeName: '王晓冬',
      //   id: '1',
      //   positionName: '',
      //   userId: '791'
      // };
      this.employeeName = value.employeeName;
      this.addform.blitemPerson = value.userId;
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
