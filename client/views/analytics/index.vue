<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box  columns">
          <div class="column is-4">
            <p class="title is-primary">{{transSum.totalAmount | money}}</p>
            <p class="subtitle">Total $</p>
          </div>
          <div class="column is-4 is-offset-4">
            <p class="title is-primary">{{thisMonth | money}}</p>
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
            <income-chart :moneyByMonth="moneyByMonth"></income-chart>
            <!-- <chart :type="'doughnut'" :data="chartData"></chart> -->
          </div>
        </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h4 class="title">New Customers</h4>
          <div class="content">
            <customer-chart :customersByMonth="customersByMonth"></customer-chart>
            <!-- <chart :type="'doughnut'" :data="chartData"></chart> -->
          </div>
        </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h4 class="title">Top five customers</h4>
          <div class="content">
            <dl>
              <dt v-for="(c, i) in enhancedCustomers" :key="i">
                <span>
                  {{c.firstName + ' ' + c.lastName}}: {{c.amount | money}}
                  <progress class="progress is-primary" :value="c.amount" :max="enhancedCustomers[0].amount">
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
  import { mapGetters } from 'vuex'
  import CustomerChart from './CustomerChart'
  import IncomeChart from './IncomeChart'
  import { getCustomers } from 'utils/aero_functions'
  export default {
    components: {
      VueChart,
      CustomerChart,
      IncomeChart
    },
    data () {
      return {
        customers: []
      }
    },
    beforeMount() {
      const condition = {
        // limit: this.limit,
        sortBy: 'amountDesc'
      }
      getCustomers(this.apiClient, this.merchant.merchantId, condition)
        .then(({ data }) => {
          console.log(data)
          this.customers = data.customers
          // this.paging = data.paging
          // this.sorting = data.sorting
        })
        .catch(err => {
          console.log(err)
        })
    },
    computed: {
      enhancedCustomers () {
        const customers = this.customers
        if (!customers || customers.length === 0) {
          return []
        }
        const newTopCustomers = []
        const highValue = customers[0].amount
        // console.log(this.userData.top5customers)
        for (let i = 0; i < customers.length; i++) {
          // customer.percent = customer.value / highValue * 100
          customers[i].percent = Math.round(customers[i].amount / highValue * 100).toString() + '%'
          newTopCustomers.push(customers[i])
        }
        return newTopCustomers
      },
      ...mapGetters(['transSum', 'apiClient', 'merchant']),
      thisMonth () {
        const { monthlyAmount } = this.transSum;
        if (!monthlyAmount || monthlyAmount.length === 0) {
          return 0;
        }
        return monthlyAmount[monthlyAmount.length - 1].totalAmount
      },
      moneyByMonth () {
        const { monthlyAmount } = this.transSum;
        return this.extractCumlative(monthlyAmount, 'totalAmount')
      },
      customersByMonth () {
        const { monthlyConsumers } = this.transSum;
        return this.extractCumlative(monthlyConsumers, 'totalConsumers')
      }
    },
    methods: {
      extractCumlative (originalArray, field) {
        const target = Array.apply(null, Array(12)).map(() => 0);
        if (!originalArray) return target;
        originalArray.forEach(ori => {
          const indx = ori.month - 1;
          target[indx] = ori[field];
        })
        for (let i = 1; i < target.length; i++) {
          target[i] += target[i - 1];
        }
        return target;
      }
    },
    filters: {
      money(value) {
        if (!value) value = 0;
        return "$" + value.toFixed(2);
      },
      count(value) {
        if (!value) return 0;
        return value;
      }}
  }
</script>

<style lang="scss" scoped>
  @import '~bulma';
  .is-primary {
    color: $primary
  }
</style>
