<template>
    <div v-menu="false" v-resize="onResize">
        <div class="ve-calendar" :class="{mini:currentMode==='mini'}" >
            <div class="header">
                <div class="ve-button last" @click="lastMonth">
                    <i class="ve-icon icon-last"></i>
                </div>
                <div class="ve-button month">
                    <div style="width:100%;">
                        <div class="dropdown" :class="{mini:currentMode==='mini'}" style="">
                            <span>{{language(`${currentMonth+1}月`)}}</span>
                            <div class="dropdown-content" :class="{mini:currentMode==='mini'}">
                                <div class="dropdown-month" :class="{mini:currentMode==='mini',activated:m==(currentMonth+1)}" v-for="m in 12" :key="`dropdown_m${m}`" @click="gotoMonth(m)">{{language(`${m}月`)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ve-button next" @click="nextMonth">
                    <i class="ve-icon icon-next"></i>
                </div>
                <div class="ve-button year" >
                    <input v-model="currentYear" @input="changeYear" :min="1900" type="number" class="ve-year" :class="{mini:currentMode==='mini'}">
                    <span v-show="showErr" style="font-size: 12px;position: absolute;margin-left: 20px;color: rgba(1,1,1,0.3);">{{language('不支持')}}</span>
                </div>

                <div class="ve-button today" @click="goToday">{{language('今天')}}</div>

            </div>
            <div class="body">
                <div class="week-title">
                    <div class="title-grid" v-for="week in weekTitleData" :key="week">{{language(week)}}</div>
                </div>
                <div class="days">
                    <div class="days-line" v-for="line in 6" :key="`line_${line}`">
                        <div class="day-grid" @mousedown="dayMouseDown($event,row,line*7-7+index)" @mousemove="dayMouseMove($event,row,line*7-7+index)" @mouseup="dayMouseUp($event,row,line*7-7+index)" :class="{ 
                        disabled: row.sMonth!==(currentMonth+1)&&crossMonth===true ,
                        mini:currentMode==='mini',
                        disabled2: row.sMonth!==(currentMonth+1)&&crossMonth===false,
                        selected: row.selected===true,
                        preview:row.preview === true,
                        today:row.sDay===today.getDate() && row.sMonth === (today.getMonth()+1) && row.sYear ===today.getFullYear(),
                        }" v-for="(row,index) in monthData.slice((line-1)*7,line*7)" :key="`grid_${index}`">
                            <div class="day-title" :class="{mini:currentMode==='mini'}">
                                <div class="day-number" :class="{mini:currentMode==='mini'}">
                                    <slot name="day-number" :day="row">
                                        <div :style="getHoliday(row)">{{row.sDay}}</div>
                                    </slot>
                                </div>
                                <div v-if="currentMode==='normal'" class="day-lunar" :class="{mini:currentMode==='mini'}" :style="`color:${row.color}`" :title="getLunar(row)">
                                    <slot name="day-lunar" :day="row">
                                        <span v-if="lang==='zh-cn'">{{getLunar(row,3)}}</span>
                                        
                                    </slot>
                                </div>
                            </div>
                            <div class="day-content" :class="{mini:currentMode==='mini'}">
                                <div v-if="currentMode==='mini'" class="day-lunar" :class="{mini:currentMode==='mini'}" :style="`color:${row.color}`" :title="getLunar(row)">
                                    <slot name="day-lunar" :day="row">
                                        <span v-if="lang==='zh-cn'">{{getLunar(row,3)}}</span>
                                    </slot>
                                </div>
                                <div class="day-event" :class="{mini:currentMode==='mini'}"  @mouseenter="dayEventEnter" @mouseleave="dayEventLeave">
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

    </div>
</template>

<script>
import lunar from "./js/lunar";
import english from "./js/language";
import resize from 'vue-resize-directive'


export default {
    directives:{
        'menu':{
            // 屏蔽右键菜单
            inserted: function(target) {
                target.oncontextmenu = function() {
                    //do something......
                    //Data.configData.dragData[_index].menu = true;
                    return false;
                };
            }
        },
        'resize':resize
    },
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
        dayEvent: {
            //默认待办事项区域的class name
            type: String,
            default: "day-event"
        },
        dayEventMenu: {
            //默认弹出菜单的class name
            type: String,
            default: "day-event-menu"
        },
        dayEventMenuItem: {
            // 默认的弹出菜单子项目class name
            type: String,
            default: "day-event-menu-item"
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
        pickMode: {
            // 切换模式
            type: Boolean,
            default: true
        },
        rightMenu: {
            // 是否显示鼠标右键
            type: Boolean,
            default: true
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
        },
        lang: {
            type: String,
            default: "zh-cn"
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
            currentMode:this.mode, // 当前显示模式
            lastSelectedDate: this.value, // 上次选中的日期
            monthEditMode: false,
            yearEditMode: false,
            showErr: false, // 显示错误年份提示
            mouseLeftHold: false, // 鼠标左键按住
            mouseHoldIndex: 0, // 鼠标按住时候的数据索引
            mouseHoldLastIndex: -1, // 上一次的索引
            mouseOverEventDiv: false, //鼠标浮动在事件区域，禁用选择日期
            currentDay: null, // 当前天的数据对象
            currentEvent: {}, //当前事件数据
            eventMenuShow: false, // 左键菜单
            eventRightMenuShow: false, // 右键菜单
            eventMenuTop: 0,
            eventMenuLeft: 0
        };
    },
    computed: {},
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
        },
        mode(){
            if(this.mode!=='auto') {
                this.currentMode = this.mode;
            }
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
            window.document.addEventListener(
                "mouseup",
                this.eventLinstenerMouseUp
            );
        },
        language(text) {
            // 简易英文支持
            if (this.lang === "en" && english[text]) {
                return english[text];
            } else {
                return text;
            }
        },
        eventLinstenerMouseUp(e) {
            if (e.button === 0) {
                this.mouseLeftHold = false;
                this.eventMenuShow = false;
                this.eventRightMenuShow = false;
            }
            if (e.button === 2) {
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
        getLunar(day,length=10) {
            // 显示节气、节日、农历
            if (day.color) day.color = this.defHolidayColor;
            let lunar = (
                day.solarTerms ||
                day.solarFestival ||
                day.lunarFestival ||
                (day.lDay == 1 ? day.lMonthChinese : day.lDayChinese)
            )
            return lunar.substr(0,length)
        },

        makeCalendar() {
            // 制作当前月份的日历数据
            let data = new lunar(this.currentYear, this.currentMonth);
            this.monthData = this.combinedData(data);
            this.checkSelected();
            this.$emit(
                "refresh-calendar",
                {
                    year: this.currentYear,
                    month: this.currentMonth + 1
                },
                this.monthData
            );
        },
        combinedData(data) {
            // 组合数据
            for (let i in data) {
                if (typeof data[i] === "object") {
                    data[i].selected = false;
                    data[i].preview = false;
                }
            }
            return data;
        },
        appendEvent() {
            // 添加事件
            this.$emit("append-event", this.currentEvent.day);
        },
        dayClick(row) {
            // 点击某一天
            // console.log(row);
            if (
                // 非挑选切换模式下，超过最大选中项不再操作
                this.mostChoice < 0 ||
                (this.pickMode === false &&
                    this.mostChoice > 0 &&
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
                if (row.selected === true) {
                    this.selectedDate.push(row.sDate);
                }
            }

            if (
                this.pickMode === true &&
                this.mostChoice > 0 &&
                this.selectedDate.length > this.mostChoice
            ) {
                this.selectedDate.splice(0, 1);
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

                if (this.mostChoice < 0) {
                    return;
                }
                this.mouseLeftHold = true;
                this.mouseHoldIndex = index;
                row.preview = true;
            }
            // 鼠标右键
            if (e.button === 2 && this.rightMenu === true) {
                console.log(e);
                this.currentEvent = { day: row };
                this.eventMenuTop = e.y;
                this.eventMenuLeft = e.x;
                this.eventRightMenuShow = true;
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
        getHoliday(row) {
            // 获取假期
            let color = "color:#F56C6C;";
            if (this.offDays.length > 0) {
                return this.offDays.indexOf(row.sDate) >= 0 ? color : "";
            } else {
                return row.week == "六" || row.week == "日" ? color : "";
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
        clickEvent(e, data) {
            if (
                typeof e !== "object" ||
                (typeof data !== "object" && !data.day)
            ) {
                return;
            }

            this.currentEvent = data;
            this.eventMenuTop = e.y;
            this.eventMenuLeft = e.x;
            this.eventMenuShow = true;

            this.$emit("click-event", e, data);
        },
        onResize(ele){
            if(ele.offsetWidth<=400){
                this.currentMode = 'mini'
            }else if(ele.offsetWidth>=600){
                this.currentMode ='normal'
            }
        }
    },
    beforeDestroy() {
        window.document.removeEventListener(
            "mouseup",
            this.eventLinstenerMouseUp
        );
    },
    components: {}
};
</script>

<style scoped>
@import "./style/icon.css";
@import "./style/normal.css";
@import "./style/mini.css";
</style>