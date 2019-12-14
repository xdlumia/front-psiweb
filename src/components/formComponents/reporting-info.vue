/*
 * @Author: 徐贺
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 徐贺
 * @LastEditTime: 2019-10-26 17:20:29
 * @Description: 报溢报损信息 公共
*/
<template>
  <form-card title="报溢报损信息">
    <el-row>
      <el-col
        :span="8"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          :rules="[ 
                    {required:true,message:'请选择类型', trigger: 'change'} 
                ]"
          label="类型"
          prop='type'
          size="mini"
        >
          <el-select
            @change="typeChange"
            v-model='addForm.type'
            :disabled='disabled'
            placeholder="请选择"
            class="wfull"
          >
            <el-option
              label="报溢"
              :value="1"
            >
            </el-option>
            <el-option
              label="报损"
              :value="2"
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
          :rules="[ 
                    {required:true,message:'请选择库房', trigger: 'change'}
                ]"
          label="出库/入库库房"
          prop='wmsId'
          size="mini"
        >
          <el-select
            @change="wmsChange"
            v-model='addForm.wmsId'
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
                    {required:true,message:'请选择责任人', trigger: 'change'}
                ]"
          label="责任人"
          prop='leaderName'
          size="mini"
        >

          <!-- v-model="employee"
          :isEdit="true"
          :multiple="true"
          :closeOnSelect="false"
          @input="choose" -->
          <employees-chosen
            :multiple="false"
            :closeOnSelect="false"
            @input="choose"
            style="width:100%"
            class="d-inline"
          >
            <el-input
              :disabled='disabled'
              :value="addForm.leaderName"
              size="mini"
            ></el-input>
          </employees-chosen>
        </el-form-item>
      </el-col>
      <el-col
        :span="24"
        class="pl5 pr5 pb5"
      >
        <el-form-item
          label="备注"
          size="mini"
        >
          <el-input
            v-model='addForm.note'
            :disabled='disabled'
            type="textarea"
            maxlength="140"
            placeholder="请输入备注"
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
    addForm: {
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
      usableList: [],
      employeeName: '',
      employee: null,
    };
  },
  components: {
    commoditySelector
  },
  mounted() {
    this.commonwmsmanagerUsableList()
  },
  methods: {
    //请求可用库房
    async commonwmsmanagerUsableList() {
      let { data } = await this.$api.seePsiWmsService.commonwmsmanagerUsableList()
      this.usableList = data || []
    },
    //选择人员
    choose(value) {
      console.log(value, 'value')
      this.addForm.leaderName = value.employeeName
      this.addForm.personInChargeId = value.userId
    },
    //在报损的情况下每次切换库房,需要重新请求当前商品
    wmsChange() {
      if (this.addForm.type == 2) {
        this.$emit('wmsChange')
      }
    },
    //切换报溢报损的时候,清空库房,重新请求商品信息
    typeChange() {
      this.addForm.wmsId = ''
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