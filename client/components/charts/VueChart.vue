<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
    // 引入 ECharts 主模块
    var echarts = require('echarts')
    export default {
      name: 'vue-chart',
      props: {
        className: {
          type: String,
          default: 'bar-percent-chart'
        },
        id: {
          type: String,
          default: 'bar-percent-chart'
        },
        width: {
          type: String,
          default: '100px'
        },
        height: {
          type: String,
          default: '80px'
        },
        dataNum: {
          type: Number,
          default: 0
        },
        options: {
          type: Object,
          default: () => ({})
        }
      },
      data () {
        return {
          chart: null
        }
      },
      watch: {
        dataNum () {
          this.setOptions()
        }
      },
      mounted () {
        this.initBar()
      },
      methods: {
        initBar () {
          console.log(this.height)
          this.chart = echarts.init(document.getElementById(this.id))
          this.setOptions()
        },
        setOptions () {
          this.chart.setOption(this.options)
        }
      }
    }
</script>
