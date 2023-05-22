<!-- 按钮，点击后按钮下面会滑出两个小按钮（确认、取消） -->
<!-- 引用页面：CowInfo -->
<template>
  <div :id="button_name" class="confirm_button_component">
    <section class="tip" v-if="show_sub">请确认是否{{ action }}</section>
    <section class="sub_button_list">
      <button class="sub_button sub_button_left" @click="cancel">取消</button>
      <button class="sub_button sub_button_right" @click="confirm">确认</button>
    </section>
    <button class="main_button" @click="main_button_click">{{ button_name }}</button>
  </div>
</template>

<script>
export default {
  props: {
    button_name: String,
    action: String,
    button_color: String,
  },
  data() {
    return {
      show_sub: false,
    }
  },

  components: {},

  computed: {},

  mounted() {
    let dom = document.querySelector(`#${this.button_name} .main_button`)
    dom.style.backgroundColor = this.button_color
  },
  watch: {
    show_sub() {
      let dom = document.querySelector(`#${this.button_name} .sub_button_list`)
      dom.setAttribute('class', `sub_button_list ${this.show_sub ? 'appear_animation' : 'disappear_animation'}`)
    },
  },
  methods: {
    main_button_click() {
      this.show_sub = true
    },
    cancel() {
      this.show_sub = false
    },
    confirm() {
      this.show_sub = false
      this.$emit('confirm')
    },
  },
}
</script>
<style lang="less" scoped>
.confirm_button_component {
  position: relative;
  height: 40px;
}
.tip {
  position: absolute;
  top: 47px;
  font-size: 12px;
  width: 100%;
  color: #909399;
}
button {
  border-radius: 6px;
  border: 0;
  outline: 0;
  color: #fff;
}
.main_button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #409eff;
}
.sub_button_list {
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 0px;
  width: 100%;
  height: 35px;
  z-index: 0;
  opacity: 0;
}
.appear_animation {
  animation: sub_button_list_appear 0.3s forwards;
}
.disappear_animation {
  animation: sub_button_list_disappear 0.3s forwards;
}
@keyframes sub_button_list_appear {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(70px);
  }
}
@keyframes sub_button_list_disappear {
  0% {
    opacity: 1;
    transform: translateY(70px);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}
.sub_button_list .sub_button {
  border-radius: 4px;
  width: 75px;
  height: 35px;
  background: #fff;
}
.sub_button_list .sub_button_left {
  color: #e6a23c;
  border: 1px solid #e6a23c;
}
.sub_button_list .sub_button_right {
  color: #f56c6c;
  border: 1px solid #f56c6c;
}
</style>
