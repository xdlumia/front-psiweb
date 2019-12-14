<!--
 * @Author: 高大鹏
 * @Date: 2019-11-09 11:24:00
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-14 16:43:09
 * @Description: description
 -->
<template>
  <div class>
    <form-card title="费用信息">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="费用类型" prop="feeTypeCode">
            <el-select size="mini" v-model="data.feeTypeCode" class="wfull">
              <el-option
                v-for="(item, index) in treeList"
                :key="index"
                :value="item.code"
                :label="item.content"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="费用明细类型" prop="feeDetailCode">
            <el-select size="mini" v-model="data.feeDetailCode" class="wfull">
              <el-option
                v-for="(item, index) in children"
                :key="index"
                :value="item.code"
                :label="item.content"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="金额" prop="amount">
            <el-input v-model="data.amount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      treeList: []
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  mounted () {
    this.getDictionaryValueTreeList()
  },
  computed: {
    children () {
      const temp = this.treeList.filter(item => item.code === this.data.feeTypeCode)
      return temp[0] ? temp[0].children : []
    }
  },
  methods: {
    choose (goods) {
      this.data.commodityCode = goods[0].commodityCode
      this.data.goodName = goods[0].goodsName
    },
    getDictionaryValueTreeList () {
      this.$api.seeDictionaryService.getDictionaryValueTreeList({ dicCode: 'ZD_DY_LX' }).then(res => {
        this.treeList = res.data
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
