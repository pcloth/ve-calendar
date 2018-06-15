<template>
    <div id="app">
        <ve-calendar v-model="selected" @change="refreshC" :off-days="test" :cross-month="false"  >
            <div slot="day-number" slot-scope="{day}">
                <span :style="day.sMonth===month&&test.indexOf(day.sDay)>=0?'color:red;':''">{{day.sDay}}</span>
            </div>
            <div slot="day-event" slot-scope="{day,click}">
                <div v-if="day.sMonth===month&&test.indexOf(day.sDay)>=0">
                    <div v-for="item in 5" :key="item" @click="click(item)">待办事项{{item}}</div>
                </div>
            </div>
        </ve-calendar>
        <!-- <button @click="goto8">调整到8月</button> -->
    </div>
</template>

<script>
import veCalendar from "./vue-easy-calendar/calendar";

export default {
    name: "App",
    data() {
        return {
            activateDate:{
                year:2017,
                month:6
            },
            month:6,
            test:[1,3,6],
            selected:['2018-06-05','2018-06-09']
        };
    },
    methods: {
        goto8() {
            // JSON.stringify
            this.activateDate = {
                year:2018,
                month:8
            }
        },
        refreshC(date){
            console.log(date);
        }
    },
    mounted() {},
    components: {
        veCalendar
    }
};
</script>

