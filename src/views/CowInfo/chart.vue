<template>
  <div id="NecklaceDisplayChart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    title: Array,
    data: Array,
  },
  name: 'NecklaceDisplayChart',

  data() {
    return {
      myChart: undefined,
      setting: {
        top: '0px',
        height: '510px',
        left: '130px',
        right: '20px',
      },
    }
  },

  mounted() {
    let chartDom = document.getElementById('NecklaceDisplayChart')
    this.myChart = echarts.init(chartDom)
    let option = this.generate_option()
    option && this.myChart.setOption(option)
  },

  methods: {
    generate_option() {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (datas) {
            var res = '',
              val
            for (var i = 0, length = datas.length; i < length; i++) {
              val = `${datas[i].value}分钟`
              res += datas[i].name + '：' + val + '<br/>'
            }
            return res
          },
        },
        yAxis: {
          type: 'category',
          data: () => {
            let res = []
            this.title.forEach(() => {
              res.push('')
            })
            return res
          },
          inverse: true,
        },
        xAxis: {
          type: 'value',
          max: 120,
        },
        grid: this.setting,
        series: [
          {
            data: this.data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
            // barWidth: '40px',
            barCategoryGap: '15px',
          },
        ],
      }
      return option
    },
    fit() {
      switch (this.title.length) {
        case 3:
          return {
            top: '0px',
            height: '255px',
            left: '130px',
            right: '20px',
          }
        case 4:
          return {
            top: '0px',
            height: '340px',
            left: '130px',
            right: '20px',
          }
        case 6:
          return {
            top: '0px',
            height: '510px',
            left: '130px',
            right: '20px',
          }
      }
    },
  },

  watch: {
    data() {
      this.setting = this.fit()
      let dom = document.querySelector('#NecklaceDisplayChart')
      dom.style.height = `${this.data.length * 80 + 50}px`
      this.myChart.clear()
      this.myChart.setOption(this.generate_option())
    },
  },
}
</script>

<style lang="less" scoped>
#NecklaceDisplayChart {
  width: 100%;
  height: 530px;
  margin-bottom: 20px;
}
</style>
