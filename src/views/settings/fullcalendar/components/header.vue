<template>
  <div class="full-calendar-header">
    <div class="">
      <span class="prev-month btn-month" @click.stop="goPrev">{{leftArrow}}</span>
    </div>
    <div class="header-center">
      <span class="title">{{title}}</span>
    </div>
    <div class="h">
      <span class="next-month btn-month" @click.stop="goNext">{{rightArrow}}</span>
    </div>
  </div>
</template>
<script>
  import dateFunc from './dateFunc'

  export default {
    created () {
      this.dispatchEvent()
    },
    props : {
      currentDate : {},
      titleFormat : {},
      firstDay    : {},
      monthNames  : {}
    },
    data () {
      return {
        title      : '',
        leftArrow  : '上月',
        rightArrow : '下月',
        headDate : new Date()
      }
    },
    watch : {
      currentDate (val) {
        if (!val) return
        this.headDate = val
        console.log('currentDate', val)
        // this.headDate = JSON.parse(JSON.stringify(val))
      }
    },
    methods : {
      goPrev () {
        this.headDate = this.changeMonth(this.headDate, -1)
        this.dispatchEvent()
      },
      goNext () {
        this.headDate = this.changeMonth(this.headDate, 1)
        this.dispatchEvent()
      },
      changeMonth (date, num) {
        let dt = new Date(date)
        return new Date(dt.setMonth(dt.getMonth() + num))
      },
      dispatchEvent() {
        this.title = dateFunc.format(this.headDate, this.titleFormat, this.monthNames)

        let startDate = dateFunc.getStartDate(this.headDate)
        let curWeekDay = startDate.getDay()

        // 1st day of this monthView
        let diff = parseInt(this.firstDay) - curWeekDay
        if (diff) diff -= 7
        startDate.setDate(startDate.getDate() + diff) 

        // the month view is 6*7
        let endDate = dateFunc.changeDay(startDate, 41)

        // 1st day of current month
        let currentDate = dateFunc.getStartDate(this.headDate)

        this.$emit('change', 
          dateFunc.format(startDate, 'yyyy-MM-dd'),
          dateFunc.format(endDate, 'yyyy-MM-dd'),
          dateFunc.format(currentDate,'yyyy-MM-dd'),
          this.headDate
        )
      }
    }
  }
</script>
<style lang="scss">
.full-calendar-header{
  display: flex;
  align-items: center;
  .header-left,.header-right{
    flex:1;
  }
  .header-center{
    flex:3;
    text-align:center;
    .title{
      margin: 0 10px;
    }
    .prev-month,.next-month{
      cursor: pointer;
    }
  }

  .btn-month{
      display: inline-block;
      width: 31px;
      height: 31px;
      font-size: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 5px 0 0 5px;
      text-align: center;
      line-height: 31px;
      color:#666;
      cursor: pointer;

      &.next-month{
        border-radius: 0 5px 5px 0;
      }
      
  }
}
</style>
