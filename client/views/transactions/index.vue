<template>
  <div>
    <h1 class="title">{{merchantName}}</h1>
    <table class="table is-striped">
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
          <td class="customer"><span class="span">From: </span>{{t.customerName}}</td>
          <td><span class="span">{{t.createdDate}}</span></td>
          <td><span class="span">{{t.status}}</span></td>
          <td :class="{'is-processed': t.status === 'processed', 'is-pending': t.status === 'pending'}">{{t.amount | renderCents}}</td>
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
      ...mapGetters(['idToken']),
      merchantName () {
        if (this.transactions === null) return ''
        return this.transactions[0]['merchantName']
      }
    },
    filters: {
      renderCents (value) {
        if (!value) value = 0
        value = value / 100
        return '$' + value.toFixed(2)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .span {
    color: #8393aa;
    text-transform: uppercase;
  }
  .customer {
    color: #3e4e67;
  }
  .is-processed {
    color: green;
  }
  .is-pending {
    // color: yellow;
  }
</style>
