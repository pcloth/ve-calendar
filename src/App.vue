<template>
    <div id="app" >
        <ve-calendar  v-model="selected" :height="height" :lunar="lunar" :event="event" :pick-mode="pickMode" :offDays="offDays" :mode="mode" :most-choice="mostChoice" @refresh-calendar="refreshC"   :cross-month="crossMonth" @append-event="appendEvent"  @click-event="clickEvent" >
            <!--<div slot="day-number" slot-scope="{day}">-->
                <!--<span :style="day.sMonth===month&&test.indexOf(day.sDay)>=0?'color:red;':''">{{day.sDay}}</span>-->
            <!--</div>-->
            <div slot="day-event" slot-scope="{day,popMenu}">
                <div v-if="test.indexOf(day.sDay)>=0">
                    <div @click="popMenu($event,{day,item})" style="color:red;">{{item}}</div>
                </div>
            </div>
            <div slot="day-event-left-menu" slot-scope="{currentEvent,eventMenuShow}">
                <!-- 这里如果需要调用多重包装的数据，请放到v-if里面 -->
                <div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>
                <div @click="deleteEvent(currentEvent.item)" class="day-event-menu-item">使用插槽控制菜单</div>
            </div>

            <div slot="day-event-right-menu" slot-scope="{currentEvent,eventRightMenuShow}" >
                <div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>
                <div class="day-event-menu-item">右键插槽控制菜单</div>
            </div>

        </ve-calendar>
        <div class="demo-div" >
            <div>
                <label for="selected">选中的日期array</label>
                <input id="selected" type="text" :value="selected" placeholder="选中上面的日期">
            </div>
            <div>
                <label for="height">组件高度</label>
                <input id="height" type="text" v-model="height">
            </div>

            <div>
                <label for="mostChoice">最大选择数量</label>
                <input id="mostChoice" type="number" v-model="mostChoice" title="0是无限，-1是禁止">
            </div>

            <div>
                <label for="item">给每月2号添加事件</label>
                <input id="item" type="text" v-model="item">
            </div>

            <div>
                <button @click="event=!event">事件开关{{event}}</button>
                <button @click="lunar=!lunar">农历{{lunar}}</button>
                <button @click="pickMode=!pickMode">挑选模式{{pickMode}}</button>
                <button @click="crossMonth=!crossMonth">跨月选择{{crossMonth}}</button>
            </div>
            <div>
                <button @click="changeMode">模式{{mode}}</button>
                <button @click="setOffDays">把选中日期设置为休息日</button>
            </div>

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
            item: "去看世界杯",
            lunar: true,
            offDays: [],
            pickMode: false,
            mostChoice: 0,
            crossMonth: true,
            event: true,
            activateDate: {
                year: 2017,
                month: 6
            },
            height: "500px",
            month: 6,
            test: [2],
            selected: []
        };
    },
    methods: {
        changeMode() {
            this.modeIndex++;
            this.mode = this.modeList[this.modeIndex % 3];
        },
        setOffDays() {
            this.offDays = JSON.parse(JSON.stringify(this.selected));
            this.selected = [];
        },
        refreshC(yearmonth, data) {
            console.log(yearmonth, data);
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

<style>
.demo-div {
    padding: 20px;
    height: 200px;
}

.demo-div div {
    margin-top: 10px;
}
</style>

