<template>
    <div v-menu="false">
        <div class="ve-calendar" v-if="mode==='normal'">
            <div class="header">
                <div class="ve-button last" @click="lastMonth">
                    <i class="ve-icon icon-last"></i>
                </div>
                <div class="ve-button month">
                    <div style="width:100%;">
                        <div class="dropdown" style="width:100%;text-align: center;">
                            <span>{{currentMonth+1}}月</span>
                            <div class="dropdown-content">
                                <div class="dropdown-month" :class="{activated:m==(currentMonth+1)}" v-for="m in 12" :key="`dropdown_m${m}`" @click="gotoMonth(m)">{{m}}月</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ve-button next" @click="nextMonth">
                    <i class="ve-icon icon-next"></i>
                </div>
                <div class="ve-button year" >
                    <input v-model="currentYear" @input="changeYear" :min="1900" type="number" class="ve-year">
                    <span v-show="showErr" style="font-size: 12px;position: absolute;margin-left: 20px;color: rgba(1,1,1,0.3);">不支持</span>
                </div>

                <div class="ve-button today" @click="goToday">今天</div>

            </div>
            <div class="body">
                <div class="week-title">
                    <div class="title-grid" v-for="week in weekTitleData" :key="week">{{week}}</div>
                </div>
                <div class="days">
                    <div class="days-line" v-for="line in 6" :key="`line_${line}`">
                        <div class="day-grid" @mousedown="dayMouseDown($event,row,line*7-7+index)" @mousemove="dayMouseMove($event,row,line*7-7+index)" @mouseup="dayMouseUp($event,row,line*7-7+index)" :class="{ 
                        disabled: row.sMonth!==(currentMonth+1)&&crossMonth===true ,
                        disabled2: row.sMonth!==(currentMonth+1)&&crossMonth===false,
                        selected: row.selected===true,
                        preview:row.preview === true,
                        today:row.sDay===today.getDate() && row.sMonth === (today.getMonth()+1) && row.sYear ===today.getFullYear(),
                        }" v-for="(row,index) in monthData.slice((line-1)*7,line*7)" :key="`grid_${index}`">
                            <div class="day-title">
                                <div class="day-number">
                                    <slot name="day-number" :day="row">
                                        <div :style="getHoliday(row)">{{row.sDay}}</div>
                                    </slot>
                                </div>
                                <div class="day-lunar" :style="`color:${row.color}`" :title="getLunar(row)">
                                    <slot name="day-lunar" :day="row">
                                        {{row.solarTerms||getLunar(row)}}
                                    </slot>
                                </div>
                            </div>
                            <div class="day-content">
                                <div class="day-event" @mouseenter="dayEventEnter" @mouseleave="dayEventLeave">
                                    <slot name="day-event" :day="row" :popMenu="clickEvent">
                                    </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="dayEventMenu"
                     v-show="eventMenuShow"
                     :style="`top:${eventMenuTop}px;left:${eventMenuLeft}px;`">
                        <slot  name="day-event-left-menu" :eventMenuShow="eventMenuShow" :currentEvent="currentEvent">
                            <div :class="dayEventMenuItem">默认事件</div>
                        </slot>
                </div>

                <div :class="dayEventMenu"
                     v-show="eventRightMenuShow"
                     :style="`top:${eventMenuTop}px;left:${eventMenuLeft}px;`">
                    <slot name="day-event-right-menu" :eventRightMenuShow="eventRightMenuShow" :currentEvent="currentEvent">
                        <div :class="dayEventMenuItem" @click="appendEvent">添加待办事项</div>
                    </slot>
                </div>
            </div>
        </div>
        <div class="" v-if="mode==='mini'">

        </div>
    </div>
</template>

<script>
import lunar from "./js/lunar";
import Vue from "vue";
Vue.directive("menu", {
    // 屏蔽右键菜单
    inserted: function(target) {
        target.oncontextmenu = function() {
            //do something......
            //Data.configData.dragData[_index].menu = true;
            return false;
        };
    }
});

export default {
    name: "ve-calendar",
    props: {
        defHolidayColor: {
            // 默认的节日颜色
            type: String,
            default: "#E6A23C"
        },
        mode: {
            // 显示模型
            type: String,
            default: "normal"
        },
        offDays: {
            // 工作休息日
            type: Array,
            default() {
                return [];
            }
        },
        dayEvent:{
            //默认待办事项区域的class name
            type:String,
            default:"day-event"
        },
        dayEventMenu:{
            //默认弹出菜单的class name
            type:String,
            default:"day-event-menu"
        },
        dayEventMenuItem:{
            // 默认的弹出菜单子项目class name
            type:String,
            default:"day-event-menu-item"
        },

        value: {
            // 选中日期列表
            type: Array,
            default() {
                return [];
            }
        },
        activateDate: {
            // 激活年月
            type: Object,
            default() {
                let today = new Date();
                return {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1
                };
            }
        },
        pickMode:{
            // 切换模式
            type:Boolean,
            default:true
        },
        rightMenu:{
            // 是否显示鼠标右键
            type:Boolean,
            default:true
        },
        mostChoice: {
            // 最多选择日期数量,0无限
            type: Number,
            default: 0
        },
        crossMonth: {
            // 是否允许跨月选中
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            weekTitleData: ["日", "一", "二", "三", "四", "五", "六"],
            monthData: [],
            today: new Date(),
            currentYear: this.activateDate.year,
            currentMonth: this.activateDate.month - 1,
            lastCurMonth: this.activateDate.month - 1, // 上一个当前月，用于选择月份的时候取消
            selectedDate: this.value,
            lastSelectedDate: this.value, // 上次选中的日期
            monthEditMode: false,
            yearEditMode: false,
            showErr: false, // 显示错误年份提示
            mouseLeftHold: false, // 鼠标左键按住
            mouseHoldIndex: 0, // 鼠标按住时候的数据索引
            mouseHoldLastIndex: -1, // 上一次的索引
            mouseOverEventDiv: false, //鼠标浮动在事件区域，禁用选择日期
            currentDay:null, // 当前天的数据对象
            currentEvent:{}, //当前事件数据
            eventMenuShow:false, // 左键菜单
            eventRightMenuShow:false,// 右键菜单
            eventMenuTop:0,
            eventMenuLeft:0,
        };
    },
    computed: {

    },
    watch: {
        value() {
            this.selectedDate = this.value;
            this.checkSelected();
        },
        selectedDate() {
            this.$emit("input", this.selectedDate);
            this.$emit("change", this.selectedDate);
        },
        activateDate() {
            this.currentYear = this.activateDate.year;
            this.currentMonth = this.activateDate.month - 1;
            this.makeCalendar();
        }
    },
    created() {},
    mounted() {
        this.init();
    },
    updated() {},
    methods: {
        init() {
            // 初始化组件

            this.initConfig(); // 初始化配置

            this.makeCalendar(); //制作日历数据
        },
        initConfig() {
            window.document.addEventListener("mouseup", this.eventLinstenerMouseUp);
        },
        eventLinstenerMouseUp(e){
            if(e.button===0) {
                this.mouseLeftHold = false;
                this.eventMenuShow = false;
                this.eventRightMenuShow = false;
            }
            if(e.button===2){
                this.mouseLeftHold = false;
                this.eventMenuShow = false;
            }
            this.dayMouseUp();
        },

        lastMonth() {
            // 跳转上一个月
            if (this.currentMonth == 0) {
                this.currentYear -= 1;
                this.currentMonth = 11;
            } else {
                this.currentMonth -= 1;
            }
            this.makeCalendar();
        },
        nextMonth() {
            // 跳转下一个月
            if (this.currentMonth == 11) {
                this.currentYear += 1;
                this.currentMonth = 0;
            } else {
                this.currentMonth += 1;
            }
            this.makeCalendar();
        },
        getLunar(day) {
            // 显示节气、节日、农历
            if (day.color) day.color = this.defHolidayColor;
            return (
                day.solarTerms ||
                day.solarFestival ||
                day.lunarFestival ||
                (day.lDay == 1 ? day.lMonthChinese : day.lDayChinese)
            );
        },

        makeCalendar() {
            // 制作当前月份的日历数据
            let data = new lunar(this.currentYear, this.currentMonth);
            this.monthData = this.combinedData(data);
            this.checkSelected();
            this.$emit("refresh-calendar", {
                year: this.currentYear,
                month: this.currentMonth + 1
            },this.monthData);
        },
        combinedData(data) {
            // 组合数据
            for (let i in data) {
                if (typeof data[i] === "object") {
                    data[i].selected = false;
                    data[i].preview = false;
                }
            }
            return data
        },
        appendEvent(){
            // 添加事件
            this.$emit('append-event',this.currentEvent.day)
        },
        dayClick(row) {
            // 点击某一天
            // console.log(row);
            if (
                // 非挑选切换模式下，超过最大选中项不再操作
                this.mostChoice<0 ||
                (this.pickMode===false && this.mostChoice > 0 &&
                    this.selectedDate.length >= this.mostChoice) ||
                (this.crossMonth == false &&
                    this.currentMonth + 1 !== row.sMonth)
            ) {
                return;
            }
            if (row.selected === true) {
                row.selected = false;
            } else {
                row.selected = true;
            }
            let index = this.selectedDate.indexOf(row.sDate);
            if (index >= 0) {
                // 如果之前已经选中
                if (row.selected === false) {
                    this.selectedDate.splice(index, 1);
                }
            } else {
                // 如果之前没选中
                if (row.selected === true ) {
                    this.selectedDate.push(row.sDate);
                }
            }

            if(this.pickMode===true && this.mostChoice > 0 && this.selectedDate.length > this.mostChoice){
                this.selectedDate.splice(0,1)
            }
        },
        dayMouseDown(e, row, index) {
            if (e.button === 0) {
                if (
                    this.mouseOverEventDiv === true ||
                    (this.crossMonth === false &&
                        this.currentMonth + 1 !== row.sMonth)
                ) {
                    return;
                }
                this.mouseLeftHold = true;
                this.mouseHoldIndex = index;
                row.preview = true;
            }
            // 鼠标右键
            if (e.button === 2 && this.rightMenu===true) {
                this.currentEvent = {day:row}
                this.eventMenuTop = e.y
                this.eventMenuLeft = e.x
                this.eventRightMenuShow = true
            }
        },
        dayMouseMove(e, row, index) {
            if (
                this.mouseLeftHold === true &&
                index != this.mouseHoldLastIndex &&
                ((this.crossMonth === false &&
                    this.currentMonth + 1 === row.sMonth) ||
                    this.crossMonth === true)
            ) {
                row.preview = true;
                this.mouseHoldLastIndex = index;
            }
        },
        dayMouseUp(e, row, index) {
            this.mouseLeftHold = false;

            for (let i in this.monthData) {
                if (this.monthData[i].preview === true) {
                    this.monthData[i].preview = false;
                    this.dayClick(this.monthData[i]);
                }
            }
        },
        dayEventEnter() {
            // 鼠标浮动在事件区域，禁用选择日期
            this.mouseOverEventDiv = true;
        },
        dayEventLeave() {
            // 鼠标浮动在事件区域，禁用选择日期
            this.mouseOverEventDiv = false;
        },
        goToday() {
            // 跳转到今天
            this.currentYear = this.today.getFullYear();
            this.currentMonth = this.today.getMonth();
            this.makeCalendar();
        },
        gotoMonth(m) {
            // 确定月份
            this.currentMonth = m - 1;
            this.makeCalendar();
        },
        getHoliday(row){
            // 获取假期
            let color = "color:#F56C6C;"
            if(this.offDays.length>0){
                return this.offDays.indexOf(row.sDate)>=0?color:''
            }else{
                return (row.week=='六'|| row.week=='日')?color:''
            }
        },
        changeYear() {
            // 改变年份
            if (typeof this.currentYear !== "string") {
                this.showErr = true;
                return;
            }
            this.currentYear = parseInt(this.currentYear);
            if (this.currentYear > 1900 && this.currentYear <= 2050) {
                this.showErr = false;
                this.makeCalendar();
            } else {
                this.showErr = true;
            }
        },
        checkSelected() {
            // 检查当前选择
            for (let i in this.monthData) {
                if (typeof this.monthData[i] === "object") {
                    if (
                        this.selectedDate.indexOf(this.monthData[i].sDate) >= 0
                    ) {
                        this.monthData[i].selected = true;
                    } else {
                        this.monthData[i].selected = false;
                    }
                }
            }
        },
        clickEvent(e,data) {
            if(typeof e !=="object" || (typeof data!=="object" && !data.day)){
                return
            }
           
            this.currentEvent = data
            this.eventMenuTop = e.y
            this.eventMenuLeft = e.x
            this.eventMenuShow = true

            this.$emit('click-event',e,data)
        }
    },
    beforeDestroy() {
        window.document.removeEventListener("mouseup", this.eventLinstenerMouseUp);
    },
    components: {}
};
</script>

<style scoped>
@import "./style/icon.css";
.ve-calendar {
    display: flex;
    border: 1px solid #dcdfe6;
    flex-direction: column;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    transition: 0.3s;
    padding: 20px;
    font-size: 14px;
    /* min-width: 740px; */
    max-width: 960px;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}

.ve-calendar .header {
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
    width: 100%;
}

.header .month,
.year {
    font-size: 22px;
    font-weight: 600;
}

.header .month {
    width: 15%;
}

input.ve-year {
    height: 36px;
    font-size: 22px;
    width: 100px;
    font-weight: 600;
    border: none;
}

input.ve-year:focus {
    outline: none;
}

input[type="number"].ve-year::-webkit-inner-spin-button {
    width: 20px;
    height: 36px;
}

input[type="number"].ve-year:hover::-webkit-inner-spin-button {
    width: 20px;
    height: 36px;
    border: none;
}

.ve-button {
    min-width: 40px;
    min-height: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
}
.ve-button:hover {
    background-color: #409EFF;
    border-radius: 3px;
}

.ve-calendar .body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 20px;
}

.days-line,
.week-title {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
}

.title-grid {
    width: calc((100% / 7));
    height: 30px;
    justify-content: center;
    display: flex;
}
.day-grid {
    width: calc((100% / 7));
    height: 80px;
    border: 1px solid #dcdfe6;
    padding: 5px;
    border-radius: 3px;
    overflow: hidden;
}

.day-grid.disabled {
    color: #c0c4cc;
}

.day-grid.disabled2 {
    color: #c0c4cc;
    pointer-events: none;
}

.day-event-menu {
    background-color: #F2F6FC;
    position: absolute;
    z-index:9;
    border-radius: 3px;
    width:80px;
    display: flex;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    flex-direction: column;
    padding: 10px;
    width: 200px;
}

.day-event-menu-item {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
}
.day-event-menu-item:hover {
    background-color: #409EFF;
    cursor: pointer;
}

.day-grid:hover {
    border: 1px solid #2d71b4;
    /* background-color: #409EFF; */
}

.day-grid.selected {
    background-color: #409EFF;
}

.day-grid.preview {
    background-color: #E6A23C;
    border: 1px solid #E6A23C;
}

.day-grid.today {
    border: 1px solid #F56C6C;
}

.day-title {
    display: flex;
    justify-content: space-around;
}
.day-number {
    width: 30px;
    display: flex;
    font-weight: 600;
    font-size: 18px;
}

.day-lunar {
    display: flex;
    /* width: calc((70% - 10px)); */
    /* max-width: calc((70% - 10px)); */
    width: 60px;
    flex: 0 0 60px;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    /* text-overflow: ellipsis; */
}

/* .day-event {
    margin-top: 10px;
    cursor: pointer;
} */

.day-content {
    display: flex;
    flex: 1 1 100%;
}

.dropdown {
    position: relative;
    display: inline-block;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    border-radius: 3px;
    /* margin-left: -1rem; */
}
.dropdown:hover .dropdown-content {
    display: flex;
    flex-direction: column;
}
.dropdown-content .dropdown-month {
    /* width: 100%; */
    height: 30px;
    display: flex;
    padding-left: 30px;
    align-items: center;
}

.dropdown-month.activated {
    color: #2d71b4;
}

.dropdown-content .dropdown-month:hover {
    background-color: #409EFF;
}
</style>