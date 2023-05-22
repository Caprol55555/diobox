<!-- 首页的搜索框 -->
<!-- 引用页面：Home -->
<template>
  <div>
    <div class="my_Search_page">
      <input type="text" placeholder="请输入牛只号" v-model="value" />
      <i class="el-icon-search"></i>
      <ul class="options" v-show="expand">
        <li v-if="isLoading"><span class="rotate_icon"></span>&nbsp;&nbsp;加载中</li>
        <li v-else-if="!isLoading&&!fuzzy_items.length">无相关牛只</li>
        <li v-else-if="!isLoading&&fuzzy_items.length" class="option" v-for="(item, index) in fuzzy_items" :key="index" @click="choose(index)">
          <span v-for="(e, index) in item" :key="index">{{ fuzzy_title[index] }}:{{ e }}</span>
        </li>
      </ul>
    </div>
<!--    <section class="mask" v-show="expand"></section>-->
  </div>
</template>

<script>
export default {
  props: {
    fuzzy_items: Array,
      isLoading: Boolean,
  },
  data() {
    return {
      value: '',
      fuzzy_title: ['牛只号', '设备号'],
      expand: false,
      option_dom: undefined,
      // mask_dom: undefined,
    }
  },

  components: {},

  computed: {},

  mounted() {},
  watch: {
    value() {
      if (!this.option_dom) {
        this.option_dom = document.querySelector('.options')
        // this.mask_dom = document.querySelector('.mask')
      }
      if (!this.value && this.expand) {
        this.option_dom.setAttribute('class', 'options fuzzy_block_disappear')
        // this.mask_dom.setAttribute('class', 'mask mask_disappear')
        setTimeout(() => {
          this.expand = false
        }, 300)
      } else if (this.value && !this.expand) {
        this.option_dom.setAttribute('class', 'options fuzzy_block_appear')
        // this.mask_dom.setAttribute('class', 'mask mask_appear')
        this.expand = true
      }
      if (this.value != '') {
        this.$emit('change', this.value)
      }
    },
  },
  methods: {
    choose(index) {
      this.$emit('choose', index)
    },
  },
}
</script>
<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers，webkit内核浏览器 */
  color: #fff8f8;
  font-size: 10px;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fafafa;
  font-size: 10px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fafafa;
  font-size: 10px;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #fafafa;
  font-size: 10px;
}
.my_Search_page {
  position: relative;
  margin-left: 5%;
  width: 90%;
}
input {
  background-color: #f5f5f577;
  border: 0;
  width: 100%;
  height: 35px;
  border-radius: 19px;
  text-indent: 40px;
  outline: none;
  font-size: 10px;
}
i {
  position: absolute;
  left: 13px;
  top: 10px;
  color: #fafafa;
}
.options {
  position: absolute;
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #c2c2c2;
  z-index: 101;
  list-style-type: none;
  max-height: 40vh;
  overflow: scroll;
}
.options li {
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}
.options li:nth-child(n + 2) {
  border-top: 1px solid #c2c2c2;
}
.options li:active {
  background-color: #f0f0f0;
}
.options .option {
  display: flex;
  justify-content: space-around;
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
.mask {
  position: absolute;
  top: 11vh;
  width: 100vw;
  height: 89vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
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
    opacity: 1;
  }
}
@keyframes mask_disappear {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
