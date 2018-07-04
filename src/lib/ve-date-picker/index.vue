<template>
    <div>
        <input type="text" :placeholder="placeholder" @focus="visible=true" v-model="outValue"/>
        <date-panel v-show="visible"></date-panel>
    </div>
</template>

<script>
import Vue from "vue";
import datePanel from "./date-panel.vue";

export default {
    name: "ve-date-picker",
    props: {
        value: {
            type: [String, Array, Object],
            default: ""
        },
        placeholder: String,
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
        valueFormat: {
            type: String,
            default: "yyyy-MM-dd"
        }
    },
    data() {
        return {
            visible: false,
            outValue: ""
        };
    },
    computed: {},
    watch: {},
    created() {
        // this.panel = datePanel;
    },
    mounted() {
        // this.mountPicker();
    },
    updated() {},
    methods: {
        mountPicker() {
            this.picker = new Vue(this.panel).$mount();
            this.picker.visible = this.visible;
            window.tt = this;
            this.insertAfter(this.picker.$el,this.$el)
            // this.$el.append(this.picker.$el);
        },
        insertAfter(newElement, targetElement) {
            var parent = targetElement.parentNode;
            if (parent.lastChild == targetElement) {
                // 如果最后的节点是目标元素，则直接添加。因为默认是最后
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targetElement.nextSibling);
                //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
            }
        }
    },
    components: {
        datePanel
    }
};
</script>

<style scoped>
</style>