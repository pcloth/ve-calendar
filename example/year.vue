<template>
    <div>
        <div class="col-3" v-for="m in 12" :key="m">
            <ve-calendar mode="mini" style="padding:5px;" :event="false" :right-menu="false" :activate-date="{year:year,month:m}" height="300px" :over-hide="true" :lunar="false">
                <div slot="header" slot-scope="{year,month}">{{month}}月</div>
            </ve-calendar>
        </div>
    </div>
</template>

<script>
import veCalendar from "../src";

export default {
    props: {},
    data() {
        return {
            year: 2018
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    updated() {},
    methods: {},
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