<!--
 * @Author: 高大鹏
 * @Date: 2019-11-06 17:45:14
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-07 18:09:35
 * @Description: 商品信息
 -->
<template>
  <div class v-loading="loading">
    <form-card :title="true">
      <div slot="title" style="display:flex;align-items:center">
        <span class="mr20">参与人员</span>
        <el-form-item
          v-if="!detail"
          prop="commonPromotionPersonnelEntities"
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
      </el-table>
    </form-card>
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
  mounted() {
    if (this.data.id) {
      this.commonpromotionpersonnelList(this.data.id)
    }
  },
  watch: {
    'data.id': {
      handler: function(newValue) {
        if (newValue) {
          this.commonpromotionpersonnelList(newValue)
        }
      }
    }
  },
  methods: {
    choose(users) {
      console.log(users)
      this.employee = users
      this.data.commonPromotionPersonnelEntities = users.map(item => {
        return {
          userId: item.userId
        }
      })
      this.data.userNum = users.length
    },
    commonpromotionpersonnelList(promotionId) {
      this.loading = true
      this.$api.seePsiCommonService.commonpromotionpersonnelList({ promotionId }).then(res => {
        this.choose(res.data)
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
