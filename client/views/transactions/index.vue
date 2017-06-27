<template>
  <div>
    <h1 class="title">This is the main transcation page</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transactions">
          <td>{{t.customerName}}</td>
          <td>{{t.createdDate}}</td>
          <td>{{t.status}}</td>
          <td>{{t.amount}}</td>
        </tr> 
      </tbody>
    </table>
  </div>
</template>

<script>
  import { getTransacations } from 'utils/aero_functions'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        transactions: null
      }
    },
    beforeMount () {
      getTransacations(this.idToken)
        .then(transactions => {
          console.log(transactions)
          this.transactions = transactions
        })
        .catch(err => console.log(err))
    },
    computed: {
      ...mapGetters(['idToken'])
    }
  }
</script>
