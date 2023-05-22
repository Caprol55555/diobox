<!-- 引用页面：AllDevice -->
<template>
    <div
            class="NecklaceDisplayCowBlock block_common_style"
            :style="info_block_style"
            @click="choose"
            @touchend="touch_end"
            @touchstart="touch_start"
    >
        <section>
            <header :style="main_data_style">{{ title }}</header>
            <footer>{{ subText }}</footer>
        </section>
    </div>
</template>

<script>
export default {
    name: 'NecklaceDisplayCowBlock',
    props: {
        main_data: String,
        sub_data: String,
        highlight: String,
    },
    data() {
        return {
            long_tap_timer: null,
            info_block_background_color: undefined,
        }
    },
    computed: {
        info_block_style() {
            return {
                backgroundColor: this.highlight_style()
            }
        },
        main_data_style() {
          return {
              fontSize: this.main_data.length>=7?'15px':'20px'
          }
        },
        title() {
            switch (this.main_data) {
                case '0':
                    return '未绑定'
                case '-1':
                    return '未绑定'
                default:
                    return `${this.main_data}`
            }
        },
        subText() {
            switch (this.sub_data) {
                case null:
                    return '暂无数据'
                default:
                    return `${this.sub_data}`
            }
        },
    },

    methods: {
        choose() {
            this.$emit('choose')
        },
        touch_end() {
            this.long_tap_timer && window.clearTimeout(this.long_tap_timer)
        },
        touch_start() {
            this.long_tap_timer = setTimeout(() => {
                this.$emit('long_tap')
            }, 1000)
        },
        highlight_style() {
            switch (this.highlight) {
                case "怀孕":
                    return '#a8d8ea'
                case "配种":
                    return '#cbf1f5'
                case "发情":
                    return '#ffe2e2'
                case "正常":
                    return '#eee'
            }
        }
    },
}
</script>

<style lang="less" scoped>
.NecklaceDisplayCowBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 29vw;
  width: 29vw;
  border-radius: 11px;
}

.block_common_style {
  background-color: #eee;
}

.block_highlight_style {
  background-color: #ffe2e2;
}

.NecklaceDisplayCowBlock:active {
  background-color: #f5f5f5;
}

header {
  font-size: 20px;
  font-weight: 900;
  color: #131313;
}

footer {
  font-size: 10px;
  color: #9f9e9f;
}
</style>
