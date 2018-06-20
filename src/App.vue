<template>
    <div id="app">
        
        <ve-calendar  v-model="selected"  :most-choice="0" @refresh-calendar="refreshC"  :off-days="test" :cross-month="false" @append-event="appendEvent"  @click-event="clickEvent" >
            <div slot="day-number" slot-scope="{day}">
                <span :style="day.sMonth===month&&test.indexOf(day.sDay)>=0?'color:red;':''">{{day.sDay}}</span>
            </div>
            <div slot="day-event" slot-scope="{day,popMenu}">
                <div v-if="day.sMonth===month&&test.indexOf(day.sDay)>=0">
                    <div v-for="item in 5" :key="item" @click="popMenu($event,{day,item})">待办事项{{item}}</div>
                </div>
            </div>
            <div slot="day-event-left-menu" slot-scope="{currentEvent,eventMenuShow}">
                <!-- 这里如果需要调用多重包装的数据，请放到v-if里面 -->
                <div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>
                <div class="day-event-menu-item">父组件{{month}}</div>
                <div @click="deleteEvent(currentEvent.item)" class="day-event-menu-item">delete event</div>
            </div>

            <!-- <div slot="day-event-right-menu" slot-scope="{currentEvent,eventRightMenuShow}" >
                <div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>
                <div class="day-event-menu-item">test</div>
            </div> -->

        </ve-calendar>
        <button @click="refreshC(11)">测试</button>
    </div>
</template>

<script>
import veCalendar from "./vue-easy-calendar/calendar";

export default {
    name: "App",
    data() {
        return {
            activateDate: {
                year: 2017,
                month: 6
            },
            month: 6,
            test: [1],
            selected: []
        };
    },
    methods: {
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
    mounted() {},
    components: {
        veCalendar
    }
};
</script>

