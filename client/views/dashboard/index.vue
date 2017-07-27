<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">${{runningTotal}}</p>
          <p class="subtitle">Total $</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">${{thisMonthTotal}}</p>
          <p class="subtitle">Total $ this month</p>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">Income</h4>
          <div class="content">
            <income-chart :userData="userData"></income-chart>
            <!-- <chart :type="'doughnut'" :data="chartData"></chart> -->
          </div>
        </article>
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">New Customers</h4>
          <div class="content">
          <customer-chart :userData="userData"></customer-chart>
          </div>
        </article>
      </div>
    </div>
    
  </div>
</template>

<script>
  import VueChart from 'components/charts/VueChart'
  import CustomerChart from './CustomerChart'
  import IncomeChart from './IncomeChart'
  export default {
    components: {
      VueChart,
      CustomerChart,
      IncomeChart
    },
    data () {
      return {
        userData: {
          moneyByMonth: [50.32, 122.23, 500.23, 1000.43, 2540.12, 3000.56, 4000.23, 5000],
          newCustomers: [20, 40, 80, 160, 180, 100, 150, 230],
          top5customer: ['John', 'Doe', 'Alice', 'Bob', 'Cat'],
          months: 8
        }
      }
    },
    computed: {
      runningTotal () {
        const total = this.userData.moneyByMonth.reduce((a, sum) => a + sum)
        return total.toFixed(2)
      },
      thisMonthTotal () {
        return this.userData.moneyByMonth[this.userData.months - 1]
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
</style>
