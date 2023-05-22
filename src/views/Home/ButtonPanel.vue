<template>
    <div class="button-panel-component">
        <section class="data-panel" :class="{ 'is-auto-grid': isAutoGrid, 'not-auto-grid': !isAutoGrid }">
            <section
                class="panel-item button-panel-item"
                v-for="(button, index) in buttons"
                :key="index"
                @click="selectButton(index)"
            >
                <i :class="button.icon"></i>
                <section>{{ button.title }}</section>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        buttons: Array,
    },
    data() {
        return {
            isAutoGrid: false,
        };
    },
    mounted() {
        this.isAutoGrid = this.buttons.length <= 3;
    },
    watch: {
        buttons() {
            this.isAutoGrid = this.buttons.length <= 3;
        },
    },
    methods: {
        selectButton(index) {
            this.$emit("choose", index);
        },
    },
};
</script>

<style lang="less" scoped>
.button-panel-component {
    margin-left: 5vw;
    margin-top: 15px;
    width: 90%;
}

.data-panel {
    border-radius: 15px;
    width: 100%;
    background-color: #fff;
    &.is-auto-grid {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    &.not-auto-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: start;
        align-items: start;
        .panel-item:nth-child(3n + 1) {
            grid-column-start: 1;
        }
    }
}

.panel-item {
    height: 76px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
        color: #1e86d3;
        font-size: 22px;
        font-weight: bolder;
        margin-bottom: 10px;
    }
    section {
        color: #c0c0c1;
        font-size: 10px;
    }
    &:nth-last-child(-n + 3) {
        border-right: 0;
    }
}
</style>