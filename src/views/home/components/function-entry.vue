<!--
 * @Author: 高大鹏
 * @Date: 2019-11-14 14:29:48
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-16 13:24:42
 * @Description: 常用功能入口
 -->
<template>
  <div class="mb20">
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <h3 class="b" style="text-indent:20px">常用功能入口</h3>
      <el-popover placement="bottom" width="200" trigger="click">
        <div style="max-height:500px;overflow:auto;">
          <el-row>
            <div v-for="item in allMenuList" :key="item.id" class="mb5 d-hidden">
              <el-col :span="18">{{item.label}}</el-col>
              <el-col :span="6">
                <el-switch
                  @change="switchChange"
                  :active-value="1"
                  :inactive-value="0"
                  v-model="selected[item.id]"
                  :disabled="actived.length > 7 && !selected[item.id]"
                ></el-switch>
              </el-col>
            </div>
          </el-row>
        </div>
        <el-button type="text" icon="el-icon-setting" slot="reference">常用入口设置</el-button>
      </el-popover>
    </div>
    <el-row class="ba entry-wrapper" :gutter="10">
      <el-col :span="3" v-for="(item, index) in entryList" :key="index">
        <div class="ba entry-item d-pointer" @click="$router.push(item.route)">
          <img :src="imgList[item.icon]" />
          <span>{{item.label}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import { debounce } from '@/utils/debounce'
const imgs = require.context('../img', false, /\.png$/)
// 获取文件名
function toCamel(path) {
  const pathReg = /([^\.\/]+)\.([a-z]+)$/i
  path = pathReg.exec(path)[1]
  return path.replace(/-(\w)/g, function() {
    return arguments[1].toUpperCase();
  })
}
// 获取所有菜单列表
function recursionNav(list) {
  const result = [].concat(...list.map(item => {
    if (item.children && item.children.length) {
      return [].concat(...recursionNav(item.children).concat([{ route: item.url, icon: pathKey(item.url), label: item.name, id: item.id }]))
    } else {
      return { route: item.url, icon: pathKey(item.url), label: item.name, id: item.id }
    }
  })).filter(item => item.route && item.icon)
  return result
}
// icon
function pathKey(route) {
  if (route.length < 2) {
    return null
  }
  route = route.match(/\/(\S*)\//)[1]
  switch (route) {
    case 'order':
      return 'purchase'
    case 'storage':
      return 'storeroom'
    case 'asistant':
    case 'system':
    case 'psi':
      return 'setting'
    default:
      return route
  }
}
export default {
  data() {
    return {
      selected: {}, // 选中的值
      imgList: {}, // icon对象
      allMenuList: [], // 所有菜单列表
      entryList: [], // 用户的入口数组
      change: true // 用作watch监听使用
    }
  },
  created() {
    imgs.keys().forEach(item => {
      this.imgList[toCamel(item)] = imgs(item)
    })
    const menu = JSON.parse(localStorage.getItem('navData')) || []
    this.allMenuList = recursionNav(menu)
    this.homePageQueryTab()
    this.$watch('change', {
      deep: true,
      handler: debounce(() => {
        const result = this.allMenuList.filter(item => this.actived.includes(String(item.id)))
        this.homePageSaveCommonUserTabEntity(JSON.stringify(result))
      }, 1000)
    })
  },
  components: {
  },
  computed: {
    // 选中的页签数组
    actived() {
      return Object.keys(this.selected).filter(item => this.selected[item])
    }
  },
  methods: {
    // 获取页签信息
    homePageQueryTab() {
      this.$api.seePsiCommonService.homePageQueryTab().then(res => {
        const temp = (res.data && res.data.tabJson) ? JSON.parse(res.data.tabJson) : []
        this.entryList = temp
        this.entryList.forEach(item => {
          this.selected[item.id] = 1
        })
      })
    },
    // 保存页签信息
    homePageSaveCommonUserTabEntity(tabJson) {
      this.$api.seePsiCommonService.homePageSaveCommonUserTabEntity({ tabJson }).then(res => {
        this.homePageQueryTab()
      })
    },
    switchChange() {
      this.change = !this.change
    }
  }
}
</script>

<style scoped lang='scss'>
.entry-wrapper {
  padding: 10px;
  .entry-item {
    display: flex;
    flex: 1;
    height: 64px;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      margin-right: 10px;
    }
  }
}
</style>
