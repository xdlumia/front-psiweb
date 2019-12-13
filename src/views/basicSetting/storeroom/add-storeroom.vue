<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 10:28:43
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-13 14:30:10
 * @Description: 新增商品
 -->
<template>
  <div class v-loading="loading">
    <el-form ref="storeRoomForm" size="mini" :model="storeRoomForm" :rules="storeRoomFormRule">
      <form-card title="库房信息">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="库房名称" prop="name">
              <el-input v-model.trim="storeRoomForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="责任人" prop="personInChargeId">
              <employees-chosen
                v-model="employee"
                :isEdit="true"
                :multiple="false"
                :closeOnSelect="false"
                @input="choseUser"
              >
                <el-input :value="storeRoomForm.personInChargeName"></el-input>
              </employees-chosen>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库房区域" prop="areaArr">
              <el-cascader
                @change="changeArea"
                class="wfull"
                :props="props"
                v-model="storeRoomForm.areaArr"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库房地址" prop="address">
              <el-input v-model.trim="storeRoomForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </form-card>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      loading: false,
      employee: null,
      storeRoomForm: {
        id: '',
        address: '',
        provinceId: '',
        cityId: '',
        name: '',
        personInChargeId: '',
        personInChargeName: '',
        areaArr: []
      },
      storeRoomFormRule: {
        address: { required: true, message: '请输入', trigger: 'blur' },
        name: { required: true, message: '请输入', trigger: 'blur' },
        personInChargeId: { required: true, message: '请输入', trigger: 'change' },
        areaArr: { required: true, message: '请选择', trigger: 'change' }
      },
      cityList: [],
      provinceList: [],
      props: {
        lazy: true,
        value: 'id',
        label: 'name',
        leaf: 'type',
        lazyLoad: async function (node, resolve) {
          if (this.editId && !this.storeRoomForm.areaArr.length) {
            await this.commonwmsmanagerInfo(this.editId)
          }
          if (node.level === 0) {
            this.commonGetProvinces().then((res) => {
              resolve(res.data)
            })
          } else if (node.level === 1) {
            this.commonGetArea(node.value).then(res => {
              resolve(res.data)
            })
          }
        }.bind(this)
      }
    }
  },
  props: {
    editId: {
      type: Number,
      default: null
    }
  },
  components: {
  },
  mounted () {
    // this.commonGetProvinces()
    // this.$nextTick(() => {
    //   if (this.editId) {
    //     this.commonwmsmanagerInfo(this.editId)
    //   }
    // })
  },
  methods: {
    commonwmsmanagerInfo (id) {
      return this.$api.seePsiWmsService.commonwmsmanagerInfo(null, id).then(res => {
        Object.keys(this.storeRoomForm).forEach(key => {
          this.storeRoomForm[key] = res.data[key] || this.storeRoomForm[key]
        })
        this.storeRoomForm.areaArr = this.storeRoomForm.areaArr.concat([res.data.provinceId, res.data.cityId])
        console.log(this.storeRoomForm)
      })
    },
    commonwmsmanagerSave () {
      this.$refs.storeRoomForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = this.editId ? 'commonwmsmanagerUpdate' : 'commonwmsmanagerSave'
          this.$api.seePsiWmsService[method](this.storeRoomForm).then(res => {
            this.$emit('refresh')
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    changeArea (value) {
      this.storeRoomForm.provinceId = value[0]
      this.storeRoomForm.cityId = value[1]
    },
    choseUser () {
      const { userId, employeeName } = this.employee
      this.storeRoomForm.personInChargeId = userId
      this.storeRoomForm.personInChargeName = employeeName
    },
    // 获取省
    commonGetProvinces () {
      return this.$api.seeBaseinfoService.commonGetProvinces()
    },
    // 获取市
    commonGetArea (id) {
      return this.$api.seeBaseinfoService.commonGetArea({ id, type: 0 })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
