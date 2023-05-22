<!-- 登录页面 -->
<template>
    <div class="login_page">
        <section class="backgruond_top"></section>
        <section class="bakcgruond_bottom" v-show="hideshow"></section>
        <section class="login_page_body">
            <MyInputVue @change="(val) => {account = val}"
                        title="账号"
                        :value="account"
                        icon="el-icon-user"
            >
            </MyInputVue>
            <MyInputVue
                    class="login_page_password"
                    @change="(val) => {password = val}"
                    title="密码"
                    :value="password"
                    icon="el-icon-key"
            ></MyInputVue>
            <form class="remember_password">
                <input id="remember_password_radio" type="checkbox" :value="is_remember" @click="remember_click"/>
                <label for="remember_password_radio">记住密码</label>
            </form>

            <section class="my_selector" @click="is_select = true">{{ region===''?'请选择地区':`当前地区为${region}` }}</section>

            <button @click="login">登录</button>
        </section>
        <MySelectorVue
            v-if="is_select"
            title="请选择地区"
            :selector_items="selector_items"
            @exit="is_select = false"
            @cancel="is_select = false"
            @confirm="confirm"
        ></MySelectorVue>
    </div>
</template>

<script>
// vue
import {mapState} from 'vuex'
// api
import USER from '../../api/user.js'
// local components
import MyInputVue from './MyInput.vue'
import mySelector from "../../components/MySelector.vue";
import MySelectorVue from "../../components/MySelector.vue";

export default {
    data() {
        return {
            account: '',
            password: '',
            is_remember: false,
            docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            hideshow: true,  //显示或者隐藏footer
            region: '',
            is_select: false,
            selector_items: ['内蒙古', '重庆', '南平', '', ''],
        }
    },

    components: {
        MySelectorVue,
        MyInputVue,
        mySelector,
    },
    watch: {
        showHeight: function () {
            if (this.docmHeight > this.showHeight) {
                this.hideshow = false
            } else {
                this.hideshow = true
            }
        }
    },

    mounted() {
        window.onresize = () => {
            return (() => {
                console.log(this.showHeight)
                this.showHeight = document.body.clientHeight;
            })()
        }
        if (localStorage.getItem('localSimpleAppRemenberPassword')) {
            this.account = localStorage.getItem('localSimpleAppAccount')
            this.password = localStorage.getItem('localSimpleAppPassword')
            this.is_remember = true
            let dom = document.querySelector('#remember_password_radio')
            dom.checked = true
        }
        if(localStorage.getItem('localSimpleAppRegion')) {
            this.region = localStorage.getItem('localSimpleAppRegion')
            localStorage.setItem('localSimpleAppRegion', this.region)
            this.$store.dispatch('update_region', this.region)
        }
    },

    methods: {
        remember_click() {
            this.is_remember = !this.is_remember
        },
        async login() {
            if(this.region==='') {
                this.$notify({
                    message: '未选择地区',
                    type: 'warning',
                })
                return;
            }
            if (!this.account.length || !this.password.length) return
            await USER.calibrate_account(this.account, this.password).then((identity) => {
                if (identity !== 'identity') {
                    this.$router.push('/Nav')
                    if (this.is_remember) {
                        localStorage.setItem('localSimpleAppAccount', this.account)
                        localStorage.setItem('localSimpleAppPassword', this.password)
                        localStorage.setItem('localSimpleAppRemenberPassword', true)
                    }
                }
            })
        },
        confirm(val) {
            this.region = val
            this.is_select = false
            localStorage.setItem('localSimpleAppRegion', val)
            this.$store.dispatch('update_region', val)
        },
    },
}
</script>
<style lang="less" scoped>
.login_page {
  background-color: #2b82e3;
  height: 100vh;
  width: 100vw;
}

.backgruond_top {
  position: absolute;
  background: url('../../assets/login_background_top.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

.bakcgruond_bottom {
  position: absolute;
  background: url('../../assets/login_background_bottom.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position-y: bottom;
  width: 100vw;
  height: 100vh;
}

.login_page_body {
  position: absolute;
  margin-top: 62vw;
  margin-left: 17vw;
  width: 66vw;
  height: calc(100vh - 112vw);
}

.login_page_body .login_page_password {
  margin-top: 30px;
}

.login_page_body .remember_password {
  display: flex;
  justify-items: center;
  width: 100%;
  height: 22px;
  line-height: 22px;
  text-align: left;
  font-size: 14px;
  color: #fff;
}
.my_selector {
    margin-top: 30px;
    color: #fff;
    border-radius: 20px;
    border: 1px solid #fff;
    width: 160px;
    margin-left: calc(50% - 80px);
    height: 40px;
    line-height: 40px;
    font-size: 14px;
}
.login_page_body .remember_password label {
  margin-left: 3px;
}

.login_page_body button {
  margin-top: 130px;
  border-radius: 6px;
  width: 100%;
  height: 35px;
  border: 0;
  color: #409eff;
  background: #ecf5ff;
  font-weight: bolder;
  font-size: 13px;
  letter-spacing: 5px;
  outline: none;
  transition: 0.1s;
}

.login_page_body button:active {
  background-color: #d2e4f5;
}
</style>
