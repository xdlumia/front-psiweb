/*
 * @Author: 徐贺
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 17:20:29
 * @Description: 盘点信息 公共
*/
<template>
  <form-card title="盘点信息">
    <el-row>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择盘点库房', trigger: 'change'}
                ]"
          label="盘点库房"
          prop='wmsId'
          size="mini"
        >
          <el-select
            @change='changeRecord()'
            v-model="addform.wmsId"
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              v-for="item in usableList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
          style="wfull"
          :rules="[ 
                    {required:true,message:'请选择盘点人', trigger: 'change'}
                ]"
          label="盘点人"
          prop='creatorName'
          size="mini"
        >
          <employees-chosen
            :multiple="false"
            :closeOnSelect="false"
            @input="choose"
            style="width:100%"
            class="d-inline"
          >
            <el-input
              :disabled='disabled'
              :value="addform.creatorName"
              size="mini"
            ></el-input>
          </employees-chosen>

        </el-form-item>
      </el-col>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择盘点类型', trigger: 'change'}
                ]"
          label="盘点类型"
          prop='type'
          size="mini"
        >
          <el-select
            v-model="addform.type"
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              label="全盘"
              :value="1"
            >
            </el-option>
            <el-option
              label="抽盘"
              :value="2"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        :span="24"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          label="备注"
          prop="bankCard"
          size="mini"
        >
          <el-input
            :disabled='disabled'
            type="textarea"
            maxlength="140"
            placeholder="请输入备注"
            v-model="addform.note"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
import commoditySelector from '@/components/formComponents/commodity-selector';

export default {
  props: {
    addform: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      usableList: [],//库房详情
      employeeName: '',
    };
  },
  components: {
    commoditySelector
  },
  created() {
    this.commonwmsmanagerUsableList()
  },
  methods: {
    //查询库房
    commonwmsmanagerUsableList() {
      let api = this.disabled ? 'commonwmsmanagerList' : 'commonwmsmanagerUsableList'
      let params = this.disabled ? { page: 1, limit: 150 } : ''
      this.$api.seePsiWmsService[api](params)
        .then(res => {
          this.usableList = res.data || []
        })
        .finally(() => {

        })
    },
    //选择人员
    choose(value) {
      this.addform.creatorName = value.employeeName
      this.addform.blitemPerson = value.userId
    },
    //库房改变
    changeRecord() {
      this.$emit("changeRecord")
      setTimeout(() => {
        this.$root.$emit('loadSearch')
      })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-form-item__content .d-inline {
  width: 100%;
}
/deep/.el-form-item__content .d-inline .el-select {
  width: 100%;
}
</style>