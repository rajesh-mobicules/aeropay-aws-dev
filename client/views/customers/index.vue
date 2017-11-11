<template>
  <div>
    <div class="search-box">
      <div class="field has-addons">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Name, email, or customer ID">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
        <p class="control">
          <a class="button is-info">
            Search
          </a>
        </p>
      </div>
    </div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <p class="trans_num">{{trans_num}} Customers</p>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, i) in transactions" :key="i">
          <td class="customer"><span class="span"></span>{{c.firstName}} {{c.lastName}}</td>
          <td><span class="span">{{c.email}}</span></td>
          <td><span class="status">{{c.status}}</span></td>
          <td>{{c.created}}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getTransactionSummary } from 'utils/aero_functions'
  export default {
    data () {
      return {
        transactions: []
      }
    },
    beforeMount () {
      getTransactionSummary(this.idToken)
        .then(transactions => {
          console.log(transactions)
          this.transactions = transactions
        })
        .catch(err => {
          console.log(err)
        })
    },
    computed: {
      ...mapGetters(['idToken']),
      trans_num () {
        return this.transactions.length
      }
    }
}
</script>

<style lang="scss" scoped>
  .trans_num {
    margin: 13px 0px 5px 10px;
    font-size: 18px;
    padding-left: 10px;
  }
  .search-box {
    margin-bottom: 15px;
  }
</style>
