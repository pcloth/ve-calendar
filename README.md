# ve-calendar

> This is a vue 2.0 based calendar component
>
<p align="center">
   <a href="https://www.npmjs.com/package/ve-calendar"><img src="https://img.shields.io/npm/v/ve-calendar.svg?style=flat " alt="npm"></a>
   <a href="https://www.npmjs.com/package/ve-calendar"><img src="https://img.shields.io/npm/dm/ve-calendar.svg?style=flat " alt="npm"></a>
 </p>
 

[中文文档](./README.ZH.MD)


# Current function:
>1, display the lunar calendar, solar terms, festivals before 2050
>
> 2, can specify the maximum number of selected dates
>
>3, available slots custom date number, lunar calendar, event area


## Quick Start

### The first step:
``` sh
Npm install ve-calendar --save
```
### The second step, on your vue page
```js
Import veCalendar from "ve-calendar";

// in your vue <script>
Export default {
    Components: {
        veCalendar
    }
}
```

### The third step, loading the template:
``` html
<veCalendar v-model="selectDateList"></veCalendar>

```


## props parameter
Parameter Name | Type | Default | Description
---- | --- | --- | ---
Value | array | none | v-model binding value, is the current selected date list
Activate-date | object | date of the year | contains two values ​​year current year, month current month
Most-choice | number | 0 | up to choose the number of days, 0 infinity. Negative number indicates prohibition of selection
Cross-month | boolean | false | whether to allow cross-month selection
| pick-mode | boolean | true | Pick mode: When true, the number of newly selected days exceeds the number of most-choice settings, and the oldest date will be discarded. When false, more than most-choice settings will no longer be selected 



## event
Name | Parameter | Description
---- | --- | ---
Refresh-calendar | None | Trigger/change activation year when switching calendars
Change | selectedDate/array | Fired when the selected date changes, the parameter is the list of currently selected dates (string)


## slot
| Name | Parameter | Description |
| --- | --- | --- |
day-number | day | is used to replace the default upper-left digit, day is the data object of the day |
day-lunar | day | It is used to replace the lunar calendar, festivals, and solar terms in the upper right corner. day is the data object of the day |
| day-event | day | Used to display functions such as to-do items, day is the data object of the day |


## demo
``` html
<ve-calendar v-model="selected" @change="refreshC" :off-days="test" :cross-month="false" >
   <div slot="day-number" slot-scope="{day}">
     <span :style="s.sMonth===month && test.indexOf(day.sDay)>=0?'color:red;':''">{{day.sDay}</span>
   </div>
   <div slot="day-event" slot-scope="{day,click}">
     <div v-if="day.sMonth===month && test.indexOf(day.sDay)>=0">
       <div v-for="item in 5" :key="item" @click="click(item)">To Do{{item}}</div>
     </div>
   </div>
</ve-calendar>
```

## Preview
![Alt ​​text](./images/demo.png)


## License

[MIT]