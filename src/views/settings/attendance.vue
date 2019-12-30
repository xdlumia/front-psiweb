<template>
  <div>
    <el-dialog
      title="考勤记录"
      width="720px"
      :visible="visible"
      @close="close"
      destroy-on-close
      class="attendance-dialog"
      v-dialogDrag
    >
      <div class="d-flex attendance-box">
        <div class="a-calendar">
          <calendar
            lang="zh"
            @dayClick="changeDay"
            :leave="leaveData"
            @changeMonth="changeMonth"
            class="calendars"
          ></calendar>
          <div class="d-center mt10">
            <el-button
              size="small"
              :disabled="!isToday"
              @click="attendanceRecord(isWork ? 1 : 2)"
            >{{ isWork ? '上班' : '下班' }}</el-button>
            <el-button
              size="small"
              :disabled="!isToday || !isWork"
              @click="attendanceRecord(isOut ? 3 : 4)"
            >{{ isOut ? '外出' : '归来'}}</el-button>
            <el-button
              size="small"
              @click="innerVisible = true"
              :disabled="isBefore && !isToday"
            >请假</el-button>
          </div>
        </div>
        <div
          class="ml20 pt20 d-flex"
          style="flex-direction: column;"
        >
          <div class="f14 b mb10">{{currentDay | timeToStr('YYYY年MM月DD日')}}考勤记录</div>
          <div class="pl10 d-cell pb10">
            <div
              class="d-flex mb5"
              v-for="item in attendanceRecordList"
              :key="item.operationTime"
            >
              <div class="mr10">{{item.operationTime | timeToStr('HH:mm:ss')}}</div>
              <div>{{item.typeCode | dictionary('OA_KQ_TYPE')}}</div>
            </div>
          </div>
          <div
            class="atte pl10 pr10 pt5 pb5"
            v-if="leaveList.length"
          >
            <div
              class="d-flex mb5"
              v-for="item in leaveList"
              :key="item.id"
            >
              <div>
                <div>请假</div>
                <div>请假开始时间：{{ item.beginTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</div>
                <div>请假结束时间：{{ item.endTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</div>
                <div>工作交接：{{ item.workHandoverMan | userInfo('employeeName') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文字 -->
      <leave
        :visible.sync="innerVisible"
        appendToBody
        width="750px"
        @reload="getRecordApply(dateToTime(currentDay)),getAbsenceCalendar(currentDay)"
      />

      <div class="ac mt10">
        <el-button
          size="small"
          @click="close"
          type="primary"
        >确 定</el-button>
        <el-button
          size="small"
          @click="close"
        >取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import calendar from './fullcalendar/fullCalendar';
import leave from './leave';
let toDayDate = new Date().getTime();

const recordText = ['上班', '下班', '外出', '归来', '请假'];
const recordType = {};
recordText.forEach((text, index) => {
  let key = index + 1;
  recordType[key] = {
    typeCode: `OA_KQ_TYPE-0${key}`,
    text
  }
})

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      innerVisible: false,
      toDayDate: toDayDate, // 当天时间
      currentDay: toDayDate, // 当前所选择的时间
      isToday: true, // 是否为今天
      isBefore: false, //当前是日期是否为以前
      isOut: false, // 是否外出
      isWork: false, // 是否上班
      attendanceRecordList: [],  // 考勤记录
      leaveList: [], // 请假记录
      leaveData: []
    }
  },
  components: {
    calendar,
    leave
  },
  computed: {

  },
  mounted() {
    this.getAbsenceCalendar(this.toDayDate)
  },
  watch: {
    currentDay: {
      immediate: true,
      handler() {
        this.getRecordApply(this.dateToTime(this.currentDay));
      }
    }
  },
  methods: {

    dateToTime(dateValue) {
      const date = new Date(dateValue);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1);
      const day = date.getDate();
      return new Date(`${year}-${month}-${day} 00:00:00`).getTime();
    },

    changeDay(date) {
      const time = date.toString();
      this.currentDay = date.getTime();
      this.isToday = this.isToDayFn(time);
      this.isBefore = this.isBeforeFn(time);
    },

    changeMonth(start, end, cuDate) {
      this.getAbsenceCalendar(new Date(cuDate).getTime())
    },

    // 判断是否为当天日期
    isToDayFn(date) {
      return new Date(date).toDateString() === new Date().toDateString()
    },
    // 判断是否以前的
    isBeforeFn(date) {
      return new Date(date).getTime() < toDayDate
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },

    // 获取打卡请假
    getRecordApply(attendanceDate) {
      this.$api.seeOaService.attendancerecordListRecordApply({
        attendanceDate
      }).then(res => {
        if (res.code == 200) {

          this.attendanceRecordList = res.dataRecord || [] // 打卡
          this.leaveList = res.dataApply || [] // 请假
          // 改变按钮状态
          let copyDataRecord = [...this.attendanceRecordList].reverse()
          let outData = {}
          let workData = {}
          this.attendanceRecordList.forEach(item => {
            if (item.typeCode == 'OA_KQ_TYPE-03' || item.typeCode == 'OA_KQ_TYPE-04') {
              outData = item
            }
            if (item.typeCode == 'OA_KQ_TYPE-01' || item.typeCode == 'OA_KQ_TYPE-02') {
              workData = item
            }
          })
          outData.typeCode == 'OA_KQ_TYPE-04' ? this.isOut = true : this.isOut = false
          workData.typeCode == 'OA_KQ_TYPE-02' ? this.isWork = true : this.isWork = false
        }
      })
    },

    // 考勤记录
    attendanceRecord(typeNum) {
      if (this.loading) return;
      this.loading = true;
      const type = recordType[typeNum];
      this.$api.seeOaService.attendancerecordSave({
        typeCode: type.typeCode
      }).then(res => {
        typeNum < 3 ? this.changeWorkStatus(typeNum) : this.changeOutStatus(typeNum)
        this.attendanceRecordList.push({
          operationTime: new Date().getTime(),
          typeCode: type.typeCode
        })
      }).finally(() => {
        this.loading = false;
      })
    },

    // 更改工作状态
    changeWorkStatus(typeNum) {
      this.isWork = +typeNum === 2
    },
    // 更改外出状态
    changeOutStatus(typeNum) {
      this.isOut = +typeNum === 4
    },

    // 获取日历请假信息
    getAbsenceCalendar(date) {
      this.$api.seeOaService.absenceapplicationGetAbsenceCalendar({
        applyTime: date
      }).then(res => {
        if (res.code == 200) {
          this.leaveData = res.data
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.a-calendar {
  width: 220px;
  background: #f2f2f2;
  padding: 20px;
  .calendars {
    padding: 0;
  }
}

.attendance-box {
  height: calc(100vh - 160px);
  overflow-y: auto;
  min-height: 310px;
}

.attendance-dialog {
  /deep/ .el-dialog__body {
    padding-left: 0 !important;
    padding-top: 0 !important;
  }
}

.atte {
  background: #f2f2f2;
}
</style>

<style>
.a-calendar .full-calendar-body .dates .dates-events .events-week .events-day,
.a-calendar .full-calendar-body .dates .week-row .day-cell,
.a-calendar .full-calendar-body .dates .week-row .day-cell .day-number {
  min-height: auto;
  text-align: center;
}

.a-calendar .full-calendar-body .dates .week-row .day-cell.today {
  background: #fff;
  color: #409eff;
}

.a-calendar .comp-full-calendar {
  background: initial;
}

.a-calendar .full-calendar-body,
.a-calendar .full-calendar-header .btn-month {
  background: #fff;
}
</style>