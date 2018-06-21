<template>
    <div id="app">
        <ve-calendar  v-model="selected"   :mode="mode" :most-choice="0" @refresh-calendar="refreshC"   :cross-month="false" @append-event="appendEvent"  @click-event="clickEvent" >
            <!--<div slot="day-number" slot-scope="{day}">-->
                <!--<span :style="day.sMonth===month&&test.indexOf(day.sDay)>=0?'color:red;':''">{{day.sDay}}</span>-->
            <!--</div>-->
            <!-- <div slot="day-event" slot-scope="{day,popMenu}">
                <div v-if="day.sMonth===month&&test.indexOf(day.sDay)>=0">
                    <div style="height: 5px;background-color: rgb(104, 211, 255);" @click="popMenu($event,{day,item})"></div>
                </div>
            </div> -->
            <!--<div slot="day-event-left-menu" slot-scope="{currentEvent,eventMenuShow}">-->
                <!--&lt;!&ndash; 这里如果需要调用多重包装的数据，请放到v-if里面 &ndash;&gt;-->
                <!--<div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>-->
                <!--<div class="day-event-menu-item">父组件{{month}}</div>-->
                <!--<div @click="deleteEvent(currentEvent.item)" class="day-event-menu-item">delete event</div>-->
            <!--</div>-->

            <!--<div slot="day-event-right-menu" slot-scope="{currentEvent,eventRightMenuShow}" >-->
                <!--<div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>-->
                <!--<div class="day-event-menu-item">test</div>-->
            <!--</div>-->

        </ve-calendar>
        <div style="margin-top:20px;margin-left:20px;">
            <button @click="changeMode">切换显示模式{{mode}}</button>
        </div>
        
    </div>
</template>

<script>
import veCalendar from "./vue-easy-calendar/calendar";

export default {
    name: "App",
    data() {
        return {
            modeList: ["mini", "normal", "auto"],
            modeIndex: 0,
            mode: "",
            activateDate: {
                year: 2017,
                month: 6
            },
            month: 6,
            test: [5],
            selected: []
        };
    },
    methods: {
        changeMode() {
            this.modeIndex++;
            this.mode = this.modeList[this.modeIndex % 3];
        },
        refreshC(yearmonth, data) {
            console.log(yearmonth, data);
            data[2].selected = true;
        },
        clickEvent(e, data) {
            console.log(e, data);
        },
        deleteEvent(item) {
            console.log(`你打算删除事情${item}`);
        },
        appendEvent(day) {
            console.log("appendEvent", day);
        }
    },
    mounted() {
        this.changeMode();
    },
    components: {
        veCalendar
    }
};
</script>

