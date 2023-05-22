import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mui from 'vue-awesome-mui';
// import { Notification } from 'element-ui'
// Vue.prototype.$notify = Notification;
import { Notify } from 'vant';
Vue.prototype.$notify = Notify;

// Vue.use(Notify);
Vue.use(Mui);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
