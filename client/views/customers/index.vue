<template>
  <div>
    <div class="search-box">
      <div class="field has-addons">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="search customers" v-model="keyword">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
        <p class="control">
          <button class="button is-info" @click.prevent="searchCustomers">
            Search
          </button>
        </p>
      </div>
    </div>
    <article class="box">
      <table class="table is-fullwidth">
        <thead>
        <p class="cus_num">{{cus_num}} Customers</p>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Merchant</th>
          <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(c, i) in customers" :key="i">
          <td class="customer"><span class="span"></span>{{c.firstName}} {{c.lastName}}</td>
          <td><span class="span">{{c.email}}</span></td>
          <td><span class="span">{{c.merchant}}</span></td>
          <td><span class="span">{{c.amount}}</span></td>
        </tr>
        </tbody>
      </table>
    </article>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getCustomers } from 'utils/aero_functions'

  export default {
    data() {
      return {
        customers: [],
        keyword: null
      }
    },
    beforeMount() {
      getCustomers(this.apiClient, this.merchant.merchantId, {})
        .then(({ data }) => {
          console.log(data)
          this.customers = data.customers
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      searchCustomers() {
        getCustomers(this.apiClient, this.merchant.merchantId, { keyword: this.keyword })
          .then(({ data }) => {
            console.log(data)
            this.customers = data.customers
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    computed: {
      ...mapGetters(['apiClient', 'merchant']),
      cus_num() {
        return this.customers.length
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cus_num {
    margin: 13px 0px 5px 10px;
    font-size: 18px;
    padding-left: 10px;
  }

  .search-box {
    margin-bottom: 15px;
  }
</style>
