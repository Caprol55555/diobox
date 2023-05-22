<!-- 顶部页面的标题和返回键 -->
<!-- 引用页面：CowInfo EstrusEvent RecordCow RecordEvent -->
<template>
    <div class="top-bar">
        {{ title }}
        <section class="back-button" @click="back">
            <i class="el-icon-arrow-left"></i>
        </section>
        <section v-if="rightButtonName" class="right-button" @click="rightButtonClick">{{ rightButtonName }}</section>
    </div>
</template>

<script>
export default {
    name: "TopBar",
    props: {
        title: String,
        rightButtonName: String,
    },
    data: () => ({
        data: null
    }),

    methods: {
        back() {
            this.$router.go(-1)
        },
        rightButtonClick() {
            this.$emit('rightButtonClick')
        }
    },
}
</script>

<style lang="less" scoped>
.top-bar {
  position: relative;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  background-color: #fff;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 14px;
  height: 30px;
  line-height: 30px;
  width: 30px;
  color: #4b9fe5;
  font-size: 20px;
  font-weight: bolder;
  background-color: #f0f0f0;
  border-radius: 50%;
}

.right-button {
  position: absolute;
  right: 15px;
  top: 0px;
  font-weight: normal;
  font-size: 15px;
  color: #4b9fe5;
}
</style>
