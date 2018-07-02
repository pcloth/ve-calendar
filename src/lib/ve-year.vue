<template>
    <div>
        <div class="col-3" v-for="m in 12" :key="m">
            <ve-calendar :ref="`vc${m}`" mode="mini" style="padding:5px;" 
                @change="changeSelected" @mouse-up="dayMouseUp"
                :right-menu="false" :activate-date="{year:year,month:m}" 
                :height="height" :offDays="offDays" :enabledList="enabledList" :disabledList="disabledList" 
                :dayEvent="dayEvent" :dayEventMenu="dayEventMenu"
                :pickMode="pickMode"
                v-model="selectedDate"
                :selectMode="selectMode"
                :cancelClick="cancelClick"
                :rightMenu="rightMenu"
                :mostChoice="mostChoice"
                :crossMonth="crossMonth"
                :lang="lang"
                :event="event"
                :over-hide="true" :lunar="lunar">
                <div slot="header" slot-scope="{year,month}">{{month}}月</div>
            </ve-calendar>
        </div>
    </div>
</template>

<script>
import veCalendar from "./ve-calendar";

export default {
    name: "ve-year",
    props: {
        mode: {
            // 显示模型
            type: String,
            default: "mini"
        },
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

        value: {
            // 选中日期列表
            type: Array,
            default() {
                return [];
            }
        },
        overHide: {
            type: Boolean,
            default: false
        },

        year: {
            type: Number,
            default() {
                    let today = new Date();
                    return today.getFullYear();
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
            default: true
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
            default: false
        },
        event: {
            // 是否显示待办事项区域
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: "300px"
        }
    },
    data() {
        return {
            selectedDate: [],
            selectedRange:[],
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
            }
        };
    },
    computed: {},
    watch: {
        selectedDate() {
            this.$emit("input", this.selectedDate);
            this.$emit("change", this.selectedDate);
        }
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        changeSelected(date) {
            // 合并选择项
            for (let i in date) {
                if (this.selectedDate.indexOf(date[i]) < 0) {
                    this.selectedDate.push(date[i]);
                }
            }
        },
        unAllSelected(){
            let key
            for(let i=1;i<13;i++){
                key = `vc${i}`;
                this.$refs[key][0].unAllSelected()
            }
        },
        dayMouseUp(event, row, index) {
            if (this.selectMode === "range") {
                if (this.selectedRange.length < 2) {
                    this.selectedRange.push(row.sDate);
                } else {
                    // 重选
                    this.selectedRange = [row.sDate];
                    this.unAllSelected();
                }
                if (this.selectedRange.length === 2) {
                    let range = this.selectedRange.sort();
                    range = [range[0], range[range.length - 1]];
                    this.selectedDate = JSON.parse(JSON.stringify(range));
                }
            }

        }
    },
    components: {
        veCalendar
    }
};
</script>

<style scoped>
.col-3 {
    width: calc(((100% - 25px) / 3));
    display: inline-block;
}
</style>