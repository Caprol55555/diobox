<template>
    <div class="info_list_page">
        <header>{{ title }}</header>
        <ul>
            <li
                    :class="get_li_style(index)"
                    v-for="(item, index) in item_info"
                    :key="index"
                    @click="choose_item(item, index)"
            >
                <section class="info_list_front">
                    {{ item_title[index] }}
                    <span v-if="item_star[index]">*</span>
                </section>
                <section class="info_list_latter">
                    <input v-if="item_can_input[index]" type="text"
                           :placeholder="item_placeholder[index]"
                           @input="handleInputChange(index, $event.target.value)"
                           v-model="item_info[index]"/>
                    <span v-else>{{ item_info[index] }}</span>
                    <ul v-if="item_fuzzy_title[index]&&isExpand"
                        :class="`fuzzy_item ${Expand}`"
                    >
                        <li v-for="(item, index1) in item_fuzzy_items" :key="index1"
                            @click="choose_fuzzy_item(index, item[0])">
                            <span>{{ item_fuzzy_title[index] && item_fuzzy_title[index][0] }}:{{ item[0] }}</span>
                            <span>{{ item_fuzzy_title[index] && item_fuzzy_title[index][1] }}:{{ item[1] }}</span>
                        </li>
                        <li v-if="!is_loading&&!item_fuzzy_items.length">无相关牛只</li>
                        <li v-show="is_loading"><span><span class="rotate_icon"></span>&nbsp;&nbsp;加载中</span></li>
                    </ul>
                </section>
                <i class="el-icon-arrow-right"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import {Icon} from 'element-ui'

export default {
    props: {
        title: String,
        item_title: Array,
        item_info: Array,
        item_placeholder: Array,
        item_star: Array,
        item_affirm: Array,
        item_result: Array,
        item_can_input: Array,
        item_fuzzy_title: Array,
        item_fuzzy_items: Array,
        is_loading: Boolean,
    },

    data() {
        return {
            isExpand: undefined,
        }
    },

    components: {
        Icon,
    },

    computed: {
        Expand() {
            switch (this.isExpand) {
                case true:
                    return 'fuzzy_block_appear';
                case false:
                    return 'fuzzy_block_disappear';
                default:
                    return '';
            }
        }
    },

    methods: {
        get_li_style(index) {
            if (!this.item_affirm[index]) return ''
            if (this.item_result[index]) {
                return 'info_list_page_confirm_oestrus'
            } else {
                return 'info_list_page_confirm_unoestrus'
            }
        },
        choose_item(item, index) {
            if (!this.item_affirm[index]) {
                this.$emit('choose_item', index)
            } else {
                this.$emit('choose_unconfirmed', index)
            }
        },
        handleInputChange(index, value) {
            if (value !== '' && this.item_fuzzy_title[index] !== undefined) {
                this.isExpand = true
                this.$emit('fuzzy_search', {index, value})
            } else {
                this.isExpand = false
            }
        },
        choose_fuzzy_item(index, val) {
            this.item_info.splice(index, 1, val)
            this.isExpand = false
        },
    },
}
</script>
<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers，webkit内核浏览器 */
  color: #909399;
  font-size: 11px;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #909399;
  font-size: 12px;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #909399;
  font-size: 12px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #909399;
  font-size: 12px;
}

.info_list_page {
  margin-left: 5vw;
  width: 90vw;
  text-align: left;
}

header {
  font-weight: bold;
  font-size: 15px;
}

ul {
  margin-top: 5px;
  list-style-type: none;
  background-color: #fff;
  border-radius: 10px;
}

ul li {
  position: relative;
  display: block;
  width: 100%;
  height: 55px;
  line-height: 55px;
  font-size: 11px;
}

ul li:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

ul li:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

ul .info_list_page_confirm_oestrus {
  background-color: #999f8f;
  color: #fff;
}

ul .info_list_page_confirm_unoestrus {
  background-color: #698385;
  color: #fff;
}

ul .info_list_page_confirm_unoestrus i,
ul .info_list_page_confirm_oestrus i {
  color: #fff;
}

ul li:nth-child(n + 2) {
  border-top: 1px solid #f1f1f1;
}

ul li .info_list_front {
  display: inline-block;
  //   float: left;
  padding-left: 20px;
}

ul li .info_list_front span {
  color: red;
  font-weight: bold;
  font-size: 14px;
}

ul li .info_list_latter {
  position: relative;
  display: inline-block;
  float: right;
  padding-right: 35px;
}

ul li .info_list_latter input {
  text-align: right;
  border: 0;
  width: 100px;
  outline: none;
  background-color: inherit;
  color: inherit;
}

ul li .info_list_latter .fuzzy_item {
  position: absolute;
  border-radius: 4px;
  border: 1px solid #c7c7c7;
  width: 180%;
  max-width: 100vw;
  top: calc(100% + 1px);
  right: 5px;
  z-index: 999;
  max-height: 40vh;
  overflow: scroll;
  transform: translateY(-10px);
  opacity: 0;
}

ul li .info_list_latter .fuzzy_item li {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

ul li .info_list_latter .fuzzy_item li:nth-child(n+2) {
  border-top: 1px solid #c7c7c7;
}

.fuzzy_block_appear {
  animation: fuzzy_block_appear 0.3s forwards;
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
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-10px);
    opacity: 0;
  }
}

ul li i {
  position: absolute;
  top: 20px;
  right: 15px;
  font-size: 14px;
  font-weight: bolder;
  color: #999999;
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
