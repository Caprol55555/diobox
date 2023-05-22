<!-- 账号密码输入框 -->
<!-- 引用页面：Login -->
<template>
  <div class="my_input_page">
    <header>{{ title }} <i :class="icon + ' my_input_page_user_icon'"></i></header>
    <form action="">
      <input
        :type="title == '密码' ? 'password' : 'text'"
        v-model="input_value"
        placeholder="请输入您的账号"
        autocomplete="off"
      />
    </form>
    <i v-show="input_value.length" class="el-icon-circle-close my_input_page_close_icon" @click="input_value = ''"></i>
  </div>
</template>

<script>
import { Icon } from 'element-ui'
export default {
  props: {
    // input_value: String,
    title: String,
    value: String,
    icon: String,
  },
  data() {
    return {
      input_value: '',
    }
  },
  watch: {
    input_value() {
      this.$emit('change', this.input_value)
    },
    value() {
      this.input_value = this.value
    },
  },
  components: { Icon },

  computed: {},

  mounted() {},

  methods: {},
}
</script>
<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers，webkit内核浏览器 */
  color: #67a2e4;
  font-size: 10px;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #67a2e4;
  font-size: 10px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #67a2e4;
  font-size: 10px;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #67a2e4;
  font-size: 10px;
}
.my_input_page {
  position: relative;
  text-align: left;
  height: 60px;
  width: 100%;
}
header {
  height: 27px;
  width: 100%;
  color: #fff;
  letter-spacing: 4px;
  font-weight: bolder;
}
input {
  height: 19px;
  width: 100%;
  background-color: #2b82e3;
  color: #67a2e4;
  font-size: 10px;
  letter-spacing: 1px;
  border: 0;
  border-bottom: 1px solid #95c1f2;
  outline: none;
  transition: 0.3s all;
}
input:focus {
  height: 30px;
  font-size: 15px;
  color: #fff;
}
input:focus + .my_input_page_close_icon {
  color: #fff;
  font-size: 17px;
  bottom: 10px;
}
.my_input_page_user_icon {
  position: absolute;
  top: -1px;
  right: -6px;
  font-size: 24px;
  color: #fff;
}
.my_input_page_close_icon {
  position: absolute;
  right: 0;
  bottom: 17px;
  color: #67a2e4;
  transition: 0.3s all;
}
</style>
