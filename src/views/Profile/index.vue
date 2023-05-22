<!-- 我的 页面 -->
<template>
  <div class="profile_page">
    <section class="profile_page_top">
      <section class="profile_page_user_info">
        <img src="@/assets/user.png" alt="" />
        <section>张三 <span>&nbsp;&nbsp;牛场员工</span></section>
      </section>
    </section>
    <InfoListVue class="info_list" title="基础资料" :list_items="list_items"></InfoListVue>
    <button @click="exit">退出登录</button>
  </div>
</template>

<script>
// common components
import InfoListVue from '../../components/InfoList.vue'
export default {
  data() {
    return {
      list_items: [
        { title: '手机号', info: '18067493426', isStar: false, confirmed: false, oestrus: false, can_input: false },
        { title: '所在牛场', info: 'G12', isStar: false, confirmed: false, oestrus: false, can_input: false },
        { title: '所在牛舍', info: '病牛舍', isStar: false, confirmed: false, oestrus: false, can_input: false },
        { title: '在职时长', info: '3.2年', isStar: false, confirmed: false, oestrus: false, can_input: false },
      ],
    }
  },

  components: {
    InfoListVue,
  },

  computed: {},

  mounted() {

  },

  methods: {
    exit() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="less" scoped>
.profile_page {
  height: 100vh;
  width: 100vw;
  background-image: url('../../assets/profile_top.png');
  background-repeat: no-repeat;
  background-size: contain;
}
.profile_page_top {
  position: absolute;
  left: 30px;
  top: 23px;
  height: 60px;
}
.profile_page_top .profile_page_user_info {
  text-align: left;
  width: 200px;
  height: 60px;
}
.profile_page_top .profile_page_user_info img {
  float: left;
  height: 60px;
  width: 60px;
}
.profile_page_top .profile_page_user_info section {
  display: inline-block;
  margin-left: 10px;
  height: 60px;
  line-height: 60px;
  color: #f5efef;
  font-size: 18px;
  font-weight: bold;
}
.profile_page_top .profile_page_user_info section span {
  font-size: 12px;
  font-weight: normal;
}
.info_list {
  padding-top: 32vw;
}
button {
  margin-top: 15px;
  border-radius: 14px;
  border: 0;
  width: 80vw;
  height: 40px;
  outline: 0;
  color: #fff;
  background-color: #f56c6c;
}
</style>
