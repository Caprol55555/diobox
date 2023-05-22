<template>
    <div class="nav-page">
        <router-view></router-view>
        <NavBarVue :item-group="navItems" @choose="changeNav" v-show="showNavBar" :value="0"></NavBarVue>
    </div>
</template>

<script>
import NavBarVue from "./Bar.vue";
import navItems from "./navItems.json";
import _ from "lodash";

export default {
    data() {
        return {
            navItems,
            windowHeight: window.innerHeight,
            showNavBar: true,
        };
    },
    components: {
        NavBarVue,
    },
    methods: {
        debouncedUpdateWindowHeight: _.debounce(function () {
            this.windowHeight = window.innerHeight;
        }, 100),
        changeNav(index) {
            const path = this.navItems[index].path;
            this.$router.push(path);
        },
    },
    mounted() {
        window.addEventListener("resize", this.debouncedUpdateWindowHeight);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.debouncedUpdateWindowHeight);
    },
};
</script>

<style lang="less" scoped>
.nav-page {
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}
</style>