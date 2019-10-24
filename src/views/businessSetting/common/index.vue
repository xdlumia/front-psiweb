<!--私有组件：房态
/**
* 辅助管理-公共设置-私有组件：公共
* @/components/asistant/common 组件存放位置
* @author web-王晓冬
* @date 2018年7月9日
**/
-->
<template>
  <div style="color:#666" v-loading="loading">
    <div class="d-hidden">
      <el-col :span="16">
        <h3 class="mt10 d-text-gray">公共设置</h3>
      </el-col>
      <el-col :span="8" class="ar">
        <el-button size="small" style="margin-top: 20px;" @click="recoverHouseDefault">恢复默认</el-button>
        <el-button v-if="authorityButtons.includes('asystem_assist_bizsetting_1012')" type="primary" size="small" style="margin-top: 20px;" @click="saveHandle">保存</el-button>
      </el-col>
    </div>
    <el-form :model="configForm" class="" size="small" label-width="80px" label-position="top">
      <fieldset class="d-fieldset mb20">
        <legend>小程序站点设置</legend>
          <el-form-item label="客服电话:" prop="servicePhone">
            <el-input v-model="configForm.servicePhone" class="w200" maxlength="32" placeholder="请填写"></el-input>
          </el-form-item>
          <p>经纪人名片logo <span class="d-text-qgray">(建议尺寸160*40px)</span>
            <upload-file v-model="configForm.brokerCardLogo" class="d-inline" :limit="{type: ['jpg', 'jpeg', 'png', 'gif']}">
              <el-button size="mini" icon="el-icon-upload2" type="primary">上传</el-button>
            </upload-file>
          </p>
          <el-image class="d-center" :src="configForm.brokerCardLogo" style="width:160px; height:40px;">
            <span slot="error">暂无图片</span>
          </el-image>
      </fieldset>
      <fieldset class="d-fieldset mb20">
        <legend>面积区间自定义</legend>
        <el-tabs v-model="activeArea">
          <el-tab-pane label="商铺出租" name="0">
            <el-table size="mini" :data="configForm.shopsRentSettings">
              <el-table-column label="下限(<=)" width="180">
                <template slot-scope="scope">
                  <el-form-item class="mb0">
                    <el-input-number style="width:80%" :min="0" :max="99999999" :precision="2" :controls="false" v-model="scope.row.minValue" placeholder="请输入" size="mini">
                    </el-input-number> ㎡
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="(<)上限" width="160">
                <template slot-scope="scope">
                  <el-form-item class="mb0">
                    <el-input-number style="width:80%" :min="Number(scope.row.minValue)" :max="99999999" :precision="2" :controls="false" v-model="scope.row.maxValue" placeholder="请输入" size="mini">
                    </el-input-number> ㎡
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <i class="el-icon-delete" @click="delHandle(configForm.shopsRentSettings,scope.$index)"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!-- 添加空置期限 -->
        <el-button size="mini" class="ml20 mt10" icon="el-icon-plus" @click="addArea(configForm.shopsRentSettings)">添加设置</el-button>
      </fieldset>
      <fieldset class="d-fieldset mb20">
        <legend>价格区间自定义</legend>
          <el-row>
            <el-col :span="12">
              <span>适应城市:</span>
              <el-select size="mini" @change="cityChange" filterable v-model="configForm.cityId">
                  <el-option :label="item.name" :value="item.id" v-for="(item,index) of citys()" :key="index"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12" class="ar">
                <el-button v-if="authorityButtons.includes('asystem_assist_bizsetting_1012')" type="primary" size="small" style="margin-top: 20px;" @click="saveHandle">保存</el-button>
            </el-col>
          </el-row>

          <el-tabs v-model="priceType" @tab-click="cityChange">
            <el-tab-pane label="商铺出租" name="0">
              <fieldset class="d-fieldset">
                <legend>月租金</legend>
                <el-table size="mini" :data="configForm.shopsMonthlyRents">
                  <el-table-column label="下限(<=)" width="180">
                    <template slot-scope="scope">
                      <el-form-item class="mb0">
                        <el-input-number style="width:70%" :min="0" :controls="false" :max="99999999" :precision="2" v-model="scope.row.minValue" placeholder="请输入" size="mini">
                        </el-input-number> 元/月
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="(<)上限" width="160">
                    <template slot-scope="scope">
                      <el-form-item class="mb0">
                        <el-input-number style="width:70%" :min="Number(scope.row.minValue)"  :max="99999999" :precision="2" :controls="false" v-model="scope.row.maxValue" placeholder="请输入" size="mini">
                        </el-input-number> 元/月
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot-scope="scope">
                      <i class="el-icon-delete" @click="delHandle(configForm.shopsMonthlyRents,scope.$index)"></i>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 添加 -->
                <el-button size="mini" class="ml20 mt10" icon="el-icon-plus" @click="addArea(configForm.shopsMonthlyRents)">添加设置</el-button>
              </fieldset>
            </el-tab-pane>
            <el-tab-pane label="其他" name="1">
              <fieldset class="d-fieldset">
                <legend>加盟项目投资额</legend>
                <el-table size="mini" :data="configForm.joinPrices">
                  <el-table-column label="下限(<=)" width="180">
                    <template slot-scope="scope">
                      <el-form-item class="mb0">
                        <el-input-number style="width:70%" :min="0" :max="99999999" :precision="2" :controls="false" v-model="scope.row.minValue" placeholder="请输入" size="mini">
                        </el-input-number> 万元
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="(<)上限" width="160">
                    <template slot-scope="scope">
                      <el-form-item class="mb0">
                        <el-input-number style="width:70%" :min="Number(scope.row.minValue)" :precision="2" :max="99999999" :controls="false" v-model="scope.row.maxValue" placeholder="请输入" size="mini">
                        </el-input-number> 万元
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot-scope="scope">
                      <i class="el-icon-delete" @click="delHandle(configForm.joinPrices,scope.$index)"></i>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 添加 -->
                <el-button size="mini" class="ml20 mt10" icon="el-icon-plus" @click="addArea(configForm.joinPrices)">添加设置</el-button>
              </fieldset>
            </el-tab-pane>
          </el-tabs>
      </fieldset>
    </el-form>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: [],
  data() {
    return {
      loading: false,
      activeArea: '0', //  0商铺出租 1其他 // 自定义价格 自定义面积类型
      priceType: '0', //  自定义价格
      configForm: {
        brokerCardLogo: '', // 经纪人名片logo",
        cityId: '', // 00,
        servicePhone: '', // 客服电话",
        shopsMonthlyRents: [
          // { maxValue: '', // 最大值
          //   minValue: '' // 最小值
          // }
        ],
        id: '', // 100000,
        shopsRentSettings: [
          // { maxValue: '', // 最大值
          //   minValue: '' // 最小值
          // }
        ], // '商铺出租面积区间字典值'
        joinPrices: [
          // { maxValue: '', // 最大值
          //   minValue: '' // 最小值
          // }
        ] // '加盟项目投资额'
      }
    }
  },
  created() {
    // 获取房源配置
    this.getUserCfg()
  },
  computed: {
  },
  methods: {

    // 获取房源配置
    getUserCfg() {
      this.loading = true
      this.$api.seePumaidongService.commonusercfgupGetUserCfg()
        .then(res => {
          const data = res.data || []
          this.configForm.brokerCardLogo = data.brokerCardLogo || '' // logo
          this.configForm.servicePhone = data.servicePhone || '' // 电话
          this.configForm.cityId = data.commonUserCfgUnderneathEntity.cityId || '' // 城市id
          this.configForm.shopsMonthlyRents = data.commonUserCfgUnderneathEntity.params || [] // 租金
          this.configForm.shopsRentSettings = data.shopsRentSettings || [] // 面积
          this.configForm.id = data.id
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 添加空置期
    addArea(currData) {
      const lastItem = currData[currData.length - 1]
      if (currData.length && (!String(lastItem.maxValue) || !String(lastItem.minValue))) {
        this.$message({
          message: '请输入下限和上限的值',
          type: 'warning',
          showClose: true
        })
        return
      }
      let maxValue = 0
      if (currData.length) {
        maxValue = lastItem.maxValue
      }
      currData.push(
        { maxValue: maxValue + 10, // 最大值
          minValue: maxValue // 最小值
        })
    },
    // 删除方法
    delHandle(currData, index) {
      currData.splice(index, 1)
    },
    // 城市切换 获取租金列表
    cityChange(cityId) {
      const params = {
        cityId: this.configForm.cityId,
        type: this.priceType
      }
      this.$api.seePumaidongService.commonusercfgunderneathGetCfg(params)
        .then(res => {
          const data = res.data || {}
          if (this.priceType === '0') {
            this.configForm.shopsMonthlyRents = data.params || [] // 月租金
          } else if (this.priceType === '1') {
            this.configForm.joinPrices = data.params || [] // 加盟项目租金
          }
        })
    },
    // 图片保存
    saveHandle() {
      // 开始保存数据
      this.loading = true
      this.$api.seePumaidongService.commonusercfgupSave(this.configForm)
        .then(res => {
          // console.log('保存成功');
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 恢复默认
    recoverHouseDefault() {
      this.$confirm('是否要恢复默认设置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        this.$api.seePumaidongService.commonusercfgupDelete()
          .then(res => {
            this.getUserCfg()
          })
          .finally(() => {
            this.loading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style scoped style="scss">
</style>
