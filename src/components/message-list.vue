<template>
  <div>
    <el-popover placement="top-end" v-model="popoverVisible" width="350"
trigger="manual">
      <div class="d-absolute" style="right:10px; top:10px; font-size:20px; z-index:1">
        <i class="el-icon-close d-pointer" title="关闭消息列表" @click="popoverVisible = !popoverVisible"></i>
      </div>
      <el-tabs v-model="queryParams.msgType" @tab-click="tabClick">
        <el-tab-pane :label="'消息(' + unReadMsgCount + ')'" name="0"></el-tab-pane>
      </el-tabs>
      <div v-loading="loading" class="ac h40 lh40 mb10 d-text-qgray" v-show="!msgList.length">暂无消息</div>
      <div
        v-loading="loading"
        style="max-height: 400px;overflow-y: auto;padding-top:10px;"
        :style="{'margin-right': msgList.length > 4 ? '-10px' : 0}"
      >
        <div
          class="msg-item"
          :class="{ active:isRead(item)}"
          v-for="(item, index) of msgList"
          :key="index"
        >
          <i class="d-absolute el-icon-close msg-del" @click="delMsg(item,index)" title="删除消息"></i>
          <div @click="viewMsg(item, index)">
            <h4 class="msg-title">{{ item.title }}</h4>
            <div class="msg-content" v-html="item.msgBody"></div>
            <p class="msg-time">{{ item.modifyTime | timeToStr('YYYY-MM-DD HH:mm:ss') }}</p>
          </div>
        </div>
      </div>
      <div class="ac d-pointer bt pt5">
        <el-button class="fr" size="small" type="primary"
@click="clearMsg">清空消息</el-button>
      </div>
      <el-badge slot="reference" :value="unReadCount" :max="99"
:hidden="unReadCount == '0'">
        <i class="el-icon-bell d-pointer" @click="popoverVisible = !popoverVisible"></i>
      </el-badge>
      <el-dialog
        :visible.sync="viewVisible"
        modal-append-to-body
        append-to-body
        width="600px"
        title="消息详情"
      >
        <el-form size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="消息类型:">
                <!-- 暂时只有楼盘跟进 -->
                <p>{{queryParams.msgType == 1?'待办':'消息'}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="消息来源:">
                <!-- 暂时只有楼盘字典 -->
                <p>{{activeMsgItem.title}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发送人:">
                <p>{{ activeMsgItem.senderName}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发送时间:">
                <p>{{ activeMsgItem.modifyTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="消息内容:">
                <div v-html="activeMsgItem.msgBody"></div>
              </el-form-item>
            </el-col>
            <!-- 隐藏消息接收人 -->
            <!-- <el-col :span="24">
                            <el-form-item label="消息接收人:">
                                <el-tag size='mini' :type="item.isRead?'':'info'" v-for="(item,index) of activeMsgItem.receivers || []" :key="index" class="d-pointer mr5">{{item.receiverName}}</el-tag>
                            </el-form-item>
            </el-col>-->
          </el-row>
        </el-form>
        <el-row slot="footer" class="msg-footer">
          <el-col :span="24" class="ar">
            <!-- <el-button size="small" type="primary" @click="viewDetail">查看详情</el-button> -->
            <el-button
              v-if="activeMsgItem.isRead !== 1"
              size="small"
              type="primary"
              @click="affirmMsg"
            >确认收到</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </el-popover>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  props: ['isLockkScreen'],
  data() {
    return {
      loading: false,
      popoverVisible: false,
      // 是否显示消息详情。
      viewVisible: false,
      // tab激活的选项。
      // 当前查看的消息对象。
      activeMsgItem: {
        roomInfo: ''
      },
      activeMsgIndex: 0,
      // 查询参数。
      queryParams: {
        // 消息类型(0消息1待办)。
        msgType: '0',
        msgSource: this.$local.fetch('userInfo').syscode,
        // 每页显示记录。
        limit: 999,
        // 当前页数。
        page: 1
      },
      // 消息列表。
      msgList: [],
      // 未读消息数量
      unReadMsgCount: 0,
      // 未读待办数量
      unReadBacklogCount: 0,
      // 未读消息+待办数量。
      unReadCount: 0,
      // 轮询定时器。
      timer: null,
      msgType: {
        1: '楼盘跟进',
        2: '装修配置',
        3: '服务',
        4: '账单逾期',
        5: '收房申请',
        6: '收房签约',
        7: '出房签约',
        8: '租客解约',
        9: '业主解约',
        10: '业主续约',
        11: '分配管家',
        12: '租客续约',
        13: '合同审核',
        17: '退租审核'
      },
      businessParam: {},
      businessType: '',
      recordsForm: {
        dialogVisible: false
      }, // 房价设置使用
      channelProviderList: [], // 渠道商列表
      communityId: null // hotel id
    }
  },

  created() {
    // 获取未读数量。
    this.getNotReadMsg()
    // 开始轮询。
    this.startPolling()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {

    /**
     * [startPolling 轮询获取未读消息数量]
     * @return {[type]} [description]
     */
    startPolling() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getNotReadMsg()
      }, 30000)
    },
    // 删除消息
    delMsg(item, index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 计算选中的内容
        this.$api.bizSystemService.delMsg({ msgId: item.id })
          .then(res => {
            // 删除成功后本地删除
            this.msgList.splice(index, 1)
            const type = {
              0: 'unReadMsgCount',
              1: 'unReadBacklogCount'
            }
            --this[type[this.queryParams.msgType]]
            // this.getNotReadMsg();
          })
      }).catch(() => { })
    },
    // 清空消息
    clearMsg() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const { msgSource, msgType } = this.queryParams
        this.$api.bizSystemService.clearMsg({
          msgSource,
          msgType
        }).then(res => {
          this.getMsgList()
          // 获取未读数量。
          this.getNotReadMsg()
        })
      }).catch(() => { })
    },
    /**
     * [viewMsg 查看消息详情]
     * @param {[object]} item [消息对象]
     * @param {[number]} index [消息索引]
     * @return {[undefined]} [undefined]
     */
    viewMsg(item, index) {
      this.viewVisible = true
      this.activeMsgItem = item
      this.activeMsgIndex = index
      this.businessParam = (this.activeMsgItem.businessParam && JSON.parse(this.activeMsgItem.businessParam)) || {}
      // 更新消息的未读状态。
    },
    // 判断当前是否已读
    isRead(item) {
      // 消息已读 确认收到
      return item.isRead === 1
    },
    /**
     * [getNotReadMsg 获取未读消息数量]
     * @return {[undefined]} [undefined]
     */
    getNotReadMsg() {
      const params = { msgSource: this.$local.fetch('userInfo').syscode }
      this.$api.bizSystemService.getNotReadMsg(params)
        .then(res => {
          const data = res.data
          this.unReadMsgCount = data.msgNum || 0
          this.unReadBacklogCount = data.backlogNum || 0
          this.unReadCount = this.unReadMsgCount + this.unReadBacklogCount
        })
    },
    /**
     * [getMsgList 获取消息列表]
     * @param {[boolean]} isNewMsg [传入这个参数时表示是登录状态下的新消息]
     * @return {[undefined]} [undefined]
     */
    getMsgList() {
      this.loading = true
      this.$api.bizSystemService.getMsgList(this.queryParams)
        .then(res => {
          this.msgList = res.data || []
          if (res.data.filter(item => item.isRead !== 1).length + this.unReadBacklogCount !== this.unReadCount) {
            this.getNotReadMsg()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 切换消息类型
    tabClick() {
      this.close()
      this.getMsgList()
    },
    // 确认消息
    affirmMsg() {
      this.updateMsg(this.activeMsgItem)
    },
    // 转发消息
    relayMsg() {
      // 弹出消息提醒
      const messageParams = {
        ...this.activeMsgItem,
        visible: true,
        id: this.activeMsgItem.id, // 消息id
        isRelay: true // 是否转发
      }

      this.$store.commit('messageDialog', messageParams)
    },
    /**
     * [updateMsg 更新消息的未读状态]
     * @param {[object]} item [消息对象]
     * @return {[undefined]} [undefined]
     */
    updateMsg(item) {
      if (item.isRead === 1) {
        this.viewVisible = false
        return
      }
      this.$api.bizSystemService.updateMsg({
        id: item.id,
        optType: this.queryParams.msgType // 0 修改消息状态 1 修改待办状态 this.queryParams.msgType
      })
        .then(res => {
          item.isRead = 1
          this.$set(this.msgList[this.activeMsgIndex], 'isRead', 1)
          this.viewVisible = false
          this.getNotReadMsg()
        })
    },
    /**
    * [viewDetail 查看详情]
    * @return {[undefined]} [undefined]
    */
    viewDetail() {
      const status = this.activeMsgItem.businessType
      const data = JSON.parse(this.activeMsgItem.businessParam)
      switch (status) {
        case 20:
        case 21:
          let params = {
            source: data.orderCode,
            type: 'list',
            communityId: data.communityId
          }
          if (this.$route.name === 'reserve') {
            this.$bus.emit('fromMessage', params)
            break
          }
          this.$router.push({
            name: 'reserve',
            params
          })
          break
        case 19:
        case 22:
        case 23:
          params = {
            source: data.contractCode,
            type: status === 19 ? '' : 'tenantNoDeal'
          }
          if (this.$route.name === '/contract') {
            this.$bus.emit('fromMessage', params)
            break
          }
          this.$router.push({
            name: '/contract',
            params
          })
          break
        case 26:
          this.getChannelProviderList()
          this.communityId = data.communityId
          this.recordsForm.dialogVisible = true
          break
        default:
          break
      }
      this.viewVisible = false
      this.popoverVisible = false
    },
    // 获取渠道商列表
    getChannelProviderList() {
      this.$api.seeHotelService.channelproviderconfigList()
        .then(res => {
          this.channelProviderList = res.data
        })
    },
    close() {
      this.businessParam = {}
      this.businessType = ''
    }
  },
  computed: {
    isView() {
      const businessType = [13, 17]
      if (this.queryParams.msgType === 0) {
        return (this.activeMsgItem.businessType && businessType.includes(+this.activeMsgItem.businessType) && Object.keys(this.businessParam).length)
      } else {
        if (this.businessParam) {
          return this.businessParam.signState !== 0
        } else {
          return false
        }
      }
    }
  },
  watch: {
    // 监控锁屏状态
    isLockkScreen(val) {
      if (val) {
        clearInterval(this.timer)
      } else {
        this.startPolling()
      }
    },
    // 刷新消息列表
    popoverVisible(val) {
      if (val) {
        this.queryParams.msgType = '0'
        this.getMsgList()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-icon-bell {
  font-size: 20px;
}
.msg-item {
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 0 10px;
  .msg-del {
    display: none;
    font-size: 18px;
    right: 0;
    top: 0;
  }
}
.msg-title {
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
  color: #333;
  min-height: 14px;
}
.msg-item:hover {
  background-color: #e6f7ff;
  .msg-del {
    display: block;
  }
}
.msg-content {
  cursor: pointer;
  font-size: 13px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  text-indent: 26px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
}
.msg-time {
  font-size: 12px;
  text-align: right;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #333;
}
.msg-item.active {
  color: #aaa;
  .msg-title {
    color: #aaa;
  }
  .msg-time {
    color: #aaa;
  }
}
.msg-footer {
  font-size: 13px;
  color: #666;
  padding-top: 5px;
  margin-top: 5px;
  border-top: 1px solid #eee;
}
/deep/ .el-tabs__header.is-top {
  margin: 0;
}
</style>
