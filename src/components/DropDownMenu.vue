<!-- 下拉菜单 -->
<template>
    <div>
        <MyMask :isVisible="is_expand" @clickMask="click_mask"></MyMask>
        <section class="menu">
            <ul class="main_menu">
                <li
                        :style="`width: ${1.0/menu_items.length*100}%`"
                        :class="is_expand && index === menu_items_index ? 'active_font_style' : ''"
                        v-for="(item, index) in menu_items"
                        :key="index"
                        @click="choose_menu(index)"
                >
                    {{ item }}
                </li>
            </ul>
            <section style="overflow: hidden" v-show="show_drop_down_menu">
                <ul class="drop_down_menu">
                    <li
                            v-for="(item, index) in options_set[menu_items_index]"
                            :key="index"
                            :class="index === pitch_on_options_index[menu_items_index] ? 'active_font_style' : ''"
                            @click="choose_menu_item(index)"
                    >
                        <section class="title">{{ item }}</section>
                        <section class="status">✔</section>
                    </li>
                </ul>
            </section>
            <section class="choosen_item" v-show="!show_drop_down_menu">
                <ul>
                    <li :style="`width: ${1.0/menu_items.length*100}%`" v-for="(item, index) in options_set" :key="index">
                        {{ options_set[index][pitch_on_options_index[index]] }}
                    </li>
                </ul>
            </section>
        </section>
        <section class="placeholder"></section>
    </div>
</template>

<script>
import MyMask from './Mask.vue'

export default {
    props: {
        menu_items: Array,
        options_set: Array,
        pitch_on_options_index: Array,
    },
    data() {
        return {
            display_num: 0,
            menu_items_index: 0,
            show_drop_down_menu: false,
        }
    },

    components: {
        MyMask,
    },

    computed: {
        is_expand() {
            return this.display_num % 2 === 1
        },
    },

    mounted() {
    },

    methods: {
        choose_menu(index) {
            let dom = document.querySelector('.drop_down_menu')
            if (!this.is_expand) {
                // 当前下拉菜单是关闭的
                this.display_num++
                this.drop_down_menu_action(dom, 'expand')
            } else if (index === this.menu_items_index) {
                // 1.当前下拉菜单是打开的
                // 2.上次点击和菜单项和本次的一样
                this.display_num++
                this.drop_down_menu_action(dom, 'fold')
            } else {
                // 1.当前下拉菜单是打开的
                // 2.上次点击和菜单项和本次的不一样
            }
            this.menu_items_index = index
        },
        choose_menu_item(index) {
            this.pitch_on_options_index.splice(this.menu_items_index, 1, index)
            this.display_num++
            let dom = document.querySelector('.drop_down_menu')
            this.drop_down_menu_action(dom, 'fold')
            this.$emit('choose', this.menu_items_index, index)
        },
        drop_down_menu_action(dom, action) {
            if (!dom || !action) return
            const that = this
            switch (action) {
                case 'expand':
                    expand(dom)
                    break
                case 'fold':
                    fold(dom)
                    break
                case 'repeat_expand':
                    repeat_expand(dom)
                    break
            }

            function expand(dom) {
                dom.setAttribute('class', 'drop_down_menu drop_down_menu_slide_down')
                that.show_drop_down_menu = true
            }

            function fold(dom) {
                dom.setAttribute('class', 'drop_down_menu drop_down_menu_slide_up')
                setTimeout(() => {
                    that.show_drop_down_menu = false
                }, 300)
            }

            function repeat_expand(dom) {
                dom.setAttribute('class', 'drop_down_menu')
                dom.setAttribute('class', 'drop_down_menu drop_down_menu_slide_down')
            }
        },
        click_mask() {
            this.display_num++
            let dom = document.querySelector('.drop_down_menu')
            this.drop_down_menu_action(dom, 'fold')
        },
    },
}
</script>
<style lang="less" scoped>
.active_font_style {
  color: #1989fa;
}

.menu {
  position: absolute;
  margin-top: 8px;
  width: 100vw;
  z-index: 1111;
  background-color: inherit;
  overflow: hidden;
}

.main_menu {
  margin-left: 5vw;
  border-bottom: 1px solid #eee5e5;
  height: 35px;
  width: 90vw;
  line-height: 35px;
  font-size: 16px;
}

.main_menu li {
  display: inline-block;
  background-color: #fff;
  width: 50%;
}

.drop_down_menu {
  font-size: 14px;
  max-height: 300px;
  margin-left: 5vw;
  width: 90vw;
  overflow: auto;
  background-color: #fff;
}

.drop_down_menu_slide_up {
  animation: drop_down_menu_slide_up 0.3s forwards;
}

@keyframes drop_down_menu_slide_up {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: -100%;
  }
}

.drop_down_menu_slide_down {
  animation: drop_down_menu_slide_down 0.3s forwards;
}

@keyframes drop_down_menu_slide_down {
  0% {
    margin-top: -100%;
  }
  100% {
    margin-top: 0;
  }
}

.drop_down_menu li {
  margin-left: 10%;
  height: 50px;
  line-height: 50px;
  width: 80%;
}

.drop_down_menu li:nth-child(n + 2) {
  border-top: 1px solid #f8f4f4;
}

.drop_down_menu li .title {
  display: inline-block;
  text-align: left;
  width: 50%;
}

.drop_down_menu li .status {
  display: inline-block;
  text-align: right;
  font-family: 'IcoMoon-Free';
  width: 50%;
}

.choosen_item ul {
  margin-left: 5vw;
  width: 90vw;
}

.choosen_item ul li {
  display: inline-block;
  width: 50%;
  font-size: 12px;
  color: #c7c5c5;
}

.placeholder {
  width: 100vw;
  height: 62px;
}
</style>