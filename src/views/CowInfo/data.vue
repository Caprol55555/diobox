<template>
  <div id="NecklaceDisplayData">
    <header>
      <div class="description">最新数据包</div>
      <div class="date">{{ `上行时间:${date}` }}</div>
    </header>

    <body>
      <section class="box" v-for="(item, index) in data" :key="index">
        <section class="box_title">{{ title[index] }}</section>
        <section class="box_info">{{ item }}{{ item == '暂无数据' ? '' : '分钟' }}</section>
      </section>
    </body>
  </div>
</template>

<script>
export default {
  name: 'NecklaceDisplayData',
  props: {
    title: Array,
    data: Array,
    date: String,
  },

  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
#NecklaceDisplayData {
  // margin: 0 10px;
  // width: calc(100% - 20px);
  box-sizing: border-box;
}

header {
  margin-bottom: -5px;
  color: #c4c9db;
  font-size: 12px;
}

header .description {
  color: #464646;
  font-weight: 600;
  font-size: 18px;
  height: 25px;
  line-height: 25px;
}

header .date {
  color: #464646;
  height: 25px;
  line-height: 25px;
}

body {
  display: grid;
  float: left;
  grid-template-columns: repeat(1, 130px);
  // grid-template-rows: repeat(autofill, 80px);
  justify-items: center;
}

.box {
  height: 71px;
  width: 80%;
  margin: 7px 0;
  border-radius: 11px;
  overflow: hidden;
}

.box_title {
  height: 35px;
  line-height: 35px;
  width: 100%;
  color: #373f64;
  font-size: 15px;
  font-weight: bold;
  background-color: #f6f6f8;
}

.box_info {
  height: 35px;
  line-height: 35px;
  width: 100%;
  background-color: #373f64;
  font-size: 15px;
  color: #fff;
}
</style>
