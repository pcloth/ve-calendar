<template>
    <div>
        <input type="date" placeholder="test"/>
        <div class="pop-date-picker">
            <ve-calendar 
                mode="mini" style="padding:5px;" :event="false" 
                :right-menu="false" :activate-date="{year:year,month:m}" 
                height="300px" :over-hide="true" :lunar="true">
                <!-- <div slot="header" slot-scope="{year,month}">{{month}}月</div> -->
            </ve-calendar>
        </div>
    </div>
</template>

<script>
import veCalendar  from './ve-calendar'
export default {
    name:'ve-date-picker',
    props:{},
    data(){
        return {
            year:2018,
            m:6
        }
    },
    computed:{},
    watch:{},
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
    width: 300px;
}
</style>