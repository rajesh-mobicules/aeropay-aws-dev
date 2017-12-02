<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box  columns">
          <div class="column is-4">
            <p class="title is-primary">${{runningTotal}}</p>
            <p class="subtitle">Total $</p>
          </div>
          <div class="column is-4 is-offset-4">
            <p class="title is-primary">${{thisMonthTotal}}</p>
            <p class="subtitle">Total $ this month</p>
          </div>

        </article>
        <!-- <article class="tile is-child box"> -->

        <!-- </article> -->
      </div>

    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h4 class="title">Income</h4>
          <div class="content">
            <income-chart :userData="userData"></income-chart>
            <!-- <chart :type="'doughnut'" :data="chartData"></chart> -->
          </div>
        </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h4 class="title">New Customers</h4>
          <div class="content">
            <customer-chart :userData="userData"></customer-chart>
            <!-- <chart :type="'doughnut'" :data="chartData"></chart> -->
          </div>
        </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h4 class="title">Top five customers</h4>
          <div class="content">
            <dl>
              <dt v-for="c in enhancedCustomers" :key="c">
                <span>
                  {{c.name}}: ${{c.value}}
                  <progress class="progress is-primary" :value="c.value" :max="enhancedCustomers[0].value">
                    {{c.percent}}
                  </progress>
                </span>
              </dt>
            </dl>
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
          top5customers: [
            {name: 'John', value: 1300},
            {name: 'Doe', value: 1000.24},
            {name: 'Alice', value: 890.2},
            {name: 'Bob', value: 500},
            {name: 'Cat', value: 126}
          ],
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
      },
      enhancedCustomers () {
        const customers = this.userData.top5customers
        const newTopFiveCustomers = []
        const highValue = customers[0].value
        // console.log(this.userData.top5customers)
        for (let i = 0; i < customers.length; i++) {
          // customer.percent = customer.value / highValue * 100
          customers[i].percent = Math.round(customers[i].value / highValue * 100).toString() + '%'
          newTopFiveCustomers.push(customers[i])
        }
        return newTopFiveCustomers
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma';
  .is-primary {
    color: $primary
  }
</style>
