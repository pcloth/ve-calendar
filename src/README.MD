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
>2, can specify the maximum number of selected dates
>
>3, available slots custom date number, lunar calendar, event area
>
>4, Available slots define the left and right key menus (the right-click menu has a default item)
>
>5, Multi-language support
>
>6, two size display modes


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
| Parameter Name      | Type    | Default             | Description                                                                                                                                                                                                      |
| ------------------- | ------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value               | array   | none                | v-model binding value, is the current selected date list                                                                                                                                                         |
| Activate-date       | object  | date of the year    | contains two values ​​year current year, month current month                                                                                                                                                     |
| Most-choice         | number  | 0                   | up to choose the number of days, 0 infinity. Negative number indicates prohibition of selection                                                                                                                  |
| Cross-month         | boolean | false               | whether to allow cross-month selection                                                                                                                                                                           |
| pick-mode           | boolean | true                | Pick mode: When true, the number of newly selected days exceeds the number of most-choice settings, and the oldest date will be discarded. When false, more than most-choice settings will no longer be selected |
| right-menu          | boolean | true                | Whether to display the right mouse menu                                                                                                                                                                          |
| day-event-menu      | string  | day-event-menu      | Popup menu's class name                                                                                                                                                                                          |
| day-event-menu-item | string  | day-event-menu-item | popup menu item class name                                                                                                                                                                                       |
| lang                | string  | zh-cn               | Multi-language support, default Simplified Chinese. Lu and Lunar Holidays are not displayed in en mode, and can only be customized using slots                                                                   |
| mode                | string  | normal              | normal/mini/auto Three display modes, auto is automatically switched according to the width.                                                                                                                     |   

## event
| Name             | Parameter          | Description                                                                                                                                                                                    |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Refresh-calendar | None               | Trigger/change activation year when switching calendars                                                                                                                                        |
| Change           | selectedDate/array | Fired when the selected date changes, the parameter is the list of currently selected dates (string)                                                                                           |
| append-event     | day                | The default right-click menu is followed by an outgoing event. day is the day of the mouse click. If you use the right-menu slot, this event is invalidated and you need to write it yourself. |

## slot
| Name                 | Parameter                                      | Description                                                                                                                                                                                                                                                                                                                   |
| -------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| day-number           | day                                            | is used to replace the default upper-left digit, day is the data object of the day                                                                                                                                                                                                                                            |
| day-lunar            | day                                            | It is used to replace the lunar calendar, festivals, and solar terms in the upper right corner. day is the data object of the day                                                                                                                                                                                             |
| day-event            | slot-scope="{day,popMenu}"                     | Used to display the functions such as to-do items, day is the data object of the day, popMenu is the method of the pop-up left-click menu passed by the component, you must call as follows: @click="popMenu($event,{day,item} Only the item is the data that needs to be passed in. Only the other parameters are necessary. |
| day-event-left-menu  | slot-scope="{currentEvent,eventMenuShow}"      | When there is a to-do item, click the left mouse button to pop up the menu slot; currentEvent is the {day,item} parameter passed in by the popMenu above.                                                                                                                                                                     |
| day-event-right-menu | slot-scope="{currentEvent,eventRightMenuShow}" | Menu slot that pops up when the right mouse button clicks on a blank event area                                                                                                                                                                                                                                               |


## day data content
```js
isToday = false;
//solar calendar
sYear = sYear; //4 digits in AD
sMonth = sMonth; //number of the month
sDay = sDay; //AD figures
Week = week; //weeks, 1 Chinese
    
// Lunar
lYear = lYear; //4 digits in AD
lMonth = lMonth; // Lunar month number
lMonthChinese = ''
lDay = lDay; // Chinese lunar calendar number
isLeap = isLeap; // Is it a lunar month?
lDayChinese = 'First Day'

//character
cYear = cYear; //yearly column, 2 Chinese
cMonth = cMonth; //Moon, 2 Chinese
cDay = cDay; //Japanese, 2 Chinese

Color = ''; // The color of the holiday display

lunarFestival = ''; // Lunar Holidays
solarFestival = ''; // Gregorian calendar
solarTerms = ''; // Solar Terms

If (`${sMonth}`.length == 1) sMonth = `0${sMonth}`;
If (`${sDay}`.length == 1) sDay = `0${sDay}`;
sDate = `${sYear}-${sMonth}-${sDay}` // string date
```

## demo
``` html
<ve-calendar v-model="selected" :crossMonth="true" @refresh-calendar="refreshC"  :off-days="test" :cross-month="false" @append-event="appendEvent"  @click-event="clickEvent" >
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

            <div slot="day-event-right-menu" slot-scope="{currentEvent,eventRightMenuShow}" >
                <!-- 这里如果需要调用多重包装的数据，请放到v-if里面 -->
                <div v-if="currentEvent.day">{{currentEvent.day.sDate}}</div>
                <div class="day-event-menu-item">test</div>
            </div>

        </ve-calendar>
```

## Preview
![Alt ​​text](./images/demo.png)


## License

[MIT]