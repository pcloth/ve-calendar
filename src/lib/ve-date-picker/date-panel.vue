<template>
    <div >
        
        <!-- <transition name="fade"> -->
            <div class="pop-date-picker" >
                <ve-calendar v-model="currentSelectedDate"
                    mode="mini" style="padding:5px;" :off-days="offDays"  :enabled-list="enabledList"
                    :disabled-list="disabledList" :day-event="dayEvent" :day-event-menu="dayEventMenu"
                    :day-event-menu-item="dayEventMenuItem" :over-hide="overHide" :select-mode="selectMode" :pick-mode="pickMode" :cancel-click="cancelClick" :most-choice="mostChoice" :lang="lang"
                    :right-menu="rightMenu" :activate-date="{year:currentYear,month:CurrentMonth}" 
                    :height="height"  :lunar="lunar" :event="event">
                </ve-calendar>
            </div>
        <!-- </transition> -->
    </div>
</template>

<script>
import veCalendar  from '../ve-calendar'
export default {
    name:'date-panel',
    props:{
        value:{
            type:[String,Array,Object],
            default:''
        },
        placeholder:String,
        offDays: {
            // 工作休息日
            type: Array,
            default() {
                return [];
            }
        },
        enabledList: {
            // 只准选择名单中的日期
            type: Array,
            default() {
                return [];
            }
        },
        disabledList: {
            // 禁止选中的日期
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
        overHide: {
            type: Boolean,
            default: true
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
        selectMode: {
            // 选择模式
            // range 只需要点击2次，会选中区间全部值，首尾模式下，输出默认变为2个[start,end]
            // list 用鼠标控制，点击选中的或者拖动选中的生效
            type: String,
            default: "list"
        },
        pickMode: {
            // 切换模式
            type: Boolean,
            default: true
        },
        cancelClick: {
            // 是否允许点击取消，拖动依然可以取消
            type: Boolean,
            default: true
        },
        rightMenu: {
            // 是否显示鼠标右键
            type: Boolean,
            default: false
        },
        mostChoice: {
            // 最多选择日期数量,0无限
            type: [Number, String],
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
        },
        lunar: {
            // 是否显示农历和节日区域
            type: Boolean,
            default: true
        },
        event: {
            // 是否显示待办事项区域
            type: Boolean,
            default: true
        },
        height: {
            type: String,
            default: "330px"
        },
        valueFormat:{
            type:String,
            default:"yyyy-MM-dd"
        }
    },
    data(){
        return {
            currentSelectedDate:[],
            outValue:'', //输出值
            currentYear:2018,
            CurrentMonth:6,
            visible:false
        }
    },
    computed:{},
    watch:{
        value(){
            this.outValue = this.value
            if(typeof this.value==='')
            this.activateDate
        },
        currentSelectedDate(){

            console.log(this.currentSelectedDate);
            this.outValue = this.currentSelectedDate
            
        },
        outValue(){
            this.$emit('input',this.outValue)
            this.$emit('change',this.outValue)
        }
    },
    created(){},
    mounted(){},
    updated(){},
    methods:{},
    components:{
        veCalendar
    },
}
</script>

<style scoped>
.pop-date-picker {
    position: absolute;
    background-color: #fff;
    /* left:0;
    top:0;
    right:0;
    bottom:0; */
}

.flex{
    box-sizing: border-box;

    display: -webkit-box;
    -webkit-box-pack: start;
    -webkit-box-align: start;

    display: -webkit-flex;
    -webkit-justify-content: space-between;
    -webkit-align-items: top;

    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-flow:row wrap
}


</style>