<template>
  <div>
    <VueChart height="300px" width="100%" :options="options" className="incomeChart" id="incodeChart"></VueChart>
  </div>
</template>

<script>
  import VueChart from 'components/charts/VueChart'
  export default {
    components: {
      VueChart
    },
    props: {
      userData: {
        type: Object,
        required: true,
        default: () => ({})
      }
    },
    computed: {
      options () {
        return {
          title: {
            text: 'Income Chart'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: 0,
            right: 0,
            bottom: 20,
            containLabel: true
          },
          animationDelay: 1000,
          legend: {
            data: ['Customers']
          },
          xAxis: {
            data: ['1', '2', '3', '4', '5', '6', '7', '8'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            name: '$',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          series: [
            {
              name: '$',
              type: 'line',
              data: this.userData.moneyByMonth,
              markPoint: {
                data: [
                    { type: 'max', name: 'max' },
                    { type: 'min', name: 'min' }
                ]
              },
              itemStyle: {
                normal: {
                  color: '#30b08f'
                }
              },
              markLine: {
                silent: true,
                smooth: true,
                effect: {
                  show: true
                },
                animationDuration (idx) {
                  return idx * 100
                },
                animationDelay: 1000,
                animationEasing: 'quadraticInOut',
                distance: 1,
                label: {
                  normal: {
                    position: 'middle'
                  }
                },
                symbol: ['none', 'none']
                // data:
              }
            }
          ]
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  
</style>
