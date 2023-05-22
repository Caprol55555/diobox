<!-- 选择器 -->
<!-- 引用页面：EstrusEvent RecordEvent -->
<!-- 引用组件：InfoList -->
<template>
    <div  @touchmove.prevent>
        <section class="mask mask_appear" @click.stop="exit"></section>
        <section class="selector selector_appear">
            <section class="top">
                <button class="front" @click="cancel">{{ actual_left_button_name }}</button>
                <span>{{ title }}</span>
                <button class="latter" @click="confirm">确定</button>
            </section>
            <section class="bottom" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
                <ul>
                    <li v-for="(item, index) in selector_items" :key="index">{{ item }}</li>
                </ul>
                <section class="inner_mask inner_top_mask"></section>
                <section class="inner_mask inner_bottom_mask"></section>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        selector_items: Array,
        left_button_name: String,
    },
    data() {
        return {
            select_index: 0,
            initialY: 0,
            initial_margin_top: 115,
            selector_dom: null,
            actual_left_button_name: '取消',
        }
    },

    components: {},

    computed: {},
    watch: {},
    mounted() {
        if(this.left_button_name) {
            this.actual_left_button_name = this.left_button_name
        }
        this.selector_dom = document.querySelector('.selector ul')
    },

    methods: {
        exit(event) {
            event.stopPropagation()
            let dom1 = document.querySelector('.selector')
            dom1.setAttribute('class', 'selector selector_disappear')
            let dom2 = document.querySelector('.mask')
            dom2.setAttribute('class', 'mask mask_disappear')
            setTimeout(()=> {
                this.$emit('exit')
            }, 300)
        },
        cancel() {
            let dom1 = document.querySelector('.selector')
            dom1.setAttribute('class', 'selector selector_disappear')
            let dom2 = document.querySelector('.mask')
            dom2.setAttribute('class', 'mask mask_disappear')
            setTimeout(() => {
                this.$emit('cancel')
            }, 310)
        },
        touchstart(event) {
            this.initialY = event.targetTouches[0].pageY
        },
        touchmove(event) {
            let marginTop = this.initial_margin_top - this.initialY + event.targetTouches[0].pageY
            this.select_index = ((115 - marginTop) / 45).toFixed(0)
            if (this.select_index >= -1 && this.select_index <= this.selector_items.length - 2) {
                this.selector_dom.style.marginTop = marginTop + 'px'
            }
        },
        touchend() {
            let dom = document.querySelector('.selector .bottom ul')
            dom.setAttribute('class', 'ul_move')
            this.initial_margin_top = this.selector_dom.style.marginTop.slice(0, -2) - 0
            if (this.select_index < 0) {
                this.selector_dom.style.marginTop = 115 + 'px'
                this.initial_margin_top = 115
                this.select_index = 0
            } else if (this.select_index >= this.selector_items.length - 2) {
                let marginTop = 115 - (this.selector_items.length - 3) * 45
                this.selector_dom.style.marginTop = marginTop + 'px'
                this.initial_margin_top = marginTop
                this.select_index = this.selector_items.length - 3
            } else {
                let marginTop = 115 - this.select_index * 45
                this.selector_dom.style.marginTop = marginTop + 'px'
                this.initial_margin_top = marginTop
            }
            setTimeout(() => {
                dom.setAttribute('class', '')
            }, 300)
        },
        confirm() {
            this.$emit('confirm', this.selector_items[this.select_index])
        },
    },
}
</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  opacity: 0.5;
  z-index: 9999;
}

.mask_appear {
  animation: mask_appear 0.3s forwards;
}

.mask_disappear {
  animation: mask_disappear 0.3s forwards;
}

@keyframes mask_appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
}

@keyframes mask_disappear {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

.selector {
  position: fixed;
  bottom: 0;
  height: 320px;
  width: 100vw;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  z-index: 10000;
}

.selector_appear {
  animation: selector_appear 0.3s forwards;
}

.selector_disappear {
  animation: selector_disappear 0.3s forwards;
}

@keyframes selector_appear {
  0% {
    transform: translateY(320px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes selector_disappear {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(320px);
  }
}

.selector .top {
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
  height: 30px;
  line-height: 30px;
}

.selector .top button {
  background-color: #fff;
  border: 0;
  outline: 0;
  line-height: 30px;
}

.selector .top .front {
  float: left;
  margin-left: 20px;
  color: #969799;
}

.selector .top span {
  font-weight: bold;
  font-size: 15px;
}

.selector .top .latter {
  float: right;
  margin-right: 20px;
  color: #1989fa;
}

.selector .bottom {
    position: fixed;
  width: 100vw;
  overflow: hidden;
}

.selector .inner_mask {
  position: absolute;
  margin-left: 10%;
  height: 115px;
  width: 80%;
  background-color: #fff;
  opacity: 0.6;
  z-index: 3;
}

.selector .inner_top_mask {
  top: 0px;
  border-bottom: 1px solid #e7d5d5;
}

.selector .inner_bottom_mask {
  top: 160px;
  border-top: 1px solid #e7d5d5;
}

.selector ul {
  margin-top: 115px;
}

.selector .ul_move {
  transition: 0.3s all;
}

.selector ul li {
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  font-weight: bold;
}
</style>
