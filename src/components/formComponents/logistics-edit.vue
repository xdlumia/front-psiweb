/*
 * @Author: 徐贺
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 17:20:29
 * @Description: 物流信息 可编辑
*/
<template>
  <el-form
    :model="logForm"
    class="p10"
    label-position='top'
  >
    <form-card
      class="mb10 d-relative"
      :title="index == 0 ? '物流信息' : ''"
      v-for="(item, index) in logForm.logArr"
      :key="index"
    >
      <el-button
        @click="deleteLogArr(index)"
        v-if="index != 0"
        class="d-absolute"
        style="right:5px;top:5px;z-index:100;"
        type="danger"
        icon="el-icon-delete"
        size="small"
        circle
      ></el-button>
      <el-row>
        <el-col
          :span="8"
          class="pl5 pr5 pb5"
        >
          <el-form-item
            :prop="'item.' + index + '.value'"
            :rules="[ 
                    {required:true,message:'请选择服务商'}
                ]"
            label="服务商"
            size="mini"
          >
            <el-select
              class="wfull"
              v-model="value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          class="pl5 pr5 pb5"
        >
          <el-form-item
            :prop="'item.' + index + '.value'"
            :rules="[ 
                    {required:true,message:'请选择服务类型'}
                ]"
            label="服务类型"
            size="mini"
          >
            <el-select
              class="wfull"
              v-model="value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          class="pl5 pr5 pb5"
        >
          <el-form-item
            :prop="'item.' + index + '.value'"
            maxlength="32"
            :rules="[{type:'telePhone'},
                    {required:true,message:'请输入运费金额'}]"
            label="运费金额"
            size="mini"
          >
            <el-input
              placeholder="请输入运费金额"
              v-model="form.telPhone"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          class="pl5 pr5 pb5"
        >
          <el-form-item
            :prop="'item.' + index + '.value'"
            :rules="[ 
                    {required:true,message:'请输入运单号'}
                ]"
            maxlength="40"
            label="运单号"
            size="mini"
          >
            <el-input placeholder="请输入运单号" />
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
    <el-button
      @click="addLogArr"
      icon="el-icon-circle-plus"
      type="text"
    >增加物流信息</el-button>
  </el-form>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      options: [],
      logForm: {
        logArr: [{
          value: ''
        }]
      }
    };
  },
  methods: {
    //增加物流信息
    addLogArr() {
      this.logForm.logArr.push({ value: '' })
    },
    //删除物流信息
    deleteLogArr(index) {
      console.log(index)
      this.logForm.logArr.splice(index, 1)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>