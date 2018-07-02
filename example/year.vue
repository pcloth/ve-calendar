<template>
    <div>
        <ve-year mode="mini" style="padding:5px;" :event="false" :right-menu="false"  :over-hide="true" :lunar="false" select-mode="list">
            <!-- <div slot="header" slot-scope="{year,month}">{{month}}月</div> -->
        </ve-year>
    </div>
</template>

<script>
import veYear from "../src/lib/ve-year";

export default {
    props: {
        // value:{
        //     type:Array,
        //     default(){
        //         return []
        //     }
        // }
    },
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
        veYear
    }
};
</script>

<style scoped>

</style>