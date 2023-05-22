<!--  -->
<template>
    <div>
        <section class="data_panel">
            <section class="panel_item" v-for="(item, index) in panel_items" :key="index" @click="choose(index)">
                <section class="panel_title" :style="panel_title_style">{{ item.title_front }}<br/>{{ item.title_tail }}
                </section>
                <section class="panel_attr">{{ item.attr }}</section>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        panel_items: Array,
        title_font_size: {
            type: String,
            default: '13px'
        },
    },
    data() {
        return {}
    },

    components: {},

    computed: {
        panel_title_style() {
            return {
                fontSize: this.title_font_size,
            }
        }
    },

    mounted() {
    },

    methods: {
        choose(index) {
            this.$emit('choose', index)
        },
    },
}
</script>
<style lang="less" scoped>
.data_panel {
  display: flex;
  margin-top: 15px;
  margin-left: 5vw;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
  height: 106px;
  width: 90vw;
  background-color: #fff;
}

.data_panel .panel_item {
  position: relative;
  height: 30px;
  width: 30vw;
  border-right: 2px dotted #ebebeb;
}

.data_panel .panel_item:nth-last-child(1) {
  border-right: 0;
}

.data_panel .panel_title {
  position: absolute;
  top: -16px;
  width: 30vw;
  font-size: 13px;
  font-weight: bolder;
}

.data_panel .panel_attr {
  position: absolute;
  bottom: -19px;
  width: 30vw;
  margin-top: 10px;
  color: #1e86d3;
  font-weight: bolder;
  font-size: 20px;
}
</style>
