/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-11 22:29:12
 * @Description: 收款滞纳金
 */
<template>
  <form-card title="收款滞纳金">
    <el-row :gutter="10">
      <el-col :span="8" class="h80">
        <el-form-item label="收票时间" prop="ticketTime" size="mini">
          <el-date-picker :disabled="disabled" :placeholder="`请选择收票时间`" class="wfull" v-model="data.ticketTime" value-format="timestamp" />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="h80">
        <el-form-item label="滞纳金" prop="financeConfig" size="mini">
          <el-select
            :disabled="disabled"
            @change="overdueChange"
            class="wfull"
            filterable
            placeholder="请选择"
            v-model="data.financeConfig"
            value-key="overdueFineName"
            size="mini"
          >
            <el-option :value="{}" label="请选择"></el-option>
            <el-option :key="i" :label="item.overdueFineName" :value="item" v-for="(item,i) in options"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="data.financeConfig" class="h80">
        <el-form-item :label="`滞纳金${data.financeConfig.limitType==0?'比例':''}`" prop size="mini">
          <el-input disabled placeholder="请输入" v-model="data.financeConfig.overdueFineLimit">
            <template slot="append" v-if="data.financeConfig.limitType==0">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="data.financeConfig" class="h80">
        <el-form-item label="滞纳金间隔" prop size="mini">
          <el-input disabled placeholder="请输入" v-model="data.financeConfig.overdueFineInterval">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="data.financeConfig" class="h80">
        <el-form-item label="滞纳金上限" prop size="mini">
          <el-input disabled placeholder="请输入" v-model="data.financeConfig.overdueFineUpperLimit">
            <template slot="append" v-if="data.financeConfig.limitType==0">%</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      default: () => {
        return {
          financeConfig: {}
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: []
    };
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.resetData();
      }
    }
  },
  mounted() {
    this.resetData();
    this.getList();
  },
  methods: {
    resetData() {
      if (this.data && !this.data.financeConfig) {
        this.data.financeConfig = {};
      }
    },
    async getList() {
      try {
        let {
          data: { configJson }
        } = await this.$api.seePsiCommonService.commonsystemconfigInfo(null, 3);
        let list = JSON.parse(configJson).financeConfigList;
        this.options = list;
      } catch (error) {
        console.error(error);
        this.options = [];
      }
    },
    overdueChange(e) {
      console.log(e);
      if (this.data.financeConfig.overdueFineName) {
      }
    }
  }
};
</script>
<style scoped>
</style>
