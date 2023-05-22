<template>
  <div id="NecklaceDisplayPie"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'NecklaceDisplayPie',
  props: {
    title: Array,
    pieData: Array,
  },

  data() {
    return {
      myPie: undefined,
      subtext: '暂无数据',
    }
  },

  mounted() {
    let chartDom = document.getElementById('NecklaceDisplayPie')
    this.myPie = echarts.init(chartDom)
    let option = this.generate_option()
    option && this.myPie.setOption(option)
  },

  methods: {
    generate_option() {
      let option = {
        title: {
          text: '昨天各类时间占比',
          subtext: this.subtext,
          left: 'center',
          top: '70px',
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            var html = params.name + ':' + params.data.value.toFixed(2) + '小时'
            return html
          },
        },
        color: ['#d1d1d1', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
          },
        ],
      }
      return option
    },
    transform_timestamp(timestamp) {
      timestamp = timestamp ? timestamp : null
      let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '年'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日 '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    update_subtext() {
      let hour = 3600000
      let day = 24 * hour
      let now = Date.now()
      let current_timestamp = now - (now % day) - 8 * hour //当前时间戳
      let previous_timestamp = current_timestamp - hour * 24 // 过去24小时的时间戳
      this.subtext =
        this.transform_timestamp(previous_timestamp) + '  -  ' + this.transform_timestamp(current_timestamp)
    },
  },

  watch: {
    pieData() {
      this.update_subtext()
      this.myPie.clear()
      this.myPie.setOption(this.generate_option())
    },
  },
}
</script>

<style lang="less" scoped>
#NecklaceDisplayPie {
  width: 100%;
  height: 500px;
  transform: translateY(-60px);
}
</style>
