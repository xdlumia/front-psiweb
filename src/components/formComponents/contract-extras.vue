/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-20 11:18:48
 * @Description: 合同模板--补充信息，自定义内容
*/
<template>
  <form-card class="contract-custom" title="补充信息（合同模板自定义内容）">
    <el-table :data="data.fieldList||[]" size="mini">
      <el-table-column label="属性名称" min-width="80" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{userFieldObject[row.fieldCode]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性内容" min-width="200" prop="value" show-overflow-tooltip>
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`fieldList.${$index}.fieldVal`" :rules="[{required:true}]">
            <el-input :disabled="disabled" v-model="row.fieldVal"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    options: [],
    form: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    templateList: {
      type: Array
    }
  },
  data() {
    return {
      userFieldObject: {},
      tmpList: []
    };
  },
  watch: {
    'data.templateId': {
      handler() {
        console.log('templateId change');
        this.checkUserField();
      }
    },
    tmpList() {
      console.log('tmp list change');
      this.checkUserField();
    }
  },
  mounted() {
    this.getContractTmpList();
  },
  methods: {
    checkUserField() {
      let his = {};
      if (this.data.fieldList && this.data.fieldList.length) {
        his = this.data.fieldList.reduce((data, item) => {
          data[item.fieldCode] = item.fieldVal;
          return data;
        }, {});
      }
      let [tmp] = this.tmpList.filter(item => item.id == this.data.templateId);
      if (tmp) {
        let { userFields } = tmp;
        userFields = JSON.parse(JSON.stringify(userFields));
        this.userFieldObject = userFields.reduce((data, item) => {
          data[item.fieldCode] = item.fieldName;
          item.fieldVal = his[item.fieldCode] || '';
          return data;
        }, {});
        this.data.fieldList = userFields;
      } else {
        this.data.fieldList = [];
      }
    },
    async getContractTmpList() {
      // 1 销售 2 采购 3 其他
      try {
        let { data } = await this.$api.seeContractService.getTemplateList(3);
        this.tmpList = (data || []).map(item => {
          return {
            id: item.id,
            name: item.name,
            userFields: (item.userFieldsArray || []).map(item => {
              return {
                fieldCode: item.fieldCode,
                fieldName: item.fieldName,
                fieldVal: ''
              };
            })
          };
        });
        this.$emit('update:templateList', this.tmpList);
        this.checkUserField();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.contract-custom {
  /deep/ {
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__error {
        position: relative;
      }
    }
    .el-input__suffix {
      display: none;
    }
  }
}
</style>