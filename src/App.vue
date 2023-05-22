<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view />
  </div>
</template>
<script>
export default {
    mounted() {
        mui.init({
            keyEventBind: {
                backbutton: true, //关闭back按键监听
            }
        })
        //首页返回键处理
        // 处理逻辑： 1s内，连续两次按返回键，则退出应用；
        var first = null;
        const that = this;
        mui.back = function () {
            let router_name = that.$route.matched[that.$route.matched.length - 1].name;
            if(router_name!=='Home'&&router_name!=='Profile') {
                router_name!=='Login'&&history.go(-1); // 回退到上一页
            } else if (!first) {
                // 首次按键， 提示 再按一次退出应用
                first = new Date().getTime();//记录第一次按下回退键的时间
                mui.toast("再按一次退出应用");
                setTimeout(function () {
                    //1s 后清除
                    first = null;
                }, 1000);

            } else {
                if (new Date().getTime() - first < 1000) {
                    //如果两次按下的时间小于1s
                    plus.runtime.quit(); //那么就退出app
                }
            }
        }
    }
}
</script>
<style lang="less">
@font-face {
  font-family: 'IcoMoon-Free';
  src: url('../Font/IcoMoon-Free.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#app {
  //   font-family: IcoMoon-Free, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0e1822;
}
* {
  padding: 0;
  margin: 0;
  user-select: none;
}
div,
section {
  box-sizing: border-box;
}
</style>
