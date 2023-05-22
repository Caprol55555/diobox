<!-- 发情事件、牛只录入和牛只信息的信息列表 -->
<!-- 引用页面：CowInfo EstrusEvent Profile RecordCow RecordEvent -->
<!-- 三种模式：右侧可输入、右侧可选择（调用MySelector组件）、固定内容 -->
<!-- 传入list_items实例：
[{ title: 'title', placeholder: 'placeholder', info: 'info', isStar: true, affirm: false, result: false }] -->
<template>
    <div class="info_list_page">
        <header>{{ title }}</header>
        <ul>
            <li
                    :class="get_li_style(index)"
                    v-for="(item, index) in list_items"
                    :key="index"
                    @click="choose_item(item, index)"
            >
                <section class="info_list_front">
                    {{ item.title }}
                    <span v-if="item.isStar">*</span>
                </section>
                <section class="info_list_latter">
                    <input v-if="item.can_input" type="text" :placeholder="item.placeholder" v-model="item.info"/>
                    <span v-else>{{ item.info }}</span>
                    <ul v-if="item.fuzzy"
                        :class="`fuzzy_item ${item.info==''?'fuzzy_block_disappear':'fuzzy_block_appear'}`">
                        <li v-for="(item, index) in item.fuzzy_items" :key="index">
                            <span>牛只号:{{ item[0] }}</span>
                            <span>设备号:{{ item[1] }}</span>
                        </li>
                        <li v-if="!item.is_loading&&!item.fuzzy_items.length">无相关牛只</li>
                        <section v-show="item.isLoading"><span class="rotate_icon"></span>&nbsp;&nbsp;加载中</section>
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
        list_items: Array,
    },
    data() {
        return {}
    },

    components: {
        Icon,
    },

    computed: {},

    mounted() {
    },

    methods: {
        get_li_style(index) {
            if (!this.list_items[index].affirm) return ''
            if (this.list_items[index].result) {
                return 'info_list_page_confirm_oestrus'
            } else {
                return 'info_list_page_confirm_unoestrus'
            }
        },
        choose_item(item, index) {
            if (!item.affirm) {
                this.$emit('choose_item', index)
            } else {
                this.$emit('choose_unconfirmed', index)
            }
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
  width: 160%;
  top: calc(100% + 1px);
  right: 5px;
  z-index: 999;
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
