<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 17:45:14
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-08 15:26:05
 * @Description: 商品信息
 -->
<template>
  <div class v-loading="loading">
    <form-card :title="true">
      <div slot="title" style="display:flex;align-items:center">
        <span class="mr20">参与人员</span>
        <el-form-item
          v-if="!detail"
          prop="commonPromotionGoalPersonnelEntities"
          style="margin-bottom:5px"
        >
          <employees-chosen
            v-model="employee"
            :isEdit="true"
            :multiple="true"
            :closeOnSelect="false"
            @input="choose"
            style="width:200px"
            class="d-inline"
          >
            <el-input size="mini" value :show-word-limit="false"></el-input>
          </employees-chosen>
        </el-form-item>
      </div>
      <el-table :data="employee" style="width: 100%;margin-bottom: 20px;" row-key="id">
        <el-table-column label="员工名称" prop="employeeName">
          <template slot-scope="{row}">{{row.employeeName || row.userName}}</template>
        </el-table-column>
        <el-table-column label="所属部门" prop="deptName"></el-table-column>
        <el-table-column label="岗位名称" prop="positionName"></el-table-column>
        <el-table-column label="目标金额">
          <template
            slot-scope="{row, column, $index}"
            v-if="data.commonPromotionGoalPersonnelEntities && data.commonPromotionGoalPersonnelEntities.length"
          >
            <el-form-item
              :rules="[{required: true,message:'请输入',trigger: 'blur'},{ pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入11位整数，两位小数', trigger: 'blur' }]"
              :prop="'commonPromotionGoalPersonnelEntities.' + $index + '.money'"
            >
              <el-input v-model="data.commonPromotionGoalPersonnelEntities[$index].money"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </form-card>
    <div>
      <h3>
        合计：参与人数
        <span class="d-text-blue">{{employee.length}}</span>人，目标金额
        <span class="d-text-blue">{{sumMoney}}</span>元
      </h3>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    detail: Boolean
  },
  data() {
    return {
      loading: false,
      employee: []
    }
  },
  components: {
  },
  computed: {
    sumMoney() {
      const sum = (this.data.commonPromotionGoalPersonnelEntities || []).reduce((val, item) => {
        return val + parseFloat(item.money)
      }, 0)
      return sum
    }
  },
  mounted() {
    if (this.data.id) {
      this.commonpromotiongoalpersonnelList(this.data.id)
    }
  },
  watch: {
    'data.id': {
      handler: function(newValue) {
        if (newValue) {
          this.commonpromotiongoalpersonnelList(newValue)
        }
      }
    }
  },
  methods: {
    choose(users) {
      this.employee = users
      this.data.commonPromotionGoalPersonnelEntities = users.map(item => {
        return {
          userId: item.userId,
          money: item.money || 0
        }
      })
      this.data.sumUserNum = users.length
    },
    commonpromotiongoalpersonnelList(promotionId) {
      this.loading = true
      this.$api.seePsiCommonService.commonpromotiongoalpersonnelList({ promotionId }).then(res => {
        this.choose(res.data)
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
