/*
 * @Author: 徐贺
 * @Date: 2019-10-28 14:00:55
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-11 15:51:27
 * @Description: 生成拣货单和组装任务 人员分配
*/
<template>
  <form-card
    class="choose-man"
    title="人员分配"
  >
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
          >
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
          >
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
          maxlength="300"
          placeholder="备注"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
    </div>
  </form-card>
</template>
<script>

export default {
  components: {
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      options: [],
      dialogData: {
        visible: false
      }
    };
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
