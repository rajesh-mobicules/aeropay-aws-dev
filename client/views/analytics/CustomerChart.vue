<template>
  <div>
    <VueChart height="300px" width="100%" :options="options" className="customerChart" id="costomerChart"></VueChart>
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
            text: 'customer bar chart'
          },
          tooltip: {},
          legend: {
            data: ['Customers']
          },
          xAxis: {
            data: ['1', '2', '3', '4', '5', '6', '7', '8']
          },
          yAxis: {},
          series: [
            {
              name: 'customer number',
              type: 'bar',
              data: this.userData.newCustomers
            }
          ]
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  
</style>
