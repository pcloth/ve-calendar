# ve-calendar

> 这是一个基于vue 2.X的日历组件
> 
<p align="center">
   <a href="https://www.npmjs.com/package/ve-calendar"><img src="https://img.shields.io/npm/v/ve-calendar.svg?style=flat" alt="npm"></a>
   <a href="https://www.npmjs.com/package/ve-calendar"><img src="https://img.shields.io/npm/dm/ve-calendar.svg?style=flat" alt="npm"></a>
 </p>
 

[English](./README.MD)

# 目前功能:
>1、显示2050年以前的农历、节气、节日
>
>2、可指定最大选中日期数量
>
>3、可用插槽自定义日期数字、农历、事件区域
>
>4、可用插槽定义左右键菜单（右键菜单有默认项目）
>
>5、多语言支持，默认中文
>
>6、两种尺寸显示模式

## 快速开始

### 第一步:
``` sh
npm install ve-calendar --save
```
### 第二步，在你的vue页面里
``` js
import veCalendar from "ve-calendar";

// in your vue <script>
export default {
    components: {
        veCalendar
    }
}
```

### 第三步，加载模板:
``` html
<veCalendar v-model="selectDateList"></veCalendar>

```


## props参数

| 参数名称            | 类型    | 默认值              | 说明                                                                                                                                  |
| ------------------- | ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| value               | array   | 无                  | v-model绑定值，是当前选中日期列表                                                                                                     |
| activate-date       | object  | 今天的年月          | 包含两个值year当前年份，month当前月份                                                                                                 |
| off-days            | array   | 无                  | 包含了休息日数据，如果没有这个参数，默认休息日是周六周日和节假日                                                                      |
| most-choice         | number  | 0                   | 最多选择日期数量,0无限,负数表示禁止选择                                                                                               |
| cross-month         | boolean | false               | 是否允许跨月选择日期                                                                                                                  |
| pick-mode           | boolean | true                | 挑选模式：为true时新选中的日期数量如果超过most-choice设定的数量，将把最早的一个日期丢弃。为false时，超过most-choice设定值将不能再选中 |
| right-menu          | boolean | true                | 是否显示鼠标右键菜单                                                                                                                  |
| day-event-menu      | string  | day-event-menu      | 弹出菜单的class name                                                                                                                  |
| day-event-menu-item | string  | day-event-menu-item | 弹出菜单项目的class name                                                                                                              |
| lang                | string  | zh-cn               | 多语言支持，默认简体中文。en模式下农历和假日不显示，只能使用slot自定义                                                                |
| mode                | string  | normal              | normal/mini/auto 三个显示模式，auto是根据宽度自动切换。                                                                               |      
| lunar               | boolean | true                | 是否显示农历区域，如果禁止，相应的插槽也无法使用。                                                                                    |
| event               | boolean | true                | 是否显示事件区域，如果禁止，相应的插槽也无法使用。                                                                                    |
| height              | string  | auto                | 组件渲染的高度。                                                                                    |


## 事件
| 名字             | 参数                   | 说明                                                                                                            |
| ---------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| refresh-calendar | {year,month},monthData | 当切换日历时触发/改变激活年月,当前视图中的全部日历数据。                                                        |
| change           | selectedDate/array     | 选中日期发生改变时触发，参数是当前选中的日期列表（字符串）                                                      |
| append-event     | day                    | 默认的右键菜单点击后传出的事件，day是鼠标点击的当天对象。如果使用了right-menu插槽，这个事件失效，需要你自己写。 |


## 插槽
| 名字                 | 参数                                           | 说明                                                                                                                                                                                                  |
| -------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| day-number           | slot-scope="{day}"                             | 用来替换默认的左上角数字，day就是当天的数据对象                                                                                                                                                       |
| day-lunar            | slot-scope="{day}"                             | 用来替换右上角的农历、节日、节气，day就是当天的数据对象                                                                                                                                               |
| day-event            | slot-scope="{day,popMenu}"                     | 用来显示待办事项之类的功能，day就是当天的数据对象，popMenu是组件传出来的弹出左键菜单的方法，你调用必须如下：@click="popMenu($event,{day,item}) 参数中只有item是需要传递进去的数据。其他都是必要格式。 |
| day-event-left-menu  | slot-scope="{currentEvent,eventMenuShow}"      | 当有待办事项时，点击左键弹出的菜单插槽;currentEvent就是上面一条popMenu传递进来的{day,item}参数                                                                                                        |
| day-event-right-menu | slot-scope="{currentEvent,eventRightMenuShow}" | 当鼠标右键点击空白事件区域时弹出的菜单插槽                                                                                                                                                            |


## day 数据内容
``` js
isToday = false;
//阳历
sYear = sYear;   //公元年4位数字
sMonth = sMonth;  //公元月数字
sDay = sDay;    //公元日数字
week = week;    //星期, 1个中文
    
//农历
lYear = lYear;   //公元年4位数字
lMonth = lMonth;  //农历月数字
lMonthChinese = monthChinese[lMonth-1]
lDay = lDay;    //农历日数字
isLeap = isLeap;  //是否为农历闰月?
lDayChinese = '初一'

//八字
cYear = cYear;   //年柱, 2个中文
cMonth = cMonth;  //月柱, 2个中文
cDay = cDay;    //日柱, 2个中文

color = ''; // 节日显示的颜色

lunarFestival = ''; //农历节日
solarFestival = ''; //公历节日
solarTerms = ''; //节气

if (`${sMonth}`.length == 1) sMonth = `0${sMonth}`;
if (`${sDay}`.length == 1) sDay = `0${sDay}`;
sDate = `${sYear}-${sMonth}-${sDay}` // 字符串年月日
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

## 预览
![Alt text](./images/demo.png)


## License

[MIT]
