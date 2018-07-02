<template>
    <div>
        <div class="row">
            <div>demo列表</div>
            <div class="col">
                <div class="button" @click="$router.push('index')">标准视图</div>
                <div class="button" @click="$router.push('year')">年视图</div>
                <div class="button" @click="$router.push('datepicker')">日期选择器</div>
            </div>
        </div>
        <transition name="custom-classes-transition" leave-active-class="animated bounceOutRight" mode="out-in">
            <router-view class="app-page"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    updated() {},
    methods: {},
    components: {}
};
</script>

<style scoped>
.row {
    display: flex;
    flex-direction: column;
    margin: 5px;
}

.col {
    display: flex;
    flex-direction:row;
}

.button {
    border: 1px solid rgba(1,1,1,0.2);
    max-width: 100px;
    padding: 5px;
    border-radius: 5px;
    margin-right: 20px;

}
.button:hover {
    cursor: pointer;
}
</style>