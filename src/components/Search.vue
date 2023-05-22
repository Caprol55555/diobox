<!-- 带确认按钮的搜索框 -->
<template>
    <div class="search_component">
        <label class="search_icon" for="SeachInput"></label>
        <input v-model="value" type="text" :placeholder="placeholder" id="SeachInput" maxlength="15"
               autocomplete="off"/>
        <ul class="fuzzy_block" v-show="fuzzy_search && show_fuzzy_block">
            <li v-if="isLoading"><span class="rotate_icon"></span>&nbsp;&nbsp;加载中</li>
            <li v-else-if="!isLoading&&!fuzzy_items.length">无相关牛只</li>
            <li
                    class="li_flex_style"
                    v-else-if="!isLoading&&fuzzy_items.length"
                    v-for="(item, index) in fuzzy_items"
                    :key="index"
                    @click="choose_fuzzy_block(item)"
            >
                <span v-for="(e, index) in item" :key="index"> {{ fuzzy_title[index] }}:{{ e }} </span>
            </li>
        </ul>
        <section class="close_icon" @click="clear_value" v-show="value.length"></section>
        <!--    <section class="right_button" @click="confirm">搜索</section>-->
    </div>
</template>

<script>
export default {
    props: {
        placeholder: String,
        fuzzy_search: Boolean,
        fuzzy_title: Array,
        fuzzy_items: Array,
        isLoading: Boolean,
        main_data_name: String,
    },
    data() {
        return {
            value: '',
            fuzzy_items_dom: undefined,
            show_fuzzy_block: false,
        }
    },

    watch: {
        value() {
            if (this.value.length === 0) {
                this.fold_fuzzy_block()
                this.$emit('value_empty')
            } else {
                this.expand_fuzzy_block()
            }
        },
    },

    components: {},

    computed: {},

    mounted() {
        this.fuzzy_items_dom = document.querySelector('.fuzzy_block')
    },

    methods: {
        confirm() {
            this.$emit('search', this.value)
        },
        choose_fuzzy_block(item) {
            let info = {}
            item.map((item, index, arr) => {
                info[this.fuzzy_title[index]] = item
            })
            if(this.main_data_name!==undefined) {
                this.value = info[this.main_data_name]
                this.fold_fuzzy_block()
            }
            this.$emit('choose_fuzzy_block', info)
        },
        fold_fuzzy_block() {
            this.fuzzy_items_dom.setAttribute('class', 'fuzzy_block fuzzy_block_disappear')
            setTimeout(() => {
                this.show_fuzzy_block = false
            }, 300)
        },
        expand_fuzzy_block() {
            this.show_fuzzy_block = true
            this.fuzzy_items_dom.setAttribute('class', 'fuzzy_block fuzzy_block_appear')
            this.$emit('change', this.value)
        },
        clear_value() {
            this.value = ''
            this.$emit('clear')
        }
    },
}
</script>
<style lang="less" scoped>
.search_component {
  position: relative;
}

.search_icon {
  position: absolute;
  top: 12px;
  left: 8vw;
  font-family: 'IcoMoon-Free';
}

input {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  font-size: 14px;
  text-indent: 40px;
  height: 37px;
  width: 90vw;
  outline: none;
}

input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #c7c5c5;
  font-size: 14px;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #c7c5c5;
  font-size: 14px;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #c7c5c5;
  font-size: 14px;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c7c5c5;
  font-size: 14px;
}

input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #c7c5c5;
  font-size: 14px;
}

.close_icon {
  position: absolute;
  top: 13px;
  right: 10vw;
  font-size: 13px;
  font-family: 'IcoMoon-Free';
  color: #c7c5c5;
}

.right_button {
  position: absolute;
  right: 5vw;
  top: 1px;
  height: 37px;
  line-height: 38px;
  width: 20vw;
  font-size: 13px;
  font-weight: 600;
  border-left: 1px solid #dcdfe6;
  border-radius: 4px;
}

.right_button:active {
  background-color: #fcfcfc;
}

.fuzzy_block {
  position: absolute;
  margin-left: 5vw;
  margin-top: 5px;
  width: 90vw;
  z-index: 9999;
  background-color: #fff;
  font-size: 14px;
  border: 1px solid #c4c9db;
  overflow: scroll;
  border-radius: 4px;
  max-height: 30vh;
}

.fuzzy_block_appear {
  animation: fuzzy_block_appear 0.3s;
}

@keyframes fuzzy_block_appear {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

.fuzzy_block_disappear {
  animation: fuzzy_block_disappear 0.3s forwards;
}

@keyframes fuzzy_block_disappear {
  100% {
    transform: translateY(-10px);
    opacity: 0;
  }
}

.fuzzy_block li {
  height: 40px;
  line-height: 40px;
}

.li_flex_style {
  display: flex;
  justify-content: space-around;
}

.fuzzy_block li:nth-child(n + 2) {
  border-top: 1px solid #c4c9db;
}

.fuzzy_block li:active {
  background-color: #eeeeee;
}

.rotate_icon {
  display: inline-block;
  font-family: 'IcoMoon-Free';
  animation: inifnite_rotate 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes inifnite_rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
